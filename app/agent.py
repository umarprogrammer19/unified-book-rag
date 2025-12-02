import os
from typing import AsyncGenerator, Dict, List, Any
import re
import qdrant_client
from openai import AsyncOpenAI
from agents import Agent, Runner, function_tool
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables.")
if not QDRANT_URL:
    raise ValueError("QDRANT_URL not found in environment variables.")
if not QDRANT_API_KEY:
    raise ValueError("QDRANT_API_KEY not found in environment variables.")

openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)
qdrant_client_instance = qdrant_client.AsyncQdrantClient(
    url=QDRANT_URL, api_key=QDRANT_API_KEY, timeout=60
)

COLLECTION_NAME = "physical_ai_book"
EMBEDDING_MODEL = "text-embedding-3-small"

async def get_embedding(text: str) -> List[float]:
    """Generates an embedding for the given text using OpenAI's embedding model."""
    response = await openai_client.embeddings.create(
        input=text, model=EMBEDDING_MODEL
    )
    return response.data[0].embedding

@function_tool
async def search_book(query: str) -> Dict[str, Any]:
    """
    Searches the 'physical_ai_book' Qdrant collection for information relevant to the query.
    Returns the retrieved content, including the source file and relevant headers,
    formatted for both the agent's consumption and client display.
    """
    print(f"search_book called with query: {query}")
    query_embedding = await get_embedding(query)
    try:
        print(f"Attempting Qdrant query_points with collection: {COLLECTION_NAME}, query_vector length: {len(query_embedding)}")
        # Corrected: Using query_points and removing append_payload
        search_result = await qdrant_client_instance.query_points(
            collection_name=COLLECTION_NAME,
            query=query_embedding,
            limit=3,  # Retrieve top 3 relevant chunks
        )
        print(f"Qdrant query_points (raw): {search_result}")
    except Exception as e:
        print(f"Error during Qdrant query_points search: {e}")
        return {
            "agent_response_content": f"An error occurred during book search: {e}",
            "sources": []
        }

    if not search_result:
        print("No search results found in Qdrant after query_points.")
        # Return a structured dictionary even if no results are found
        return {
            "agent_response_content": "No relevant information found in the book to answer your query.",
            "sources": []
        }

    sources = []
    context_contents = []
    for hit in search_result:
        # Payloads are directly accessible from the hit object in query_points result
        payload = hit.payload
        content = payload.get("text", "")
        source_file = payload.get("source", "unknown")
        print(f"Processing hit: payload={payload}, content={content[:50]}..., source_file={source_file}")
        # Headers are not currently stored in the payload during ingestion.
        # If headers are needed, the ingestion process (app/services/ingestion.py)
        # would need to be updated to extract and store them.
        headers = [] # Empty list for now as headers are not ingested

        context_contents.append(content)
        sources.append({
            "source_file": source_file,
            "headers": headers,
            "content": content
        })

    print(f"Collected context_contents: {[c[:50] for c in context_contents]}")
    print(f"Collected sources: {sources}")

    # Prepare content for the agent to easily consume
    # The agent will see this formatted string as the tool's output
    agent_response_content = "\n\n".join(context_contents)
    if sources:
        # Append simplified source citations for the agent's reference
        agent_response_content += "\n\nSources:"
        for i, source in enumerate(sources):
            # Simplify source citation as headers are not ingested
            agent_response_content += f"\n- Source: {source['source_file']}"


    # The tool returns a dictionary. The 'agent_response_content' is for the LLM to process
    # and 'sources' is for the ChatKit client to display structured information.
    print(f"Agent response content: {agent_response_content[:200]}...")
    print(f"Sources for ChatKit: {sources}")
    return {
        "agent_response_content": agent_response_content,
        "sources": sources
    }


# Define the RAG Agent
rag_agent = Agent(
    name="Rag Agent",
    instructions=(
        "You are an AI assistant specialized in answering questions about the 'The Physical AI Lab' book. "
        "Use the `search_book` tool to retrieve relevant information from the book content based on the user's query. "
        "The `search_book` tool will provide a detailed 'agent_response_content' which includes retrieved text and simplified source citations. "
        "Formulate concise and accurate answers based *only* on this 'agent_response_content', ensuring you incorporate and re-state the provided source citations (e.g., 'Source: filename.md') in your final answer. "
        "If the 'agent_response_content' indicates no relevant information, state that you don't have enough information from the book to answer."
    ),
    tools=[search_book],
)


async def get_rag_agent_response(user_message: str):
    """
    Invokes the RAG agent with a user message and streams the response
    formatted for ChatKit compatibility.
    """
    print(f"get_rag_agent_response called with user_message: {user_message}")
    response_stream = Runner.run_streamed(input=user_message, starting_agent=rag_agent)

    print("Starting to stream events from RAG agent.")
    async for event in response_stream.stream_events():
        print(f"Event type: {event.type}")
        if event.type == "text_delta_event":
            if event.data.delta:
                print(f"Yielding text_delta_event: {event.data.delta[:50]}...")
                yield {"text": event.data.delta}
        elif event.type == "tool_output_event":
            tool_output_data = event.data.output
            if tool_output_data:
                print(f"Tool output data: {tool_output_data}")
                # If structured sources are available, yield them separately for ChatKit
                if tool_output_data.get("sources"):
                    sources = []
                    for source in tool_output_data["sources"]:
                        sources.append({
                            "type": "tool_code",
                            "name": "search_book",
                            "description": f"Content from {source['source_file']}",
                            "content": source["content"],
                            "source_file": source["source_file"]
                            # Headers are not available in the ingested payload.
                        })
                    print(f"Yielding sources: {len(sources)} sources.")
                    yield {"sources": sources}
                # Yield the agent's response content from the tool output
                if tool_output_data.get("agent_response_content"):
                    print(f"Yielding agent_response_content: {tool_output_data["agent_response_content"][:50]}...")
                    yield {"text": tool_output_data["agent_response_content"]}
        else:
            print(f"Unhandled event type: {event.type}")


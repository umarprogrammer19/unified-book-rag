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
    response = await openai_client.embeddings.create(input=text, model=EMBEDDING_MODEL)
    return response.data[0].embedding


@function_tool
async def search_book(query: str) -> Dict[str, Any]:
    """
    Searches the 'physical_ai_book' Qdrant collection.
    Returns a dictionary containing the agent response content and a list of sources.
    """
    print(f"search_book called with query: {query}")
    query_embedding = await get_embedding(query)

    try:
        # Query Qdrant
        search_result = await qdrant_client_instance.query_points(
            collection_name=COLLECTION_NAME,
            query=query_embedding,
            limit=3,
        )

        # --- CRITICAL FIX KEPT HERE ---
        # Ensure we access .points safely
        if not hasattr(search_result, "points") or not search_result.points:
            return {
                "agent_response_content": "No relevant information found in the book.",
                "sources": [],
            }

        points = search_result.points

    except Exception as e:
        return {
            "agent_response_content": f"An error occurred during Qdrant search: {e}",
            "sources": [],
        }

    sources = []
    context_contents = []

    for hit in points:
        payload = hit.payload if hit.payload else {}
        content = payload.get("text", "No content available")
        source_file = payload.get("source", "Unknown source")

        if content == "No content available":
            continue

        context_contents.append(content)
        # Store source info as a dict or string, per your preference
        sources.append({"source_file": source_file, "content_snippet": content[:50]})

    if context_contents:
        agent_response_content = "\n\n".join(context_contents)
        # We append sources to the text so the Agent can read them easily
        # AND we return them in the dictionary structure for your UI/Client
        if sources:
            agent_response_content += "\n\nSources:"
            for source in sources:
                agent_response_content += f"\n- {source['source_file']}"
    else:
        agent_response_content = "Sorry, I couldn't find any relevant content."

    # --- RETURNING THE DICTIONARY ---
    return {"agent_response_content": agent_response_content, "sources": sources}


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
        elif event.type == "raw_response_event":
            if hasattr(event.data, "text") and event.data.text:
                print(f"Yielding raw_response_event text: {event.data.text[:50]}...")
                yield {"text": event.data.text}
        elif event.type == "tool_output_event":
            tool_output_data = event.data.output
            if tool_output_data:
                print(f"Tool output data: {tool_output_data}")
                if tool_output_data.get("sources"):
                    sources = []
                    for source in tool_output_data["sources"]:
                        sources.append(
                            {
                                "type": "tool_code",
                                "name": "search_book",
                                "description": f"Content from {source['source_file']}",
                                "content": source["content"],
                                "source_file": source["source_file"],
                            }
                        )
                    print(f"Yielding sources: {len(sources)} sources.")
                    yield {"sources": sources}
                if tool_output_data.get("agent_response_content"):
                    print(
                        f"Yielding agent_response_content: {tool_output_data['agent_response_content'][:50]}..."
                    )
                    yield {"text": tool_output_data["agent_response_content"]}
        else:
            print(f"Unhandled event type: {event.type}")

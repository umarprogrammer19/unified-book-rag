import os
from typing import Dict, List
import qdrant_client
from openai import OpenAI
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

openai_client = OpenAI(api_key=OPENAI_API_KEY)
qdrant_client_instance = qdrant_client.QdrantClient(
    url=QDRANT_URL, api_key=QDRANT_API_KEY
)

COLLECTION_NAME = "physical_ai_book"


def get_embedding(text: str) -> List[float]:
    """Generates an embedding for the given text using OpenAI's embedding model."""
    response = openai_client.embeddings.create(
        input=text, model="text-embedding-ada-002"
    )
    return response.data[0].embedding


@function_tool
def search_book(query: str) -> str:
    """
    Searches the 'physical_ai_book' Qdrant collection for information relevant to the query.
    Returns the retrieved content, including the source file and relevant headers.
    """
    query_embedding = get_embedding(query)
    search_result = qdrant_client_instance.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_embedding,
        limit=3,  # Retrieve top 3 relevant chunks
        append_payload=True,
    )

    if not search_result:
        return "No relevant information found in the book."

    context_parts = []
    for hit in search_result:
        payload = hit.payload
        content = payload.get("content", "")
        source_file = payload.get("source_file", "unknown")
        headers = " > ".join(payload.get("headers", []))

        context_parts.append(
            f"Content from {source_file} (Headers: {headers}):\n{content}"
        )
    return "\n\n".join(context_parts)


# Define the RAG Agent
rag_agent = Agent(
    name="Rag Agent",
    instructions=(
        "You are an AI assistant specialized in answering questions about the 'The Physical AI Lab' book. "
        "Use the `search_book` tool to retrieve relevant information from the book content based on the user's query. "
        "Formulate concise and accurate answers based *only* on the information retrieved from the book. "
        "If you cannot find relevant information, state that you don't have enough information from the book to answer."
    ),
    tools=[search_book],
)


async def get_rag_agent_response(user_message: str) -> Dict:
    """
    Invokes the RAG agent with a user message and returns the response
    formatted for ChatKit compatibility, including sources if available.
    """
    # Use Agent.astream_response_as_dict to get the full stream of messages
    response_stream = rag_agent.astream_response_as_dict(user_message)

    final_answer_content = []
    sources = []

    async for message_dict in response_stream:
        for message in message_dict.get("messages", []):
            if message.get("role") == "assistant":
                # Accumulate content from assistant messages
                if "content" in message and message["content"]:
                    final_answer_content.append(message["content"])

                # Check for tool use and extract source-like information
                if message.get("tool_use"):
                    tool_name = message["tool_use"]["name"]
                    if tool_name == "search_book":
                        # In a real ChatKit integration, you'd parse tool_code_output for richer sources.
                        # For simplicity, we just indicate tool use here.
                        sources.append(
                            {
                                "type": "tool_use",
                                "name": "search_book",
                                "description": "Information retrieved from the book content.",
                            }
                        )

    # Join all content parts to form the final answer
    final_answer = " ".join(final_answer_content).strip()

    chatkit_response = {
        "text": final_answer or "I could not find a direct answer in the book.",
        "sources": sources,
    }

    return chatkit_response

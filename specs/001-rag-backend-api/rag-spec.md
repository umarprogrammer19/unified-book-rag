# RAG Backend Specification

## 1. Tech Stack
- **Web Framework**: FastAPI
- **Package Manager**: uv
- **Vector Database**: Qdrant
- **Agent Orchestrator**: OpenAI Agents SDK

## 2. Ingestion Script (`app/ingest.py`)
- Read all `.md` files from `/book_source/docs`.
- Chunk the content based on headers (H1, H2) to maintain context.
- Generate embeddings for each chunk.
- Upsert the chunks with their embeddings and metadata to a Qdrant collection named `physical_ai_book`.

## 3. Chat Endpoint (`POST /api/chat`)
- **URL**: `/api/chat`
- **Method**: `POST`
- **Input**: JSON body with a `messages` field, which is a list of message objects.
  ```json
  {
    "messages": [
      {"role": "user", "content": "How do I install ROS?"}
    ]
  }
  ```
- **Output**: Compatible with **ChatKit**. The response should be a JSON object containing the agent's answer and any relevant sources.
- **Logic**:
  1. Receive the user's message from the `messages` list.
  2. Pass the message to an OpenAI Agent.
  3. The OpenAI Agent will use a tool to query Qdrant based on the user's input.
  4. Retrieve relevant chunks from Qdrant.
  5. The Agent will use the retrieved information to formulate an answer.
  6. Return the answer, ensuring it's in the format ChatKit expects, including sources if available.

## 4. Environment Variables
The following environment variables are required and will be loaded from a `.env` file:
- `OPENAI_API_KEY`: API key for OpenAI services.
- `QDRANT_URL`: URL for the Qdrant instance (e.g., `http://localhost:6333`).
- `QDRANT_API_KEY`: API key for Qdrant (if using Qdrant Cloud or authenticated instance).

## 5. Principles (from .claude/skills/rag-architecture.md)
- **Strict Typing**: Use Pydantic models for everything.
- **Async**: All DB and AI calls must be `await`.

## 6. Project Structure (from plan.md)
- `app/main.py`: Core FastAPI application, API endpoint definition, and main entry point.
- `app/services/rag_service.py`: Contains the main RAG logic, including Qdrant interaction, embedding generation, and LLM prompting.
- `app/ingest.py`: Python script responsible for loading, chunking, embedding, and storing book content in Qdrant.
- `requirements.txt` (or `pyproject.toml` with `uv`): Lists all Python dependencies.
- `book_source/docs/`: Directory containing source markdown files for ingestion.
- `.env`: Environment variables for API keys and service URLs.

# Tasks for RAG Backend Implementation

## Phase 1: Environment Setup & Qdrant Integration

- [ ] Task 1.1: Verify Qdrant is running (Docker or cloud instance).
- [ ] Task 1.2: Install Qdrant client and other Python dependencies (completed via `uv add`).
- [ ] Task 1.3: Define Qdrant collection parameters (vector size, distance metric, payload schema).

## Phase 2: Ingestion Script Development (`app/ingest.py`)

- [ ] Task 2.1: Create `app/ingest.py` and necessary directory structure (`book_source/docs`).
- [ ] Task 2.2: Implement logic to read `.md` files from `/book_source/docs`.
- [ ] Task 2.3: Implement text chunking based on headers (H1, H2).
- [ ] Task 2.4: Integrate a sentence transformer model for embedding generation.
- [ ] Task 2.5: Implement upsert logic to store chunks, embeddings, and metadata in Qdrant.
- [ ] Task 2.6: Add error handling and logging for the ingestion process.
- [ ] Task 2.7: Create sample `.md` files in `book_source/docs` for testing.

## Phase 3: Chat Endpoint Development (`POST /api/chat`)

- [ ] Task 3.1: Create `app/main.py` and `app/services/rag_service.py` with initial FastAPI app setup.
- [ ] Task 3.2: Define Pydantic models for `/api/chat` request (e.g., `ChatMessage`, `ChatRequest`) and response (e.g., `ChatResponse`, `SourceDetail`).
- [ ] Task 3.3: Initialize OpenAI Agents SDK and connect to Qdrant in `rag_service.py`.
- [ ] Task 3.4: Implement a tool for the OpenAI Agent to query Qdrant (query embedding, similarity search, retrieval).
- [ ] Task 3.5: Implement the RAG logic within `rag_service.py` to pass user message to Agent, retrieve context, and generate a response.
- [ ] Task 3.6: Develop the `POST /api/chat` endpoint in `app/main.py` to handle requests and call the RAG service.
- [ ] Task 3.7: Ensure the API response format is compatible with ChatKit, including source attribution.
- [ ] Task 3.8: Implement environment variable loading (`python-dotenv`) for `OPENAI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`.
- [ ] Task 3.9: Add error handling and logging for the API endpoint.

## Phase 4: Testing and Refinements

- [ ] Task 4.1: Write unit tests for text chunking, embedding generation, Qdrant interaction, and API endpoint logic.
- [ ] Task 4.2: Perform integration testing of the entire RAG pipeline (ingestion to query).
- [ ] Task 4.3: Refine chunking strategy and Qdrant search parameters for optimal retrieval.
- [ ] Task 4.4: Iterate on OpenAI Agent prompts to improve response quality and reduce hallucinations.

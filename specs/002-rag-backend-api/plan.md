## RAG Backend Implementation Plan

### 1. Scope and Dependencies

*   **In Scope:**
    *   Integration and configuration of Qdrant as the vector store.
    *   Development of a Python script for ingesting book content, chunking it, generating embeddings, and storing them in Qdrant.
    *   Creation of a RESTful API endpoint using FastAPI to receive user queries.
    *   Implementation of the RAG logic within the API endpoint, including query embedding, retrieval from Qdrant, context augmentation, and LLM-based response generation.
    *   Basic error handling for ingestion and API operations.
*   **Out of Scope:**
    *   User interface development.
    *   Advanced authentication and authorization for the API.
    *   Complex monitoring and alerting beyond standard application logs.
    *   Fine-tuning of LLMs or embedding models.
    *   Deployment and CI/CD pipelines.
*   **External Dependencies:**
    *   **Qdrant:** Vector database for storing embeddings and metadata.
    *   **Embedding Model:** A pre-trained model (e.g., from Hugging Face) to convert text into numerical vectors.
    *   **Large Language Model (LLM):** An external or locally hosted LLM (e.g., via OpenAI API, Hugging Face local inference) for generating responses.

### 2. Key Decisions and Rationale

*   **Choice of Vector Database: Qdrant**
    *   **Rationale:** Qdrant is a powerful, open-source vector search engine that is lightweight, performant, and can be easily deployed via Docker or used as a managed service. It supports various similarity metrics and efficient nearest neighbor search, which is crucial for RAG.
    *   **Trade-offs:** While other options like Pinecone or Weaviate exist, Qdrant offers a good balance of features, performance, and self-hosting flexibility suitable for this project's scale.
*   **Choice of Backend Framework: FastAPI**
    *   **Rationale:** FastAPI is a modern, fast (high performance), web framework for building APIs with Python 3.7+ based on standard Python type hints. It offers automatic interactive API documentation (Swagger UI/ReDoc), which speeds up development and testing.
    *   **Trade-offs:** Flask or Django REST Framework are alternatives, but FastAPI's performance, modern asyncio support, and automatic documentation make it an excellent choice for a high-performance RAG endpoint.
*   **RAG Orchestration Framework: LangChain / LlamaIndex**
    *   **Rationale:** These frameworks provide abstractions for common RAG components like document loaders, text splitters, embedding models, vector stores, and LLM integrations. This significantly reduces boilerplate code and streamlines the RAG pipeline development.
    *   **Trade-offs:** While manual implementation of all RAG steps is possible, using a framework accelerates development and leverages community-tested best practices. We will start with LangChain due to its widespread adoption and comprehensive integrations.
*   **Embedding Model:** A pre-trained sentence transformer model (e.g., `all-MiniLM-L6-v2`)
    *   **Rationale:** These models are optimized for generating high-quality sentence embeddings, crucial for accurate semantic search in RAG. `all-MiniLM-L6-v2` offers a good balance of performance and efficiency.
    *   **Trade-offs:** Larger models might offer better accuracy but require more computational resources. The chosen model is a good starting point for demonstrating functionality.

### 3. Interfaces and API Contracts

*   **Ingestion Script (CLI-based):**
    *   **Input:** Path to a directory containing book content (e.g., `.txt`, `.pdf`, `.md` files).
    *   **Output:** Console logs indicating progress, success/failure of ingestion, and counts of chunks processed.
    *   **Errors:** Will log specific file processing errors, chunking issues, or Qdrant connection failures.
*   **RAG Endpoint:** `/query`
    *   **Method:** `POST`
    *   **Request Body (JSON):**
        ```json
        {
          "query": "What is the main theme of the book?",
          "book_id": "unique-book-identifier"
        }
        ```
        *   `query` (string, required): The user's question.
        *   `book_id` (string, optional): An identifier to limit the search to a specific book's collection (if multiple books are ingested).
    *   **Response Body (JSON - Success 200 OK):**
        ```json
        {
          "response": "The main theme of the book is...",
          "sources": [
            {"page": 10, "content_snippet": "..."}
          ]
        }
        ```
        *   `response` (string): The LLM-generated answer to the query.
        *   `sources` (list of objects): Retrieved chunks from Qdrant that were used as context, including page number (if available in metadata) and a snippet of the content.
    *   **Error Taxonomy (JSON):**
        *   **400 Bad Request:**
            ```json
            {"detail": "Query parameter missing or invalid."}
            ```
        *   **500 Internal Server Error:**
            ```json
            {"detail": "An unexpected error occurred during processing."}
            ```
            (e.g., Qdrant connection failure, LLM API error)
    *   **Versioning Strategy:** Implicitly v1 for now. If significant changes occur, a `/v2/query` endpoint will be introduced.
    *   **Idempotency:** Not applicable for query endpoint. Ingestion script should handle re-ingestion gracefully (e.g., clearing collections or updating existing vectors).
    *   **Timeouts:** LLM calls will have configurable timeouts to prevent long-running requests.
    *   **Retries:** LLM API calls will implement exponential backoff retries for transient errors.

### 4. Non-Functional Requirements (NFRs) and Budgets

*   **Performance:**
    *   **p95 Latency:** Aim for query responses within 3-5 seconds under moderate load.
    *   **Throughput:** Target 10-20 queries per second initially.
    *   **Resource Caps:** Qdrant and the FastAPI application should run efficiently within typical serverless or containerized environments (e.g., 1-2 CPUs, 2-4 GB RAM).
*   **Reliability:**
    *   **SLOs:** 99.9% availability for the RAG endpoint.
    *   **Error Budgets:** Less than 0.1% of queries resulting in 5xx errors.
    *   **Degradation Strategy:** If LLM or Qdrant services are unavailable, return informative error messages rather than hanging requests.
*   **Security:**
    *   **AuthN/AuthZ:** No explicit authentication in v1. Future versions would integrate JWT-based authentication.
    *   **Data Handling:** Ensure no sensitive user data is logged or stored.
    *   **Secrets:** API keys for LLMs will be stored in environment variables, not hardcoded.
    *   **Auditing:** Basic logging of requests and responses will be implemented for debugging, but without sensitive user query content.
*   **Cost:** Minimize LLM API costs by optimizing prompt length and number of calls. Qdrant can be self-hosted to control infrastructure costs.

### 5. Data Management and Migration

*   **Source of Truth:** The original book content files are the source of truth. Qdrant stores the embeddings and metadata derived from these files.
*   **Schema Evolution (Qdrant):**
    *   Collections will have a defined vector size and distance metric.
    *   Payloads will include metadata like `file_path`, `chapter`, `page_number`, `chunk_id`.
    *   Changes to chunking strategy or embedding models might require re-ingestion and creation of new Qdrant collections.
*   **Migration and Rollback:**
    *   If a new embedding model or chunking strategy is introduced, new Qdrant collections will be created. Old collections can be retained until the new ones are validated.
    *   Database migrations (if a metadata store is added later) would use tools like Alembic.
*   **Data Retention:** Book content embeddings will be retained indefinitely in Qdrant as long as the book is required for RAG.

### 6. Operational Readiness

*   **Observability:**
    *   **Logs:** Use Python's `logging` module. Logs will be structured (e.g., JSON) to capture request details, errors, and performance metrics.
    *   **Metrics:** FastAPI can integrate with Prometheus for basic request/response metrics.
    *   **Traces:** Distributed tracing could be added later using OpenTelemetry to track requests across different services (FastAPI, Qdrant, LLM API).
*   **Alerting:** Set up alerts for:
    *   High API error rates (e.g., 5xx errors exceeding threshold).
    *   Qdrant service unavailability or high latency.
    *   LLM API errors or rate limit issues.
    *   On-call owners will be defined for these alerts.
*   **Runbooks:**
    *   Troubleshooting Qdrant connectivity issues.
    *   Diagnosing LLM API errors.
    *   Steps to re-ingest content.
*   **Deployment and Rollback Strategies:**
    *   Deployment will likely involve Docker containers for Qdrant and the FastAPI application.
    *   Rollback strategy would involve deploying the previous stable Docker image.
*   **Feature Flags:** No feature flags planned for initial implementation.

### 7. Risk Analysis and Mitigation

*   **Top 3 Risks:**
    1.  **LLM Hallucinations/Inaccurate Responses:**
        *   **Blast Radius:** Users receive incorrect information, leading to distrust in the system.
        *   **Mitigation:**
            *   Emphasize source attribution in responses.
            *   Careful prompt engineering for the LLM.
            *   User feedback mechanism to report inaccuracies.
            *   Regular evaluation with ground truth data.
    2.  **Poor Retrieval Performance (Qdrant):**
        *   **Blast Radius:** LLM receives irrelevant context, leading to poor quality responses or hallucinations.
        *   **Mitigation:**
            *   Optimize text chunking strategy.
            *   Use high-quality embedding models.
            *   Experiment with Qdrant's search parameters (e.g., `top_k`).
            *   Monitor retrieval metrics (recall, precision).
    3.  **Scalability Issues (Qdrant / FastAPI):**
        *   **Blast Radius:** System becomes slow or unresponsive under high user load.
        *   **Mitigation:**
            *   Implement caching for frequently asked questions.
            *   Horizontally scale FastAPI instances.
            *   Consider Qdrant clustering for high-availability and distributed load.
            *   Load testing before production deployment.

### 8. Evaluation and Validation

*   **Definition of Done:**
    *   Qdrant setup is stable and accessible.
    *   Ingestion script successfully processes various book formats and populates Qdrant.
    *   RAG endpoint is functional, returning relevant responses and sources.
    *   Unit and integration tests pass for core components (text splitting, embedding generation, Qdrant interaction, API endpoint logic).
*   **Output Validation:**
    *   Responses should be coherent and directly address the user's query.
    *   Sources provided should be relevant to the generated response.
    *   API response format should adhere to the defined contract.

### 9. Architectural Decision Record (ADR)

*   📋 Architectural decision detected: Choice of RAG orchestration framework (LangChain/LlamaIndex) — Document reasoning and tradeoffs? Run `/sp.adr RAG Orchestration Framework Selection`
*   📋 Architectural decision detected: Choice of vector database (Qdrant) — Document reasoning and tradeoffs? Run `/sp.adr Vector Database Selection`

---

## Step-by-Step Implementation Guide

### Phase 1: Qdrant Setup and Client Integration

1.  **Run Qdrant (Docker):**
    *   Pull the Qdrant Docker image.
    *   Run Qdrant in a Docker container, mapping necessary ports (e.g., 6333 for API, 6334 for gRPC).
    *   Verify Qdrant is running by accessing its health endpoint.
2.  **Install Qdrant Client:**
    *   Add `qdrant-client` to `requirements.txt`.
    *   Install the client library (`pip install qdrant-client`).
3.  **Define Qdrant Collection:**
    *   Determine vector size (e.g., 384 for `all-MiniLM-L6-v2`).
    *   Choose a distance metric (e.g., `COSINE` for semantic similarity).
    *   Define payload structure for storing metadata (e.g., `file_path`, `chunk_id`, `page_number`).

### Phase 2: Ingestion Script Development

1.  **Project Structure:**
    *   Create a `scripts/` directory for the ingestion script.
    *   Create a `data/` directory to hold sample book content.
2.  **Install Dependencies:**
    *   Add `langchain`, `fastapi`, `uvicorn`, `pydantic`, `sentence-transformers`, `python-dotenv` to `requirements.txt`.
    *   Install them (`pip install -r requirements.txt`).
3.  **Load Book Content:**
    *   Use LangChain's `DirectoryLoader` or specific loaders (e.g., `PyPDFLoader`, `TextLoader`) to read content from the `data/` directory.
    *   Implement logic to handle different file types (e.g., `.txt`, `.md`, `.pdf`).
4.  **Text Splitting:**
    *   Use LangChain's `RecursiveCharacterTextSplitter` to break down large documents into smaller, semantically coherent chunks.
    *   Configure `chunk_size` and `chunk_overlap`.
5.  **Generate Embeddings:**
    *   Initialize an embedding model (e.g., `SentenceTransformerEmbeddings` from `langchain.embeddings.sentence_transformer` using `all-MiniLM-L6-v2`).
    *   Generate embeddings for each text chunk.
6.  **Store in Qdrant:**
    *   Initialize the `Qdrant` vector store from LangChain, connecting to the running Qdrant instance.
    *   Create a new collection (or reuse an existing one, potentially clearing it first for re-ingestion).
    *   Add the text chunks, their embeddings, and associated metadata (e.g., original file path, chunk index) to Qdrant.
7.  **Error Handling and Logging:**
    *   Implement `try-except` blocks for file reading, embedding generation, and Qdrant operations.
    *   Log successful ingestions and any errors encountered.

### Phase 3: RAG API Endpoint Development

1.  **Project Structure:**
    *   Create `app/` directory with `main.py` for the FastAPI application.
    *   Create `app/models/` for Pydantic models (e.g., `QueryRequest`, `QueryResponse`).
    *   Create `app/services/` for RAG logic.
2.  **FastAPI Application Setup (`app/main.py`):**
    *   Initialize FastAPI app.
    *   Define Pydantic models for request and response bodies.
3.  **RAG Service Logic (`app/services/rag_service.py`):**
    *   **Initialize Components:**
        *   Load the same embedding model used for ingestion.
        *   Connect to Qdrant.
        *   Initialize an LLM (e.g., `ChatOpenAI` from `langchain.chat_models` or a local equivalent).
    *   **Query Embedding:** Convert the incoming user query into an embedding.
    *   **Retrieval from Qdrant:**
        *   Perform a similarity search in Qdrant using the query embedding.
        *   Retrieve the top `k` most relevant text chunks and their metadata.
    *   **Context Augmentation:** Format the retrieved chunks into a clear context string for the LLM.
    *   **LLM Prompt Engineering:**
        *   Construct a prompt for the LLM that includes the user's query and the retrieved context.
        *   Instruct the LLM to answer based *only* on the provided context.
        *   Instruct the LLM to cite sources if possible (e.g., page numbers from metadata).
    *   **Response Generation:** Send the augmented prompt to the LLM and get its response.
    *   **Source Extraction:** Parse the metadata of the retrieved chunks to include in the API response.
4.  **API Endpoint (`app/main.py`):**
    *   Define a POST endpoint `/query` that accepts the `QueryRequest` Pydantic model.
    *   Call the RAG service to process the query.
    *   Return the `QueryResponse` Pydantic model.
5.  **Environment Variables:**
    *   Use `python-dotenv` to load Qdrant connection details, LLM API keys, etc., from a `.env` file.
6.  **Testing:**
    *   Write unit tests for text splitting, embedding generation, Qdrant interaction, and LLM prompting.
    *   Use `pytest` for testing.

### Phase 4: Refinements and Testing

1.  **Refine Chunking Strategy:** Experiment with different `chunk_size` and `chunk_overlap` values to optimize retrieval.
2.  **Optimize Qdrant Search:** Adjust `top_k` for retrieval to balance context length and relevance.
3.  **Prompt Engineering Iteration:** Refine the LLM prompt to improve answer quality, reduce hallucinations, and ensure proper source attribution.
4.  **Error Handling:** Enhance error messages for clarity.
5.  **Logging:** Implement comprehensive logging for both the ingestion script and the FastAPI application.
6.  **Basic Integration Testing:** Test the entire flow from ingestion to querying with sample book data.

---

### Critical Files for Implementation

-   `C:\Users\Umar Farooq\Desktop\unified-book-rag\app\main.py` - Core FastAPI application, API endpoint definition, and main entry point.
-   `C:\Users\Umar Farooq\Desktop\unified-book-rag\app\services\rag_service.py` - Contains the main RAG logic, including Qdrant interaction, embedding generation, and LLM prompting.
-   `C:\Users\Umar Farooq\Desktop\unified-book-rag\scripts\ingest_book_content.py` - Python script responsible for loading, chunking, embedding, and storing book content in Qdrant.
-   `C:\Users\Umar Farooq\Desktop\unified-book-rag\requirements.txt` - Lists all Python dependencies required for the project (FastAPI, Qdrant client, LangChain, sentence-transformers).
# Feature Specification: RAG Backend API

**Feature Branch**: `001-rag-backend-api`
**Created**: 2025-11-30
**Status**: Draft
**Input**: User description: "I want to build the RAG Backend in the root directory.\n\n**Core Endpoints**:\n1. **POST /rag/ingest**:\n   - Scans `/book_source/docs/` folder.\n   - Chunks markdown files (by headers).\n   - Generates Embeddings (text-embedding-3-small).\n   - Upserts into Qdrant collection `physical_ai_book`.\n\n2. **POST /rag/query**:\n   - Input: `{ query: str, selected_text: Optional[str] }`\n   - Logic:\n     - If `selected_text` exists, answer based ONLY on that snippet (Context-Aware).\n     - Else, search Qdrant for top 3 chunks and answer using OpenAI Agents SDK.\n\n3. **POST /content/translate**:\n   - Input: `{ text: str, target_lang: \"ur\" }`\n   - Logic: Use GPT-4o-mini to translate technical text to Urdu (using the `urdu-tech-translator` skill logic).\n\n4. **GET /auth/me**:\n   - Reads `better-auth.session_token` cookie.\n   - Verifies session in Neon DB.\n   - Returns User Profile (OS, Role)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ingest Book Content for RAG (Priority: P1)

As a content manager, I want to ingest the book's markdown files into the RAG backend so that users can query the book's content.

**Why this priority**: Essential for the RAG system to function; provides the core data.

**Independent Test**: Can be fully tested by calling the `/rag/ingest` endpoint and verifying data in the vector database.

**Acceptance Scenarios**:

1. **Given** the `/book_source/docs/` folder contains markdown files, **When** a POST request is sent to `/rag/ingest`, **Then** the files are scanned, chunked by headers, embeddings are generated using an appropriate text embedding model, and stored in a vector database collection named `physical_ai_book`.

---

### User Story 2 - Query Book Content (Priority: P1)

As a user, I want to query the RAG backend with a natural language question or selected text to get relevant answers from the book's content.

**Why this priority**: Core user interaction for the RAG system.

**Independent Test**: Can be fully tested by sending queries to the `/rag/query` endpoint and receiving context-aware or vector database-based answers.

**Acceptance Scenarios**:

1. **Given** the RAG backend has ingested book content, **When** a POST request is sent to `/rag/query` with a `query` and `selected_text` (optional), **Then** if `selected_text` is present, the answer is based *only* on that snippet.
2. **Given** the RAG backend has ingested book content, **When** a POST request is sent to `/rag/query` with only a `query`, **Then** the system searches the vector database for the top 3 relevant chunks and formulates an answer using an agent-based AI framework.

---

### User Story 3 - Translate Technical Content to Urdu (Priority: P2)

As a user, I want to translate technical text into Urdu so that I can understand the content in my preferred language.

**Why this priority**: Enhances accessibility and broadens the user base.

**Independent Test**: Can be fully tested by sending technical text to the `/content/translate` endpoint and receiving an Urdu translation.

**Acceptance Scenarios**:

1. **Given** a technical `text` and `target_lang: "ur"`, **When** a POST request is sent to `/content/translate`, **Then** the system uses a suitable AI model and a specialized translation skill to translate the text into Urdu.

---

### User Story 4 - Authenticate and Retrieve User Profile (Priority: P2)

As a logged-in user, I want the system to read my session token and return my profile information so that my identity and roles are recognized.

**Why this priority**: Important for personalized experiences and access control, but not core RAG functionality.

**Independent Test**: Can be fully tested by sending a GET request to `/auth/me` with a valid authentication session token (via cookie) and receiving user profile data.

**Acceptance Scenarios**:

1. **Given** a request with a designated authentication session token cookie, **When** a GET request is sent to `/auth/me`, **Then** the session is verified against the authentication database, and the User Profile (OS, Role) is returned.

---

### Edge Cases

- What happens when `/book_source/docs/` is empty or contains non-markdown files during ingestion?
- How does the system handle a `query` with no relevant results from the vector database?
- What happens if the specialized translation skill fails or returns an error?
- How does the `/auth/me` endpoint handle missing or invalid authentication session token cookies?
- What are the rate limits or security considerations for the external AI/API calls? The system should implement basic rate limiting (e.g., 10 requests per minute) and use standard API key security with HTTPS for all external AI/API calls.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a `POST /rag/ingest` endpoint to process and store book content.
- **FR-002**: The `/rag/ingest` endpoint MUST scan the `/book_source/docs/` directory.
- **FR-003**: The `/rag/ingest` endpoint MUST chunk markdown files by H1 and H2 headers.
- **FR-004**: The `/rag/ingest` endpoint MUST generate embeddings using a text embedding model.
- **FR-005**: The `/rag/ingest` endpoint MUST store generated embeddings and chunks into a vector database collection named `physical_ai_book`.
- **FR-006**: The system MUST provide a `POST /rag/query` endpoint for querying book content.
- **FR-007**: If `selected_text` is provided in the `/rag/query` request, the system MUST answer based *only* on that snippet.
- **FR-008**: If `selected_text` is NOT provided, the `/rag/query` endpoint MUST search the vector database for the top 3 relevant chunks.
- **FR-009**: If `selected_text` is NOT provided, the `/rag/query` endpoint MUST use an agent-based AI framework to formulate an answer based on retrieved chunks.
- **FR-010**: The system MUST provide a `POST /content/translate` endpoint for translating text to Urdu.
- **FR-011**: The `/content/translate` endpoint MUST use an appropriate AI model and a specialized translation skill for translation.
- **FR-012**: The system MUST provide a `GET /auth/me` endpoint for user authentication and profile retrieval.
- **FR-013**: The `/auth/me` endpoint MUST read a designated authentication session token from the cookie.
- **FR-014**: The `/auth/me` endpoint MUST verify the session token against the authentication database.
- **FR-015**: The `/auth/me` endpoint MUST return the User Profile (OS, Role) upon successful session verification.
- **FR-016**: All database and external AI calls MUST be asynchronous.
- **FR-017**: The API endpoint for ChatKit integration MUST stream responses in a basic streaming JSON structure, such as `{"chunk": "...", "final": false}` or `{"text": "...", "tool_calls": []}`.
- **FR-018**: The backend MUST be implemented using a robust web framework and an ORM/database integration.
- **FR-019**: All data models MUST adhere to strict typing guidelines.
- **FR-020**: Hybrid Search (combining keyword and vector approaches) MUST be implemented for `/rag/query` when `selected_text` is not provided.

### Key Entities *(include if feature involves data)*

- **BookContentChunk**: Represents a chunk of markdown text from `/book_source/docs/`, associated with its embedding and metadata (e.g., source file, headers).
- **UserSession**: Represents an authenticated user session, linked to an authentication session token and containing user profile details (OS, Role).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 99% of book content ingestion requests to `/rag/ingest` complete within 60 seconds for a typical chapter.
- **SC-002**: 95% of `/rag/query` requests (without `selected_text`) return a relevant answer within 5 seconds.
- **SC-003**: 98% of translated text from `/content/translate` is accurate and grammatically correct in Urdu, as evaluated by human review.
- **SC-004**: 100% of valid authentication session tokens result in a successful user profile retrieval from `/auth/me` within 100ms.
- **SC-005**: The `/rag/query` endpoint should only provide answers strictly based on the provided book context, with less than 1% hallucination rate.


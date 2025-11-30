# Skill: Modern RAG with OpenAI Agents SDK & Qdrant

## 1. The Stack
* **Orchestrator**: OpenAI Agents SDK (NOT LangChain).
* **Vector DB**: Qdrant Cloud (using `QdrantClient`).
* **UI**: ChatKit SDK (requires specific JSON response format).

## 2. The Architecture
1.  **Ingestion**:
    * Read Markdown files from `/book_source/docs/`.
    * Split by Headers (H1, H2) to keep context intact.
    * Upload to Qdrant collection `physical_ai_book`.
2.  **Retrieval (The Agent Pattern)**:
    * Define a tool `query_qdrant(search_term)`.
    * The OpenAI Agent decides *when* to call this tool.
    * If the user asks "How do I install ROS?", the Agent calls `query_qdrant("ROS installation")`.
3.  **ChatKit Integration**:
    * FastAPI endpoint must stream the response in the format ChatKit expects.

## 3. Principles
* **Strict Typing**: Use Pydantic models for everything.
* **Async**: All DB and AI calls must be `await`.
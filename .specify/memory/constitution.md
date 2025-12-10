<!--
Sync Impact Report:
Version change: 1.2.0 -> 1.3.0
Modified principles: N/A
Added sections:
- 6. Translation Implementation Requirements
Removed sections: N/A
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending
- .specify/templates/spec-template.md: ⚠ pending
- .specify/templates/tasks-template.md: ⚠ pending
- .specify/templates/commands/*.md: ⚠ pending
Follow-up TODOs:
- TODO(templates): Review and update .specify/templates/plan-template.md for consistency with new constitution.
- TODO(templates): Review and update .specify/templates/spec-template.md for consistency with new constitution.
- TODO(templates): Review and update .specify/templates/tasks-template.md for consistency with new constitution.
- TODO(templates): Review and update .specify/templates/commands/*.md for consistency with new constitution.
-->
# Project Constitution: Teaching Physical AI & Humanoid Robotics Course

## 1. Active Focus: Phase 2 Backend Development
*   **Root Directory (`/`)**: Main Python Backend (FastAPI + uv).
*   `/book_source` is now READ-ONLY source material for RAG.

## 2. Content Standards
*   **Format**: All book content MUST be written in Markdown (`.md`) files located within `/book_source/docs/` (READ-ONLY).
*   **Tone**: The content MUST maintain an Engineering-focused, Academic yet practical tone.
*   **Research**: All content MUST be based on live documentation, fetched via Playwright, and NOT generated from generic AI text.
*   **Structure**: Every chapter MUST adhere to the following structure:
    *   "Concept" (Theory and foundational understanding)
    *   "Simulation" (Practical guidance on running concepts in Isaac Sim/Mujoco)
    *   "Real World Application" (Examples and discussions related to Humanoid Robots).

## 3. Tech Stack (Full Stack)
*   **Backend**: FastAPI, SQLModel (Neon), OpenAI Agents SDK, Qdrant Client.
*   **Frontend**: Docusaurus 3.x for the static site generation.
*   **Styling**: TailwindCSS for all styling requirements.

## 4. Backend Standards
*   **Tech**: FastAPI, SQLModel (Neon), OpenAI Agents SDK, Qdrant Client.
*   **Ingestion**: MUST have a script to parse `/book_source/docs/*.md` and upload to Qdrant collection `physical_ai_book`.
*   **Auth**: MUST implement the "Sidecar" verification logic (reading cookies).

## 5. RAG Requirements
*   **Search**: Hybrid Search (Keyword + Vector) MUST be preferred.
*   **Accuracy**: Answers MUST be strictly based on the book context.

## 6. Translation Implementation Requirements
*   **Security**: API Keys (GEMINI_API_KEY) must never be hardcoded. Always use dotenv and process environment variables.
*   **Performance**: Use gemini-2.5-flash. It is optimized for high-frequency, low-latency tasks like real-time translation.
*   **Data Integrity**: The translation process must preserve Markdown syntax. Headers (#), Bold (**), Links ([]()), and Code Blocks (```) must remain intact.
*   **Linguistic Constraint**: Code keywords, variable names, and terminal commands must remain in English. Only documentation prose is to be translated to Urdu.
*   **UI/UX**: Urdu text must be rendered with direction: rtl (Right-to-Left) and a legible font (e.g., Noto Nastaliq Urdu).

## Governance
<!-- Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->
All development and architectural decisions must comply with this constitution. Amendments to this constitution require a documented proposal, approval from the architectural review board (ARB), and a clear migration plan for existing components. All pull requests and code reviews must verify compliance with these principles.

**Version**: 1.3.0 | **Ratified**: 2025-11-28 | **Last Amended**: 2025-12-09

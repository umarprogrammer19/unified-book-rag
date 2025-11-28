<!--
Sync Impact Report:
Version change: 1.0.0 -> 1.0.1
Modified principles: Added 'Git Workflow' principle
Added sections: '5. Git Workflow'
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
# Project Constitution: Unified Book RAG

## 1. Architecture: The "Sidecar Pattern"
* **Root (`/`)**: Main Python Backend (FastAPI + uv). Handles RAG, Translation, Personalization.
* **`/auth_service`**: Auth Sidecar (Node.js + Better-Auth). Handles Signup/Login/Session Cookies.
* **`/book_source`**: Frontend (Docusaurus).

## 2. The Shared Database Rule (CRITICAL)
* Both Python (Root) and Node.js (Auth) MUST connect to the SAME Neon Postgres Database.
* **Auth Service**: WRITES to `user` and `session` tables.
* **Python Backend**: READS `session` table to verify users.

## 3. Technology Stack
* **Backend**: Python 3.12+, SQLModel, OpenAI Agents SDK, Qdrant.
* **Auth**: Better-Auth (Node.js).
* **Frontend**: Docusaurus 3.x + TailwindCSS.

## 4. Bonus Requirements (The 300 Points)
* RAG with "Selected Text" context is mandatory.
* Personalization based on User Profile (OS/Role) is mandatory.
* Urdu Translation via AI is mandatory.

## 5. Git Workflow
* All file changes MUST be added to the staging area using 'git add .' before committing.

## Governance
<!-- Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->
All development and architectural decisions must comply with this constitution. Amendments to this constitution require a documented proposal, approval from the architectural review board (ARB), and a clear migration plan for existing components. All pull requests and code reviews must verify compliance with these principles.

**Version**: 1.0.1 | **Ratified**: 2025-11-28 | **Last Amended**: 2025-11-28

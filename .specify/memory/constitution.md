<!--
Sync Impact Report:
Version change: 1.0.1 -> 1.1.0
Modified principles:
- 1. Architecture -> 1. Project Goal
- 2. The Shared Database Rule (CRITICAL) -> 2. Content Standards
- 3. Technology Stack (Backend/Auth) -> 3. Tech Stack (Frontend focus)
- 4. Bonus Requirements (The 300 Points) -> Removed
- 5. Git Workflow -> Removed
Added sections: N/A
Removed sections: "4. Bonus Requirements (The 300 Points)", "5. Git Workflow"
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

## 1. Project Goal: Phase 1 Book Generation
*   Create a high-quality technical book: "Teaching Physical AI & Humanoid Robotics Course".
*   Focus ONLY on Frontend (`/book_source`) development and content generation during Phase 1.

## 2. Content Standards
*   **Format**: All book content MUST be written in Markdown (`.md`) files located within `/book_source/docs/`.
*   **Tone**: The content MUST maintain an Engineering-focused, Academic yet practical tone.
*   **Research**: All content MUST be based on live documentation, fetched via Playwright, and NOT generated from generic AI text.
*   **Structure**: Every chapter MUST adhere to the following structure:
    *   "Concept" (Theory and foundational understanding)
    *   "Simulation" (Practical guidance on running concepts in Isaac Sim/Mujoco)
    *   "Real World Application" (Examples and discussions related to Humanoid Robots).

## 3. Tech Stack
*   **Frontend**: Docusaurus 3.x for the static site generation.
*   **Styling**: TailwindCSS for all styling requirements.

## Governance
<!-- Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->
All development and architectural decisions must comply with this constitution. Amendments to this constitution require a documented proposal, approval from the architectural review board (ARB), and a clear migration plan for existing components. All pull requests and code reviews must verify compliance with these principles.

**Version**: 1.1.0 | **Ratified**: 2025-11-28 | **Last Amended**: 2025-11-28

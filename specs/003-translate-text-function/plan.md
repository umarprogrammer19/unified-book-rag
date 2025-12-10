# Implementation Plan: Translation Function for Urdu Content

**Branch**: `001-translate-text-function` | **Date**: 2025-12-09 | **Spec**: [link to spec.md](spec.md)
**Input**: Feature specification from `/specs/003-translate-text-function/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of a translateText function that converts Markdown educational content to Urdu while preserving all formatting elements (headers, bold, links, code blocks) and keeping technical terms in English. The function will use the Gemini API with gemini-2.5-flash model following specific system instructions to maintain technical accuracy.

## Technical Context

**Language/Version**: Python 3.11 (consistent with existing backend)
**Primary Dependencies**: google-generativeai (for Gemini API), FastAPI (for API endpoints), Pydantic (for data validation)
**Storage**: N/A (processing in-memory, source content from book_source/docs files)
**Testing**: pytest for unit and integration tests
**Target Platform**: Linux server (backend service)
**Project Type**: Web (integration with existing FastAPI backend)
**Performance Goals**: Process documents up to 5000 words in under 10 seconds
**Constraints**: <200ms API call overhead, preserve all Markdown formatting, keep technical terms in English
**Scale/Scope**: Single user translation requests, up to 10 concurrent translations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **Security Principle**: API Keys (GEMINI_API_KEY) must never be hardcoded. Plan must use dotenv and process environment variables. ✅
2. **Performance Principle**: Use gemini-2.5-flash as determined through research (aligning constitution and feature spec). ✅
3. **Data Integrity**: Translation process must preserve Markdown syntax. Headers (#), Bold (**), Links ([]()), and Code Blocks (```) must remain intact. ✅
4. **Linguistic Constraint**: Code keywords, variable names, and terminal commands must remain in English. Only documentation prose is to be translated to Urdu. ✅
5. **Tech Stack Consistency**: Must integrate with existing FastAPI, SQLModel (Neon), OpenAI Agents SDK, Qdrant Client stack. ✅

## Project Structure

### Documentation (this feature)

```text
specs/003-translate-text-function/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
# Option 1: Single project (integrated with existing backend)
src/
├── services/
│   ├── translation_service.py      # Main translation logic
│   └── markdown_preservation.py    # Markdown formatting preservation
├── api/
│   └── v1/
│       └── translation.py          # Translation API endpoints
├── models/
│   └── translation.py              # Translation request/response models
└── utils/
    └── text_processing.py          # Text processing utilities
```

**Structure Decision**: Integration with existing FastAPI backend in the main Python backend directory, consistent with the project's active focus on Phase 2 Backend Development.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | All constitution requirements satisfied | N/A |
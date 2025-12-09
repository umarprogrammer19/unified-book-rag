---
id: 001
title: Specify Translation Function
stage: spec
date: 2025-12-09
surface: agent
model: claude-opus-4-5-20251101
feature: 001-translate-text-function
branch: 001-translate-text-function
user: user
command: /sp.specify how the "Translate" function works conceptually.

Method: translateText(text: string) -> string
Input: Raw Markdown string from the frontend.

Processing (Gemini API):
Model: gemini-2.5-flash

System Instruction:
"You are a technical translator. Convert the following text to Urdu. Preserve ALL Markdown formatting exactly. Do NOT translate code blocks, variable names, or technical path parameters. Output ONLY the translated string."

Output: The translated Markdown string only translate chapter which are stored in book_source/docs check with ls.
labels: [spec,translation,urdu,markdown]
links:
  spec: specs/001-translate-text-function/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-translate-text-function/spec.md
 - specs/001-translate-text-function/checklists/requirements.md
tests:
 - none
---

## Prompt

```text
how the "Translate" function works conceptually.

Method: translateText(text: string) -> string
Input: Raw Markdown string from the frontend.

Processing (Gemini API):
Model: gemini-2.5-flash

System Instruction:
"You are a technical translator. Convert the following text to Urdu. Preserve ALL Markdown formatting exactly. Do NOT translate code blocks, variable names, or technical path parameters. Output ONLY the translated string."

Output: The translated Markdown string only translate chapter which are stored in book_source/docs check with ls.
```

## Response snapshot

Created a comprehensive specification for the translation function that converts Markdown text to Urdu while preserving formatting and technical content. The specification includes user scenarios for P1-P3 priorities, functional requirements for the translateText function, and success criteria for measuring translation quality and performance. The spec addresses the core requirement of translating educational content from book_source/docs while maintaining all Markdown formatting and keeping technical terms in English.

## Outcome

- ✅ Impact: Created complete specification for translation functionality
- 🧪 Tests: none
- 📁 Files: 2 files (spec.md and requirements checklist)
- 🔁 Next prompts: Planning phase for translation implementation
- 🧠 Reflection: Specification clearly defines the translation requirements with proper boundaries

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
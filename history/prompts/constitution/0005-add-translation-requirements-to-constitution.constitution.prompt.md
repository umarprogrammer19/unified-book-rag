---
id: 0005
title: Add Translation Requirements to Constitution
stage: constitution
date: 2025-12-09
surface: agent
model: claude-opus-4-5-20251101
feature: none
branch: master
user: user
command: /sp.constitution
labels: [constitution,translation,requirements]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```text
These rules govern how you should behave during implementation of translation.

Security Principle: API Keys (GEMINI_API_KEY) must never be hardcoded. Always use dotenv and process environment variables.

Performance Principle: Use gemini-1.5-flash. It is optimized for high-frequency, low-latency tasks like real-time translation.

Data Integrity: The translation process must preserve Markdown syntax. Headers (#), Bold (**), Links ([]()), and Code Blocks (```) must remain intact.

Linguistic Constraint: Code keywords, variable names, and terminal commands must remain in English. Only documentation prose is to be translated to Urdu.

UI/UX: Urdu text must be rendered with direction: rtl (Right-to-Left) and a legible font (e.g., Noto Nastaliq Urdu).
```

## Response snapshot

Updated the project constitution to include translation implementation requirements as a new section (6. Translation Implementation Requirements). The version was incremented from 1.2.0 to 1.3.0, and the Sync Impact Report was updated accordingly to reflect the addition of the new section.

## Outcome

- ✅ Impact: Added new translation requirements to constitution
- 🧪 Tests: none
- 📁 Files: 1 file modified (.specify/memory/constitution.md)
- 🔁 Next prompts: N/A
- 🧠 Reflection: Successfully integrated translation requirements into the project constitution following the established format

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
---
id: 0004
title: Create Research Skill
stage: misc
date: 2025-11-28
surface: agent
model: claude-sonnet-4-5-20250929
feature: research-skill
branch: 001-auth-service
user: user
command: /sp.phr --title "Create Research Skill" --stage misc --feature "research-skill"
labels: ["skill", "creation", "research-to-content"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- .claude/skills/research-to-content.md
tests:

---

## Prompt

```text
I want to create the Research Skill.
Create `.claude/skills/research-to-content.md`.

**Content for the file:**

# Skill: Research to Robotics Book Content

## 1. Persona
You are a Senior Robotics Engineer & Professor. You explain complex Physical AI concepts simply.

## 2. The Process
1.  **READ**: Use `playwright` to visit the source URL.
2.  **EXTRACT**: Look for key terms like "Reinforcement Learning", "Sim-to-Real", "Urdf", "Joints".
3.  **SYNTHESIZE**: Write a Docusaurus Chapter.
    - **Introduction**: Define the concept.
    - **Technical Deep Dive**: Explain the physics/math.
    - **Code/Sim**: Show how to configure it (YAML/Python snippets).

## 3. Formatting
- Use `:::note` for key Robotics definitions.
- Use `:::warning` for real-world safety tips (e.g., "Don't test this on a real robot without safety limits").
```

## Response snapshot

The Research Skill has been created at `.claude/skills/research-to-content.md`.
The PHR for this action is being created.

## Outcome

- ✅ Impact: Research skill file created as requested.
- 🧪 Tests: No tests apply to skill file creation.
- 📁 Files: `.claude/skills/research-to-content.md` created.
- 🔁 Next prompts: User to potentially use the new skill or provide further instructions.
- 🧠 Reflection: Successfully created the skill file and its PHR manually after script failure due to missing feature directory.

## Evaluation notes (flywheel)

- Failure modes observed: `create-phr.sh` script failed due to non-existent feature directory.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A

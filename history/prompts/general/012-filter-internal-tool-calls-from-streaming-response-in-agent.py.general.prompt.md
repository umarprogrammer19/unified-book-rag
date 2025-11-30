---
id: 012
title: Filter internal tool calls from streaming response in agent.py
stage: general
date: 2025-11-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: rag-backend-api
branch: 001-rag-backend-api
user:
command:
labels: ["bugfix", "streaming", "agent.py"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - app/agent.py
tests_yaml:
  -
prompt_text: |
    i am getting these type of response what can i do? i want response from book and  nd
response_text: |
    Modified `app/agent.py` to filter out internal tool invocation details from the `raw_response_event` stream using a `tool_call_in_progress` flag. This ensures that only the agent's actual conversational text and structured `tool_code_event` outputs are streamed to the client.
outcome: Fragmented tool call output in streaming response resolved.
evaluation: The `get_rag_agent_response` function in `app/agent.py` was enhanced to include logic that detects and filters out tool invocation patterns (`<tool_code>...</tool_code>`) from `raw_response_event` deltas, preventing internal agent thoughts from being streamed. Only human-readable conversational text and structured tool outputs are now yielded, leading to a cleaner streaming experience.
---
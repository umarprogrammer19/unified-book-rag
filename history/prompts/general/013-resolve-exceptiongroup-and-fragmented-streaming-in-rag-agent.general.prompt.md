---
id: 013
title: Resolve ExceptionGroup and fragmented streaming in RAG agent
stage: general
date: 2025-11-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: rag-backend-api
branch: 001-rag-backend-api
user: Umar Farooq
command: do something wrong @agent-rag-engineer check rag system and check why i am getting this response and also https://openai.github.io/openai-agents-python/streaming/ https://openai.github.io/openai-agents-python/ these docs for understanding opea ai agents sdk and fix my whole app
labels: ["bugfix", "streaming", "rag-engineer", "openai-agents-sdk"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - app/agent.py
  - requirements.txt
tests_yaml:
  -
prompt_text: |
    <system-reminder>
    The user selected the lines 0 to 0 from c:\Users\Umar Farooq\Desktop\unified-book-rag\book_source\docs\Module 02 ROS2-Basics\2.1-ros2-core-concepts.md:
    ROS 2 Fundamentals & Core Programming

    This may or may not be related to the current task.
    </system-reminder>INFO:     Application startup complete.
    INFO:     127.0.0.1:59977 - "POST /api/chat HTTP/1.1" 200 OK
    ERROR:    Exception in ASGI application
      + Exception Group Traceback (most recent call last):
      |   File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\_utils.py", line 79, in collapse_excgroups
      |     yield
      |   File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\responses.py", line 270, in __call__
      |     async with anyio.create_task_group() as task_group:
      |                ~~~~~~~~~~~~~~~~~~~~~~~^^
      |   File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\anyio\_backends\_asyncio.py", line 783, in __aexit__
      |     raise BaseExceptionGroup(
      |         "unhandled errors in a TaskGroup", self._exceptions
      |     ) from None
      | ExceptionGroup: unhandled errors in a TaskGroup (1 sub-exception)
      +-+---------------- 1 ----------------
        | Traceback (most recent call last):
        |   File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\uvicorn\protocols\http\httptools_impl.py", line 409, in run_asgi
        |     result = await app(  # type: ignore[func-returns-value]
        |              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        |         self.scope, self.receive, self.send
        |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        |     )
        |     ^
        |   File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\uvicorn\middleware\proxy_headers.py", line 60, in __call__
        |     return await self.app(scope, receive, send)do something wrong @agent-rag-engineer check rag system and check why i am getting this response and also https://openai.github.io/openai-agents-python/streaming/ https://openai.github.io/openai-agents-python/ these docs for understanding opea ai agents sdk and fix my whole app
response_text: |
    The `rag-engineer` agent identified and resolved an `ExceptionGroup` error during streaming. It refactored `get_rag_agent_response` in `app/agent.py` to correctly stream conversational text from `text_delta_event` and structured `search_book` results from `tool_output_event`, ensuring stable and ChatKit-compatible streaming. `requirements.txt` was also confirmed to have correct dependencies.
outcome: Streaming issues and `ExceptionGroup` resolved in the RAG agent and application.
evaluation: The `rag-engineer` agent successfully diagnosed and fixed the streaming errors by implementing a robust event-handling mechanism in `app/agent.py`, leading to proper conversational text and structured source streaming. The agent also ensured all dependencies were correctly listed in `requirements.txt`.
---
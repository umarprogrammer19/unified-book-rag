---
id: 004
title: User reports AttributeError in RAG agent
stage: general
date: 2025-11-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-rag-backend-api
user: user
command: ERROR:    Exception in ASGI application
Traceback (most recent call last):
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\uvicorn\protocols\http\httptools_impl.py", line 409, in run_asgi
    result = await app(  # type: ignore[func-returns-value]
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        self.scope, self.receive, self.send
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\uvicorn\middleware\proxy_headers.py", line 60, in __call__
    return await self.app(scope, receive, send)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\fastapi\applications.py", line 1134, in __call__
    await super().__call__(scope, receive, send)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\applications.py", line 107, in __call__
    await self.middleware_stack(scope, receive, send)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\middleware\errors.py", line 186, in __call__
    raise exc
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\middleware\errors.py", line 164, in __call__
    await self.app(scope, receive, _send)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\middleware\exceptions.py", line 63, in __call__
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app
    raise exc
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app
    await app(scope, receive, sender)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\fastapi\middleware\asyncexitstack.py", line 18, in __call__    await self.app(scope, receive, send)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\routing.py", line 716, in __call__
    await self.middleware_stack(scope, receive, send)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\routing.py", line 736, in app
    await route.handle(scope, receive, send)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\routing.py", line 290, in handle
    await self.app(scope, receive, send)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\fastapi\routing.py", line 125, in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app
    raise exc
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app
    await app(scope, receive, sender)
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\fastapi\routing.py", line 111, in app
    response = await f(request)
               ^^^^^^^^^^^^^^^^
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\fastapi\routing.py", line 391, in app
    raw_response = await run_endpoint_function(
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ...<3 lines>...
    )
    ^
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\fastapi\routing.py", line 290, in run_endpoint_function
    return await dependant.call(**values)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\app\main.py", line 51, in chat_endpoint
    agent_chatkit_response = await get_rag_agent_response(user_message)
                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Umar Farooq\Desktop\unified-book-rag\app\agent.py", line 84, in get_rag_agent_response
    response_stream = rag_agent.astream_response_as_dict(user_message)
                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AttributeError: 'Agent' object has no attribute 'astream_response_as_dict' while post getting internal server err

## Response snapshot

Assistant confirms the fix and asks the user to restart the server and re-test.

## Outcome

- ✅ Impact: Fixed a critical error in the RAG agent's response streaming.
- 🧪 Tests: User needs to restart the server and re-test the chat endpoint.
- 📁 Files: app/agent.py (modified)
- 🔁 Next prompts: User to confirm resolution after re-testing.
- 🧠 Reflection: Identified the correct usage of `Runner` for `astream_response_as_dict` based on `agents` SDK knowledge.

## Evaluation notes (flywheel)

- Failure modes observed: `AttributeError` due to incorrect API usage.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A

---
id: 008
title: Fix fragmented streaming output from RAG agent
stage: general
date: 2025-11-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: rag-backend-api
branch: 001-rag-backend-api
user:
command:
labels: ["fastapi", "streaming", "bugfix"]
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
    {
        "text": "{\""
    }{
        "text": "query"
    }{
        "text": "\":\""
    }{
        "text": "digital"
    }{
        "text": " twin"
    }{
        "text": " workstation"
    }{
        "text": "\"}"
    }{
        "text": "I'm"
    }{
        "text": " sorry"
    }{
        "text": ","
    }{
        "text": " but"
    }{
        "text": " I"
    }{
        "text": " wasn't"
    }{
        "text": " able"
    }{
        "text": " to"
    }{
        "text": " retrieve"
    }{
        "text": " information"
    }{
        "text": " about"
    }{
        "text": " a"
    }{
        "text": " \""
    }{
        "text": "digital"
    }{
        "text": " twin"
    }{
        "text": " workstation"
    }{
        "text": "\""
    }{
        "text": " from"
    }{
        "text": " the"
    }{
        "text": " book"
    }{
        "text": " at"
    }{
        "text": " this"
    }{
        "text": " time"
    }{
        "text": "."
    }{
        "text": " If"
    }{
        "text": " you"
    }{
        "text": " have"
    }{
        "text": " another"
    }{
        "text": " question"
    }{
        "text": " or"
    }{
        "text": " if"
    }{
        "text": " you'd"
    }{
        "text": " like"
    }{
        "text": " me"
    }{
        "text": " to"
    }{
        "text": " try"
    }{
        "text": " searching"
    }{
        "text": " again"
    }{
        "text": ","
    }{
        "text": " please"
    }{
        "text": " let"
    }{
        "text": " me"
    }{
        "text": " know"
    }{
        "text": "!"
    }

    response is 200 but getting this why?
response_text: |
    Modified `app/agent.py` to correctly stream `agent_text_event` and `tool_code_event` as distinct, properly JSON-formatted chunks, resolving the issue of fragmented output.
outcome: Fragmented streaming output resolved, and client now receives clean, structured text and source information.
evaluation: The `get_rag_agent_response` function in `app/agent.py` was refined to differentiate between agent text and tool code events, yielding only the relevant data in well-formed JSON chunks. This ensures that intermediate agent thoughts are not streamed as part of the conversational text, providing a cleaner and more usable streaming experience for the client.
---
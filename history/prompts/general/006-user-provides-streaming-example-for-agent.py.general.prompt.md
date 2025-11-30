---
id: 006
title: User provides streaming example for agent.py
stage: general
date: 2025-11-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-rag-backend-api
user:
command:
labels: ["streaming", "agent.py", "RAG"]
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
    import asyncio
    from openai.types.responses import ResponseTextDeltaEvent
    from agents import Agent, Runner

    async def main():
        agent = Agent(
            name="Joker",
            instructions="You are a helpful assistant.",
        )

        result = Runner.run_streamed(agent, input="Please tell me 5 jokes.")
        async for event in result.stream_events():
            if event.type == "raw_response_event" and isinstance(event.data, ResponseTextDeltaEvent):
                print(event.data.delta, end="", flush=True)


    if __name__ == "__main__":
        asyncio.run(main()) this is a correct way for streaming see this and add it in agent.py i have done some changes with it
response_text: |
    I have incorporated the streaming example into `app/agent.py` by modifying the `get_rag_agent_response` function to stream responses directly.
outcome: Streaming functionality implemented for RAG agent.
evaluation: The `get_rag_agent_response` function in `app/agent.py` was updated to be an asynchronous generator, yielding streamed content suitable for ChatKit.
---
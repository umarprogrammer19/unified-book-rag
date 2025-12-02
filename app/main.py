from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any, AsyncGenerator
from starlette.responses import StreamingResponse
import uvicorn
import os
import asyncio
import json
from dotenv import load_dotenv

load_dotenv() # Load environment variables as early as possible

from app.services.ingestion import ingest_book
from app.agent import get_rag_agent_response

app = FastAPI()

# Pydantic models for ChatKit compatibility
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    messages: List[ChatMessage]

@app.on_event("startup")
async def startup_event():
    print("Application startup: Running book content ingestion...")
    await ingest_book()
    print("Book content ingestion completed.")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    user_message = request.messages[-1].content # Get the latest user message
    print(f"Received chat message: {user_message}")

    full_response_content = ""
    all_sources = []

    async for chunk in get_rag_agent_response(user_message):
        if "text" in chunk:
            full_response_content += chunk["text"]
        if "sources" in chunk:
            all_sources.extend(chunk["sources"])

    # Format sources for display if they exist
    sources_text = ""
    if all_sources:
        sources_text += "\n\nSources:\n"
        for source in all_sources:
            # Assuming 'source_file' is the key for the file name in the source dict
            source_file = source.get("source_file", "unknown")
            sources_text += f"- [{source_file}](book_source/{source_file})\n"


    final_response_message = full_response_content + sources_text

    return ChatResponse(messages=[ChatMessage(role="assistant", content=final_response_message)])

if __name__ == "__main__":
    # For local development, you can run this file directly:
    # python app/main.py
    uvicorn.run(app, host="0.0.0.0", port=8000)

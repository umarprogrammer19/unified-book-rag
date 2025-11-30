from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any, AsyncGenerator
from starlette.responses import StreamingResponse
import uvicorn
import os
import asyncio
import json

from app.agent import get_rag_agent_response
from app.services.ingestion import ingest_book_content

app = FastAPI()

# Pydantic models for ChatKit compatibility
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    messages: List[ChatMessage]
    # ChatKit often expects a structured response including sources, if any.
    # For this example, we'll include a simple message list.
    # A more advanced ChatKit integration might have a specific 'tool_outputs' or 'source_documents' field.

@app.on_event("startup")
async def startup_event():
    print("Application startup: Running book content ingestion...")
    # Determine the absolute path to book_source/docs relative to the project root
    current_file_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(current_file_dir, ".."))
    book_docs_path = os.path.join(project_root, "book_source", "docs")

    # Check if the directory exists before proceeding with ingestion
    if not os.path.isdir(book_docs_path):
        print(f"Warning: Book source directory not found at {book_docs_path}. Skipping ingestion.")
    else:
        await ingest_book_content()
    print("Book content ingestion completed (if directory existed).")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    user_message = request.messages[-1].content # Get the latest user message

    async def generate_response_stream():
        async for chunk in get_rag_agent_response(user_message):
            # Each chunk is expected to be a dictionary, e.g., {"text": "..."}
            # or {"sources": "..."}
            yield json.dumps(chunk)

    return StreamingResponse(generate_response_stream(), media_type="application/x-ndjson")

if __name__ == "__main__":
    # For local development, you can run this file directly:
    # python app/main.py
    uvicorn.run(app, host="0.0.0.0", port=8000)

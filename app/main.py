from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, AsyncGenerator
from starlette.responses import StreamingResponse
import uvicorn
import json
from dotenv import load_dotenv
import os 

load_dotenv() # Load environment variables as early as possible

from app.services.ingestion import ingest_book
from app.agent import get_rag_agent_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    async def generate_response_stream():
        async for chunk in get_rag_agent_response(user_message):
            # Each chunk is expected to be a dictionary, e.g., {"text": "..."}
            # or {"sources": "..."}
            yield json.dumps(chunk) + "\n"

    return StreamingResponse(generate_response_stream(), media_type="application/x-ndjson")

if __name__ == "__main__":
    # For local development, you can run this file directly:
    # python app/main.py
    host = os.getenv("HOST")
    port = int(os.getenv("PORT"))

    uvicorn.run(app, host=host, port=port)
from pydantic import BaseModel

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: list[ChatMessage]

class SourceDetail(BaseModel):
    page: int | None = None
    content_snippet: str

class ChatResponse(BaseModel):
    response: str
    sources: list[SourceDetail] = []

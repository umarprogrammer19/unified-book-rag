# Skill: Correct RAG with OpenAI Tool Calling & Qdrant

## 1. The Problem
The agent keeps returning empty responses because it fails to call the `search_tool` correctly or the ingestion is broken.

## 2. The Solution: Ingestion (`app/services/ingestion.py`)
You MUST use this logic to chunk files:
```python
import os
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct, VectorParams, Distance
from openai import OpenAI

# Connect
qdrant = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))
openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ingest_book():
    # 1. Create Collection
    qdrant.recreate_collection(
        collection_name="physical_ai_book",
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
    )

    # 2. Read Files
    points = []
    idx = 0
    docs_path = "book_source/docs"

    for filename in os.listdir(docs_path):
        if filename.endswith(".md"):
            with open(f"{docs_path}/{filename}", "r", encoding="utf-8") as f:
                text = f.read()
                # Simple Chunking by H2 headers or paragraphs
                chunks = text.split("\n## ")

                for chunk in chunks:
                    if len(chunk.strip()) < 50: continue

                    # Embedding
                    emb = openai.embeddings.create(input=chunk, model="text-embedding-3-small").data[0].embedding

                    points.append(PointStruct(
                        id=idx,
                        vector=emb,
                        payload={"source": filename, "text": chunk}
                    ))
                    idx += 1

    # 3. Upload
    qdrant.upsert(collection_name="physical_ai_book", points=points)
    print(f"Success! Uploaded {len(points)} chunks.")
```
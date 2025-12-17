import asyncio
import os
from qdrant_client import AsyncQdrantClient
from qdrant_client.http.models import PointStruct, VectorParams, Distance
from openai import AsyncOpenAI
from dotenv import load_dotenv
import hashlib
import uuid
from typing import List

load_dotenv()

# Connect
qdrant = AsyncQdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"), timeout=300)
openai_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"), timeout=300)

def find_markdown_files(directory: str) -> List[str]:
    markdown_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                markdown_files.append(os.path.join(root, file))
    return markdown_files

async def ingest_book():
    print("Ingestion: Step 1 - Creating/recreating Qdrant collection...")
    # 1. Create Collection
    await qdrant.recreate_collection(
        collection_name="physical_ai_book",
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
    )
    print("Ingestion: Step 1 - Collection created/recreated.")

    # 2. Read Files
    all_chunks = []
    docs_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "book_source", "docs")

    markdown_files_found = find_markdown_files(docs_path)
    print(f"Ingestion: Step 2 - Found {len(markdown_files_found)} markdown files. Starting chunk processing...")

    if not markdown_files_found:
        print(f"No markdown files found in {docs_path}. Skipping ingestion.")
        return

    for filepath in markdown_files_found:
        print(f"Ingestion: Processing file: {filepath}")
        with open(filepath, "r", encoding="utf-8") as f:
            text = f.read()
            chunks_from_file = text.split("\n## ")
            print(f"Ingestion: File {os.path.basename(filepath)} split into {len(chunks_from_file)} potential chunks.")

            for chunk_index, chunk_content in enumerate(chunks_from_file):
                if len(chunk_content.strip()) < 50:
                    continue
                all_chunks.append({"content": chunk_content, "filepath": filepath, "index": chunk_index})

    print(f"Ingestion: Collected {len(all_chunks)} valid chunks. Generating embeddings concurrently...")

    embedding_tasks = []
    for chunk_data in all_chunks:
        embedding_tasks.append(openai_client.embeddings.create(input=chunk_data["content"], model="text-embedding-3-small"))

    try:
        embeddings_responses = await asyncio.gather(*embedding_tasks)
        print(f"Ingestion: Successfully generated {len(embeddings_responses)} embeddings concurrently.")
    except Exception as e:
        print(f"Ingestion Error: Failed to generate embeddings concurrently: {e}")
        return # Exit if embedding generation fails

    points = []
    for i, embedding_response in enumerate(embeddings_responses):
        chunk_data = all_chunks[i]
        emb = embedding_response.data[0].embedding

        # Generate a unique ID using UUID4 for Qdrant point IDs
        unique_content_id = str(uuid.uuid4())

        points.append(PointStruct(
            id=unique_content_id,
            vector=emb,
            payload={"source": os.path.basename(chunk_data["filepath"]), "text": chunk_data["content"]}
        ))

    print(f"Ingestion: Step 3 - Upserting {len(points)} points to Qdrant...")
    await qdrant.upsert(
        collection_name="physical_ai_book",
        wait=True,
        points=points
    )
    print("Ingestion: Step 3 - Upsert complete.")

if __name__ == "__main__":
    import asyncio
    asyncio.run(ingest_book())

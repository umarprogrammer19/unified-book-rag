import os
import re
import hashlib
from typing import List, Dict, Any
from qdrant_client import QdrantClient, models
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables.")
if not QDRANT_URL:
    raise ValueError("QDRANT_URL not found in environment variables.")

openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)
qdrant_client_instance = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY
)

COLLECTION_NAME = "physical_ai_book"
VECTOR_SIZE = 1536 # Size for text-embedding-ada-002

def find_markdown_files(directory: str) -> List[str]:
    """
    Recursively finds all .md files in the given directory, excluding specific chapter files.
    """
    markdown_files = []
    # Use os.path.normpath for consistent path comparisons
    excluded_files = [
        os.path.normpath(os.path.join(directory, 'chapter1.md')),
        os.path.normpath(os.path.join(directory, 'chapter2.md')),
    ]
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                full_path = os.path.normpath(os.path.join(root, file))
                if full_path not in excluded_files:
                    markdown_files.append(full_path)
    return markdown_files

def chunk_markdown_content(file_path: str) -> List[Dict[str, Any]]:
    """
    Chunks markdown content based on H1 and H2 headers, preserving context.
    Returns a list of dictionaries, each containing 'content', 'headers', and 'source_file'.
    """
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    chunks = []
    current_h1 = None
    current_h2 = None

    # Split content by H1 and H2 headers, including the headers in the split result
    # Using re.split with capturing groups to keep the delimiters
    segments = re.split(r'(?m)^(?:#\s.*|##\s.*)', content)
    # Find all headers to associate them with their respective content segments
    headers = re.findall(r'(?m)^(?:#\s.*|##\s.*)', content)

    # If there's content before the first header, handle it as a single chunk
    if segments and segments[0].strip():
        chunks.append({
            "content": segments[0].strip(),
            "headers": [], # No headers before the first one
            "source_file": os.path.basename(file_path)
        })

    # Process each header and its corresponding segment
    for i, header_text in enumerate(headers):
        header_text = header_text.strip()
        segment_content = segments[i+1].strip() if i+1 < len(segments) else ""

        if header_text.startswith("# "):
            current_h1 = header_text.replace("# ", "", 1).strip()
            current_h2 = None # Reset H2 when a new H1 is encountered
        elif header_text.startswith("## "):
            current_h2 = header_text.replace("## ", "", 1).strip()

        headers_list = []
        if current_h1:
            headers_list.append(current_h1)
        if current_h2:
            headers_list.append(current_h2)

        full_chunk_content = f"{header_text}\n{segment_content}".strip()
        if full_chunk_content:
            chunks.append({
                "content": full_chunk_content,
                "headers": headers_list,
                "source_file": os.path.basename(file_path)
            })
    return chunks


async def get_embedding_async(text: str) -> List[float]:
    """
    Generates an embedding for the given text using OpenAI's embedding model asynchronously.
    """
    response = await openai_client.embeddings.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response.data[0].embedding

async def upsert_chunks_to_qdrant(chunks: List[Dict[str, Any]]):
    """
    Generates embeddings for chunks and upserts them to Qdrant.
    """
    # Ensure the collection exists or create it
    try:
        qdrant_client_instance.get_collection(collection_name=COLLECTION_NAME)
        print(f"Collection '{COLLECTION_NAME}' already exists.")
    except Exception:
        print(f"Collection '{COLLECTION_NAME}' not found. Creating it.")
        qdrant_client_instance.recreate_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=models.VectorParams(size=VECTOR_SIZE, distance=models.Distance.COSINE),
        )

    points = []
    for chunk in chunks:
        embedding = await get_embedding_async(chunk["content"])
        points.append(
            models.PointStruct(
        chunk_id = hashlib.sha256((chunk["source_file"] + chunk["content"]).encode()).hexdigest()
                id=chunk_id,
                vector=embedding,
                payload={
                    "content": chunk["content"],
                    "source_file": chunk["source_file"],
                    "headers": chunk["headers"],
                },
            )
        )

    if points:
        qdrant_client_instance.upsert(
            collection_name=COLLECTION_NAME,
            wait=True,
            points=points,
        )
    print(f"Upserted {len(points)} points to Qdrant collection '{COLLECTION_NAME}'.")

async def ingest_book_content():
    """
    Main function to orchestrate finding, chunking, embedding, and upserting book content.
    """
    docs_directory = "book_source/docs"
    print(f"Starting ingestion from {docs_directory}...")

    # Verify the docs_directory exists and list its contents
    if not os.path.isdir(docs_directory):
        raise FileNotFoundError(f"The directory {docs_directory} does not exist.")

    print("Contents of book_source/docs before ingestion:")
    for item in os.listdir(docs_directory):
        print(f"- {item}")

    markdown_files = find_markdown_files(docs_directory)
    all_chunks = []

    for md_file in markdown_files:
        print(f"Processing file: {md_file}")
        chunks = chunk_markdown_content(md_file)
        all_chunks.extend(chunks)

    if all_chunks:
        await upsert_chunks_to_qdrant(all_chunks)
    else:
        print("No markdown content found to ingest.")
    print("Ingestion process completed.")

if __name__ == "__main__":
    import asyncio
    asyncio.run(ingest_book_content())

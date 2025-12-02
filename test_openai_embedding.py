import os
import asyncio
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

async def test_embedding_generation():
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    if not OPENAI_API_KEY:
        print("Error: OPENAI_API_KEY not found in environment variables.")
        return

    print(f"OPENAI_API_KEY is {'set' if OPENAI_API_KEY else 'not set'}.")

    try:
        openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY, timeout=60.0) # Added timeout
        test_text = "This is a test sentence for embedding."
        print(f"Attempting to generate embedding for: \"{test_text}\"")
        response = await openai_client.embeddings.create(
            input=test_text, model="text-embedding-3-small"
        )
        embedding = response.data[0].embedding
        print(f"Successfully generated embedding. Length: {len(embedding)}")
        print(f"First 10 dimensions: {embedding[:10]}")
    except Exception as e:
        print(f"Error during embedding generation: {e}")

if __name__ == "__main__":
    asyncio.run(test_embedding_generation())

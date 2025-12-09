# Quickstart: Translation Function Implementation

## Prerequisites

- Python 3.11+
- FastAPI
- google-generativeai package
- Environment variables configured (GEMINI_API_KEY)

## Setup

1. Install required dependencies:
```bash
pip install google-generativeai python-dotenv fastapi pydantic
```

2. Set up environment variables:
Create a `.env` file with:
```
GEMINI_API_KEY=your_api_key_here
```

## Implementation Steps

### 1. Create the Translation Service

Create `src/services/translation_service.py` with the main translation logic that:
- Initializes the Gemini API client
- Processes the system instruction for technical translation
- Handles the translation request while preserving formatting
- Returns the translated content

### 2. Create Markdown Preservation Utilities

Create `src/utils/text_processing.py` with functions to:
- Parse Markdown content and identify different elements
- Extract prose content for translation
- Preserve code blocks, headers, links, and other formatting
- Reconstruct the Markdown after translation

### 3. Define API Models

Create `src/models/translation.py` with Pydantic models for request/response validation.

### 4. Implement API Endpoints

Create `src/api/v1/translation.py` with FastAPI endpoints for:
- `/translate` - for translating raw Markdown text
- `/translate/chapter` - for translating book chapters from book_source/docs

### 5. Integrate with Main Application

Add the translation API router to the main FastAPI application.

## Testing

1. Unit tests for translation service
2. Integration tests for API endpoints
3. Validation that Markdown formatting is preserved
4. Verification that technical terms remain in English

## Environment Variables

- `GEMINI_API_KEY`: Your Google Generative AI API key (required)
- `GEMINI_MODEL`: The model to use (default: gemini-2.5-flash)
- `MAX_CONTENT_LENGTH`: Maximum content length to translate (default: 5000 words)
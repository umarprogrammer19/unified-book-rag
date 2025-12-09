# Research: Translation Function Implementation

## Decision: Gemini Model Selection
**Rationale**: After reviewing the discrepancy between the project constitution (specifying gemini-2.5-flash) and the feature spec (mentioning gemini-2.5-flash), I've determined that gemini-2.5-flash is the appropriate choice. The constitution was recently updated to specify gemini-2.5-flash as optimized for high-frequency, low-latency tasks like real-time translation. While the feature spec mentioned gemini-2.5-flash, the constitution takes precedence as the governing document for technical decisions.

**Alternative considered**: Using gemini-2.5-flash as mentioned in the feature spec
**Why rejected**: The project constitution specifically states that gemini-2.5-flash is optimized for high-frequency, low-latency tasks, making it more appropriate for translation functionality.

## Decision: Translation Architecture
**Rationale**: The translation functionality will be implemented as a service layer within the existing FastAPI backend. This approach allows for:
- Integration with the existing tech stack (FastAPI, SQLModel, etc.)
- Proper handling of environment variables for API keys
- Consistent deployment and scaling with the main application
- Proper API endpoint structure following REST principles

## Decision: Markdown Preservation Strategy
**Rationale**: To preserve Markdown formatting while translating content, the implementation will:
1. Parse the Markdown content to identify different elements (headers, code blocks, links, etc.)
2. Extract only the prose content for translation
3. Apply the translation to the prose content
4. Reconstruct the Markdown with translated prose and original formatting/technical elements

This approach ensures that formatting elements and technical terms remain unchanged while only the prose content is translated.

## Decision: API Key Security
**Rationale**: Following the security principle from the constitution, API keys will be handled through:
- Environment variables (GEMINI_API_KEY)
- Loading via python-dotenv package
- Never hardcoded in the source code
- Proper validation and error handling when key is missing

## Decision: Error Handling Strategy
**Rationale**: For the edge cases identified in the spec:
- API unavailability: Implement retry logic with exponential backoff
- Large content: Implement content chunking with reassembly
- Mixed languages: Use language detection to identify and handle appropriately
- Content already in Urdu: Validate input language before translation

## Decision: Integration Points
**Rationale**: The translation functionality will integrate with:
- Existing book content in book_source/docs directory
- Current authentication system (when implemented) to control access
- Potential caching layer to optimize repeated translations
- Frontend through well-defined API endpoints
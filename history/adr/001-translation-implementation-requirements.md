# ADR-001: Translation Implementation Requirements

## Status

Accepted

## Date

2025-12-09

## Context

The project requires implementing Urdu translation capabilities for documentation content while maintaining the existing English technical content. This decision addresses the need for multilingual support in the educational content, specifically to serve Urdu-speaking audiences while preserving the technical accuracy and functionality of the system.

The project involves a book on "Teaching Physical AI & Humanoid Robotics" that needs to be accessible in Urdu for broader reach while maintaining English for technical terminology and code.

## Decision

We will implement translation requirements with the following key constraints:

- **Security**: API Keys (GEMINI_API_KEY) must never be hardcoded. Always use dotenv and process environment variables.
- **Performance**: Use gemini-1.5-flash model. It is optimized for high-frequency, low-latency tasks like real-time translation.
- **Data Integrity**: The translation process must preserve Markdown syntax. Headers (#), Bold (**), Links ([]()), and Code Blocks (```) must remain intact.
- **Linguistic Constraint**: Code keywords, variable names, and terminal commands must remain in English. Only documentation prose is to be translated to Urdu.
- **UI/UX**: Urdu text must be rendered with direction: rtl (Right-to-Left) and a legible font (e.g., Noto Nastaliq Urdu).

## Consequences

### Positive
- Enables multilingual access to educational content, specifically for Urdu-speaking audiences
- Maintains security by properly handling API keys through environment variables
- Ensures optimal performance with a model designed for translation tasks
- Preserves document structure and technical accuracy through syntax preservation
- Maintains code readability and functionality by keeping technical terms in English
- Provides proper UI rendering for right-to-left text

### Negative
- Adds complexity to the content pipeline with translation processing
- Requires additional API costs for translation services
- May introduce latency in content delivery when translation is performed
- Need to maintain RTL styling and font considerations in the UI

## Alternatives

### Alternative 1: Human Translation
- Use professional human translators instead of AI
- Pros: Higher quality, better cultural context
- Cons: More expensive, slower, harder to maintain consistency

### Alternative 2: Different Translation Model
- Use gemini-1.0-pro or other models instead of gemini-1.5-flash
- Pros: Potentially different capabilities or pricing
- Cons: May have lower performance for translation tasks, higher latency

### Alternative 3: Full Content Translation
- Translate all content including code and technical terms
- Pros: Complete translation
- Cons: Would break code functionality and technical accuracy

## References

- Project Constitution (Section 6: Translation Implementation Requirements)
- Translation implementation rules provided in user requirements
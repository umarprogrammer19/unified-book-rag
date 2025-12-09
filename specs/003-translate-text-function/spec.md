# Feature Specification: Translation Function for Urdu Content

**Feature Branch**: `001-translate-text-function`
**Created**: 2025-12-09
**Status**: Draft
**Input**: User description: "how the "Translate" function works conceptually.

Method: translateText(text: string) -> string
Input: Raw Markdown string from the frontend.

Processing (Gemini API):
Model: gemini-2.5-flash

System Instruction:
"You are a technical translator. Convert the following text to Urdu. Preserve ALL Markdown formatting exactly. Do NOT translate code blocks, variable names, or technical path parameters. Output ONLY the translated string."

Output: The translated Markdown string only translate chapter which are stored in book_source/docs check with ls."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Translate Educational Content to Urdu (Priority: P1)

A user accesses the educational content about Physical AI and Humanoid Robotics and requests to view the content in Urdu. The system receives the raw Markdown content and processes it through the translation function, returning the same content with Urdu translation while preserving all formatting, code blocks, and technical terminology in English.

**Why this priority**: This is the core functionality that enables Urdu-speaking users to access educational content while maintaining technical accuracy.

**Independent Test**: Can be fully tested by passing Markdown content through the translateText function and verifying that the output contains Urdu text with preserved formatting and English technical terms.

**Acceptance Scenarios**:

1. **Given** a user requests Urdu translation of educational content, **When** the translateText function receives Markdown content, **Then** it returns the same content with Urdu translation while preserving all formatting, code blocks, and technical terms in English
2. **Given** Markdown content with headers, bold text, links, and code blocks, **When** the translateText function processes it, **Then** the output maintains all formatting elements with Urdu text translation

---

### User Story 2 - Translate Book Chapters from Storage (Priority: P2)

A user selects a specific chapter from the available book content in book_source/docs and requests Urdu translation. The system retrieves the chapter content and passes it through the translation function.

**Why this priority**: Extends the core functionality to work with actual book content stored in the system.

**Independent Test**: Can be tested by selecting a chapter file from book_source/docs, passing its content through the translation function, and verifying the translated output.

**Acceptance Scenarios**:

1. **Given** a chapter file exists in book_source/docs, **When** the user requests Urdu translation, **Then** the system retrieves the content and returns it translated to Urdu while preserving formatting

---

### User Story 3 - Handle Translation API Communication (Priority: P3)

The system communicates with the Gemini API using the gemini-2.5-flash model to perform the translation, following the specified system instruction to preserve formatting and technical content.

**Why this priority**: Ensures proper integration with the translation service while maintaining the required constraints.

**Independent Test**: Can be tested by verifying the API communication and response handling with the specified model and system instructions.

**Acceptance Scenarios**:

1. **Given** the translation function is called, **When** it communicates with Gemini API using gemini-2.5-flash model, **Then** it follows the system instruction to preserve formatting and keep technical terms in English

---

### Edge Cases

- What happens when the Gemini API is unavailable or returns an error?
- How does the system handle very large Markdown content that exceeds API limits?
- What if the input contains mixed languages (not just English content to translate)?
- How does the system handle content that is already in Urdu or other languages?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a translateText function that accepts a raw Markdown string and returns a translated string
- **FR-002**: System MUST preserve all Markdown formatting (headers, bold, links, code blocks) in the translated output
- **FR-003**: System MUST NOT translate code blocks, variable names, or technical path parameters (keep them in English)
- **FR-004**: System MUST use the Gemini API with gemini-2.5-flash model for translation
- **FR-005**: System MUST follow the specified system instruction: "You are a technical translator. Convert the following text to Urdu. Preserve ALL Markdown formatting exactly. Do NOT translate code blocks, variable names, or technical path parameters. Output ONLY the translated string."
- **FR-006**: System MUST be able to process content from book_source/docs directory
- **FR-007**: System MUST output only the translated string without additional metadata or formatting changes

### Key Entities

- **Markdown Content**: The input and output text in Markdown format that needs translation
- **Translation Service**: The Gemini API with gemini-2.5-flash model used for processing
- **Book Chapters**: The educational content stored in book_source/docs that can be translated

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can translate educational content to Urdu with preserved formatting in under 10 seconds for documents up to 5000 words
- **SC-002**: 100% of Markdown formatting elements (headers, bold, links, code blocks) are preserved in the translated output
- **SC-003**: 100% of code blocks, variable names, and technical path parameters remain in English while prose is translated to Urdu
- **SC-004**: Translation accuracy for educational content achieves at least 85% user satisfaction based on quality assessment
# Data Model: Translation Function

## Core Entities

### TranslationRequest
- **text**: string - The raw Markdown text to be translated
- **source_language**: string - The source language (default: "en")
- **target_language**: string - The target language (default: "ur")
- **preserve_formatting**: boolean - Whether to preserve Markdown formatting (default: true)
- **preserve_code**: boolean - Whether to preserve code blocks and technical terms (default: true)

### TranslationResponse
- **translated_text**: string - The translated Markdown text
- **source_language**: string - The detected source language
- **target_language**: string - The target language
- **processing_time**: number - Time taken for translation in milliseconds
- **success**: boolean - Whether the translation was successful
- **error_message**: string? - Error message if translation failed

### TranslationConfig
- **model**: string - The AI model to use (e.g., "gemini-2.5-flash")
- **api_key**: string - The API key for the translation service (from environment)
- **max_content_length**: number - Maximum length of content to translate
- **timeout**: number - Request timeout in seconds

## State Transitions

### Translation Process
1. **PENDING**: Translation request received
2. **PROCESSING**: Content being sent to translation API
3. **FORMATTING**: Markdown formatting being preserved
4. **COMPLETED**: Translation successfully completed
5. **FAILED**: Translation failed due to error

## Validation Rules

### TranslationRequest
- `text` must not be empty
- `text` length must be less than `max_content_length`
- `source_language` must be a valid language code
- `target_language` must be a valid language code

### TranslationConfig
- `model` must be a supported model
- `api_key` must be present in environment
- `max_content_length` must be positive
- `timeout` must be within reasonable bounds (1-300 seconds)

## Relationships

- TranslationRequest is processed using TranslationConfig
- TranslationResponse is the result of processing a TranslationRequest
- Multiple TranslationRequest objects can reference the same TranslationConfig
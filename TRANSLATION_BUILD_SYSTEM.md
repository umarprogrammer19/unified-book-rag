# Build-Time Translation System

This project uses a build-time translation system to convert English Markdown content to Urdu, eliminating the need for real-time API calls during user interaction.

## How It Works

1. **Build Process**: A script (`scripts/translate-build.js`) runs during the build process
2. **Content Translation**: All Markdown files in `book_source/docs` are translated to Urdu using the Gemini 2.5 Flash model
3. **Storage**: Translations are stored in `book_source/src/data/urduTranslations.json`
4. **Frontend Access**: The frontend loads the JSON file and provides instant language switching

## Setup

1. **Get a Gemini API Key**: Obtain an API key from Google AI Studio
2. **Configure Environment**: Add your API key to `node_server/.env`:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

## Running the Translation Build

To generate Urdu translations for all content:

```bash
cd node_server
npm run translate-build
```

This will:
- Read all Markdown files from `book_source/docs`
- Translate them to Urdu using Gemini 2.5 Flash
- Save the translations to `book_source/src/data/urduTranslations.json`

## Frontend Integration

The Docusaurus component at `book_source/src/theme/DocItem/Content/index.js` automatically:
- Loads the translations JSON file
- Matches the current document path to its pre-translated content
- Provides a "Translate to Urdu" button for instant language switching

## Architecture Benefits

- **Performance**: No API calls during user interaction
- **Speed**: Instant language switching
- **Cost**: Translation costs incurred only during build time
- **Reliability**: No dependency on API availability during user sessions

## System Requirements

- Node.js environment for running the build script
- Internet connection during build time (for API calls)
- Gemini API key with appropriate quotas
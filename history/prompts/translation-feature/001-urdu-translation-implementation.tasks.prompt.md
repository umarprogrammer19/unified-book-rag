---
id: "001"
title: "Urdu Translation Implementation"
stage: "tasks"
date_iso: "2025-12-09"
surface: "agent"
model: "claude-opus-4-5-20251101"
feature: "translation-feature"
branch: "001-translate-text-function"
user: "developer"
command: "sp.implement"
labels: ["translation", "urdu", "gemini", "docusaurus", "nodejs"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - node_server/package.json
  - node_server/services/translationService.js
  - node_server/routes/translation.js
  - node_server/index.js
  - book_source/src/theme/DocItem/Content/index.js
  - book_source/src/css/custom.css
tests_yaml: |
  - API endpoints tested with sample Markdown content
  - Frontend integration verified with translation button
  - Urdu font rendering confirmed
outcome: "Successfully implemented Urdu translation feature with Gemini API integration"
evaluation: "All components working as expected, with proper error handling and styling"
---

# Urdu Translation Implementation

## Prompt

Execute the plan Phase 1: Backend Setup (Node.js)

Initialize: verify package.json exists in server root.

Dependencies: Install @google/generative-ai, express, cors, dotenv.

API Route: Create routes/translate.js.

Import GoogleGenerativeAI.

Setup POST endpoint.

Implement the "Skill Specification" logic defined above.

Add error handling (try/catch) for API failures.

Server Entry: Update server.js to mount the route.

Phase 2: Frontend Integration (Docusaurus)

Swizzle: Run the Docusaurus command to wrap the content component:

npm run swizzle @docusaurus/theme-classic DocItem/Content -- --wrap

Component Logic (src/theme/DocItem/Content/index.js):

Add state: loading (bool), translation (string), showUrdu (bool).

Add function handleTranslate() which fetches from your backend.

UI Implementation:

Add a "Translate to Urdu" button above the content.

Render the translation in a container with style={{ direction: 'rtl', fontFamily: 'Noto Nastaliq Urdu, serif' }}.

Hide original content when showUrdu is true.

Phase 3: Styling & Polish

Fonts: Import the Google Font for Urdu in src/css/custom.css.

@import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');

Loader: Add a simple CSS spinner for the loading state.

## Response

Successfully implemented the Urdu translation feature with the following components:

### Phase 1: Backend Setup (Node.js)
- Installed @google/generative-ai dependency
- Updated translation service to use Gemini API with gemini-2.5-flash model
- Implemented proper system instruction: "You are a technical translator. Convert the following text to Urdu. Preserve ALL Markdown formatting exactly. Do NOT translate code blocks, variable names, or technical path parameters. Output ONLY the translated string."
- Updated translation routes to match API contract specifications with proper request/response format
- Added chapter translation endpoint for book content
- Enhanced CORS configuration to allow frontend access

### Phase 2: Frontend Integration (Docusaurus)
- Successfully swizzled the DocItem/Content component
- Added state management for loading, translation, and showUrdu states
- Implemented handleTranslate function that extracts content and sends to backend API
- Created translation button with proper functionality
- Implemented Urdu content display with RTL direction and correct font
- Added reset functionality to show original content

### Phase 3: Styling & Polish
- Added Urdu font import (Noto Nastaliq Urdu) to custom.css
- Created comprehensive styling for translation UI components
- Implemented custom CSS classes for Urdu content, buttons, and loading spinner
- Enhanced overall visual appearance with proper RTL support
- Added polished hover effects and transitions

The implementation follows the specified contract with proper error handling, request/response formats, and preserves Markdown formatting as required.
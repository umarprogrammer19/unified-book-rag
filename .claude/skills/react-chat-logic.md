# Skill: React Chat Widget Pattern

## 1. State Management
* Use `useState` for:
  - `isOpen`: boolean (Toggle chat window).
  - `messages`: array `{ role: 'user' | 'assistant', content: string }`.
  - `isLoading`: boolean (Show spinner/dots).
  - `input`: string.

## 2. API Integration Logic
* Function `sendMessage`:
  1. Add user message to state immediately.
  2. Set `isLoading(true)`.
  3. `await fetch('http://localhost:8000/api/chat', ...)`
     - Headers: `{'Content-Type': 'application/json'}`.
     - Body: `JSON.stringify({ messages: allMessages })`.
  4. Get response `.json()`.
  5. Add assistant message to state.
  6. Set `isLoading(false)`.

## 3. UI/UX Rules
* **Floating Action Button (FAB)**: Bottom-right (z-index: 9999).
* **Auto-Scroll**: Use `useRef` and `useEffect` to scroll to the bottom of the chat on new messages.
* **Styling**: Use inline styles or CSS modules to avoid conflicts. Dark mode preferred.
# Skill: Better-Auth Custom Schema

## 1. The Goal
We need to store "Software Background" and "Hardware Background" during signup to personalize the book later.

## 2. Server Configuration (Node.js)
In `auth.ts` (or `index.ts`), inside the `betterAuth({})` config:
- You must use the `user` schema property.
- Add `additionalFields`:
  ```typescript
  user: {
    additionalFields: {
      softwareBackground: { type: "string", required: false },
      hardwareBackground: { type: "string", required: false } // e.g., "Mac", "Windows"
    }
  }
  ```
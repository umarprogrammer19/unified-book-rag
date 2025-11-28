# Quickstart: Auth Service

This guide provides a quick overview to get the Auth Service up and running.

## 1. Project Setup

1.  **Navigate to `auth_service` directory**:
    ```bash
    cd auth_service
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**: Create a `.env` file in the `auth_service` directory with the following content (replace with your Neon Postgres connection string and a strong secret key):
    ```
    DATABASE_URL="postgresql://neondb_owner:npg_2HwPgxzabtM3@ep-small-wave-ahfx3mzh-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    AUTH_SECRET="your_very_secret_key_here"
    ```

## 2. Running the Service

To start the Hono server:

```bash
npm run dev
```

The service will be accessible on `http://localhost:3000` (or the port specified in your Hono configuration).

## 3. API Endpoints

The following endpoints are exposed by the Auth Service:

*   **`POST /register`**: Register a new user.
    *   **Request Body**: `{ "email": "string", "password": "string" }`
    *   **Response**: `{ "message": "User registered successfully", "userId": "uuid" }`

*   **`POST /login`**: Log in an existing user.
    *   **Request Body**: `{ "email": "string", "password": "string" }`
    *   **Response**: `{ "message": "User logged in successfully", "userId": "uuid" }` (sets `session_id` cookie)

*   **`PATCH /profile`**: Update user role and OS.
    *   **Request Body**: `{ "role": "[Developer|Designer]", "os": "[Mac|Windows]" }`
    *   **Response**: `{ "message": "Profile updated successfully", "userId": "uuid" }`

## 4. Testing

*   **Unit/Integration Tests**: Run tests using Vitest.
    ```bash
    npm test
    ```

*   **End-to-End Tests**: Use Playwright for end-to-end testing (specific commands will be detailed in `tasks.md`).

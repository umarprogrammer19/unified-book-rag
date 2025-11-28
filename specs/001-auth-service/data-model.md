# Data Model: Auth Service

## Entity: User

Represents an individual user of the system with authentication credentials and profile information.

### Fields:

*   **Email (unique)**:
    *   **Description**: Unique email address of the user, used for login and identification.
    *   **Validation**: Must be a valid email format, unique across all users.
    *   **Type**: String

*   **Hashed Password**:
    *   **Description**: Securely stored hashed password for user authentication.
    *   **Validation**: Generated via a strong, industry-standard hashing algorithm (e.g., bcrypt) with a salt.
    *   **Type**: String

*   **Role**:
    *   **Description**: The user's role within the system.
    *   **Validation**: Must be one of: "Developer", "Designer".
    *   **Type**: Enum (Developer, Designer)

*   **OS**:
    *   **Description**: The user's primary operating system.
    *   **Validation**: Must be one of: "Mac", "Windows".
    *   **Type**: Enum (Mac, Windows)

### Relationships:

*   **User to Session**: One-to-many. A user can have multiple active sessions.

## Entity: Session

Represents an active user session, used for maintaining authenticated state.

### Fields:

*   **Session ID (primary key)**:
    *   **Description**: Unique identifier for the session.
    *   **Validation**: Auto-generated.
    *   **Type**: String

*   **User ID (foreign key)**:
    *   **Description**: References the `User` who owns this session.
    *   **Validation**: Must correspond to an existing `User`.
    *   **Type**: String (UUID or similar)

*   **Expires At**:
    *   **Description**: Timestamp indicating when the session becomes invalid.
    *   **Validation**: Future timestamp.
    *   **Type**: DateTime

*   **Created At**:
    *   **Description**: Timestamp indicating when the session was created.
    *   **Validation**: Auto-generated.
    *   **Type**: DateTime

### Relationships:

*   **Session to User**: Many-to-one. Each session belongs to one user.

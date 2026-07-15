# Software Architecture & Design Patterns

This document details the architectural boundaries, folder layouts, and design patterns utilized in **WasteGuide AI**.

---

## 1. High-Level Architectural Pattern

The application implements a decoupled **Client-Server MVC (Model-View-Controller)** pattern:

```
+------------------------------------------------------------------------+
|                          VITE REACT (VIEW)                             |
|  - Layouts, styling, and interactive UI nodes.                        |
|  - State management handled via context hooks.                          |
+-----------------------------------+------------------------------------+
                                    |
                                    | (JSON over HTTP)
                                    v
+-----------------------------------+------------------------------------+
|                         FLASK API (CONTROLLER)                         |
|  - Validates endpoints. Parses URL arguments.                           |
|  - Delegates database saves and LLM checks.                            |
+------------------+---------------------------------+-------------------+
                   |                                 |
                   v (REST Call)                     v (REST Call)
+------------------+-----------------+ +-------------+-------------------+
|            GROQ LLaMA (MODEL)      | |      FIRESTORE DB (MODEL)      |
|  - Enforces JSON template parsing. | | - Directly maps collections.    |
+------------------------------------+ +---------------------------------+
```

---

## 2. Key Design Patterns Implemented

### A. Fallback/Adapter Pattern (Resilient Database Service)
To support offline execution or missing configuration keys:
- The database service abstracts queries.
- If cloud Firestore connections fail, the service redirects queries to `history.json` (a local file database).
- Code interface remains unchanged, protecting the frontend from connection errors.

### B. Single-Directional Context Hook (Auth Session Context)
- `AuthContext.jsx` manages unique user sessions.
- Standardizes session tags across all routes. If Firebase is offline, initializes a local mock tenant ID (`demo-user`), allowing database tracking without complex configurations.

### C. JSON Schema Enforcers (Structured LLM Outputs)
- Configures Groq requests with temperature parameters (`0.1`) and `json_object` configurations, guaranteeing predictable schema layouts in responses.
- Eliminates parsing crashes in the backend.

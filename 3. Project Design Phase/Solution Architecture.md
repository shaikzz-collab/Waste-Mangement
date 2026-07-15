# Solution Architecture

This document describes the high-level architecture, subsystem boundaries, and integrations of **WasteGuide AI**.

---

## 1. System Architecture Diagram

The system employs a client-server architecture model integrated with external cloud APIs:

```
+-----------------------------------------------------------------------+
|                         VITE REACT FRONTEND                           |
|  - Pages: Home Search, Interactive Map, History Log, Dashboard        |
|  - Libraries: Leaflet (Map), Chart.js (Charts), Axios (API Client)    |
|  - Contexts: AuthContext (Handles Session IDs / Demo States)          |
+------------------------------------+----------------------------------+
                                     |
                                     | (HTTP REST JSON requests)
                                     v
+------------------------------------+----------------------------------+
|                          FLASK BACKEND                                |
|  - Routes: /api/waste, /api/centers, /api/dashboard                   |
|  - Core Logic: config.py, app.py, routes mapping                     |
|  - Local Fallback DB: data/history.json                              |
+------------------+---------------------------------+------------------+
                   |                                 |
                   | (HTTP API query)                | (HTTP API query)
                   v                                 v
+------------------+-----------------+ +-------------+------------------+
|             GROQ API               | |      FIRESTORE REST API        |
|  - Model: llama-3.1-8b-instant     | | - Database: (default)          |
|  - Mode: JSON Schema Template      | | - Endpoint: /users/{uid}/      |
+------------------------------------+ +--------------------------------+
```

---

## 2. Component Descriptions

### React Frontend Client
- Renders the UI and manages state.
- Utilizes `Leaflet` to handle geocoded coordinates without heavy map server dependencies.
- Communicates with the Flask backend API via Axios.

### Flask Backend Server
- Acts as a gateway. It handles CORS preflights, formats inputs, routes traffic, and handles API errors.
- Enforces model constraints on Groq requests (setting temperature parameters and JSON formatting rules).
- Connects to Firestore using HTTP REST request protocols, or redirects records to a local JSON database if keys are absent or network requests timeout.

### Groq AI API
- Provides waste classification using the `llama-3.1-8b-instant` model.
- Accepts system instructions forcing responses to be returned as raw, unformatted JSON matching the target waste analysis template.

### Firestore REST Endpoint
- Houses document indices for user logs.
- Accessed directly using project ID and public web API keys, bypassing private credential files while keeping individual user history collections separated securely.

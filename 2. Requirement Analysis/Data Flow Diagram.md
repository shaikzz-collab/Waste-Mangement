# Data Flow Diagram (DFD)

This document diagrams the movement of information within the **WasteGuide AI** ecosystem, spanning the React client, Flask backend, Firestore REST endpoint, and Groq API.

---

## 1. DFD Level 0 (Context Diagram)

The Context Diagram defines the external boundaries of the WasteGuide AI application:

```mermaid
graph TD
    User([Resident / User]) <-->|Search Item Name, Scan Request| WasteGuide[WasteGuide AI Application]
    WasteGuide <-->|Queries prompt & schema| GroqAPI[Groq API / LLaMA 3.1]
    WasteGuide <-->|HTTP POST/GET user logs| FirestoreAPI[Firestore REST API]
```

---

## 2. DFD Level 1 (Process Breakdown)

The Level 1 Diagram decomposes the internal operations of the frontend client and backend routes:

```mermaid
graph TD
    User([User]) -->|1. Inputs waste item| Home[Home Search Page / React Client]
    Home -->|2. HTTP POST JSON scan request| FlaskAPI[Flask Route: /api/waste/scan]
    
    FlaskAPI -->|3. Validates api keys| EnvCheck{API Key Present?}
    
    EnvCheck -->|Yes| QueryGroq[Query Groq LLaMA 3.1]
    EnvCheck -->|No| FetchMockData[Query Mock Database]
    
    QueryGroq -->|4. Parse LLM JSON string| Serialize[Format Result]
    FetchMockData -->|4. Load JSON fallback| Serialize
    
    Serialize -->|5. HTTP POST REST document| Firestore[Firestore REST / Collection: users/uid/history]
    Firestore -->|6. Retuns document ID| Serialize
    
    Serialize -->|7. Send JSON response| Home
    Home -->|8. Render cards & instructions| User
    
    User -->|9. Requests history/dashboard| Dashboard[Dashboard Page / React Client]
    Dashboard -->|10. HTTP GET user history| FlaskHistory[Flask Route: /api/waste/history]
    FlaskHistory -->|11. HTTP GET query| Firestore
    Firestore -->|12. Return document array| FlaskHistory
    FlaskHistory -->|13. Return JSON array| Dashboard
    Dashboard -->|14. Draw StatCards and ChartJS| User
```

---

## 3. Data Store Definitions

*   **`Store 1: Local History JSON Fallback`**: Used in local-offline situations. A JSON file (`backend/data/history.json`) storing user logs.
*   **`Store 2: Cloud Firestore Database`**: High-availability document collection organized by user ID (`users/{uid}/history/{doc_id}`). Holds item name, classification details, recyclable flag, and timestamp.
*   **`Store 3: Collection Centers Database`**: Mock geographical location index storing coordinate arrays, phone numbers, and operational hours.

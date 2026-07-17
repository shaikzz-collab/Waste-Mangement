# Milestone 5: Project Development Phase

This folder contains details of the implementation phase, prompt logs, AI tools utilized, and documentation on codebase design patterns for **WasteGuide AI**.

---

## 💻 1. Functional Features Catalog

We successfully integrated and verified five primary modules into the final capstone build:

| S.No | Feature Name | Description & Purpose | Module / Layer | Status |
| :---: | :--- | :--- | :--- | :---: |
| **1** | Real-Time AI Scanner | Accepts natural language text queries, calls the Groq LLaMA 3.1 model, and parses structured recycling instructions. | AI Inference / `Home.jsx` | **Completed** |
| **2** | Visual Safety Cautions | Intercepts classification outputs and renders a pulsing red caution box for toxic items (E-waste/Hazardous). | Client UI / `ResultCard.jsx` | **Completed** |
| **3** | Interactive Geolocation Map | Displays local collection facilities using Leaflet, maps coordinates, and filters points using category chips. | Mapping Engine / `Map.jsx` | **Completed** |
| **4** | Performance Analytics | Aggregates user logs into interactive Chart.js line, bar, and doughnut graphs on a retro terminal layout. | Metrics Engine / `Dashboard.jsx` | **Completed** |
| **5** | Resilient Caching Fallback | Intercepts HTTP timeouts or key omissions to route queries to a local mock DB and save records in a local JSON registry. | Storage Service / `db_service.py` | **Completed** |

---

## 🤖 2. AI Prompt Engineering Logs

To ensure that the LLaMA 3.1 LLM acts as a predictable, structured classifier, we configured our Groq service with precise system prompt guidelines and settings:

### Model Configuration
*   **Model**: `llama-3.1-8b-instant`
*   **Temperature**: `0.1` (low temperature ensures high precision and eliminates creative hallucinations)
*   **Response Format**: `{"type": "json_object"}` (forces model output into parsing-safe JSON)

### Prompt Construction
```
SYSTEM INSTRUCTIONS:
You are an expert environmental waste classification system.
You must return details about the requested waste item.
Your output must be a single, raw, valid JSON object with NO markdown formatting, NO code blocks, and NO surrounding text.
The JSON structure must match this template exactly:
{
  "category": "Plastic" | "Metal" | "Glass" | "Paper" | "Organic" | "E-Waste" | "Hazardous" | "Other",
  "emoji": "Emoji representing the item",
  "recyclable": true | false,
  "reusable": true | false,
  "hazardous": true | false,
  "hazard_warning": "Warning text if hazardous=true, else empty string",
  "disposal_instructions": "General text explaining how to discard this item properly.",
  "recycling_steps": ["Step 1...", "Step 2...", "Step 3..."],
  "eco_suggestions": ["Suggestion 1...", "Suggestion 2..."],
  "facility_types": ["Facility 1...", "Facility 2..."],
  "ai_source": "Groq LLaMA-3-8B"
}
```

---

## 🛠️ 3. AI Assistants & Tools Utilized

We leveraged modern AI assistant tools to accelerate our development workflow:

1.  **ChatGPT / Gemini (Analysis & Code Structure)**:
    *   Designed the JSON structure template for the waste parser.
    *   Assisted in writing the serialization/deserialization helper dictionaries that map flat JSON fields to Firestore REST schema requirements.
2.  **GitHub Copilot (Inline Coding & Styling)**:
    *   Accelerated UI layout development by autocompleting Tailwind CSS styles for the retro terminal green glow panels.
    *   Helped generate seed coordinates and hours for the local collections center mock dataset.

---

## 📂 4. Code layout & Reusability

The codebase is organized to separate concerns, maximize component reusability, and simplify maintenance.

### Component-Driven Architecture (Frontend)
Interactive widgets are abstracted into reusable React component nodes under `frontend/src/components`:

*   **`Navbar.jsx`**: Global sticky header that features system status indicators, current route links, and a retro pulsing green dot.
*   **`StatCard.jsx`**: Renders a glowing grid tile featuring numeric counters and custom sub-labels on the stats dashboard.
*   **`CategoryChip.jsx`**: Stylized button node used to toggle categories in the recycling center listing and on the Leaflet map.
*   **`CenterCard.jsx`**: Reusable side panel that lists facility details (distance, phone, working hours, and navigation links).
*   **`ResultCard.jsx`**: The core output container that formats classification data, badges, safety alerts, and suggestions.
*   **`LoadingAnimation.jsx`**: Terminal-themed text loading animation that scrolls system log lines during API handshakes.

### Separation of Concerns (Backend)
*   **`app.py`**: Boots the server, manages global error handlers, and sets CORS rules.
*   **`config/`**: Separates global configuration variables from database credential strings.
*   **`routes/`**: Isolates routing endpoints by feature blueprint (`waste.py`, `centers.py`, `dashboard.py`).
*   **`services/`**: Abstracts heavy operations. `groq_service.py` handles API completions and formatting; `db_service.py` handles DB connection handshakes, REST posting, and local cache reads/writes.

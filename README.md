# ♻️ WasteGuide AI

![WasteGuide AI Banner](./docs/images/banner.png)

### 🔗 Live Deployment & Demo
- **Production Client App**: [https://wasteguideai-8133c.web.app](https://wasteguideai-8133c.web.app)
- **API Base Endpoint**: `http://localhost:5000/api` (Local Dev) / `[Insert Hosted Server Link]` (Production)

---

WasteGuide AI is a production-ready, AI-powered waste management operational console designed to automate material classification, calculate recovery efficiency, and map collection facilities. It features a retro-futuristic dark green terminal aesthetics with glowing green states, customized scanline animations, and real-time LLM-driven intelligence.

---

## 🚀 Key Features

1. **AI waste scanner**: Type object names or submit/simulate image captures. A backend Groq LLaMA-3 agent performs chemical/composition analysis and outputs strict structured responses.
2. **Dynamic Collection Registry Map**: An interactive 5-column layout containing material filters, a customized Dark Matter Leaflet map, verified recycling hubs, and detailed route information.
3. **Log History Explorer**: A searchable, tag-filtered log registry featuring persistent scans, recyclability badges, hazardous alarms, and details drawers.
4. **Analytics Metrics Console**: Real-time tracking of logs processed, recycling efficiency margins, upcycling rates, and charts (breakdowns, timeline quantities, and line efficiency rates).

---

## 🎨 Theme & UI Style Guide

The interface follows a **Dark Green Terminal Style** color palette:
- **Background**: `#07140F` (deep pitch forest black)
- **Surface**: `#10251C` (dark olive green)
- **Border**: `#204732` (medium forest green)
- **Accent**: `#37D67A` (glowing neon green)
- **Text**: `#E8FFF3` (minty white console text)
- **Muted**: `#8AA89A` (sage gray-green)

### Typography
- **Space Mono**: Primary font for navigation tabs, figures, code blocks, and badges.
- **DM Sans**: Clean, high-legibility body copy.
- **Barlow Condensed**: Bold headings and visual callouts.

---

## 🛠️ Technology Stack

### Frontend
- **React 19**
- **React Router DOM**
- **Tailwind CSS v4**
- **Axios**
- **Firebase Authentication**
- **React ChartJS 2 / Chart.js**
- **React Leaflet / Leaflet / OpenStreetMap**
- **Lucide Icons**

### Backend
- **Flask (Blueprint Architecture)**
- **Groq API Client (LLaMA-3-8B)**
- **Firebase Admin SDK (Firestore / Auth)**
- **Flask CORS**
- **python-dotenv**

---

## 📂 Project Structure

```text
WasteManagement/
├── docs/
│   └── images/
│       └── banner.png                # Embedded terminal banner graphic
├── backend/
│   ├── config/
│   │   ├── config.py                 # Environment configurations & validation
│   │   └── firebase_config.py        # Firebase admin client initializer
│   ├── routes/
│   │   ├── waste.py                  # /api/waste/scan & /api/waste/history
│   │   ├── centers.py                # /api/centers (list & filters)
│   │   └── dashboard.py              # /api/dashboard/stats aggregator
│   ├── services/
│   │   ├── groq_service.py           # Groq AI scan agent & mock presets
│   │   └── db_service.py             # Firestore client & persistent local fallback
│   ├── data/
│   │   └── history.json              # Local persistent logs cache in Demo Mode
│   ├── app.py                        # Backend entrypoint (CORS & Blueprint bind)
│   ├── requirements.txt              # Backend packages manifest
│   └── .env                          # Local credentials file (ignored)
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/               # Reusable modular visual components
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Firebase Auth / Mock local session manager
│   │   ├── pages/                    # Home (Scanner), Map, History, Dashboard
│   │   ├── services/
│   │   │   └── api.js                # Axios central API config
│   │   ├── App.jsx                   # Router declarations
│   │   ├── index.css                 # Tailwind directives, animations & Leaflet tweaks
│   │   └── main.jsx
│   ├── index.html                    # Fonts configuration
│   ├── vite.config.js                # Tailwind plugin registration
│   ├── package.json                  # Frontend packages manifest
│   └── .env                          # Frontend configurations (ignored)
└── .gitignore                        # Global ignore patterns
```

---

## ⚡ Installation & Launch

### Backend Setup
1. Open a terminal and navigate to the backend:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy the environment template and insert your API credentials (optional):
   ```bash
   copy .env.example .env
   ```
5. Run the server:
   ```bash
   python -m backend.app
   ```

### Frontend Setup
1. In a new terminal, navigate to the frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open **[http://localhost:5173](http://localhost:5173)** in your web browser.

---

## ⚙️ Offline / Demo Mode Fallback

To support immediate, out-of-the-box local developer testing:
- **No Groq API Key**: If the Groq key is missing, the backend uses a local mock classification dataset. Any query matching one of the 12 quick-select items returns custom, high-fidelity metadata. Other items generate category-logical presets dynamically.
- **No Firebase Config**: If Firebase configurations are absent, the client switches to local session simulation. It signs in users mock-style and writes scan logs to a persistent local cache file (`backend/data/history.json`).

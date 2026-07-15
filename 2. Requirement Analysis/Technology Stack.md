# Technology Stack Documentation

This document describes the stack components, libraries, APIs, and dev environments used to construct **WasteGuide AI**.

---

## 1. Core Frameworks & Runtime

### Frontend
- **React 19**: Responsive frontend rendering, state management, and lifecycle hooks.
- **Vite**: Rapid asset bundling, build tooling, and hot module replacement dev server.
- **Tailwind CSS**: Utility-first CSS compiling responsive container layouts and aesthetic styles.

### Backend
- **Python 3.12**: Core server implementation environment.
- **Flask 3.0**: Lightweight WSGI micro-framework managing API routes, Blueprint routing, and CORS parameters.

---

## 2. Databases & Storage integrations

### Primary Cloud Database: Firebase Firestore REST API
- **Protocol**: HTTP/1.1 REST calls mapping JSON schemas to Firestore endpoints.
- **Why REST?**: Allows secure client-key operations without packaging heavy private admin SDK keys, making the backend hostable on standard serverless environments.
- **Endpoint**: `https://firestore.googleapis.com/v1/projects/{projectId}/databases/(default)/documents/`

### Fallback Database: File-Based JSON Database
- **Path**: `backend/data/history.json`
- **Why?**: Guaranteed local resilience when running offline or without database keys.

---

## 3. Artificial Intelligence API

### Groq API (LLaMA 3.1)
- **Model**: `llama-3.1-8b-instant` (8-billion parameters, optimized for zero-latency, structure-following completions).
- **Format**: JSON-mode response formatting (`{"type": "json_object"}`) enforcing template outputs.
- **Endpoint**: `https://api.groq.com/openai/v1/chat/completions`

---

## 4. UI Libraries & Visualization

- **React Leaflet (v5.0)**: Coordinates dark-matter tile layers and custom marker positions.
- **Leaflet (v1.9)**: Geocoding map engine.
- **Chart.js (v4.4) & react-chartjs-2**: High-performance dashboard visualizations:
  - Line graph (monthly scan timeline).
  - Bar graph (scans vs. recycling ratios).
  - Doughnut graph (waste categories distribution).
- **Lucide React**: Clean modern minimalist visual icons.

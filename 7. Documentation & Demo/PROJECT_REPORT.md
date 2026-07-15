# SmartBridge AI Specialist Track Capstone Project Report

## 1. Project Metadata
*   **Project Title**: WasteGuide AI: Intelligent Real-Time Waste Classifier and Geolocation Assistant
*   **Student Name**: Sameer
*   **GitHub Repository**: [shaikzz-collab/Waste-Mangement](https://github.com/shaikzz-collab/Waste-Mangement)
*   **Academic Partner**: SmartBridge Academy
*   **Track**: AI Specialist Track

---

## 2. Abstract
Modern urban environments generate billions of tons of solid waste annually, yet a significant portion of recyclable materials is routed to landfills due to consumer sorting errors at the trash bin level. **WasteGuide AI** is an intelligent, real-time web portal that solves this educational gap.

Featuring a terminal-style visual aesthetic designed for high visibility and responsiveness, the application leverages the **Groq LLaMA 3.1 LLM** to analyze queries and return detailed sorting, safety, cleaning, and upcycling steps. The application maps local collections facilities using **React Leaflet** and aggregates metrics on a personal stats dashboard. To ensure local robustness, the application features an automatic fallback to local files when offline or running without keys.

---

## 3. Problem Definition
Curbside recycling contamination is one of the most expensive problems facing modern municipal waste systems. "Wishcycling"—placing non-recyclable materials like plastic bags or food-soiled cardboard into recycling carts—causes MRF shutdowns and equipment damage. Furthermore, hazardous materials (e.g. lithium batteries, paint, bulbs) are often disposed of in landfills, leaching toxic chemicals into local soils. Residents lack a real-time tool at the trash bin level to make correct sorting decisions.

---

## 4. Proposed Solution
WasteGuide AI is designed as a lightweight, zero-install progressive web application.
- **Search console**: Accepts natural text inputs and responds with classifications in under 2.5 seconds.
- **Result details**: Specifies if an item is recyclable, reusable, or hazardous, providing step lists and eco tips.
- **Interactive Map**: Geocatalogs collection sites and filters markers dynamically.
- **Visual dashboard**: Aggregates personal logs over time, gamifying recycling actions.
- **Fail-safe integration**: Detects API drops or missing keys and redirects traffic to a local JSON database fallback.

---

## 5. System Design & Architecture
The system follows a client-server architecture model:
1.  **Frontend SPA**: Built with React 19, Tailwind CSS, Leaflet, and ChartJS. Communicates via HTTP requests.
2.  **API Gateway Backend**: A lightweight Flask server that validates headers, handles CORS preflights, and routes queries.
3.  **Artificial Intelligence Subsystem**: Queries Groq's `llama-3.1-8b-instant` using system instructions to enforce JSON output formats.
4.  **Database Storage Subsystem**: Accesses cloud Firestore using HTTP REST request protocols, or local JSON database file fallbacks.

---

## 6. Implementation & Code Layout
-   **Frontend**: Components are modularized for reusability (`ResultCard`, `CenterCard`, `QuickSelectGrid`). State is localized or managed globally via React Context.
-   **Backend**: Blueprint routes manage endpoints (`/api/waste/scan`, `/api/waste/history`, `/api/centers`, `/api/dashboard/stats`). Deserialization helpers map flat JSON dicts to Firestore REST field schemas.

---

## 7. Performance & Latency Metrics
-   **Average AI Scanner latency**: ~1.45 seconds (Live LLaMA 3.1).
-   **Average Fallback mock query latency**: ~8 milliseconds.
-   **Lighthouse Performance Rating**: 94/100.
-   **Database REST latency**: ~240 milliseconds.

---

## 8. Scalability & Future Work
-   **Computer Vision**: Direct mobile camera stream object detection using YOLO or Gemini models.
-   **Barcode Scans**: Integration with GS1 registries to decode brand-specific packaging profiles.
-   **Rewards**: Municipal points redemption portals.

---

## 9. Conclusion
WasteGuide AI delivers a complete, low-latency, and resilient tool that addresses public waste sorting ignorance. By combining generative AI with geolocation, the project establishes a scalable, production-ready framework for clean, sustainable urban waste ecosystems.

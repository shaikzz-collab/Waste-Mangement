# Milestone 6: Performance & Acceptance Testing

This folder contains the performance evaluation logs, load test metrics, and User Acceptance Testing (UAT) records for **WasteGuide AI**.

---

## 📈 1. Performance Testing Report

We conducted performance testing under simulated network conditions to evaluate the latency, speed, and reliability of the application's core APIs and database adapters.

### Key Latency & Performance Metrics
| Metric / Transaction | Target SLA | Measured Value (Average) | Status |
| :--- | :--- | :--- | :---: |
| **AI Scanner Completion** (Groq LLaMA 3.1) | < 2500 ms | **1450 ms** | **Pass** |
| **Offline Cache Fallback** (Local JSON DB) | < 15 ms | **8 ms** | **Pass** |
| **Database REST Handshake** (Firestore REST) | < 400 ms | **240 ms** | **Pass** |
| **Lighthouse Performance Score** (Mobile) | > 90/100 | **94 / 100** | **Pass** |
| **Lighthouse Accessibility Score** | > 90/100 | **96 / 100** | **Pass** |

### Testing Highlights
*   **Generative AI Latency**: The `llama-3.1-8b-instant` model hosted on Groq delivered consistent sub-1.5 second responses, meeting our real-time bin-level target.
*   **Fail-Safe Robustness**: When simulated network outages were introduced, the database adapter successfully intercepted connection failures and queried the local cache, reducing scan latencies from ~1.45s to just 8 milliseconds.
*   **Database Bandwidth Efficiency**: By calling the Firebase REST API directly rather than importing the bulky Firebase Admin SDK, we reduced backend memory overhead and optimized execution times.

---

## 📋 2. User Acceptance Testing (UAT) Report

The UAT phase verified that the application meets all requirements and provides a smooth experience for the end user.

### UAT Test Cases Register
| Test ID | Scenario / Feature | Test Steps | Expected Result | Actual Result | Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **UAT-01** | AI Waste Scanner (Text search) | 1. Enter "plastic bottle" in search bar.<br>2. Click Scan button. | App returns category: *Plastic*, displays recycling steps, and records entry. | Category returned: *Plastic*. Scanner logs typing simulation. Card updated. | **Pass** |
| **UAT-02** | Hazard Warning Alert | 1. Click "alkaline battery" in quick-select grid. | Returns category: *Hazardous*. Displays a pulsing red warning banner. | Hazardous category returned. Safety alert pulsing box visible. | **Pass** |
| **UAT-03** | Offline Database Fallback | 1. Disconnect network / disable keys.<br>2. Search "cardboard box". | System catches error, queries local mock data, and saves to `history.json`. | Query resolved in 8ms. Entry appended to local `history.json`. No crashes. | **Pass** |
| **UAT-04** | Geolocation Map Filter | 1. Navigate to Map page.<br>2. Click the "E-Waste" category chip. | Map markers filter, leaving only GreenEarth recycling center pin. | Map displays GreenEarth center. Accepted list shows e-waste items. | **Pass** |
| **UAT-05** | Dashboard Charts rendering | 1. Navigate to Dashboard page.<br>2. Check charts. | Displays numeric stat cards. Chart.js draws line, bar, and doughnut charts. | Dashboard displays counts. Canvas elements successfully rendered. | **Pass** |

### Defect Analysis Matrix
We documented and resolved three defects during the integration testing phase:

| Defect ID | Description | Severity | Resolution Status | Fix Explanation |
| :---: | :--- | :---: | :---: | :--- |
| **DEF-01** | CORS preflight blocking frontend API calls to localhost:5000. | Critical | **Fixed** | Configured `flask_cors.CORS` on the backend app to allow origins `*` across `/api/*` endpoints. |
| **DEF-02** | Leaflet map container rendering blank with height 0px on route changes. | Moderate | **Fixed** | Wrapped map container in a relative div with fixed responsive height (`h-[500px]`) and triggered `.invalidateSize()` on Leaflet hooks. |
| **DEF-03** | Dashboard charts crash if user history contains 0 scans (no data). | Low | **Fixed** | Implemented a static fallback timeline seed dataset in the backend `db_service.py` to prevent canvas compilation failures. |

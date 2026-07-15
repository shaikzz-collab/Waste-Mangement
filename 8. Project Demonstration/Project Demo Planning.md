# Project Demo Planning

This document tracks the planning agenda and requirements for delivering a successful project demonstration of **WasteGuide AI**.

---

## 1. Demo Preparation Checklist

*   [x] **Backend Server Check**: Confirm Flask app runs at `http://127.0.0.1:5000` with active Groq API endpoints.
*   [x] **Frontend Server Check**: Verify Vite production build runs smoothly on port `5173`.
*   [x] **Database Verification**: Test Firestore REST connectivity via `/health` to ensure `firebase_connected: true`.
*   [x] **Browser Console Cleanliness**: Open developer console and check that there are no red JS crashes.

---

## 2. Project Demonstration Agenda

The presentation will follow this sequence of highlights:

```
+---------------------------------------------------------------+
| 1. SLIDE PRESENTATION (1 minute)                              |
| - Introduce team and Specialist Track                         |
| - Problem Statement (Sorting contamination, wishcycling)       |
| - Solution Overview (AI Scanner + Local Hub Map)              |
+---------------------------------------------------------------+
                               |
                               v
+---------------------------------------------------------------+
| 2. LIVE CLASSIFIER WALKTHROUGH (2 minutes)                    |
| - Scan regular recyclables (coffee cup, plastic bottle)       |
| - Highlight step lists and eco upcycling tips                 |
| - Scan hazardous waste (battery, led bulb) to show red warnings|
+---------------------------------------------------------------+
                               |
                               v
+---------------------------------------------------------------+
| 3. MAP REGISTRY & DASHBOARD REVIEW (2 minutes)                |
| - Search local centers by category (e.g. e-waste)             |
| - Demonstrate GPS routing link mapping                        |
| - View dashboard statistics and monthly timelines graphs      |
+---------------------------------------------------------------+
```

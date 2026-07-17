# WasteGuide AI

<p align="center">
  <img src="docs/images/banner.png" alt="WasteGuide AI Terminal Banner" width="800">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Release-v1.0.0-37D67A?style=flat-square&logo=git&logoColor=07140F" alt="Version">
  <img src="https://img.shields.io/badge/Academic%20Partner-SmartBridge-emerald?style=flat-square" alt="Academic Partner">
  <img src="https://img.shields.io/badge/Specialist%20Track-AI--Specialist-blue?style=flat-square" alt="Specialist Track">
  <img src="https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square" alt="License">
</p>

---

## 1. Project Overview
**WasteGuide AI** is an intelligent, real-time waste classification and geolocation web assistant styled with a dark green terminal aesthetic. Built for the **SmartBridge AI Specialist Track** capstone project, it leverages **LLaMA 3.1** via the Groq API and **Firebase Firestore REST API** database handshakes to educate users on correct waste sorting, reducing recycling contamination at the point of disposal.

---

## 2. Problem Statement & Solution

### The Problem
*   **Contamination**: Consumer sorting errors introduce soiled cardboard, greasy foods, and soft plastics into clean streams, forcing recycling loads into landfills.
*   **Wishcycling**: Residents place non-recyclable electronic parts or batteries into standard curbside bins, resulting in expensive machinery jams and sanitation hazards.
*   **Complexity**: Municipal rules are too confusing, and static charts fail to provide real-time guidance when residents stand in front of the bins.

### The Solution
*   **Instant AI Classifier**: Residents search for any waste item and receive categorization (Plastic, Glass, E-Waste, Organics) and step-by-step prep directions.
*   **Pulsing Hazard Alerts**: Red alert flags warn of toxic items (batteries, LED bulbs), preventing ecological leaching.
*   **Interactive Geolocation Map**: Pins centers accepting specialized waste, including Google Maps routing links.
*   **Fail-Safe Caching**: Automatically routes records to local JSON database caching if cloud connections drop.

---

## 3. Technology Stack

*   **Frontend Client**: React 19, Tailwind CSS, Leaflet Maps, Chart.js.
*   **Backend Server**: Python 12, Flask, Gunicorn (WSGI).
*   **AI Engine**: Groq Cloud API (`llama-3.1-8b-instant` LLM).
*   **Database**: Firebase Firestore REST API (no private key JSON required).
*   **Fallback Cache**: File-based local JSON database (`backend/data/history.json`).

---

## 4. Repository Directory Structure

```
Waste-Mangement/
├── 1. Brainstorming & Ideation/   # Milestone 1 Documents
├── 2. Requirement Analysis/       # Milestone 2 Documents
├── 3. Project Design Phase/       # Milestone 3 Documents
├── 4. Project Planning Phase/     # Milestone 4 Documents
├── 5. Project Development Phase/   # Milestone 5 Documents
├── 6. Performance Testing/        # Milestone 6 Documents
├── 7. Documentation & Demo/       # Milestone 7 Documents
│   ├── src/                       # Project Source Files & PDF Templates
│   │   ├── backend/               # Python Flask Web Service
│   │   │   ├── config/            # Config modules
│   │   │   ├── data/              # Fallback history cache
│   │   │   ├── routes/            # Flask Blueprint endpoints
│   │   │   ├── services/          # Groq & Firestore services
│   │   │   └── app.py             # Backend entrypoint
│   │   ├── frontend/              # React SPA Source Code
│   │   │   ├── src/               # Components, Pages, and Hooks
│   │   │   ├── index.html         # HTML body index
│   │   │   └── vite.config.js     # Vite configuration
│   │   ├── Project Executable Files & Execution Guide (2).pdf
│   │   └── Sample Project Documentation.pdf
├── 8. Project Demonstration/      # Milestone 8 Documents
├── docs/                          # Guides & Banner graphics
├── Screenshots/                   # Cropped screenshots folder
├── firebase.json                  # Firebase static host config
└── README.md                      # Project documentation master
```

---

## 5. Quick Installation & Launch

Detailed installation logs are available in [INSTALLATION.md](file:///c:/Users/Sameer/OneDrive/Desktop/WasteManagement/7.%20Documentation%20&%20Demo/INSTALLATION.md) (or [relative link](./INSTALLATION.md)).

### 1. Launch the Backend Server
```bash
cd "7. Documentation & Demo/src/backend"
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Copy .env.example to .env and configure your GROQ_API_KEY
cd ..
python -m backend.app
```

### 2. Launch the Frontend Dev Server
```bash
cd "7. Documentation & Demo/src/frontend"
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser to run the app.

---

## 6. Screenshots & Demonstration
Verify screenshot naming conventions and view instructions in [SCREENSHOTS.md](file:///c:/Users/Sameer/OneDrive/Desktop/WasteManagement/docs/SCREENSHOTS.md). Please save your cropped captures inside the [Screenshots/](file:///c:/Users/Sameer/OneDrive/Desktop/WasteManagement/Screenshots/) folder.

---

## 7. Submission Status
*   **Academic Partner**: SmartBridge Academy
*   **AI Specialist Track Student**: Sameer
*   **Submissions Checklist**: Review all submission deliverables in [SUBMISSION_CHECKLIST.md](file:///c:/Users/Sameer/OneDrive/Desktop/WasteManagement/7.%20Documentation%20&%20Demo/SUBMISSION_CHECKLIST.md) (or [relative link](./SUBMISSION_CHECKLIST.md)).
*   **Comparison Audit**: View project-to-template alignment details in [COMPARISON_REPORT.md](file:///c:/Users/Sameer/OneDrive/Desktop/WasteManagement/7.%20Documentation%20&%20Demo/COMPARISON_REPORT.md) (or [relative link](./COMPARISON_REPORT.md)).

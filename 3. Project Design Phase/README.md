# Milestone 3: Project Design Phase

This folder contains the Problem-Solution Fit framework, proposed solution details, and the system architecture blueprints for **WasteGuide AI**.

---

## 📐 1. Problem-Solution Fit Canvas

We utilized the Problem-Solution Fit framework (based on the Lean Canvas layout) to ensure that the core capabilities of **WasteGuide AI** directly map to the needs, limitations, and pain points of our target users:

| Canvas Section | Key Details & WasteGuide AI Mapping |
| :--- | :--- |
| **1. Customer Segment(s)** | Eco-conscious urban citizens, apartment renters, and busy families trying to minimize household waste. |
| **2. Problems / Pains & Frequency** | Sorting confusion at the trash bin (daily frequency), anxiety over municipal rules (weekly), guilt about landfill pollution (continuous). |
| **3. Triggers to Act** | Standing in front of the trash cans with waste in hand; notice of garbage contamination penalties; community green drives. |
| **4. Emotions (Before & After)** | **Before**: Confused, anxious, hesitant. **After**: Confident, validated, motivated. |
| **5. Available Solutions (Pros & Cons)**| *Municipal Flyers*: Offline but dry, outdated, and easily lost.<br>*Google Search*: Comprehensive but slow, lacks direct center geolocations, and results are noisy.<br>*Native Mobile Apps*: Portable but require downloads, sign-ups, and take up device storage. |
| **6. Customer Limitations** | Tiny mobile screen sizes; low-bandwidth mobile connections outdoors; preference for zero-installation web applications. |
| **7. Behavior & Intensity** | Users have a high green intent but will dump items in general landfill bins when rules are confusing to save time. |
| **8. Channels of Behavior** | **Online**: Progressive Web Application (PWA).<br>**Offline**: Bins and flyers linking to the site. |
| **9. Problem Root Cause** | Tiny resin recycling codes on products; lack of unified city rules; absence of instant, bite-sized prepping advice. |
| **10. Your Proposed Solution** | **WasteGuide AI**: Zero-install terminal web portal providing 2-second LLM classification, safety hazard highlights, dynamic collection mapping, and personal stats logging. |

---

## 💡 2. Proposed Solution Overview

WasteGuide AI is designed as a decoupled, micro-service web platform. The design guarantees high responsiveness and reliable operations even under poor network conditions:

*   **Modular Web Views**: Separate views for AI Scanning, Leaflet Geolocation Map, Scan History Logs, and Charts Dashboard.
*   **Dual-Database Storage Adapter**: Saves scan records to a high-speed database interface. Automatically abstracts the data storage layer so the frontend remains unaffected by backend state changes.
*   **AI Prompt Serialization**: Enforces JSON Schema outputs from LLaMA 3.1, removing parsing crashes and ensuring consistent UI card renderings.

---

## 🏗️ 3. Solution Architecture

The following diagram illustrates the component-level relationships and data paths in the WasteGuide AI system, detailing how the React frontend, Flask backend, Groq AI engine, cloud database, and local fallback cache interact.

```mermaid
graph TD
    subgraph Client [Client Portal (React SPA - Port 5173)]
        App[App.jsx] --> AuthCtx[AuthContext.jsx]
        App --> Home[Home Page / Scanner]
        App --> Map[Map Page / Leaflet]
        App --> Hist[History Page / Logs]
        App --> Dash[Dashboard Page / Charts]
    end

    subgraph Server [Backend Gateway (Flask - Port 5000)]
        app_py[app.py Entrypoint] --> waste_bp[routes/waste.py]
        app_py --> centers_bp[routes/centers.py]
        app_py --> dashboard_bp[routes/dashboard.py]
        
        waste_bp --> groq_svc[services/groq_service.py]
        waste_bp --> db_svc[services/db_service.py]
        centers_bp --> db_svc
        dashboard_bp --> db_svc
    end

    subgraph Models [Model & Inference Tier]
        groq_svc -->|HTTP POST JSON| GroqAPI[Groq LLaMA 3.1 API]
    end

    subgraph Data [Data & Storage Tier]
        db_svc -->|Firestore Admin SDK / REST| CloudFS[(Cloud Firestore DB)]
        db_svc -->|Fallback JSON Adapter| LocalJSON[(Local history.json File)]
        db_svc -->|Seed Centers Listing| SeedCenters[(Mock Centers List)]
    end

    classDef clientStyle fill:#10251C,stroke:#204732,stroke-width:2px,color:#E8FFF3;
    classDef serverStyle fill:#152B1E,stroke:#2F5E43,stroke-width:2px,color:#E8FFF3;
    classDef externalStyle fill:#0A1B29,stroke:#1C3C5A,stroke-width:2px,color:#8CBEE6;
    classDef dataStyle fill:#2A1D0F,stroke:#5A4026,stroke-width:2px,color:#FFC68C;

    class App,AuthCtx,Home,Map,Hist,Dash clientStyle;
    class app_py,waste_bp,centers_bp,dashboard_bp,groq_svc,db_svc serverStyle;
    class GroqAPI externalStyle;
    class CloudFS,LocalJSON,SeedCenters dataStyle;
```

### Component Details
1.  **Vite React Client**: Renders the terminal theme using Tailwind. The mapping client utilizes `react-leaflet` to query OpenStreetMap. The charts dashboard uses `chart.js` via `react-chartjs-2` to render canvas graphics.
2.  **Flask Routing Blueprint**:
    *   `/api/waste/scan`: Receives text query, triggers LLaMA 3.1 evaluation, saves log, and returns card payload.
    *   `/api/waste/history`: Retrieves user history.
    *   `/api/centers`: Returns coordinates of regional facilities.
    *   `/api/dashboard/stats`: Returns aggregated numerical arrays for dashboard charts.
3.  **Groq Service Layer**: Configures temperature to `0.1` and forces `response_format={"type": "json_object"}`. If API calls time out, it returns a dynamic mock parser.
4.  **Database Service Adapter**: Implements a double try-catch layout. It first attempts to connect via the Admin SDK or REST endpoint to Firestore. Upon timeout or authentication failure, it dumps the record into a local flat file database (`backend/data/history.json`), maintaining continuous operational availability.

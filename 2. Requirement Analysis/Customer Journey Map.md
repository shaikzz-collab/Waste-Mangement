# Customer Journey Map

This document tracks the steps, thoughts, feelings, and touchpoints of a typical resident using the **WasteGuide AI** application.

---

## User Journey Outline

*   **User Persona**: Alex (Responsible Urban Resident)
*   **Goal**: Properly dispose of a mixed waste item (e.g. coffee cup, broken cell phone) without causing recycling contamination.

---

| Stage | 1. Discovery & Entry | 2. Waste Classification | 3. Hub Mapping | 4. Progress Review |
| :--- | :--- | :--- | :--- | :--- |
| **User Activity** | Opens the app on a mobile device standing near the apartment trash bins. | Types "coffee cup" into the search terminal. | Searches for an electronics depot to drop off a broken phone. | Checks the dashboard to see total scans and recycling rate. |
| **Touchpoints** | Homepage UI, terminal banner, search input box. | Groq AI classification card, recycling instructions, eco tips. | Leaflet map markers, Center listing card, GPS routing link. | Dashboard stats, category pie charts, monthly timeline logs. |
| **User Thoughts** | "Wow, this looks like a cool command-line dashboard! Is it easy to use?" | "Ah, so paper coffee cups have plastic lining and go to trash, but the sleeve is recyclable." | "Is there a drop-off center near me? Great, it's only 1.2 miles away." | "I've scanned 15 items this week and recycled 70% of them. Excellent!" |
| **User Feelings** | Curious, engaged by the aesthetics. | Informed, relieved, educated. | Empowred, active, self-reliant. | Satisfied, accomplished, motivated. |
| **Pain Points** | Slow loading or initial flashes of default white screen (Fixed: dark CSS loading). | Complex text that doesn't detail what to do with plastic lids (Fixed: step-by-step lists). | No car or transport to go to drop-off center (Fixed: displays phone and distance). | Flat stats that are boring (Fixed: glowing terminal Chart.js graphs). |
| **App Feature** | Sticky responsive Navbar, glowing input box, quick select grid. | Groq AI API JSON completion router, fallback mock database. | Leaflet map integration, distance indicators, Category chips. | Firestore REST API query compiler, Chart.js integrations. |

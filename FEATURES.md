# Functional Features - WasteGuide AI

This document details the functional specifications of the features implemented in the **WasteGuide AI** application.

---

## 1. Feature 1: The AI Waste Scanner (Home Page)
- **Input Console**: Search bar with real-time text input.
- **Quick-Select Grid**: A grid of 12 common icons (plastic bottle, battery, led bulb, etc.) to trigger instant searches with one click.
- **Detailed ResultCard**: Renders classification category, emoji, recyclability badges, step-by-step instructions, and upcycling ideas.
- **Toxicity Warnings**: If an item is hazardous, displays a red pulsing caution warning describing safety steps.
- **Typing Log console**: Simulates terminal logs during scans (e.g. `PARSING OBJECT SPECIFICATION...`, `CONNECTING LLM COMPILATION CLOUD...`).

---

## 2. Feature 2: Interactive Geolocation Map (Map Page)
- **Leaflet Map**: Implements a dark-mode cartography interface displaying local recycling collection hubs.
- **Category Filter Chips**: Chips (Plastic, Metal, Glass, E-Waste) to filter markers.
- **Hub details listing**: Side cards showing distances, addresses, and phone numbers.
- **Details Panel**: Shows list of accepted materials for the selected center and provides a GPS routing link to open navigation via Google Maps.

---

## 3. Feature 3: Scan Log History (History Page)
- **User Log Index**: Fetches previous scans from the database (Firestore or local JSON) and list them.
- **Text Search**: Real-time filtering of history by item name or category.
- **Detailed View**: Click any card in the list to open its full `ResultCard` details overlay.

---

## 4. Feature 4: Performance Analytics Dashboard (Dashboard Page)
- **4 Key Stat Cards**: Totals of scans, recycled items count, reusable items count, and hazardous items count.
- **Timeline Graph**: Chart.js line graph of scan activities over the last months.
- **Success Rates**: Bar chart comparing scanned items vs. recycled count.
- **Material Distribution**: Doughnut chart showing category distribution (Plastic, Metal, Paper, etc.).

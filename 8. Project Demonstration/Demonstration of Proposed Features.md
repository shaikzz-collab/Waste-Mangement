# Demonstration of Proposed Features

This document provides a step-by-step script for validating and demonstrating each feature of the **WasteGuide AI** app.

---

## 1. Demo Scenario: Basic Search & AI Classification

1.  **Action**: Open the homepage at `http://localhost:5173`.
2.  **Verify**: Confirm the dark-green terminal banner reads `▋ WASTE_GUIDE AI` and the green cursor is blinking.
3.  **Action**: Type `cardboard box` in the search bar and press Enter (or click `Cardboard Box` on the quick select grid).
4.  **Verify**:
    *   Typewriter loading logs scroll on screen: `PARSING OBJECT SPECIFICATION...`, `CONNECTING LLM COMPILATION CLOUD...`
    *   `ResultCard` appears.
    *   Recyclable box reads `TRUE` (green border).
    *   `Disposal Instructions` details box flattening.
    *   4 numbered steps describe packing materials removal and flattening.

---

## 2. Demo Scenario: Toxic Waste & Safety Alert

1.  **Action**: Type `alkaline battery` in the search input and press Enter.
2.  **Verify**:
    *   `ResultCard` renders.
    *   `Hazardous` stat card pulses in red: `HAZARDOUS: TRUE`.
    *   Red alert caution warning block reads: `Contains toxic materials...`.
    *   Disposal notes instruct the user to drop it off at designated collection points rather than curbside.

---

## 3. Demo Scenario: Geolocation Registry Map

1.  **Action**: Click the `MAP` link in the sticky navigation bar.
2.  **Verify**: Dark-matter Leaflet map initializes at the default coordinates (San Francisco).
3.  **Action**: Select the `E-Waste` material filter chip.
4.  **Verify**:
    *   Map coordinates pan automatically to the first matching e-waste facility.
    *   CenterCard highlights the center with a green glowing shadow.
    *   Click `ROUTE NAVIGATION VIA GPS` and confirm it opens Google Maps directions search in a new browser tab.

---

## 4. Demo Scenario: Analytics Dashboard

1.  **Action**: Click the `DASHBOARD` link in the navigation header.
2.  **Verify**:
    *   4 glowing StatCards show correct aggregate values (Total scans, recycled items count, reusable count, hazardous count).
    *   Line, Bar, and Doughnut graphs render using high-contrast terminal theme colors.

# Solution Requirements

This document outlines the functional and non-functional requirements for the **WasteGuide AI** application.

---

## 1. Functional Requirements

### FR-1: Intelligent Waste Classification
- **Description**: The system must allow users to search for any common household waste item by name.
- **Details**: 
  - If internet and API configurations exist, classify the item dynamically using Groq's LLaMA 3.1 LLM.
  - If offline or keys are missing, search the local mock database or generate a smart keyword-based mock classification.
  - Return a structured schema: category, recyclability, reusability, toxicity/hazard flag, disposal directions, and step-by-step instructions.

### FR-2: Cloud History Logs
- **Description**: The system must log every scan event for a user.
- **Details**:
  - Store scans in a database with unique document IDs, user IDs, and timestamps.
  - Fall back to a local JSON file database if the cloud database is offline.

### FR-3: Interactive Recycling Map
- **Description**: The system must render a map showing local recycling facilities.
- **Details**:
  - Display facility locations, categorized by the type of waste they accept (Plastic, E-Waste, Glass, etc.).
  - Allow category filters (e.g. show only E-Waste centers).
  - Open external GPS directions (e.g., Google Maps) when clicking the routing button.

### FR-4: Visual Metrics Dashboard
- **Description**: The system must aggregate metrics for user scans.
- **Details**:
  - Show total items scanned, total items recycled, reusable items, and hazardous items count.
  - Render a monthly timeline showing scan rates and recycling efficiency over time using charts.
  - Render a pie chart showing waste type distribution (Plastic, Metal, Paper, etc.).

---

## 2. Non-Functional Requirements

### NFR-1: Performance & Latency
- **Requirement**: Search results must return in under **2.5 seconds** when calling Groq's API, and under **300ms** when hitting the local fallback database.
- **Map Loading**: Leaflet maps and map tiles must render within **1.5 seconds** of navigation.

### NFR-2: Visual Themes & Accessibility
- **Requirement**: The app must use a dark green terminal-style theme.
- **Aesthetic Parameters**:
  - Primary color: `#37D67A` (glowing terminal green).
  - Background color: `#07140F` (very dark forest black).
  - Borders: `#204732` (medium forest green).
  - Text must meet contrast standards (high contrast green/white text on dark backgrounds).

### NFR-3: Compatibility & Support
- **Requirement**: The frontend must load cleanly in all modern desktop and mobile browsers (Chrome, Safari, Firefox, Edge).
- **Responsive Layout**: Use flexboxes and grids to wrap and stack columns gracefully on mobile viewports.

### NFR-4: Resiliency & Fail-Safe Database
- **Requirement**: The server must not throw 500 errors if Firestore or Groq is unreachable.
- **Fail-Safe**: If a database write fails, cache it in local files and notify the user that they are operating in Demo Mode.

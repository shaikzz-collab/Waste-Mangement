# Proposed Solution (Project Proposal)

This document serves as our formal Project Proposal for the **SmartBridge AI Specialist Track** capstone.

---

## 1. Project Title
**WasteGuide AI**: An Intelligent Real-Time Waste Classification and Geolocation Assistant.

---

## 2. Project Executive Summary
WasteGuide AI is a response to low urban recycling rates caused by consumer sorting mistakes. Built with a responsive, high-contrast dark green terminal theme, it allows users to search or scan any item, getting an instant categorization decision from Groq's LLaMA 3.1 LLM. It shows:
1. **Recyclability / Reusability Status** (whether it goes to Curbside, Hazard drop-off, or Landfill).
2. **Actionable numbered instructions** (cleaning, dismantling, labels removal).
3. **Eco tips** (upcycling suggestions or waste reduction advice).

It links users to local collection facilities for hazardous materials (E-Waste, batteries, chemicals) via an interactive Leaflet Map. A dashboard compiles scan statistics and recycling rates using Chart.js graphs, with automatic fail-safe fallbacks to local files if database networks go offline.

---

## 3. Core Deliverables Built

### A. AI Classification Service
- An API endpoint querying LLaMA 3.1 that formats waste attributes into structured JSON. Includes warning triggers for dangerous materials (e.g. acids, lithium batteries).

### B. Client dashboard & Search Console
- A search input console with visual suggestions cards, quick-select grid nodes, loading scripts, and interactive result panels.

### C. Map Registry
- A Leaflet geolocation interface showing local centers, categorized by material accepted, with GPS coordinates, phone numbers, and operational hours.

### D. Progress Visualizer
- Running counts and monthly statistics rendered using three Chart.js visual graphs (Line, Bar, Doughnut).

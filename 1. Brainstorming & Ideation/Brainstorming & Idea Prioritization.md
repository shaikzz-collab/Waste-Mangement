# Brainstorming & Idea Prioritization

This document details the brainstorming, ideation, and decision-making process for selecting the **WasteGuide AI** project.

---

## 1. Product Concepts Explored

During the ideation phase, our team evaluated three alternative software solutions designed to combat urban waste management inefficiencies:

### Concept A: IoT QR-Code Trash Bin Tracker
- **Description**: A mobile web portal where residents scan QR codes on street trash bins to report overflow or damage, alerting local municipal sanitation teams.
- **Pros**: Easy report submissions; clear utility for city operations.
- **Cons**: High hardware dependency (every trash bin needs physical QR stickers); relies heavily on municipal response times; does not educate residents on sorting.

### Concept B: Crowdsourced Litter Cleanup Locator
- **Description**: A social platform where volunteers map littered neighborhoods, organize cleanup events, and post photo updates.
- **Pros**: Strong community building; gamifies cleanups.
- **Cons**: High churn rate; doesn't address the root cause of recycling contamination at the consumer level.

### Concept C: WasteGuide AI (Selected Solution)
- **Description**: A dark-themed terminal web app that uses edge-accessible LLaMA 3.1 AI and public Firestore REST API database handshakes to classify waste items instantly, giving clear instructions, list steps, eco tips, and mapping nearby collection centers.
- **Pros**: Solves the immediate problem of sorting ignorance; provides zero-hardware AI-driven value; keeps historical metrics logs for users; fully responsive.
- **Cons**: Requires active LLM API connections (mitigated by high-fidelity local database fallbacks).

---

## 2. Prioritization Matrix

We scored each concept out of 10 across four vital criteria:

| Product Concept | Technical Feasibility (10) | Community Impact (10) | Implementation Speed (10) | Scale Potential (10) | Total Score |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Concept A: QR Bin Tracker** | 6 | 7 | 6 | 5 | **24/40** |
| **Concept B: Cleanup Locator** | 8 | 8 | 7 | 6 | **29/40** |
| **Concept C: WasteGuide AI** | **9** | **9** | **9** | **9** | **36/40** |

---

## 3. Decision Rationale

**WasteGuide AI** was selected as our capstone project for the following reasons:
1. **Immediate Educational Impact**: It addresses the primary bottleneck in modern recycling: consumer ignorance at the point of disposal.
2. **Technical Depth**: Fits the **SmartBridge AI Specialist Track** criteria by demonstrating API integration (Groq + LLaMA 3.1) and cloud storage integrations (Firestore REST).
3. **No Physical Barriers**: Does not require physical stickers or city collaboration, allowing immediate deployment and public testing.

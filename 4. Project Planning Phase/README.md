# Milestone 4: Project Planning Phase

This folder contains the project scheduling blueprints, task allocations, Gantt chart registers, and planning logic for **WasteGuide AI**.

---

## 📅 1. Project Schedule & Gantt Register

We followed a structured Work Breakdown Structure (WBS) dividing the project into 8 core phases. The schedule was planned from **June 1, 2026** to **July 16, 2026**, leading directly to the capstone deployment release.

| WBS ID | Task Name | Start Date | End Date | Duration (Days) | Dependencies | Assignee | % Complete |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| **1.1** | Brainstorming & Idea Prioritization | June 01 | June 03 | 3 | None | Shaik Sameer | 100% |
| **1.2** | Problem Statement & Empathy Mapping | June 04 | June 06 | 3 | 1.1 | Mahammad Hujefa | 100% |
| **2.1** | User Journey & DFD Flow Modeling | June 08 | June 11 | 4 | 1.2 | Seerla Aishwarya | 100% |
| **2.2** | Functional & NFR Specification | June 12 | June 13 | 2 | 2.1 | Shaik Sameer | 100% |
| **3.1** | Lean Canvas (Problem-Solution Fit) | June 15 | June 17 | 3 | 2.2 | Mahammad Hujefa | 100% |
| **3.2** | Architecture Design & API Schema | June 18 | June 20 | 3 | 3.1 | Shaik Sameer | 100% |
| **4.1** | WBS Scheduling & Resource Plan | June 22 | June 23 | 2 | 3.2 | Seerla Aishwarya | 100% |
| **5.1** | Backend API & Service Core Coding | June 24 | July 02 | 9 | 4.1 | Shaik Sameer | 100% |
| **5.2** | Frontend Components & Maps Coding | June 26 | July 05 | 10 | 4.1 | Hujefa / Aishwarya | 100% |
| **5.3** | Dual-Database Resilient Cache Sync | July 06 | July 08 | 3 | 5.1 | Shaik Sameer | 100% |
| **6.1** | Latency, Speed & Load Testing | July 09 | July 10 | 2 | 5.3 | Mahammad Hujefa | 100% |
| **6.2** | User Acceptance Testing (UAT) & Fixes| July 11 | July 12 | 2 | 6.1 | Sameer / Aishwarya | 100% |
| **7.1** | Environment Setup Guides & API Docs | July 13 | July 14 | 2 | 6.2 | Shaik Sameer | 100% |
| **7.2** | Final Capstone Report Compilation | July 14 | July 15 | 2 | 7.1 | Sameer / Hujefa | 100% |
| **8.1** | Demonstration Scripting & Recording | July 15 | July 16 | 2 | 7.2 | Shaik Sameer | 100% |

---

## 🧠 2. Project Planning Logic

Our scheduling decisions and timeline calculations were driven by the following project management logic:

1.  **Critical Path Scheduling**: The critical path runs through Architecture Design (3.2) $\rightarrow$ Backend API Coding (5.1) $\rightarrow$ Dual-Database Integration (5.3) $\rightarrow$ Latency Testing (6.1) $\rightarrow$ UAT (6.2). Any delay in these tasks directly impacts the project release date.
2.  **Task Parallelism**: To optimize our 6-week timeframe, Frontend Components Coding (5.2) was scheduled in parallel with Backend Core Coding (5.1). The team used mocked JSON payloads during this period to code interfaces prior to backend route integrations.
3.  **Buffer Allocation**: We allocated a 3-day buffer during the development phase (5.3) to resolve potential CORS issues, Firestore REST token handshakes, and Groq LLM API connectivity bugs.
4.  **Resource Optimization**:
    *   *Sameer* (AI/Database Specialist): Dedicated to backend, LLaMA prompt optimization, database REST synchronizations, and deployment.
    *   *Hujefa* (Frontend/Quality Assurance): Focused on Leaflet map components, styling, and load testing.
    *   *Aishwarya* (Product/Integration): Focused on journey mapping, UX accessibility, Chart.js integrations, and UAT test execution.

---

## 🏁 3. Core Milestone Deliverables

```
[June 01] Start
    │
    ▼
[June 06] 🎯 Milestone 1: Ideation Approval (Empathy map & Problem statements signed-off)
    │
    ▼
[June 13] 🎯 Milestone 2: Requirement Lock (FR, NFR, and Level 1 DFDs frozen)
    │
    ▼
[June 20] 🎯 Milestone 3: Design Review (Architecture blueprints & DB schema approved)
    │
    ▼
[July 08] 🎯 Milestone 4: Development Complete (Backend API and Frontend SPA integrated)
    │
    ▼
[July 12] 🎯 Milestone 5: Testing Clearance (UAT test cases completed, defects fixed)
    │
    ▼
[July 16] 🚀 Final Release (Demo video, documentation, and repository submission)
```

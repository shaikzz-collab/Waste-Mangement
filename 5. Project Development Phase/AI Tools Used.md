# AI Tools Used

This document lists the artificial intelligence models, code agents, and developer accelerators used during the project lifecycle.

---

## 1. Core Model Integration

### Groq API Service
- **Model**: `llama-3.1-8b-instant`
- **Purpose**: Powering the Waste Classifier search engine. Analyzes the queried item name and returns structured sorting, safety, and upcycling data.
- **Why selected**: It provides sub-second latency for API requests, supporting immediate feedback in the frontend search bar.

---

## 2. Developer AI Tools

### Antigravity AI Coding Assistant (Gemini)
- **Purpose**: Assisted in pair programming, refactoring components, mapping REST API endpoints, implementing styling classes, and aligning the repository structure with SmartBridge templates.
- **Key Contributions**:
  - Wrote the Firestore REST client fallback layer in Python.
  - Formatted responsive terminal-themed layouts using Tailwind CSS.
  - Generated capstone documentation mapping.

### GitHub Copilot
- **Purpose**: Autocompleted standard React functions, boilerplate imports, and repetitive CSS token declarations, speeding up implementation times.

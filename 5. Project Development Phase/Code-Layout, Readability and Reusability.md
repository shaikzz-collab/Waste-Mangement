# Code-Layout, Readability, and Reusability

This document details the code formatting rules, file structures, and component reuse strategies utilized to keep the **WasteGuide AI** codebase clean and maintainable.

---

## 1. Directory Structure

The project separates frontend assets and backend scripts cleanly:

-   `backend/`: Micro-server modular layout.
    -   `app.py`: Server runner.
    -   `config/`: Env configurations and setup.
    -   `routes/`: Modular endpoints mapping (waste, centers, dashboard).
    -   `services/`: Cloud services (Groq AI, Firestore REST).
-   `frontend/`: SPA components.
    -   `src/components/`: Reusable widgets (cards, chart wrappers, loading icons).
    -   `src/pages/`: Main page components.
    -   `src/context/`: Auth state management.

---

## 2. Coding Conventions & Code Readability

1.  **Strict Variable Naming**:
    *   Python variables and files use standard snake_case (e.g. `save_scan_history`).
    *   Javascript components and states use standard camelCase / PascalCase (e.g. `selectedCenter`).
2.  **Safety Fallbacks**:
    *   All loops or array maps (like `.map()`) check parameter types first (e.g. `Array.isArray()`) to prevent rendering crashes.
    *   Environment keys are mapped to defaults (e.g., config templates) to prevent crash-on-launch issues if `.env` keys are unset.
3.  **Modular Reusable UI Components**:
    *   **`CenterCard`**: Used on the main Map page list and reused inside other center registries.
    *   **`ResultCard`**: Renders scan data cleanly on the Home search page, and is reused on the History page to view previous logs details.
    *   **`CategoryChip`**: Instantly reusable button component styled with hover animations.

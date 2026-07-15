# Contributing to WasteGuide AI

Thank you for your interest in contributing to **WasteGuide AI**! We welcome bug fixes, documentation improvements, and feature requests.

---

## 1. Code of Conduct
Please be respectful and collaborative in all communications, issue descriptions, and pull requests.

---

## 2. Setting Up a Development Branch

1.  **Fork the Repository**: Create a personal copy of the repository on GitHub.
2.  **Clone Locally**:
    ```bash
    git clone https://github.com/your-username/Waste-Mangement.git
    cd Waste-Mangement
    ```
3.  **Create a Feature Branch**:
    ```bash
    git checkout -b feature/your-awesome-feature
    ```

---

## 3. Contribution Rules & Linting

### Backend (Python/Flask)
- Ensure all functions include descriptive docstrings.
- Test endpoint responses using the fallback mock database modes.
- Avoid introducing circular imports.

### Frontend (React/Vite)
- Check that all `.map()` rendering functions are wrapped in type-validation guards (e.g. `Array.isArray(variable) || []`) to prevent crashes.
- Do not commit local sensitive API credentials inside `.env` or configurations files. Keep all keys configured using environment variables.

---

## 4. Submitting a Pull Request

1.  Push your branch to your fork:
    ```bash
    git push origin feature/your-awesome-feature
    ```
2.  Open a Pull Request on GitHub against the `main` branch.
3.  Provide a clear description of the modifications, features added, and manual verification steps completed.

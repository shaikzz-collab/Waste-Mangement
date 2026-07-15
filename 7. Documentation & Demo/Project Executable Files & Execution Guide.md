# Project Executable Files & Execution Guide

This document lists the executable files and commands required to build, install, and run **WasteGuide AI** locally.

---

## 1. Directory Structure of Executables

-   `backend/`
    -   `app.py`: Backend entrypoint script.
    -   `requirements.txt`: Python dependencies list.
-   `frontend/`
    -   `package.json`: NPM package management config.
    -   `vite.config.js`: Vite bundling configuration.

---

## 2. Quick Run Guide

### Step 1: Run the Backend Flask Server
Open a terminal in the project root folder and execute:

```bash
# 1. Navigate to backend directory and load virtual env (optional)
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 2. Install python dependencies
pip install -r requirements.txt

# 3. Create .env file with your API keys (copy from .env.example)
# Add GROQ_API_KEY and Firebase REST keys

# 4. Start the backend app (Run from the project root directory)
cd ..
python -m backend.app
```
The server will start on **`http://localhost:5000`**.

### Step 2: Run the React Frontend Client
Open a second terminal in the project root folder and execute:

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install NPM node packages
npm install

# 3. Compile and launch Vite Dev server
npm run dev
```
The web client will start on **`http://localhost:5173`**.

---

## 3. Environment Configurations

### Backend `.env` parameters:
*   `PORT`: 5000
*   `GROQ_API_KEY`: Your Groq Cloud access key.
*   `FIREBASE_API_KEY`: Your Firebase project Web key.
*   `FIREBASE_PROJECT_ID`: Your target Firebase project ID.

### Frontend `.env` parameters:
*   `VITE_FIREBASE_API_KEY`: Your Firebase Web key.
*   `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID.

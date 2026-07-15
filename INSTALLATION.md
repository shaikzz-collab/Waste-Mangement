# Installation & Setup Guide - WasteGuide AI

This document provides step-by-step instructions for installing and running **WasteGuide AI** on your local machine.

---

## 1. Prerequisites
Ensure you have the following software installed:
-   **Node.js** (v18.0 or newer)
-   **NPM** (v9.0 or newer)
-   **Python** (v3.10 or newer)
-   **Git**

---

## 2. Step-by-Step Installation

### Step 1: Clone the Repository
Clone the repository to your local directory:
```bash
git clone https://github.com/shaikzz-collab/Waste-Mangement.git
cd Waste-Mangement
```

---

### Step 2: Backend Setup

#### 1. Navigate to the backend folder:
```bash
cd "7. Documentation & Demo/backend"
```

#### 2. Create a Python Virtual Environment:
```bash
python -m venv venv
```
Activate it:
-   **Windows**: `venv\Scripts\activate`
-   **macOS/Linux**: `source venv/bin/activate`

#### 3. Install Required Dependencies:
```bash
pip install -r requirements.txt
```

#### 4. Configure Environment Keys:
Create a `.env` file in the `7. Documentation & Demo/backend/` directory and configure the variables:
```env
PORT=5000
GROQ_API_KEY=gsk_your_groq_api_key_here
FIREBASE_API_KEY=AIzaSyCnLyQBvwronDh3uY8uQZmOlCGaGnx4XzU
FIREBASE_PROJECT_ID=wasteguideai-8133c
```

---

### Step 3: Frontend Setup

#### 1. Navigate to the frontend directory:
```bash
cd "../frontend"
```

#### 2. Install NPM packages:
```bash
npm install
```

#### 3. Configure Frontend Environment Keys:
Create a `.env` file in the `7. Documentation & Demo/frontend/` directory:
```env
VITE_FIREBASE_API_KEY=AIzaSyCnLyQBvwronDh3uY8uQZmOlCGaGnx4XzU
VITE_FIREBASE_PROJECT_ID=wasteguideai-8133c
```

---

## 3. Running the Application

### 1. Launch the Backend Server
From the **`7. Documentation & Demo`** directory, run:
```bash
python -m backend.app
```
Confirm the logs indicate:
`>>> Starting WasteGuide AI Backend on port 5000...`

### 2. Launch the Frontend Dev Server
From the **`7. Documentation & Demo/frontend`** directory, run:
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`** to test the application!

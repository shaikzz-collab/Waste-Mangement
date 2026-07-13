import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

# App configuration
PORT = int(os.getenv("PORT", 5000))
FLASK_ENV = os.getenv("FLASK_ENV", "development")

# Groq API configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

# Firebase configuration
FIREBASE_KEY_PATH = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_PATH", "backend/config/firebase-service-account.json")

# Individual Firebase configuration variables as fallback
FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID", "")
FIREBASE_PRIVATE_KEY = os.getenv("FIREBASE_PRIVATE_KEY", "").replace("\\n", "\n")
FIREBASE_CLIENT_EMAIL = os.getenv("FIREBASE_CLIENT_EMAIL", "")

# Determine if we should run in demo mode (simulating database and AI responses)
IS_DEMO_MODE = False

if not GROQ_API_KEY or GROQ_API_KEY == "gsk_your_groq_api_key_here":
    IS_DEMO_MODE = True
    print(">>> WARNING: Groq API Key is not set or is using the template placeholder. Running in DEMO MODE.")

# Check if Firebase credentials exist
firebase_creds_exist = (
    os.path.exists(FIREBASE_KEY_PATH) or 
    os.path.exists(os.path.join(os.path.dirname(os.path.dirname(__file__)), FIREBASE_KEY_PATH)) or
    (FIREBASE_PROJECT_ID and FIREBASE_PRIVATE_KEY and FIREBASE_CLIENT_EMAIL)
)

if not firebase_creds_exist:
    IS_DEMO_MODE = True
    print(">>> WARNING: Firebase credentials not found. Database features will run in DEMO MODE.")

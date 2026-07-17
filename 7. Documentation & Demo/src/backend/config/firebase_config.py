import os
import firebase_admin
from firebase_admin import credentials, firestore, auth
from backend.config import config

db = None
auth_client = None

if not config.IS_DEMO_MODE:
    try:
        # Try initializing with service account path
        key_path = config.FIREBASE_KEY_PATH
        # Resolve path relative to backend directory if needed
        if not os.path.isabs(key_path) and not os.path.exists(key_path):
            backend_dir = os.path.dirname(os.path.dirname(__file__))
            potential_path = os.path.join(backend_dir, key_path)
            if os.path.exists(potential_path):
                key_path = potential_path

        if os.path.exists(key_path):
            cred = credentials.Certificate(key_path)
            firebase_admin.initialize_app(cred)
            db = firestore.client()
            print(">>> Firebase Admin SDK initialized successfully with service account JSON file.")
        elif config.FIREBASE_PROJECT_ID and config.FIREBASE_PRIVATE_KEY and config.FIREBASE_CLIENT_EMAIL:
            # Fallback to env variables config
            cred = credentials.Certificate({
                "type": "service_account",
                "project_id": config.FIREBASE_PROJECT_ID,
                "private_key": config.FIREBASE_PRIVATE_KEY,
                "client_email": config.FIREBASE_CLIENT_EMAIL,
                "token_uri": "https://oauth2.googleapis.com/token"
            })
            firebase_admin.initialize_app(cred)
            db = firestore.client()
            print(">>> Firebase Admin SDK initialized successfully with environment variables.")
        else:
            print(">>> Firebase credentials not found. Firebase features will run in DEMO MODE.")
    except Exception as e:
        print(f">>> Failed to initialize Firebase: {e}. Falling back to DEMO MODE.")
        db = None
else:
    print(">>> Running in DEMO MODE. Skipping Firebase initialization.")

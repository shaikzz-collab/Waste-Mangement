import os
from flask import Flask, jsonify
from flask_cors import CORS
from backend.config import config
from backend.routes.waste import waste_bp
from backend.routes.centers import centers_bp
from backend.routes.dashboard import dashboard_bp

app = Flask(__name__)

# Configure CORS to allow frontend communication
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register API blueprints
app.register_blueprint(waste_bp, url_prefix="/api/waste")
app.register_blueprint(centers_bp, url_prefix="/api/centers")
app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

from backend.services.db_service import check_firebase_connection

@app.route("/")
@app.route("/health")
def health_check():
    """Simple server status endpoint."""
    firebase_ok = check_firebase_connection()
    return jsonify({
        "status": "online",
        "app": "WasteGuide AI Backend",
        "demo_mode": config.IS_DEMO_MODE or not firebase_ok,
        "firebase_connected": firebase_ok
    }), 200

# Error Handlers
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    # In development we run in debug mode
    debug_mode = os.getenv("FLASK_ENV", "development") == "development"
    print(f">>> Starting WasteGuide AI Backend on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=debug_mode)

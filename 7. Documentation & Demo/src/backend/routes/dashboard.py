from flask import Blueprint, request, jsonify
from backend.services import db_service

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/stats", methods=["GET"])
def get_stats():
    """
    Returns aggregated metrics and charts configuration data for the dashboard.
    """
    user_id = request.headers.get("X-User-Id", "demo-user")
    try:
        stats = db_service.get_dashboard_stats(user_id)
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

from flask import Blueprint, request, jsonify
from backend.services import db_service

centers_bp = Blueprint("centers", __name__)

@centers_bp.route("", methods=["GET"])
@centers_bp.route("/", methods=["GET"])
def get_centers():
    """
    Retrieves the list of collection centers, optionally filtered by waste category.
    """
    category = request.args.get("category", None)
    try:
        centers = db_service.get_collection_centers(category)
        return jsonify(centers), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

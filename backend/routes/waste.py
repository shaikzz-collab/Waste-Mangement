from flask import Blueprint, request, jsonify
from backend.services import groq_service, db_service

waste_bp = Blueprint("waste", __name__)

@waste_bp.route("/scan", methods=["POST"])
def scan_waste():
    """
    Scans a waste item. Can be a text query or a simulated image scan.
    """
    user_id = request.headers.get("X-User-Id", "demo-user")
    item_name = ""
    
    # Check if this is an image upload (simulating a camera scan)
    if "image" in request.files:
        image_file = request.files["image"]
        filename = image_file.filename.lower()
        
        # Analyze file name to guess item type for demo purposes
        if any(w in filename for w in ["bottle", "plastic", "cup"]):
            item_name = "plastic bottle"
        elif any(w in filename for w in ["can", "metal", "coke", "soda"]):
            item_name = "aluminum can"
        elif any(w in filename for w in ["box", "cardboard", "package"]):
            item_name = "cardboard box"
        elif any(w in filename for w in ["banana", "peel", "apple", "fruit", "food"]):
            item_name = "banana peel"
        elif any(w in filename for w in ["phone", "cell", "mobile"]):
            item_name = "old cellphone"
        elif any(w in filename for w in ["bulb", "led", "lamp"]):
            item_name = "led bulb"
        elif any(w in filename for w in ["battery", "cells"]):
            item_name = "alkaline battery"
        else:
            # Strip extension and use filename as a guess
            base_name = filename.split(".")[0]
            # Replace dashes/underscores with space
            item_name = base_name.replace("-", " ").replace("_", " ")
            if not item_name:
                item_name = "unknown item"
    else:
        # Otherwise get JSON text query
        data = request.json or {}
        item_name = data.get("itemName", "").strip()
        
    if not item_name:
        return jsonify({"error": "No item name or image provided"}), 400
        
    try:
        # Perform AI/mock analysis
        classification = groq_service.analyze_waste_item(item_name)
        # Store in user's history
        saved_record = db_service.save_scan_history(user_id, item_name, classification)
        return jsonify(saved_record), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@waste_bp.route("/history", methods=["GET"])
def get_history():
    """
    Gets scan history for the authenticated user.
    """
    user_id = request.headers.get("X-User-Id", "demo-user")
    try:
        history = db_service.get_scan_history(user_id)
        return jsonify(history), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

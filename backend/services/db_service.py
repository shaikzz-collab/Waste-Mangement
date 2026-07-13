import os
import json
import time
from datetime import datetime
from backend.config import config
from backend.config.firebase_config import db

# Path for file-based database fallback in Demo Mode
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
HISTORY_FILE = os.path.join(DATA_DIR, "history.json")

# Seed Collection Centers data
MOCK_CENTERS = [
    {
        "id": "center-1",
        "name": "Metro Plastics Recovery Hub",
        "category": "Plastic",
        "address": "1420 Harrison St, San Francisco, CA 94103",
        "phone": "(415) 555-0142",
        "accepted_items": ["Plastic Bottles", "Yogurt Tubs", "HDPE Drums", "LDPE Film"],
        "coordinates": [37.7725, -122.4110],
        "distance": "0.8 miles",
        "hours": "Mon-Sat: 8 AM - 5 PM"
    },
    {
        "id": "center-2",
        "name": "GreenEarth Electronics Recycling",
        "category": "E-Waste",
        "address": "850 Brannan St, San Francisco, CA 94103",
        "phone": "(415) 555-0199",
        "accepted_items": ["Laptops", "Cellphones", "LED Bulbs", "Monitors", "Keyboards"],
        "coordinates": [37.7712, -122.4035],
        "distance": "1.2 miles",
        "hours": "Mon-Fri: 9 AM - 6 PM"
    },
    {
        "id": "center-3",
        "name": "Bay Area Glass Redemption Bank",
        "category": "Glass",
        "address": "2200 Jerrold Ave, San Francisco, CA 94124",
        "phone": "(415) 555-0188",
        "accepted_items": ["Glass Bottles", "Food Jars", "Beverage Containers"],
        "coordinates": [37.7420, -122.3980],
        "distance": "3.5 miles",
        "hours": "Tue-Sun: 9 AM - 4 PM"
    },
    {
        "id": "center-4",
        "name": "Soma Paper & Cardboard Recycling",
        "address": "650 5th St, San Francisco, CA 94107",
        "phone": "(415) 555-0111",
        "category": "Paper",
        "accepted_items": ["Cardboard Boxes", "Newspapers", "Office Paper", "Magazines"],
        "coordinates": [37.7788, -122.3995],
        "distance": "1.5 miles",
        "hours": "Mon-Sat: 7 AM - 6 PM"
    },
    {
        "id": "center-5",
        "name": "Sunset Hazardous Material Station",
        "category": "Hazardous",
        "address": "2301 37th Ave, San Francisco, CA 94116",
        "phone": "(415) 555-0177",
        "accepted_items": ["Batteries", "Paints", "Chemical Solvents", "Motor Oil", "Fluorescent Tubes"],
        "coordinates": [37.7425, -122.4950],
        "distance": "5.2 miles",
        "hours": "Thursday & Saturday: 8 AM - 4 PM"
    },
    {
        "id": "center-6",
        "name": "Mission Organic Composting Depot",
        "category": "Organic",
        "address": "2901 24th St, San Francisco, CA 94110",
        "phone": "(415) 555-0123",
        "accepted_items": ["Food Scraps", "Vegetable Peels", "Coffee Grounds", "Yard Trimmings"],
        "coordinates": [37.7525, -122.4095],
        "distance": "2.1 miles",
        "hours": "Daily: 8 AM - 8 PM"
    },
    {
        "id": "center-7",
        "name": "Pacific Scrap Metal Yard",
        "category": "Metal",
        "address": "1500 Indiana St, San Francisco, CA 94107",
        "phone": "(415) 555-0155",
        "accepted_items": ["Aluminum Cans", "Steel Drums", "Copper Wiring", "Iron Pipes"],
        "coordinates": [37.7550, -122.3905],
        "distance": "2.8 miles",
        "hours": "Mon-Fri: 7 AM - 4 PM"
    }
]

# Ensure data directory exists
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

def read_local_history() -> list:
    """Reads history from a local JSON file."""
    if not os.path.exists(HISTORY_FILE):
        return []
    try:
        with open(HISTORY_FILE, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading local history file: {e}")
        return []

def write_local_history(history: list):
    """Writes history to a local JSON file."""
    try:
        with open(HISTORY_FILE, "w") as f:
            json.dump(history, f, indent=2)
    except Exception as e:
        print(f"Error writing local history file: {e}")

def save_scan_history(user_id: str, item_name: str, classification: dict) -> dict:
    """
    Saves a scanned item to database history.
    """
    history_item = {
        "item_name": item_name,
        "category": classification.get("category", "Other"),
        "emoji": classification.get("emoji", "🗑️"),
        "recyclable": classification.get("recyclable", False),
        "reusable": classification.get("reusable", False),
        "hazardous": classification.get("hazardous", False),
        "hazard_warning": classification.get("hazard_warning", ""),
        "disposal_instructions": classification.get("disposal_instructions", ""),
        "recycling_steps": classification.get("recycling_steps", []),
        "eco_suggestions": classification.get("eco_suggestions", []),
        "facility_types": classification.get("facility_types", []),
        "ai_source": classification.get("ai_source", "WasteGuide AI"),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
    
    if db is not None:
        try:
            # Save to Firestore under user-specific subcollection
            doc_ref = db.collection("users").document(user_id).collection("history").document()
            history_item["id"] = doc_ref.id
            doc_ref.set(history_item)
            return history_item
        except Exception as e:
            print(f"Firestore save error: {e}. Falling back to file storage.")
            
    # File storage fallback
    history = read_local_history()
    history_item["id"] = f"scan-{int(time.time() * 1000)}"
    history_item["user_id"] = user_id
    history.append(history_item)
    write_local_history(history)
    return history_item

def get_scan_history(user_id: str) -> list:
    """
    Retrieves all scan history for a user, sorted by newest first.
    """
    if db is not None:
        try:
            history_ref = db.collection("users").document(user_id).collection("history").order_by("timestamp", direction="DESCENDING")
            docs = history_ref.stream()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            print(f"Firestore read error: {e}. Falling back to file storage.")
            
    # File storage fallback
    history = read_local_history()
    # Filter by user_id
    user_history = [item for item in history if item.get("user_id") == user_id]
    # Sort by timestamp descending
    user_history.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
    return user_history

def get_collection_centers(category: str = None) -> list:
    """
    Retrieves recycling centers, optionally filtered by category.
    """
    # In both online and offline mode, we use MOCK_CENTERS as a default database
    # because real geographical data is usually mock or statically defined for demos.
    # However, if Firestore is available, we could check if there are documents in a 'centers' collection.
    if db is not None:
        try:
            centers_ref = db.collection("centers")
            docs = centers_ref.stream()
            db_centers = [doc.to_dict() for doc in docs]
            if db_centers:
                if category:
                    return [c for c in db_centers if c.get("category", "").lower() == category.lower()]
                return db_centers
        except Exception as e:
            print(f"Firestore centers read error: {e}. Using seed centers.")
            
    # Standard static/mock centers
    if category and category != "All":
        return [c for c in MOCK_CENTERS if c.get("category", "").lower() == category.lower()]
    return MOCK_CENTERS

def get_dashboard_stats(user_id: str) -> dict:
    """
    Aggregates metrics for the dashboard.
    """
    history = get_scan_history(user_id)
    
    total_scans = len(history)
    recycled_count = sum(1 for item in history if item.get("recyclable") == True)
    reusable_count = sum(1 for item in history if item.get("reusable") == True)
    hazardous_count = sum(1 for item in history if item.get("hazardous") == True)
    
    recycling_rate = 0.0
    if total_scans > 0:
        recycling_rate = round((recycled_count / total_scans) * 100, 1)
        
    # Breakdown by category
    category_counts = {}
    for item in history:
        cat = item.get("category", "Other")
        category_counts[cat] = category_counts.get(cat, 0) + 1
        
    # Standard categories structure for ChartJS
    categories = ["Plastic", "Metal", "Glass", "Paper", "Organic", "E-Waste", "Hazardous", "Other"]
    breakdown = {cat: category_counts.get(cat, 0) for cat in categories}
    
    # Simple mock timeline stats (monthly)
    # If the user has history items, we can bucket them by month, else supply nice default data
    timeline = []
    if total_scans > 0:
        # Group real logs
        months = {}
        for item in history:
            ts = item.get("timestamp", "")
            if ts:
                # Format: "YYYY-MM"
                month = ts[:7]
                months[month] = months.get(month, {"scanned": 0, "recycled": 0})
                months[month]["scanned"] += 1
                if item.get("recyclable"):
                    months[month]["recycled"] += 1
        # Convert to list and sort by month
        sorted_months = sorted(months.keys())
        for m in sorted_months:
            timeline.append({
                "month": m,
                "scanned": months[m]["scanned"],
                "recycled": months[m]["recycled"]
            })
    else:
        # Provide default template timeline if history is empty
        timeline = [
            {"month": "2026-02", "scanned": 12, "recycled": 8},
            {"month": "2026-03", "scanned": 18, "recycled": 14},
            {"month": "2026-04", "scanned": 15, "recycled": 11},
            {"month": "2026-05", "scanned": 22, "recycled": 18},
            {"month": "2026-06", "scanned": 30, "recycled": 24},
            {"month": "2026-07", "scanned": total_scans, "recycled": recycled_count} # current month
        ]
        
    return {
        "total_scans": total_scans,
        "recycled_count": recycled_count,
        "reusable_count": reusable_count,
        "hazardous_count": hazardous_count,
        "recycling_rate": recycling_rate,
        "category_breakdown": breakdown,
        "timeline": timeline
    }

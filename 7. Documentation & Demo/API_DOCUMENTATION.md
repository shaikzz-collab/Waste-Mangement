# API Documentation - WasteGuide AI Backend

This document details the HTTP endpoints exposed by the **WasteGuide AI** Flask server on `http://localhost:5000`.

---

## 1. Waste Scanner Endpoint

### `POST /api/waste/scan`
Classifies a waste item by name and saves the scan event to the database.

*   **Headers**:
    *   `Content-Type: application/json`
    *   `X-User-Id: <user_id_string>` (optional, defaults to `demo-user`)
*   **Request Body**:
    ```json
    {
      "item_name": "glass jar"
    }
    ```
*   **Response (200 OK)**:
    ```json
    {
      "id": "doc-uuid-string",
      "item_name": "glass jar",
      "category": "Glass",
      "emoji": "🫙",
      "recyclable": true,
      "reusable": true,
      "hazardous": false,
      "hazard_warning": "",
      "disposal_instructions": "Rinse clean. Remove metal caps...",
      "recycling_steps": ["Empty the jar...", "Remove metal lid...", "Place in glass bin..."],
      "eco_suggestions": ["Wash and reuse jar for storage...", "Use as candle holder..."],
      "facility_types": ["Curbside Recycling", "Glass Bottle Banks"],
      "ai_source": "Groq LLaMA-3-8B",
      "timestamp": "2026-07-14T08:16:11Z"
    }
    ```

---

## 2. Scan History Endpoint

### `GET /api/waste/history`
Retrieves previous scans logged by the requesting user.

*   **Headers**:
    *   `X-User-Id: <user_id_string>` (optional, defaults to `demo-user`)
*   **Response (200 OK)**:
    ```json
    [
      {
        "id": "doc-uuid-1",
        "item_name": "plastic bottle",
        "category": "Plastic",
        "emoji": "🥤",
        "recyclable": true,
        "reusable": true,
        "hazardous": false,
        "timestamp": "2026-07-14T08:12:00Z"
      }
    ]
    ```

---

## 3. Collection Centers Endpoint

### `GET /api/centers`
Retrieves coordinates and details of local recycling facilities.

*   **Query Parameters**:
    *   `category`: Filter facilities by category (e.g. `Plastic`, `E-Waste`, `Glass`).
*   **Response (200 OK)**:
    ```json
    [
      {
        "id": "center-2",
        "name": "GreenEarth Electronics Recycling",
        "category": "E-Waste",
        "address": "850 Brannan St, San Francisco, CA 94103",
        "phone": "(415) 555-0199",
        "accepted_items": ["Laptops", "Cellphones", "LED Bulbs"],
        "coordinates": [37.7712, -122.4035],
        "distance": "1.2 miles",
        "hours": "Mon-Fri: 9 AM - 6 PM"
      }
    ]
    ```

---

## 4. Dashboard Stats Endpoint

### `GET /api/dashboard/stats`
Aggregates scan counts and timeline milestones for visual charts.

*   **Headers**:
    *   `X-User-Id: <user_id_string>` (optional, defaults to `demo-user`)
*   **Response (200 OK)**:
    ```json
    {
      "total_scans": 24,
      "recycled_count": 18,
      "reusable_count": 5,
      "hazardous_count": 1,
      "recycling_rate": 75.0,
      "category_breakdown": {
        "Plastic": 10,
        "Metal": 5,
        "Glass": 4,
        "Paper": 3,
        "Organic": 1,
        "E-Waste": 1,
        "Hazardous": 0,
        "Other": 0
      },
      "timeline": [
        {"month": "2026-06", "scanned": 10, "recycled": 8},
        {"month": "2026-07", "scanned": 14, "recycled": 10}
      ]
    }
    ```

# Problem-Solution Fit

This document validates how the designed features of **WasteGuide AI** solve the specific pain points of modern waste management.

---

## 1. Problem-Solution Mapping Matrix

| Ecological Pain Point | Root Cause | WasteGuide AI Feature | How It Solves the Pain |
| :--- | :--- | :--- | :--- |
| **High recycling contamination** | Consumers toss food-soiled cardboard or dirty tins in curbside bins. | **Detailed Step-by-Step Instructions** | Instructs users to "rinse the inside clean" or "remove the foil lid" before throwing, reducing dirty imports. |
| **Toxic chemicals in landfills** | Citizens dump electronic parts or batteries into standard trash. | **Interactive Locator Map & Category Filters** | Maps specialized e-waste and battery collection stations, directing users to legal facilities. |
| **Recycling facility shutdowns** | Consumers throw plastic grocery bags into curbside bins, jamming sorting machines. | **Wishcycling Warning Alerts** | Instantly displays warnings for soft films/bags, detailing supermarket bin drop-offs instead of curbside. |
| **Lack of public interest** | Residents find recycling boring or don't see the impact of their efforts. | **Visual Metrics Dashboard** | Shows a user their running counts, recycling rate, and positive metrics, encouraging gamification. |

---

## 2. Feature Priority Hierarchy

We prioritized features into three categories to ensure project focus during design:

```
+-------------------------------------------------------------+
| 1. CORE FEATURES (Must Have)                                |
| - LLaMA 3.1 scan/search categorizer                         |
| - Actionable step lists and eco tips                        |
| - Local database fallback caching                           |
+-------------------------------------------------------------+
                            |
                            v
+-------------------------------------------------------------+
| 2. ENHANCEMENT FEATURES (Should Have)                       |
| - Leaflet interactive map with pins                         |
| - Filterable material registry                              |
| - Individual user history logs                              |
+-------------------------------------------------------------+
                            |
                            v
+-------------------------------------------------------------+
| 3. ANALYTICAL FEATURES (Nice to Have)                       |
| - Dashboard charts with monthly metrics                     |
| - Category breakdown pie charts                             |
+-------------------------------------------------------------+
```

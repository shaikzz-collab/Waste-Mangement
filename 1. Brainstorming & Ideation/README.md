# Milestone 1: Brainstorming & Ideation Phase

This folder contains the original capstone planning assets and this summary documentation outlining the initial brainstorming, customer problem statements, and empathy mapping for **WasteGuide AI**.

---

## 💡 1. Brainstorming & Idea Prioritization

During our team's initial gathering (Team ID: `shaikzz-collab`), we brainstormed several ideas and grouped them into core modules. We then prioritized the ideas based on feasibility and importance to select the final scope.

### Step 1: Idea Listing & Clustering

| S.No | Team Member | Proposed Idea / Suggestion | Category | Group No |
| :---: | :--- | :--- | :--- | :---: |
| **1** | Mahammad Hujefa | Real-time AI camera scanner to classify waste. | AI Classification | Group 1 |
| **2** | Shaik Sameer | Interactive Leaflet map showing local recycling centers. | Recycling Map | Group 2 |
| **3** | Seerla Aishwarya | Secure Firestore database for user records & statistics. | Data & Firestore | Group 3 |
| **4** | Mahammad Hujefa | Offline JSON cache database fallback when REST fails. | Offline DB Resiliency | Group 1 |
| **5** | Shaik Sameer | Responsive dashboard charts for classification metrics. | Vite Analytics UI | Group 2 |
| **6** | Seerla Aishwarya | Weekly summary stats for recycling progress tracker. | REST API | Group 3 |

### Step 2: Idea Prioritization Matrix

We rated each grouped idea on feasibility and importance to establish development priority:

| Group No | Final Idea Cluster | Feasibility (H/M/L) | Importance (H/M/L) | Priority | Selected (Yes/No) |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **Group 1** | **Real-Time Classification Scan** (AI Scanner & Fallback) | High | High | **High** | **Yes** |
| **Group 2** | **Recyclers Map & Stats Dashboard** (Leaflet Map & Charts) | High | High | **High** | **Yes** |
| **Group 3** | **Offline DB Resiliency Cache** (Local DB & REST Sync) | Medium | Medium | **Medium** | **Yes** |

---

## 🎯 2. Customer Problem Statements

To focus on what matters most to our target users, we mapped out a customer-centric problem statement based on the Miro template layout:

| Problem Statement (PS) | I am (Customer)... | I am trying to... | But (Obstacle)... | Because (Root Cause)... | Which makes me feel... |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **PS-1** | An eco-conscious urban resident. | Correctly sort household trash (e.g. food packages, plastic films, batteries) into curbside bins. | I am confused by complex municipal rules and tiny, non-standard material markings. | Guidelines vary by city, food grease contaminates cardboard, and some items look recyclable but are not accepted curbside. | Frustrated, confused, and guilty that my sorting errors might ruin a whole batch of clean recycling. |

---

## 👥 3. Empathy Map Canvas

We constructed an Empathy Map to understand our target customer from multiple perspectives, helping us design a more user-centric, helpful solution.

```
+-----------------------------------------------------------------------------------+
|                                     PERSONA                                       |
|                  Name: Alex (Eco-Conscious Urban Resident / Tenant)                |
|               Goal: Minimize personal landfill footprint without hassle           |
+------------------------------------+----------------------------------------------+
|                SAYS                |                   THINKS                     |
| - "I want to do my part."          | - "I hope my sorted waste actually gets      |
| - "Is this cup recyclable?"        |   recycled and doesn't go to a landfill."    |
| - "Where do I take battery packs?" | - "Recycling shouldn't be this confusing."   |
| - "Should I rinse this out?"       | - "Am I wishcycling right now?"              |
+------------------------------------+----------------------------------------------+
|                DOES                |                    HEARS                     |
| - Rinses jars and flattens boxes.  | - News about microplastics and landfills.    |
| - Looks on the bottom for codes.   | - Friends saying "it all gets dumped         |
| - Throws items away when in doubt. |   in the same landfill anyway."              |
| - Searches online for local rules. | - City warnings on contamination fines.      |
+------------------------------------+----------------------------------------------+
|               PAINS                |                    GAINS                     |
| - Guilt from sorting mistakes.     | - Peace of mind from proper classification.  |
| - Annoyance at washing grease.     | - Pride in taking clean climate actions.     |
| - Wasting time searching for rules. | - Confidence when instructions are clear.    |
+------------------------------------+----------------------------------------------+
```

### Empathy Map Details

#### 👂 What do they HEAR?
*   Environmental reports discussing recycling failures and microplastic pollution.
*   Skeptical friends claiming sorting is pointless because municipal waste trucks mix bins.
*   Municipal notifications detailing new penalties or bans on battery disposals.

#### 👀 What do they SEE?
*   Overflowing communal recycling bins contaminated with food trash.
*   Confusing symbols (the mobius loop with tiny numbers) printed on food containers.
*   Different rules at home, at work, and when traveling to nearby cities.

#### 💬 What do they SAY & DO?
*   **Say**: *"I try to recycle everything I can," "Is this cardboard too greasy to recycle?"*
*   **Do**: Rinse out peanut butter jars occasionally, collapse delivery boxes, and store batteries in a drawer because they don't know where to bring them.

#### 🧠 What do they THINK & FEEL?
*   **Think**: *"I wish there was an instant scanner at my trash can," "Why is it so hard to be green?"*
*   **Feel**: Eco-anxiety about climate change, frustration at the lack of clear guides, and satisfaction when sorting is validated.

import os
import json
import requests
from backend.config import config

# High-fidelity mock database for the 12 standard items
MOCK_WASTE_DATA = {
    "plastic bottle": {
        "category": "Plastic",
        "emoji": "🥤",
        "recyclable": True,
        "reusable": True,
        "hazardous": False,
        "hazard_warning": "",
        "disposal_instructions": "Empty and rinse the bottle. Flatten it to save space in the recycle bin. Cap can usually be left on if clean, or recycled separately depending on municipal guidelines.",
        "recycling_steps": [
            "Empty any remaining liquid contents.",
            "Rinse the inside with clean water.",
            "Crush/flatten the bottle to conserve container space.",
            "Place it in your local curbside recycling bin (typically labeled Plastic #1/PETE)."
        ],
        "eco_suggestions": [
            "Switch to a reusable stainless steel or glass water bottle to avoid single-use plastics.",
            "Clean and upcycle the bottle as a planter, bird feeder, or organizing tool."
        ],
        "facility_types": ["Curbside Recycling", "Municipal Recycling Center", "Material Recovery Facility (MRF)"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "aluminum can": {
        "category": "Metal",
        "emoji": "🥫",
        "recyclable": True,
        "reusable": False,
        "hazardous": False,
        "hazard_warning": "",
        "disposal_instructions": "Rinse out any residual liquids. Do not crush completely if using single-stream automated sorting systems (they recognize 3D shapes better), but crush to save space if required by your collector.",
        "recycling_steps": [
            "Pour out all liquid residue.",
            "Rinse briefly to prevent odor and pests.",
            "Toss directly into the metals recycling bin."
        ],
        "eco_suggestions": [
            "Choose beverages in cans over plastic bottles as aluminum is infinitely recyclable.",
            "Collect pull tabs separately for specialized charity donations."
        ],
        "facility_types": ["Curbside Recycling", "Scrap Metal Yard", "Buy-Back Centers"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "cardboard box": {
        "category": "Paper",
        "emoji": "📦",
        "recyclable": True,
        "reusable": True,
        "hazardous": False,
        "hazard_warning": "",
        "disposal_instructions": "Flatten all boxes to save space in bins and collection trucks. Remove heavy plastic packing tape, bubble wrap, and shipping labels if possible.",
        "recycling_steps": [
            "Open both ends of the box and remove all shipping materials (packing peanuts, tape).",
            "Flatten the box completely.",
            "Keep the cardboard dry (wet cardboard can clog sorting machines and lower pulp quality).",
            "Place in the paper/cardboard recycling cart."
        ],
        "eco_suggestions": [
            "Reuse sturdy boxes for storage, shipping, or moving.",
            "Shred non-glossy cardboard to use as carbon-rich compost material or garden mulch."
        ],
        "facility_types": ["Curbside Recycling", "Drop-Off Depots", "Composting Facility (if shredded/soiled)"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "glass jar": {
        "category": "Glass",
        "emoji": "🫙",
        "recyclable": True,
        "reusable": True,
        "hazardous": False,
        "hazard_warning": "",
        "disposal_instructions": "Rinse clean. Remove metal caps/lids and recycle them in the metal bin. Paper labels are usually burned off during processing, so they can stay on.",
        "recycling_steps": [
            "Empty the jar and rinse out any residual food items.",
            "Remove the metal lid (recycle it separately with metals).",
            "Place the clean glass jar in the designated glass recycling container."
        ],
        "eco_suggestions": [
            "Wash and sterilize the jar to store leftovers, dry grains, spices, or homemade preserves.",
            "Use as a candle holder, drinking glass, or pen cup."
        ],
        "facility_types": ["Curbside Recycling", "Municipal Glass Drop-Off Box", "Glass Bottle Banks"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "banana peel": {
        "category": "Organic",
        "emoji": "🍌",
        "recyclable": False,
        "reusable": True,
        "hazardous": False,
        "hazard_warning": "",
        "disposal_instructions": "Do not throw in the trash where it will produce methane in a landfill. Place in your organic waste/green bin for municipal composting, or add to your home compost pile.",
        "recycling_steps": [
            "Remove any PLU sticker labels (these are plastic and do not decompose).",
            "Place in a kitchen compost collector or directly into the green organics bin.",
            "Alternatively, bury it in your garden soil to release potassium and nutrients."
        ],
        "eco_suggestions": [
            "Use organic waste in backyard composting to create nutrient-rich soil for your plants.",
            "Boil the peel in water to make a nutrient-rich 'banana peel tea' fertilizer for houseplants."
        ],
        "facility_types": ["Municipal Green Bin", "Home Compost Pile", "Community Garden Compost"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "led bulb": {
        "category": "E-Waste",
        "emoji": "💡",
        "recyclable": True,
        "reusable": False,
        "hazardous": True,
        "hazard_warning": "Contains micro-components, heavy metals, and electronic circuitry. Do not place in standard trash or curbside recycling.",
        "disposal_instructions": "LED bulbs contain electronic circuitry and should be disposed of at specialized e-waste collection sites or retail drop-offs rather than the standard trash or glass recycle bins.",
        "recycling_steps": [
            "Carefully remove the bulb from the socket, ensuring it does not break.",
            "Wrap it in newspaper or bubble wrap to prevent breaking during transport.",
            "Take it to a local hardware store (like Home Depot/Lowe's) or local electronic waste recycling event."
        ],
        "eco_suggestions": [
            "LEDs are highly efficient and last up to 25,000 hours. Ensure you run bulbs until their end of life before replacement."
        ],
        "facility_types": ["E-Waste Collection Site", "Hardware Store Drop-off", "Household Hazardous Waste (HHW) Facility"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "alkaline battery": {
        "category": "Hazardous",
        "emoji": "🔋",
        "recyclable": True,
        "reusable": False,
        "hazardous": True,
        "hazard_warning": "Batteries can leak toxic chemicals (potassium hydroxide) and pose fire hazards. Never dispose of batteries in general household waste.",
        "disposal_instructions": "Although modern alkaline batteries contain fewer heavy metals, they should still be recycled at designated battery recycling stations or retail drop-off sites to prevent soil contamination and chemical leaks.",
        "recycling_steps": [
            "Tape the positive (+) and negative (-) terminals with clear packing tape to prevent electrical short-circuits and fire risks.",
            "Store in a dry, non-conductive plastic bucket.",
            "Bring to a local battery drop-off kiosk (often found in libraries, schools, or grocery stores) or a HHW facility."
        ],
        "eco_suggestions": [
            "Switch to rechargeable NiMH batteries to reduce battery waste significantly over time."
        ],
        "facility_types": ["Battery Recycling Kiosks", "Electronics Retailer Drop-off", "Household Hazardous Waste (HHW) Facility"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "old cellphone": {
        "category": "E-Waste",
        "emoji": "📱",
        "recyclable": True,
        "reusable": True,
        "hazardous": True,
        "hazard_warning": "Contains heavy metals (lead, cadmium, mercury) and lithium-ion batteries which are highly flammable and toxic if punctured.",
        "disposal_instructions": "Cellphones contain valuable metals (gold, copper, silver) and hazardous batteries. They must be taken to specialized electronic waste recyclers or retail take-back programs. Always erase personal data first.",
        "recycling_steps": [
            "Perform a factory reset to wipe all personal data.",
            "Remove SIM card and memory cards.",
            "Leave the lithium battery inside, but handle with care (do not puncture or charge a swollen battery).",
            "Drop off at a certified e-waste bin, carrier store, or electronic retail outlet."
        ],
        "eco_suggestions": [
            "Sell or donate working cellphones to charities, second-hand markets, or trade-in programs.",
            "Repurpose as a dedicated media player, home security camera, or offline GPS map."
        ],
        "facility_types": ["E-Waste Collection Facility", "Certified E-Steward Recycling Center", "Carrier/Retail Take-Back Kiosk"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "coffee cup": {
        "category": "Paper",
        "emoji": "☕",
        "recyclable": False,
        "reusable": False,
        "hazardous": False,
        "hazard_warning": "",
        "disposal_instructions": "Most paper coffee cups are lined with a plastic membrane (polyethylene) to prevent leaking, making them non-recyclable in standard paper bins. The plastic lid and cardboard sleeve are recyclable separately.",
        "recycling_steps": [
            "Separate the components: plastic lid, cardboard sleeve, and paper cup.",
            "Recycle the cardboard sleeve in the paper bin.",
            "Check the plastic lid: if it has recycling numbers 1, 2, or 5, recycle it. Otherwise, trash it.",
            "Dispose of the paper cup in the landfill trash bin (unless your city explicitly accepts poly-coated paper cups)."
        ],
        "eco_suggestions": [
            "Bring a reusable thermal mug or travel cup to cafes. Many offer discounts for doing so.",
            "Opt for dine-in and request a ceramic mug instead of a takeaway cup."
        ],
        "facility_types": ["Landfill Trash (Cup)", "Curbside Recycling (Sleeve, Lid)"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "plastic bag": {
        "category": "Plastic",
        "emoji": "🛍️",
        "recyclable": True,
        "reusable": True,
        "hazardous": False,
        "hazard_warning": "",
        "disposal_instructions": "Do not put plastic bags in your curbside recycling bin! They clog automated sorting machinery. Recycle them at grocery store drop-off kiosks where they are collected separately.",
        "recycling_steps": [
            "Ensure the bag is empty, clean, and completely dry.",
            "Collect multiple plastic bags and stuff them into one single bag.",
            "Take the bundled bags to a local supermarket or retail store storefront collection box (usually marked 'Plastic Bag Recycling')."
        ],
        "eco_suggestions": [
            "Switch to durable canvas or fabric tote bags for all shopping trips.",
            "Reuse clean plastic bags as garbage bin liners or pet waste bags."
        ],
        "facility_types": ["Grocery Store Drop-off Box", "Specialized Plastic Film Recycling Center"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "yogurt container": {
        "category": "Plastic",
        "emoji": "🥣",
        "recyclable": True,
        "reusable": True,
        "hazardous": False,
        "hazard_warning": "",
        "disposal_instructions": "Clean container thoroughly. Most yogurt containers are made of Plastic #5 (Polypropylene), which is accepted in many municipal curbside recycling bins. Peel off and throw away any foil lid.",
        "recycling_steps": [
            "Peel off and discard the aluminum foil lid (thin, food-soiled foil is rarely recycled).",
            "Rinse the plastic container to remove all food residues.",
            "Check the number on the bottom of the container. If it is #5 (PP) or #2 (HDPE), toss it in the curbside recycling bin."
        ],
        "eco_suggestions": [
            "Reuse yogurt containers for food storage, mixing paint, holding craft supplies, or growing seed starts.",
            "Consider buying yogurt in larger tubs rather than individual single-serve cups to reduce plastic volume."
        ],
        "facility_types": ["Curbside Recycling", "Municipal Drop-off Center"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    },
    "styrofoam cup": {
        "category": "Plastic",
        "emoji": "🥤",
        "recyclable": False,
        "reusable": False,
        "hazardous": False,
        "hazard_warning": "",
        "disposal_instructions": "Styrofoam (Expanded Polystyrene #6) is highly fragile, lightweight, and degrades into microplastics easily. It is rarely accepted in curbside recycling and must be disposed of in the landfill trash.",
        "recycling_steps": [
            "Empty all liquids and straw/lid.",
            "Place the Styrofoam cup in the general landfill trash container."
        ],
        "eco_suggestions": [
            "Avoid Styrofoam cup use entirely. Ask for paper cups or carry a reusable mug.",
            "Encourage local businesses to switch to compostable or paper takeaway food containers."
        ],
        "facility_types": ["Landfill Trash", "Specialty EPS Drop-off Facilities (rare)"],
        "ai_source": "WasteGuide AI (Simulated LLaMA 3)"
    }
}

def analyze_waste_item(item_name: str) -> dict:
    """
    Analyzes a waste item name.
    If API keys are set, queries Groq. Otherwise, falls back to high-fidelity mock data.
    """
    item_normalized = item_name.strip().lower()
    
    # 1. Check if we are running in demo mode or API key is missing
    if config.IS_DEMO_MODE or not config.GROQ_API_KEY:
        # Check direct mock database match
        if item_normalized in MOCK_WASTE_DATA:
            return MOCK_WASTE_DATA[item_normalized]
            
        # Partial match scanner
        for key, mock_data in MOCK_WASTE_DATA.items():
            if key in item_normalized or item_normalized in key:
                # Retain the mock data but label it with the custom searched item
                mock_copy = mock_data.copy()
                mock_copy["ai_source"] = f"WasteGuide AI Mock ({mock_copy['category']})"
                return mock_copy
                
        # Simple dynamic mock generator based on keywords
        return generate_dynamic_mock(item_name)
        
    # 2. API config exists, perform live call to Groq
    try:
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {config.GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        
        system_prompt = (
            "You are an expert environmental waste classification system. "
            "You must return details about the requested waste item. "
            "Your output must be a single, raw, valid JSON object with NO markdown formatting, NO code blocks, and NO surrounding text. "
            "The JSON structure must match this template exactly:\n"
            "{\n"
            '  "category": "Plastic" | "Metal" | "Glass" | "Paper" | "Organic" | "E-Waste" | "Hazardous" | "Other",\n'
            '  "emoji": "Emoji representing the item",\n'
            '  "recyclable": true | false,\n'
            '  "reusable": true | false,\n'
            '  "hazardous": true | false,\n'
            '  "hazard_warning": "Warning text if hazardous=true, else empty string",\n'
            '  "disposal_instructions": "General text explaining how to discard this item properly.",\n'
            '  "recycling_steps": ["Step 1...", "Step 2...", "Step 3..."],\n'
            '  "eco_suggestions": ["Suggestion 1...", "Suggestion 2..."],\n'
            '  "facility_types": ["Facility 1...", "Facility 2..."],\n'
            '  "ai_source": "Groq LLaMA-3-8B"\n'
            "}"
        )
        
        payload = {
            "model": "llama3-8b-8192",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Classify the item: {item_name}"}
            ],
            "response_format": {"type": "json_object"},
            "temperature": 0.1
        }
        
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        
        if response.status_code == 200:
            result_json = response.json()
            content_str = result_json["choices"][0]["message"]["content"]
            parsed_data = json.loads(content_str)
            # Ensure AI source badge is correctly set
            parsed_data["ai_source"] = "Groq LLaMA-3-8B"
            return parsed_data
        else:
            print(f">>> Groq API returned status {response.status_code}. Details: {response.text}")
            return generate_dynamic_mock(item_name)
            
    except Exception as e:
        print(f">>> Groq service error: {e}. Falling back to dynamic mock.")
        return generate_dynamic_mock(item_name)

def generate_dynamic_mock(item_name: str) -> dict:
    """
    Generates a fallback mock classification based on item name keywords.
    """
    item_normalized = item_name.strip().lower()
    
    # Defaults
    category = "Other"
    emoji = "🗑️"
    recyclable = False
    reusable = False
    hazardous = False
    warning = ""
    disposal = "Place in general waste trash receptacle."
    steps = ["Inspect the item.", "Place inside the standard household garbage bin."]
    suggestions = ["Consider buying items with minimal packaging in the future."]
    facilities = ["Municipal Landfill Facility"]
    
    # Keyword routing
    if any(k in item_normalized for k in ["plastic", "nylon", "vinyl", "polyester", "pvc", "pet", "toy"]):
        category = "Plastic"
        emoji = "🧴"
        recyclable = True
        reusable = True
        disposal = "Rinse clean and drop in standard plastics recycling."
        steps = ["Wash out residual materials.", "Check the plastic recycling triangle number.", "Place in plastics container."]
        suggestions = ["Try looking for bulk unpackaged items.", "Switch to glass or metal containers."]
        facilities = ["Curbside Recycling", "Municipal Recycle Depot"]
    elif any(k in item_normalized for k in ["can", "metal", "steel", "iron", "copper", "aluminum", "wire", "foil"]):
        category = "Metal"
        emoji = "⚙️"
        recyclable = True
        disposal = "Rinse and place in metal recycling bin. Keep separated from standard garbage."
        steps = ["Remove paper labels if easy.", "Rinse food residues.", "Place in metals recycle cart."]
        suggestions = ["Metal is highly recyclable and retains value. Try to recycle all metals."]
        facilities = ["Curbside Recycling", "Scrap Metal Collector"]
    elif any(k in item_normalized for k in ["glass", "bottle", "jar", "mirror", "window"]):
        category = "Glass"
        emoji = "🫙"
        recyclable = True
        reusable = True
        disposal = "Rinse thoroughly and place in glass container. Do not break."
        steps = ["Remove any corks or plastic closures.", "Rinse inside clean.", "Place in glass recycling."]
        suggestions = ["Glass is 100% recyclable infinitely. Consider reusing for kitchen storage."]
        facilities = ["Bottle Bank", "Glass Drop-off Center"]
    elif any(k in item_normalized for k in ["paper", "cardboard", "box", "newspaper", "book", "magazine", "envelope"]):
        category = "Paper"
        emoji = "📄"
        recyclable = True
        reusable = True
        disposal = "Ensure cardboard is clean and dry. Flatten all packages."
        steps = ["Flatten boxes completely.", "Keep dry to avoid rot/pulp damage.", "Drop in blue recycle bins."]
        suggestions = ["Opt for electronic billing or statements.", "Reuse boxes for shipping."]
        facilities = ["Curbside Paper Recycling", "Cardboard Drop-off Station"]
    elif any(k in item_normalized for k in ["food", "banana", "apple", "bread", "vegetable", "fruit", "leaf", "plant", "egg", "meat", "coffee grounds"]):
        category = "Organic"
        emoji = "🍎"
        recyclable = False
        reusable = True
        disposal = "Place in kitchen waste collector or compost bin. Avoid trash bin."
        steps = ["Collect food scraps in a container.", "Deposit in compost bin or municipal organic cart."]
        suggestions = ["Start a home vermicomposting bin for kitchen scraps.", "Plan meals to decrease leftovers."]
        facilities = ["Municipal Green Bin", "Home Backyard Compost Pile"]
    elif any(k in item_normalized for k in ["phone", "laptop", "battery", "led", "computer", "tv", "charger", "cable", "electronics", "keyboard", "mouse"]):
        category = "E-Waste"
        emoji = "💻"
        recyclable = True
        hazardous = True
        warning = "Contains heavy metal materials and components that can harm groundwater if landfilled."
        disposal = "Take to a certified electronics recycle event or drop-off."
        steps = ["Back up and erase personal details.", "Remove batteries if detachable.", "Drop off at a certified e-waste bin."]
        suggestions = ["Donate working laptops/devices to schools or charities.", "Opt for repair over replacement."]
        facilities = ["E-Waste Recycle Center", "Electronics Store Collection Bin"]
    elif any(k in item_normalized for k in ["paint", "chemical", "oil", "poison", "acid", "cleaning", "fluorescent", "medicine", "pill"]):
        category = "Hazardous"
        emoji = "⚠️"
        recyclable = False
        hazardous = True
        warning = "Toxic chemical. Do not pour down the drain or place in standard garbage."
        disposal = "Bring to a municipal hazardous waste collection facility."
        steps = ["Keep in original container with labels intact.", "Store securely in a box.", "Transport carefully to local HHW event."]
        suggestions = ["Look for non-toxic eco-friendly cleaners.", "Purchase only the amount of product needed."]
        facilities = ["Household Hazardous Waste (HHW) Facility", "Special collection drive"]
        
    return {
        "category": category,
        "emoji": emoji,
        "recyclable": recyclable,
        "reusable": reusable,
        "hazardous": hazardous,
        "hazard_warning": warning,
        "disposal_instructions": disposal,
        "recycling_steps": steps,
        "eco_suggestions": suggestions,
        "facility_types": facilities,
        "ai_source": f"WasteGuide AI Mock ({category})"
    }

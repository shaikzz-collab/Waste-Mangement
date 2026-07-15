# AI Prompt Logs

This document logs the structured prompt parameters and templates engineered to query **LLaMA 3.1** via the Groq API.

---

## 1. System Prompt Template

To guarantee structured, parseable JSON output from the LLM, the backend uses this strict system prompt:

```
You are an expert environmental waste classification system.
You must return details about the requested waste item.
Your output must be a single, raw, valid JSON object with NO markdown formatting, NO code blocks, and NO surrounding text.
The JSON structure must match this template exactly:
{
  "category": "Plastic" | "Metal" | "Glass" | "Paper" | "Organic" | "E-Waste" | "Hazardous" | "Other",
  "emoji": "Emoji representing the item",
  "recyclable": true | false,
  "reusable": true | false,
  "hazardous": true | false,
  "hazard_warning": "Warning text if hazardous=true, else empty string",
  "disposal_instructions": "General text explaining how to discard this item properly.",
  "recycling_steps": ["Step 1...", "Step 2...", "Step 3..."],
  "eco_suggestions": ["Suggestion 1...", "Suggestion 2..."],
  "facility_types": ["Facility 1...", "Facility 2..."],
  "ai_source": "Groq LLaMA-3-8B"
}
```

---

## 2. Example Prompt Exchange

### User Input
`Classify the item: coffee cup`

### Model Output (Raw JSON)
```json
{
  "category": "Paper",
  "emoji": "☕",
  "recyclable": false,
  "reusable": false,
  "hazardous": false,
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
  "facility_types": [
    "Landfill Trash (Cup)",
    "Curbside Recycling (Sleeve, Lid)"
  ],
  "ai_source": "Groq LLaMA-3-8B"
}
```
---

## 3. Engineering Decisions Made

1. **JSON Enforcements**: We explicitly set the `response_format` to `{"type": "json_object"}` in the API payload to prevent the model from wrapping the response in markdown code blocks (e.g. ` ```json `), which would fail standard JSON decoding in Python.
2. **Lower Temperature**: The API call temperature is set to `0.1` to ensure deterministic, factual output rather than creative formatting.

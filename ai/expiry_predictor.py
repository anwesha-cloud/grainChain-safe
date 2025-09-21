print(">>> Loaded NEW expiry_predictor.py with adjust_expiry <<<")

from datetime import timedelta
from dateutil import parser
import pytz

# Rule-based expiry table (hours)
expiry_rules = {
    # Staples
    "rice": 6, "fried rice": 4, "pulao": 5, "biryani": 5,
    "bread": 2, "roti": 3, "chapati": 3, "paratha": 4, "poha": 3, "upma": 3,

    # Curries & dals
    "dal": 6, "curry": 5, "chicken curry": 5, "paneer curry": 5,
    "rajma": 6, "chole": 6, "sambar": 5, "kadhi": 5,

    # Snacks
    "samosa": 3, "pakora": 3, "vada": 3, "idli": 4, "dosa": 4, "uttapam": 4,

    # Sweets
    "gulab jamun": 12, "jalebi": 8, "halwa": 12, "laddu": 24, "barfi": 24,

    # Others
    "salad": 2, "fruits": 12, "vegetables": 12, "curd": 24, "milk": 6
}

# Synonyms for better matching
synonyms = {
    "chapathi": "chapati", "naan": "roti", "phulka": "roti", "stuffed paratha": "paratha",
    "jeera rice": "rice", "veg biryani": "biryani", "chicken biryani": "biryani",
    "lentils": "dal", "daal": "dal", "vegetable curry": "curry", "sabzi curry": "curry",
    "bhaji": "pakora", "vada pav": "vada", "idly": "idli",
    "jamun": "gulab jamun", "laddoo": "laddu", "boondi laddu": "laddu", "soan papdi": "barfi",
    "buttermilk": "curd", "lassi": "curd"
}

IST = pytz.timezone("Asia/Kolkata")


def normalize_food(food_type: str) -> str:
    if not food_type:
        return ""
    return synonyms.get(food_type.strip().lower(), food_type.strip().lower())


def adjust_expiry(expiry_hours: int, storage: str = "room", temperature: int = None) -> int:
    """Adjust expiry hours based on storage condition and temperature."""
    adjusted = expiry_hours

    # Storage condition adjustment
    if storage:
        storage = storage.lower()
        if storage == "fridge":
            adjusted *= 2
        elif storage == "hotbox":
            adjusted = int(adjusted * 0.7)
        # "room" or others = no change

    # Temperature adjustment
    if temperature is not None:
        if temperature < 20:
            adjusted += 1  # colder = lasts longer
        elif temperature > 30:
            adjusted = max(1, adjusted - 1)  # hotter = spoils faster

    return adjusted


def predict_safe_till(food_type: str, upload_time: str, storage: str = "room", temperature: int = None):
    # Parse upload time
    dt = parser.parse(upload_time)
    if dt.tzinfo is None:  # assume IST if no tz
        dt = IST.localize(dt)

    # Lookup expiry hours
    food_key = normalize_food(food_type)
    base_expiry = expiry_rules.get(food_key, 2)  # fallback 2h if unknown

    # Adjust expiry
    adjusted_expiry = adjust_expiry(base_expiry, storage, temperature)

    # Calculate safe till
    safe_till = dt + timedelta(hours=adjusted_expiry)
    return {
        "food_type": food_type,
        "base_expiry": base_expiry,
        "adjusted_expiry": adjusted_expiry,
        "storage": storage,
        "temperature": temperature,
        "safe_till_iso": safe_till.isoformat(),
        "safe_till_readable": safe_till.astimezone(IST).strftime("%Y-%m-%d %H:%M %Z")
    }

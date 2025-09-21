# expiry_predictor.py
from datetime import timedelta
from dateutil import parser
import pytz
import os
import joblib
import numpy as np

# ---------- Rule table ----------
expiry_rules = {
    "rice": 6, "fried rice": 4, "pulao": 5, "biryani": 5,
    "bread": 2, "roti": 3, "chapati": 3, "paratha": 4, "poha": 3, "upma": 3,
    "dal": 6, "curry": 5, "chicken curry": 5, "paneer curry": 5,
    "rajma": 6, "chole": 6, "sambar": 5, "kadhi": 5,
    "samosa": 3, "pakora": 3, "vada": 3, "idli": 4, "dosa": 4, "uttapam": 4,
    "gulab jamun": 12, "jalebi": 8, "halwa": 12, "laddu": 24, "barfi": 24,
    "salad": 2, "fruits": 12, "vegetables": 12, "curd": 24, "milk": 6
}

synonyms = {
    "chapathi":"chapati", "naan":"roti", "phulka":"roti", "stuffed paratha":"paratha",
    "jeera rice":"rice", "veg biryani":"biryani", "chicken biryani":"biryani",
    "lentils":"dal", "daal":"dal", "vegetable curry":"curry", "sabzi curry":"curry",
    "bhaji":"pakora", "vada pav":"vada", "idly":"idli",
    "jamun":"gulab jamun", "laddoo":"laddu", "boondi laddu":"laddu", "soan papdi":"barfi",
    "buttermilk":"curd", "lassi":"curd"
}

IST = pytz.timezone("Asia/Kolkata")

def normalize_food(food_type: str) -> str:
    if not food_type:
        return ""
    return synonyms.get(food_type.strip().lower(), food_type.strip().lower())

def adjust_expiry(expiry_hours: int, storage: str = "room", temperature: int = None) -> int:
    adjusted = expiry_hours
    if storage:
        storage = storage.lower()
        if storage == "fridge":
            adjusted = int(adjusted * 2)
        elif storage == "hotbox":
            adjusted = max(1, int(adjusted * 0.7))
    if temperature is not None:
        try:
            t = float(temperature)
            if t < 20:
                adjusted += 1
            elif t > 30:
                adjusted = max(1, adjusted - 1)
        except:
            pass
    return adjusted

# ---------- Optional ML model loader ----------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")

def load_model():
    if os.path.exists(MODEL_PATH):
        try:
            model = joblib.load(MODEL_PATH)
            print(">>> Loaded ML model:", MODEL_PATH)
            return model
        except Exception as e:
            print(">>> Failed to load model:", e)
            return None
    return None

ML_MODEL = load_model()

# helper to featurize simple inputs if ML is used
def featurize(food_type, storage, temperature):
    # Basic manual encoding: map some foods to indices or use hashed features.
    # Keep simple: hours from rules as a numeric feature + storage code + temp.
    base = expiry_rules.get(normalize_food(food_type), 2)
    storage_code = {"room":0, "fridge":1, "hotbox":2}.get((storage or "room").lower(), 0)
    temp = temperature if temperature is not None else 25.0
    return np.array([base, storage_code, float(temp)]).reshape(1, -1)

def predict_with_ml(food_type, storage, temperature):
    if ML_MODEL is None:
        return None
    feat = featurize(food_type, storage, temperature)
    try:
        pred = ML_MODEL.predict(feat)
        # round and ensure at least 1
        return max(1, int(round(float(pred[0]))))
    except Exception as e:
        print("ML predict failed:", e)
        return None

# ---------- Main API function ----------
def predict_safe_till(food_type: str, upload_time: str, storage: str = "room", temperature: int = None):
    dt = parser.parse(upload_time)
    if dt.tzinfo is None:
        dt = IST.localize(dt)

    food_key = normalize_food(food_type)
    base_expiry = expiry_rules.get(food_key, 2)

    # If ML model exists, try it first (fallback to rule)
    expiry_from_ml = predict_with_ml(food_type, storage, temperature)
    if expiry_from_ml is not None:
        adjusted_expiry = expiry_from_ml
        source = "ml"
    else:
        adjusted_expiry = adjust_expiry(base_expiry, storage, temperature)
        source = "rules"

    safe_till = dt + timedelta(hours=adjusted_expiry)
    return {
        "food_type": food_type,
        "food_key": food_key,
        "source": source,
        "base_expiry": base_expiry,
        "adjusted_expiry": adjusted_expiry,
        "storage": storage,
        "temperature": temperature,
        "safe_till_iso": safe_till.isoformat(),
        "safe_till_readable": safe_till.astimezone(IST).strftime("%Y-%m-%d %H:%M %Z")
    }

# quick manual test guard (when loaded directly)
if __name__ == "__main__":
    print(predict_safe_till("rice", "2025-09-21T10:00:00", storage="fridge", temperature=18))

from fastapi import FastAPI
from pydantic import BaseModel
from expiry_predictor import predict_safe_till
from datetime import datetime

app = FastAPI()

class DonationPayload(BaseModel):
    food_type: str
    upload_time: str = datetime.now().isoformat()
    storage: str = "room"
    temperature: int | None = None

@app.post("/predict")
def predict(payload: DonationPayload):
    result = predict_safe_till(
        payload.food_type,
        payload.upload_time,
        storage=payload.storage,
        temperature=payload.temperature
    )
    return result

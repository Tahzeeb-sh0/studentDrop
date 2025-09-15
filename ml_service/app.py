from fastapi import FastAPI
from pydantic import BaseModel
from typing import Literal
import time

app = FastAPI(title="StudentDrop ML Service")

class PredictRequest(BaseModel):
    student_id: int

class PredictResponse(BaseModel):
    risk_percent: float
    category: Literal["low", "medium", "high"]

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/ml/status")
async def ml_status():
    return {"accuracy": 0.0, "last_trained": None}

@app.post("/ml/predict", response_model=PredictResponse)
async def predict(req: PredictRequest):
    # Stub: pseudo-random result based on id
    seed = (req.student_id * 9301 + 49297) % 233280
    risk = (seed / 233280.0) * 100.0
    if risk <= 40:
        cat = "low"
    elif risk <= 70:
        cat = "medium"
    else:
        cat = "high"
    return {"risk_percent": round(risk, 2), "category": cat}

@app.post("/ml/train")
async def train():
    # Simulate training time
    time.sleep(1)
    return {"message": "Model trained", "accuracy": 0.85}

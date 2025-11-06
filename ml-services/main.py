"""
CityAssist ML Services
FastAPI application for ML-based personalization, routing, and predictions
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import redis
import os
from datetime import datetime

app = FastAPI(
    title="CityAssist ML Services",
    description="ML services for personalization, routing, and predictions",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redis client for caching
redis_client = None
try:
    redis_client = redis.Redis(
        host=os.getenv("REDIS_HOST", "localhost"),
        port=int(os.getenv("REDIS_PORT", 6379)),
        db=0,
        decode_responses=True
    )
except Exception as e:
    print(f"Warning: Redis connection failed: {e}")
    redis_client = None


# Pydantic models
class UserProfile(BaseModel):
    age: Optional[int] = None
    medical_flags: Optional[List[str]] = []
    commute_patterns: Optional[List[str]] = []


class Location(BaseModel):
    lat: float
    lng: float


class RouteRequest(BaseModel):
    origin: Location
    destination: Location
    preferences: Optional[Dict[str, Any]] = {}


class RouteResponse(BaseModel):
    distance: float
    duration: float
    alternate_routes: Optional[List[Dict[str, Any]]] = []
    traffic_info: Optional[Dict[str, Any]] = {}
    explanation: str


class AQIRecommendation(BaseModel):
    aqi_value: int
    recommendation: str
    severity: str
    explanation: str


class OutageETARequest(BaseModel):
    utility_type: str
    zone: str
    weather_conditions: Optional[Dict[str, Any]] = {}


class OutageETAResponse(BaseModel):
    estimated_hours: float
    confidence: float
    explanation: str


class ImageClassificationRequest(BaseModel):
    image_url: str


class ImageClassificationResponse(BaseModel):
    category: str
    confidence: float
    explanation: str


@app.get("/")
async def root():
    return {
        "service": "CityAssist ML Services",
        "version": "1.0.0",
        "status": "healthy"
    }


@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


@app.post("/personalization/alert-preference", response_model=Dict[str, Any])
async def get_alert_preference(profile: UserProfile):
    """
    Get personalized alert preferences based on user profile
    """
    # Mock implementation - replace with actual ML model
    alert_level = "low"
    if profile.age and profile.age >= 65:
        alert_level = "high"
    elif "Asthma" in (profile.medical_flags or []):
        alert_level = "medium"
    
    return {
        "alert_level": alert_level,
        "recommendations": {
            "aqi_threshold": 50 if alert_level == "high" else 100,
            "push_notifications": True,
            "email_notifications": alert_level in ["medium", "high"]
        },
        "explanation": f"Alert level set to {alert_level} based on user profile"
    }


@app.post("/routing/recommend", response_model=RouteResponse)
async def recommend_route(request: RouteRequest):
    """
    Recommend optimal route with traffic considerations
    """
    # Check cache first
    cache_key = f"route:{request.origin.lat},{request.origin.lng}:{request.destination.lat},{request.destination.lng}"
    if redis_client:
        cached = redis_client.get(cache_key)
        if cached:
            import json
            return RouteResponse(**json.loads(cached))
    
    # Mock implementation - replace with actual ML model
    # Calculate distance (simplified)
    distance = abs(request.origin.lat - request.destination.lat) + abs(request.origin.lng - request.destination.lng)
    distance_km = distance * 111  # Rough conversion
    
    # Estimate duration (simplified)
    avg_speed_kmh = 30  # Average city speed
    duration_minutes = (distance_km / avg_speed_kmh) * 60
    
    response = RouteResponse(
        distance=round(distance_km, 2),
        duration=round(duration_minutes, 2),
        alternate_routes=[],
        traffic_info={
            "congestion_level": "moderate",
            "incidents": []
        },
        explanation="Route calculated based on current traffic conditions. Moderate congestion expected."
    )
    
    # Cache the result
    if redis_client:
        import json
        redis_client.setex(cache_key, 300, json.dumps(response.dict()))  # 5 minute cache
    
    return response


@app.get("/alerts/aqi-recommendation", response_model=AQIRecommendation)
async def get_aqi_recommendation(lat: float, lng: float, profile: Optional[UserProfile] = None):
    """
    Get AQI-based health recommendations
    """
    # Mock implementation - replace with actual ML model
    aqi_value = 75  # Mock AQI value
    
    if aqi_value > 100:
        severity = "high"
        recommendation = "Avoid outdoor activities. Wear N95 mask if going outside."
    elif aqi_value > 50:
        severity = "medium"
        recommendation = "Moderate air quality. Sensitive individuals should take precautions."
    else:
        severity = "low"
        recommendation = "Good air quality. Safe for outdoor activities."
    
    if profile and profile.age and profile.age >= 65:
        recommendation += " (Elderly: Consider extra caution)"
    
    if profile and "Asthma" in (profile.medical_flags or []):
        recommendation += " (Asthma: Use mask if air quality is moderate or worse)"
    
    return AQIRecommendation(
        aqi_value=aqi_value,
        recommendation=recommendation,
        severity=severity,
        explanation=f"Current AQI is {aqi_value}. {recommendation}"
    )


@app.post("/outage/estimate-eta", response_model=OutageETAResponse)
async def estimate_outage_eta(request: OutageETARequest):
    """
    Predict time-to-restore for utility outages
    """
    # Mock implementation - replace with actual ML model
    # In production, use historical data, weather, grid sensor data
    
    base_hours = 4.0
    if request.utility_type.lower() == "water":
        base_hours = 3.0
    elif request.utility_type.lower() == "power":
        base_hours = 6.0
    
    # Adjust based on weather
    if request.weather_conditions:
        if request.weather_conditions.get("severe_weather"):
            base_hours *= 1.5
    
    estimated_hours = base_hours
    confidence = 0.75
    
    return OutageETAResponse(
        estimated_hours=round(estimated_hours, 1),
        confidence=confidence,
        explanation=f"Estimated restoration time: {estimated_hours} hours based on historical patterns and current conditions."
    )


@app.post("/reports/classify-image", response_model=ImageClassificationResponse)
async def classify_image(request: ImageClassificationRequest):
    """
    Classify report images (pothole, garbage, tree fall, etc.)
    """
    # Mock implementation - replace with actual CNN model
    # In production, load and use trained model
    
    categories = ["pothole", "garbage", "tree_fall", "streetlight", "water_leak", "other"]
    # Mock classification
    predicted_category = "pothole"  # Replace with actual model prediction
    confidence = 0.85
    
    return ImageClassificationResponse(
        category=predicted_category,
        confidence=confidence,
        explanation=f"Image classified as {predicted_category} with {confidence*100:.1f}% confidence."
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


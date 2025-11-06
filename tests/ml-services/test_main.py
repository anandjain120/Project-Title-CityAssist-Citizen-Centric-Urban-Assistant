"""
Test suite for CityAssist ML Services
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["service"] == "CityAssist ML Services"


def test_health():
    """Test health endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_alert_preference():
    """Test alert preference endpoint"""
    response = client.post(
        "/personalization/alert-preference",
        json={
            "age": 65,
            "medical_flags": ["Asthma"],
            "commute_patterns": ["Daily Commuter"]
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "alert_level" in data
    assert "recommendations" in data
    assert "explanation" in data


def test_route_recommendation():
    """Test route recommendation endpoint"""
    response = client.post(
        "/routing/recommend",
        json={
            "origin": {"lat": 40.7128, "lng": -74.0060},
            "destination": {"lat": 40.7589, "lng": -73.9851},
            "preferences": {}
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "distance" in data
    assert "duration" in data
    assert "explanation" in data


def test_aqi_recommendation():
    """Test AQI recommendation endpoint"""
    response = client.get("/alerts/aqi-recommendation?lat=40.7128&lng=-74.0060")
    assert response.status_code == 200
    data = response.json()
    assert "aqi_value" in data
    assert "recommendation" in data
    assert "severity" in data


def test_image_classification():
    """Test image classification endpoint"""
    response = client.post(
        "/reports/classify-image",
        json={"image_url": "https://example.com/image.jpg"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "category" in data
    assert "confidence" in data
    assert "explanation" in data


def test_outage_eta():
    """Test outage ETA estimation endpoint"""
    response = client.post(
        "/outage/estimate-eta",
        json={
            "utility_type": "power",
            "zone": "downtown",
            "weather_conditions": {}
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "estimated_hours" in data
    assert "confidence" in data
    assert "explanation" in data


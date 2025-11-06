# CityAssist ML Services

Python FastAPI services for personalization, routing, and predictions

## Features

1. **Personalized Alerting** - User sensitivity & preferences model
2. **Real-time Route Recommender** - Alternate routes with traffic
3. **Outage ETA Estimator** - Predict restoration time
4. **Image Classification** - CNN for auto-classifying report images

## Getting Started

### Prerequisites

- Python 3.11+
- Redis 6+ (for caching)

### Installation

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Development

```bash
uvicorn main:app --reload
```

API will be available at http://localhost:8000

### Docker

```bash
docker build -t cityassist-ml-services .
docker run -p 8000:8000 cityassist-ml-services
```

## API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

### Personalization

- `POST /personalization/alert-preference` - Get personalized alert preferences

### Routing

- `POST /routing/recommend` - Get route recommendation

### Alerts

- `GET /alerts/aqi-recommendation` - Get AQI recommendations

### Outage

- `POST /outage/estimate-eta` - Estimate restoration time

### Reports

- `POST /reports/classify-image` - Classify report images

## Caching

Redis is used for caching frequent predictions:
- Route recommendations (5 min TTL)
- AQI data (15 min TTL)

## ML Models

Currently using mock implementations. To add real ML models:

1. Train models using TensorFlow/PyTorch
2. Save model artifacts
3. Load models in `main.py`
4. Update prediction functions

## Testing

```bash
pytest
pytest --cov
```

## Performance

- Response time target: < 500ms (p95)
- Cache hit rate target: > 80%
- Concurrent requests: 100+ per instance

## License

[Specify License]


# CityAssist — Citizen-Centric Urban Assistant

CityAssist is a citizen-focused Smart City platform that helps daily users (residents, commuters, small businesses) interact with city services, receive personalized alerts, and get actionable recommendations.

## Project Overview

Unlike command-center projects focused on administrators, CityAssist centers on everyday utility:
- Real-time travel advisory and alternate route suggestions
- Personalized air-quality alerts and health recommendations
- Utility outage notifications with ETA and service updates
- Quick reporting for civic problems (image + location) with tracking
- Localized offers and services (community services, vaccination drives, local vendor alerts)

## Architecture

```
CityAssist/
├── frontend/              # PWA (Progressive Web App)
├── backend/               # Java Spring Boot microservices
├── ml-services/           # Python ML services (FastAPI)
├── devops/                # Infrastructure as Code (Terraform, K8s, CI/CD)
├── powerbi/               # Power BI dashboards and data models
├── tests/                 # Test suites (unit, integration, E2E, load)
└── docs/                  # API documentation and project docs
```

## Technology Stack

### Frontend
- React/Vue.js (PWA)
- Service Worker for offline support
- WebSocket for real-time updates
- Firebase/FCM for push notifications

### Backend
- Java Spring Boot (microservices)
- PostgreSQL (primary database)
- Redis (caching)
- S3 (object storage for images)
- JWT (authentication)

### ML Services
- Python (FastAPI)
- TensorFlow/PyTorch (ML models)
- Redis (caching predictions)

### DevOps
- Docker & Kubernetes
- Terraform (IaC)
- Helm (K8s package management)
- GitHub Actions / Jenkins (CI/CD)
- Prometheus & Grafana (monitoring)
- ELK/OpenSearch (logging)

### Analytics
- Power BI (dashboards and insights)

## Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- Python 3.9+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 6+

### Development Setup

1. **Clone and setup:**
   ```bash
   git clone <repo-url>
   cd cityassist
   ```

2. **Start infrastructure (PostgreSQL, Redis):**
   ```bash
   docker-compose -f devops/docker-compose.dev.yml up -d
   ```

3. **Start Backend Services:**
   ```bash
   cd backend
   ./gradlew bootRun
   ```

4. **Start ML Services:**
   ```bash
   cd ml-services
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

5. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Project Structure

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture documentation.

## API Documentation

- OpenAPI/Swagger specs: [docs/api/](docs/api/)
- Postman Collection: [docs/api/cityassist.postman_collection.json](docs/api/cityassist.postman_collection.json)

## Testing

```bash
# Run all tests
./scripts/run-tests.sh

# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && ./gradlew test

# ML services tests
cd ml-services && pytest
```

## Deployment

See [devops/README.md](devops/README.md) for deployment instructions.

## Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for contribution guidelines.

## License

[Specify License]


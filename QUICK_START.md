# CityAssist - Quick Start Guide

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (for frontend)
- **Java 17+** (for backend)
- **Python 3.11+** (for ML services)
- **Docker & Docker Compose** (for infrastructure)
- **PostgreSQL 14+** (or use Docker)
- **Redis 6+** (or use Docker)

### Step 1: Start Infrastructure

```bash
# Start PostgreSQL and Redis
docker-compose -f devops/docker-compose.dev.yml up -d
```

### Step 2: Start Backend Services

```bash
# Navigate to backend
cd backend

# Build all services
./gradlew build

# Run UserService (in separate terminals for each service)
cd user-service
./gradlew bootRun
# Service will start on http://localhost:8081

# Run ReportService
cd ../report-service
./gradlew bootRun
# Service will start on http://localhost:8082
```

**Note:** For full development, you'll need to run all 5 services (UserService, ReportService, NotificationService, RoutingService, IntegrationService) in separate terminals.

### Step 3: Start ML Services

```bash
# Navigate to ML services
cd ml-services

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload
# Service will start on http://localhost:8000
```

### Step 4: Start Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Application will start on http://localhost:3000
```

## 📋 Project Structure

```
CityAssist/
├── frontend/              # React PWA
├── backend/               # Java Spring Boot microservices
│   ├── user-service/      # Port 8081
│   ├── report-service/    # Port 8082
│   ├── notification-service/  # Port 8083
│   ├── routing-service/   # Port 8084
│   └── integration-service/  # Port 8085
├── ml-services/           # Python FastAPI (Port 8000)
├── devops/               # Infrastructure & deployment
├── powerbi/              # Power BI dashboards
├── tests/                # Test suites
└── docs/                 # Documentation
```

## 🔑 Key Features

### Frontend (PWA)
- ✅ Mobile-first responsive design
- ✅ User onboarding with profile creation
- ✅ Home feed with personalized alerts
- ✅ Interactive maps with traffic data
- ✅ Report submission with image upload
- ✅ Notifications center
- ✅ Local services directory

### Backend Services
- ✅ UserService - Authentication & profile management
- ✅ ReportService - Issue reporting with ticket tracking
- ✅ NotificationService - Push & web notifications
- ✅ RoutingService - Route recommendations (API Gateway)
- ✅ IntegrationService - External integrations

### ML Services
- ✅ Personalized alert preferences
- ✅ Route recommendations
- ✅ AQI health recommendations
- ✅ Outage ETA estimation
- ✅ Image classification (pothole, garbage, etc.)

## 📚 Documentation

- **Architecture:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Complete Documentation:** [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md)
- **API Documentation:** [docs/api/README.md](docs/api/README.md)
- **Postman Collection:** [docs/api/cityassist.postman_collection.json](docs/api/cityassist.postman_collection.json)

## 🧪 Testing

### Run All Tests

```bash
./scripts/run-tests.sh
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
./gradlew test
```

### ML Services Tests

```bash
cd ml-services
pytest
```

## 🔧 Configuration

### Frontend Environment Variables

Create `frontend/.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_ML_SERVICE_URL=http://localhost:8000
```

### Backend Configuration

Each service has its own `application.yml`:
- Database connection
- JWT secret
- Service ports
- External service URLs

### ML Services Configuration

Set environment variables:
```bash
export REDIS_HOST=localhost
export REDIS_PORT=6379
```

## 📊 API Endpoints

### UserService (Port 8081)
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/users/profile` - Get profile

### ReportService (Port 8082)
- `POST /api/reports` - Create report
- `GET /api/reports` - Get reports
- `GET /api/reports/{id}` - Get report details

### ML Services (Port 8000)
- `POST /personalization/alert-preference` - Get alert preferences
- `POST /routing/recommend` - Get route recommendation
- `GET /alerts/aqi-recommendation` - Get AQI recommendations
- `POST /reports/classify-image` - Classify image

**Swagger UI:** Each service exposes Swagger at `/swagger-ui.html`

## 🐳 Docker

### Build Frontend

```bash
cd frontend
docker build -t cityassist-frontend .
```

### Build Backend Services

```bash
cd backend/user-service
./gradlew bootBuildImage --imageName=cityassist/user-service:latest
```

### Build ML Services

```bash
cd ml-services
docker build -t cityassist-ml-services .
```

## 🚦 Next Steps

1. **Set up database:** Create PostgreSQL database and run migrations
2. **Configure AWS S3:** Set up S3 bucket for image storage
3. **Configure FCM:** Set up Firebase Cloud Messaging for push notifications
4. **Train ML models:** Replace mock implementations with real ML models
5. **Set up CI/CD:** Configure GitHub Actions or Jenkins pipelines
6. **Deploy to Kubernetes:** Use Helm charts for deployment

## 📞 Support

- **Documentation:** See `docs/` directory
- **API Docs:** Swagger UI at each service
- **Issues:** Create GitHub issues for bugs or feature requests

## 🎯 Development Workflow

1. Start infrastructure (PostgreSQL, Redis)
2. Start backend services (one terminal per service)
3. Start ML services
4. Start frontend
5. Access frontend at http://localhost:3000
6. Use Swagger UI for API testing

## ⚠️ Important Notes

- **Mock Data:** Currently using mock data for development
- **Authentication:** JWT tokens are mocked in frontend
- **ML Models:** Using mock implementations - replace with real models
- **Image Upload:** S3 integration needs to be configured
- **Push Notifications:** FCM needs to be set up

## 📝 License

[Specify License]

---

**Happy Coding! 🎉**


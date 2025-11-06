# CityAssist — Complete Project Documentation

## Executive Summary

CityAssist is a citizen-centric Smart City platform that enables daily users (residents, commuters, small businesses) to interact with city services, receive personalized alerts, and get actionable recommendations. The system is both consumer-friendly and enterprise-grade, allowing back-office teams to use the same data and models for operations.

## Project Structure

```
CityAssist/
├── frontend/              # PWA (Progressive Web App)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── store/        # State management
│   │   └── types/        # TypeScript types
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               # Java Spring Boot microservices
│   ├── user-service/      # User management & authentication
│   ├── report-service/    # Report management
│   ├── notification-service/ # Notifications
│   ├── routing-service/   # Route recommendations (API Gateway)
│   └── integration-service/ # External integrations
│
├── ml-services/           # Python ML services (FastAPI)
│   ├── main.py           # FastAPI application
│   ├── requirements.txt
│   └── Dockerfile
│
├── devops/                # Infrastructure as Code
│   ├── terraform/         # Terraform modules
│   ├── kubernetes/        # K8s manifests & Helm charts
│   ├── ci-cd/             # CI/CD pipelines
│   └── docker-compose.dev.yml
│
├── powerbi/               # Power BI dashboards
│   └── data-models/       # DAX measures & models
│
├── tests/                 # Test suites
│   ├── frontend/          # Frontend tests
│   ├── backend/           # Backend tests
│   ├── e2e/               # End-to-end tests
│   └── load/              # Load tests
│
└── docs/                  # Documentation
    ├── ARCHITECTURE.md
    ├── API/
    └── PROJECT_DOCUMENTATION.md
```

## Core Features

### 1. Frontend (PWA)

**Key Pages:**
- **Landing/Onboarding:** Profile creation with age, medical flags, commute patterns
- **Home Feed:** Personalized alerts (AQI, traffic, utility) with action buttons
- **Map & Commuter Assistant:** Live traffic heatmap, alternate routes, travel time estimates
- **Report an Issue:** Photo upload, geotagging, category selection, ticket tracking
- **Service Status:** Subscribe to utilities for zone-level outage alerts
- **Notifications Center:** Read/unread management, snooze, settings
- **Local Services:** Directory of nearby facilities with click-to-call and directions

**Technology Stack:**
- React 18 with TypeScript
- Vite for build tooling
- React Router for routing
- Zustand for state management
- React Query for data fetching
- Leaflet for maps
- PWA with service worker

### 2. Backend Microservices

#### UserService (Port 8081)
- User registration and authentication (JWT)
- Profile management
- Preferences and subscription management

**Endpoints:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/preferences` - Update preferences

#### ReportService (Port 8082)
- Accept reports with images and location
- Generate tickets with lifecycle management
- Timeline events and status updates
- S3 integration for image storage

**Endpoints:**
- `POST /api/reports` - Create report
- `GET /api/reports` - Get user reports
- `GET /api/reports/{id}` - Get report details
- `GET /api/reports/{id}/timeline` - Get timeline

#### NotificationService (Port 8083)
- Queue and send push notifications
- Web notifications management
- Subscription handling
- FCM/Browser Push integration

**Endpoints:**
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/{id}/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `POST /api/notifications/subscribe` - Subscribe to notifications

#### RoutingService (Port 8084)
- Orchestrates traffic & map services
- Personalization engine integration
- Route recommendations aggregation
- API Gateway functionality

**Endpoints:**
- `POST /api/routing/route` - Get route recommendation
- `GET /api/routing/traffic` - Get traffic data
- `POST /api/routing/alternate` - Get alternate routes

#### IntegrationService (Port 8085)
- Connectors to utility providers
- City 3rd-party systems integration
- Data synchronization
- Webhook handlers

**Endpoints:**
- `GET /api/services/outages` - Get utility outages
- `POST /api/services/subscribe` - Subscribe to utility
- `GET /api/services/local` - Get local services

### 3. ML Services (FastAPI)

**Services:**
1. **Personalized Alerting** - User sensitivity & preferences model
2. **Real-time Route Recommender** - Alternate routes with congestion/events
3. **Outage ETA Estimator** - Predict time-to-restore
4. **Image Triage** - CNN for auto-classifying report images

**Endpoints:**
- `POST /personalization/alert-preference` - Get personalized alert preferences
- `POST /routing/recommend` - Get route recommendation
- `GET /alerts/aqi-recommendation` - Get AQI recommendations
- `POST /outage/estimate-eta` - Estimate outage restoration time
- `POST /reports/classify-image` - Classify report images

**Technology:**
- FastAPI (Python 3.11)
- Redis for caching
- TensorFlow for ML models (when implemented)
- scikit-learn for lightweight models

### 4. DevOps Infrastructure

**Infrastructure Components:**
- **Terraform:** VPC, EKS/ECS cluster, S3 buckets, RDS, IAM roles
- **Kubernetes:** Helm charts for each microservice, HPA, liveness/readiness probes
- **CI/CD:** GitHub Actions/Jenkins pipelines
- **Monitoring:** Prometheus, Grafana, ELK/OpenSearch, Jaeger
- **Secrets:** Vault or Kubernetes Secrets

**Local Development:**
```bash
docker-compose -f devops/docker-compose.dev.yml up -d
```

### 5. Power BI Dashboards

**Dashboards:**
1. **Citizen Health Dashboard**
   - Aggregated AQI alerts
   - Demographics impacted
   - Top risk zones

2. **Service KPI Dashboard**
   - Tickets created vs resolved
   - Average restore ETA
   - SLA compliance

3. **Mobility Dashboard**
   - Peak congestion corridors
   - Alternate route success
   - Commuter delay estimates

## Data Architecture

### Database Schema

**PostgreSQL (Primary Database):**
- `users` - User profiles
- `reports` - Citizen reports
- `notifications` - Notification records
- `report_timeline` - Report status updates
- `user_preferences` - User preferences
- `service_subscriptions` - Utility subscriptions

**Redis (Cache):**
- Route recommendations (5 min TTL)
- AQI data (15 min TTL)
- User sessions
- Rate limiting

**S3 (Object Storage):**
- Report images
- User profile pictures
- Static assets

## Security

- **Authentication:** JWT with refresh tokens
- **Authorization:** RBAC (Role-Based Access Control)
- **Image Upload:** S3 pre-signed URLs
- **API Security:** Rate limiting, input validation
- **HTTPS/TLS:** All communications encrypted
- **Secrets Management:** Vault/Kubernetes Secrets

## Testing Strategy

### Unit Tests
- Frontend components (React Testing Library)
- Backend services (JUnit)
- ML models (pytest)

### Integration Tests
- API endpoints
- Database operations
- External service integrations

### End-to-End Tests
- Critical user flows
- Cross-service interactions
- Browser automation (Playwright/Cypress)

### Load Tests
- Concurrent report submissions
- Push notification throughput
- API performance under load

### Security Tests
- Image upload sanitization
- Auth token validation
- Input validation
- SQL injection prevention

## Deployment

### Development
```bash
# Start infrastructure
docker-compose -f devops/docker-compose.dev.yml up -d

# Start backend services
cd backend && ./gradlew bootRun

# Start ML services
cd ml-services && uvicorn main:app --reload

# Start frontend
cd frontend && npm run dev
```

### Production
- Kubernetes cluster (EKS/GKE/AKS)
- Helm charts for deployment
- Terraform for infrastructure
- CI/CD pipelines for automated deployment

## API Documentation

- **OpenAPI/Swagger:** Available at `/swagger-ui.html` for each service
- **Postman Collection:** See `docs/api/cityassist.postman_collection.json`

## Monitoring & Observability

- **Metrics:** Prometheus
- **Dashboards:** Grafana
- **Logging:** ELK/OpenSearch
- **Tracing:** Jaeger
- **Alerting:** PagerDuty/SMS

## Performance Targets

- **API Response Time:** < 200ms (p95)
- **Route Recommendations:** < 500ms (p95)
- **Image Classification:** < 2s (p95)
- **Push Notifications:** < 5s delivery time
- **Uptime:** 99.9% availability

## Scalability

- **Horizontal Scaling:** Kubernetes HPA
- **Database:** Read replicas for read-heavy workloads
- **Caching:** Redis for frequently accessed data
- **CDN:** Static assets delivery
- **Message Queue:** Async processing for notifications

## Future Enhancements

1. **Real-time ML Model Training:** Continuous learning from user feedback
2. **Advanced Route Optimization:** Multi-modal transportation
3. **Predictive Maintenance:** Predict infrastructure issues before they occur
4. **Community Features:** Citizen forums and community engagement
5. **Mobile Apps:** Native iOS and Android apps
6. **Voice Assistant Integration:** Alexa/Google Assistant support

## Support & Contact

- **Technical Support:** tech-support@cityassist.com
- **API Support:** api-support@cityassist.com
- **Documentation:** https://docs.cityassist.com

## License

[Specify License]

---

**Last Updated:** January 2024
**Version:** 1.0.0


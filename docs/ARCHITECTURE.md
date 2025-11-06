# CityAssist Architecture Documentation

## System Overview

CityAssist is built as a microservices architecture with clear separation of concerns:

1. **Frontend (PWA)** - Mobile-first Progressive Web App
2. **Backend Microservices (Java Spring Boot)** - User-centric APIs
3. **ML Services (Python FastAPI)** - Personalization and predictions
4. **Infrastructure (DevOps)** - Containerized, scalable, observable

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (PWA)                        │
│  React/Vue + Service Worker + WebSocket + Push Notifications │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS / WebSocket
                     │
┌────────────────────┴────────────────────────────────────────┐
│                    API Gateway (K8s Ingress)                 │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┬──────────────┐
        │            │            │              │
┌───────▼────┐ ┌─────▼─────┐ ┌───▼──────┐ ┌─────▼──────┐
│  User      │ │  Report   │ │ Routing  │ │ Integration│
│  Service   │ │  Service  │ │ Service  │ │ Service   │
└──────┬─────┘ └─────┬─────┘ └────┬─────┘ └─────┬──────┘
       │             │             │             │
       └─────────────┼─────────────┼─────────────┘
                     │             │
            ┌────────▼─────────────▼────────┐
            │      PostgreSQL (Primary DB)   │
            └────────┬──────────────────────┘
                     │
            ┌────────▼────────┐
            │  Redis (Cache)  │
            └─────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              ML Services (Python FastAPI)                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │Personalization│ │Route Recomm.│ │Outage Predict│        │
│  │Engine         │ │Engine       │ │Engine        │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
                     │
            ┌────────▼────────┐
            │  S3 (Images)     │
            └──────────────────┘
```

## Component Details

### Frontend (PWA)

**Technology:** React/Vue.js, PWA manifest, Service Worker

**Key Features:**
- Landing/Onboarding with profile creation
- Home feed with personalized alerts
- Map & Commuter assistant with traffic heatmap
- Report an Issue with photo upload and geotagging
- Service Status subscription
- Notifications center
- Local Services directory

**Integration Points:**
- Backend auth + profile APIs
- AI services for route suggestions
- Push notifications (FCM/Browser Push)
- WebSocket for real-time updates

### Backend Microservices

#### 1. UserService
- Profile management (age, medical flags, commute patterns)
- Authentication (JWT)
- Preferences and subscription management

#### 2. ReportService
- Accept reports (image, location, category)
- Generate tickets with lifecycle management
- Timeline events and status updates

#### 3. NotificationService
- Queue and send push notifications
- Web notifications management
- Subscription handling

#### 4. RoutingService (API Gateway)
- Orchestrates traffic & map services
- Personalization engine integration
- Route recommendations aggregation

#### 5. IntegrationService
- Connectors to utility providers
- City 3rd-party systems integration
- Data synchronization

### ML Services

#### 1. Personalized Alerting Model
- Learns user sensitivity & preferences
- Age and health-based alert prioritization

#### 2. Real-time Route Recommender
- Alternate routes considering congestion and events
- User preference learning (avoid highways, prefer bus lanes)

#### 3. Outage ETA Estimator
- Predicts time-to-restore using historical patterns
- Weather and grid sensor data integration

#### 4. Image Triage Model
- CNN for auto-classifying report images
- Categories: pothole, garbage, tree fall, etc.

### Data Flow

1. **User Registration/Login:**
   - Frontend → UserService → PostgreSQL → JWT token

2. **Report Submission:**
   - Frontend → ReportService → S3 (image) → PostgreSQL → NotificationService → User

3. **Route Recommendation:**
   - Frontend → RoutingService → ML Services (Route Recommender) → Redis (cache) → Response

4. **Alert Delivery:**
   - IntegrationService → NotificationService → FCM/WebSocket → Frontend

## Security

- JWT-based authentication with refresh tokens
- RBAC (Role-Based Access Control)
- Image upload sanitization (S3 pre-signed URLs)
- API rate limiting
- HTTPS/TLS everywhere
- Secrets management (Vault/K8s Secrets)

## Scalability

- Horizontal scaling via Kubernetes HPA
- Database read replicas
- Redis caching layer
- CDN for static assets
- Message queue for async processing

## Observability

- Prometheus metrics
- Grafana dashboards
- ELK/OpenSearch for centralized logging
- Jaeger for distributed tracing
- Health checks (liveness/readiness probes)

## Deployment

- Kubernetes clusters (EKS/ECS)
- Helm charts for each service
- Terraform for infrastructure provisioning
- CI/CD pipelines (GitHub Actions/Jenkins)
- Blue-green or canary deployments


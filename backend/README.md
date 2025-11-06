# CityAssist Backend Services

Java Spring Boot microservices for CityAssist platform

## Services

1. **UserService** (Port 8081) - User management & authentication
2. **ReportService** (Port 8082) - Report management
3. **NotificationService** (Port 8083) - Notifications
4. **RoutingService** (Port 8084) - Route recommendations (API Gateway)
5. **IntegrationService** (Port 8085) - External integrations

## Getting Started

### Prerequisites

- Java 17+
- Gradle 7+
- PostgreSQL 14+
- Redis 6+

### Setup

1. Start PostgreSQL and Redis:
```bash
docker-compose -f ../devops/docker-compose.dev.yml up -d
```

2. Build all services:
```bash
./gradlew build
```

3. Run a service:
```bash
cd user-service
./gradlew bootRun
```

### API Documentation

Each service exposes Swagger UI at:
- http://localhost:{port}/swagger-ui.html

## Service Details

### UserService

**Endpoints:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### ReportService

**Endpoints:**
- `POST /api/reports` - Create report (multipart/form-data)
- `GET /api/reports` - Get user reports
- `GET /api/reports/{id}` - Get report details
- `GET /api/reports/{id}/timeline` - Get timeline

### Configuration

Each service has its own `application.yml`:
- Database connection
- Port configuration
- External service URLs
- Security settings

## Database Migrations

Flyway is used for database migrations. Migrations are in:
```
{service}/src/main/resources/db/migration/
```

## Testing

```bash
./gradlew test
./gradlew integrationTest
```

## Docker

Build Docker image:
```bash
./gradlew bootBuildImage --imageName=cityassist/{service-name}:latest
```

## Security

- JWT authentication
- Password encryption (BCrypt)
- HTTPS/TLS in production
- Input validation
- SQL injection prevention

## Monitoring

- Actuator endpoints: `/actuator/health`
- Prometheus metrics: `/actuator/prometheus`
- Distributed tracing with Jaeger

## License

[Specify License]


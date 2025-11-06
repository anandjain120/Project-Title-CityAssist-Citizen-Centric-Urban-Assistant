# CityAssist Test Suites

This directory contains comprehensive test suites for CityAssist.

## Structure

```
tests/
├── frontend/           # Frontend tests (unit, integration, E2E)
├── backend/            # Backend tests (unit, integration)
├── ml-services/        # ML services tests
├── e2e/                # End-to-end tests
├── load/               # Load and performance tests
└── security/           # Security tests
```

## Running Tests

### Frontend Tests

```bash
cd frontend
npm test
npm run test:coverage
npm run test:e2e
```

### Backend Tests

```bash
cd backend
./gradlew test
./gradlew integrationTest
```

### ML Services Tests

```bash
cd ml-services
pytest
pytest --cov
```

### E2E Tests

```bash
cd e2e
npm test
```

### Load Tests

```bash
cd load
k6 run load-test.js
```

## Test Coverage

Target coverage:
- **Unit tests:** >80%
- **Integration tests:** >70%
- **E2E tests:** Critical user flows

## CI Integration

All tests run automatically in CI/CD pipelines:
- Unit tests on every PR
- Integration tests on merge to main
- E2E tests nightly
- Load tests weekly


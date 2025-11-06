# Contributing to CityAssist

## Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: `./scripts/run-tests.sh`
5. Commit with conventional commits format
6. Push and create a Pull Request

## Code Standards

### Frontend
- ESLint + Prettier for code formatting
- Follow React/Vue.js best practices
- Accessibility (WCAG 2.1 AA compliance)
- Mobile-first responsive design

### Backend
- Follow Java Spring Boot conventions
- Write unit tests for all services
- Use OpenAPI/Swagger for API documentation
- Follow RESTful API design principles

### ML Services
- Type hints for all Python functions
- Docstrings following Google style
- Unit tests with pytest
- Model versioning and artifact management

## Testing

- Write tests for new features
- Maintain >80% code coverage
- Run integration tests before PR
- Update test documentation

## Documentation

- Update API docs for new endpoints
- Add examples in README if needed
- Update architecture docs for significant changes

## Commit Messages

Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `test:` for tests
- `refactor:` for refactoring
- `chore:` for maintenance

Example: `feat(frontend): add report submission with image upload`


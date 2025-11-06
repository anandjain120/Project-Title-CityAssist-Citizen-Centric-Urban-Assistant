# CityAssist API Documentation

This directory contains API documentation for all CityAssist microservices.

## API Specs

- [User Service API](user-service-api.yaml)
- [Report Service API](report-service-api.yaml)
- [Notification Service API](notification-service-api.yaml)
- [Routing Service API](routing-service-api.yaml)
- [Integration Service API](integration-service-api.yaml)
- [ML Services API](ml-services-api.yaml)

## Postman Collection

See [cityassist.postman_collection.json](../api/cityassist.postman_collection.json) for a complete Postman collection with all endpoints.

## Base URLs

- **Development:** http://localhost:8080
- **Staging:** https://api-staging.cityassist.com
- **Production:** https://api.cityassist.com

## Authentication

All protected endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Rate Limiting

- **Free tier:** 100 requests/hour
- **Premium tier:** 1000 requests/hour

## Error Responses

All errors follow this format:

```json
{
  "error": "Error code",
  "message": "Human-readable error message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Support

For API support, contact: api-support@cityassist.com


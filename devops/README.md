# CityAssist DevOps Infrastructure

This directory contains infrastructure as code, deployment configurations, and CI/CD pipelines for CityAssist.

## Structure

```
devops/
├── terraform/          # Infrastructure as Code
├── kubernetes/          # K8s manifests and Helm charts
├── ci-cd/              # CI/CD pipeline configurations
├── monitoring/         # Prometheus, Grafana configs
├── docker-compose.dev.yml  # Local development stack
└── README.md
```

## Prerequisites

- Docker & Docker Compose
- Kubernetes cluster (EKS/GKE/AKS)
- Terraform >= 1.0
- Helm >= 3.0
- kubectl configured

## Local Development

Start local infrastructure:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This starts:
- PostgreSQL (port 5432)
- Redis (port 6379)

## Deployment

### Terraform

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### Kubernetes

```bash
cd kubernetes
helm install cityassist ./helm/cityassist
```

### CI/CD

See `ci-cd/` directory for GitHub Actions or Jenkins pipeline configurations.

## Monitoring

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000
- Jaeger: http://localhost:16686

## Documentation

- [Terraform README](terraform/README.md)
- [Kubernetes README](kubernetes/README.md)
- [CI/CD README](ci-cd/README.md)


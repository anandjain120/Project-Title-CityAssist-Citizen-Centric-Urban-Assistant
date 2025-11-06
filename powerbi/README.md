# CityAssist Power BI Dashboards

This directory contains Power BI reports and data models for CityAssist analytics.

## Dashboards

1. **Citizen Health Dashboard** - AQI alerts, demographics, risk zones
2. **Service KPI Dashboard** - Tickets, SLA compliance, resolution times
3. **Mobility Dashboard** - Traffic patterns, commuter delays, route success

## Data Sources

- PostgreSQL (aggregated tables)
- API snapshots (periodic exports)
- CSV exports for manual updates

## Setup

1. Connect to data source (PostgreSQL or API)
2. Load data model (.pbix file)
3. Configure refresh schedule
4. Publish to Power BI Service

## Refresh Schedule

- **Real-time:** Citizen Health Dashboard (5 min intervals)
- **Hourly:** Service KPI Dashboard
- **Daily:** Mobility Dashboard

## Data Models

See `data-models/` directory for DAX measure definitions and data model documentation.

## Access

- **Development:** http://powerbi-dev.cityassist.com
- **Production:** http://powerbi.cityassist.com


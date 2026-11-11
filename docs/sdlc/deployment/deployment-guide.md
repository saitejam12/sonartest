# Deployment Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start how-it-deploys -->
Pushes to `main` run `.github/workflows/deploy.yml`, which builds the API image (if there is a backend) and deploys the SPA to AWS Amplify. Commits touching only `docs/sdlc/**` don't deploy. Deployments can also be started from the platform's Deployment tab.
<!-- sdlc:auto:end how-it-deploys -->

<!-- sdlc:auto:start environments -->
| Name | Service | Runtime | Scaling | Environment |
|---|---|---|---|---|
| SPA Hosting | React SPA on S3 static hosting | Static assets | n/a (static) | dev |
| API Service | FastAPI on AWS App Runner | Python 3.12 container | 1 instance, auto-scale on request volume | dev |
| Database | Amazon RDS for PostgreSQL 16 | PostgreSQL 16 | single small instance | dev |
| Email | SendGrid | SaaS API | managed by provider | dev |
<!-- sdlc:auto:end environments -->

<!-- sdlc:auto:start live -->
_Not deployed yet._
<!-- sdlc:auto:end live -->

<!-- sdlc:auto:start topology -->
```mermaid
graph LR
  n_SPA_Hosting["SPA Hosting<br/>React SPA on S3 static hosting"]
  n_API_Service["API Service<br/>FastAPI on AWS App Runner"]
  n_Database["Database<br/>Amazon RDS for PostgreSQL 16"]
  n_Email["Email<br/>SendGrid"]
  n_SPA_Hosting -->|"HTTPS"| n_API_Service
  n_API_Service -->|"TLS/PostgreSQL"| n_Database
  n_API_Service -->|"HTTPS"| n_Email
```
<!-- sdlc:auto:end topology -->

<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-11

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- GCP
- Azure

## Decision Outcome

Chosen option: AWS, because Runs the free, low-scale app cheaply with managed RDS PostgreSQL, container hosting for the API, static hosting for the SPA, and easy SendGrid integration, with headroom for many small teams.

## Consequences

Managed services add some configuration overhead versus a single PaaS, but keep cost and scaling simple.
<!-- sdlc:auto:end adr -->
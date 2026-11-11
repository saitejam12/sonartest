<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-11

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django REST Framework
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because Hosts the modest REST surface for accounts, profiles, working hours, teams, invitations and overlap computation, using Python's reliable zoneinfo for DST-correct overlap math.

## Consequences

Minimal batteries-included admin/ORM; SQLAlchemy and Alembic (scaffolded) cover persistence and migrations.
<!-- sdlc:auto:end adr -->
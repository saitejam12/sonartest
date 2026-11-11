<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-11

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Stores the simple, highly relational data (users, one team each, memberships, recurring weekly hours, invitations, sessions) and enforces email uniqueness and the one-team-per-account rule reliably at low scale.

## Consequences

Relational rigidity is a benefit here; leaves room to add PTO exceptions later.
<!-- sdlc:auto:end adr -->
<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-11

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because Delivered as a responsive Vite SPA that renders the live side-by-side overlap grid and re-renders all teammates' hours in the viewer's local time; reads the API base URL from VITE_API_BASE_URL and stores the opaque session token for Bearer auth.

## Consequences

A separate SPA origin from the API means auth must be token-based, not cookie-based; handled explicitly here.
<!-- sdlc:auto:end adr -->
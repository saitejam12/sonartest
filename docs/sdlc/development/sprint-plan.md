# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Accounts, authentication, profile basics and team creation foundation

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Sign up with email and password | 5 | backend-agent | — |
| US-002 | Story | Sign in to an existing account | 3 | backend-agent | US-001 |
| US-003 | Story | Sign out and session expiry | 3 | backend-agent | US-002 |
| US-004 | Story | Set and update home time zone | 3 | backend-agent | US-001 |
| US-005 | Story | View and edit basic profile details | 2 | frontend-agent | US-004 |
| US-010 | Story | Create a team | 3 | backend-agent | US-001 |

## Sprint 2: Sprint 2

Weekly working-hours scheduling, DST handling, and team membership visibility

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-006 | Story | Set weekly working hours per day | 5 | backend-agent | US-001, US-004 |
| US-007 | Story | Mark non-working days | 2 | backend-agent | US-006 |
| US-008 | Story | Update recurring working hours | 2 | backend-agent | US-006 |
| US-009 | Story | Working hours follow daylight-saving changes automatically | 5 | backend-agent | US-006, US-004 |
| US-013 | Story | View team membership | 2 | frontend-agent | US-010 |

## Sprint 3: Sprint 3

Email invitations and invite-link join flow

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-011 | Story | Invite teammates by email | 8 | integration-agent | US-010 |
| ↳ US-011-T1 | Task | Implement POST /teams/invitations endpoint and invitation record/token | — | backend-agent | — |
| ↳ US-011-T2 | Task | Integrate SendGrid send for invitation emails | — | integration-agent | — |
| ↳ US-011-T3 | Task | Add frontend invite UI with retry and manual link copy | — | frontend-agent | — |
| US-012 | Story | Join a team via shareable invite link | 8 | backend-agent | US-010, US-011 |
| ↳ US-012-T1 | Task | Implement POST /teams/join endpoint with token validation | — | backend-agent | — |
| ↳ US-012-T2 | Task | Wire signup-then-join redirect for users without an account | — | backend-agent | — |
| ↳ US-012-T3 | Task | Build invite-acceptance page with success/invalid states | — | frontend-agent | — |

## Sprint 4: Sprint 4

Core side-by-side overlap view with highlighted windows and responsive layout

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-014 | Story | See all teammates' working hours side by side | 8 | backend-agent | US-006, US-010, US-012 |
| ↳ US-014-T1 | Task | Implement GET /teams/overlap aggregation endpoint | — | backend-agent | — |
| ↳ US-014-T2 | Task | Build side-by-side working-hours grid component | — | frontend-agent | — |
| ↳ US-014-T3 | Task | Handle members with no working hours set | — | frontend-agent | — |
| US-016 | Story | Highlight overlapping meeting windows | 8 | backend-agent | US-014 |
| ↳ US-016-T1 | Task | Implement full- and partial-overlap computation | — | backend-agent | — |
| ↳ US-016-T2 | Task | Add visual highlighting for overlap windows in the grid | — | frontend-agent | — |
| ↳ US-016-T3 | Task | Add no-full-overlap messaging | — | frontend-agent | — |
| US-017 | Story | Responsive access on desktop and mobile browsers | 3 | frontend-agent | US-016 |

## Sprint 5: Sprint 5

Local-time labelling on the overlap view

Capacity: 20 points · Committed: 5

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-015 | Story | See each teammate's hours in local time | 5 | frontend-agent | US-014, US-009 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->

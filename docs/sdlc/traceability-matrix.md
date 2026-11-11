# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Sign up with email and password | US-001 | 1 | POST /auth/signup, api, db, users, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Sign in to an existing account | US-002 | 1 | POST /auth/login, api, db, sessions, users, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-003 | EPIC-001 | Sign out and session expiry | US-003 | 1 | POST /auth/logout, api, db, sessions, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-004 | EPIC-002 | Set and update home time zone | US-004 | 1 | GET /me, PUT /me/profile, api, db, users, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-005 | EPIC-002 | View and edit basic profile details | US-005 | 1 | PUT /me/profile, api, users, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-006 | EPIC-003 | Set weekly working hours per day | US-006 | 2 | GET /me/working-hours, PUT /me/working-hours, api, db, web, working_hours | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-007 | EPIC-003 | Mark non-working days | US-007 | 2 | PUT /me/working-hours, api, db, web, working_hours | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-008 | EPIC-003 | Update recurring working hours | US-008 | 2 | PUT /me/working-hours, api, db, web, working_hours | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-009 | EPIC-004 | Working hours follow daylight-saving changes automatically | US-009 | 2 | GET /me/working-hours, GET /teams/overlap, api, users, working_hours | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-010 | EPIC-005 | Create a team | US-010 | 1 | GET /teams/me, POST /teams, api, db, teams, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-011 | EPIC-005 | Invite teammates by email | US-011, US-011-T1, US-011-T2, US-011-T3 | 3 | POST /teams/invitations, api, db, email, invitations, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-012 | EPIC-005 | Join a team via shareable invite link | US-012, US-012-T1, US-012-T2, US-012-T3 | 3 | POST /teams/join, api, db, invitations, teams, users, web | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-013 | EPIC-005 | View team membership | US-013 | 2 | GET /teams/me, api, teams, users, web | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-014 | EPIC-006 | See all teammates' working hours side by side | US-014, US-014-T1, US-014-T2, US-014-T3 | 4 | GET /teams/overlap, api, db, teams, users, web, working_hours | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-015 | EPIC-006 | See each teammate's hours in local time | US-015 | 5 | GET /teams/overlap, users, web, working_hours | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-016 | EPIC-006 | Highlight overlapping meeting windows | US-016, US-016-T1, US-016-T2, US-016-T3 | 4 | GET /teams/overlap, api, web, working_hours | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-017 | EPIC-006 | Responsive access on desktop and mobile browsers | US-017 | 4 | web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
<!-- sdlc:auto:end matrix -->

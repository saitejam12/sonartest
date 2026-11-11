# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-v1 · approved · source: plan:PLAN

Development plan version 1 was approved, structuring work into 5 sprints spanning account setup through the overlap view feature.

Plan status: approved, version 1. Sprint breakdown: Sprint 1 - Accounts, authentication, profile basics and team creation foundation (capacity 20); Sprint 2 - Weekly working-hours scheduling, DST handling, and team membership visibility (capacity 20); Sprint 3 - Email invitations and invite-link join flow (capacity 20); Sprint 4 - Core side-by-side overlap view with highlighted windows and responsive layout (capacity 20); Sprint 5 - Local-time labelling on the overlap view (capacity 20).

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006

### SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 targets accounts, authentication, profile basics, and the foundation for team creation.

Goal: Accounts, authentication, profile basics and team creation foundation. Capacity: 20 points. No explicit story-to-sprint assignment was given in the input; mapping to EPIC-001/002/005 is thematic based on the stated goal, not a confirmed assignment.

**Related:** EPIC-001, EPIC-002, EPIC-005

### SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 targets weekly working-hours scheduling, automatic DST handling, and team membership visibility.

Goal: Weekly working-hours scheduling, DST handling, and team membership visibility. Capacity: 20 points. Story-to-sprint mapping is inferred from the goal wording only; the input does not explicitly assign stories to this sprint.

**Related:** EPIC-003, EPIC-004, EPIC-005

### SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 targets the email invitation flow and invite-link join flow.

Goal: Email invitations and invite-link join flow. Capacity: 20 points. Story-to-sprint mapping is inferred from the goal wording only; the input does not explicitly assign stories to this sprint.

**Related:** EPIC-005

### SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 targets the core side-by-side overlap view, overlap highlighting, and responsive layout.

Goal: Core side-by-side overlap view with highlighted windows and responsive layout. Capacity: 20 points. Story-to-sprint mapping is inferred from the goal wording only; the input does not explicitly assign stories to this sprint.

**Related:** EPIC-006

### SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 targets adding local-time labelling to the overlap view.

Goal: Local-time labelling on the overlap view. Capacity: 20 points. Story-to-sprint mapping is inferred from the goal wording only; the input does not explicitly assign stories to this sprint.

**Related:** EPIC-006

### EPIC-001 · approved · source: plan:EPIC-001

Epic covering user account creation and sign-in.

Epic: User Accounts and Sign-In. No points or assigned role at the epic level. Child stories: US-001 (sign up), US-002 (sign in), US-003 (sign out / session expiry).

**Related:** US-001, US-002, US-003

### EPIC-002 · approved · source: plan:EPIC-002

Epic covering personal profile management and home time zone settings.

Epic: Personal Profile and Home Time Zone. No points or assigned role at the epic level. Child stories: US-004 (set/update home time zone), US-005 (view/edit profile details).

**Related:** US-004, US-005

### EPIC-003 · approved · source: plan:EPIC-003

Epic covering recurring weekly working-hours configuration.

Epic: Recurring Weekly Working Hours. No points or assigned role at the epic level. Child stories: US-006 (set weekly working hours per day), US-007 (mark non-working days), US-008 (update recurring working hours).

**Related:** US-006, US-007, US-008

### EPIC-004 · approved · source: plan:EPIC-004

Epic covering automatic daylight-saving time adjustment of working hours.

Epic: Automatic Daylight-Saving Adjustment. No points or assigned role at the epic level. Child story: US-009 (working hours follow DST changes automatically).

**Related:** US-009

### EPIC-005 · approved · source: plan:EPIC-005

Epic covering team creation, invitations, and membership visibility.

Epic: Team Creation and Invitations. No points or assigned role at the epic level. Child stories: US-010 (create a team), US-011 (invite teammates by email), US-012 (join a team via shareable invite link), US-013 (view team membership).

**Related:** US-010, US-011, US-012, US-013

### EPIC-006 · approved · source: plan:EPIC-006

Epic covering the side-by-side working-hours grid and overlap view.

Epic: Side-by-Side Working-Hours and Overlap View. No points or assigned role at the epic level. Child stories: US-014 (see all teammates' working hours side by side), US-015 (see hours in local time), US-016 (highlight overlapping meeting windows), US-017 (responsive access on desktop and mobile).

**Related:** US-014, US-015, US-016, US-017

### US-001 · approved · source: plan:US-001

Story for signing up with email and password.

Sign up with email and password. Points: 5. Assigned role: backend-agent. Part of EPIC-001 (User Accounts and Sign-In).

**Related:** EPIC-001

### US-002 · approved · source: plan:US-002

Story for signing in to an existing account.

Sign in to an existing account. Points: 3. Assigned role: backend-agent. Part of EPIC-001 (User Accounts and Sign-In).

**Related:** EPIC-001

### US-003 · approved · source: plan:US-003

Story for signing out and handling session expiry.

Sign out and session expiry. Points: 3. Assigned role: backend-agent. Part of EPIC-001 (User Accounts and Sign-In).

**Related:** EPIC-001

### US-004 · approved · source: plan:US-004

Story for setting and updating the user's home time zone.

Set and update home time zone. Points: 3. Assigned role: backend-agent. Part of EPIC-002 (Personal Profile and Home Time Zone).

**Related:** EPIC-002

### US-005 · approved · source: plan:US-005

Story for viewing and editing basic profile details.

View and edit basic profile details. Points: 2. Assigned role: frontend-agent. Part of EPIC-002 (Personal Profile and Home Time Zone).

**Related:** EPIC-002

### US-006 · approved · source: plan:US-006

Story for setting weekly working hours per day.

Set weekly working hours per day. Points: 5. Assigned role: backend-agent. Part of EPIC-003 (Recurring Weekly Working Hours).

**Related:** EPIC-003

### US-007 · approved · source: plan:US-007

Story for marking non-working days.

Mark non-working days. Points: 2. Assigned role: backend-agent. Part of EPIC-003 (Recurring Weekly Working Hours).

**Related:** EPIC-003

### US-008 · approved · source: plan:US-008

Story for updating recurring working hours.

Update recurring working hours. Points: 2. Assigned role: backend-agent. Part of EPIC-003 (Recurring Weekly Working Hours).

**Related:** EPIC-003

### US-009 · approved · source: plan:US-009

Story ensuring working hours follow daylight-saving changes automatically.

Working hours follow daylight-saving changes automatically. Points: 5. Assigned role: backend-agent. Part of EPIC-004 (Automatic Daylight-Saving Adjustment).

**Related:** EPIC-004

### US-010 · approved · source: plan:US-010

Story for creating a team.

Create a team. Points: 3. Assigned role: backend-agent. Part of EPIC-005 (Team Creation and Invitations).

**Related:** EPIC-005

### US-011 · approved · source: plan:US-011

Story for inviting teammates by email, broken into backend, integration, and frontend sub-tasks.

Invite teammates by email. Points: 8. Assigned role: integration-agent. Part of EPIC-005 (Team Creation and Invitations). Sub-tasks: US-011-T1 (implement POST /teams/invitations endpoint and invitation record/token, backend-agent), US-011-T2 (integrate SendGrid send for invitation emails, integration-agent), US-011-T3 (add frontend invite UI with retry and manual link copy, frontend-agent).

**Related:** EPIC-005, US-011-T1, US-011-T2, US-011-T3

### US-011-T1 · approved · source: plan:US-011-T1

Backend task to implement the invitation creation endpoint.

Implement POST /teams/invitations endpoint and invitation record/token. Assigned role: backend-agent. Sub-task of US-011 (Invite teammates by email).

**Related:** US-011

### US-011-T2 · approved · source: plan:US-011-T2

Integration task to send invitation emails via SendGrid.

Integrate SendGrid send for invitation emails. Assigned role: integration-agent. Sub-task of US-011 (Invite teammates by email).

**Related:** US-011

### US-011-T3 · approved · source: plan:US-011-T3

Frontend task for the invite UI including retry and manual link copy.

Add frontend invite UI with retry and manual link copy. Assigned role: frontend-agent. Sub-task of US-011 (Invite teammates by email).

**Related:** US-011

### US-012 · approved · source: plan:US-012

Story for joining a team via a shareable invite link, broken into backend and frontend sub-tasks.

Join a team via shareable invite link. Points: 8. Assigned role: backend-agent. Part of EPIC-005 (Team Creation and Invitations). Sub-tasks: US-012-T1 (implement POST /teams/join endpoint with token validation, backend-agent), US-012-T2 (wire signup-then-join redirect for users without an account, backend-agent), US-012-T3 (build invite-acceptance page with success/invalid states, frontend-agent).

**Related:** EPIC-005, US-012-T1, US-012-T2, US-012-T3

### US-012-T1 · approved · source: plan:US-012-T1

Backend task to implement the join-team endpoint with token validation.

Implement POST /teams/join endpoint with token validation. Assigned role: backend-agent. Sub-task of US-012 (Join a team via shareable invite link).

**Related:** US-012

### US-012-T2 · approved · source: plan:US-012-T2

Backend task to redirect unauthenticated users through signup before joining.

Wire signup-then-join redirect for users without an account. Assigned role: backend-agent. Sub-task of US-012 (Join a team via shareable invite link).

**Related:** US-012

### US-012-T3 · approved · source: plan:US-012-T3

Frontend task to build the invite-acceptance page with success/invalid states.

Build invite-acceptance page with success/invalid states. Assigned role: frontend-agent. Sub-task of US-012 (Join a team via shareable invite link).

**Related:** US-012

### US-013 · approved · source: plan:US-013

Story for viewing team membership.

View team membership. Points: 2. Assigned role: frontend-agent. Part of EPIC-005 (Team Creation and Invitations).

**Related:** EPIC-005

### US-014 · approved · source: plan:US-014

Story for viewing all teammates' working hours side by side, broken into backend and frontend sub-tasks.

See all teammates' working hours side by side. Points: 8. Assigned role: backend-agent. Part of EPIC-006 (Side-by-Side Working-Hours and Overlap View). Sub-tasks: US-014-T1 (implement GET /teams/overlap aggregation endpoint, backend-agent), US-014-T2 (build side-by-side working-hours grid component, frontend-agent), US-014-T3 (handle members with no working hours set, frontend-agent).

**Related:** EPIC-006, US-014-T1, US-014-T2, US-014-T3

### US-014-T1 · approved · source: plan:US-014-T1

Backend task to implement the teams overlap aggregation endpoint.

Implement GET /teams/overlap aggregation endpoint. Assigned role: backend-agent. Sub-task of US-014 (See all teammates' working hours side by side).

**Related:** US-014

### US-014-T2 · approved · source: plan:US-014-T2

Frontend task to build the side-by-side working-hours grid component.

Build side-by-side working-hours grid component. Assigned role: frontend-agent. Sub-task of US-014 (See all teammates' working hours side by side).

**Related:** US-014

### US-014-T3 · approved · source: plan:US-014-T3

Frontend task to handle teammates who have no working hours set.

Handle members with no working hours set. Assigned role: frontend-agent. Sub-task of US-014 (See all teammates' working hours side by side).

**Related:** US-014

### US-015 · approved · source: plan:US-015

Story for displaying each teammate's hours in local time.

See each teammate's hours in local time. Points: 5. Assigned role: frontend-agent. Part of EPIC-006 (Side-by-Side Working-Hours and Overlap View).

**Related:** EPIC-006

### US-016 · approved · source: plan:US-016

Story for highlighting overlapping meeting windows, broken into computation and UI sub-tasks.

Highlight overlapping meeting windows. Points: 8. Assigned role: backend-agent. Part of EPIC-006 (Side-by-Side Working-Hours and Overlap View). Sub-tasks: US-016-T1 (implement full- and partial-overlap computation, backend-agent), US-016-T2 (add visual highlighting for overlap windows in the grid, frontend-agent), US-016-T3 (add no-full-overlap messaging, frontend-agent).

**Related:** EPIC-006, US-016-T1, US-016-T2, US-016-T3

### US-016-T1 · approved · source: plan:US-016-T1

Backend task to compute full and partial overlap windows.

Implement full- and partial-overlap computation. Assigned role: backend-agent. Sub-task of US-016 (Highlight overlapping meeting windows).

**Related:** US-016

### US-016-T2 · approved · source: plan:US-016-T2

Frontend task to visually highlight overlap windows in the grid.

Add visual highlighting for overlap windows in the grid. Assigned role: frontend-agent. Sub-task of US-016 (Highlight overlapping meeting windows).

**Related:** US-016

### US-016-T3 · approved · source: plan:US-016-T3

Frontend task to show messaging when no full overlap window exists.

Add no-full-overlap messaging. Assigned role: frontend-agent. Sub-task of US-016 (Highlight overlapping meeting windows).

**Related:** US-016

### US-017 · approved · source: plan:US-017

Story for ensuring responsive access on desktop and mobile browsers.

Responsive access on desktop and mobile browsers. Points: 3. Assigned role: frontend-agent. Part of EPIC-006 (Side-by-Side Working-Hours and Overlap View).

**Related:** EPIC-006
<!-- sdlc:auto:end narrative -->

# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-TECH-001 · approved · source: requirements:technology stack

Product owner approved a fixed technology stack for a lightweight, low-scale web app: FastAPI backend, AWS hosting, PostgreSQL database, React frontend.

- Backend: FastAPI 0.115 -- chosen for modest, well-defined APIs (accounts, one team per account, invitations, weekly hours, overlap computation) and reliable Python time-zone/DST handling. Platform default.
- Cloud: AWS -- platform default; supports managed PostgreSQL, standard web hosting, transactional email integration, low cost at low scale.
- Database: PostgreSQL 16 -- platform default; models users, one-team-per-account, memberships, and recurring weekly hours cleanly; headroom for future PTO exceptions.
- Frontend: React 19 -- platform default; handles the interactive side-by-side working-hours grid with local-time re-rendering and overlap highlighting; delivers as a responsive web app for desktop and mobile browsers, no native app.
Directive: design against exactly this stack, do not substitute.

### REQ-SVC-001 · approved · source: requirements:runtime_needs

Team invitations are sent by email via SendGrid, which requires an API key.

- Email service: SendGrid (SaaS), env var SENDGRID_API_KEY.
- Rationale: invitations are the mechanism by which people join a team; SendGrid was named in the plan and reliably delivers invite emails.
- Required API key for this app: SENDGRID_API_KEY.

**Related:** US-011

### REQ-SCOPE-001 · draft · source: requirements:out of scope

Several capabilities are explicitly excluded from this version's design and build.

Out of scope:
1. Google/Outlook calendar sync for busy/free times.
2. Proposing or confirming meeting slots, and creating saved team events/meetings (overlap view is read-only).
3. Native mobile (iOS/Android) or desktop app -- delivered only as a responsive web app.

**Related:** US-016, US-017

### EPIC-001 · draft · source: requirements:EPIC-001

Personal user accounts with email/password sign-up and sign-in give each team member an identity for tying working hours and team membership to. Assumes standard web auth and a free app with no payments.

- US-001 (critical) Sign up with email/password: account created only if email unused and password meets strength rules; password stored as hash only (AC-001, AC-002, AC-003).
- US-002 (critical) Sign in: correct credentials sign the user in; incorrect credentials give a generic failure message that doesn't reveal whether the email exists (AC-004, AC-005).
- US-003 (high) Sign out and session expiry: signing out ends the session; idle sessions expire automatically, requiring re-sign-in either way (AC-006, AC-007).

**Related:** US-001, US-002, US-003, NFR-001, NFR-002, NFR-003, NFR-004

### EPIC-002 · draft · source: requirements:EPIC-002

Each user maintains a profile with a home time zone, which anchors how their working hours are stored and shown to others. Assumes teams of roughly 2-20 people across time zones.

- US-004 (critical) Set/update home time zone: chosen from a standard list; browser suggests a default on first visit but it must be confirmed/changed before saving; changing it later recalculates the overlap view (AC-008, AC-009, AC-010).
- US-005 (medium) Display name: shown next to the user's working hours in team view; empty display name is rejected on save (AC-011, AC-012).

**Related:** US-004, US-005

### EPIC-003 · draft · source: requirements:EPIC-003

Users define a recurring weekly working-hours schedule per day, in their own time zone, as the sole source of availability. One-off exceptions, vacations, and PTO are explicitly out of scope.

- US-006 (critical) Set weekly hours per day: start/end time per weekday stored in home time zone; end time must be after start time or rejected; a day with no hours entered is non-working (AC-013, AC-014, AC-015).
- US-007 (high) Mark non-working days: marked weekday shows no hours and contributes no availability to overlaps (AC-016).
- US-008 (high) Update recurring hours: edits replace previous schedule and appear in overlap view on next load; no option exists for single-day vacation/PTO exceptions by design (AC-017, AC-018).

**Related:** US-006, US-007, US-008

### EPIC-004 · draft · source: requirements:EPIC-004

Working hours automatically adjust for daylight-saving transitions in each user's home time zone, keeping comparisons and overlaps correct year-round without manual re-entry.

- US-009 (high): Teammates always see a person's hours shifted correctly relative to their own local time after a DST transition, with no manual edit required (AC-019). When two teammates' zones transition DST on different dates, hours and overlaps for a date between those transitions reflect each zone's actual offset on that date (AC-020).

**Related:** US-009

### EPIC-005 · draft · source: requirements:EPIC-005

A user creates one team and invites others by email and shareable link; everyone who joins can see each other's working hours. Each account belongs to a single team.

- US-010 (critical) Create a team: signed-in user without a team can create one with a name and becomes its first member; creating a second team is disallowed (AC-021, AC-022).
- US-011 (high) Invite by email: sends an invite link via the email service; if the service is unavailable or the API key is missing, the user is told the email failed, can retry, and can still share the link manually (AC-023, AC-024).
- US-012 (critical) Join via invite link: valid link + signed-in, teamless account joins the team (AC-025); no account yet prompts sign-up then adds to the inviting team (AC-026); invalid/expired/overused link adds no one and shows a message (AC-027); already-teamed account cannot join a different team via link (AC-028).
- US-013 (medium) View team membership: team page lists current members with display names and home time zones (AC-029).

**Related:** US-010, US-011, US-012, US-013, NFR-005, NFR-006

### EPIC-006 · draft · source: requirements:EPIC-006

The core screen shows every teammate's working hours side by side in local time and highlights overlapping windows as the best meeting times. The view is read-only: it does not propose, confirm, or save meetings.

- US-014 (critical) Side-by-side hours: all members' working hours shown side by side across weekdays; a member with no hours set is shown as having no availability rather than omitted or erroring (AC-030, AC-031).
- US-015 (high) Local time display: each teammate's hours labelled with their home time zone and shown against a common time reference; the shared reference updates when the viewer changes their own time zone and reloads (AC-032, AC-033).
- US-016 (critical) Highlight overlaps: windows where everyone is available are visually highlighted as best meeting times; if no full overlap exists, the app clearly states this and indicates partial-overlap windows where most members are available; the screen never offers to propose/confirm/save a meeting (AC-034, AC-035, AC-036).
- US-017 (medium) Responsive access: layout adapts to mobile browsers with hours and highlights staying readable/usable; no native iOS/Android/desktop app is offered (AC-037, AC-038).

**Related:** US-014, US-015, US-016, US-017, NFR-005, NFR-007, NFR-008

### NFR-001 · draft · source: requirements:NFR-001

Security: account passwords must be stored only as hashes, never in plain text.

Ensures a signed-up user's password cannot be read back from storage. Applies to US-001 (sign-up).

**Related:** US-001

### NFR-002 · draft · source: requirements:NFR-002

Security: password strength rules must be enforced at account creation.

A weak password is rejected with a message explaining what to fix, before the account is created. Applies to US-001 (sign-up).

**Related:** US-001

### NFR-003 · draft · source: requirements:NFR-003

Security: sessions must end on sign-out and expire automatically after inactivity.

Protects accounts on shared or unattended devices; after either sign-out or idle expiry, the user must sign in again. Applies to US-003.

**Related:** US-003

### NFR-004 · draft · source: requirements:NFR-004

Security: sign-in failures must show one generic message that doesn't reveal whether an email is registered.

Applies to US-002 (sign-in).

**Related:** US-002

### NFR-005 · draft · source: requirements:NFR-005

Privacy: a person's profile details and working hours must be visible only to members of the same team.

No one outside the team can see another person's availability or time zone. Applies to US-013, US-014, US-015, US-016.

**Related:** US-013, US-014, US-015, US-016

### NFR-006 · draft · source: requirements:NFR-006

Availability: invitations must still work when the email service fails.

If the transactional email service is unavailable or its API key is missing, the user is told the email could not be sent, can retry, and can still share the invite link manually. Applies to US-011.

**Related:** US-011

### NFR-007 · draft · source: requirements:NFR-007

Compatibility: the app must be a responsive web application working on desktop and mobile browsers.

The overlap view must adapt to smaller screens, keeping all working hours and highlighted overlaps readable and usable. Applies to US-017.

**Related:** US-017

### NFR-008 · draft · source: requirements:NFR-008

Scalability: the app must comfortably support many small distributed teams of roughly 2-20 members each.

Light concurrent usage expected, no heavy real-time or high-throughput demands. Target: teams of roughly 2-20 members each. Applies to the whole system.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-11

**Capabilities in scope:** Personal user accounts and sign-in, Personal profile with home time zone, Recurring weekly working-hours schedule, Automatic daylight-saving adjustment of working hours, Create one team and join it via a shareable invite link, Side-by-side view of all teammates' working hours in local time, Highlighting of overlapping meeting windows across the team

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The backend's work is modest and well-defined: accounts, one team per account, email invitations, storing each person's weekly hours and time zone, and computing overlaps. FastAPI is a good fit for these straightforward APIs, is the platform default, and its Python ecosystem has solid, reliable time-zone and daylight-saving handling, which is central to getting your overlaps right. |
| cloud | AWS | A free, low-scale web app with no real-time or heavy-throughput needs runs comfortably and cheaply on AWS, the platform default. It gives you managed PostgreSQL, standard web hosting, and easy integration with transactional email, all with room to scale if many small teams sign up without you re-platforming. |
| database | PostgreSQL | Your data is simple and highly relational: users, one team each, memberships, and recurring weekly hours per person. PostgreSQL stores this cleanly, enforces the one-team-per-account rule reliably, and is the platform default. At a few thousand small teams it will never be stressed, and it leaves room to grow later (e.g. if you add PTO exceptions). |
| frontend | React | Your core screen is an interactive, side-by-side grid of several people's working hours, each re-rendered in the viewer's local time with overlapping windows highlighted. React handles this kind of live, data-driven view well and is the platform's default and best-supported frontend. It also delivers cleanly as the responsive web app you asked for, working across desktop and mobile browsers with no native app. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: User Accounts and Sign-In

Personal user accounts with email/password sign-up and sign-in, so each team member has an identity the app can tie working hours and team membership to. Assumption: users sign up with email and password; authentication is handled by a standard web auth mechanism. Assumption: the app is free to use, with no payments, billing, or paid tiers in this version.

### US-001: Sign up with email and password

**Priority:** critical

> As a new user, I want to create an account with my email address and a password, so that I can access the app and set up my availability.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the sign-up page and no account exists for my email | I submit a valid email and a password that meets the strength rules | my account is created, my password is stored only as a hash (never in plain text), and I am signed in |
| AC-002 | I am on the sign-up page | I submit an email that already has an account | my account is not created and I am told the email is already in use |
| AC-003 | I am on the sign-up page | I submit an invalid email format or a password that fails the strength rules | my account is not created and I see a validation message explaining what to fix |

### US-002: Sign in to an existing account

**Priority:** critical

> As a registered user, I want to sign in with my email and password, so that I can return to my profile and my team's overlap view.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I have a registered account | I submit my correct email and password | I am signed in and taken to the app |
| AC-005 | I have a registered account | I submit an incorrect email or password | I am not signed in and I see a generic failure message that does not reveal whether the email exists |

### US-003: Sign out and session expiry

**Priority:** high

> As a signed-in user, I want my session to end when I sign out and to expire on its own after a period of inactivity, so that my account stays protected on shared or unattended devices.

| ID | Given | When | Then |
|---|---|---|---|
| AC-006 | I am signed in | I choose to sign out | my session ends and I must sign in again to access the app |
| AC-007 | I am signed in and leave the app idle beyond the session timeout | I next try to use the app | my session has expired and I am required to sign in again |

## EPIC-002: Personal Profile and Home Time Zone

Each user maintains a personal profile with their home time zone, which anchors how their working hours are stored and how everyone else's hours are displayed to them in local time. Assumption: primary users are members of small distributed teams (roughly 2-20 people) working across different time zones.

### US-004: Set and update home time zone

**Priority:** critical

> As a signed-in user, I want to set and change my home time zone in my profile, so that my working hours are interpreted correctly and others see me in the right local time.

| ID | Given | When | Then |
|---|---|---|---|
| AC-008 | I am on my profile page | I select a time zone from the standard time-zone list and save | my home time zone is stored and used to interpret my working hours |
| AC-009 | I have not yet chosen a time zone | I first open my profile | a time zone is suggested from my browser but I must confirm or change it before it is saved |
| AC-010 | I later change my home time zone and save | I return to the team overlap view | my working hours are recalculated against my new time zone |

### US-005: View and edit basic profile details

**Priority:** medium

> As a signed-in user, I want to set a display name for my profile, so that teammates can recognise whose working hours they are looking at.

| ID | Given | When | Then |
|---|---|---|---|
| AC-011 | I am on my profile page | I enter a display name and save | my display name is stored and shown next to my working hours in the team view |
| AC-012 | I leave the display name empty | I save my profile | the save is rejected and I am asked to provide a display name |

## EPIC-003: Recurring Weekly Working Hours

Users define a recurring weekly working-hours schedule (e.g., start/end times per day of the week) in their own time zone, which is the sole source of availability for the overlap view. Assumption: working hours are modeled as recurring weekly schedules with automatic daylight-saving handling; one-off exceptions, vacations, and PTO are not in scope for this version.

### US-006: Set weekly working hours per day

**Priority:** critical

> As a signed-in user, I want to set the hours I am available to work for each day of the week, so that the app knows when I am available to meet.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | I am on my working-hours page | I set a start and end time for a given weekday and save | those hours are stored for that weekday in my home time zone |
| AC-014 | I am setting hours for a weekday | I enter an end time that is not after the start time | the entry is rejected and I see a validation message |
| AC-015 | I have no hours entered for a weekday | I save my schedule | that weekday is treated as non-working with no availability |

### US-007: Mark non-working days

**Priority:** high

> As a signed-in user, I want to mark certain weekdays as non-working, so that my recurring weekend or days off are not counted as available time.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I am on my working-hours page | I mark a weekday as non-working and save | that weekday shows no working hours in the team view and contributes no availability to overlaps |

### US-008: Update recurring working hours

**Priority:** high

> As a signed-in user, I want to change my weekly working hours at any time, so that the overlap view reflects my current availability.

| ID | Given | When | Then |
|---|---|---|---|
| AC-017 | I have an existing weekly schedule | I edit my hours and save | my updated hours replace the previous ones and the team overlap view reflects them the next time it is loaded |
| AC-018 | I want to record a single day's vacation or PTO | I look for an option to do so | no such option is available, because one-off exceptions, vacations, and PTO are out of scope for this version |

## EPIC-004: Automatic Daylight-Saving Adjustment

Working hours entered in a user's home time zone are automatically adjusted for daylight-saving transitions so that side-by-side comparisons and overlaps stay correct year-round without manual re-entry. Assumption: daylight-saving handling is automatic based on each person's home time zone.

### US-009: Working hours follow daylight-saving changes automatically

**Priority:** high

> As a signed-in user, I want my working hours to shift automatically when my region enters or leaves daylight saving time, so that my availability stays accurate without me re-entering anything.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | my home time zone observes daylight saving and a DST transition has occurred | a teammate in another time zone views my working hours | my hours are displayed shifted correctly relative to their local time without any manual edit by me |
| AC-020 | two teammates are in time zones whose DST transitions happen on different dates | the overlap view is calculated for a date between those transitions | each person's hours and the resulting overlaps reflect each zone's actual offset on that date |

## EPIC-005: Team Creation and Invitations

A user creates a single team and invites others to join via email and a shareable invite link; everyone who joins can see each other's working hours. Assumption: each account belongs to a single team (no multi-team membership). Assumption: invitations are sent via a transactional email service (e.g., SendGrid) requiring an API key; no SMS or push notifications.

### US-010: Create a team

**Priority:** critical

> As a signed-in user without a team, I want to create a team, so that I can invite colleagues and compare our availability.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | I am signed in and not yet in a team | I create a team with a name | the team is created, I become a member of it, and I can invite others |
| AC-022 | I am already a member of a team | I try to create another team | creation is not allowed because each account belongs to a single team in this version |

### US-011: Invite teammates by email

**Priority:** high

> As a team member, I want to invite colleagues to my team by their email address, so that they receive an invitation to join.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | I am a member of a team | I enter a colleague's email and send an invitation | an invitation email containing a join link is sent via the transactional email service |
| AC-024 | the transactional email service is unavailable or the API key is missing | I send an invitation | I am told the email could not be sent and can retry, and I can still share the invite link manually |

### US-012: Join a team via shareable invite link

**Priority:** critical

> As a invited person, I want to join a team by following its invite link, so that I can set up my availability and see the team's overlaps.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | I have a valid invite link and am signed in to an account that is not in a team | I open the link and accept | I am added to that team and can see teammates' working hours |
| AC-026 | I follow a valid invite link but do not yet have an account | I open the link | I am prompted to sign up, and after signing up I am added to the inviting team |
| AC-027 | I follow an invite link that is invalid, expired, or already used beyond its limit | I open it | I am not added to any team and I see a message that the invite is no longer valid |
| AC-028 | I am already a member of a team | I follow an invite link to a different team | I am not added, because each account belongs to a single team in this version |

### US-013: View team membership

**Priority:** medium

> As a team member, I want to see who is in my team, so that I know whose working hours appear in the overlap view.

| ID | Given | When | Then |
|---|---|---|---|
| AC-029 | I am a member of a team with other members | I open the team page | I see the list of current team members with their display names and home time zones |

## EPIC-006: Side-by-Side Working-Hours and Overlap View

The core screen shows every teammate's working hours side by side, each shown in local time, and highlights the overlapping windows that make the best meeting times. The view is read-only for overlaps: it does not propose, confirm, or save meetings. Assumption: scale is light with no heavy real-time requirements. Out of scope: calendar sync, and proposing/confirming/saving meetings.

### US-014: See all teammates' working hours side by side

**Priority:** critical

> As a team member, I want to view every teammate's working hours side by side, so that I can compare when people are available across time zones.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | my team has several members with working hours set | I open the team overlap screen | I see each member's working hours displayed side by side across the days of the week |
| AC-031 | a teammate has not set any working hours | I view the overlap screen | that teammate is shown with no availability rather than being omitted or causing an error |

### US-015: See each teammate's hours in local time

**Priority:** high

> As a team member, I want each teammate's working hours shown in their own local time, clearly labelled, so that I understand what time of day the hours represent for each person.

| ID | Given | When | Then |
|---|---|---|---|
| AC-032 | teammates are in different time zones | I view the overlap screen | each teammate's working hours are labelled with their home time zone and shown relative to a common time reference so they can be compared |
| AC-033 | I change my own home time zone | I reload the overlap screen | the shared time reference updates to reflect my new time zone |

### US-016: Highlight overlapping meeting windows

**Priority:** critical

> As a team member, I want the app to highlight the time windows where all or most teammates are within their working hours, so that I can quickly identify the best times to meet.

| ID | Given | When | Then |
|---|---|---|---|
| AC-034 | my team's working hours have at least one common window | I view the overlap screen | the windows where everyone is available are visually highlighted as the best meeting times |
| AC-035 | there is no time window where every member is available | I view the overlap screen | I am clearly told there is no full overlap, and partial-overlap windows (where most members are available) are indicated where they exist |
| AC-036 | I am looking at a highlighted overlap window | I review the screen | the app only displays the window and does not offer to propose, confirm, or save a meeting, because scheduling is out of scope in this version |

### US-017: Responsive access on desktop and mobile browsers

**Priority:** medium

> As a team member, I want to use the overlap view on both desktop and mobile browsers, so that I can check meeting times wherever I am.

| ID | Given | When | Then |
|---|---|---|---|
| AC-037 | I open the app on a mobile browser | I view the overlap screen | the layout adapts to the smaller screen and all working hours and highlighted overlaps remain readable and usable |
| AC-038 | I look for a native iOS, Android, or desktop app | I try to install one | none is offered, because the product is delivered only as a responsive web app in this version |
<!-- sdlc:auto:end epics -->

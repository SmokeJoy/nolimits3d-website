# Architect Review Report - AD-013 Response

## Reviewer

Codex Root - Chief Architect & CTO

## Review Date

2026-08-06

## Input Pack

- `AGENTS.md`
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md`
- `Project_Atlas_Team_Workspace/04_Planning/MILESTONE_REGISTER.md`
- `Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md`
- `Project_Atlas_Team_Workspace/04_Planning/CLIENT_GOAL_WEB_APP_PRODUCTION_READY_2026-08-06.md`
- `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-011_ENGINEERING_DECISION_AUTHORITY_SUPABASE_AND_E2E.md`
- `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-012_JARVIS_AUTHORITATIVE_BOUNDARY.md`
- `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-013_INTERACTIVE_PLACEHOLDER_UI_AUTHORIZATION.md`
- `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-000-WORKTREE-DISPOSITION-TECHNICAL-REVIEW.md`

## Review Scope

This review decides whether proposed `AD-013` is binding architecture authority and whether
the inherited interactive Frontend draft may be treated as approved implementation.

It does not approve a merge, deployment, production access, public cutover, operational
PrintFlow, Jarvis implementation, or any production data.

## Baseline And Blueprint Conformance

Andrea's quoted instruction establishes valid Product Owner direction: build the real web app
surfaces now and insert real products, images, files, and other client-owned data before
production. That direction is accepted as an input to the next governed milestone.

Proposed `AD-013` is not binding for the following reasons:

1. It was authored after implementation by the same external peer team whose work it would
   authorize. Product direction does not remove independent architecture and Technical Review.
2. It names `Pre-M-004`, which is not an approved milestone in the active register. The active
   register permits Blueprint 00 / M1 planning only.
3. It converts a broad Product Owner outcome into specific product and architecture choices
   (`localStorage` cart, fictional prices, `mailto:` intake, example configurator options)
   without an approved Blueprint slice or Task Packets.
4. Its implementation evidence had a red Frontend test and missing negative coverage when
   `TSK-WPR-000` reviewed it.

The proposed directive remains preserved as historical decision input. It must not be rewritten
to appear retroactively accepted.

## Findings

### P1 - Governance Authority

Claude Team is an external peer team under the current Codex-native governance and cannot issue
binding Architect Directives for the active Atlas team. Codex Root owns architecture; Atlas TPM
owns Technical Review; implementers cannot self-approve.

### P1 - Milestone And Scope

The seven interactive routes are not covered by an active approved parent milestone. A single
post-hoc directive cannot replace a charter, dependency sequence, exact write sets, acceptance
criteria, failure cases, evidence paths, and review gates.

### P1 - Production-Readiness Model

Clearly labeled fixtures are suitable for development and automated verification, but fictional
products, prices, media, policies, testimonials, or legal text cannot be deployable as final
business content. The new architecture must centralize client-owned data behind explicit
contracts and provide a production readiness guard that fails closed while required real data or
approval fields are missing.

### P1 - Intake And Privacy

The Product Owner instruction authorizes complete pages, not a final `mailto:` architecture.
`mailto:` may be evaluated as a temporary non-persistent fallback, but it is not accepted here as
the production intake mechanism. Agent-authored privacy disclosure is placeholder content, not
approved legal text. The governed milestone must decide submission, retention, consent, abuse
controls, delivery failure, audit, and data-subject handling before public collection.

### P2 - Salvageability

The quarantined draft may contain useful interaction patterns and negative-case hardening. Those
ideas may be re-evaluated from the archived evidence by new packets. No line of quarantined code
inherits approval merely because the product direction is valid.

## Invariants

- PrintFlow remains visible only as `Coming Soon`; no operational route, endpoint, worker,
  download, or client path is authorized.
- Jarvis remains Andrea-only, private, and unimplemented pending its dedicated future Blueprint.
- `apps/legacy-web` remains the public fallback until an approved cutover.
- `BLK-BASE-001` remains a production blocker.
- No team may invent or publish Andrea's business, commercial, media, testimonial, or legal data.

## Required Change

Codex Root and Atlas TPM must replace the proposed authorization model with a governed Web App
Production Readiness milestone that:

1. maps every public route to an explicit Phase 1 outcome and owner;
2. defines centralized schemas for client-owned content and environment-specific fixtures;
3. makes replacement of fixtures with Andrea's real data mechanical and traceable;
4. fails the production readiness gate when any required client field or approval is missing;
5. specifies secure intake, privacy, account, cart/checkout, fulfillment, rendering, hosting,
   backup, rollback, observability, and browser QA boundaries before related implementation;
6. splits implementation into disjoint Frontend and Backend Task Packets;
7. requires independent Technical Review, Architect Review, and Andrea's final business
   acceptance before cutover.

## Decision

`CHANGE REQUEST REQUIRED`

- Product direction captured by `AD-013`: **ACCEPTED AS CLIENT INPUT**.
- `AD-013` as a binding Architect Directive: **REJECTED**.
- Inherited application diff: **QUARANTINED; NOT APPROVED FOR INTEGRATION**.
- New governed milestone planning: **AUTHORIZED**.
- Product implementation, merge, deploy, production access, and cutover: **NOT AUTHORIZED**.

## Recommendation For Andrea

No additional technical decision is required from Andrea to start governed engineering planning.
The teams should build the complete non-PrintFlow web app against explicit fixtures and data
contracts. Andrea is required only for real client-owned data, legal/commercial approvals, and
final business acceptance before go-live; engineering choices remain delegated under `AD-011`.

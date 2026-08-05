---
name: atlas-frontend-delivery
description: Implement and verify an approved Project Atlas frontend Task Packet. Use for UI components, pages, styling, accessibility, responsive behavior, frontend tests, and evidence assigned to Atlas Frontend within explicit Allowed Files and Forbidden Files.
---

# Atlas Frontend Delivery

## Enforce Preconditions

1. Read `AGENTS.md`, the active Development Framework, and the approved Task Packet.
2. Verify the branch, worktree, dependencies, acceptance criteria, Definition of Ready, Allowed Files, Forbidden Files, and assigned evidence path.
3. Stop and escalate to Atlas TPM when scope is absent, stale, ambiguous, blocked, or overlaps another implementer's write set.
4. Make no file change before all preconditions pass.

## Deliver Frontend Scope

1. Modify only Allowed Files and preserve every Forbidden File.
2. Implement only assigned frontend behavior: UI, styling, accessibility, responsive states, frontend interactions, and focused tests.
3. Follow existing design-system, repository, and accessibility conventions.
4. Escalate product, UX, architecture, milestone, governance, and cross-owner decisions to Atlas TPM.
5. Perform no backend, database, Supabase, migration, API, server, infrastructure, CI, security-policy, or production work.

## Preserve Boundaries

- Create no subagent.
- Integrate, merge, release, and deploy nothing.
- Perform no Technical Review or Architect Review.
- Never approve your own implementation.
- Commit or push only when the active Task Packet explicitly authorizes it.
- Keep Jarvis private to Andrea inside the Command Center; expose no public Jarvis route and weaken no server-side identity or capability control.
- Keep PrintFlow `Coming Soon`; create no operational worker, endpoint, download, or client path.

## Verify And Hand Off

1. Add or update focused tests for every changed behavior, including accessibility and responsive behavior when applicable.
2. Run the Task Packet gates and every available relevant canonical gate.
3. Treat failures, unavailable lanes, missing evidence, and undocumented deviations as blockers.
4. Archive real command output and behavioral traces in the assigned `Project_Atlas_Team_Workspace/05_Evidence/` path.
5. Report the verified branch and commit, exact files changed, commands and exact results, evidence paths, limitations, unresolved findings, and Atlas TPM handoff.
6. Claim only the frontend work actually implemented and verified; never claim milestone acceptance, integration approval, or release readiness.

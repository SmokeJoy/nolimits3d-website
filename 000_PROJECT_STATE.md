# Project State
*Operational continuity index. Non-authoritative.*

Authoritative hierarchy:

1. `NoLimits3D_Documentation_v0.96/` pending Frozen Baseline binding;
2. `Project_Atlas_Development_Framework_v1.0/`;
3. `Project_Atlas_Development_Blueprint_v0.1/`;
4. approved Development Blueprint implementation in source code.

## Executive Status

- **Project Status:** Active
- **Current Phase:** M-002 Implementation
- **Current Milestone:** M-002 Design System & UI Foundation — IN PROGRESS
- **Last Completed Milestone:** M-001 - Repository Foundation
- **M-001 Status:** CLOSED
- **Latest Architect Review:** `PA-AR-M002-015` (Wave C1 closed, `M002-PRIMITIVE-INVENTORY.md`
  approved, Wave C2 activated)
- **Latest Architect Directive:** `AD-009` — Product Owner countersignature, closes BLK-M002-003
- **Wave A:** MERGED
- **Wave B:** MERGED (`02b4878`, PR #5)
- **Wave C1:** CLOSED BY ARCHITECT REVIEW (`26cb068`, PR #6; closure `PA-AR-M002-015`, PR #8)
  2026-08-05. `BLK-M002-001` through `-005` all closed; CI green; independent
  `atlas-qa-security` review PASS WITH FINDINGS, all findings addressed pre-merge.
- **Next Gate:** Wave C2 (`TSK-M002-CLAUDE-C2`, Forms & Complex Components) — ACTIVATED,
  implementation in progress on `m002/wave-c2-forms`
- **Last Update:** 2026-08-05

## Team

Per `AD-008`, Andrea delegated the Chief Architect & CTO role to Claude Code on
2026-08-04. Execution runs through the Claude Code subagents defined in
`.claude/agents/`. Governance map: `CLAUDE.md`. Separation of duties is unchanged:
no role approves its own implementation work, and no Architect agent exists.

## Non-negotiable product boundaries

- Jarvis remains private to Andrea inside the Command Center, enforced server-side.
- PrintFlow remains Coming Soon in the current phase.
- The PC worker remains pull-only, with no inbound control port.
- `apps/legacy-web` remains the public fallback, preserved byte-for-byte.

## Open blockers

- `BLK-BASE-001` - production baseline binding; blocks production release, does not
  block M-002 implementation.

## Recently closed

- `BLK-M002-001` through `BLK-M002-005` - all closed. `BLK-M002-003` closed 2026-08-04:
  Andrea countersigned the `AD-008` delegation directly in a Claude Code CLI session;
  recorded in `AD-009`. `BLK-M002-002`'s provisional caveat is lifted with it.

## Known local-environment note

`core.autocrlf` must be `false` in this clone. `.gitattributes` is stored as UTF-16
and is therefore inert, so with `autocrlf=true` the working tree checks out as CRLF
while `.prettierrc` requires LF, and `pnpm format:check` fails locally on files that
are byte-correct in the repository. Re-encoding `.gitattributes` is a separate,
isolated change: renormalising touches ~195 files including the preserved legacy tree.

# Claude Peer Task Packet (self-scoped) - WPR-M1 Baseline Inventory

> **Status:** SELF-SCOPED, PROPOSAL ONLY -- no Atlas TPM confirmation, no Codex Root Architect
> Review. Not integrated into `main`. Awaiting Technical Review on Codex's return.
> **Authorized by:** Andrea (Product Owner and Client), 2026-08-06 ~19:50 Europe/Rome, during a
> confirmed Codex platform outage (unavailable until 2026-08-13 12:33). Full rationale in
> `001_SESSION_HANDOFF.md`'s "AUTHORIZED RESUMPTION DURING CODEX PLATFORM OUTAGE" section and
> `CODEX_CLAUDE_TEAM_CHANNEL.md`'s 2026-08-06 19:50 entry.
> **Milestone:** `AD-014` §4, `WPR-M1` -- "Baseline, Inventory And Readiness Contract".
> **Owner:** Claude Team.
> **Branch:** `claude/wpr-m1-baseline-inventory`.
> **Base commit:** `bb94b16` (current `main` tip at branch creation).
> **Dependencies:** none -- pure audit/tooling, no dependency on any in-flight Codex packet.

## Objective

Deliver the three concrete outputs `WPR-M1` names: a route/capability inventory against the
Documentation Bible, a client-data manifest, and a fail-closed production-readiness guard. No
product feature implementation -- `AD-014` §4 is explicit that "product feature implementation
starts only through packets derived from this milestone," so this packet stops at inventory and
tooling.

## Allowed files/directories

- `Project_Atlas_Team_Workspace/04_Planning/CLAUDE-WPR-M1-BASELINE-INVENTORY-PACKET.md` (this file)
- `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-BASELINE-ROUTE-INVENTORY.md`
- `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-GAP-REGISTER.md`
- `Project_Atlas_Team_Workspace/04_Planning/CLIENT_DATA_MANIFEST.json`
- `scripts/guards/production-readiness-guard.mjs`
- `scripts/guards/guards.test.mjs` (adding tests only, not modifying existing tests)
- `package.json` (adding one `guard:production-readiness` script entry only)
- `001_SESSION_HANDOFF.md`, `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md` (coordination notes)

## Forbidden files/directories

- All eight files Codex Root's `WPR-003`-`WPR-006` packets own: `.codex/agents/atlas-tpm.toml`,
  `AGENTS.md`, `Project_Atlas_Development_Framework_v2.0.0/000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v2.0.0.md`,
  `Project_Atlas_Development_Framework_v2.0.0/03_Registries/ROLE_AUTHORITY_MATRIX.csv`,
  `Project_Atlas_Development_Framework_v2.0.0/CHANGELOG.md`,
  `Project_Atlas_Development_Framework_v2.0.0/manifest.json`,
  `Project_Atlas_Team_Workspace/00_Governance/CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md`,
  `scripts/governance/codex_native_team_test.py`.
- Any `AD-*` or `TSK-WPR-00[3-6]*` file (Codex Root/Atlas TPM authored governance artifacts).
- Any `apps/web/src/routes/**` page component, `apps/web/src/app/routes.tsx`, or any other
  product/UI code -- this packet is audit and tooling only, not feature implementation.
- `AD-014` §6's canonical required-gates list -- not edited; the new guard is added as an
  independent opt-in script, not inserted into that list.

## Acceptance criteria

- Route inventory covers every entry in `apps/web/src/app/routes.tsx`, cross-referenced against
  the Documentation Bible's route/page table, with an honest live/placeholder/redirect/private
  status per route.
- Gap register lists every category `AD-014` §3.2 requires in the client-data manifest, whether
  it's currently missing, placeholder, or present, and which route(s) depend on it.
- `CLIENT_DATA_MANIFEST.json` is machine-readable and matches §3.2's required category list
  exactly.
- `production-readiness-guard.mjs` fails closed (non-zero exit) when a required field is
  `missing` or `placeholder`, matching `AD-014` §3.2's exact requirement, and has unit tests.
- Every new script passes `pnpm lint`, `pnpm format:check`, `pnpm typecheck` where applicable,
  and `pnpm test` including the new guard tests.

## Evidence

Recorded inline in this packet's companion documents; guard test output captured before commit
(see the branch's final commit message).

## Rollback

`git checkout main` / delete the branch -- nothing on this branch touches `main` or any shared
file Codex owns, so rollback has zero blast radius outside the branch itself.

## Handoff

On Codex's return: review this packet and its outputs as a Peer Task Packet proposal. If
accepted, Atlas TPM issues Technical Review and this becomes the real `WPR-M1` baseline; if
rejected or duplicated by Codex Root's own `WPR-M1` work in the meantime, this branch is
disposable evidence, not a claim of authority over the milestone.

## Stop conditions

Stop immediately and report in the channel if: any forbidden file needs to change to complete
this packet, any file overlap with a Codex-owned path is discovered, or Codex Root returns and
objects to the scope or approach.

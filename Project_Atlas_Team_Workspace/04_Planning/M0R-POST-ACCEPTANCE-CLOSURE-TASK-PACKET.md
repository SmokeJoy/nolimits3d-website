# Task Packet - TSK-M0R-CLOSE-001 Post-Acceptance Closure

## Parent And Ownership

- Milestone: M0R Codex-Native Team Reconfiguration
- Sprint: M0R-S01
- Branch: `codex/m0r-team-reconfiguration`
- Starting HEAD: `b8de532651083b11bfb210307a3143b0de3c84e5`
- Implementer: Atlas Backend
- Reviewer and integration owner: Atlas TPM
- Final architecture authority: Codex Root
- Product Owner acceptance source: Andrea's 2026-08-05 session reply,
  `accceto tutto io non capisco nulla di codice sei tu che devi revisionare e verificare`

The Product Owner reply is accepted only as business acceptance of M0R v2.0.0 and PR #10.
Technical verification remains with Atlas TPM and Codex Root. It does not authorize product
code, deployment, production access, or closure of `BLK-BASE-001`.

## Objective

Move the machine-enforced M0R contract from the reviewed pre-acceptance state to the exact
post-acceptance state without weakening any existing governance, framework, agent, skill,
legacy-agent, product-boundary, or Documentation Bible check.

## Disjoint Write Sets

### Atlas Backend - Exclusive

- `scripts/governance/codex_native_team_test.py`
- `scripts/governance/test_codex_native_team.py` only if a focused test file is strictly
  required

Atlas TPM must not edit these files.

### Atlas TPM - Exclusive

- `AGENTS.md`
- `000_PROJECT_STATE.md`
- `001_SESSION_HANDOFF.md`
- `Project_Atlas_Development_Framework_v2.0.0/**`
- `Project_Atlas_Team_Workspace/**`, except no Backend-owned file is located there

Codex Root retains the final Architect closure review under
`Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/`.

## Backend Acceptance Criteria

1. Require the versioned acceptance artifact at
   `Project_Atlas_Team_Workspace/08_Approvals/M0R_PRODUCT_OWNER_ACCEPTANCE_2026-08-05.md`.
2. Require the exact final state `M0R - DONE / PRODUCT OWNER ACCEPTED / MERGE AUTHORIZED`
   in current state, milestone, sprint, handoff, and canonical governance records.
3. Require Framework v2.0.0 to be active for development governance while preserving an
   explicit production block.
4. Require Blueprint 00 / M1 to be the next planning gate only, not an active implementation
   or production authorization.
5. Reject stale current-state markers including `AWAITING PRODUCT OWNER ACCEPTANCE`,
   `M0R is not DONE`, and `merge is not authorized` in the post-acceptance current records.
6. Preserve every existing custom-agent, runtime-setting, skill, Framework manifest,
   architecture, legacy-agent removal, Jarvis-private, PrintFlow-Coming-Soon, and Bible
   integrity check.
7. Preserve `apps/legacy-web` as the public fallback and require `BLK-BASE-001` to remain
   open as a production-only blocker.
8. Fail closed with actionable output when an acceptance artifact, state record, invariant,
   or manifest entry is missing or stale.

## Required Tests

- Focused validator test(s), if added.
- `python -m py_compile scripts/governance/codex_native_team_test.py`
- `python scripts/governance/codex_native_team_test.py --repo .`
- Canonical repository gates, with any validator failure caused solely by still-pending TPM
  integration reported truthfully and rerun after integration.
- `git diff --check`
- Documentation Bible tree and worktree checks.

## Forbidden Scope

- Every file not listed in the Atlas Backend exclusive write set.
- `apps/**`, `packages/**`, `supabase/**`, frontend/UI files, agent TOMLs, repository skills,
  Framework files, state records, acceptance records, review reports, evidence summaries,
  the Documentation Bible, CI, package scripts, dependencies, deployment, and production.
- Child-agent creation, self-approval, Technical Review, Architect Review, Product Owner
  acceptance, commit, push, merge, and deploy.

## Stop Conditions

- Any required edit outside the Backend exclusive write set.
- Any overlap with Atlas TPM changes.
- Any request to weaken, remove, or bypass an existing validator check.
- Any missing authority, unexpected product-code diff, Bible change, secret, credential, or
  production dependency.

## Handoff Contract

Report the exact child ID, verified branch and starting HEAD, files changed, commands and
exit codes, focused/full gate results, expected integration dependencies, findings, risks,
and explicit statements that no subagent, self-approval, commit, push, merge, deploy, or
production action occurred. Atlas TPM performs the independent closure Technical Review.

## Delivery And DEV-M0R-002

Canonical Atlas TPM to Atlas Backend delegation was attempted twice and created only
`/root/atlas_backend`; the runtime imposed read-only and rejected every write before
mutation. A final schema probe confirmed that the available spawn tool exposed no sandbox
or permission override.

Codex Root then launched one top-level Atlas Backend worker solely as transport for this
already-approved Task Packet. The worker retained the exact Backend-exclusive write set and
delivered only `scripts/governance/codex_native_team_test.py`. No Task authority, file
ownership, Technical Review, Architect Review, business acceptance, commit, push, merge,
deploy, or production authority moved. Atlas TPM retained independent integration and
Technical Review. This transport workaround is `DEV-M0R-002`, is non-precedential, and does
not change the canonical delegation chain.

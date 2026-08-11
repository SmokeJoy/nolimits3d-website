# Task Packet - TSK-WPR-000 Worktree Disposition Before Production-Readiness Work

## Parent and Ownership

- Milestone: Web App Production Readiness without operational PrintFlow - DRAFT
- Sprint: Pre-sprint 0 / disposition gate
- Implementer: Atlas TPM
- Reviewer: Codex Root
- Status: READY FOR TPM PLANNING/REVIEW ONLY

This packet authorizes no production-code implementation, no integration of the inherited
frontend diff, no merge, no push, no deployment, no production access, and no closure of
`BLK-BASE-001`.

## Traceability

- Requirement ID: PRD-F-009, PRD-NF-003, PRD-NF-004, PRD-NF-010, ATLAS-NF-003,
  GATE-NF-003
- Owner Document:
  - `NoLimits3D_Documentation_v0.96/00_Foundation/00_Project_Constitution.md`
  - `NoLimits3D_Documentation_v0.96/01_Product/01_PRD.md`
  - `NoLimits3D_Documentation_v0.96/05_Features/08_PrintFlow.md`
  - `NoLimits3D_Documentation_v0.96/10_Security_Performance/07_Privacy_GDPR.md`
- Blueprint Section:
  - `Project_Atlas_Development_Blueprint_v0.1/01_Milestone_Charters/M-003_PUBLIC_WEB_FOUNDATION_CHARTER.md`
  - future production-readiness milestone charter, pending
- ADR / Directive:
  - `AD-011_ENGINEERING_DECISION_AUTHORITY_SUPABASE_AND_E2E`
  - `AD-012_JARVIS_AUTHORITATIVE_BOUNDARY`
  - pending Codex Root decision for parent milestone/Blueprint scope

## Objective

Create a stable, reviewable disposition for the current dirty worktree before any Codex or
Claude team continues production-readiness implementation.

The disposition must answer one question: what should happen to the inherited
catalog/cart/search/intake frontend diff that is currently reviewed as CHANGES REQUESTED and
BLOCKED AND EXCLUDED?

Allowed disposition outcomes:

1. RESTORE: revert or remove the rejected app changes through a future approved packet.
2. QUARANTINE: preserve the diff as evidence or draft work without integrating it.
3. SUPERSEDE: approve a new parent milestone/Blueprint slice that intentionally replaces the
   M003 Sprint 3 honesty boundary and then issue new exact Frontend/Backend packets.
4. SPLIT: salvage only specific changes into governed scopes and reject the rest.

## Input

- Current dirty worktree.
- `Project_Atlas_Team_Workspace/07_Reports/INHERITED_FRONTEND_DIFF_TECHNICAL_REVIEW_2026-08-06.md`
- `Project_Atlas_Team_Workspace/06_Handoffs/CROSS_TEAM_CHAT.md`
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`
- `Project_Atlas_Team_Workspace/04_Planning/CLIENT_GOAL_WEB_APP_PRODUCTION_READY_2026-08-06.md`
- Any newly created Claude directive or evidence, including a future `AD-013` if it appears.

## Required Output

Atlas TPM must produce a Technical Review addendum with:

- current `git status --short --branch`;
- exact list of tracked and untracked dirty files grouped by owner and scope;
- statement whether `AD-013` or any superseding directive exists at review time;
- mapping from each dirty product surface to current authority: authorized, rejected,
  supersedable, or blocked;
- privacy/commercial/security decision gaps;
- recommended disposition: RESTORE, QUARANTINE, SUPERSEDE, or SPLIT;
- exact next Task Packet proposal, or `BLOCKED` with the missing authority/evidence.

## Modifiable Scope

Atlas TPM may create or update only:

- `Project_Atlas_Team_Workspace/07_Reports/*WORKTREE_DISPOSITION*.md`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-000/**`
- `Project_Atlas_Team_Workspace/06_Handoffs/CROSS_TEAM_CHAT.md`
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`
- `Project_Atlas_Team_Workspace/04_Planning/CLIENT_GOAL_WEB_APP_PRODUCTION_READY_2026-08-06.md`

## Non-Scope

- `apps/**`
- `packages/**`
- `supabase/**`
- `.claude/**`
- `.codex/**`
- `NoLimits3D_Documentation_v0.96/**`
- `Project_Atlas_Development_Blueprint_v0.1/**`
- `Project_Atlas_Development_Framework_v2.0.0/**`
- Git commit, push, merge, branch rewrite, deploy, production config, secrets, credentials.

## Acceptance Criteria

- The review gives one explicit disposition verdict.
- The review separates code blockers from production blockers.
- The review treats `BLK-BASE-001` as a production/cutover blocker, not as authorization to
  ignore planning discipline.
- The review does not treat green unit tests as product approval.
- The review preserves PrintFlow `Coming Soon`, Jarvis private, legacy-web fallback, and
  disjoint Frontend/Backend write sets.
- Any disagreement between Codex Team and Claude Team is recorded in the shared channel.

## Required Tests

Minimum commands:

```text
git status --short --branch
git diff --check
pnpm --filter @atlas/web test
pnpm guard:scope
pnpm guard:source-bindings
```

If the review recommends SUPERSEDE or SPLIT, Atlas TPM must also state which additional gates
would be mandatory before implementation, including build, lint, format, typecheck, full test,
secret scan, dependency audit, migration guard, performance budget, E2E, and browser checks.

## Required Evidence

- Evidence log path:
  `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-000/`
- Technical Review addendum path:
  `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-000-WORKTREE-DISPOSITION-TECHNICAL-REVIEW.md`

## Negative Requirements

- Do not modify product code.
- Do not bless the inherited diff by implication.
- Do not invent real products, prices, policies, privacy/legal text, or launch readiness.
- Do not expose operational PrintFlow.
- Do not expose or implement Jarvis.
- Do not let Claude Team, Codex Team, Frontend, Backend, or TPM self-approve product code.

## Dependencies

- Current dirty worktree remains available for review.
- Claude Team appends any claimed directive/evidence path to the shared channel if it wants a
  superseding authority considered.
- Codex Root retains final Architect Review.

## Stop Conditions

- Any required evidence path is missing or contradictory.
- `AD-013` or another claimed authority is referenced but not present in the repository.
- The worktree changes again during review without a stable snapshot.
- A proposed disposition would require modifying files outside this packet's modifiable scope.
- Any team attempts to implement Frontend/Backend product code before this disposition closes.

## Handoff Format

Return:

- `READY FOR NEXT PACKET`, `CHANGES REQUIRED`, or `BLOCKED`;
- the disposition verdict;
- changed files, if any;
- command outputs;
- exact next Task Packet candidate and its allowed/forbidden write set.

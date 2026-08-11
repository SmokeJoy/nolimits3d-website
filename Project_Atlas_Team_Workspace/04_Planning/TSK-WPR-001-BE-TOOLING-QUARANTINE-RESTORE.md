# Task Packet - TSK-WPR-001-BE Tooling Quarantine and Restore

## Parent and Ownership

- Milestone: Web App Production Readiness without operational PrintFlow - DRAFT
- Sprint: Pre-sprint 1 / quarantine cleanup
- Implementer: Atlas Backend
- Reviewer: Atlas TPM
- Architect Review: Codex Root after TPM Technical Review
- Status: READY FOR BACKEND TOOLING QUARANTINE/RESTORE ONLY

This packet authorizes evidence-preserving cleanup of `.claude/launch.json` only. It does not
authorize product implementation, app code changes, merge, push, deployment, production access,
or closure of `BLK-BASE-001`.

## Traceability

- Upstream disposition: `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-000-WORKTREE-DISPOSITION-TECHNICAL-REVIEW.md`
- Disposition verdict: `QUARANTINE`
- Requirement IDs: GATE-NF-003, ATLAS-NF-003
- Directives in force: AD-011, AD-012

## Objective

Archive the dirty Claude tooling configuration diff and restore `.claude/launch.json` to HEAD,
without touching any app, package, Supabase, governance, or documentation file.

## Input

- Dirty `.claude/launch.json`.
- TSK-WPR-000 Technical Review and evidence.

## Required Output

- Content-addressed archive of the `.claude/launch.json` diff.
- SHA-256 manifest.
- Before/after status logs.
- Proof `.claude/launch.json` is clean against HEAD after restore.
- Handoff to Atlas TPM.

## Modifiable Scope

Atlas Backend may modify only:

- `.claude/launch.json`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/backend/**`

## Non-Scope

- `apps/**`
- `packages/**`
- `supabase/**`
- `.codex/**`
- any `.claude/**` path other than `.claude/launch.json`
- `001_SESSION_HANDOFF.md`
- `Project_Atlas_Development_Blueprint_v0.1/**`
- `Project_Atlas_Team_Workspace/01_Shared_Memory/**`
- `Project_Atlas_Team_Workspace/04_Planning/**`
- `Project_Atlas_Team_Workspace/06_Handoffs/**`
- `Project_Atlas_Team_Workspace/07_Reports/**`
- `NoLimits3D_Documentation_v0.96/**`
- Git commit, push, merge, branch rewrite, deploy, production config, secrets, credentials

## Required Procedure

1. Record `git status --short --branch`.
2. Archive the `.claude/launch.json` diff.
3. Compute and record SHA-256 for the archived diff and current file content.
4. Verify archive and checksums exist before restore.
5. Restore only `.claude/launch.json` to HEAD.
6. Record after-status and proof that `.claude/launch.json` is clean.
7. Run required tests/gates.
8. Do not edit any other file to make a test pass.

## Acceptance Criteria

- `.claude/launch.json` is clean against HEAD.
- Archive manifest allows recovery of the tooling diff.
- No product code or governance files changed.
- Command output is archived.

## Required Tests

```text
git status --short --branch
git diff --check
pnpm guard:scope
pnpm guard:source-bindings
```

`pnpm --filter @atlas/web test` is owned by the Frontend packet after Frontend restore; Backend
may report it as not run if executing independently.

## Required Evidence

- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/backend/before-status.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/backend/claude-launch.diff`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/backend/sha256-manifest.txt`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/backend/after-status.log`
- command logs for required tests/gates

## Negative Requirements

- Do not touch app code.
- Do not touch AD-013, handoff files, channels, planning files, reports, packages, Supabase, or
  documentation.
- Do not integrate or approve Claude tooling changes.
- Do not deploy or access production.

## Dependencies

- Atlas Frontend owns the separate app quarantine/restore packet.
- Atlas TPM performs independent Technical Review after Backend handoff.

## Stop Conditions

- Archive or checksum creation fails.
- Restoring `.claude/launch.json` would require touching another file.
- Any team modifies `.claude/launch.json` during this packet.
- Any unlisted file becomes part of the needed cleanup.

## Handoff Format

Return:

- `READY FOR TECHNICAL REVIEW`, `CHANGES REQUIRED`, or `BLOCKED`;
- archive manifest path;
- command outputs and exit codes;
- before/after cleanliness proof.

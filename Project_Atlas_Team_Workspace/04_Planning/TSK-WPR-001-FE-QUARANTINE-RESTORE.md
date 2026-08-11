# Task Packet - TSK-WPR-001-FE Frontend Quarantine and Restore

## Parent and Ownership

- Milestone: Web App Production Readiness without operational PrintFlow - DRAFT
- Sprint: Pre-sprint 1 / quarantine cleanup
- Implementer: Atlas Frontend
- Reviewer: Atlas TPM
- Architect Review: Codex Root after TPM Technical Review
- Status: READY FOR FRONTEND QUARANTINE/RESTORE ONLY

This packet authorizes evidence-preserving cleanup only. It does not authorize product
integration, feature implementation, selective fixes, merge, push, deployment, production
access, or closure of `BLK-BASE-001`.

## Traceability

- Upstream disposition: `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-000-WORKTREE-DISPOSITION-TECHNICAL-REVIEW.md`
- Disposition verdict: `QUARANTINE`
- Requirement IDs: PRD-F-009, PRD-NF-003, PRD-NF-004, PRD-NF-010, ATLAS-NF-003, GATE-NF-003
- Directives in force: AD-011, AD-012
- Proposed input only: AD-013, not accepted and not binding at packet issue time

## Objective

Archive the inherited Claude Team Frontend application draft with checksums and restore the
active worktree's affected `apps/web/**` files to the current HEAD state.

The goal is a clean, stable active worktree for governed production-readiness planning while
preserving recoverable evidence of the draft work for future review.

## Input

- Dirty worktree at packet start.
- TSK-WPR-000 Technical Review and evidence.
- Cross-team channels:
  - `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`
  - `Project_Atlas_Team_Workspace/06_Handoffs/CROSS_TEAM_CHAT.md`

## Required Output

- Content-addressed archive of every allowed Frontend path before restore/removal.
- SHA-256 manifest for tracked diffs and untracked files.
- Before/after status logs.
- Proof the exact allowed Frontend paths are clean against HEAD after restore/removal.
- Handoff to Atlas TPM with command output, archive manifest path, and any unavailable lane.

## Modifiable Scope

Atlas Frontend may modify only the exact paths below.

Application composition and client state:

- `apps/web/src/app/AppShell.tsx`
- `apps/web/src/data/mockCatalog.ts`
- `apps/web/src/lib/cart/CartContext.tsx`
- `apps/web/src/lib/mailtoForm.ts`

Catalog and cart:

- `apps/web/src/routes/public/pages/esplora/CatalogoPage.tsx`
- `apps/web/src/routes/public/pages/esplora/CatalogoPage.css`
- `apps/web/src/routes/public/pages/CarrelloPage.tsx`
- `apps/web/src/routes/public/pages/CarrelloPage.css`

Search:

- `apps/web/src/routes/public/pages/RicercaPage.tsx`
- `apps/web/src/routes/public/pages/RicercaPage.css`

Intake, quote and support:

- `apps/web/src/routes/public/pages/realizza/RichiediProgettoPage.tsx`
- `apps/web/src/routes/public/pages/realizza/RichiediProgettoPage.css`
- `apps/web/src/routes/public/pages/realizza/PreventivoStampa3DPage.tsx`
- `apps/web/src/routes/public/pages/realizza/PreventivoStampa3DPage.css`
- `apps/web/src/routes/public/pages/realizza/AssistenzaStampantiPage.tsx`
- `apps/web/src/routes/public/pages/realizza/AssistenzaStampantiPage.css`

Configurator:

- `apps/web/src/routes/public/pages/realizza/ConfiguratoreLanternePage.tsx`
- `apps/web/src/routes/public/pages/realizza/ConfiguratoreLanternePage.css`

Tests:

- `apps/web/src/test/remaining-sitemap-pages.test.tsx`

Evidence:

- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/frontend/**`

## Non-Scope

- `.claude/**`
- `001_SESSION_HANDOFF.md`
- `Project_Atlas_Development_Blueprint_v0.1/**`, including AD-013
- `Project_Atlas_Team_Workspace/01_Shared_Memory/**`
- `Project_Atlas_Team_Workspace/04_Planning/**`
- `Project_Atlas_Team_Workspace/06_Handoffs/**`
- `Project_Atlas_Team_Workspace/07_Reports/**`
- `packages/**`
- `supabase/**`
- `apps/legacy-web/**`
- Any `apps/web/**` path not explicitly listed in Modifiable Scope
- Git commit, push, merge, branch rewrite, deploy, production config, secrets, credentials

## Required Procedure

1. Record `git status --short --branch` before any file operation.
2. Create an evidence directory under
   `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/frontend/`.
3. Archive:
   - a binary-capable diff for the tracked Frontend paths;
   - a copy of each untracked allowed Frontend path;
   - SHA-256 checksums for every archived artifact and every untracked file content.
4. Verify the archive exists and checksums are recorded before restoring or removing anything.
5. Restore only the tracked allowed Frontend paths to HEAD.
6. Remove only the untracked allowed Frontend paths after their archive/checksum is verified.
7. Record after-status and path-specific cleanliness proof.
8. Run required tests/gates.
9. Do not change code to make a test pass.

## Acceptance Criteria

- Every listed Frontend dirty path is either clean against HEAD or absent if it was untracked.
- No unlisted path changes.
- Archive manifest allows recovery of the full draft Frontend diff.
- `AD-013` and all governance/channel files are untouched.
- Failing/passing tests are reported exactly.
- PrintFlow remains `Coming Soon`; Jarvis remains private; legacy-web remains fallback.

## Required Tests

```text
git status --short --branch
git diff --check
pnpm --filter @atlas/web test
pnpm guard:scope
pnpm guard:source-bindings
```

If a test still fails after restore, report the failure exactly and stop. Do not fix it in this
packet.

## Required Evidence

- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/frontend/before-status.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/frontend/frontend-draft.diff`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/frontend/untracked-files/`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/frontend/sha256-manifest.txt`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/frontend/after-status.log`
- command logs for every required test/gate

## Negative Requirements

- Do not integrate or approve the inherited Frontend diff.
- Do not selectively salvage or rewrite code.
- Do not edit AD-013.
- Do not touch `.claude/launch.json`.
- Do not invent business data, privacy/legal text, product capability, or launch readiness.
- Do not expose operational PrintFlow or Jarvis.

## Dependencies

- Claude Team remains paused on `apps/**`.
- Atlas Backend owns `.claude/launch.json` cleanup in a separate packet.
- Atlas TPM performs independent Technical Review after Frontend handoff.

## Stop Conditions

- Any listed path cannot be archived before restore/removal.
- Any checksum cannot be computed or verified.
- Any unlisted file would need modification.
- Worktree changes again during the packet from another team.
- Restore/removal would touch files outside Modifiable Scope.

## Handoff Format

Return:

- `READY FOR TECHNICAL REVIEW`, `CHANGES REQUIRED`, or `BLOCKED`;
- changed/restored/removed file list;
- archive manifest path;
- command outputs and exit codes;
- unresolved dirty paths after completion.

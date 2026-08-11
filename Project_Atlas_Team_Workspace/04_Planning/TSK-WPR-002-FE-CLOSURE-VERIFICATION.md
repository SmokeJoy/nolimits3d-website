# Task Packet - TSK-WPR-002-FE Frontend Quarantine Closure Verification

## Parent And Ownership

- Program: WPR - Web App Production Readiness
- Directive: AD-014
- Implementer: Atlas Frontend
- Reviewer: Atlas TPM
- Status: READY FOR EVIDENCE-ONLY VERIFICATION

This packet resolves the stopped-state disposition of `TSK-WPR-001-FE`. It authorizes no
application source write, feature implementation, restore, removal, salvage, integration,
commit, push, merge, deployment, or production access.

## Objective

Independently prove that the 19 Frontend paths quarantined by WPR-001 are clean against HEAD or
absent as required, that the archived draft remains fully recoverable, and that the required
post-cleanup gates pass from a new stable snapshot.

## Definition Of Ready

- Branch is `main` at HEAD `84bb8f7f0671cbe072608372d890262899add756` unless Atlas TPM records
  and approves a newer exact HEAD before delegation.
- WPR-001 Technical Review is `CHANGES REQUESTED` and remains unchanged.
- WPR-001 Frontend archive exists with its SHA-256 manifest.
- No dirty path exists among the 19 WPR-001 Frontend source paths.
- Claude Team remains paused on `apps/web/**`.

If any condition is false, stop and return `BLOCKED` before writing evidence.

## Modifiable Scope

Atlas Frontend may write only:

- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/frontend/**`

The 19 WPR-001 Frontend source paths are read-only verification inputs. They are not modifiable
scope in this packet.

## Forbidden Files

- `apps/**`
- `.claude/**`
- `packages/**`
- `supabase/**`
- `001_SESSION_HANDOFF.md`
- `NoLimits3D_Documentation_v0.96/**`
- `Project_Atlas_Development_Blueprint_v0.1/**`
- `Project_Atlas_Team_Workspace/01_Shared_Memory/**`
- `Project_Atlas_Team_Workspace/04_Planning/**`
- `Project_Atlas_Team_Workspace/06_Handoffs/**`
- `Project_Atlas_Team_Workspace/07_Reports/**`
- WPR-001 evidence
- Git commit, push, merge, branch rewrite, deploy, production config, secrets, credentials

## Required Procedure

1. Record branch, HEAD, `git status --short --branch`, and SHA-256 for all 19 WPR-001 Frontend
   source paths, using an explicit `ABSENT` record where applicable.
2. Compare the nine tracked paths byte-for-byte with HEAD and confirm the ten untracked paths
   remain absent.
3. Verify every WPR-001 Frontend manifest entry against the archived file content.
4. Verify the archived binary diff contains exactly the nine tracked paths and passes
   `git apply --check --cached --binary` against HEAD.
5. Verify the ten archived untracked files exist and match the WPR-001 source-content hashes.
6. Run the required commands in order and archive exact output and exit codes.
7. Recompute the 19-path fingerprint. Stop if any owned verification input changed.
8. Write a handoff to Atlas TPM. Do not approve the work.

Unrelated governance or channel files may change only if they do not alter the 19 source inputs,
WPR-001 Frontend archive, or WPR-002 Frontend evidence. Record such changes; do not treat them as
owned scope. Any change to an owned verification input or evidence path is a stop condition.

## Required Commands

```text
git status --short --branch
git diff --check
pnpm --filter @atlas/web test
pnpm guard:scope
pnpm guard:source-bindings
```

## Acceptance Criteria

- All nine tracked WPR-001 paths are byte-identical to HEAD.
- All ten WPR-001 untracked paths are absent from the active tree.
- All WPR-001 Frontend manifest artifacts pass SHA-256 verification.
- The archived binary diff applies cleanly to the HEAD index and names no unlisted path.
- Required commands pass and exact output is archived.
- No file outside WPR-002 Frontend evidence is modified by Atlas Frontend.
- No subagent is created and no self-approval occurs.

## Required Evidence

- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/frontend/before-status.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/frontend/source-fingerprint.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/frontend/archive-verification.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/frontend/path-cleanliness-proof.log`
- command logs with exit codes
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/frontend/after-fingerprint.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/frontend/handoff.md`

## Stop Conditions

- Branch or approved HEAD differs.
- Any of the 19 source inputs is dirty, missing unexpectedly, reappears unexpectedly, or changes
  during verification.
- Any WPR-001 archive artifact or manifest entry fails verification.
- Any required command fails.
- Any write outside the exact evidence path would be needed.
- Any other team writes to the Frontend inputs or this packet's evidence path.

## Handoff Verdict

Return exactly one: `READY FOR TECHNICAL REVIEW`, `CHANGES REQUIRED`, or `BLOCKED`.


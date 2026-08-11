# Task Packet - TSK-WPR-002-BE Tooling Evidence Recovery And Restore

## Parent And Ownership

- Program: WPR - Web App Production Readiness
- Directive: AD-014
- Implementer: Atlas Backend
- Reviewer: Atlas TPM
- Status: READY FOR TOOLING RECOVERY ONLY

This packet supersedes only the incomplete execution of `TSK-WPR-001-BE`. It authorizes
evidence-preserving cleanup of `.claude/launch.json` and no other product, tooling, governance,
integration, commit, push, merge, deployment, or production work.

## Objective

Create a complete PowerShell-compatible archive and SHA-256 manifest for the still-dirty
`.claude/launch.json`, verify recoverability, restore only that file to HEAD, and prove the target
and required gates are clean.

## Definition Of Ready

- Branch is `main` at HEAD `84bb8f7f0671cbe072608372d890262899add756` unless Atlas TPM records
  and approves a newer exact HEAD before delegation.
- Current `.claude/launch.json` SHA-256 is
  `9BE21E8BC90B00A6E05D561BCCD7B4B211B09922D7E511D159909A6F727E3CAB`.
- WPR-001 Backend partial archive remains read-only historical evidence.
- Claude Team remains paused on `.claude/launch.json`.

If any condition is false, stop and return `BLOCKED` before writing or restoring.

## Modifiable Scope

Atlas Backend may modify only:

- `.claude/launch.json`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/backend/**`

## Forbidden Files

- `apps/**`
- `packages/**`
- `supabase/**`
- `.codex/**`
- any `.claude/**` path other than `.claude/launch.json`
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

1. Record branch, HEAD, status, target hash, and binary diff before mutation.
2. Create a new WPR-002 content-addressed archive containing the binary diff and exact current
   file bytes.
3. Create an ASCII SHA-256 manifest. The manifest contains only hexadecimal hashes, spaces, and
   repository-relative paths, so PowerShell 5.1-compatible `-Encoding ascii` or a verified .NET
   file API is required. Do not use unsupported `Set-Content -Encoding utf8NoBOM`.
4. Verify every manifest entry by recomputing SHA-256 and verify the binary diff with
   `git apply --check --cached --binary` before restore.
5. Confirm the target hash still matches the Definition of Ready value.
6. Restore only `.claude/launch.json` to HEAD.
7. Prove the target is byte-identical to HEAD and clean in path-scoped porcelain.
8. Run the required commands in order and archive exact output and exit codes.
9. Write recovery instructions and a handoff to Atlas TPM. Do not approve the work.

Unrelated governance or channel files may change only if they do not alter `.claude/launch.json`,
WPR-001 Backend historical evidence, or WPR-002 Backend evidence. Record such changes. Any change
to an owned input or evidence path is a stop condition.

## Required Commands

```text
git status --short --branch
git diff --check
pnpm guard:scope
pnpm guard:source-bindings
```

The Frontend test lane belongs to the parallel Frontend closure-verification packet.

## Acceptance Criteria

- The WPR-002 archive contains exact recoverable target bytes and an applicable binary diff.
- Every SHA-256 manifest entry verifies.
- `.claude/launch.json` is byte-identical to HEAD and clean against HEAD.
- Required commands pass and exact output is archived.
- No file outside Backend modifiable scope is changed by Atlas Backend.
- No subagent is created and no self-approval occurs.

## Required Evidence

- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/backend/before-status.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/backend/claude-launch.diff`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/backend/claude-launch.original.json`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/backend/archive/**`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/backend/sha256-manifest.txt`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/backend/archive-verification.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/backend/recovery-instructions.md`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/backend/after-status.log`
- command logs with exit codes
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-002/backend/handoff.md`

## Stop Conditions

- Branch, approved HEAD, or target hash differs.
- Archive, manifest, checksum verification, or binary-diff applicability fails.
- Any required command fails.
- Any write outside exact modifiable scope would be needed.
- Any other team writes to `.claude/launch.json` or this packet's evidence path.

## Handoff Verdict

Return exactly one: `READY FOR TECHNICAL REVIEW`, `CHANGES REQUIRED`, or `BLOCKED`.

# Architect Directive AD-005 — Machine-Enforced Evidence Closure

> **Directive ID:** AD-005  
> **Milestone:** M-001 — Repository Foundation  
> **Owner:** ChatGPT — Chief Architect & CTO  
> **Date:** 2026-07-15  
> **Status:** BINDING / IMMEDIATE  
> **Architect verdict:** **CHANGES REQUIRED — NO PROCEED**

## 1. Purpose

Close the AD-004 evidence gap without changing the frozen Sprint Plan and without generating application code.

AD-005 installs Handoff Contract and governance tool version `1.4`. Version 1.4 introduces the response profile:

`AD-005-EVIDENCE-CLOSURE`

Gemini may no longer redefine the mandatory evidence set inside its own manifest.

## 2. Apply the package directly

Do not extract the ZIP into the repository root.

```powershell
python scripts/governance/atlas_handoff.py validate PROJECT_ATLAS_CURRENT_HANDOFF.zip
python scripts/governance/atlas_handoff.py apply PROJECT_ATLAS_CURRENT_HANDOFF.zip --execute --remove-package
```

## 3. Frozen artifacts

Do not rewrite:

- `Project_Atlas_Team_Workspace/04_Planning/M001_SPRINT_PLAN_FINAL.md`;
- Documentation Bible requirements;
- Development Playbook requirements;
- Jarvis private boundary;
- PrintFlow Coming Soon boundary.

## 4. Exact mandatory response artifacts

Create exactly these governed UTF-8 artifacts:

1. `Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-005/root_audit.json`;
2. `Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-005/tree_final_clean.txt`;
3. `Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-005/PACKAGE_VALIDATION.json`;
4. `Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_24_18_0_OFFICIAL_VERIFICATION.json`;
5. `Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_LOCAL_RUNTIME.json`;
6. `Project_Atlas_Team_Workspace/05_Evidence/M001/Planning/M001_PLAN_INTEGRITY.json`;
7. `Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_APPLICATION_LOG.json`;
8. `Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_MANIFEST.json`;
9. `Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_BOOTSTRAP_DEVIATION.md`;
10. `Project_Atlas_Team_Workspace/06_Handoffs/AD-005-RESPONSE-REPORT.md`.

Also update and include:

- `000_PROJECT_STATE.md`;
- `001_SESSION_HANDOFF.md`;
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md`;
- `Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md`;
- `Project_Atlas_Team_Workspace/04_Planning/SPRINT_REGISTER.md`;
- `Project_Atlas_Team_Workspace/06_Handoffs/HANDOFF_LOG.md`.

Do not place replacements in the AD-004 Root_Audit directory.

## 5. Evidence semantics

### 5.1 Plan integrity

Calculate SHA-256 of:

`Project_Atlas_Team_Workspace/04_Planning/M001_SPRINT_PLAN_FINAL.md`

The only accepted digest is:

`ebc30011b94258db4506fd7006a94aaeb3210bb95cdabf22b533580ecee05b01`

`M001_PLAN_INTEGRITY.json` must contain `file_path`, `expected_sha256`, `actual_sha256`, `match: true` and `status: PASS`.

### 5.2 Node official evidence

The official-verification JSON must separately record target `v24.18.0`, official sources, retrieval timestamp, release date, LTS status, official SHASUMS source and `officially_available: true`.

### 5.3 Node local evidence

Run and preserve raw outputs from:

```powershell
node --version
where.exe node
```

`NODE_LOCAL_RUNTIME.json` must contain:

- `required_version: v24.18.0`;
- actual `detected_version`;
- raw outputs;
- executable paths;
- a Boolean `compliant` consistent with the observed value.

AD-005 does not authorize a machine-wide Node installation. If the detected version remains `v23.10.0`, report it and keep `BLK-M001-007` open.

### 5.4 Historical AD-002 evidence

Copy the archived `APPLICATION_LOG.json` byte-for-byte into the canonical evidence path. Do not reconstruct a summary.

Copy the AD-002 quarantine manifest byte-for-byte and document the historical null digest of `temp_handoff/` in the required deviation record.

## 6. Required chronology

1. Apply AD-005.
2. Copy historical evidence from canonical archive/quarantine sources.
3. Create Node, plan-integrity and deviation evidence.
4. Update state/register files truthfully.
5. Create `AD-005-RESPONSE-REPORT.md`.
6. Run:

```powershell
python scripts/governance/atlas_handoff.py audit-root --profile pre-m001 --disallow-current-zip --fail-on-violations --output Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-005/root_audit.json
```

7. Generate `tree_final_clean.txt` only after all canonical files above exist.
8. Build a pre-final schema `1.4` package using `evidence_profile: AD-005-EVIDENCE-CLOSURE`.
9. Validate the closed pre-final package and save the result as `PACKAGE_VALIDATION.json` with `validation_stage: pre_final`, `validated_package_name: PROJECT_ATLAS_CURRENT_HANDOFF.zip` and `validated_schema_version: 1.4`.
10. Rebuild once to include that validation record.
11. Remove every temporary build directory.
12. Run a final immutable validation without modifying the ZIP.
13. Deliver one message and one ZIP, reporting final SHA-256 and final validation result.

## 7. Response manifest

The response package must use:

```json
{
  "schema_version": "1.4",
  "evidence_profile": "AD-005-EVIDENCE-CLOSURE"
}
```

All profile-required paths must be in `required_evidence`, `evidence`, payload manifest and ZIP.

## 8. Forbidden work

No application code, dependencies, CI/CD workflows, Supabase scaffold, Vercel integration, CODEOWNERS, Jarvis implementation, PrintFlow implementation or Node installation is authorized.

## 9. Exit conditions

AD-005 evidence closure is complete only when tool v1.4 returns `ok: true` on the immutable final ZIP.

M-001 execution remains blocked by:

- `BLK-M001-001` — verified GitHub handle;
- `BLK-M001-007` — Node runtime alignment, unless explicitly deferred;
- `BLK-M001-005` — Architect `PROCEED`.

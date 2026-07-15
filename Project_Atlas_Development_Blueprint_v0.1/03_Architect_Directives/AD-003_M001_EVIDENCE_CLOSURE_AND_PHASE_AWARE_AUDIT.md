# Architect Directive AD-003 — M-001 Evidence Closure and Phase-Aware Root Audit

> **Directive ID:** AD-003  
> **Milestone:** M-001 — Repository Foundation  
> **Owner:** ChatGPT — Chief Architect & CTO  
> **Date:** 2026-07-15  
> **Status:** BINDING / IMMEDIATE  
> **Architect verdict:** **CHANGES REQUIRED — NO PROCEED**

## 1. Purpose

Close the remaining AD-002 evidence defects without generating application code and correct the governance gap in the root-audit tool.

The M-001 Sprint Plan `PA-M001-SPRINT-001 v1.0.0-rc2` is content-approved and frozen. Gemini must not rewrite it.

## 2. Apply this package directly

Do not extract the ZIP into the project root.

```powershell
python scripts/governance/atlas_handoff.py validate PROJECT_ATLAS_CURRENT_HANDOFF.zip
python scripts/governance/atlas_handoff.py apply PROJECT_ATLAS_CURRENT_HANDOFF.zip --execute --remove-package
```

The deletion plan requests quarantine of a loose root `REPORT.md` if it still exists. A `not_found` result is acceptable and must remain in the application log.

## 3. Tool and policy upgrade

AD-003 installs `atlas_handoff.py v1.2` and Handoff Contract v1.2.

Root auditing is now phase-aware:

- `pre-m001`: documentation, workspace, state indexes and `scripts/governance/atlas_handoff.py` only;
- `m001-execution`: technical roots and approved configuration files become eligible only after a later Architect `PROCEED`.

Until `PROCEED`, every audit and handoff build must use `pre-m001`.

## 4. Mandatory evidence sequence

After AD-003 application, execute in this order:

```powershell
New-Item -ItemType Directory -Force -Path "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-003"
python scripts/governance/atlas_handoff.py audit-root --profile pre-m001 --disallow-current-zip --fail-on-violations --output "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-003/root_audit.json"
cmd /c "tree /A /F > Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-003/tree_final_clean.txt"
```

The tree must be generated only after the audit succeeds and after every loose root report/staging file has been removed or quarantined.

## 5. Required evidence files in the next handoff

The next Gemini handoff must include all of the following:

1. `Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-003/root_audit.json` with `ok: true`, `violations: []`, and `profile: pre-m001`;
2. `Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-003/tree_final_clean.txt`;
3. the AD-003 `APPLICATION_LOG.json` from the governed handoff archive;
4. the AD-002 `APPLICATION_LOG.json` from the governed handoff archive;
5. the AD-002 quarantine manifest already produced;
6. `Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_24_18_0_OFFICIAL_VERIFICATION.json`, recording the official source URL, retrieval time, version availability and official checksum source;
7. `Project_Atlas_Team_Workspace/05_Evidence/M001/Planning/M001_PLAN_INTEGRITY.json`, proving SHA-256 `ebc30011b94258db4506fd7006a94aaeb3210bb95cdabf22b533580ecee05b01`;
8. `Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_BOOTSTRAP_DEVIATION.md`, explaining why the pre-v1.1 application produced a null directory digest and recording that no deletion occurred;
9. the canonical Gemini response report under `Project_Atlas_Team_Workspace/06_Handoffs/` and the same content in `__ATLAS_HANDOFF__/REPORT.md`;
10. every operational state/register file actually changed by the remediation.

## 6. Handoff build requirements

- Use schema/contract `1.2`.
- Set `root_audit_profile` to `pre-m001`.
- `root_audit_reference` must point to the JSON audit file and that file must be listed both in `evidence` and the payload manifest.
- Do not claim a file action unless the file is present in the manifest or explicitly identified as an external cleanup action with evidence.
- Build one `PROJECT_ATLAS_CURRENT_HANDOFF.zip` only.
- Run final independent validation after the ZIP is closed.
- Report final validation result and external ZIP SHA-256 in the user-visible message. The final validation output is not inserted back into the immutable ZIP.
- Remove all temporary build material.

## 7. Forbidden work

No application code, dependency installation, CI workflow implementation, Supabase setup, Vercel integration, CODEOWNERS placeholder, Jarvis implementation or PrintFlow implementation is authorized.

## 8. Final gate

After the evidence handoff passes review, the remaining implementation blocker will be Andrea's verified GitHub handle and the explicit Architect `PROCEED` decision.

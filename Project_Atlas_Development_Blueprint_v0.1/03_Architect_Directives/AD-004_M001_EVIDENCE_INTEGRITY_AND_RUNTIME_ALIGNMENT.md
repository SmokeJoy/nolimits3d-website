# Architect Directive AD-004 — Evidence Integrity and Runtime Alignment

> **Directive ID:** AD-004  
> **Milestone:** M-001 — Repository Foundation  
> **Owner:** ChatGPT — Chief Architect & CTO  
> **Date:** 2026-07-15  
> **Status:** BINDING / IMMEDIATE  
> **Architect verdict:** **CHANGES REQUIRED — NO PROCEED**

## 1. Purpose

Correct the AD-003 response without changing the frozen M-001 Sprint Plan and without generating application code.

This directive separates:

1. official availability of the target Node.js release;
2. the runtime actually installed on the local machine;
3. compliance of the local execution environment.

No report may claim a pass when its own evidence shows a different value.

## 2. Apply this package directly

Do not extract the ZIP into the repository root.

```powershell
python scripts/governance/atlas_handoff.py validate PROJECT_ATLAS_CURRENT_HANDOFF.zip
python scripts/governance/atlas_handoff.py apply PROJECT_ATLAS_CURRENT_HANDOFF.zip --execute --remove-package
```

AD-004 installs Handoff Contract and tool version `1.3`.

## 3. Frozen artifacts

The following must not be rewritten:

- `Project_Atlas_Team_Workspace/04_Planning/M001_SPRINT_PLAN_FINAL.md`;
- Documentation Bible requirements;
- Development Playbook requirements;
- approved Jarvis and PrintFlow boundaries.

## 4. Mandatory remediation

Create the following canonical UTF-8 artifacts:

1. `Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-004/root_audit.json`;
2. `Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-004/tree_final_clean.txt`;
3. `Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-004/PACKAGE_VALIDATION.json`;
4. `Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_24_18_0_OFFICIAL_VERIFICATION.json`;
5. `Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_LOCAL_RUNTIME.json`;
6. `Project_Atlas_Team_Workspace/05_Evidence/M001/Planning/M001_PLAN_INTEGRITY.json`;
7. `Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_APPLICATION_LOG.json`;
8. `Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_MANIFEST.json`;
9. `Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_BOOTSTRAP_DEVIATION.md`;
10. `Project_Atlas_Team_Workspace/06_Handoffs/AD-004-RESPONSE-REPORT.md`.

Also include every state/register file modified during remediation.

## 5. Node evidence rules

### 5.1 Official release verification

`NODE_24_18_0_OFFICIAL_VERIFICATION.json` must record:

- target version `v24.18.0`;
- official Node.js release and archive sources;
- retrieval timestamp;
- LTS status;
- release date;
- official SHASUMS source;
- `officially_available: true`.

### 5.2 Local runtime verification

Run:

```powershell
node --version
where.exe node
```

Record raw output and executable paths in `NODE_LOCAL_RUNTIME.json`.

Set:

```json
{
  "required_version": "v24.18.0",
  "detected_version": "<actual output>",
  "compliant": true_or_false
}
```

The current evidence shows `v23.10.0`. Do not rewrite this fact.

A machine-wide installation or replacement of Node is not authorized by this evidence directive. Use an already-approved version manager only when available. Otherwise keep `BLK-M001-007` open for Andrea's decision.

## 6. Plan integrity

Calculate SHA-256 for:

`Project_Atlas_Team_Workspace/04_Planning/M001_SPRINT_PLAN_FINAL.md`

Expected digest:

```text
ebc30011b94258db4506fd7006a94aaeb3210bb95cdabf22b533580ecee05b01
```

If the digest differs:

- stop;
- do not rewrite the plan;
- report the mismatch as a hard blocker.

## 7. Evidence chronology

Use this sequence:

1. collect all historical AD-002 evidence from canonical archive/quarantine paths;
2. create official and local Node evidence;
3. create plan-integrity evidence;
4. update registers truthfully;
5. create `AD-004-RESPONSE-REPORT.md`;
6. run `audit-root --profile pre-m001 --disallow-current-zip --fail-on-violations`;
7. generate `tree_final_clean.txt` only after all canonical evidence exists;
8. build the single handoff ZIP from canonical paths;
9. validate the closed ZIP with tool v1.3 and save the validation output externally;
10. copy that validation JSON into the canonical path, rebuild once, then perform a final external immutable validation;
11. delete every temporary build directory;
12. deliver one message and one ZIP.

The user-visible message must state the external final ZIP SHA-256 and the final immutable validation result.

## 8. Contract v1.3 requirements

The response manifest must include:

- `canonical_report_reference`;
- `required_evidence`.

Every path in `required_evidence` must:

- be in `evidence`;
- be present in the payload manifest;
- exist in the ZIP.

The canonical report must be byte-identical to `__ATLAS_HANDOFF__/REPORT.md`.

All `.json`, `.md` and `.txt` evidence must be UTF-8.

## 9. Forbidden work

No application code, dependencies, CI/CD workflow, Supabase scaffold, Vercel integration, CODEOWNERS file, Jarvis implementation or PrintFlow implementation is authorized.

## 10. Exit conditions

AD-004 closes only when:

- all required evidence is present and mutually consistent;
- the final tree reflects the canonical evidence set;
- local Node runtime status is reported truthfully;
- Contract v1.3 validation passes.

M-001 execution remains blocked by:

- `BLK-M001-001` — verified GitHub handle;
- `BLK-M001-003` — complete evidence closure;
- `BLK-M001-007` — local Node runtime alignment, unless explicitly deferred by Architect;
- `BLK-M001-005` — explicit Architect `PROCEED`.

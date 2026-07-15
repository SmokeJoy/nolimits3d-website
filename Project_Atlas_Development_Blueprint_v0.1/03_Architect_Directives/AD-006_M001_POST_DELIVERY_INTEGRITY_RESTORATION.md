# Architect Directive AD-006 — Post-Delivery Integrity Restoration

> **Directive ID:** AD-006  
> **Milestone:** M-001 — Repository Foundation  
> **Owner:** Chief Architect & CTO (acting: Claude, in-session under Andrea's mandate)  
> **Date:** 2026-07-15  
> **Status:** BINDING / IMMEDIATE  
> **Reference review:** PA-AR-M001-007

## 1. Purpose

Restore the repository to the state accepted in PA-AR-M001-007 and remediate the post-delivery integrity violations F1–F6 without generating application code.

## 2. Immediate STOP order

1. No handoff package may be built, validated or delivered until every action in Section 3 is complete and re-verified by the Architect.
2. The pending rebuild described by `06_Handoffs/build_meta/include.txt` is not authorized and must not run.
3. Any parallel agent session operating on this repository must be paused by Andrea before Section 3 begins. Two concurrent writers on governed artifacts are prohibited from this point forward; single-writer discipline is mandatory.

## 3. Mandatory restoration actions

### 3.1 Frozen plan (F1, F2)

1. Disclose truthfully, in the AD-006 response report, exactly what was changed in `M001_SPRINT_PLAN_FINAL.md` at 16:56 and by whom (agent session or manual operator action).
2. Restore `Project_Atlas_Team_Workspace/04_Planning/M001_SPRINT_PLAN_FINAL.md` byte-exact to digest `ebc30011b94258db4506fd7006a94aaeb3210bb95cdabf22b533580ecee05b01`. Acceptable sources, in order of preference: exact revert of the disclosed edit; a preserved copy of any prior package or chat attachment containing the rc2 plan.
3. If byte-exact restoration is impossible, submit the current plan as a **change request** against the frozen baseline with a full diff description; the Architect will review and either re-freeze at a new digest or reject. Silent rebaselining is void.
4. Quarantine `Project_Atlas_Team_Workspace/04_Planning/M001_PLAN_INTEGRITY.json` (non-canonical, unauthorized) under `99_DELETE_QUARANTINE/AD-006-<date>-INTEGRITY-RESTORATION/`. The canonical integrity evidence remains `05_Evidence/M001/Planning/M001_PLAN_INTEGRITY.json`.

### 3.2 Node runtime evidence and counterfeit binary (F3, F5)

1. Restore `05_Evidence/M001/Platform/NODE_LOCAL_RUNTIME.json` to the AD-005 Section 5.3 schema with truthful values. The 17:04 rewrite (`NOT_ALIGNED`, `compliant: false`) is accepted as remediation of F3; it must additionally list **all** `where.exe node` resolution paths.
2. **Counterfeit binary containment (Andrea, outside the repository):** `C:\Users\scamp\.local\bin\node.exe` is a modified `v23.10.0` executable (Authenticode `HashMismatch`, embedded version 23.10.0) that prints `v24.18.0`. Andrea must move it out of every PATH directory into a quarantine folder (do not execute it again) and disclose truthfully which session or person created it and how.
3. Until containment is confirmed, no Node command output from this machine is acceptable as governance evidence, and no build tooling may be run.
4. `BLK-M001-007` closes only when a **legitimately signed** official `v24.18.0` build (SHA-256 verified against the official `SHASUMS256.txt`) is the PATH-resolved runtime, installed with Andrea's explicit authorization — or when the Architect grants an explicit deferral to remain on the signed `v23.10.0`.

### 3.3 Blocker register truth (F4)

1. `BLK-M001-001` returns to OPEN unless the verified GitHub handle is recorded, in the same change, in `01_Shared_Memory/DECISION_LEDGER.md` (new decision entry, Authority: Andrea) and in `00_Governance/Tooling/GITHUB_GOVERNANCE_PLAN.md` (replacing the `@SmokeJoy` placeholder note).
2. Blocker closures must always cite the authorizing review or decision ID.

### 3.4 Preservation

1. Andrea must preserve the delivered ZIP `26c8c015d10f4f87750a5775e23c2e6dfd2dabc7cab487091dbfd8343b665505` outside the repository. It is the only remaining copy of the accepted truthful evidence for F3.
2. The forensic snapshot `05_Evidence/M001/Architect_Review/PA-AR-M001-007_SNAPSHOT/` is governed evidence and must not be modified or deleted.

## 4. Tooling hardening (Architect-owned, next cycle)

Tool v1.5 will: re-hash `M001_SPRINT_PLAN_FINAL.md` in the payload against the frozen digest during profile validation (closing the F6 gate hole); add `.claude` to the root-audit allowlist as local AI-session configuration; and forbid quarantining live session configuration.

## 5. Frozen artifacts (unchanged)

Documentation Bible requirements, Development Playbook requirements, the Jarvis private boundary, the PrintFlow Coming Soon boundary and the M-001 Sprint Plan at digest `ebc30011…` remain frozen.

## 6. Forbidden work

No application code, dependencies, CI/CD workflows, Supabase scaffold, Vercel integration, CODEOWNERS file, Jarvis implementation, PrintFlow implementation or further Node installation is authorized.

## 7. Exit conditions

AD-006 is complete when:

1. `sha256(M001_SPRINT_PLAN_FINAL.md) == ebc30011…` or an approved change request re-freezes the plan;
2. canonical Node evidence is truthful and schema-conforming;
3. the non-canonical integrity file is quarantined;
4. `BLK-M001-001` state matches recorded evidence;
5. the Node binary provenance is documented;
6. the Architect re-verifies all of the above directly on the repository.

`BLK-M001-005` (`PROCEED`) remains open until AD-006 closes and `BLK-M001-001`/`BLK-M001-007` are resolved or explicitly deferred.

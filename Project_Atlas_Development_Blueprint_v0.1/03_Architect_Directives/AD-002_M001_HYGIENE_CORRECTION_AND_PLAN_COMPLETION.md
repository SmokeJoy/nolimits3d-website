# Architect Directive AD-002 — M-001 Hygiene Correction and Plan Completion

> **Directive ID:** AD-002  
> **Milestone:** M-001 — Repository Foundation  
> **Owner:** ChatGPT, Chief Architect & CTO  
> **Date:** 2026-07-15  
> **Status:** BINDING / IMMEDIATE  
> **Supersedes:** only the incomplete operational portions of the Gemini handoff `M001-SPRINT-FINAL`; AD-001 and PA-DF-POL-001 remain active.

## 1. Architect verdict

**CHANGES REQUIRED — NO PROCEED.**

No application code may be generated until the AD-002 remediation handoff is reviewed and a later Architect Verdict explicitly authorizes implementation.

## 2. Apply this package without root extraction

Gemini must not run `Expand-Archive` into a project-root staging folder. Apply the package directly with the governed script:

```powershell
python scripts/governance/atlas_handoff.py validate PROJECT_ATLAS_CURRENT_HANDOFF.zip
python scripts/governance/atlas_handoff.py apply PROJECT_ATLAS_CURRENT_HANDOFF.zip --execute --remove-package
```

The current package deletion plan moves these residual root artifacts to quarantine before applying the payload:

- `tree_before.txt`;
- `tree_after.txt`;
- `temp_handoff/`.

Canonical copies of the AD-001 evidence are supplied under:

`Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-001/`

## 3. Corrected Sprint Plan

The payload replaces `Project_Atlas_Team_Workspace/04_Planning/M001_SPRINT_PLAN_FINAL.md` with the Architect-corrected version. Gemini must not rewrite or simplify it. The plan remains implementation-blocked until:

1. root cleanliness is proven;
2. the real GitHub handle is supplied;
3. the next Architect Review issues `PROCEED`.

## 4. Handoff tool correction

The payload upgrades `scripts/governance/atlas_handoff.py` to:

- audit the root against the allowlist;
- require the complete manifest schema;
- reject unsupported root-cleanliness declarations;
- compute deterministic directory tree hashes;
- validate mandatory report sections;
- build without extracting or staging inside the repository root.

Future handoffs must be built with a metadata JSON file and must pass both `audit-root` and `validate`.

## 5. Mandatory corrective sequence

Gemini must perform these actions in order:

1. validate and apply AD-002 directly, without manual extraction;
2. confirm the three residual root artifacts were moved to quarantine;
3. run `audit-root --fail-on-violations`;
4. verify the canonical evidence copies and corrected Sprint Plan;
5. verify `Node.js 24.18.0` using the official release source and record the verification evidence;
6. keep the GitHub handle blocker open unless Andrea supplies the verified username;
7. create a complete handoff metadata JSON;
8. produce a report with every mandatory section;
9. build one new `PROJECT_ATLAS_CURRENT_HANDOFF.zip` outside any repository staging folder;
10. run independent package validation;
11. delete any temporary build material outside the project;
12. return one concise message and one ZIP to Andrea.

## 6. Required contents of the next Gemini handoff

The next handoff must contain only changed/new governed files and evidence, including:

- post-AD-002 root audit JSON and tree evidence in canonical evidence paths;
- application/quarantine evidence for AD-002;
- complete package validation result;
- official Node version verification evidence;
- updated operational state/registers only where actually changed;
- no application code.

## 7. Final gate

The next Architect Review will evaluate:

- zero root violations;
- complete manifest and report contract;
- corrected M001-A through M001-F plan unchanged;
- real GitHub handle status;
- no application code.

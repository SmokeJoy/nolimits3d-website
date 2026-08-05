# Project Atlas Handoff Package Contract v1.5

## 1. Active package

Only one active package is permitted in the repository root:

`PROJECT_ATLAS_CURRENT_HANDOFF.zip`

A new package replaces the previous one. Temporary extraction directories are forbidden.

## 2. Required structure

- `__ATLAS_HANDOFF__/HANDOFF_MANIFEST.json`
- `__ATLAS_HANDOFF__/DELETION_PLAN.json`
- `__ATLAS_HANDOFF__/REPORT.md`
- `payload/<canonical repository paths>`

Every payload file must have an exact size and SHA-256 entry in the manifest.

## 3. AD-007 response profile

The evidence-rebase response must use:

- `schema_version: 1.5`
- `evidence_profile: AD-007-EVIDENCE-REBASE`
- canonical report `Project_Atlas_Team_Workspace/06_Handoffs/AD-007-RESPONSE-REPORT.md`
- canonical audit `Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-007/root_audit.json`

The plan must be byte-identical to the Architect-provided rc3 plan with SHA-256:

`4d0bfd0bc747011dcb3bef3e3e87472c23ff12815b6f1952c0c87c7855ebf219`

## 4. Evidence truthfulness

Narrative claims must be supported by payload evidence. Package validation must target the pre-final package and the immutable final package must be validated again without rebuilding.

## 5. Root hygiene

The `pre-m001` audit must use `--disallow-current-zip` and return zero violations. Uncertain files are quarantined, not deleted.

## 6. Machine changes

AI machine changes are governed by `AI_MACHINE_CHANGE_CONTROL_POLICY.md`. AD-007 permits read-only toolchain commands only.

## 7. Authority

A valid package does not self-authorize implementation. Only an explicit Codex Root Architect
verdict can issue `PROCEED`; Atlas TPM may issue Technical Review only.

## 8. M0R Codex-Native Handoffs

The canonical chain is `Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`.
Implementer handoffs must name the Task Packet, exact write set, changed files, commands,
exit codes, evidence, deviations, blockers, and a statement that no child agent or
self-approval was used.

`DEV-M0R-001` permits direct Root-to-implementer launch for initial bootstrap only because
the first TPM subagent lacked multi-agent tools. It does not satisfy RBT-02 and cannot be
reused as the normal handoff route.

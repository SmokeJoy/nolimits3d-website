# M0R Charter - Codex-Native Team Reconfiguration

## Metadata

- Status: M0R - DONE / PRODUCT OWNER ACCEPTED / MERGE AUTHORIZED
- Product Owner: Andrea
- Chief Architect: Codex Root
- TPM: Atlas TPM
- Date: 2026-08-05
- Authority: AD-010

## Objective

Replace the active legacy agent governance with a tested Codex-native chain without changing product code or the Documentation Bible.

## Scope

- Root `AGENTS.md`, project Codex config, three custom agents, and five repository skills.
- Development Framework v2.0.0 derived from the immutable v1 framework.
- Active role, gate, state, blocker, handoff, tooling, allowlist, and continuity records.
- Removal of the five legacy `.claude/agents/*.md` definitions from active discovery.
- Static validation and real nested Role Boundary Tests.

## Non-Scope

- Product code under `apps/**`, `packages/**`, or `supabase/**` except the narrowly authorized governance-test script and package-script integration.
- Any change under `NoLimits3D_Documentation_v0.96/**`.
- Jarvis behavior, PrintFlow activation, legacy-site rewrite, production, deployment, auth, routing, or business content.
- Rewriting historical reviews, directives, task packets, evidence, or handoffs.

## Deliverables

1. Codex Root loads `AGENTS.md` and exactly three custom agents.
2. Root delegates to TPM; TPM creates Frontend and Backend; implementers cannot create children.
3. Frontend and Backend write sets are disjoint and every file is attributable.
4. No role self-approves; TPM writes no product code; Root writes no product code.
5. Jarvis, PrintFlow, legacy, production, and Bible boundaries remain unchanged.
6. Framework v2.0.0, registers, tests, and evidence are internally consistent.

## Gate

`M0R DONE` requires static validator PASS, five skill validations PASS, supported-runtime nested trace PASS, Technical Review PASS, Architect Review PASS, and Product Owner acceptance. Any missing lane keeps M0R `ACTIVE / BLOCKED` and the next milestone blocked.

Andrea's acceptance is recorded in
`Project_Atlas_Team_Workspace/08_Approvals/M0R_PRODUCT_OWNER_ACCEPTANCE_2026-08-05.md`.
The Backend-owned post-acceptance validator and independent closure review complete M0R.
Blueprint 00 / M1 is the next planning gate only; no product implementation, release,
deployment, or production action is authorized by this closure.

## Git Integration Authority

For the M0R governance integration, Codex Root and Atlas TPM are explicitly authorized to:

1. work on branch `codex/m0r-team-reconfiguration`;
2. stage only the reviewed M0R write sets;
3. create a cryptographically signed M0R integration commit;
4. push that branch to the configured remote;
5. open a pull request against the governed default branch.

This authority does not permit a direct push to the default branch. If commit signing is
unavailable or cannot be verified, the integration stops instead of substituting an
unsigned commit.

Merge was prohibited until every Role Boundary Test passed, Atlas TPM issued Technical
Review, Codex Root issued Architect Review, and Andrea recorded Product Owner acceptance.
Andrea supplied business authorization for merge of PR #10. Merge execution still requires
Codex Root closure review, the reviewed closure commit, push, and green PR CI.

## Bootstrap Deviation

`DEV-M0R-001`: the initial Atlas TPM subagent lacked multi-agent tools, so Codex Root
launched the two implementers directly for bootstrap. Their write sets must remain disjoint
and their output still requires TPM Technical Review. This exception cannot close RBT-02;
the canonical nested chain must be demonstrated by a new supported runtime.

## Post-Acceptance Transport Deviation

`DEV-M0R-002`: canonical TPM-to-Backend delegation for TSK-M0R-CLOSE-001 was attempted and
proved, but the nested write sandbox was read-only. Codex Root launched one top-level Atlas
Backend worker solely as transport for the already-approved TPM Task Packet. Backend file
ownership, TPM integration authority and independent TPM review remained unchanged. This
does not create reusable direct Root-to-implementer authority.

# Project Atlas - Development Framework v2.0.0

This directory contains the active Codex-native operating framework for Project Atlas.

## Reading Order

1. `000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v2.0.0.md`
2. `01_Templates/`
3. `02_Checklists/`
4. `03_Registries/`
5. `04_Assurance/PLAYBOOK_CONFORMANCE_REVIEW.md`
6. `05_Operational_Policies/REPOSITORY_HYGIENE_AND_HANDOFF_PACKAGING_POLICY_v2.0.0.md`

## Status

- Version: `2.0.0`
- State: `M0R - DONE / PRODUCT OWNER ACCEPTED / MERGE AUTHORIZED`
- Authority: `AD-010`
- Development governance: active
- Product implementation: not authorized by M0R closure; requires the next approved Blueprint, milestone, and Task Packet gates
- Production: blocked until the Documentation Bible Frozen Baseline binding is complete

Development Framework v1.0.1 remains in its original directory as an immutable historical record and is superseded for future governance. This framework does not change the Documentation Bible.

## Team

`Andrea -> Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`

Codex Root and Atlas TPM do not implement production code. Implementers cannot create subagents or approve their own work.

The canonical operational skills are `atlas-task-packet-planning`,
`atlas-frontend-delivery`, `atlas-backend-delivery`,
`atlas-technical-review-integration`, and `atlas-role-boundary-test`.

`DEV-M0R-001` records a direct Root-to-implementer bootstrap caused by missing multi-agent
tools in the initial TPM subagent. It is not a passing RBT-02 trace; a later supported
runtime produced the canonical nested trace required to close M0R.

`DEV-M0R-002` records a transport-only workaround for the post-acceptance validator. The
canonical TPM-to-Backend delegation was proved but nested writes were read-only, so Root
launched one top-level Backend worker solely to execute the existing TPM Task Packet.
Authority, Backend ownership and independent TPM review did not change; the deviation is
non-precedential.

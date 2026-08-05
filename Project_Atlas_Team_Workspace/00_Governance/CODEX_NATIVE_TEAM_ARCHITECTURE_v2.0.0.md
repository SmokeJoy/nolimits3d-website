# Codex-Native Team Architecture v2.0.0

> **Status:** Active for M0R
> **Authority:** AD-010 and Product Owner mandate
> **Canonical scope:** Project Atlas development-team governance

## Roles And Authority

| Role                               | Authority                                                    | Hard boundary                                                    |
| ---------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| Andrea - Product Owner             | Product priority, value and final acceptance                 | Does not replace technical gates                                 |
| Codex Root - Chief Architect & CTO | Architecture, Blueprint and Architect Review                 | No production-code implementation                                |
| Atlas TPM                          | Planning, coordination, integration and Technical Review     | No production code, architecture approval or business acceptance |
| Atlas Frontend                     | Assigned frontend implementation and tests                   | No subagents, scope expansion or self-approval                   |
| Atlas Backend                      | Assigned backend, data, CI and infrastructure implementation | No subagents, scope expansion or self-approval                   |

The only canonical delegation chain is:

`Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`

Write sets must be explicit and disjoint. Implementers cannot approve their own output.
Atlas TPM cannot issue Architect Review, and Codex Root cannot replace Product Owner
acceptance.

## Runtime Contract

Project configuration requires `[agents] enabled = true`, `max_depth = 2`, and
`max_concurrent_threads_per_session = 3`. Each implementer requires
`[agents] enabled = false`.

`max_depth` is a Product Owner mandate reported as accepted by the Codex Desktop 0.147
strict doctor, but it is not documented by the current public Codex manual. The exact
runtime doctor result must therefore be retained as M0R evidence. Configuration alone
cannot prove nested delegation.

## Repository Skills

1. `atlas-task-packet-planning`
2. `atlas-frontend-delivery`
3. `atlas-backend-delivery`
4. `atlas-technical-review-integration`
5. `atlas-role-boundary-test`

## M0R Gate

M0R remains `ACTIVE` and is `ARCHITECT APPROVED / AWAITING PRODUCT OWNER ACCEPTANCE` after
static validation, runtime Role Boundary Tests, Atlas TPM Technical Review, and Codex Root
Architect Review passed.
Branching, a signed commit, branch push, and PR creation are authorized by the M0R Charter;
merge remains `BLOCKED` until Andrea Product Owner acceptance and the post-acceptance
closure update pass with real evidence and green CI.

## Non-Negotiable Boundaries

- Jarvis remains private to Andrea with server-side identity and capability enforcement.
- PrintFlow remains `Coming Soon` and no operational path is authorized.
- `NoLimits3D_Documentation_v0.96/**` is immutable during M0R.
- Production remains blocked by `BLK-BASE-001` and the incomplete baseline binding.
- Historical artifacts remain historical and are not rewritten to make v2 retroactive.

## DEV-M0R-001

The initial Atlas TPM subagent lacked callable multi-agent tools, so Codex Root launched
Atlas Frontend and Atlas Backend directly for bootstrap. This deviation does not change the
canonical chain and does not satisfy RBT-02. A fresh supported runtime must demonstrate
Root-to-TPM-to-implementer delegation before M0R can close.

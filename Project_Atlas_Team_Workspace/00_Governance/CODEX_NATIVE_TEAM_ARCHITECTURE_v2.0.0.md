# Codex-Native Team Architecture v2.0.0

> **Status:** Active Development Governance
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

## AD-015 Peer Delivery Lane

Claude Team is an independent peer delivery team, not an Atlas role, Codex agent, public service,
architecture authority, or replacement for Atlas TPM Technical Review. The only internal Codex
implementation chain remains `Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`; Claude
and its workers are never added to that chain or Codex custom-agent configuration.

Atlas TPM allocates explicit, disjoint Atlas/Claude ownership and must stop both affected tracks on
file overlap or stale-contract conflict. Every Claude implementation slice requires a pre-approved
Peer Task Packet with accountable owner, branch/worktree where supported, exact base, exact
allowed/forbidden files, dependencies, acceptance criteria, tests, evidence, rollback, handoff,
overlap check, cross-team reviewers, and one named integration owner. Claude peer review
supplements but never replaces independent Atlas TPM Technical Review. Neither team self-approves;
Codex Root Architect Review and Andrea business/visual acceptance remain separate later gates.

Claude production-code ownership is frozen until governance/framework alignment, static and Role
Boundary Test coverage, Atlas TPM `APPROVED FOR INTEGRATION`, Codex Root Architect Review approval,
and first Peer Task Packet channel acknowledgement all exist. Missing evidence or an unavailable
lane must fail closed. AD-016 governs future UI packets only: design tokens and approved primitives plus
accessibility, responsive, browser, visual, and performance evidence are required, while only
Andrea accepts subjective aesthetic impact. No UI work is authorized by this governance record.

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

Andrea Product Owner acceptance and the post-acceptance closure contract are recorded.
The canonical state is `M0R - DONE / PRODUCT OWNER ACCEPTED / MERGE AUTHORIZED`.
Framework v2.0.0 is active for development governance.

Blueprint 00 / M1 is the next planning gate only. M0R closure does not authorize product
implementation, release, deployment, or production. Merge authorization is not evidence
that a commit, push, CI run, or merge execution occurred.

## Non-Negotiable Boundaries

- `INV-JARVIS-001` is active. **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**
- Jarvis implementation requires a dedicated future Blueprint and server-side verified Andrea identity, `jarvis.use`, per-tool capability enforcement, RLS, audit, privacy/threat review and negative tests. The development team cannot be replaced or coordinated by Jarvis.
- PrintFlow remains `Coming Soon` and no operational path is authorized.
- `NoLimits3D_Documentation_v0.96/**` is immutable during M0R.
- Production remains blocked by `BLK-BASE-001` and the incomplete baseline binding.
- Historical artifacts remain historical and are not rewritten to make v2 retroactive.

## DEV-M0R-001

The initial Atlas TPM subagent lacked callable multi-agent tools, so Codex Root launched
Atlas Frontend and Atlas Backend directly for bootstrap. This deviation does not change the
canonical chain and does not satisfy RBT-02. A fresh supported runtime must demonstrate
Root-to-TPM-to-implementer delegation before M0R can close.

## DEV-M0R-002

For TSK-M0R-CLOSE-001, Atlas TPM twice launched only `/root/atlas_backend` and proved the
canonical delegation route, but the runtime imposed read-only and rejected writes before
mutation. The available spawn schema exposed no permission override. Codex Root launched a
top-level Atlas Backend worker only as transport for that already-approved Task Packet.
The worker retained the Backend write set; Atlas TPM retained integration and independent
Technical Review. No product code, architecture authority, self-approval, commit, push,
merge, deploy, or production authority moved. This deviation is closed with M0R and cannot
authorize future direct Root-to-implementer delivery.

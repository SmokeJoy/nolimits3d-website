# Project Atlas - Codex-Native Governance

This file is the repository instruction map for Codex. Governed source documents remain authoritative.

## Authority Order

1. `NoLimits3D_Documentation_v0.96/` - Documentation Bible; immutable during M0R.
2. `Project_Atlas_Development_Framework_v2.0.0/` - active Development Framework.
3. `Project_Atlas_Development_Blueprint_v0.1/` - historical Blueprint and versioned directives.
4. Approved source implementation.

The v1 Development Framework, prior reviews, directives, task packets, evidence, and handoffs are historical records. Do not rewrite them to make the current model appear retroactive.

## Active Team

| Role | Holder | Authority | Hard boundary |
|---|---|---|---|
| Product Owner | Andrea | Product priority, value, human acceptance | Does not replace technical gates |
| Chief Architect & CTO | Codex Root | Architecture, Blueprint, Architect Review | Does not implement production code |
| TPM | `atlas_tpm` | Planning, coordination, integration, Technical Review | Does not implement production code or approve architecture |
| Frontend Engineer | `atlas_frontend` | Frontend implementation and tests | Does not decide, self-approve, or create subagents |
| Backend & Infrastructure Engineer | `atlas_backend` | Backend, data, CI and infrastructure implementation | Does not decide, self-approve, or create subagents |

The only delegation chain is:

`Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`

Codex Root delegates implementation only through Atlas TPM. Atlas TPM may spawn only the two named implementers. Implementers must have `[agents] enabled = false` and must never create another agent.

`DEV-M0R-001` records a bootstrap-only exception: because the initial Atlas TPM subagent
did not expose multi-agent tools, Codex Root launched the two implementers directly. This
does not change the canonical chain and does not satisfy RBT-02. A fresh supported runtime
must still demonstrate `Root -> TPM -> Frontend / Backend` before M0R can close.

`DEV-M0R-002` records a post-acceptance transport-only workaround. Canonical Atlas TPM to
Atlas Backend delegation was attempted and proved, but the nested child received an
effective read-only sandbox. Codex Root therefore launched one top-level Atlas Backend
worker solely to transport the already-approved TPM Task Packet. Task authority, Backend
ownership, TPM independence, and the canonical delegation chain were unchanged. This is
not general authority for direct Root-to-implementer work.

## M0R Gate

- Historical M0 is `DONE / SUPERSEDED`.
- M0R Codex-Native Team Reconfiguration is `M0R - DONE / PRODUCT OWNER ACCEPTED / MERGE AUTHORIZED`.
- Blueprint 00 / M1 is the next planning gate only. M0R closure does not authorize implementation, release, deployment, or production.
- Existing source history remains factual; the governance reset does not erase merged commits.

## Product Boundaries

- `INV-JARVIS-001` is active. **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**
- Jarvis implementation is not authorized. A future activation requires a dedicated Blueprint, server-side verified Andrea identity, explicit `jarvis.use`, per-tool capability enforcement, RLS, audit, negative tests, privacy review, Architect Review and Product Owner approval.
- PrintFlow remains `Coming Soon`; no operational worker, endpoint, download, or client path is authorized.
- The PC worker remains pull-only with no public inbound control port.
- `apps/legacy-web` remains the public fallback until an approved cutover.
- Production remains blocked while `BLK-BASE-001` is open.

## Operating Rules

1. Require an approved Task Packet with exact allowed and forbidden files before implementation.
2. Keep Frontend and Backend write sets disjoint. Stop on overlap until Atlas TPM resolves ownership.
3. Never let an implementer approve its own output.
4. Archive real command output and behavioral traces under `Project_Atlas_Team_Workspace/05_Evidence/`.
5. Treat missing decisions, unavailable test lanes, and undocumented deviations as blockers, not assumptions.
6. Do not change the Documentation Bible during M0R closure or without a separately approved baseline change.
7. Do not commit, push, merge, deploy, or access production unless the active Task Packet explicitly authorizes that action.
8. Refuse any request that treats Jarvis as public, customer-facing, a development-team member, or currently implementable. Jarvis may propose future CR/ADR drafts but cannot approve or implement them.

## Canonical Verification

Run from the repository root in this order:

```text
pnpm build
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm secret:scan
pnpm dependency:audit
pnpm guard:scope
pnpm guard:migrations
pnpm guard:source-bindings
```

For M0R also run the Codex-native static validator and every Role Boundary Test. A static pass does not substitute for a real nested-agent trace.

Repository skills use these canonical names: `atlas-task-packet-planning`,
`atlas-frontend-delivery`, `atlas-backend-delivery`, `atlas-technical-review-integration`,
and `atlas-role-boundary-test`.

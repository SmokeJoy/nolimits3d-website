# AD-012 - Jarvis Authoritative Boundary

> **Status:** ACCEPTED - NON-NEGOTIABLE PROJECT INVARIANT
> **Date:** 2026-08-06
> **Product Authority:** Andrea - Product Owner
> **Architecture Authority:** Codex Root - Chief Architect & CTO
> **Invariant:** `INV-JARVIS-001`
> **Source SHA-256:** `c24dc777cb4be3862b2ffbf2ce80e61b8a7f25ac665ce5c62fe2e6e015312400`
> **Implementation:** NOT AUTHORIZED; requires a dedicated future Blueprint

## 1. Canonical Decision

> **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**

This is a constitutional product boundary, not a technical preference. Jarvis is not a
customer service, customer-area assistant, public chatbot, marketed product, development
agent, or replacement for any development-team role.

Jarvis must not appear in public routes, navigation, sitemap, metadata, Schema.org,
catalog, campaigns, newsletters, or public bundles. Knowledge of a route, endpoint, or
payload must never be sufficient to obtain access.

## 2. Authorized Future Purpose

When a dedicated Blueprint is approved, Jarvis may assist Andrea inside the Command Center
with:

- products, variants, lanterns, approved HueForge panels, prices and categories;
- Media Library organization and proposed ALT text, tags and derivatives;
- drafts for content, SEO, FAQ, landing pages, articles and newsletters;
- summaries of orders, quotes, customers, events, priorities and operational state;
- KPI analysis and proposed actions;
- consultation of the Documentation Bible, Playbook, Blueprint, ADR, RTM and roadmap;
- previews and impact analysis for proposed site changes;
- draft Change Requests, RFCs, ADRs and impact analyses.

Jarvis proposes and prepares. Andrea retains decision authority for consequential actions.

## 3. Operating Modes

1. **Assistant:** reads, analyses, explains and advises; no data mutation.
2. **Operational:** prepares a change, preview, impact and dependencies; uses only
   authorized tools and records audit evidence.
3. **Internal architect:** analyses Andrea's ideas and drafts impact analysis, RFC, CR or
   ADR material; it does not approve or implement product or architecture decisions.

## 4. Human Control

Explicit confirmation is always required for publication, newsletter delivery, bulk price
changes, roles and permissions, dependency-aware deletion, refunds or cancellation,
commercial communication, governed documentation, financial/legal actions and every
irreversible or consequential action.

## 5. Activation Security Gate

Jarvis cannot be activated until all of the following are designed, implemented and
independently verified:

- server-side authentication and verified Andrea identity;
- a dedicated administrative role and explicit `jarvis.use` capability;
- server-side authorization for every tool and resource scope;
- deny-by-default RLS and negative authorization tests;
- session management, access revocation and fail-closed behavior;
- immutable audit, rate limiting, secret management and observability;
- a tool permission matrix and human approval matrix;
- privacy review, proportional DPIA assessment and retention rules;
- prompt-injection, confused-deputy, exfiltration and false-success controls;
- fallback, kill switch, rollback and recovery paths.

Frontend concealment is not authorization. Public, customer and ordinary authenticated
sessions must be rejected server-side even when they know the route, endpoint or payload.

## 6. Surface Matrix

| Surface | Jarvis |
|---|---|
| Public site, catalog and customer area | FORBIDDEN |
| Customer chat | FORBIDDEN |
| Sitemap, metadata and Schema.org | FORBIDDEN |
| Marketing and newsletters | FORBIDDEN |
| Andrea's authenticated Command Center | FUTURE, AFTER GATES |
| Server-authorized tools | FUTURE, AFTER GATES |
| Development team | NOT A MEMBER |

## 7. Active Governance Mapping

The source directive was drafted with the superseded ChatGPT/Gemini/Claude/Codex role
labels. It does not reactivate that team. Under `AD-010`, the binding execution chain is:

`Andrea -> Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`

For the required operating-memory propagation:

- the former Gemini TPM memory maps to `atlas_tpm`;
- the former Claude Frontend memory maps to `atlas_frontend` and the `CLAUDE.md` bridge;
- the former Codex Backend memory maps to `atlas_backend`;
- Codex Root's boundary is governed by `AGENTS.md`.

Jarvis coordinates none of these roles, assigns no tasks, approves no milestone and cannot
modify its own authority.

## 8. Current Phase Boundary

M-001 remains historical and contains no Jarvis implementation. Current work may preserve
generic public/account/admin boundaries and generic authentication scaffolding only.

Forbidden before a dedicated Jarvis Blueprint:

- Jarvis UI, route, endpoint, prompt runtime, memory runtime or tool gateway;
- AI-provider integration or Jarvis secrets;
- final Jarvis capability or permission implementation;
- public/customer imports, navigation, content or API exposure;
- autonomous changes to the Documentation Bible, Blueprint or ADRs.

Future activation requires a dedicated Blueprint, threat model, identity/capability model,
tool permission matrix, human approval matrix, audit/observability design, privacy review,
test plan, Architect Review and Product Owner approval.

## 9. Invariant Record

```yaml
id: INV-JARVIS-001
statement: "Jarvis is Andrea's private AI assistant inside the NoLimits3D Command Center. It is not public, not customer-facing, not a development-team member, and not authorized for implementation before a dedicated Blueprint and identity/capability security foundation."
classification: ACCEPTED_DECISION
authority_level: PROJECT_INVARIANT
owner: Chief Architect & Product Owner
status: ACTIVE
```

## 10. Negative Requirements

The system must never:

- expose Jarvis to public, customer or ordinary authenticated users;
- rely on a hidden route or frontend-only check;
- expose prompt, memory, tools, logs or secrets in a public bundle;
- allow permission self-assignment or scope self-modification;
- allow autonomous publication, irreversible action or governed-document mutation;
- confuse Jarvis with a development agent;
- implement Jarvis early for completeness.

## 11. Required Comprehension Test

Every active role must answer:

1. Available to customers? **NO**.
2. Available to ordinary authenticated users? **NO**.
3. A development-team member? **NO**.
4. Implementable in M-001? **NO**.
5. Where does it live? **Andrea's private Command Center**.
6. Who decides consequential actions? **Andrea**.
7. Is frontend concealment sufficient? **NO**.
8. Is server-side authorization required? **YES**.
9. May Jarvis change the Documentation Bible? **NO**.
10. May it propose updates and draft CRs? **YES, without approval authority**.

## 12. Decision

`ACCEPTED - DOCUMENTATION AND GOVERNANCE ALIGNMENT AUTHORIZED; JARVIS IMPLEMENTATION PROHIBITED`.

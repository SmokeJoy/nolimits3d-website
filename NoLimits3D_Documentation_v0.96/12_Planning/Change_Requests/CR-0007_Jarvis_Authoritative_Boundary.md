# CR-0007 - Jarvis Authoritative Boundary

> **Status:** Accepted
> **Date:** 2026-08-06
> **Product Owner:** Andrea
> **Architecture Owner:** Codex Root
> **Authority:** `AD-012_JARVIS_AUTHORITATIVE_BOUNDARY.md`
> **Classification:** Constitutional / Security / Documentation

## Change

Register `INV-JARVIS-001` and align existing Owner Documents to one binding Jarvis
boundary. This CR does not add or authorize a Jarvis implementation.

## Canonical Statement

> **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**

## Impact

- Constitution: add `INV-JARVIS-001` as the binding expansion of historical `INV-002`.
- Product/architecture/admin/AI: clarify purpose, human control and future activation gate.
- Security/privacy: bind identity, capability, RLS, tool authorization, audit, negative tests
  and privacy review.
- RTM/roadmap/risk/open questions: add the dedicated Blueprint dependency and keep E-0012
  planned but inactive.
- Development governance: propagate the invariant to Codex Root, Atlas TPM, Atlas Frontend,
  Atlas Backend and the Claude compatibility bridge.

## Historical Continuity

`ADR-0020` remains byte-identical because Accepted ADRs are immutable. Its private-Jarvis
decision is consistent with this CR. The superseded Gemini/Claude/Codex team allocation is
not reactivated; active role-memory mapping follows `AD-010`.

## Implementation Gate

No Jarvis code, prompt runtime, memory runtime, route, endpoint, tool adapter, provider or
secret is authorized. Activation requires a dedicated Blueprint and the complete
identity/capability security foundation defined by `AD-012`.

## Verification

- semantic audit for public/customer/team confusion;
- canonical-statement and `INV-JARVIS-001` propagation check;
- Role Boundary comprehension test;
- Documentation Bible manifest regeneration and integrity validation;
- repository gates, with unrelated Claude work excluded from this CR's ownership claim.

## ADR Decision

No new ADR is required for this documentation alignment: `ADR-0020` already owns the
private-orchestrator architecture. A future implementation Blueprint may require new ADRs
for provider, identity, capability, memory and tool architecture choices.

# ADR-0023 — NoLimits Command Center operating model

> **Document ID:** DOC-ADR-023  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Andrea necessita un centro operativo prioritizzato, non un insieme di CRUD scollegati.

## Decision

L’amministrazione è il NoLimits Command Center: overview con code, ordini/preventivi, richieste, eventi, stock, contenuti, SEO, system health, worker status e proposte Jarvis; moduli role-aware e deep linked.

## Consequences

Riduce frammentazione e orienta all’azione. Richiede read model, priorità e UX amministrativa dedicata.

## Risks and mitigations

Dashboard stale/overload: freshness timestamp, source links, configurable queues e fallback ai moduli.

## Revisit conditions

Evoluzione organizzativa o ruoli multipli richiede revisione IA/permission.

## Links

- `12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md`;
- `12_Planning/01_ADR_Register.md`.

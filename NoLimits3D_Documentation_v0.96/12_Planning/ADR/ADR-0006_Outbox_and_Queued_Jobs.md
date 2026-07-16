# ADR-0006 — Transactional outbox and queued asynchronous work

> **Document ID:** DOC-ADR-006  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


> **Decision status:** Proposed  
> **Data:** 2026-07-15  
> **Owner:** Software Architecture  
> **CR:** CR-0001

## Context

Notifications, AI, media and STL jobs cannot reliably execute inside request transactions.

## Decision drivers

Metodo di valutazione conforme a `000_GOVERNANCE/004_ADR_POLICY.md`. Driver specifici: side effect affidabili; job lunghi; retry e idempotenza.

## Options considered

1. decisione adottata;
2. alternativa più semplice ma meno governata;
3. alternativa più distribuita/automatica con costo operativo maggiore;
4. rinvio della decisione.

## Decision

Write domain changes and outbox events atomically; dispatch to versioned queues. Workers use idempotency, retries, DLQ and correlation IDs.

## Positive consequences

- Reliable side effects
- Observable retries
- Separates request latency from heavy work

## Negative consequences

- Operational complexity
- Eventual consistency must be represented in UX

## Risks and mitigations

Mitigazione specifica: outbox lag alert, idempotency key, DLQ review e replay autorizzato. Le eccezioni vengono registrate tramite Change Request e misurate prima del riesame.

## Links

- `000_PROJECT_CHARTER.md`;
- `00_Foundation/00_Project_Constitution.md`;
- `12_Planning/Change_Requests/CR-0001_Architecture_Consolidation.md`.

## Revisit conditions

Revisit queue technology via provider ADR; preserve delivery semantics.

## v0.95.2 status note

CR-0003 non chiude integralmente questa decisione. Rimane `Proposed` fino alla validazione indicata nelle revisit conditions e nelle Open Questions.

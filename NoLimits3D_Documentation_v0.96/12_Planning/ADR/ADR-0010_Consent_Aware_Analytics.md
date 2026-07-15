# ADR-0010 — Consent-aware analytics and data minimization

> **Document ID:** DOC-ADR-010  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


> **Decision status:** Proposed  
> **Data:** 2026-07-15  
> **Owner:** Software Architecture  
> **CR:** CR-0001

## Context

Commercial measurement is needed, but the product operates in the EU and handles customer files and inquiries.

## Decision drivers

Metodo di valutazione conforme a `000_GOVERNANCE/004_ADR_POLICY.md`. Driver specifici: GDPR; necessità di misurazione; minimizzazione e consenso.

## Options considered

1. decisione adottata;
2. alternativa più semplice ma meno governata;
3. alternativa più distribuita/automatica con costo operativo maggiore;
4. rinvio della decisione.

## Decision

Use a typed measurement plan, consent gating for non-essential tracking, minimized properties and retention controls. Avoid sending file names, message content or sensitive PII to analytics.

## Positive consequences

- Measurable funnels with privacy guardrails
- Vendor portability through event abstraction

## Negative consequences

- Less data before consent
- Implementation and testing overhead

## Risks and mitigations

Mitigazione specifica: event schema allowlist, consent tests, retention e audit periodico delle proprietà. Le eccezioni vengono registrate tramite Change Request e misurate prima del riesame.

## Links

- `000_PROJECT_CHARTER.md`;
- `00_Foundation/00_Project_Constitution.md`;
- `12_Planning/Change_Requests/CR-0001_Architecture_Consolidation.md`.

## Revisit conditions

Revisit provider and consent categories with legal review; the minimization principle remains.

## v0.95.2 status note

CR-0003 non chiude integralmente questa decisione. Rimane `Proposed` fino alla validazione indicata nelle revisit conditions e nelle Open Questions.

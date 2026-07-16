# ADR-0001 — Documentation as the governing product

> **Document ID:** DOC-ADR-001  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Le decisioni approvate in CR-0003 risolvono la proposta originaria senza cambiare l’ID.

## Decision drivers

La baseline documentale approvata governa il codice; cambi significativi seguono CR, ADR, RTM e audit.

## Decision

Longevità, onboarding, auditabilità e disciplina già approvata dal Project Charter.

## Positive consequences

- rationale e tracciabilità preservati;
- riduzione del drift.

## Negative consequences

- overhead iniziale;
- richiede automazione dei gate.

## Risks and mitigations

Fast path solo per correzioni editoriali; CI documentale e debt register misurano l’overhead.

## Links

- `000_PROJECT_CHARTER.md`;
- `12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md`.

## Revisit conditions

Riesaminare solo con evidenza che i gate bloccano delivery a basso rischio.

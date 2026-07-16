# ADR-0009 — PrintFlow decoupled from Phase 1

> **Document ID:** DOC-ADR-009  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Le decisioni approvate in CR-0003 risolvono la proposta originaria senza cambiare l’ID.

## Decision drivers

Fase 1: solo pagina “In arrivo”, contenuti reali, roadmap, waitlist e download soltanto quando disponibile. Nessuna funzione operativa.

## Decision

PrintFlow non è pronto e non deve bloccare il sito.

## Positive consequences

- lancio indipendente;
- comunicazione veritiera.

## Negative consequences

- integrazione futura resta da fare.

## Risks and mitigations

Guard automatico, feature flag e adapter solo dopo CR/ADR futuro.

## Links

- `05_Features/08_PrintFlow.md`;
- `CR-0003`.

## Revisit conditions

Solo con release e contract reali PrintFlow.

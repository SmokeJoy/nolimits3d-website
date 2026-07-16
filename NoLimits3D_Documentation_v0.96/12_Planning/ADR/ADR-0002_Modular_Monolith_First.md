# ADR-0002 — Modular monolith as initial application architecture

> **Document ID:** DOC-ADR-002  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Le decisioni approvate in CR-0003 risolvono la proposta originaria senza cambiare l’ID.

## Decision drivers

La Fase 1 è un modular monolith con moduli di dominio espliciti. Worker e provider esterni sono adapter; microservizi richiedono ADR successivo.

## Decision

Team iniziale ridotto, costi, transazioni coerenti e confini futuri.

## Positive consequences

- operations semplici;
- confini chiari;
- minore costo.

## Negative consequences

- scaling indipendente limitato;
- rischio coupling interno.

## Risks and mitigations

Architecture tests, ownership dei moduli e metriche prima di estrazioni.

## Links

- `02_Architecture/01_SDS.md`;
- `02_Architecture/07_Frontend_Architecture.md`;
- `12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md`.

## Revisit conditions

Modulo con esigenze misurate di scala, sicurezza, ownership o rilascio indipendente.

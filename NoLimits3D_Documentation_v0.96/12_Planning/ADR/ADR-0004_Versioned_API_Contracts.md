# ADR-0004 — Versioned API contracts and compatibility policy

> **Document ID:** DOC-ADR-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Le decisioni approvate in CR-0003 risolvono la proposta originaria senza cambiare l’ID.

## Decision drivers

Contratti API/function versionati, error model stabile, deprecation e compatibility policy; schema condiviso dove appropriato.

## Decision

Frontend disaccoppiato, Edge Functions, worker futuro e integrazioni provider.

## Positive consequences

- riduce rotture;
- consente adapter e worker.

## Negative consequences

- maintenance di versioni;
- maggiore disciplina.

## Risks and mitigations

Contract tests, compatibility window e changelog.

## Links

- `08_Data_API/04_API_Contract.md`;
- `08_Data_API/05_API_Catalog.md`;
- `CR-0003`.

## Revisit conditions

Quando il costo di compatibilità supera il valore, con migration plan.

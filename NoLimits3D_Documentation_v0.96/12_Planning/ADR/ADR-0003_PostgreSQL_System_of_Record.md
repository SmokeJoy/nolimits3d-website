# ADR-0003 — PostgreSQL as system of record

> **Document ID:** DOC-ADR-003  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Le decisioni approvate in CR-0003 risolvono la proposta originaria senza cambiare l’ID.

## Decision drivers

Usare PostgreSQL Supabase come database durevole primario; JSONB solo controllato; binari in Storage.

## Decision

Integrità relazionale, transazioni, reporting e Supabase approvato.

## Positive consequences

- vincoli e transazioni;
- tooling maturo;
- portabilità SQL.

## Negative consequences

- migrazioni disciplinate;
- compute media esterno.

## Risks and mitigations

Migration review, RLS tests, backup/restore e query monitoring.

## Links

- `08_Data_API/01_Database_Design.md`;
- `ADR-0019`;
- `CR-0003`.

## Revisit conditions

Workload specifico non adeguatamente servito, con evidenza.

# ADR-0019 — Supabase backend architecture for Phase 1

> **Document ID:** DOC-ADR-019  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Hosting e PostgreSQL sono approvati; occorre definire i servizi backend iniziali senza introdurre server custom prematuri.

## Decision

Usare Supabase PostgreSQL, Auth, Storage, RLS ed Edge Functions; Realtime solo dove utile; API-first e adapter. Nessun Express/NestJS in Fase 1. PC Server resta Compute Worker privato.

## Consequences

Minore operations/costo, auth/data/storage integrati. Richiede disciplina RLS, quote monitoring e migration portability.

## Risks and mitigations

Lock-in/quote/security: adapter, SQL migrations, RLS tests, quota alerts e export/backup.

## Revisit conditions

Limiti misurati di Supabase, compliance, costo o requisiti non serviti.

## Links

- `12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md`;
- `12_Planning/01_ADR_Register.md`.

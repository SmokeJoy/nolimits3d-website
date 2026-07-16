# ADR-0020 — Jarvis as Andrea-only private AI orchestrator

> **Document ID:** DOC-ADR-020  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

La precedente documentazione poteva suggerire assistenti separati o pubblici. La visione approvata richiede un solo strumento interno.

## Decision

Jarvis è accessibile esclusivamente ad Andrea nel NoLimits Command Center. Orchestratore unico con tool specializzati e modalità Assistente, Operativa e Architetto. Nessun accesso pubblico/cliente o commercializzazione.

## Consequences

Esperienza unitaria, governance e privacy chiare. Riduce parallel AI personas; concentra il rischio su un boundary da hardenizzare.

## Risks and mitigations

Privilege escalation/prompt injection: defense-in-depth, tool gateway, approval, audit, kill switch e public-route guard.

## Revisit conditions

Solo un ADR futuro può ampliare utenti o superfici, con nuova threat/privacy review.

## Links

- `12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md`;
- `12_Planning/01_ADR_Register.md`.

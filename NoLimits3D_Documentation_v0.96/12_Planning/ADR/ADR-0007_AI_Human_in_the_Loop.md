# ADR-0007 — Human-in-the-loop for consequential AI actions

> **Document ID:** DOC-ADR-007  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Le decisioni approvate in CR-0003 risolvono la proposta originaria senza cambiare l’ID.

## Decision drivers

Richiedere review/conferma per pubblicazione, invio, prezzo, finanza, legal, cancellazione, permessi e azioni irreversibili. Authorization server-side.

## Decision

Jarvis privato può produrre side effect commerciali e documentali.

## Positive consequences

- accountability;
- controllo rischio;
- feedback per eval.

## Negative consequences

- latenza;
- carico operatore.

## Risks and mitigations

Risk tiers, scoped approval, audit, dry-run, kill switch.

## Links

- `07_AI/02_Jarvis_Admin.md`;
- `10_Security_Performance/04_AI_Security.md`;
- `CR-0003`.

## Revisit conditions

Per capability dopo eval, monitoring e rollback verificati.

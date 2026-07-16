# ADR-0021 — Unified Commerce Catalog

> **Document ID:** DOC-ADR-021  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

L’offerta comprende prodotti, varianti, configurabili, servizi, fiera e preventivi. Cataloghi paralleli creerebbero incoerenza.

## Decision

Un solo CatalogItem model gestisce tutte le offerte con commercial mode, availability, fulfillment, personalization, SEO e checkout rules. Sei stati commerciali visibili standardizzati.

## Consequences

Single source commerciale, ricerca/SEO coerenti e riuso media. Il modello è più ricco e richiede policy chiare.

## Risks and mitigations

Overgeneralization: subtype/configuration schema, invariants, snapshots e domain tests.

## Revisit conditions

Nuova categoria incompatibile con il modello, provata da casi reali.

## Links

- `12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md`;
- `12_Planning/01_ADR_Register.md`.

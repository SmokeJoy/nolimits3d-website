# ADR-0011 — Governed media library and derivative pipeline

> **Document ID:** DOC-ADR-011  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Le decisioni approvate in CR-0003 risolvono la proposta originaria senza cambiare l’ID.

## Decision drivers

Conservare originali, provenance/rights, derivative versionate e usage graph; asset caricati una volta e cancellazione protetta.

## Decision

Riuso, diritti, performance e decisione di Media Library centralizzata.

## Positive consequences

- consistenza;
- SEO/performance;
- protezione diritti.

## Negative consequences

- costo storage/processo editoriale.

## Risks and mitigations

Checksum, approval, derivative pipeline e dependency check.

## Links

- `06_Admin/04_Media_Library.md`;
- `02_Architecture/04_File_Storage_Strategy.md`;
- `CR-0003`.

## Revisit conditions

Profili derivative/retention cambiano, preservando provenance.

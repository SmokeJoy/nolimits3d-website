# ADR-0005 — Object storage for files and media

> **Document ID:** DOC-ADR-005  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Le decisioni approvate in CR-0003 risolvono la proposta originaria senza cambiare l’ID.

## Decision drivers

Usare Supabase Storage come provider iniziale; metadata, permessi, checksum e usage graph in PostgreSQL.

## Decision

Media, STL e derivative richiedono signed access, lifecycle e provider approvato.

## Positive consequences

- gestione binari scalabile;
- derivative e signed URL.

## Negative consequences

- consistenza cross-resource;
- quote/egress.

## Risks and mitigations

Reconciliation, checksum, lifecycle, provider adapter e monitoring quote.

## Links

- `02_Architecture/04_File_Storage_Strategy.md`;
- `06_Admin/04_Media_Library.md`;
- `ADR-0011`.

## Revisit conditions

Cambio provider preservando port contract.

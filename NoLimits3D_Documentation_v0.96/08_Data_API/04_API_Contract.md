# API Contract e Convention

> **Document ID:** DOC-DATA-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Data Architecture  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Standard
REST JSON iniziale sotto `/api/v1`; OpenAPI autorevole. Webhook separati e firmati. GraphQL solo tramite ADR.

## Convenzioni
Resource noun plurali; pagination cursor-based per liste grandi; filter/sort allowlist; idempotency key su create sensibili; ETag/version su update concorrenti.

## Error model
`type`, `title`, `status`, `detail`, `code`, `correlationId`, `fieldErrors`.

## Compatibility
Aggiunte backward-compatible nella stessa major; rimozioni dopo deprecation documentata. Changelog e contract test obbligatori.

<!-- V0952-API-CONTRACT:START -->
## Supabase/API-first profile

Le query semplici autorizzate possono usare Supabase client e RLS; i comandi privilegiati usano Edge Functions con contract versionato. Ogni endpoint/function dichiara actor, capability, input, output, error, idempotency e audit. Jarvis e worker usano namespace privati non pubblicati nella API consumer documentation.
<!-- V0952-API-CONTRACT:END -->

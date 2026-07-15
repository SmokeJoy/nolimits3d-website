# ADR-0013 — Project Atlas deployment topology

> **Document ID:** DOC-ADR-013  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Alias decisione:** ADR-001 — Hosting  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0002

## Context

NoLimits3D richiede una base a costo minimo, SEO-friendly e capace di eseguire carichi pesanti locali come slicing e G-code, senza trasformare il PC Server in un endpoint pubblico fragile.

## Decision drivers

Costo iniziale quasi nullo, semplicità operativa, rendering web moderno, PostgreSQL gestito, upload/storage, separazione dei carichi pesanti, migrazione futura e uso del dominio esistente.

## Options considered

1. hosting interamente sul PC Server;
2. piattaforma cloud completa a pagamento;
3. GitHub + Vercel Hobby + Supabase Free + PC Server worker;
4. static hosting senza backend gestito.

## Decision

Adottare:

- **GitHub** come repository e fonte autorevole;
- **Vercel Hobby** per il frontend;
- **Supabase Free** per il backend iniziale;
- **PC Server** come Compute Worker per PrintFlow, slicer, G-code e carichi pesanti;
- **`nolimits3d.store`** come dominio pubblico canonico.

Il worker opera con connessioni in uscita, job durabili, credenziali limitate e file trasferiti mediante storage/URL firmati. Il tier gratuito è una scelta di avvio e deve avere soglie di migrazione.

## Positive consequences

- costi iniziali minimi;
- ottimo workflow preview/deploy;
- database e storage gestiti;
- capacità di compute locale senza esporre il PC;
- separazione tra UX pubblica e job pesanti.

## Negative consequences

- limiti e quote dei tier gratuiti;
- worker intermittente e dipendente da energia/rete locale;
- maggiore complessità di osservabilità cross-system;
- necessità di adapter per evitare lock-in.

## Risks and mitigations

Durable jobs, lease/idempotency, worker heartbeat, backup, quota alert, provider abstraction, no service-role key nel worker/browser e runbook di migrazione.

## Links

- `02_Architecture/01_SDS.md`;
- `02_Architecture/08_Backend_Service_Design.md`;
- `11_Engineering_Operations/03_CICD_Deployment.md`;
- `12_Planning/Change_Requests/CR-0002_Atlas_Decisions.md`.

## Revisit conditions

Quote/costi o SLA non più adeguati, necessità di worker sempre disponibile, nuove region/compliance, crescita del team o limiti tecnici misurati.

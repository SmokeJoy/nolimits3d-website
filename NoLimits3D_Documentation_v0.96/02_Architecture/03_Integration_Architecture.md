# Integration Architecture

> **Document ID:** DOC-ARCH-009  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Ambito autorevole:** integrazioni tra Vercel, Supabase, PC Server e provider esterni.

## Principi

Adapter per email, pagamenti, analytics, AI, storage, corrieri, CRM, Compute Worker e PrintFlow. Il dominio dipende da interfacce interne, non dagli SDK vendor.

## Topologia approvata

```text
GitHub → CI/Preview → Vercel Frontend
                    ↘ Supabase Backend
Supabase Job Store ↔ PC Server Compute Worker → Slicer / G-code / PrintFlow
```

- Vercel comunica col backend mediante contratti tipizzati e autorizzati;
- Supabase è la fonte dati autorevole iniziale;
- il PC Server apre connessioni in uscita, reclama job con lease e pubblica risultati;
- file di input/output passano mediante storage e URL firmati, non nel payload della coda;
- il worker usa credenziali dedicate, rotazione e revoca indipendente;
- ogni job registra versione tool/profilo, checksum, log sintetico e correlation ID.

## PrintFlow

In Fase 1 nessuna dipendenza runtime pubblica. La pagina resta Coming Soon. Il Compute Worker può ospitare componenti di sviluppo o prototipi, ma non abilita implicitamente funzioni cliente. Il connettore futuro userà API versionate, webhook firmati, idempotency key e mapping stati documentato.

## Resilienza

Timeout, retry con backoff, lease, idempotency, circuit breaker per provider, dead-letter/review queue e dashboard errori. Le richieste utente non restano aperte su elaborazioni lunghe. L’offline del PC Server produce stato `queued/waiting_for_worker`, non perdita del job.

## Migration readiness

I contratti separano i servizi dai provider. Il passaggio da tier gratuiti a piani a pagamento o da PC Server a worker cloud non deve cambiare gli aggregate di dominio o gli endpoint pubblici; richiede adapter/deployment ADR e migrazione verificata.

<!-- V0952-INTEGRATION:START -->
## Integrazioni consolidate v0.95.2

- Il frontend usa Supabase SDK solo entro adapter e policy autorizzate; operazioni privilegiate passano da Edge Functions.
- Jarvis usa un tool gateway privato e non espone endpoint customer-facing.
- Payment provider, newsletter ed analytics sono adapter sostituibili; metodi manuali producono comunque eventi/audit.
- Il PC Worker apre connessioni in uscita e preleva job; nessuna integrazione pubblica dipende dal suo uptime.
- PrintFlow non ha adapter runtime attivo in Fase 1; la pagina “In arrivo” usa solo contenuto e waitlist.
<!-- V0952-INTEGRATION:END -->

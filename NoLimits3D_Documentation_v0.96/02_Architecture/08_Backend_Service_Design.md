# Backend Service Design

> **Document ID:** DOC-ARCH-008  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Backend Architecture  
> **Ambito autorevole:** servizi backend, Supabase, Edge Functions, job, scheduler e side effect.

## 1. Backend platform

La Fase 1 usa Supabase come Backend as a Service:

- PostgreSQL system of record;
- Supabase Auth;
- Supabase Storage;
- Row Level Security;
- Supabase Edge Functions;
- Realtime solo per use case misurati.

Non viene introdotto un server Express o NestJS in Fase 1. Il dominio rimane portabile attraverso repository/service adapter e contratti versionati.

## 2. Service layers

```text
Domain policy / use case
    ↓
Application service
    ↓
Repository / provider ports
    ↓
Supabase DB, Storage, Edge Functions, provider esterni
```

SQL/RLS proteggono i dati; Edge Functions gestiscono segreti, webhook, provider, idempotency, comandi amministrativi, Jarvis e operazioni multi-step.

## 3. Edge Function classes

- public controlled commands: contact/quote/newsletter;
- authenticated customer commands: cart/order/account;
- admin commands: catalog/media/publish/settings;
- provider webhooks: payment/email;
- Jarvis tool gateway: admin-only, allowlist, confirmation token;
- worker job gateway: machine identity, lease e heartbeat.

Ogni function definisce input Zod/JSON schema, auth mode, RLS interaction, idempotency, rate limit, audit e error contract.

## 4. RLS

Deny-by-default. Policy separate per public read, customer-owned rows, staff capability e service operation. Le policy vengono testate con identity matrix e non si affidano al filtering client-side.

## 5. Asynchronous work

Operazioni rapide possono usare Edge Functions. Email, derivative, webhook retry e job compute usano record durabili/outbox quando necessario. La scelta finale dell’implementazione queue/outbox resta governata da ADR-0006 `Proposed` finché non viene validata con limiti Supabase e requisiti Fase 2.

## 6. Compute Worker

Worker pull autenticato, job lease, idempotency, retry/backoff, timeout, heartbeat, capability/version e audit. Input via signed URL/quarantine; output via storage. Nessun inbound port pubblico. Hardening finale è gate prima dell’attivazione Fase 2.

## 7. Notifications and scheduler

Scheduler solo per reminder, cleanup, retry, digest e manutenzione documentati. I processi devono essere ripetibili e timezone-aware. Notifiche distinguono eventi transazionali, operativi e marketing.

## 8. Jarvis tool gateway

Un solo orchestratore privato invoca tool identificati e autorizzati. Il server risolve identity, mode, capability, risk tier, preview, approval e audit. I prompt non concedono permessi.

## 9. Requisiti

| ID | Requisito |
|---|---|
| BE-NF-001 | Supabase deve fornire PostgreSQL, Auth, Storage, RLS ed Edge Functions nella Fase 1. |
| BE-NF-002 | Ogni tabella sensibile deve avere RLS deny-by-default e test di policy. |
| BE-NF-003 | Logica privilegiata e integrazioni devono usare Edge Functions; nessun Express/NestJS in Fase 1. |
| BE-NF-004 | Il frontend deve rimanere disaccoppiato tramite contratti e adapter. |
| BE-NF-005 | Il Compute Worker deve usare un modello pull autenticato e non essere requisito di uptime del sito. |
| BE-NF-006 | Jarvis deve invocare tool solo tramite gateway server-side admin-only con audit. |

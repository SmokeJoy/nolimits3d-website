# Environment e Configuration Management

> **Document ID:** DOC-OPS-007  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Engineering Operations  
> **Ambito autorevole:** ambienti, configurazione e segreti della topologia Atlas.

## Ambienti

- local development;
- preview per pull request;
- staging/integration;
- production;
- worker local/lab con profilo dev o production esplicito.

## Provider

- GitHub: repository, CI secrets e protected environments;
- Vercel: frontend config per ambiente e domain binding;
- Supabase: progetto/branch o separazione disponibile per ambiente, schema/migration, auth/storage policy;
- PC Server: config file validato, secret store OS, tool profiles, spool temporaneo e service manager.

## Regole

Config schema validato all'avvio; segreti mai nel repository; separazione ambiente/account; dati produzione non copiati in dev senza anonimizzazione; feature flags; rotazione segreti; inventory provider; nessuna chiave amministrativa Supabase nel browser o in tool non autorizzati.

## Worker configuration

`worker_id`, environment, capability list, concurrency, directories, resource limits, backend endpoint, credential reference, heartbeat interval, accepted contract versions e tool/profile versions. Le modifiche richiedono restart controllato e audit.

<!-- V0952-ENV:START -->
## Configurazione approvata

Environment variables separate per Vercel preview/staging/prod e Supabase projects. Browser: solo anon key e public config. Edge Functions: secrets provider/service role. Jarvis config e tool allowlist non sono esposti al client pubblico. Worker usa machine credential revocabile dopo hardening.
<!-- V0952-ENV:END -->

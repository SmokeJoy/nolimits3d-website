# Disaster Recovery Runbook

> **Document ID:** DOC-OPS-006  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Engineering Operations  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


Incident commander, canali, classificazione severità, contenimento, comunicazione, restore, verifica integrità, postmortem blameless. Scenari: perdita DB, storage corrotto, provider down, credenziali compromesse, deploy difettoso, AI cost runaway.

## Scenari Atlas aggiuntivi

- PC Server spento o irraggiungibile: mantenere job durabili, mostrare coda, nessuna perdita;
- disco worker guasto: ricostruire da artifact/config e riscaricare input dallo storage;
- credenziale worker compromessa: revoca immediata, audit claim/job, rotazione;
- quota Vercel/Supabase prossima al limite: attivare guardrail, ridurre carichi non critici, migrare piano/provider secondo ADR;
- dominio/DNS: conservare record, verifica ownership e procedura rollback.

<!-- V0952-DR:START -->
## Failure boundaries

PC Worker offline non è incidente del sito pubblico. Jarvis/provider AI unavailable degrada a workflow manuale. Supabase outage blocca operazioni dinamiche ma public fallback/cache è valutato dal review gate. Compromissione Jarvis revoca sessioni/tool keys e sospende capability senza interrompere contenuti pubblici.
<!-- V0952-DR:END -->

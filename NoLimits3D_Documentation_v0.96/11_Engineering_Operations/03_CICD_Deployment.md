# CI/CD e Deployment

> **Document ID:** DOC-OPS-003  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Engineering Operations  
> **Ambito autorevole:** pipeline GitHub, Vercel, Supabase e PC Server Worker.

## Source and branches

GitHub è il repository autorevole. `main` è protetta; branch brevi e pull request obbligatorie. Ogni PR collega task/requisito e ADR quando applicabile.

## Pull request pipeline

- documentation CI e link/RTM checks;
- lint, format e typecheck;
- unit/component/contract test;
- accessibility e visual regression selettiva;
- OpenAPI/schema diff;
- migration dry run;
- SAST, secret e dependency scan;
- bundle/performance budget;
- build e Vercel preview;
- smoke test contro ambiente Supabase non produzione.

## Main / release

1. merge approvato;
2. deploy frontend Vercel;
3. migrazioni Supabase expand-first;
4. deploy/attivazione funzioni compatibili;
5. smoke test e health verification;
6. promozione feature flag;
7. evidenze release e rollback point.

## Compute Worker release

Il worker viene distribuito come artifact versionato con checksum. Aggiornamento manuale o orchestrato con:

- drain dei job;
- backup configurazione;
- installazione atomica;
- self-test tool/profili;
- heartbeat con nuova versione;
- rollback all’artifact precedente.

Un worker non compatibile non può reclamare job con contract version sconosciuta.

## Rollback

Frontend: rollback deployment Vercel. Backend: feature flag/function rollback e migrazione compatibile; nessun down migration distruttivo automatico. Worker: artifact precedente e requeue dei job non conclusi.

## Domain

`nolimits3d.store` è il dominio canonico. Preview e ambienti interni non devono essere indicizzabili né inviare email commerciali reali.

<!-- V0952-CICD:START -->
## Pipeline stack/Supabase

PR: typecheck, lint, unit, component, RLS tests, migration dry-run, documentation CI, build Vite e preview Vercel. Main: migration gate, Edge Functions deploy, Vercel production e smoke test. Review Gate: pipeline comparativa React/Vite–Next.js prima del freeze. Worker deployment è separato e vietato prima del hardening gate.
<!-- V0952-CICD:END -->

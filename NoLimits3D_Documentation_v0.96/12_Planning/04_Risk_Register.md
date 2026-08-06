# Risk Register

> **Document ID:** DOC-PLAN-007  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Product & Engineering Planning  
> **Ambito autorevole:** rischi progettuali e mitigazioni.

| ID | Rischio | Prob. | Impatto | Mitigazione |
|---|---|---:|---:|---|
| R-001 | Scope eccessivo ritarda Fase 1 | Alta | Alta | Must/Should/Could, feature flag, milestone rigide. |
| R-002 | Dipendenza da AI/vendor | Media | Alta | Gateway, adapter, fallback manuale, export dati. |
| R-003 | Upload malevoli o costosi | Alta | Alta | Quarantine, sandbox, quota, rate limit. |
| R-004 | Contenuti incompleti al lancio | Alta | Media | Content inventory, owner, quality gate. |
| R-005 | 3D/motion degrada mobile | Media | Alta | Lazy load, fallback, adaptive quality, reduced-motion, device test. |
| R-006 | Incoerenza prezzi/preventivi | Media | Alta | Versioning, snapshot, review e audit. |
| R-007 | PrintFlow non pronto | Alta | Bassa F1 | Indipendenza esplicita e Coming Soon. |
| R-008 | Compliance privacy insufficiente | Media | Alta | Legal review, minimizzazione, policy/consensi. |
| R-009 | PC Server offline, guasto o connessione instabile | Media | Alta F2 | Durable jobs, heartbeat, lease/retry, backup config, nessun funnel F1 bloccato. |
| R-010 | Quote o limiti Vercel/Supabase Free raggiunti | Media | Alta | Metriche 70/85/95%, caching/cleanup, migration trigger e adapter. |
| R-011 | Esperienza premium diventa over-design | Media | Alta | Functional motion gate, test utenti, CWV, accessibility e rimozione effetti senza valore. |
| R-012 | Credenziale worker compromessa | Bassa/Media | Alta | Identità macchina limitata, revoca/rotazione, no service-role, audit. |
| R-013 | Brand scuro/verde riduce leggibilità | Media | Media | Contrast audit, neutral surfaces, semantic colors e test reali. |

<!-- V0952-RISKS:START -->
## Rischi v0.95.2

| ID | Rischio | Prob. | Impatto | Mitigazione |
|---|---|---:|---:|---|
| R-013 | React/Vite non soddisfa rendering/SEO atteso o migrazione tardiva | Media | Alta | Review gate S-0097 prima della Baseline. |
| R-014 | Configurazione RLS errata espone dati customer/admin | Media | Critica | deny-by-default, policy tests, negative matrix. |
| R-015 | Jarvis diventa accessibile fuori dal Command Center, viene confuso con il team di sviluppo o viene implementato prima della security foundation | Media | Critica | `INV-JARVIS-001`; Blueprint dedicato; Andrea identity + `jarvis.use`; per-tool server authorization; RLS/audit/negative test; Role Boundary e semantic audit; fail-closed. |
| R-016 | Catalogo unificato diventa modello generico incoerente | Media | Alta | subtype, invariants, commercial mode e snapshots. |
| R-017 | Metodo pagamento non coerente con producibilità/prezzo | Media | Alta | server payment policy, admin confirmation e audit. |
| R-018 | PC Worker attivato senza hardening | Media | Critica | T-0173 blocking gate, outbound-only, machine identity e sandbox. |
<!-- V0952-RISKS:END -->

<!-- V0953-RISKS:START -->
## Rischi v0.95.3

| ID | Rischio | Prob. | Impatto | Mitigazione |
|---|---|---:|---:|---|
| R-019 | Home immersiva oscura intenti e contenuto | Media | Alta | intenti/link nel DOM, LCP-first, usability e no-JS test |
| R-020 | Comunicazione fa percepire un team inesistente | Media | Alta trust | founder-led voice, content lint e review |
| R-021 | Media AI/render usati come prova reale | Media | Critica trust | media type obbligatorio, disclosure e publication gate |
| R-022 | Catalogo, Realizzazioni e Ispirati duplicano contenuti | Media | Alta | source entity unica, purpose taxonomy e link references |
| R-023 | Logo concept viene trattato come definitivo | Media | Alta design | `logo_candidate`, Brand Asset Gate e blocco production |
| R-024 | Promessa qualità crea obblighi non validati | Media | Alta legal | copy prudente, legal review e condizioni applicabili |
| R-025 | Personalizzazione Home precede consenso/legal gate | Bassa/Media | Alta privacy | feature flag off, generic experience completa, ADR-0010 |
<!-- V0953-RISKS:END -->

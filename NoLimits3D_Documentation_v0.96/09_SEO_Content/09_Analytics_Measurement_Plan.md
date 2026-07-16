# Analytics e Measurement Plan

> **Document ID:** DOC-SEO-009  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Product Analytics  
> **Ambito autorevole:** eventi, proprietà consentite, funnel, consenso e quality assurance.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| AN-F-001 | Ogni evento ha nome, owner, scopo, schema e consent class. | Must |
| AN-F-002 | Non inviare filename, testo libero, email o PII non necessaria. | Must |
| AN-F-003 | Eventi sono emessi da un layer tipizzato. | Must |
| AN-F-004 | Conversioni chiave sono deduplicate e verificabili lato server quando opportuno. | Must |
| AN-F-005 | Dashboard distingue volume, qualità e valore commerciale. | Must |
| AN-F-006 | Cambi schema evento sono versionati e testati. | Must |

## Core events

page_view consent-aware, cta_clicked, quote_started/submitted, upload_completed, product_viewed, lantern_started/submitted, event_interest, newsletter_confirmed, assistance_submitted, quote_sent/accepted e lead_outcome.

## Funnels

Public → lead; catalog → request; STL upload → quote; lantern start → submit; newsletter start → confirmed; event visit → lead. Funnel include error/abandonment reasons non identificanti.

## QA

Debug environment, schema validation, duplicate detection, consent tests, cross-domain/provider checks e reconciliation con record di dominio.

<!-- V0952-ANALYTICS:START -->
## Eventi commerce e Command Center

Tracciare commercial mode impression/action, cart add, configuration valid, checkout start, admin confirmation, payment method/result e quote conversion. Le metriche Command Center/Jarvis sono interne e minimizzate. Nessun prompt completo o dato cliente sensibile in analytics. Consent implementation resta gate aperto.
<!-- V0952-ANALYTICS:END -->

<!-- V0953-ANALYTICS:START -->
## KPI Customer Experience e Home

Eventi/KPI: selezione intento, CTR per percorso, avvio/completamento richiesta, apertura/completamento configuratore, visualizzazione Realizzazioni, interazione timeline, click contatto Andrea, iscrizione newsletter, eventi, conversione catalogo, ritorno utenti, ricerca/zero-results, Core Web Vitals, feedback e percentuale che dichiara di aver trovato ciò che cercava.

| ID | Requisito |
|---|---|
| AN-F-007 | Misurare selezione e conversione dei sei intenti senza inviare PII. |
| AN-F-008 | Misurare interazioni con Realizzazioni, timeline, HueForge e contatto Andrea. |
| AN-F-009 | Separare funnel prodotto, servizio, lanterna, HueForge, professionale ed evento. |
| AN-F-010 | Non attivare personalizzazione/analytics non essenziali senza base giuridica o consenso richiesto. |
<!-- V0953-ANALYTICS:END -->

# NoLimits Command Center — Information Architecture

> **Document ID:** DOC-ADM-005  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Admin Product  
> **Ambito autorevole:** moduli, navigazione e read model del Command Center privato.

## 1. Scopo

Il NoLimits Command Center è il centro operativo privato della Website Platform. Non è un pannello CRUD: prioritizza lavoro, rischio, scadenze e stato del sistema.

> **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**

Il modulo Jarvis è futuro e resta assente finché il Blueprint dedicato e i gate server-side di identità/capability non sono approvati.

## 2. Overview

- ordini da confermare;
- preventivi da revisionare;
- richieste personalizzate e assistenza;
- attività urgenti;
- fiere imminenti;
- stock basso;
- contenuti da pubblicare;
- suggerimenti SEO;
- salute sistema e provider;
- stato futuro Compute Worker;
- azioni proposte da Jarvis.

## 3. Moduli

Overview, Catalog, Lanterne, HueForge/Pannelli, Orders, Quotes, Customers/CRM, Assistance, Events, Newsletter, Blog, Portfolio, Media Library, SEO, Analytics, Documentation, Roadmap, Settings, Roles/Permissions e Jarvis.

## 4. Navigation and deep links

Ogni work item apre il record e il contesto, preserva filtri e ritorno alla coda. La navigazione è role/capability-aware. Route Jarvis non sono pubbliche e non compaiono nell’account cliente.

## 5. Read models

`operations_queue`, `commerce_summary`, `content_queue`, `system_health`, `worker_status`, `jarvis_proposals`. I read model non diventano system of record.

## 6. Requisiti

| ID | Requisito |
|---|---|
| ADM-F-001 | Mostrare overview operativa basata su permessi. |
| ADM-F-002 | Separare moduli e capability secondo RBAC. |
| ADM-F-003 | Consentire gestione catalogo, contenuti, eventi, newsletter e media. |
| ADM-F-004 | Fornire audit e storico delle azioni significative. |
| ADM-F-005 | Gestire configurazioni con validazione e versioning. |
| ADM-F-006 | Evitare accesso diretto al database per operazioni ordinarie. |
| ADM-F-007 | Mostrare code prioritarie, salute sistema e stato Compute Worker. |
| ADM-F-008 | Rendere Jarvis disponibile solo ad Andrea e solo nel Command Center, dopo il Blueprint dedicato e i gate server-side. |
| ADM-F-009 | Mostrare preview, impatto e approval gate per azioni Jarvis rilevanti. |
| ADM-F-010 | Collegare ogni work item al record, owner, scadenza e recovery. |

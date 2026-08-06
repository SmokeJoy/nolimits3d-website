# AI Overview — Jarvis private orchestration

> **Document ID:** DOC-AI-001  
> **Versione:** 0.95.4  
> **Stato:** In Review  
> **Owner:** AI Architecture  
> **Ambito autorevole:** modello AI complessivo, confini pubblici/privati e tool architecture.

## Decisione

> **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**

Project Atlas prevede un solo **Jarvis** applicativo. Le capability specializzate sono tool interni, non prodotti o assistenti pubblici separati. Jarvis non è implementato né autorizzato nella fase corrente: un Blueprint dedicato e i gate di `INV-JARVIS-001` devono precedere provider, prompt runtime, memoria, route, endpoint e tool.

## Tool previsti

Catalog, Media, SEO, Blog, Newsletter, Orders, Customer/CRM, Events, Analytics, Documentation, Roadmap, System e PrintFlow Manager (Fase 2).

## Modalità

- Assistente: read/analyze/explain, nessun side effect;
- Operativa: prepara e, dopo gate, esegue azioni autorizzate;
- Architetto: analizza impatti e prepara CR/ADR, senza implementazione anticipata.

## Guardrail

Identity Andrea, tool allowlist, capability server-side, retrieval scope, prompt injection defense, approval record, audit, rate/cost limits, fallback e kill switch. Nessuna route o interfaccia pubblica Jarvis.

## Requisiti di piattaforma

| ID | Requisito | Priorità |
|---|---|---|
| AI-F-001 | Ogni capability Jarvis usa identità, capability e resource scope espliciti. | Must |
| AI-F-002 | Prompt, modello, fonti, tool, costi e outcome sono versionati o registrati secondo policy. | Must |
| AI-F-003 | Gli output strutturati vengono validati prima di qualsiasi side effect. | Must |
| AI-F-004 | Tool result, retrieval e contenuti caricati sono dati non fidati rispetto alle policy. | Must |
| AI-F-005 | Human review e approval sono applicati in funzione della classe di rischio. | Must |
| AI-F-006 | Ogni capability possiede eval offline/online, telemetry e fallback manuale. | Must |
| AI-F-007 | I provider critici sono isolati dietro adapter sostituibili. | Should |
| AI-F-008 | Dati e memoria rispettano purpose limitation, retention, classificazione e isolamento. | Must |

<!-- V0954-AI-GOVERNANCE-BOUNDARY:START -->
## 12. Governance boundary v0.95.4

Tutte le capability AI applicative e di sviluppo sono subordinate all'AI Governance Charter. Jarvis resta l'unico orchestratore AI applicativo privato; gli altri nomi descrivono tool interni richiamati da Jarvis o capability future, non assistenti pubblici autonomi.
<!-- V0954-AI-GOVERNANCE-BOUNDARY:END -->

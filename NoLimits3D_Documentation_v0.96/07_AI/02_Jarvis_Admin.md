# Jarvis — specifica amministrativa privata

> **Document ID:** DOC-AI-002  
> **Versione:** 0.95.4  
> **Stato:** In Review  
> **Owner:** AI Product / Security  
> **Ambito autorevole:** capacità, modalità, permessi, memoria, tool, approval ed estensioni Jarvis.

## 1. Identity boundary

> **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**

`INV-JARVIS-001` è il boundary costituzionale. Jarvis non è implementato né autorizzato nella fase corrente. In futuro potrà essere accessibile esclusivamente all’amministratore Andrea nel NoLimits Command Center. Non è pubblico, non è acquistabile, non appare nell’area cliente e non viene presentato come prodotto. Autorizzazione UI, route, API, RLS e tool gateway devono concordare.

## 1.1 Activation gate

Prima di qualsiasi implementazione devono esistere un Blueprint dedicato, autenticazione server-side, identità Andrea verificata, ruolo amministrativo dedicato, `jarvis.use`, autorizzazione per ogni tool/resource scope, RLS deny-by-default, session management, revoca, audit, rate limit, secret management, privacy review, test negativi e comportamento fail-closed. Nascondere l'interfaccia non è sicurezza.

## 2. Modalità

### Assistente

Risponde, spiega, cerca nei dati autorizzati, confronta e consiglia. Non modifica dati.

### Operativa

Prepara un piano/tool call, mostra preview, record coinvolti, rischi e recovery. Esegue solo azioni consentite e richiede conferma per categorie conseguenziali.

### Architetto

Analizza idea e impatti su documenti, requisiti, DB, API, UI, SEO, sicurezza, rischi e roadmap. Prepara Impact Analysis, CR e ADR quando necessari; non implementa prima dell’approvazione.

## 3. Tool model

Ogni tool ha ID/versione, input schema, capability, risk tier, dry-run, side effect, idempotency, confirmation policy, output schema, telemetry e owner. Jarvis seleziona il tool; il server autorizza.

## 4. Forbidden autonomous actions

Eliminazioni con dipendenze, invio newsletter, pubblicazione, prezzi massivi, annullamenti/rimborsi, ruoli/permessi, contenuti legali, modifiche documentali senza CR, azioni irreversibili, operazioni finanziarie e attività ad alto impatto.

## 5. Approval flow

Spiegazione → impatto → dipendenze/rischi → piano/diff → approvazione esplicita → esecuzione → audit/result. Approval token è scope-bound e scade.

## 6. Memory

Session memory, task memory, preference memory e organizational knowledge sono separate. Nessuna memoria trasforma istruzioni non attendibili in policy. Dati cliente sono minimizzati e isolati.

## 7. Audit/evals

Prompt template/versione, modello, retrieval sources, tool plan/calls, approvals, token/cost, latency e outcome. Evals per authorization, hallucination, prompt injection, false success e rollback.

## 8. Requisiti

| ID | Requisito |
|---|---|
| JAR-F-001 | Rispondere usando solo risorse autorizzate e citate. |
| JAR-F-002 | Proporre bozze senza pubblicazione automatica. |
| JAR-F-003 | Invocare solo tool in allowlist con authorization server-side. |
| JAR-F-004 | Richiedere conferma per side effect e human review per azioni conseguenziali. |
| JAR-F-005 | Separare memoria di sessione, task, preferenze e conoscenza organizzativa. |
| JAR-F-006 | Registrare prompt, modello, tool, costi, fonti e outcome. |
| JAR-F-007 | Resistere a prompt injection e isolamento cross-customer. |
| JAR-F-008 | Fornire fallback manuale e non dichiarare falsi successi. |
| JAR-F-009 | Consentire accesso esclusivamente ad Andrea nel Command Center. |
| JAR-F-010 | Supportare modalità Assistente, Operativa e Architetto con policy distinte. |
| JAR-F-011 | Orchestrare tool specializzati senza esporli come agenti pubblici separati. |
| JAR-F-012 | In modalità Architetto preparare impact analysis, CR e ADR prima dell’implementazione. |
| JAR-F-013 | Bloccare le azioni vietate senza approvazione esplicita e audit. |
| JAR-F-014 | Escludere Jarvis da sitemap, navigazione pubblica, account cliente e marketing. |
| JAR-NF-001 | Non implementare Jarvis prima di un Blueprint dedicato e della fondazione identity/capability approvata. |
| JAR-NF-002 | Non trattare Jarvis come membro, coordinatore, reviewer o approvatore del team di sviluppo. |
| JAR-NF-003 | Non permettere a Jarvis di modificare il proprio perimetro o documenti governati senza CR, approval e tool server-side autorizzato. |

<!-- V0954-JARVIS-INVARIANT:START -->
## 18. Privacy invariant e negative surface test

L'invariante `INV-002` è bloccante. Devono risultare assenti:

- route pubbliche dedicate a Jarvis;
- endpoint utilizzabili da sessioni cliente;
- CTA, menu, sitemap, schema.org o copy pubblico che lo promuovano;
- accesso indiretto tramite tool generici del Customer Area;
- condivisione della memoria privata con agenti o provider non approvati.

Ogni release esegue un negative surface test su routing, API catalog, RBAC, contenuti e bundle/configurazioni client.
<!-- V0954-JARVIS-INVARIANT:END -->

## 19. Phase boundary

M-001 resta priva di implementazione Jarvis. La documentazione di prompt e tool è design-only e non autorizza runtime, provider, segreti, memoria o endpoint. E-0012 può passare da `Planned` ad `Active` soltanto dopo il Blueprint Jarvis dedicato, Architect Review e approvazione Product Owner.

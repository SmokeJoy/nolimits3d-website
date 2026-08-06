# Open Questions e decisioni richieste

> **Document ID:** DOC-APP-002  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Project Governance  
> **Ambito autorevole:** decisioni non ancora approvate; il Debt Register governa priorità e stato.

## 1. Regola di interpretazione

Una domanda aperta non autorizza implementazioni alternative. Finché non viene chiusa dall'autorità indicata, il lavoro dipendente resta bloccato o limitato al percorso esplicitamente sicuro.

## 2. Frozen Baseline blockers

| ID | Decisione richiesta | Autorità | Evidenza di chiusura |
|---|---|---|---|
| Q-001 | Concludere il review gate React/Vite–Next.js. | CTO / Architecture | ADR-0018 aggiornato tramite nuovo ADR se cambia la decisione; benchmark e decisione firmata |
| Q-009 | Validare privacy, cookie, consent, retention, DPA, termini e proprietà intellettuale upload. | Legal/Privacy + Product Owner | documenti legali approvati e mapping tecnico |
| Q-012 | Approvare hardening del PC Compute Worker. | Security/Operations + CTO | threat review, runbook, identity, sandbox, backup e recovery |
| Q-015 | Approvare Brand Asset Gate: logo N+3 finale, palette, font, favicon e licenze. | Brand Owner + Product Owner | asset/versioni e test del gate |
| Q-019 | Approvare la formulazione della promessa qualità e dei rimedi per difetti di produzione. | Legal + Product Owner | copy e condizioni commerciali coerenti |

`Q-004` è consolidata in `Q-015` e non costituisce una seconda decisione.

## 3. Development Blueprint e launch gates

| ID | Domanda | Classificazione |
|---|---|---|
| Q-002 | Passwordless vs credenziali, recovery, MFA admin e scope account Fase 1. | Blueprint architecture gate |
| Q-003 | Provider, fiscalità, fulfillment, cancellazioni e rimborsi. | Commerce/launch gate |
| Q-005 | Validazione concorrenza e obiettivi economici con dati aggiornati. | Business validation |
| Q-006 | Dati reali per materiali, energia, macchina, lavoro, failure rate e margini. | Pricing calibration |
| Q-007 | Catalogo modelli/pannelli, producibilità, texture e pricing del configuratore. | Blueprint/content gate |
| Q-008 | Browser/device matrix, WebGL e profili adaptive quality. | Blueprint quality gate |
| Q-010 | Release/API/screenshot reali PrintFlow. | Future phase gate; nessuna funzione attiva ora |
| Q-011 | Provider newsletter/analytics, autenticazione dominio e consent mode. | Launch gate |
| Q-013 | Implementazione outbox/queue. | ADR-0006 Proposed; architecture gate quando necessario |
| Q-014 | Storage, eval, release e rollback della Prompt Library. | ADR-0012 Proposed; Jarvis gate |
| Q-016 | Disponibilità e produzione delle fotografie autentiche. | Content production gate |
| Q-017 | Canale reale e aspettativa di risposta per `Parliamone`. | CX/operations gate |
| Q-018 | Validazione utenti della navigazione e dei sei intenti. | UX validation gate |
| Q-020 | Personalizzazione Home. | Fuori Fase 1 finché consenso e valore non sono dimostrati |
| Q-022 | Ripartizione controlli Documentation CI tra locale e GitHub Actions. | Development Blueprint entry gate |
| Q-023 | Blueprint Jarvis dedicato: provider, identity/capability model, tool/approval matrix, memoria, retention, threat/privacy review, eval, audit, rollback e kill switch. | Jarvis implementation gate; `INV-JARVIS-001` vieta implementazione fino alla chiusura |

## 4. Domande consolidate o chiuse

| ID | Stato | Esito |
|---|---|---|
| Q-004 | Merged | consolidata in Q-015; ID preservato per continuità storica |
| Q-021 | Closed | Chief Architect Review completata dalla v0.96; esito nel Release Candidate Report |

Il boundary di prodotto Jarvis non è una domanda aperta: Andrea-only, Command Center-only,
non customer-facing, non membro del team e non implementabile prima del Blueprint dedicato
sono decisioni Accepted in AD-012/CR-0007. `Q-023` riguarda soltanto le future scelte
implementative e di sicurezza.

## 5. Regola di chiusura

La chiusura aggiorna Owner Document, eventuale ADR/CR, RTM, roadmap, debt e audit. Nessuna domanda viene chiusa tramite sola modifica di questo elenco.

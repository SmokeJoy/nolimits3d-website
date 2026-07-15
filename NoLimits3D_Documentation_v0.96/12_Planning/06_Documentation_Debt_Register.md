# Documentation Debt Register

> **Document ID:** DOC-PLAN-008  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Documentation Architecture  
> **Ambito autorevole:** incompletezze e decisioni note che condizionano Frozen Baseline, Development Blueprint o lancio.

## 1. Frozen Baseline blockers

| ID | Descrizione | Severità | Owner | Stato | Evidenza |
|---|---|---|---|---|---|
| DD-001 | Concludere review gate React/Vite–Next.js e decisione frontend finale. | Blocking baseline | CTO/Architecture | Open | ADR-0018; S-0097 |
| DD-004 | Validare privacy, cookie, termini, retention, consent e DPA. | Blocking baseline/launch | Legal/Privacy | Open | Privacy GDPR; Q-009 |
| DD-006 | Definire e approvare hardening operativo del PC Compute Worker. | Blocking baseline/Fase 2 | Security/Operations | Open | ADR-0013/19; Q-012 |
| DD-010 | Approvare logo N+3, varianti, palette, font, favicon, licenze e test Brand Asset Gate. | Blocking baseline/design | Brand Owner | Open | Brand Book; ADR-0025; Q-015 |
| DD-014 | Validare promessa qualità, difetti produzione, recesso e linguaggio commerciale. | Blocking baseline/launch | Legal/Product Owner | Open | Business Rules; Q-019 |

## 2. Development Blueprint, launch e operational debt

| ID | Descrizione | Severità | Owner | Stato | Evidenza |
|---|---|---|---|---|---|
| DD-002 | Validare provider e dettagli fiscali/fulfillment dei metodi Fase 1. | High commerce | Product Owner | Partial | ADR-0022; F-0049 |
| DD-005 | Eseguire analisi concorrenza locale aggiornata e validare obiettivi economici. | High business | Business | Open | Go-to-Market Strategy |
| DD-007 | Scegliere outbox/queue compatibile con Supabase e volumi. | Medium/F2 | Architecture | Open | ADR-0006 Proposed |
| DD-008 | Chiudere analytics/cookie provider e consent-aware implementation. | Blocking launch | Privacy/Product | Open | ADR-0010 Proposed |
| DD-009 | Formalizzare lifecycle, eval, release e rollback della Prompt Library. | Medium AI | AI/Product | Open | ADR-0012 Proposed |
| DD-011 | Produrre fotografie autentiche di Andrea, laboratorio, processi, prodotti e fiere. | High launch | Content/Brand | Open | Image Guidelines; Q-016 |
| DD-012 | Validare canale e SLA della CTA `Parliamone`. | Medium conversion | Product Owner | Open | Homepage; Q-017 |
| DD-013 | Eseguire usability test di navigazione e sei intenti. | High UX | UX | Open | IA/Home; Q-018 |
| DD-016 | Implementare in Documentation CI i controlli automatici definiti. | High blueprint entry | Quality/Engineering | Open | S-0115; ADR-0026 |
| DD-017 | Rendere operativo il template PR con evidenze costituzionali. | High blueprint entry | Engineering | Open | Development Constitution |

## 3. Elementi consolidati o chiusi

| ID | Stato | Esito |
|---|---|---|
| DD-003 | Merged | consolidato in DD-010; ID mantenuto per storia e collegamenti |
| DD-015 | Closed | Architectural Review completa eseguita nella v0.96; report DOC-APP-005 |

## 4. Interpretazione dello stato

La candidate non presenta debt strutturale nascosto. I cinque blocker della sezione 1 impediscono la Frozen Baseline v1.0, ma non invalidano lo stato `RELEASE CANDIDATE` perché sono espliciti, assegnati e non generano due interpretazioni concorrenti delle decisioni già approvate.

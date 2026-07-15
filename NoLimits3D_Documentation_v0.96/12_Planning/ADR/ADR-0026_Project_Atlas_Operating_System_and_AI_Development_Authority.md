# ADR-0026 — Project Atlas Operating System and AI Development Authority

> **Document ID:** DOC-ADR-026  
> **Versione:** 0.95.4  
> **Stato:** In Review  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **Owner:** Product & Software Architecture  
> **Approvatore:** Product Owner / Lead Architect  
> **Change Request:** CR-0005

## Contesto

Gli ADR esistenti governano architettura, privacy di Jarvis, centralità del sito, human-in-the-loop e limiti di fase. Prima dello sviluppo serve però un modello unico che impedisca a persone e agenti di reinterpretare tali decisioni durante l'implementazione.

## Decisione

Project Atlas adotta un **Operating System di sviluppo governato** composto da:

- Project DNA e Project Invariants costituzionali;
- Negative Requirements verificabili;
- AI Governance Charter e AI Development Contract;
- Decision Authority Matrix;
- Architecture Compliance Gates;
- Development Constitution;
- Release Candidate soggetta a review umana e mai promossa automaticamente a Frozen Baseline.

Ogni implementazione deve derivare da Owner Document, RTM e roadmap. Un agente AI può operare autonomamente soltanto su cambi non semantici o su implementazioni già autorizzate; non può aggiungere feature, cambiare UX/workflow/architettura, modificare Jarvis, dichiarare baseline o colmare decisioni mancanti.

## Driver

- preservare la visione durante lo sviluppo assistito da AI;
- rendere testabili anche i comportamenti proibiti;
- separare esecuzione da autorità decisionale;
- prevenire scope creep e regressioni costituzionali;
- preparare una review architetturale ripetibile.

## Alternative considerate

### A. Linee guida non vincolanti

Scartata: non produce gate, ownership o evidenza verificabile.

### B. Affidarsi esclusivamente agli ADR esistenti

Scartata: gli ADR spiegano decisioni atomiche, ma non governano ogni modifica e pull request.

### C. Consentire agli agenti autonomia interpretativa con review finale

Scartata: sposta i difetti troppo avanti e rende difficile distinguere implementazione da nuova decisione.

## Conseguenze positive

- decisioni e codice rimangono tracciabili;
- i limiti di Jarvis e PrintFlow diventano gate automatici;
- i Negative Requirements possono essere testati;
- ambiguità e conflitti vengono fermati prima del codice;
- la RC v1.0 dispone di criteri oggettivi.

## Conseguenze negative

- maggiore disciplina iniziale e più evidenze nelle PR;
- alcuni cambi rapidi richiederanno escalation;
- serve mantenere CI, matrici e checklist;
- la velocità apparente può diminuire quando manca una decisione.

## Condizioni di revisione

L'ADR può essere superseded solo se un modello alternativo dimostra pari o maggiore tracciabilità, tutela degli invarianti e separazione dell'autorità. Non è ammessa modifica in-place.

## Compliance

Owner Document:

- `000_PROJECT_CHARTER.md`;
- `00_Foundation/00_Project_Constitution.md`;
- `000_GOVERNANCE/008_AI_COLLABORATION_POLICY.md`;
- `00_Foundation/03_Documentation_Governance.md`;
- `000_GOVERNANCE/007_QUALITY_GATES.md`;
- `11_Engineering_Operations/01_Developer_Handbook.md`.

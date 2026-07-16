# CR-0005 — Operating System, Development Governance and Release-Candidate Preparation

> **Document ID:** DOC-CR-005  
> **Versione:** 0.95.4  
> **Stato:** In Review  
> **Change status:** Implemented — Pending Architectural Review  
> **Data:** 2026-07-15  
> **Owner:** Change Control Board  
> **Approvatore richiesto:** Product Owner / Lead Architect  
> **Classificazione:** Constitutional + Architecture Governance + Release Preparation

## 1. Scopo

Consolidare il sistema operativo di Project Atlas senza aggiungere funzionalità di prodotto e preparare la Documentation Bible alla review che precede la Release Candidate v1.0.

## 2. Non-scope

- nessuna nuova capability cliente;
- nessuna attivazione di PrintFlow;
- nessuna esposizione di Jarvis;
- nessuna scelta definitiva sui blocker già aperti;
- nessuna dichiarazione di Frozen Baseline;
- nessuna modifica in-place agli ADR Accepted precedenti.

## 3. Impact Analysis

| Area | Impatto |
|---|---|
| Foundation | Project DNA, Invariants, Negative Requirements, Project Atlas Philosophy |
| AI Governance | Charter, Development Contract, stop conditions e separazione Jarvis/agent |
| Change control | Decision Authority Matrix e authority evidence |
| Architecture | compliance gate bloccanti e riferimenti SDS |
| Engineering | Development Constitution e PR contract |
| Critical features | hard stop PrintFlow, privacy Jarvis, human review STL |
| Planning | ADR-0026, 40 requisiti governance, RTM e roadmap governance-only |
| Release | stato `NEEDS REVIEW`; RC proposta solo dopo review completa |

## 4. Decisione

Approvare e implementare il modello descritto da ADR-0026. Gli ADR Accepted precedenti restano byte-identici. Le regole nuove si collocano nei rispettivi Owner Document; gli altri file contengono solo riferimenti locali.

## 5. Requisiti aggiunti

- `ATLAS-NF-001`–`ATLAS-NF-010`;
- `AIGOV-NF-001`–`AIGOV-NF-012`;
- `AUTH-NF-001`–`AUTH-NF-006`;
- `GATE-NF-001`–`GATE-NF-006`;
- `DEV-NF-001`–`DEV-NF-006`.

Sono requisiti di governance e qualità; non costituiscono feature di prodotto.

## 6. Roadmap

Aggiunto `F-0050` sotto `E-0001`, con storie `S-0110`–`S-0116`, task `T-0219`–`T-0232` e subtask `ST-0110`–`ST-0116`. Tutti i 501 elementi precedenti sono conservati.

## 7. Verifiche richieste

- preservazione di documenti, requisiti e roadmap v0.95.3;
- hash invariato di tutti gli ADR Accepted preesistenti;
- RTM completa;
- nessun link rotto o documento orfano;
- Jarvis esclusivamente privato;
- PrintFlow esclusivamente Coming Soon in Fase 1;
- preventivo STL finale con human review;
- status finale `NEEDS REVIEW`.

## 8. Rollback

Il rollback ripristina la v0.95.3 e rimuove soltanto i nuovi artefatti/righe v0.95.4. Non richiede migrazioni dati o software, poiché la release è documentale.

## 9. Esito

Implementazione completata. L'approvazione della futura Release Candidate rimane fuori scope ed è subordinata all'Architectural Review del Lead Architect e del Product Owner.

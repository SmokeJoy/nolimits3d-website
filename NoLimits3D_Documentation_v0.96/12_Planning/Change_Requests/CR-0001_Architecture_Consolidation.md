# CR-0001 — Architecture Consolidation and Documentation Governance

> **Document ID:** DOC-CR-001  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Change Control Board  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


> **Stato:** Implemented, awaiting verification/approval  
> **Proponente:** Project Owner / Lead Architect review  
> **Data:** 2026-07-15  
> **Target:** Documentation v0.95

## Problema

La precedente consegna aveva una struttura ampia e valida, ma governance insufficiente, documenti chiave troppo sintetici e una roadmap formalmente numerosa ma non abbastanza gerarchica o operativa.

## Obiettivi

- introdurre il Project Charter come Meta-Specifica;
- separare governance e Constitution;
- impedire duplicazioni e modifica incontrollata;
- ampliare strategia commerciale, frontend, backend, database, lanterne, STL, Jarvis, media, design e PrintFlow;
- creare Prompt Library;
- sostituire la roadmap meccanica con una gerarchia reale;
- produrre audit e manifest.

## Scope

Tutta la Documentation Bible. Nessun codice applicativo viene implementato.

## Vincoli

- non spostare o rinominare i documenti esistenti;
- preservare gli archivi sorgente;
- non definire PrintFlow come attivo;
- non convertire assunzioni tecnologiche in decisioni accettate;
- mantenere la versione in stato `In Review`.

## Impatto

| Area | Modifica |
|---|---|
| governance | Charter, policy, owner registry, CI e audit |
| product | commercial vision e PRD/requirements |
| architecture | frontend/backend e ADR |
| design/media | motion, tema, pipeline, prompt provenance |
| features | lantern/STL/PrintFlow dettagliati |
| AI | Jarvis e Prompt Library |
| data | ER, cardinalità, migrazioni e vincoli |
| planning | RTM e roadmap gerarchica |

## Alternative

1. mantenere i 100 documenti e aggiungere solo un prompt: respinta, perché il prompt non è governance persistente;
2. riscrivere tutto con nuova numerazione: respinta, perché rompe stabilità e riferimenti;
3. aggiungere documenti duplicati: respinta dalla regola Single Source of Truth;
4. consolidare owner document esistenti e aggiungere solo specifiche autonome necessarie: scelta.

## ADR

ADR-0001 — ADR-0012.

## Acceptance criteria

- nessun file esistente spostato;
- governance L0 completa;
- roadmap 300–500 item con cinque livelli;
- RTM aggiornata;
- link e dipendenze validati;
- PrintFlow guard superato;
- audit emesso con stato trasparente;
- ZIP e manifest integri.

## Esito

Implementazione documentale completata nella candidate v0.95; approvazione e congelamento v1.0 restano responsabilità del Project Owner/CTO.

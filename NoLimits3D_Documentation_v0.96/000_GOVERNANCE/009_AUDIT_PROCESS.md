# 009 — Documentation Audit Process

> **Document ID:** DOC-GOV-009  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Quality Engineering  
> **Ambito autorevole:** audit automatico e manuale della Documentation Bible.

## 1. Audit automatico

Controlla:

- integrità dei file e hash;
- naming;
- metadati;
- ID duplicati;
- link relativi;
- file orfani;
- requisito → RTM;
- roadmap hierarchy e dipendenze;
- presenza di owner;
- marker di placeholder;
- stato PrintFlow.

## 2. Audit semantico

Il reviewer verifica:

- duplicazioni concettuali;
- contraddizioni;
- adeguatezza dei trade-off;
- coerenza tra UX, dati, API e sicurezza;
- realismo delle stime;
- completezza delle open decision.

## 3. Health Score

| Dimensione | Peso |
|---|---:|
| struttura e integrità | 15% |
| completezza | 20% |
| coerenza | 20% |
| tracciabilità | 20% |
| operabilità | 15% |
| debito documentale | 10% |

Il punteggio non sostituisce i gate: un singolo errore bloccante può produrre `NEEDS REVIEW` anche con score elevato.

## 4. Output

L'audit genera:

- report Markdown leggibile;
- JSON machine-readable;
- elenco issue con severità;
- stato finale;
- raccomandazione sulla baseline.

<!-- V0954-AUDIT-EXTENSION:START -->
## 8. Audit v0.95.4+

L'audit deve verificare inoltre:

- immutabilità byte-level degli ADR Accepted non superseded;
- conservazione di tutti gli ID della release precedente;
- copertura dei Negative Requirements;
- presenza e coerenza di Project DNA e Project Invariants;
- assenza di route, endpoint o contenuti che espongano Jarvis;
- PrintFlow esclusivamente Coming Soon in Fase 1;
- human review obbligatoria nel preventivo STL;
- authority evidence per CR, ADR, RC e baseline;
- nessuna dichiarazione automatica di Frozen Baseline.
<!-- V0954-AUDIT-EXTENSION:END -->

<!-- V096-CHIEF-ARCHITECT-REVIEW:START -->
## 9. Chief Architect Review v0.96

La review finale deve rispondere esplicitamente a cinque domande:

1. quali ambiguità restano e quale autorità le chiude;
2. dove due implementatori potrebbero divergere;
3. quali duplicazioni concettuali sono state consolidate;
4. se ogni requisito possiede un unico owner;
5. se ogni ADR è coerente con Constitution e Project DNA.

Il report distingue:

- **errore strutturale**, che invalida la candidate;
- **ambiguità di scope**, che invalida la candidate;
- **blocker di Frozen Baseline**, che mantiene la candidate ma impedisce v1.0;
- **gate di Development Blueprint o lancio**, che non modifica lo scope di prodotto.
<!-- V096-CHIEF-ARCHITECT-REVIEW:END -->

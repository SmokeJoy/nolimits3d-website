# 003 — Change Request Process

> **Document ID:** DOC-GOV-003  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Change Control Board  
> **Ambito autorevole:** apertura, analisi, approvazione e chiusura delle modifiche.

## 1. Quando aprire una CR

Una CR è obbligatoria per modifiche a requisiti, business rule, stati, contratti, schema dati, permessi, architettura, roadmap baselined o struttura documentale.

Non è obbligatoria per correzioni ortografiche prive di impatto semantico, purché siano registrate nel changelog della patch.

## 2. Stati

```text
Proposed → Impact Analysis → In Review → Approved → Implemented → Verified → Closed
                     ↘ Rejected
                     ↘ Deferred
```

## 3. Contenuto minimo

- ID e titolo;
- proponente;
- problema;
- motivazione;
- comportamento attuale e desiderato;
- impatto su documenti e identificatori;
- alternative;
- rischio;
- compatibilità e migrazione;
- ADR necessari;
- task della roadmap;
- piano di verifica;
- approvatori.

## 4. Impact analysis

L'analisi deve attraversare il grafo:

```text
Requirement
→ Business Rules / State
→ UX / Component
→ API / Data
→ Security / Privacy
→ Tests
→ Roadmap / Release
```

Una CR non può essere approvata con impatti lasciati implicitamente “da verificare”. Questi diventano task o documentation debt con owner e scadenza.

## 5. Approvazione

- Product Owner: valore e priorità;
- Lead Architect: coerenza e impatto tecnico;
- Security/Privacy owner: quando applicabile;
- CTO: modifiche architetturali o di baseline.

## 6. Chiusura

La CR è `Closed` solo quando:

- documenti aggiornati;
- RTM sincronizzata;
- ADR accettati;
- roadmap aggiornata;
- audit superato;
- changelog aggiornato.

<!-- V0954-AUTHORITY-ENFORCEMENT:START -->
## 8. Authority enforcement

La Decision Authority Matrix autorevole è in `00_Foundation/03_Documentation_Governance.md`. Ogni CR deve dichiarare:

- classificazione della modifica;
- authority richiesta e ottenuta;
- ADR da creare, aggiornare o supersedere;
- Owner Document e invarianti impattati;
- comportamento in caso di mancata approvazione.

Un CR senza authority evidence non può passare a `Approved` o `Implemented`.
<!-- V0954-AUTHORITY-ENFORCEMENT:END -->

# 005 — Traceability Standard

> **Document ID:** DOC-GOV-005  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Quality Engineering  
> **Ambito autorevole:** relazioni obbligatorie tra requisiti, design, implementazione e verifica.

## 1. Catena

```text
Business Objective
→ Requirement
→ Acceptance Criteria
→ Feature / UX
→ Component / API / Data
→ Security Controls
→ Test
→ Roadmap Item
→ Release Evidence
```

## 2. Copertura minima

| Classe | Copertura richiesta |
|---|---|
| Must | 100% prima della Frozen Baseline |
| Should | 100% prima dello stato Ready |
| Could | può restare pianificata, ma deve avere owner e milestone |
| Future | deve essere chiaramente fuori scope e non influire sulla Fase 1 |

## 3. Regole

- Nessun requisito senza owner document.
- Nessun test senza requisito o rischio associato, salvo test infrastrutturali generali.
- Nessun task di feature senza requisito o ADR.
- Nessuna API pubblica senza requirement coverage.
- Le relazioni many-to-many sono ammesse e attese.

## 4. Verifica

La RTM viene validata automaticamente per ID duplicati, celle obbligatorie vuote, riferimenti mancanti e requisiti Must senza test.

# Preventivatore STL — Pricing Engine

> **Document ID:** DOC-FEAT-006  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Commercial Operations  
> **Ambito autorevole:** composizione dei costi e generazione del range; Business Rules possiede le regole commerciali generali.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| PRICE-F-001 | Calcolare componenti da dati versionati, non testo libero. | Must |
| PRICE-F-002 | Separare materiale, macchina, setup, lavoro, post-processo e rischio. | Must |
| PRICE-F-003 | Produrre range, assunzioni e confidence. | Must |
| PRICE-F-004 | Applicare minimi/sconti/tasse solo da policy approvate. | Must |
| PRICE-F-005 | Registrare versione formula e input snapshot. | Must |
| PRICE-F-006 | Consentire override umano motivato. | Must |
| PRICE-F-007 | Simulare senza modificare il preventivo inviato. | Should |
| PRICE-F-008 | Non esporre automaticamente margini o formule interne sensibili. | Must |

## Cost model

```text
base setup
+ material mass × cost basis
+ machine time × machine rate
+ operator time × labor rate
+ post-processing
+ packaging/shipping
+ risk allowance
= internal cost basis
→ commercial policy → suggested range
```

Ogni rate ha valid-from, currency, owner e source. I valori reali sono documentation debt finché Andrea non li valida.

## Confidence

File/brief incompleto, profilo non testato, supporti estremi, tolleranze, quantità o post-processing ampliano il range e possono imporre review. Confidence non è una probabilità scientifica se non calibrata; il metodo deve essere dichiarato.

## Explainability

L'operatore vede breakdown e motivi; il cliente vede principali assunzioni e ciò che può cambiare il prezzo. Un override non riscrive il suggerimento originale.

## Acceptance

Fixture con output atteso, rounding/valuta corretti, nessun float monetario, versione formula tracciata, range distinto dal quote finale, audit override.

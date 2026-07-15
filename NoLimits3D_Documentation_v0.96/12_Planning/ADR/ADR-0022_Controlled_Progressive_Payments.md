# ADR-0022 — Controlled progressive payment strategy

> **Document ID:** DOC-ADR-022  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Prodotti standard e lavori personalizzati non possono condividere una conferma/pagamento automatico indiscriminato.

## Decision

Il metodo e il momento del pagamento dipendono da commercial mode, producibilità, prezzo finale e approvazione. Fase 1 supporta opzioni configurabili come bonifico, PayPal, contanti/POS fiera e consegna locale; wallet/carte avanzate sono future.

## Consequences

Riduce rischio commerciale e consente lancio progressivo. Alcuni flussi restano manuali e richiedono reconciliation.

## Risks and mitigations

Errore stato/prezzo: policy server-side, order/payment separation, idempotency, audit e conferma Andrea.

## Revisit conditions

Provider o modello fiscale/fulfillment definitivo richiede raffinamento, non bypass della policy.

## Links

- `12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md`;
- `12_Planning/01_ADR_Register.md`.

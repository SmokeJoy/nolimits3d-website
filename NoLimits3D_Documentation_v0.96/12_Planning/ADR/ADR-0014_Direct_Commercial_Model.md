# ADR-0014 — Direct commercial model

> **Document ID:** DOC-ADR-014  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Product / Commercial Architecture  
> **Alias decisione:** ADR-002 — Modello commerciale  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0002

## Context

La piattaforma deve distinguere chiaramente le linee di ricavo iniziali ed evitare che catalogo, configuratori e preventivi evolvano come funnel scollegati.

## Decision drivers

Semplicità per il cliente, controllo diretto della qualità, personalizzazione, margine, continuità tra online e laboratorio e assenza di complessità multi-vendor.

## Options considered

1. sito solo vetrina;
2. marketplace multi-vendor;
3. solo preventivi manuali;
4. modello diretto ibrido catalogo/configurazione/preventivo/servizi.

## Decision

NoLimits3D vende e fornisce direttamente:

- prodotti di catalogo;
- lanterne configurabili;
- progetti personalizzati;
- preventivi da STL;
- servizi professionali.

I prodotti standard possono supportare acquisto diretto; i lavori complessi conservano revisione e preventivo. Provider di pagamento, spedizione e fiscalità sono specifiche successive, non un cambio del modello.

## Consequences

Un’unica identità commerciale, dati cliente unificati, CTA diverse per tipo di offerta, necessità di regole prezzo/ordine chiare e responsabilità diretta NoLimits3D.

## Links

- `01_Product/05_Marketplace_and_GoToMarket_Strategy.md`;
- `05_Features/01_Catalog_and_Products.md`;
- `05_Features/03_STL_Quote_Workflow.md`;
- `12_Planning/Change_Requests/CR-0002_Atlas_Decisions.md`.

## Revisit conditions

Ingresso di seller terzi, licensing marketplace, nuovo modello SaaS o separazione legale di linee di business.

# Catalog Manager — Jarvis internal tool

> **Document ID:** DOC-AI-005  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Catalog / AI  
> **Ambito autorevole:** proposte per schede catalogo e controllo completezza.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| CATAI-F-001 | Generare testo solo da campi e asset approvati. | Must |
| CATAI-F-002 | Segnalare dati mancanti senza inventarli. | Must |
| CATAI-F-003 | Distinguere CTA mode e tipo prodotto. | Must |
| CATAI-F-004 | Non trasformare render/concept in prova fotografica. | Must |
| CATAI-F-005 | Proporre tag/categorie senza applicazione automatica non revisionata. | Should |
| CATAI-F-006 | Conservare fonti e diff della bozza. | Must |

## Workflow

Select product → completeness audit → draft fields → fact-check list → media/rights check → human edit → save revision → publication workflow separato.

## Tools

Catalog read, media metadata/usage, taxonomy read e create draft revision. Non cambia prezzo, SKU, licenza o publication state.

## Eval

Zero invented specifications, correct missing_fields, brand tone, taxonomy relevance e source citations.

<!-- V0952-INTERNAL-TOOL:START -->
## Boundary v0.95.2

Questo documento specifica una capability interna del solo Jarvis nel NoLimits Command Center. Non definisce un assistente pubblico, non crea una seconda identità AI e non autorizza accesso cliente. Il tool `Catalog` eredita identity, approval, audit e forbidden-actions da `07_AI/02_Jarvis_Admin.md`.
<!-- V0952-INTERNAL-TOOL:END -->

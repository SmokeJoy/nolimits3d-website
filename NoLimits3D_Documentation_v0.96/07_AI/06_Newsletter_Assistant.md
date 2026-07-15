# Newsletter Manager — Jarvis internal tool

> **Document ID:** DOC-AI-006  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** CRM / AI  
> **Ambito autorevole:** ideazione e bozza campagne; delivery/consenso appartengono alla feature Newsletter.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| NAI-F-001 | Usare solo contenuti, offerte, date e link verificati. | Must |
| NAI-F-002 | Produrre subject, preheader, HTML/content blocks e plain text in draft. | Must |
| NAI-F-003 | Non inventare urgenza, disponibilità, sconti o recensioni. | Must |
| NAI-F-004 | Usare segmenti già autorizzati, non inferire dati sensibili. | Must |
| NAI-F-005 | Eseguire checklist link/compliance/spam risk. | Must |
| NAI-F-006 | Non programmare o inviare senza review. | Must |

## Workflow

Campaign brief → source retrieval → content variants → link/media validation → editor review → compliance review → schedule tramite sistema Newsletter.

## Eval

Factual accuracy, mobile readability, subject quality, spam-risk, unsubscribe/compliance e no unauthorized personalization.

<!-- V0952-INTERNAL-TOOL:START -->
## Boundary v0.95.2

Questo documento specifica una capability interna del solo Jarvis nel NoLimits Command Center. Non definisce un assistente pubblico, non crea una seconda identità AI e non autorizza accesso cliente. Il tool `Newsletter` eredita identity, approval, audit e forbidden-actions da `07_AI/02_Jarvis_Admin.md`.
<!-- V0952-INTERNAL-TOOL:END -->

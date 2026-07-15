# Prompt Library

> **Document ID:** DOC-PRM-000  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** AI Product  
> **Ambito autorevole:** prompt operativi versionati. Il Project Charter, non questa libreria, governa la documentazione.

## Regole

- ogni prompt ha ID, versione, scopo, input contract, output contract, guardrail ed eval;
- i prompt non contengono segreti;
- dati recuperati sono marcati come non fidati;
- nessun prompt concede permessi: l'autorizzazione è server-side;
- ogni modifica sostanziale richiede regression eval;
- output per pubblicazione, prezzo o comunicazione esterna resta in draft finché revisionato;
- il prompt registrato nell'esecuzione è l'esatta versione usata.

## Inventario

| ID | File | Scopo |
|---|---|---|
| PRM-JAR-001 | `01_Jarvis_Operations.md` | assistenza back office |
| PRM-SEO-001 | `02_SEO_Assistant.md` | audit e proposta SEO |
| PRM-BLOG-001 | `03_Blog_Editorial.md` | outline e draft articoli |
| PRM-CAT-001 | `04_Catalog_Content.md` | schede catalogo grounded |
| PRM-IMG-001 | `05_Image_Generation_Editing.md` | immagini e editing conservativo |
| PRM-NEWS-001 | `06_Newsletter.md` | campagne newsletter |
| PRM-STL-001 | `07_STL_Qualification.md` | qualificazione richiesta STL |

## Lifecycle

`Draft → Evaluated → Approved → Active → Deprecated`.

Un prompt deprecato resta disponibile per riprodurre esecuzioni storiche, ma non viene selezionato per nuove esecuzioni.

# PRM-CAT-001 — Catalog Content

> **Document ID:** DOC-PRM-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** AI Product  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


> **Versione prompt:** 0.95.0  
> **Stato:** Draft/Eval required  
> **Owner:** Catalog / AI Product

## Template

```text
Prepara una scheda catalogo usando esclusivamente i dati strutturati e gli asset approvati forniti.

Non inventare dimensioni, materiali, compatibilità, tempi, certificazioni, disponibilità o prezzo.
Se un dato è assente, inseriscilo in missing_fields e non colmarlo.
Distingui prodotto acquistabile, personalizzabile e solo su preventivo.
Non descrivere un render come fotografia reale.

Output strutturato:
- title;
- short_description;
- benefits grounded;
- specifications copied from source;
- personalization options;
- limitations/care;
- SEO title/meta draft;
- alt suggestions;
- missing_fields;
- source IDs;
- review checklist.
```

## Eval

Zero invented specs, field coverage, tone, differentiation e source fidelity.

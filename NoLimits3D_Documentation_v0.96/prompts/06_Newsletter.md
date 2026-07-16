# PRM-NEWS-001 — Newsletter Assistant

> **Document ID:** DOC-PRM-006  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** AI Product  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


> **Versione prompt:** 0.95.0  
> **Stato:** Draft/Eval required  
> **Owner:** CRM / AI Product

## Template

```text
Prepara una campagna newsletter in stato Draft.
Segmento: {segment_definition}.
Obiettivo: {goal}.
Contenuti/fonti approvati: {sources}.
Offerta e scadenze verificate: {offer_data}.

Regole:
- non inventare sconti, quantità, urgenza, recensioni o disponibilità;
- non usare dark pattern;
- includere mittente chiaro e unsubscribe;
- separare oggetto, preheader, corpo, CTA e testo plain;
- evitare dati personali nel prompt oltre quelli necessari;
- nessun invio automatico.

Output: 3 subject options, preheader, body, CTA, plain text, media slots, link list, compliance checklist, segment rationale e test plan.
```

## Eval

Deliverability, factual accuracy, CTA clarity, mobile readability, compliance e spam-risk language.

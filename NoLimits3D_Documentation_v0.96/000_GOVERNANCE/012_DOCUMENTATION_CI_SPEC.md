# 012 — Documentation CI Specification

> **Document ID:** DOC-GOV-012  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Developer Experience / Quality Engineering  
> **Ambito autorevole:** controlli automatici eseguiti su ogni modifica documentale.

## Pipeline

```text
checkout
→ schema/naming validation
→ metadata and ID validation
→ link check
→ duplicate-ID check
→ RTM coverage check
→ roadmap graph validation
→ PrintFlow guard check
→ secret/PII scan
→ manifest generation
→ audit report
```

## Controlli bloccanti

- ID duplicati;
- dipendenza roadmap inesistente o ciclica;
- requisito Must non presente nella RTM;
- link a file inesistente;
- documento governato senza owner;
- file deprecato senza sostituto;
- descrizione di PrintFlow Fase 1 incompatibile con Coming Soon;
- incongruenza tra `VERSION`, README e manifest.

## Controlli warning

- file troppo breve per il tipo dichiarato;
- placeholder;
- termini non presenti nel glossario;
- documenti senza inbound reference;
- eccessiva similarità semantica da revisionare manualmente.

## Artefatti

- `manifest.json`;
- `13_Appendices/04_Documentation_Audit_v0.95.md`;
- `13_Appendices/documentation_audit.json`;
- log della pipeline.

<!-- V0954-COMPLIANCE-CI:START -->
## 8. Architecture and governance checks

La Documentation CI deve fallire quando rileva:

- ID della release precedente mancanti o rinumerati;
- modifica in-place di un ADR Accepted;
- requisito fuori RTM o roadmap;
- documento costituzionale modificato senza CR;
- Jarvis descritto come pubblico o customer-facing;
- PrintFlow descritto come operativo in Fase 1;
- preventivo STL finale privo di human review;
- Negative Requirement senza controllo associato;
- stato `CONSISTENT` o `BASELINE READY` dichiarato senza authority evidence.
<!-- V0954-COMPLIANCE-CI:END -->

# 002 — Versioning Policy

> **Document ID:** DOC-GOV-002  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Project Governance  
> **Ambito autorevole:** versioni della Documentation Bible e dei singoli documenti.

## 1. Schema

La baseline usa Semantic Versioning adattato alla documentazione: `MAJOR.MINOR.PATCH`.

- **MAJOR:** cambiamento incompatibile di principi, contratti o struttura globale;
- **MINOR:** nuove capacità o specifiche backward-compatible;
- **PATCH:** chiarimenti, correzioni e miglioramenti senza modifica del comportamento atteso.

Versioni pre-baseline possono usare `0.x`.

## 2. Linea NoLimits3D

| Versione | Nome | Stato previsto |
|---|---|---|
| 0.9 | Foundation | sostituita dalla presente revisione |
| 0.95 | Architecture Consolidated | In Review |
| 1.0 | Frozen Baseline | da approvare prima dello sviluppo |
| 1.x | Controlled Evolution | modifiche governate da CR/ADR |

## 3. Regole

- Non creare copie con suffissi informali.
- La versione globale è registrata in `VERSION` e nel README.
- Il singolo documento può avanzare di patch durante la preparazione, ma la consegna contiene una versione coerente.
- Un documento baselined non viene riscritto nella stessa release storica.
- Il manifest identifica in modo crittografico il contenuto consegnato.

## 4. Compatibilità

Una modifica è incompatibile quando cambia:

- significato di un requisito stabile;
- forma di un contratto pubblico senza periodo di deprecazione;
- semantica di uno stato di dominio;
- identificatori persistenti;
- permessi o assunzioni di sicurezza;
- percorso operativo in modo da invalidare test e integrazioni esistenti.

## 5. Changelog

Ogni release deve contenere:

- Added;
- Changed;
- Deprecated;
- Removed;
- Security;
- Open decisions.

Le voci devono collegare CR e ADR pertinenti.

# Preventivatore STL — Revision Workflow

> **Document ID:** DOC-FEAT-007  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Quotation Operations  
> **Ambito autorevole:** revisione umana e trasformazione della stima in preventivo finale.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| REV-F-001 | Presentare file, brief, warning, slice e breakdown in una review console. | Must |
| REV-F-002 | Consentire approve, adjust, request information o reject. | Must |
| REV-F-003 | Richiedere motivazione per override o rifiuto. | Must |
| REV-F-004 | Creare una nuova versione del quote a ogni modifica commerciale. | Must |
| REV-F-005 | Conservare diff e autore. | Must |
| REV-F-006 | Impedire invio con dati obbligatori mancanti. | Must |
| REV-F-007 | Supportare SLA/priorità e assegnazione senza auto-approvazione AI. | Should |

## Review layout

Colonna evidenze (preview, metriche, warning), colonna requisiti/cronologia, colonna decisione e prezzo. Dati automatici mostrano versione e confidence. Gli allegati restano protetti.

## Request information

Domande inviate al cliente sono collegate alla revisione. La risposta riporta il workflow alla qualificazione; i risultati precedenti restano storici.

## Quote creation

Approve/adjust genera quote version con linee, assunzioni, validità e note. Solo dopo un secondo controllo configurabile diventa `Sent`.

## Acceptance

Nessun invio diretto dal modello AI, diff completo, permission test, concurrent edit handling, audit, notification idempotente e quote immutabile dopo invio.

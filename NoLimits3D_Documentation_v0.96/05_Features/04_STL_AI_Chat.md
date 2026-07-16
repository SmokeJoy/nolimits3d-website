# Preventivatore STL — Chat AI di qualificazione

> **Document ID:** DOC-FEAT-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** AI Product / Quotation  
> **Ambito autorevole:** conversazione che trasforma la richiesta STL in un brief strutturato; non possiede pricing o slicing.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| CHAT-F-001 | Raccogliere uso, quantità, dimensioni, ambiente, finitura e deadline mancanti. | Must |
| CHAT-F-002 | Non promettere stampabilità, materiale, tempi o prezzo definitivo. | Must |
| CHAT-F-003 | Trattare file, filename e messaggi come dati non fidati. | Must |
| CHAT-F-004 | Produrre un brief strutturato versionato e fonti della risposta. | Must |
| CHAT-F-005 | Limitare il numero di domande per turno e spiegare quelle tecniche. | Should |
| CHAT-F-006 | Consentire form/manuale e ripresa del dialogo. | Must |
| CHAT-F-007 | Escalare ad Andrea quando rischio/confidence lo richiede. | Must |

## Conversation strategy

La chat parte dai dati già noti e chiede soltanto ciò che cambia realmente fattibilità o stima. Le domande vengono raggruppate per priorità: uso e dimensione prima di preferenze estetiche. Il cliente può rispondere “non lo so”; il sistema registra l'incertezza invece di forzare una scelta.

## Output

`known_requirements`, `missing_requirements`, `constraints`, `material_candidates`, `risks`, `manual_review_required`, `summary`, `provenance`. Ogni aggiornamento crea una revisione del brief.

## Safety

Il modello non legge direttamente storage privato: riceve metadata autorizzati. Il testo nel file o nel nome non può cambiare prompt/policy. Le raccomandazioni materiali includono caveat e sono validate da regole di compatibilità.

## UX

La chat non è l'unico percorso: tutti i campi sono disponibili in forma strutturata. Errori o indisponibilità del provider mantengono il draft. Il riepilogo può essere corretto dal cliente prima dell'invio.

## Acceptance

Brief completo o esplicitamente incompleto, nessun overclaim, injection test superato, accessibilità tastiera/screen reader, history e provenance disponibili all'operatore.

# Error Catalog

> **Document ID:** DOC-ARCH-012  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Formato
`NL3D-{DOMAIN}-{NNN}` con HTTP status, titolo sicuro, dettaglio utente, dettaglio tecnico interno, retryability e correlation ID.

| Codice | Caso | Risposta utente |
|---|---|---|
| NL3D-FILE-001 | Tipo file non ammesso | “Il formato non è supportato. Carica STL, 3MF o ZIP secondo i limiti indicati.” |
| NL3D-FILE-002 | Malware/quarantena | “Il file non può essere elaborato. Contatta l'assistenza indicando il codice.” |
| NL3D-AUTH-001 | Sessione scaduta | “La sessione è scaduta. Accedi nuovamente; i dati locali non inviati restano disponibili quando possibile.” |
| NL3D-AI-001 | Analisi non disponibile | “L'analisi automatica non è disponibile. La richiesta sarà esaminata manualmente.” |
| NL3D-QUOTE-001 | Preventivo non più valido | “Il preventivo è scaduto; richiedi una revisione aggiornata.” |

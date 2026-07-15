# Data Classification e Retention

> **Document ID:** DOC-DATA-006  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Data Architecture  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Classi
Public, Internal, Confidential, Restricted.

STL cliente, dati identificativi, credenziali, token e conversazioni con allegati sono Confidential/Restricted secondo contenuto.

## Retention
Policy configurabile e documentata per lead, clienti, consensi, file, log, audit, backup e documenti fiscali. Cancellazione come workflow verificabile, con eccezioni legali motivate.

<!-- V0952-RETENTION:START -->
## Classi aggiuntive

Jarvis prompt/tool log, approval e internal documentation sono `Internal/Restricted`; worker input/output segue la classificazione del file cliente; original media con diritti è `Restricted`; public derivative è `Public`. Retention definitiva resta soggetta a legal/privacy review.
<!-- V0952-RETENTION:END -->

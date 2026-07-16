# Notification System

> **Document ID:** DOC-ARCH-011  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Canali
Email in Fase 1; notifiche admin in-app. SMS/push solo dopo analisi costi e consenso.

## Modello
Template versionati, eventi di dominio, preferenze utente, coda, retry, provider adapter, log consegna e suppression list.

## Eventi minimi
Conferma richiesta, verifica newsletter, preventivo inviato/scadente, ordine aggiornato, ticket assistenza, evento modificato, alert amministrativo.

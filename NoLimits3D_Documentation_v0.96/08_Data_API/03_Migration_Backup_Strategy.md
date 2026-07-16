# Migration e Backup Strategy

> **Document ID:** DOC-DATA-003  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Data Architecture  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Migration
Migrazioni versionate, forward-compatible, testate su copia anonima. Pattern expand/contract per cambi incompatibili. Nessuna modifica manuale in produzione.

## Backup
Backup automatici cifrati, retention differenziata, point-in-time recovery quando disponibile, copia separata degli object storage critici.

## Restore
Test trimestrale iniziale con evidenza: durata, integrità, permessi, applicazione avviabile. Target iniziali RPO 24h, RTO 8h; rivedere con e-commerce/produzione.

# File Storage Strategy

> **Document ID:** DOC-ARCH-010  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Ambito autorevole:** storage, accesso, trasferimento e retention dei file.

## Provider iniziale

Supabase Storage è l’object storage approvato per la topologia iniziale. Il dominio conserva un `storage_provider`, una storage key opaca e metadata; nessuna business rule dipende dal formato URL del provider.

## Classi di file

- media pubblici e derivative;
- originali media privati;
- STL e archivi cliente;
- render, preview e texture;
- G-code e output di slicing;
- documenti commerciali;
- export e backup.

## Regole

Object storage privato di default. Accesso con signed URL breve e scope minimo. Bucket/prefix separati per ambiente e livello di sensibilità. Hash del contenuto per deduplica e integrità. Gli asset pubblici sono derivative approvate, non gli originali caricati.

## Compute Worker transfer

1. il backend crea un job con riferimenti agli asset;
2. il worker autenticato ottiene URL firmati a scadenza breve;
3. scarica in una directory isolata per job;
4. verifica checksum e tipo;
5. esegue il tool;
6. carica l’output con checksum;
7. elimina i file temporanei secondo policy;
8. chiude il job con provenance.

Il PC Server non è storage autorevole e non deve trattenere copie indefinite di file cliente.

## Naming

`{scope}/{entity_type}/{entity_id}/{version}/{uuid}-{sanitized_name}`.

## Retention

Configurabile per categoria. File di richiesta non convertita: revisione e cancellazione pianificata; G-code e intermedi: retention breve salvo ordine attivo; documenti fiscali: retention normativa; log AI e worker: minimizzazione e scadenza.

## Portabilità

Export metadata + oggetti, checksum verification e adapter consentono migrazione futura a storage diverso senza cambiare gli ID di dominio.

<!-- V0952-STORAGE:START -->
## Supabase Storage e Media Library

Supabase Storage è il provider iniziale. Bucket e policy distinguono public derivative, private originals, customer uploads, quarantine, STL/G-code e audit artifacts. Il database conserva `media_asset`, versioni, checksum, provenance, rights, relations e usage references. Gli originali sono immutabili; i derivative sono rigenerabili. Jarvis e il browser non ricevono privilegi di cancellazione diretta.
<!-- V0952-STORAGE:END -->

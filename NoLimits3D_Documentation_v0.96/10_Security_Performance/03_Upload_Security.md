# STL e Image Upload Security

> **Document ID:** DOC-SEC-003  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Security / Performance  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Pipeline
Pre-signed upload → size/type checks → quarantine → antivirus → parser sandbox → metadata extraction → safe derivative → promotion.

## Controlli
Magic-byte validation, limiti decompressi, zip-bomb detection, filename normalization, SVG sanitization o rasterizzazione, EXIF removal, nessuna esecuzione, timeout e quota per utente/IP.

STL/3MF devono essere trattati come input non attendibile; parsing e slicing in container isolato senza rete e con limiti CPU/RAM/storage.

<!-- V0952-UPLOAD:START -->
## Media e Worker pipeline

Upload entra in bucket quarantine, riceve checksum/type/size scan e non è pubblicabile o lavorabile finché approvato. STL/G-code non vengono renderizzati o eseguiti nel browser. Il worker usa input per-job e sandbox; output resta privato finché validato.
<!-- V0952-UPLOAD:END -->

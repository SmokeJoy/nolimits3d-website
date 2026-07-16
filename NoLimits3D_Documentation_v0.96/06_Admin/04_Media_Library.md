# Media Library centralizzata

> **Document ID:** DOC-ADM-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Content Operations  
> **Ambito autorevole:** lifecycle, metadata, derivative, usage graph e amministrazione degli asset.

## 1. Principio

Un asset viene caricato una volta, conservato come originale e riutilizzato tramite riferimento. Il frontend utilizza derivative ottimizzate. Fotografie, render, immagini AI, documenti, STL e G-code sono tipi distinti.

## 2. Metadata minimi

ID, titolo interno, descrizione, ALT, tag, categoria, autore/provenienza, licenza/diritti, data, tipo, MIME, dimensioni, peso, checksum, stato editoriale, derivative, relazioni, usage references e audit. Le immagini AI sono marcate e conservano prompt/versione quando consentito.

## 3. Lifecycle

Quarantine → Review → Approved → Published/Reusable → Archived. Gli originali non vengono sovrascritti. Derivative hanno profilo/versione. Delete richiede dependency check; asset in uso viene sostituito o archiviato, non cancellato silenziosamente.

## 4. Storage

Supabase Storage con bucket/prefix per visibilità e rischio. Accesso privato via signed URL breve. Checksum/deduplication prevengono upload identici. Backup e retention seguono classificazione.

## 5. Jarvis

Jarvis può proporre titolo, ALT, tag e classificazione nel Command Center. Non modifica diritti, pubblica asset critici o cancella riferimenti senza conferma.

## 6. Requisiti

| ID | Requisito |
|---|---|
| MEDIA-F-001 | Gestire lifecycle e approvazione degli asset. |
| MEDIA-F-002 | Conservare provenance, diritti e prompt AI. |
| MEDIA-F-003 | Generare derivative versionate WebP/AVIF/fallback. |
| MEDIA-F-004 | Rilevare duplicati e mostrare usage graph. |
| MEDIA-F-005 | Applicare watermark solo a derivative. |
| MEDIA-F-006 | Impedire cancellazione di asset in uso senza sostituzione. |
| MEDIA-F-007 | Gestire video hero con poster, transcode, reduced-motion e budget. |
| MEDIA-F-008 | Caricare ogni asset una sola volta e riutilizzarlo tramite riferimento. |
| MEDIA-F-009 | Gestire tutti i metadata minimi e checksum definiti. |
| MEDIA-F-010 | Marcare immagini AI e mantenere distinti render, foto, STL e G-code. |
| MEDIA-F-011 | Proteggere originali e generare derivative riproducibili. |

<!-- V0953-MEDIA:START -->
## Authentic evidence e Brand Asset Gate

La Media Library deve gestire `real_photo`, `real_video`, `render`, `ai_concept`, `illustration`, `logo_candidate` e `logo_approved`. Solo `logo_approved` può alimentare asset production dopo gate. Le foto founder richiedono provenance/consenso e non possono essere sostituite da AI.

| ID | Requisito |
|---|---|
| MEDIA-F-012 | Gestire classificazione e disclosure pubblica di media reali, render e AI. |
| MEDIA-F-013 | Impedire l’uso production di logo candidate prima del Brand Asset Gate. |
| MEDIA-F-014 | Conservare provenance, consenso e usage scope delle fotografie founder/evento/cliente. |
<!-- V0953-MEDIA:END -->

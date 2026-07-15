# Preventivatore STL — Slicer

> **Document ID:** DOC-FEAT-005  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Manufacturing Engineering  
> **Ambito autorevole:** esecuzione isolata e riproducibile del slicing per stima; non decide il prezzo finale.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| SLICER-F-001 | Eseguire job in sandbox con quota CPU/RAM/tempo. | Must |
| SLICER-F-002 | Versionare slicer, macchina, nozzle, materiale e profilo. | Must |
| SLICER-F-003 | Conservare input fingerprint e output metrics immutabili. | Must |
| SLICER-F-004 | Supportare orientamenti/profili candidati senza sovrascrivere risultati. | Should |
| SLICER-F-005 | Restituire tempo, massa, supporti, cambi e warning strutturati. | Must |
| SLICER-F-006 | Gestire timeout/failure con review manuale. | Must |
| SLICER-F-007 | Impedire esecuzione di codice o accesso rete/filesystem non necessari. | Must |

## Job key

`file_checksum + geometry_transform + slicer_version + profile_version + machine_class`. La stessa chiave produce cache hit o risultato equivalente; un cambio profilo produce un nuovo run.

## Pipeline

accepted file → prepare isolated workspace → invoke slicer → parse output → validate metrics → persist result/artifacts → cleanup. G-code non viene eseguito dalla piattaforma e ha retention/accesso separati.

## Profilo

Un profilo è approvato, versionato e collegato a compatibilità materiale/macchina. Parametri arbitrari del cliente non vengono passati direttamente alla CLI.

## Failure modes

non-manifold, dimensioni oltre volume, memoria, timeout, supporti estremi, parser mismatch, tool crash. Ogni failure ha codice, log tecnico redatto e recovery suggerito.

## Acceptance

Riproducibilità su fixture, sandbox escape tests, metriche schema-valid, retry idempotente, correlation ID, nessun risultato parziale trattato come valido.

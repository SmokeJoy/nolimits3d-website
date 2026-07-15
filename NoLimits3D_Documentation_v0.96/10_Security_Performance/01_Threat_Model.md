# Threat Model

> **Document ID:** DOC-SEC-001  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Security / Performance  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Asset
Account admin, dati clienti, file STL, preventivi/ordini, prompt e tool AI, API keys, media, database e backup.

## Minacce prioritarie
Credential stuffing, broken access control, upload malevoli, SSRF tramite URL/media, XSS da CMS, CSRF, injection, scraping abusivo, webhook spoofing, prompt injection, data exfiltration AI, supply-chain e insider misuse.

## Metodo
Threat modeling per feature con STRIDE, abuse cases e security acceptance criteria. Riesame a ogni nuovo provider o capability AI.

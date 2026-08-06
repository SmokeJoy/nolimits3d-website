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

## Jarvis activation threat gate

`INV-JARVIS-001` classifica Jarvis come futura superficie Andrea-only nel Command Center, non come feature corrente. Prima del Blueprint dedicato devono restare assenti route, endpoint, prompt runtime, memoria, provider e tool Jarvis.

Il threat model dedicato deve coprire almeno: account takeover Andrea, broken access control, privilege/capability escalation, route discovery, customer-session access, confused deputy, prompt injection, retrieval poisoning, cross-scope data exfiltration, approval replay, secret leakage, false success, audit tampering, tool abuse, denial of wallet/rate budget e scope self-modification. Ogni controllo deve avere test negativo fail-closed e recovery verificabile.

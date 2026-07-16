# 004 — ADR Policy

> **Document ID:** DOC-GOV-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Ambito autorevole:** creazione e ciclo di vita degli Architecture Decision Records.

## 1. Scopo

Gli ADR conservano il ragionamento delle decisioni architetturali. Non sostituiscono SDS, API o feature specification; spiegano perché una scelta è stata adottata.

## 2. Stati

`Proposed`, `Accepted`, `Rejected`, `Superseded`, `Deprecated`.

## 3. Struttura

Ogni ADR contiene:

- contesto;
- decision drivers;
- opzioni considerate;
- decisione;
- conseguenze positive;
- conseguenze negative;
- rischi e mitigazioni;
- collegamenti a CR, requisiti e documenti;
- condizioni di riesame.

## 4. Immutabilità

Un ADR `Accepted` non viene riscritto per far sembrare inevitabile una decisione successiva. Un nuovo ADR lo supersede e collega quello precedente.

## 5. Criteri

Un ADR è richiesto per stack, data store, confini di servizio, integrazioni, security model, strategia AI, compatibilità, 3D engine, storage e processi asincroni.

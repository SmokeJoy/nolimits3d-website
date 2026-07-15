# ADR-0024 — NoLimits3D website as the center of Project Atlas

> **Document ID:** DOC-ADR-024  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

La visione deve impedire che Jarvis, PrintFlow e il sito vengano descritti come prodotti pubblici equivalenti.

## Decision

La NoLimits3D Website Platform è il centro dell’ecosistema. Command Center e Jarvis sono interni; PrintFlow e STL quoting sono capability future integrate e disaccoppiate.

## Consequences

Brand e architecture boundary chiari, customer journey unico e minore frammentazione. Limita la promozione autonoma di sottosistemi senza governance.

## Risks and mitigations

Drift documentale/marketing: semantic audit guard, Owner Document e CR obbligatoria.

## Revisit conditions

Solo una decisione strategica esplicita può cambiare la gerarchia dell’ecosistema.

## Links

- `12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md`;
- `12_Planning/01_ADR_Register.md`.

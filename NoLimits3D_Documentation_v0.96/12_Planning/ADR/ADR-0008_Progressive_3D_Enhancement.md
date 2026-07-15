# ADR-0008 — Three.js as progressive enhancement

> **Document ID:** DOC-ADR-008  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

Le decisioni approvate in CR-0003 risolvono la proposta originaria senza cambiare l’ID.

## Decision drivers

Usare Three.js tramite React Three Fiber/Drei e renderer adapter, lazy/adaptive, con fallback statico/2D completo.

## Decision

Configuratore 3D e filosofia premium, con variabilità device.

## Positive consequences

- esperienza distintiva;
- core non bloccato.

## Negative consequences

- due path di presentazione;
- performance da governare.

## Risks and mitigations

Budget, context-loss tests, reduced motion e fallback.

## Links

- `02_Architecture/07_Frontend_Architecture.md`;
- `10_Security_Performance/06_ThreeJS_3D_Optimization.md`;
- `CR-0003`.

## Revisit conditions

Requisiti eccedono capacità o dati reali suggeriscono altro engine.

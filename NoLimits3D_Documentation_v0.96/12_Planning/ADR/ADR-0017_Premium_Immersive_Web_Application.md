# ADR-0017 — Premium immersive Web Application

> **Document ID:** DOC-ADR-017  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Product Design / Frontend Architecture  
> **Alias decisione:** ADR-005 — Filosofia dell'interfaccia  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0002

## Context

Un sito classico sarebbe funzionale ma non rappresenterebbe adeguatamente innovazione, personalizzazione e competenza. Un’esperienza eccessiva, invece, danneggerebbe performance, accessibilità e conversione.

## Decision drivers

Differenziazione, percezione premium, configurazione 3D, feedback immediato, qualità software, accessibilità, SEO e prestazioni mobili.

## Options considered

1. sito marketing classico;
2. esperienza fortemente cinematografica;
3. Web Application Premium immersiva con progressive enhancement;
4. dashboard-style uniforme anche per contenuti editoriali.

## Decision

NoLimits3D sarà sviluppato come **Web Application Premium con esperienza utente immersiva**, mantenendo semplicità d’uso, alte prestazioni e animazioni esclusivamente funzionali.

Il principio costituzionale è **Software Quality Website**: ogni pagina rispetta standard da applicazione desktop per velocità, feedback, accessibilità, consistenza e chiarezza dello stato.

Sono ammessi hero video, 3D, glow verde, transizioni e microinterazioni soltanto come enhancement. Ogni animazione deve orientare, spiegare, guidare, confermare o mostrare causalità/stato.

## Positive consequences

- forte differenziazione percepita;
- configuratori e processi più comprensibili;
- coerenza tra sito, admin e strumenti;
- brand più strutturato e premium.

## Negative consequences

- maggiore disciplina di design/performance;
- più stati e fallback da testare;
- rischio di over-design e costi visuali;
- necessità di test su device reali.

## Risks and mitigations

Functional-motion review, performance budget, reduced-motion, no scroll hijacking, semantic/server content, lazy video/3D, fallback statico, analytics e rimozione degli effetti che non dimostrano valore.

## Links

- `00_Foundation/00_Project_Constitution.md`;
- `03_Design/02_Design_System.md`;
- `03_Design/06_Motion_and_3D_Visual_Language.md`;
- `10_Security_Performance/05_Performance_Plan.md`;
- `12_Planning/ADR/ADR-0008_Progressive_3D_Enhancement.md`;
- `12_Planning/Change_Requests/CR-0002_Atlas_Decisions.md`.

## Revisit conditions

Metriche dimostrano peggioramento significativo di conversione/accessibilità/performance, o la maggioranza dei target device non supporta l’esperienza entro budget.

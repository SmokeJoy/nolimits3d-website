# Sprint Plan: PA-M002-SPRINT-001

## Metadata
* **Milestone**: M-002 Design System & UI Foundation
* **Target Package**: `@atlas/ui`
* **Status**: PROPOSED
* **Gate**: Requires `PROCEED — M-002 DESIGN SYSTEM`

## 1. WIP Limits & Rules
- **Claude WIP**: Massimo 1 Task Packet attivo.
- **Codex WIP**: Massimo 1 Task Packet attivo.
- **PR Simultanee**: Massimo 2 PR implementative in corso (una per team/wave).
- **Ownership Esclusiva Lockfile**: Un solo owner alla volta può modificare `packages/ui/package.json` e `pnpm-lock.yaml`.
- **Sequenzialità Wave**: Nessuna Wave successiva può iniziare prima del gate formale di completamento della Wave precedente.

## 2. File Ownership
- **Claude (Frontend)**: `packages/ui/src/**`, `packages/ui/styles/**`.
- **Codex (CI & Guard)**: `packages/ui/*.config.*`, `scripts/guards/**`, `.github/workflows/**`, `packages/ui/tests/**`.
- **Ownership Alternata**: `packages/ui/package.json` e `pnpm-lock.yaml` passano a Codex durante la Wave A (setup) e D, a Claude durante la Wave B e C per aggiunta dipendenze componenti.

## 3. Scope & Wave Structure

### Wave A: CI, Guardrails & Package Setup
* **Goal**: Pre-flight setup: package scripts (lint, test, build), configuration, test suite scaffolding. Codex agisce per primo.
* **Owner**: Codex
* **Dependencies**: Ladle/Playwright approval (Tooling Eval).
* **PR Sequence**: Branch `m002/wave-a-ci`, PR a `main`.
* **Merge Criteria**: Pipeline verde su `@atlas/ui`, dipendenze installate correttamente.

### Wave B: Architecture & Token Foundation
* **Goal**: Implementare Tailwind config e token semantici.
* **Owner**: Claude
* **Dependencies**: Wave A completa e unita.
* **PR Sequence**: Branch `m002/wave-b-tokens`, PR a `main`.
* **Merge Criteria**: Token Schema rispettato, CSS generato, nessun magic number, format check superato.

### Wave C: Primitive Components (Tranche 1 & 2)
* **Goal**: Implementazione shadcn/ui. (Button, Badge, Input, ecc).
* **Owner**: Claude
* **Dependencies**: Wave B completa e unita.
* **PR Sequence**: Branch `m002/wave-c-primitives`, PR a `main`.
* **Merge Criteria**: WCAG 2.2 AA superato (Axe test), coverage adeguata, review manuale Ladle.

### Wave D: Integration, Evidence & Final Audit
* **Goal**: Audit completo, Evidence Matrix finale, chiusura Sprint.
* **Owner**: Gemini
* **Dependencies**: Wave C unita.
* **PR Sequence**: Branch `m002/wave-d-audit`, PR a `main`.
* **Merge Criteria**: Zero violazioni audit-root.

## 4. Execution Controls

- **Stop/Escalation Conditions**: 
  - CI fallita per >2 commit consecutivi.
  - Trovati blocchi insormontabili di compatibilità tra le librerie React/Vite/Ladle.
  - Violazione accidentale dei confini legacy (`apps/legacy-web`).
- **Rollback**: In caso di escalation critica non risolvibile, procedere a `git revert` della specifica Wave PR o soft reset del main. `pnpm-lock.yaml` deve essere ripristinato al commit di chiusura M-001.
- **Scope Budget**: Esclusivamente limitato a primitive, tokens e setup preview. Nessuna business logic o componenti custom non catalogati in `M002-PRIMITIVE-INVENTORY.md`.

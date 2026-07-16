# Sprint Plan: PA-M002-SPRINT-001

## Metadata
* **Milestone**: M-002 Design System & UI Foundation
* **Target Package**: `@atlas/ui`
* **Base SHA**: TBD (Da compilare al via)
* **Status**: PROPOSED
* **Gate**: Requires `PROCEED — M-002 DESIGN SYSTEM`

## 1. WIP Limits & Rules
- **WIP Limit**: Massimo 1 Task Packet o Wave attiva nel sistema.
- **PR Simultanee**: Vietate. Sequenzialità assoluta per ogni Wave.
- **Ownership Lockfile**: `packages/ui/package.json` e `pnpm-lock.yaml` restano sotto **ownership esclusiva di Codex** per tutto lo sprint. Le dipendenze sono congelate prima dell'avvio tramite la `M002_DEPENDENCY_ADOPTION_DECISION.md`. Claude non può modificare il lockfile e deve presentare una "dependency request" qualora fosse necessaria un'eccezione in corso d'opera.
- **Sequenzialità Wave**: Nessuna Wave può iniziare prima del gate formale di completamento della Wave precedente.

## 2. File Ownership
- **Claude (Frontend)**: `packages/ui/src/**`, `packages/ui/styles/**`.
- **Codex (CI & Guard)**: `packages/ui/package.json`, `pnpm-lock.yaml`, `packages/ui/*.config.*`, `scripts/guards/**`, `.github/workflows/**`, `packages/ui/tests/**`.
- **Gemini**: Evidence collection, Governance audit.

## 3. Scope & Wave Structure

### Wave A — Codex
* **Goal**: Dependency BOM integration, package foundation, config scripts, CI integration.
* **Estimate**: 1-2 ore.
* **PR Sequence**: Branch `m002/wave-a-ci`, PR a `main`.
* **Merge Gate**: Pipeline verde su `@atlas/ui`, BOM installato, Lint e Test scaffolded.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-a/`

### Wave B — Claude
* **Goal**: Token implementation (Tailwind CSS-first, design tokens root).
* **Estimate**: 2 ore.
* **Dependencies**: Wave A completa e unita.
* **PR Sequence**: Branch `m002/wave-b-tokens`, PR a `main`.
* **Merge Gate**: Root variables mappate correttamente secondo il Token Schema (solo reference, semantici), nessun file di configurazione vietato creato.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-b/`

### Wave C1 — Claude
* **Goal**: Implementazione core primitives: Button, Badge, Skeleton, StatusIndicator, Card.
* **Estimate**: 3-4 ore.
* **Dependencies**: Wave B completa e unita.
* **PR Sequence**: Branch `m002/wave-c1-primitives`, PR a `main`.
* **Merge Gate**: Component inventory rispettato per ogni componente, Vite Playground preview funzionante.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-c1/`

### Wave C2 — Claude
* **Goal**: Implementazione complex forms & layout: Input, FormField, Select, Dialog, Tabs, Toast.
* **Estimate**: 3-4 ore.
* **Dependencies**: Wave C1 completa e unita.
* **PR Sequence**: Branch `m002/wave-c2-forms`, PR a `main`.
* **Merge Gate**: Component inventory rispettato, A11y tests inclusi.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-c2/`

### Wave D — Codex
* **Goal**: Final guards, CI refinement, dependency verification (nessuna dipendenza non autorizzata).
* **Estimate**: 1 ora.
* **Dependencies**: Wave C2 completa e unita.
* **PR Sequence**: Branch `m002/wave-d-audit`, PR a `main`.
* **Merge Gate**: Isolation rules per il legacy garantite.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-d/`

### Wave E — Gemini
* **Goal**: Evidence collection and final Architect Review preparation.
* **Estimate**: 1 ora.
* **Dependencies**: Tutte le Wave implementative chiuse.
* **PR Sequence**: Branch `m002/wave-e-evidence`, PR a `main`.
* **Merge Gate**: Zero violazioni governance, evidence table completa con tutti i commit SHA.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/final/`

## 4. Execution Controls

- **Stop/Escalation Conditions**: 
  - CI fallita in modo irreversibile su branch PR.
  - Trovati blocchi insormontabili di compatibilità tra le librerie React/Vite.
  - Violazione accidentale dei confini legacy (`apps/legacy-web`).
- **Rollback**: In caso di escalation critica non risolvibile o fallimento, procedere con `git revert <merge-commit-della-wave>`. È vietato l'uso di `git reset` (soft o hard) su branch principali o modifiche distruttive della history.
- **Scope Budget**: Esclusivamente limitato a primitive, tokens e setup baseline in Vite. Nessuna business logic.

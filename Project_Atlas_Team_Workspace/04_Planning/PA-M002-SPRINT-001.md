# Sprint Plan: PA-M002-SPRINT-001

## Metadata
* **Milestone**: M-002 Design System & UI Foundation
* **Target Package**: `@atlas/ui`
* **Status**: PROPOSED
* **Gate**: Requires `PROCEED — M-002 DESIGN SYSTEM`

## 1. Objectives
Implement the official Design System foundation for Project Atlas strictly within `@atlas/ui`. Establish semantic design tokens, accessible motion foundations, and a curated set of baseline UI primitives.

## 2. Scope & Wave Structure
The Sprint is structured into sequential waves to guarantee adherence to governance and architectural rules.

### Wave A: Architecture & Token Foundation
* **Goal**: Establish the `Tailwind CSS` + `shadcn/ui` base, implement the semantic `TOKEN-SCHEMA` (Dark/Light).
* **Owner**: Frontend Engineering / Claude
* **Dependencies**: Ladle/Vite configuration approval (ADR-0019).
* **Quality Gates**: Lint, format, token schema validation, no magic numbers.

### Wave B: Primitive Components (Tranche 1)
* **Goal**: Implement baseline components: `Button`, `Badge`, `Skeleton`, `StatusIndicator`.
* **Owner**: Frontend Engineering / Claude
* **Dependencies**: Wave A completed.
* **Quality Gates**: WCAG 2.2 AA, keyboard testing, Vite Playground/Ladle visual evidence.

### Wave C: Primitive Components (Tranche 2)
* **Goal**: Implement complex forms and interactive primitives: `Input`, `FormField`, `Select`, `Card`, `Dialog/Modal`, `Tabs`, `Toast`.
* **Owner**: Frontend Engineering / Claude
* **Dependencies**: Wave B completed.
* **Quality Gates**: Reduced motion, accessible focus states, a11y testing.

### Wave D: CI, Tooling & Guardrails
* **Goal**: Setup `@atlas/ui` package CI tests and ensure integration with `scripts/guards`.
* **Owner**: Backend & CI Pipeline / Codex
* **Dependencies**: Parallel to Wave A-C.
* **Quality Gates**: Remote pipeline is green.

### Wave E: Integration, Evidence & Final Audit
* **Goal**: Perform `audit-root`, collect evidence matrices, generate final handoff for the Architect.
* **Owner**: Integration QA / Gemini
* **Dependencies**: Waves A, B, C, D completed.
* **Quality Gates**: Zero violations, complete documentation binding.

## 3. Governance Pointers
* **Claude Task Packet**: `M002-TASK-PACKET-CLAUDE.md`
* **Codex Task Packet**: `M002-TASK-PACKET-CODEX.md`
* **Token Schema**: `M002-TOKEN-SCHEMA.md`
* **Primitive Inventory**: `M002-PRIMITIVE-INVENTORY.md`
* **Preview Tooling Decision**: `ADR-0019-PREVIEW-TOOLING.md`
* **Evidence Matrix**: `M002-EVIDENCE-MATRIX.md`

## 4. Execution Restrictions
- `apps/legacy-web` is strictly isolated. No imports, no redesign.
- `/design-sync` must only be run after Token Schema and Primitive Inventory are APPROVED by the Architect, and only upon an explicit gate to do so.
- Changes must be isolated inside `@atlas/ui` workspace.

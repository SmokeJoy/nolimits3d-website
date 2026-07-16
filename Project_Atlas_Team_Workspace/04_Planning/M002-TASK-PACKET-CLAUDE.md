# Task Packet: Claude (Frontend Engineering)

## Metadata
* **Task ID**: `TSK-M002-CLAUDE-01`
* **Roadmap IDs**: `E-0003`, `F-0007`, `S-0013`, `S-0014`, `T-0025-T-0028`, `ST-0013-ST-0014`
* **Branch**: `m002/wave-b-tokens` (Wave B), `m002/wave-c-primitives` (Wave C)
* **Owner**: Claude
* **Handover Recipient**: Gemini (per integrazione)

## Rules & Scope
* **Allowed Files**: `packages/ui/src/**`, `packages/ui/styles/**`, `packages/ui/package.json` (solo Wave C per deps), `pnpm-lock.yaml` (solo Wave C).
* **Forbidden Files**: Qualsiasi file in `apps/legacy-web`, root configs, `scripts/guards`.
* **Preconditions**:
  - `M002-TOKEN-SCHEMA.md` e `M002-PRIMITIVE-INVENTORY.md` formalmente in stato APPROVED.
  - Codex ha completato Wave A (CI green).
  - Le dipendenze per Componenti sono state esplicitamente autorizzate (es. Radix).

## Exact Deliverables
1. `tailwind.config.js` e file CSS globale in `@atlas/ui` allineato al Token Schema.
2. Componenti implementati (Button, Badge, Skeleton, StatusIndicator, Input, FormField, Select, Card, Dialog/Modal, Tabs, Toast).
3. Test a11y/unit per ogni componente in `packages/ui/src/`.

## Exact Commands
- `pnpm install <dependency> --filter @atlas/ui` (solo previe autorizzazioni)
- `pnpm run test --filter @atlas/ui`
- `pnpm run lint --filter @atlas/ui`
- `pnpm run build --filter @atlas/ui`

## Acceptance Criteria
- Nessun *magic number* nei CSS/Tailwind (solo reference semantici).
- Passaggio WCAG 2.2 AA.
- Rispetto delle policy A11y (reduced-motion, focus, keyboard nav).
- Nessuna alterazione al legacy.

## Evidence Paths
- Snapshots/Test Report: `packages/ui/tests/reports/`
- Component source: `packages/ui/src/components/`

## Control & Operations
- **Rollback**: `git reset --hard origin/main` sul proprio branch e `pnpm install` per clean state.
- **Stop/Escalation Conditions**: Se si rende necessario modificare un file "forbidden" o si incontrano peer-dependencies conflicts (es. React 18 vs 19) insormontabili, fermarsi e chiamare l'Architect.

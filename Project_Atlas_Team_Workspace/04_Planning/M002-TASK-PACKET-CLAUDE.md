# Task Packet: Claude (Frontend Engineering)

## Metadata
* **Task ID**: `TSK-M002-CLAUDE-01`
* **Roadmap IDs**: `S-0014`, `T-0027`, `T-0028`, `ST-0014`
* **Branch**: `m002/wave-b-tokens`, `m002/wave-c1-primitives`, `m002/wave-c2-forms`
* **Owner**: Claude
* **Handover Recipient**: Codex (per Wave D)

## Rules & Scope
* **Allowed Files**: `packages/ui/src/**`, `packages/ui/styles/**`.
* **Forbidden Files**: `tailwind.config.js`, `packages/ui/package.json`, `pnpm-lock.yaml`, Qualsiasi file in `apps/legacy-web`, root configs, `scripts/guards`.
* **Preconditions**:
  - `M002-TOKEN-SCHEMA.md` e `M002-PRIMITIVE-INVENTORY.md` formalmente in stato APPROVED.
  - La Dependency Adoption Decision M-002 è stata implementata e consolidata in Wave A.
  - Codex ha completato Wave A (CI green, lockfile chiuso).

## Exact Deliverables
1. File CSS globale in `@atlas/ui/styles/` allineato al Token Schema usando sintassi CSS-first (Tailwind v4). Nessun file di configurazione JS.
2. Componenti Wave C1 e C2 implementati seguendo pedissequamente i contratti di accessibilità, stato asincrono e design del Primitive Inventory.
3. Esempi/Storie in `packages/ui/src/` visibili tramite Vite Playground.

## Exact Commands
*(L'installazione di dipendenze è disabilitata per questo task)*
- `pnpm --filter @atlas/ui test`
- `pnpm --filter @atlas/ui lint`
- `pnpm --filter @atlas/ui typecheck`
- `pnpm --filter @atlas/ui build`

## Acceptance Criteria
- Nessun *magic number* nei CSS (solo reference semantici, es. var(--bg-surface)).
- Tutte le voci del contratto Primitive rispettate (inclusi errori, reduced-motion, focus, keyboard nav).
- Nessuna alterazione al legacy o a file di competenza Codex.

## Evidence Paths
- Component source: `packages/ui/src/components/`
- Vite Playground rendering validato manualmente.

## Control & Operations
- **Rollback**: In caso di fallimento della branch implementativa in remoto, avvertire l'Architect per orchestrare un `git revert` formale (la mutazione della history è vietata).
- **Stop/Escalation Conditions**: Se è necessaria una dipendenza non censita o si incontrano peer-dependencies conflicts, fermarsi e chiamare l'Architect per una "dependency request". Non modificare package.json.

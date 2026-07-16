# Task Packet: Codex (CI and Guardrails)

## Metadata
* **Task ID**: `TSK-M002-CODEX-01`
* **Roadmap IDs**: `N/A` (Enabler task)
* **Branch**: `m002/wave-a-ci`, `m002/wave-d-audit`
* **Owner**: Codex
* **Handover Recipient**: Claude (per Wave A->B), Gemini (per Audit finale)

## Rules & Scope
* **Allowed Files**: `packages/ui/package.json`, `pnpm-lock.yaml`, `packages/ui/*.config.*`, `scripts/guards/**`, `.github/workflows/**`, `packages/ui/tests/**`.
* **Forbidden Files**: `packages/ui/src/**`, `packages/ui/styles/**`, `apps/legacy-web/**`.
* **Preconditions**:
  - Nessuna precondition per Wave A, è l'apripista.
  - La Dependency Adoption Policy deve aver validato l'aggiunta di Vitest/Testing Library prima dell'aggiunta a `package.json`.

## Exact Deliverables
1. Configurazione `lint`, `typecheck`, `test`, `build` dentro `packages/ui/package.json`.
2. Integrazione di `@atlas/ui` nelle pipeline CI di root (`.github/workflows/ci.yml`).
3. Setup iniziale configurazione dei test in `@atlas/ui`.

## Exact Commands
- `pnpm install <dependency> --filter @atlas/ui -D` (solo per tool autorizzati)
- `pnpm run lint --filter @atlas/ui`
- `pnpm run test --filter @atlas/ui`

## Acceptance Criteria
- Script di root `pnpm run lint` e `pnpm run test` devono lanciare con successo i task in `@atlas/ui`.
- CI remota risulta verde (Success).
- Nessuna alterazione delle regole di lint o build di `apps/legacy-web`.

## Evidence Paths
- CI Workflow Run URLs.
- Root scripts execution logs.

## Control & Operations
- **Rollback**: `git checkout origin/main -- packages/ui/package.json pnpm-lock.yaml` e ripristino dei file workflow.
- **Stop/Escalation Conditions**: Fallimento continuo delle pipeline CI root causato dall'inclusione di `@atlas/ui`. Incompatibilità di configurazioni ESLint/TypeScript con il resto del monorepo. Chiamare l'Architect.

# Task Packet: Codex (CI and Guardrails)

## Metadata
* **Task ID**: `TSK-M002-CODEX-01`
* **Roadmap IDs**: `T-0025-T-0028`, `ST-0013-ST-0014` (abilitazione CI e Guards per questi ID)
* **Branch**: `m002/wave-a-ci`, `m002/wave-d-audit`
* **Owner**: Codex
* **Handover Recipient**: Claude (per Wave B), Gemini (per Audit E)

## Rules & Scope
* **Allowed Files**: `packages/ui/package.json`, `pnpm-lock.yaml`, `packages/ui/*.config.*`, `scripts/guards/**`, `.github/workflows/**`, `packages/ui/tests/**`.
* **Forbidden Files**: `packages/ui/src/**`, `packages/ui/styles/**`, `apps/legacy-web/**`.
* **Preconditions**:
  - `M002_DEPENDENCY_ADOPTION_DECISION.md` formalmente in stato APPROVED.
  - Nessuna precondition aggiuntiva per Wave A, in quanto è il blocco fondante.

## Exact Deliverables
1. Configurazione `lint`, `typecheck`, `test`, `build` dentro `packages/ui/package.json`.
2. Implementazione esatta del BOM di `M002_DEPENDENCY_ADOPTION_DECISION.md` dentro il `package.json` di `@atlas/ui`. (Tailwind CSS-first, radix-ui, Vite, vitest, ecc).
3. Integrazione di `@atlas/ui` nelle pipeline CI di root (`.github/workflows/ci.yml`).
4. Setup iniziale configurazione dei test in `@atlas/ui` (Wave A).
5. Audit e stabilizzazione finale (Wave D), assicurando l'assenza di violazioni di scope boundary verso legacy.

## Exact Commands
- `pnpm --filter @atlas/ui add <dependency> -D` (Esclusivamente tool autorizzati dal BOM)
- `pnpm --filter @atlas/ui add <dependency>` (Esclusivamente tool autorizzati dal BOM)
- `pnpm --filter @atlas/ui lint`
- `pnpm --filter @atlas/ui typecheck`
- `pnpm --filter @atlas/ui test`

## Acceptance Criteria
- Tutti gli script di root (`pnpm lint`, `pnpm test`) avviano correttamente la verifica di `@atlas/ui`.
- CI remota risulta verde (Success).
- Nessuna alterazione delle regole di lint, dipendenze o build di `apps/legacy-web`.
- Solo Codex possiede i diritti di mutazione su `package.json` o `pnpm-lock.yaml`.

## Evidence Paths
- CI Workflow Run URLs.
- Root scripts execution logs (Report file generati dai task CI).

## Control & Operations
- **Rollback**: In caso di fallimento grave, `git revert` formale per Wave A. La mutazione distruttiva della history di main è vietata.
- **Stop/Escalation Conditions**: Fallimento continuo delle pipeline CI root causato dall'inclusione di `@atlas/ui`. Incompatibilità di configurazioni ESLint/TypeScript/Vitest. Chiamare l'Architect.

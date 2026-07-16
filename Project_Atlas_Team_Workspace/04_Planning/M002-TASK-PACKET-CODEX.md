# Task Packet Codex: CI & Infrastructure

## 1. TSK-M002-CODEX-A (Dependency & Foundation Setup)
* **Roadmap IDs**: `T-0027`, `T-0028` (Infrastruttura di test/CI)
* **Branch**: `m002/wave-a-ci`
* **Owner**: Codex
* **Handover Recipient**: Claude (per Wave B)
* **Vite Playground Path**: `apps/web/`
* **Allowed Files**:
  - `packages/ui/package.json`
  - `pnpm-lock.yaml`
  - `packages/ui/tsconfig.json`
  - `packages/ui/tsconfig.build.json`
  - `packages/ui/vite.config.ts` (configurazione del plugin tailwindcss e vite)
  - `packages/ui/vitest.config.ts` (setup vitest e jsdom)
  - `.github/workflows/**` (CI workflow)
* **Forbidden Files**: `packages/ui/src/**`, `packages/ui/styles/**`, `apps/legacy-web/**`, `apps/web/src/**`.
* **Preconditions**:
  - `M002_DEPENDENCY_ADOPTION_DECISION.md` approvato dall'Architect.
* **Exact Deliverables**:
  - Installazione delle dipendenze esatte del BOM in `@atlas/ui` e aggiornamento del lockfile.
  - Setup degli script `lint`, `typecheck`, `test`, `build` in `packages/ui/package.json`.
  - Integrazione di `@atlas/ui` nella pipeline di root e configurazione di Vitest con supporto JSDOM.
* **Exact Commands**:
  - `pnpm --filter @atlas/ui add -D <dev-dependency>` (Esclusivamente pacchetti dal BOM)
  - `pnpm --filter @atlas/ui add <dependency>` (Esclusivamente pacchetti dal BOM)
  - `pnpm install --frozen-lockfile`
  - `pnpm --filter @atlas/ui typecheck`
  - `pnpm --filter @atlas/ui test`

---

## 2. TSK-M002-CODEX-D (Final Guardrails & CI Verification)
* **Roadmap IDs**: `T-0027`, `T-0028`, `ST-0014` (Chiusura e verifica isolamento)
* **Branch**: `m002/wave-d-audit`
* **Owner**: Codex
* **Handover Recipient**: Gemini (per Wave E)
* **Vite Playground Path**: `apps/web/`
* **Allowed Files**:
  - `packages/ui/package.json`
  - `pnpm-lock.yaml`
  - `scripts/guards/**` (se sono necessari aggiornamenti alle regole di isolamento di root)
  - `.github/workflows/**`
* **Forbidden Files**: `packages/ui/src/**`, `packages/ui/styles/**`, `apps/legacy-web/**`.
* **Preconditions**:
  - Claude ha completato `TSK-M002-CLAUDE-C2` con tutte le primitive testate localmente.
* **Exact Deliverables**:
  - Verifica dell'isolamento del package `@atlas/ui` (zero importazioni da o verso `apps/legacy-web`).
  - Esecuzione finale degli script di sicurezza, lint, typecheck e build su tutta la codebase.
  - Validazione dei lockfile e delle dipendenze per escludere modifiche non autorizzate.
* **Exact Commands**:
  - `pnpm install --frozen-lockfile`
  - `pnpm run lint` (root lint)
  - `pnpm run typecheck` (root typecheck)
  - `pnpm --filter @atlas/ui build`
  - `pnpm run dependency:audit`

---

## Control & Operations (Tutti i Task Codex)
- **Rollback**: In caso di errore o blocco della build di root, revertare il merge commit della Wave tramite `git revert <merge-commit>`. La mutazione della history remota del main è vietata.
- **Stop/Escalation Conditions**: Fermare immediatamente l'esecuzione in caso di crash irreversibile delle pipeline CI di root indotto dal pacchetto `@atlas/ui` o conflitti di configurazione con TypeScript/Vitest a livello monorepo. Contattare l'Architect.

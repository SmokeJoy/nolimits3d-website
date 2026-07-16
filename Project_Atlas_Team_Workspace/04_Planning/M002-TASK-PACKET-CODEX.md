# Task Packet Codex: CI & Infrastructure

## 1. TSK-M002-CODEX-A (Dependency & Foundation Setup)
* **Roadmap IDs**: `T-0025`, `T-0026` (Abilitazione token e builds)
* **Branch**: `m002/wave-a-ci`
* **Owner**: Codex
* **Handover Recipient**: Claude (per Wave B)
* **Vite Playground Path**: `apps/ui-playground/`
* **Allowed Files**:
  - `packages/ui/package.json`
  - `pnpm-lock.yaml`
  - `packages/ui/tsconfig.json`
  - `packages/ui/tsconfig.build.json`
  - `packages/ui/vite.config.ts` (configurazione del plugin tailwindcss e vite per compilare e copiare il CSS globale in `dist/styles.css`)
  - `packages/ui/vitest.config.ts` (setup vitest e jsdom)
  - `apps/ui-playground/package.json` (setup playground interno senza rilascio in produzione)
  - `apps/ui-playground/vite.config.ts` (integrazione tailwindcss plugin e dev configuration)
  - `apps/ui-playground/tsconfig.json`
  - `.github/workflows/**` (CI workflow)
* **Forbidden Files**: `packages/ui/src/**`, `packages/ui/styles/**`, `apps/legacy-web/**`, `apps/web/**`, `apps/ui-playground/src/**`.
* **Preconditions**:
  - `M002_DEPENDENCY_ADOPTION_DECISION.md` approvato dall'Architect.
* **Exact Deliverables**:
  - Installazione delle dipendenze esatte del BOM in `@atlas/ui` e `apps/ui-playground`, e aggiornamento del lockfile.
  - Setup degli script `lint`, `typecheck`, `test`, `build` in `packages/ui/package.json`.
  - Configurazione della build di `@atlas/ui` per produrre output JavaScript e declaration files in `dist/` (es. `dist/index.js`, `dist/index.d.ts`) e copia/compilazione di `styles/global.css` in `dist/styles.css`, con export `@atlas/ui/styles.css` mappato nel `package.json`.
  - Integrazione di `@atlas/ui` e `apps/ui-playground` nella pipeline di root e configurazione di Vitest con supporto JSDOM.
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
* **Vite Playground Path**: `apps/ui-playground/`
* **Allowed Files**:
  - `packages/ui/package.json`
  - `pnpm-lock.yaml`
  - `apps/ui-playground/package.json`
  - `scripts/guards/**` (se sono necessari aggiornamenti alle regole di isolamento di root)
  - `.github/workflows/**`
* **Forbidden Files**: `packages/ui/src/**`, `packages/ui/styles/**`, `apps/legacy-web/**`, `apps/web/**`, `apps/ui-playground/src/**`.
* **Preconditions**:
  - Claude ha completato `TSK-M002-CLAUDE-C2` con tutte le primitive testate localmente.
* **Exact Deliverables**:
  - Verifica dell'isolamento del package `@atlas/ui` (zero importazioni da o verso `apps/legacy-web`).
  - Garanzia che `apps/ui-playground` non venga incluso in alcuna build o rilascio di produzione (production-exclusion).
  - Esecuzione finale degli script di sicurezza, lint, typecheck e build su tutta la codebase.
* **Exact Commands**:
  - `pnpm install --frozen-lockfile`
  - `pnpm run lint` (root lint)
  - `pnpm run typecheck` (root typecheck)
  - `pnpm --filter @atlas/ui build`
  - `pnpm run dependency:audit`

---

## Control & Operations (Tutti i Task Codex)
- **Rollback**: In caso di errore o blocco della build di root, revertare il merge commit della Wave tramite `git revert <merge-commit>`. La mutazione della history remota del main è vietata.
- **Stop/Escalation Conditions**: Fermare immediatamente l'esecuzione in caso di crash delle pipeline CI o conflitti di configurazione con TypeScript/Vitest a livello monorepo. Contattare l'Architect.

# Sprint Plan: PA-M002-SPRINT-001

## Metadata
* **Milestone**: M-002 Design System & UI Foundation
* **Target Package**: `@atlas/ui`
* **Base SHA**: TBD (Verrà compilato dall'Architect all'attivazione del gate PROCEED)
* **Status**: PROPOSED
* **Gate**: Richiede `PROCEED — M-002 DESIGN SYSTEM`

---

## 1. Regole di WIP e Concorrenza
- **WIP Limit**: Massimo 1 Wave o Task Packet attivo contemporaneamente nel monorepo.
- **PR Simultanee**: Rigorosamente vietate. Ogni Wave deve essere completata, testata, revisionata, e integrata (merged) su `main` prima che possa essere creata la PR per la Wave successiva.
- **Ownership Esclusiva Lockfile & Configs**: I file `packages/ui/package.json`, `pnpm-lock.yaml`, e tutte le configurazioni del playground (`apps/ui-playground/package.json`, `apps/ui-playground/vite.config.ts`, `apps/ui-playground/tsconfig*.json`) rimangono sotto **ownership esclusiva e permanente di Codex**. Claude non può apportare alcuna modifica diretta a questi file.
- **Dependency Lock (BOM Immutabile)**: Le dipendenze per lo sviluppo di `@atlas/ui` e `apps/ui-playground` sono congelate prima dell'avvio dello sprint e consistono in:
  - Production/Peer: `@base-ui/react` (1.6.0), `sonner` (2.0.7), `tailwindcss` (4.3.2), `class-variance-authority` (0.7.1), `clsx` (2.1.1), `tailwind-merge` (3.6.0), `lucide-react` (1.24.0), `tw-animate-css` (1.4.0), `react` (19.2.7), `react-dom` (19.2.7).
  - DevDependencies: `@tailwindcss/vite` (4.3.2), `shadcn` (4.13.0), `@types/react` (19.2.17), `@types/react-dom` (19.2.3), `vite` (8.1.4), `@vitejs/plugin-react` (6.0.3), `vitest` (4.1.10), `jsdom` (29.1.1), `@testing-library/react` (16.3.2), `@testing-library/jest-dom` (6.9.1), `@testing-library/dom` (10.4.1), `axe-core` (4.12.1).

---

## 2. Definizione dei Confini e File Ownership
- **Playground Interno**: L'applicazione `apps/ui-playground/` serve unicamente come ambiente locale per isolare e sviluppare i componenti di `@atlas/ui`. Non viene distribuita in produzione e non altera `apps/web` o `apps/legacy-web`. Importa `@atlas/ui` come dipendenza locale del workspace pnpm.
- **Claude (Frontend)**:
  - Allowed: `packages/ui/src/**` (esclusivamente codice sorgente componenti), `packages/ui/styles/**` (sorgenti CSS), `packages/ui/tests/**` (file `.test.tsx`), e file di esempio/storia in `apps/ui-playground/src/**`.
  - Forbidden: configurazioni TS/Vite/Vitest, package.json, pnpm-lock.yaml, file in `apps/legacy-web/**`, `apps/web/**`, configurazioni root o script di guards.
- **Codex (CI & Infrastructure)**:
  - Allowed: `packages/ui/package.json`, `pnpm-lock.yaml`, configurazioni TypeScript/Vite/Vitest (`tsconfig.*`, `vite.config.*`, `vitest.config.*`), file di configurazione di `apps/ui-playground/` (package.json, vite.config.ts, tsconfig.json), workflow GitHub Actions, script in `scripts/guards/**`.
  - Forbidden: file sorgenti dei componenti (`packages/ui/src/components/**`).

---

## 3. Contratto di Build ed Export di `@atlas/ui`
- **Output JavaScript**: Compilato in formato ES Modules (ESM) all'interno della cartella `packages/ui/dist/` (es. `dist/index.js`).
- **Declaration Files**: Generati automaticamente durante il build all'interno di `packages/ui/dist/` (es. `dist/index.d.ts`).
- **Compilazione CSS**: Il file `packages/ui/styles/global.css` viene processato/compilato in `packages/ui/dist/styles.css`.
- **Package Exports**:
  - Il file `packages/ui/package.json` deve esportare i componenti puntando alle risorse in `dist/` (non in `src/`).
  - Il CSS compilato deve essere esportato come `@atlas/ui/styles.css` consentendo l'import diretto dal Playground.

---

## 4. Struttura delle Wave e Sequenza delle PR

### Wave A — Codex (Setup & Foundation)
* **Scopo**: Integrazione del Dependency BOM, inizializzazione degli script di package, configurazione di `@atlas/ui` build/test (dist compilation & global.css export), setup iniziale di `apps/ui-playground`.
* **Estimate**: 2 ore.
* **PR Sequence**: Branch `m002/wave-a-ci` -> PR a `main`.
* **Merge Gate**: Pipeline CI remota verde su `@atlas/ui` e `apps/ui-playground`, dipendenze installate, lockfile validato.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-a/` (EV-14, EV-15).

### Wave B — Claude (Token CSS-first)
* **Scopo**: Implementazione dei design token in Tailwind v4 CSS-first (`packages/ui/styles/global.css`) e importazione nel playground.
* **Estimate**: 2 ore.
* **PR Sequence**: Branch `m002/wave-b-tokens` -> PR a `main`.
* **Merge Gate**: File `dist/styles.css` generato, verifica reduced-motion superata ed evidence di contrasto reale registrata.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-b/` (EV-02, EV-03, EV-07, EV-09).

### Wave C1 — Claude (Core Primitives)
* **Scopo**: Implementazione e test del primo set di componenti: Button, Badge, Skeleton, StatusIndicator, Card.
* **Estimate**: 4 ore.
* **PR Sequence**: Branch `m002/wave-c1-primitives` -> PR a `main`.
* **Merge Gate**: 100% test unitari passati (inclusi Card e Badge), integrazione in `apps/ui-playground/src/`.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-c1/` (EV-10).

### Wave C2 — Claude (Forms & Complex Layouts)
* **Scopo**: Implementazione e test di Input, FormField (neutro), Select, Dialog (con backdrop/popup Base UI e garanzie Esc/overlay), Tabs e Toast (Sonner).
* **Estimate**: 4 ore.
* **PR Sequence**: Branch `m002/wave-c2-forms` -> PR a `main`.
* **Merge Gate**: 100% test unitari e test di accessibilità passati (Axe-core), navigazione da tastiera, annunci screen reader ed overlay verificate su Playground.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-c2/` (EV-04, EV-05, EV-06, EV-08, EV-11, EV-12).

### Wave D — Codex (Final Isolation & Guards)
* **Scopo**: Rafforzamento dei guardrail di isolamento, verifica dell'assenza di leak verso `legacy-web`/`web`, e validazione dell'esclusione di `apps/ui-playground` dalla build di produzione.
* **Estimate**: 1 ora.
* **PR Sequence**: Branch `m002/wave-d-audit` -> PR a `main`.
* **Merge Gate**: Script `guard:scope` e `dependency:audit` eseguiti con successo in CI.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-d/` (EV-13, EV-16).

### Wave E — Gemini (Evidence Matrix & Closure)
* **Scopo**: Raccolta finale delle prove, compilazione della checklist di chiusura e dry-run di rollback.
* **Estimate**: 1 ora.
* **PR Sequence**: Branch `m002/wave-e-evidence` -> PR a `main`.
* **Merge Gate**: Evidence Matrix completata con tutti i commit SHA corretti e i report salvati.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/final/` (EV-01, EV-17, EV-18).

---

## 5. Controlli Operativi di Emergenza

- **Condizioni di Stop / Escalation**:
  - Rilevazione di qualsiasi modifica involontaria o importazione da/verso `apps/legacy-web` o `apps/web`.
  - Conflitti di build bloccanti causati dall'integrazione di `@base-ui/react` o `sonner` con React 19 / Vite 8.
  - Fallimento ripetuto della pipeline CI su una PR di Wave.
- **Procedura di Rollback**: In caso di fallimento o instabilità grave, l'unico meccanismo di ripristino autorizzato su branch protetti è:
  ```powershell
  git revert <merge-commit-della-wave>
  ```
  È severamente vietato l'uso di `git reset --hard` o `git push --force` sul branch `main`. Il lockfile `pnpm-lock.yaml` deve essere eventualmente ripristinato allo stato dell'ultima Wave stabile. In caso di fallimento nel dry-run locale di rollback, ripristinare il worktree via `git revert --abort` o cancellazione del worktree temporaneo.

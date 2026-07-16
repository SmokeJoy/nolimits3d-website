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
- **Ownership Esclusiva Lockfile**: I file `packages/ui/package.json` e `pnpm-lock.yaml` rimangono sotto **ownership esclusiva e permanente di Codex**. Claude non può apportare alcuna modifica diretta a questi file e deve presentare una "dependency request" qualora fosse necessaria un'eccezione in corso d'opera.
- **Dependency Lock (BOM Immutabile)**: Le dipendenze per lo sviluppo di `@atlas/ui` sono congelate prima dell'avvio dello sprint e consistono esclusivamente in:
  - Production/Peer: `@base-ui/react` (1.6.0), `sonner` (2.0.7), `tailwindcss` (4.3.3), `class-variance-authority` (0.7.1), `clsx` (2.1.1), `tailwind-merge` (3.6.0), `lucide-react` (1.24.0), `tw-animate-css` (1.4.0), `react` (19.2.7), `react-dom` (19.2.7).
  - DevDependencies: `@tailwindcss/vite` (4.3.3), `shadcn` (4.13.0), `vite` (8.1.4), `@vitejs/plugin-react` (6.0.3), `vitest` (4.1.10), `jsdom` (29.1.1), `@testing-library/react` (16.3.2), `@testing-library/jest-dom` (6.9.1), `axe-core` (4.12.1).

---

## 2. Definizione dei Confini e File Ownership
- **Claude**:
  - Allowed: `packages/ui/src/**` (esclusivamente implementazione sorgente dei componenti), `packages/ui/styles/**` (sorgenti CSS), `packages/ui/tests/**` (file `.test.tsx` dei componenti), ed esempi in `apps/web/` (Playground).
  - Forbidden: file di configurazione TypeScript/Vite/Vitest, package.json, pnpm-lock.yaml, file in `apps/legacy-web/**`, `scripts/guards/**`.
- **Codex**:
  - Allowed: `packages/ui/package.json`, `pnpm-lock.yaml`, configurazioni TypeScript (`tsconfig.*.json`), configurazioni di build e test (`vite.config.ts`, `vitest.config.ts`), workflow di GitHub Actions, file in `scripts/guards/**` e infrastruttura complessiva dei test.
  - Forbidden: file sorgenti dei componenti (`packages/ui/src/components/**`).

---

## 3. Struttura delle Wave e Sequenza delle PR

### Wave A — Codex (Setup & Foundation)
* **Scopo**: Integrazione del Dependency BOM, inizializzazione degli script di package, configurazione di Vite, Vitest e dei task della CI.
* **Estimate**: 2 ore.
* **PR Sequence**: Branch `m002/wave-a-ci` -> PR a `main`.
* **Merge Gate**: Pipeline CI remota verde su `@atlas/ui`, dipendenze installate correttamente e lockfile validato.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-a/` (EV-10, EV-11).

### Wave B — Claude (Token CSS-first)
* **Scopo**: Implementazione dei design token in Tailwind v4 CSS-first.
* **Estimate**: 2 ore.
* **PR Sequence**: Branch `m002/wave-b-tokens` -> PR a `main`.
* **Merge Gate**: File `global.css` compilato senza errori, assenza di file di configurazione JS obsoleti, verifica reduced-motion ed evidence di contrasto compilate.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-b/` (EV-02, EV-03, EV-07).

### Wave C1 — Claude (Core Primitives)
* **Scopo**: Implementazione e test del primo set di componenti: Button, Badge, Skeleton, StatusIndicator, Card.
* **Estimate**: 4 ore.
* **PR Sequence**: Branch `m002/wave-c1-primitives` -> PR a `main`.
* **Merge Gate**: 100% test unitari passati, contratti del Primitive Inventory implementati, integrazione in Vite Playground (`apps/web`).
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-c1/` (EV-09, EV-11).

### Wave C2 — Claude (Forms & Complex Layouts)
* **Scopo**: Implementazione e test di Input, FormField (neutro), Select, Dialog (con garanzie Esc/overlay), Tabs e Toast (Sonner).
* **Estimate**: 4 ore.
* **PR Sequence**: Branch `m002/wave-c2-forms` -> PR a `main`.
* **Merge Gate**: 100% test unitari e test di accessibilità passati (Axe-core), navigazione da tastiera e gestione dialog verificate.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-c2/` (EV-04, EV-05, EV-06, EV-08).

### Wave D — Codex (Final Isolation & Guards)
* **Scopo**: Rafforzamento dei guardrail di isolamento, verifica dell'assenza di leak verso `legacy-web`, ottimizzazione finale degli script.
* **Estimate**: 1 ora.
* **PR Sequence**: Branch `m002/wave-d-audit` -> PR a `main`.
* **Merge Gate**: Script `guard:scope` e `dependency:audit` eseguiti con successo in CI.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/wave-d/` (EV-12).

### Wave E — Gemini (Evidence Matrix & Closure)
* **Scopo**: Raccolta finale delle prove, compilazione della checklist di chiusura e preparazione dell'Architect Review.
* **Estimate**: 1 ora.
* **PR Sequence**: Branch `m002/wave-e-evidence` -> PR a `main`.
* **Merge Gate**: Evidence Matrix completata con tutti i commit SHA corretti e i report salvati.
* **Evidence Path**: `Project_Atlas_Team_Workspace/05_Evidence/M002/final/` (EV-01, EV-13, EV-14).

---

## 4. Controlli Operativi di Emergenza

- **Condizioni di Stop / Escalation**:
  - Rilevazione di qualsiasi modifica involontaria o importazione da/verso `apps/legacy-web`.
  - Conflitti di build bloccanti causati dall'integrazione di `@base-ui/react` o `sonner` con React 19 / Vite 8.
  - Fallimento ripetuto (>2 tentativi) della pipeline CI su una specifica PR di Wave.
- **Procedura di Rollback**: In caso di fallimento o instabilità grave, l'unico meccanismo di ripristino autorizzato su branch protetti è:
  ```powershell
  git revert <merge-commit-della-wave>
  ```
  È severamente vietato l'uso di `git reset --hard` o `git push --force` sul branch `main`. Il lockfile `pnpm-lock.yaml` deve essere eventualmente ripristinato allo stato dell'ultima Wave stabile.

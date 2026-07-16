# Task Packet Claude: Frontend Engineering

## 1. TSK-M002-CLAUDE-B (Token Implementation)
* **Roadmap IDs**: `S-0013`, `T-0025`, `T-0026`, `ST-0013` (Token Foundation Story)
* **Branch**: `m002/wave-b-tokens`
* **Owner**: Claude
* **Handover Recipient**: Codex (per Wave D)
* **Vite Playground Path**: `apps/ui-playground/`
* **Allowed Files**: `packages/ui/styles/**`, `packages/ui/src/**` (per esportazione/costanti dei token se necessario).
* **Forbidden Files**: `packages/ui/package.json`, `pnpm-lock.yaml`, `tailwind.config.js` (vietato in Tailwind v4 CSS-first), qualsiasi file in `apps/legacy-web/**`, `apps/web/**`, `apps/ui-playground/package.json`, `apps/ui-playground/vite.config.ts`, `apps/ui-playground/tsconfig*.json`, `scripts/guards/**`.
* **Preconditions**:
  - `M002_DEPENDENCY_ADOPTION_DECISION.md` e `M002-TOKEN-SCHEMA.md` approvati dall'Architect.
  - Codex ha completato la Wave A (`TSK-M002-CODEX-A`) con CI verde.
* **Exact Deliverables**:
  - `packages/ui/styles/global.css` contenente i token semantici e reference mappati sotto forma di Custom Properties CSS (Tailwind v4 CSS-first).
  - Nessun asset di font locale (Poppins o esterni) caricato o linkato (M-002 è vincolata al system-ui stack).
  - Test di reduced-motion e contrasto numerico WCAG AA compilati nel report locale `wave-b/EV-03-contrast.md` e `wave-b/EV-07-reduced-motion.txt`.
* **Exact Commands**:
  - `pnpm --filter @atlas/ui typecheck`
  - `pnpm --filter @atlas/ui build`

---

## 2. TSK-M002-CLAUDE-C1 (Core Primitives)
* **Roadmap IDs**: `S-0014`, `T-0027`, `T-0028` (Accessible Primitives Story)
* **Branch**: `m002/wave-c1-primitives`
* **Owner**: Claude
* **Handover Recipient**: Codex (per Wave D)
* **Vite Playground Path**: `apps/ui-playground/`
* **Allowed Files**: 
  - `packages/ui/src/components/button.tsx`
  - `packages/ui/src/components/badge.tsx`
  - `packages/ui/src/components/skeleton.tsx`
  - `packages/ui/src/components/status-indicator.tsx`
  - `packages/ui/src/components/card.tsx`
  - `packages/ui/src/index.ts` (esportazione componenti)
  - `packages/ui/tests/button.test.tsx`
  - `packages/ui/tests/badge.test.tsx`
  - `packages/ui/tests/skeleton.test.tsx`
  - `packages/ui/tests/status-indicator.test.tsx`
  - `packages/ui/tests/card.test.tsx`
  - `apps/ui-playground/src/**` (esempi e storie dei componenti)
* **Forbidden Files**: `packages/ui/package.json`, `pnpm-lock.yaml`, qualsiasi file in `apps/legacy-web/**`, `apps/web/**`, `apps/ui-playground/package.json`, `apps/ui-playground/vite.config.ts`, `apps/ui-playground/tsconfig*.json`, `scripts/guards/**`.
* **Preconditions**:
  - `TSK-M002-CLAUDE-B` completato e unito a `main`.
* **Exact Deliverables**:
  - Componenti core (`Button` senza varianti link/retry, `Badge`, `Skeleton`, `StatusIndicator`, `Card`) implementati conformemente alle specifiche del Primitive Inventory.
  - Esempi di utilizzo interattivi integrati nel Vite Playground dedicato (`apps/ui-playground/src/`).
  - Unit test e accessibility verification per ciascuna delle 5 primitive (inclusi Card e Badge).
* **Exact Commands**:
  - `pnpm --filter @atlas/ui test`
  - `pnpm --filter @atlas/ui typecheck`
  - `pnpm --filter @atlas/ui build`

---

## 3. TSK-M002-CLAUDE-C2 (Forms & Complex Components)
* **Roadmap IDs**: `T-0027`, `T-0028`, `ST-0014` (Accessible Primitives Story)
* **Branch**: `m002/wave-c2-forms`
* **Owner**: Claude
* **Handover Recipient**: Codex (per Wave D)
* **Vite Playground Path**: `apps/ui-playground/`
* **Allowed Files**:
  - `packages/ui/src/components/input.tsx`
  - `packages/ui/src/components/form-field.tsx`
  - `packages/ui/src/components/select.tsx`
  - `packages/ui/src/components/dialog.tsx`
  - `packages/ui/src/components/tabs.tsx`
  - `packages/ui/src/components/toast.tsx`
  - `packages/ui/src/index.ts` (esportazione componenti)
  - `packages/ui/tests/input.test.tsx`
  - `packages/ui/tests/form-field.test.tsx`
  - `packages/ui/tests/select.test.tsx`
  - `packages/ui/tests/dialog.test.tsx`
  - `packages/ui/tests/tabs.test.tsx`
  - `packages/ui/tests/toast.test.tsx`
  - `apps/ui-playground/src/**` (esempi e storie dei componenti)
* **Forbidden Files**: `packages/ui/package.json`, `pnpm-lock.yaml`, qualsiasi file in `apps/legacy-web/**`, `apps/web/**`, `apps/ui-playground/package.json`, `apps/ui-playground/vite.config.ts`, `apps/ui-playground/tsconfig*.json`, `scripts/guards/**`.
* **Preconditions**:
  - `TSK-M002-CLAUDE-C1` completato e unito a `main`.
* **Exact Deliverables**:
  - Componenti complessi (`Input`, `FormField` neutro, `Select`, `Dialog`, `Tabs`, `Toast`) implementati e integrati con `@base-ui/react` (anatomy esatta per Select e Dialog) e `sonner` conforme al Primitive Inventory.
  - Dialog con garanzie assolute di chiusura via `Escape`, click backdrop, focus trapping e focus return.
  - Test per tutte le primitive e integrazione su Vite Playground (`apps/ui-playground/src/`).
* **Exact Commands**:
  - `pnpm --filter @atlas/ui test`
  - `pnpm --filter @atlas/ui typecheck`
  - `pnpm --filter @atlas/ui build`

---

## Control & Operations (Tutti i Task Claude)
- **Rollback**: In caso di fallimento o instabilità, richiedere all'Architect di eseguire un `git revert <merge-commit>` del relativo branch. Non eseguire soft o hard reset sui branch remoti di produzione.
- **Stop/Escalation Conditions**: Fermare lo sviluppo e contattare l'Architect se si rende necessario modificare un file bloccato (Forbidden) o se si riscontrano conflitti con le librerie esterne. Non modificare `package.json` o `pnpm-lock.yaml`.

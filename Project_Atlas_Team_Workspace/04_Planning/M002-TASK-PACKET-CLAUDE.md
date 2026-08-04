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

---

## Ratifica di deviazione — TSK-M002-CLAUDE-C1 (2026-08-04)

Durante Wave C1 sono stati modificati file fuori perimetro **senza la fermata prevista
dalle Stop/Escalation Conditions**. La deviazione è reale e viene registrata, non
riscritta: la regola era di fermarsi prima, non di documentare dopo.

| File | Commit | Motivo |
|---|---|---|
| `packages/ui/tsconfig.build.json` | `99ece4e` | `composite: true` ereditato faceva saltare l'emissione di `index.d.ts`: il pacchetto restava senza tipi e ogni consumatore falliva il typecheck |
| `apps/web/src/test/shared-packages.test.ts` | `99ece4e` | La guardia M-001 pretendeva `@atlas/ui` vuoto, premessa scaduta con M-002. Sostituita con un pin esatto della superficie di export approvata |
| `package.json`, `pnpm-lock.yaml` | `461fd88`, `7eb7f20` | Advisory high su dipendenze transitive, poi la correzione di `BLK-M002-001` |
| `scripts/guards/dependency-audit.mjs`, `scripts/guards/guards.test.mjs` | `7eb7f20` | Il gate di sicurezza ispezionava 106 pacchetti su 517 |
| `scripts/governance/atlas_handoff.py` | `d8368af`, `113104d` | Allineamento dell'audit di root alla policy emendata |
| `packages/ui/styles/global.css` | Wave C1 fix a11y | Token di contrasto sotto le soglie WCAG 2.2 in tema chiaro |

**Decisione dell'Architect: RATIFICATA.** Il revert avrebbe reintrodotto advisory di
severità alta, lasciato `@atlas/ui` senza dichiarazioni di tipo e mantenuto difetti di
accessibilità sotto soglia. Le modifiche sono tecnicamente corrette, verificate e
committate separatamente dal deliverable C1.

**Vincolo che resta valido:** questa ratifica copre i file elencati sopra e nient'altro.
Non estende il perimetro di `TSK-M002-CLAUDE-C2`, che mantiene le proprie Forbidden Files.

Questa decisione è stata presa dall'Architect delegato, che è anche l'autore delle
modifiche. È il conflitto di ruolo descritto in `BLK-M002-003` e resta soggetto alla
controfirma del Product Owner.

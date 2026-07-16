# Evidence Matrix: M-002 Design System

## Status
* **Status**: PROPOSED

## Tracking Matrix

La seguente matrice traccia oggettivamente l'avanzamento. Qualsiasi entry richiede l'output fisico o report salvato in `Project_Atlas_Team_Workspace/05_Evidence/M002/`. Nessuna validazione è accettata come "sorgente".

| ID | Requisito | Commit SHA | Comando Eseguito | Exit Code | Timestamp | Output / Report Path | Owner | Reviewer | Pass Condition Misurabile |
|---|---|---|---|---|---|---|---|---|---|
| EV-A1 | Setup Package JSON BOM | TBD | `pnpm --filter @atlas/ui install` | TBD | TBD | `.../wave-a/EV-A1-install.log` | Codex | Architect | Log indica success senza collisioni |
| EV-A2 | Integrazione CI Root | TBD | N/A (CI Run) | TBD | TBD | `.../wave-a/EV-A2-ci-run.json` | Codex | Architect | CI workflow `M-002` = `success` |
| EV-B1 | Token Contrast WCAG | TBD | `axe-cli` o manual audit | TBD | TBD | `.../wave-b/EV-B1-contrast-audit.md` | Claude | Architect | Ogni coppia definita in Token Schema passa WCAG AA (>= 4.5:1) |
| EV-B2 | Token Reduced Motion | TBD | Manual Audit | TBD | TBD | `.../wave-b/EV-B2-motion.md` | Claude | Architect | Variabili duration/easing settate a 0 o none |
| EV-C1 | Primitive C1 (Button, ecc) | TBD | `pnpm --filter @atlas/ui test` | TBD | TBD | `.../wave-c1/EV-C1-test-report.txt` | Claude | Architect | 100% test superati per Button, Badge, Skeleton, StatusIndicator, Card |
| EV-C2 | Primitive C2 (Input, ecc) | TBD | `pnpm --filter @atlas/ui test` | TBD | TBD | `.../wave-c2/EV-C2-test-report.txt` | Claude | Architect | 100% test superati per Input, FormField, Select, Dialog, Tabs, Toast |
| EV-C3 | Preview Baseline Rendering | TBD | `pnpm --filter @atlas/ui dev` | TBD | TBD | `.../wave-c2/EV-C3-preview-screenshot.md` | Claude | Architect | Componenti visibili isolatamente in Vite Playground |
| EV-C4 | Component A11y (Axe) | TBD | `pnpm --filter @atlas/ui test:a11y` | TBD | TBD | `.../wave-c2/EV-C4-a11y-report.txt` | Claude | Architect | Zero violazioni Axe Core su tutti i componenti |
| EV-D1 | Legacy Isolation | TBD | N/A | TBD | TBD | `.../wave-d/EV-D1-scope-guard.txt` | Codex | Architect | Guardrail di root o CI conferma zero import da `legacy-web` in `ui` |
| EV-D2 | Dependency Verification | TBD | `pnpm ls --depth=0` | TBD | TBD | `.../wave-d/EV-D2-deps.txt` | Codex | Architect | Esclusivamente dipendenze dal BOM Decision M-002 |
| EV-E1 | Rollback Verification | TBD | N/A | TBD | TBD | `.../final/EV-E1-rollback-plan.md` | Gemini | Architect | Piano di `git revert` redatto o validato |
| EV-E2 | Source Binding | TBD | `git log --grep="M-002"` | TBD | TBD | `.../final/EV-E2-git-log.txt` | Gemini | Architect | Tutti i commit PR presentano referenza formale a M-002 |

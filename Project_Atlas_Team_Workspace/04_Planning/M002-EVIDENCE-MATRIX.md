# Evidence Matrix: M-002 Design System

## Status
* **Status**: PROPOSED

## Tracking Matrix

Tutti i report fisici devono essere registrati nel percorso `Project_Atlas_Team_Workspace/05_Evidence/M002/`. Non è ammessa l'autocertificazione basata esclusivamente sul codice sorgente.

| ID | Roadmap IDs | Requisito / Area | Commit SHA | Comando di Verifica | Exit Code | Timestamp | Output / Report Path (in `05_Evidence/M002/`) | Owner | Reviewer | Pass Condition Misurabile |
|---|---|---|---|---|---|---|---|---|---|---|
| EV-01 | `S-0013`, `S-0014`, `T-0025`, `T-0026`, `T-0027`, `T-0028`, `ST-0013`, `ST-0014` | **Roadmap Traceability** | TBD | `git log --grep="M-002"` | TBD | TBD | `final/EV-01-traceability.txt` | Gemini | Architect | Ogni commit in PR referenzia almeno un ID di milestone |
| EV-02 | `T-0025`, `T-0026` | **Temi Dark/Light Render** | TBD | `pnpm --filter apps/ui-playground build` | TBD | TBD | `wave-b/EV-02-themes.md` | Claude | Architect | Compilazione e visualizzazione manuale di entrambi i temi su Vite Playground |
| EV-03 | `S-0013`, `T-0025`, `T-0026` | **Numeric Contrast Audit** | TBD | Browser Audit / Contrast Analyzer | TBD | TBD | `wave-b/EV-03-contrast.md` | Claude | Architect | Tutte le coppie colore documentate superano il target WCAG AA (>= 4.5:1) con dati numerici reali |
| EV-04 | `T-0027`, `T-0028` | **Responsive & Zoom 200-400%** | TBD | Vite Playground manual audit | TBD | TBD | `wave-c2/EV-04-zoom.md` | Claude | Architect | Nessun clipping di testo o sovrapposizione DOM rilevata a zoom 400% |
| EV-05 | `T-0027`, `T-0028` | **Keyboard Navigation** | TBD | `pnpm --filter @atlas/ui test` | TBD | TBD | `wave-c2/EV-05-keyboard.txt` | Claude | Architect | 100% dei test su Select/Tabs/Dialog navigano e attivano via tastiera |
| EV-06 | `T-0027`, `T-0028`, `ST-0014` | **Screen Reader Announcements** | TBD | NVDA / VoiceOver manual verification | TBD | TBD | `wave-c2/EV-06-screenreader.md` | Claude | Architect | Log descrittivo conferma gli annunci corretti di aria-describedby e aria-invalid |
| EV-07 | `ST-0013` | **Reduced Motion** | TBD | `pnpm --filter @atlas/ui test` | TBD | TBD | `wave-b/EV-07-reduced-motion.txt` | Claude | Architect | Test dimostrano disattivazione delle transizioni/animazioni sotto mock media query |
| EV-08 | `T-0027`, `T-0028` | **Package Exports** | TBD | `pnpm --filter @atlas/ui build` | TBD | TBD | `wave-c2/EV-08-exports.txt` | Claude | Architect | Generazione di JS e `d.ts` in `packages/ui/dist/` caricabili dal Playground |
| EV-09 | `S-0013`, `T-0025` | **CSS Export** | TBD | Visual check di `packages/ui/dist/styles.css` | TBD | TBD | `wave-b/EV-09-css-export.txt` | Claude | Architect | CSS globale esportato come `@atlas/ui/styles.css` in `dist` ed importato dal Playground |
| EV-10 | `S-0014`, `T-0027`, `T-0028` | **C1 Unit Tests** | TBD | `pnpm --filter @atlas/ui test packages/ui/tests/button.test.tsx` (e altri) | TBD | TBD | `wave-c1/EV-10-c1-tests.txt` | Claude | Architect | 100% unit test superati per Button, Badge, Skeleton, StatusIndicator, Card |
| EV-11 | `T-0027`, `T-0028`, `ST-0014` | **C2 Unit Tests** | TBD | `pnpm --filter @atlas/ui test packages/ui/tests/input.test.tsx` (e altri) | TBD | TBD | `wave-c2/EV-11-c2-tests.txt` | Claude | Architect | 100% unit test superati per Input, FormField, Select, Dialog, Tabs, Toast |
| EV-12 | `T-0027`, `T-0028` | **Axe-Core Automated Audit** | TBD | `pnpm --filter @atlas/ui test:a11y` | TBD | TBD | `wave-c2/EV-12-axe-audit.txt` | Claude | Architect | Esecuzione del test runner con axe-core riporta zero errori su tutti i componenti |
| EV-13 | `T-0027`, `T-0028` | **Playground Production-Exclusion** | TBD | `pnpm --filter apps/ui-playground build` (verifica configurazione) | TBD | TBD | `wave-d/EV-13-playground-exclusion.txt` | Codex | Architect | Script o config di CI conferma che `apps/ui-playground` non è compresa nelle build di produzione |
| EV-14 | `T-0027`, `T-0028` | **Dependency Approval** | TBD | `pnpm run dependency:audit` | TBD | TBD | `wave-a/EV-14-deps.txt` | Codex | Architect | Nessuna dipendenza non listata in `M002_DEPENDENCY_ADOPTION_DECISION.md` installata |
| EV-15 | `T-0027`, `T-0028` | **Package Build** | TBD | `pnpm --filter @atlas/ui build` | TBD | TBD | `wave-a/EV-15-build-output.txt` | Codex | Architect | La compilazione genera output valido in `packages/ui/dist/` |
| EV-16 | `T-0027`, `T-0028` | **Legacy Isolation** | TBD | `pnpm run guard:scope` | TBD | TBD | `wave-d/EV-16-isolation.txt` | Codex | Architect | Exit code 0 dallo script di scope guardrail (zero import verso `legacy-web` e `web`) |
| EV-17 | `T-0025-T-0028` | **Source Binding** | TBD | `pnpm run guard:source-bindings` | TBD | TBD | `final/EV-17-source-bindings.txt` | Gemini | Architect | I contratti documentali e i sorgenti fisici sono allineati correttamente |
| EV-18 | `T-0025-T-0028` | **Rollback Verification** | TBD | Dry-run `git revert` su branch o worktree temporaneo | TBD | TBD | `final/EV-18-rollback.md` | Gemini | Architect | Simulazione di rollback riuscita e pulizia eseguita via `git revert --abort` o cancellazione worktree |

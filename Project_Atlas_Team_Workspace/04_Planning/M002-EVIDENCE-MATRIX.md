# Evidence Matrix: M-002 Design System

## Status
* **Status**: PROPOSED

## Tracking Matrix

Tutti i report fisici devono essere registrati nel percorso `Project_Atlas_Team_Workspace/05_Evidence/M002/`. Non è ammessa l'autocertificazione basata esclusivamente sul codice sorgente.

| ID | Requisito / Area | Commit SHA | Comando di Verifica | Exit Code | Timestamp | Output / Report Path (in `05_Evidence/M002/`) | Owner | Reviewer | Pass Condition Misurabile |
|---|---|---|---|---|---|---|---|---|---|
| EV-01 | **Roadmap Traceability** | TBD | `git log --grep="M-002"` | TBD | TBD | `final/EV-01-traceability.txt` | Gemini | Architect | Ogni commit in PR referenzia almeno un ID di milestone |
| EV-02 | **Temi Dark/Light** | TBD | `pnpm --filter @atlas/ui build` | TBD | TBD | `wave-b/EV-02-themes.md` | Claude | Architect | Generazione classi CSS per schema dark/light senza errori di compilazione |
| EV-03 | **Contrasto Numerico** | TBD | Manual / Figma / Browser Audit | TBD | TBD | `wave-b/EV-03-contrast.md` | Claude | Architect | Tutte le coppie colore documentate superano il target WCAG AA (>= 4.5:1) |
| EV-04 | **Responsive & Zoom 200-400%** | TBD | Vite Playground manual audit | TBD | TBD | `wave-c2/EV-04-zoom.md` | Claude | Architect | Nessun clipping di testo o sovrapposizione DOM rilevata a zoom 400% |
| EV-05 | **Keyboard Navigation** | TBD | `pnpm --filter @atlas/ui test` | TBD | TBD | `wave-c2/EV-05-keyboard.txt` | Claude | Architect | 100% dei test su Select/Tabs/Dialog navigano e attivano via tastiera |
| EV-06 | **Screen Reader Support** | TBD | Manual audit log | TBD | TBD | `wave-c2/EV-06-screenreader.md` | Claude | Architect | ARIA attributes (`aria-describedby`, `aria-invalid`) presenti e annunciati |
| EV-07 | **Reduced Motion** | TBD | `pnpm --filter @atlas/ui test` | TBD | TBD | `wave-b/EV-07-reduced-motion.txt` | Claude | Architect | Test di unit test dimostrano timeout a 0ms e no transitions sotto mock media query |
| EV-08 | **API ed Export** | TBD | `pnpm --filter @atlas/ui typecheck` | TBD | TBD | `wave-c2/EV-08-exports.txt` | Claude | Architect | File `packages/ui/src/index.ts` esporta correttamente le 11 primitive senza errori TypeScript |
| EV-09 | **Visual Baseline** | TBD | Manual preview audit | TBD | TBD | `wave-c2/EV-09-visual-baseline.md` | Claude | Architect | Screenshot dei componenti caricati e registrati in Vite Playground |
| EV-10 | **Dependency Approval** | TBD | `pnpm run dependency:audit` | TBD | TBD | `wave-a/EV-10-deps.txt` | Codex | Architect | Nessuna dipendenza non listata in `M002_DEPENDENCY_ADOPTION_DECISION.md` installata |
| EV-11 | **Package Build** | TBD | `pnpm --filter @atlas/ui build` | TBD | TBD | `wave-a/EV-11-build-output.txt` | Codex | Architect | La compilazione genera output valido in `packages/ui/dist/` |
| EV-12 | **Legacy Isolation** | TBD | `pnpm run guard:scope` | TBD | TBD | `wave-d/EV-12-isolation.txt` | Codex | Architect | Exit code 0 dallo script di scope guardrail (zero import verso `legacy-web`) |
| EV-13 | **Source Binding** | TBD | `pnpm run guard:source-bindings` | TBD | TBD | `final/EV-13-source-bindings.txt` | Gemini | Architect | I contratti documentali e i sorgenti fisici sono allineati correttamente |
| EV-14 | **Rollback Verification** | TBD | `git revert --no-commit` dry-run | TBD | TBD | `final/EV-14-rollback.md` | Gemini | Architect | Simulazione di rollback riuscita senza causare conflitti o detriti |

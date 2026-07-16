# Evidence Matrix: M-002 Design System

## Status
* **Status**: PROPOSED

## Tracking Matrix

| ID | Roadmap / Requisito | Pass Condition | Metodo (Auto/Manual) | Owner | Artifact Path | Gate | Status | Reviewer |
|---|---|---|---|---|---|---|---|---|
| EV-01 | E-0003, F-0007 (Button) | Test passati, A11y verificata | Auto (Vitest/Axe) | Claude | `packages/ui/src/components/button.tsx` | M-002 Wave C | PENDING | Architect |
| EV-02 | S-0013, T-0025, T-0026, ST-0013 | Test passati | Auto | Claude | `packages/ui/src/components/` | M-002 Wave C | PENDING | Architect |
| EV-03 | S-0014, T-0027, T-0028, ST-0014 | Test passati, focus trap verificato | Auto/Manual | Claude | `packages/ui/src/components/` | M-002 Wave C | PENDING | Architect |
| EV-04 | Dark/Light Themes | Supporto classe `dark`, root vars attive | Manual (Ladle) | Claude | `packages/ui/styles/` | M-002 Wave B | PENDING | Architect |
| EV-05 | Contrast Matrix | Fore/Back ratio > WCAG AA in entrambi i temi | Auto (Axe) / Manual | Claude | Ladle Snapshot | M-002 Wave B | PENDING | Architect |
| EV-06 | Responsive / Zoom 200-400% | UI fluida, no clipping di testo | Manual | Claude | Ladle Snapshot | M-002 Wave C | PENDING | Architect |
| EV-07 | Keyboard Navigation | Nessun focus bloccato, tab loop corretto | Manual | Claude | Ladle Preview | M-002 Wave C | PENDING | Architect |
| EV-08 | Screen Reader Support | aria-tags presenti e annunci corretti | Manual (VoiceOver/NVDA) | Claude | Ladle Preview | M-002 Wave C | PENDING | Architect |
| EV-09 | Reduced Motion | Animazioni assenti se `prefers-reduced-motion: reduce` | Manual (OS Switch) | Claude | `packages/ui/styles/` | M-002 Wave B | PENDING | Architect |
| EV-10 | API ed Exports | Tutti i componenti regolarmente esportati da `@atlas/ui/index` | Auto (Typecheck) | Claude | `packages/ui/src/index.ts` | M-002 Wave C | PENDING | Architect |
| EV-11 | Visual Baseline | Preview isolate renderizzate correttamente | Manual (Ladle) | Claude | `packages/ui/src/*.stories.tsx`| M-002 Wave C | PENDING | Architect |
| EV-12 | Dependency Approval | Tooling UI approvato in `TOOL_AND_PLUGIN_REGISTER.md` | Manual (Governance) | Gemini | `TOOL_AND_PLUGIN_REGISTER.md` | M-002 Wave A | PENDING | Architect |
| EV-13 | Package Build | `pnpm build` completa e produce output valido | Auto (CI) | Codex | CI Log / `packages/ui/dist/` | M-002 Wave A | PENDING | Architect |
| EV-14 | Legacy Isolation | Zero imports da `apps/legacy-web` in `packages/ui` | Auto (ESLint strict) | Codex | CI Log | M-002 Wave D | PENDING | Architect |
| EV-15 | Source Binding | Riferimenti espliciti a M-002 nei commit e nelle PR | Manual | Gemini | Git Log | M-002 All | PENDING | Architect |
| EV-16 | Rollback Verification | Procedura di rollback testata in caso di emergenza | Manual | Gemini | N/A | M-002 All | PENDING | Architect |

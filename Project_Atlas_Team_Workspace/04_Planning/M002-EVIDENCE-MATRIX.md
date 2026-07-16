# Evidence Matrix: M-002 Design System

## Tracking Criteria

| ID | Requirement | Success Condition | Verification Method | Status |
|---|---|---|---|---|
| EV-01 | Semantic Tokens | No magic values (`#HEX`) exist in component code | Static Analysis / Code Review | PENDING |
| EV-02 | Visual Regression | Components render correctly in isolated preview | Visual verification via Ladle/Vite Playground | PENDING |
| EV-03 | Accessibility | WCAG 2.2 AA (Color contrast) | Automated check (axe) / Audit | PENDING |
| EV-04 | Keyboard Nav | Focus-visible present, navigation complete | Manual Testing | PENDING |
| EV-05 | CI/CD | Pipeline succeeds without warnings in `@atlas/ui` | GitHub Actions | PENDING |
| EV-06 | Monorepo Guard | `pnpm test` and `pnpm lint` green from root | Local & Remote CI | PENDING |
| EV-07 | Legacy Isolation | Zero imports from `apps/legacy-web` | Dependency Audit / Source Binding Guard | PENDING |

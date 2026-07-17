# Evidence: EV-03 - Numeric Contrast Audit

- **Milestone**: M-002 Design System & UI Foundation
- **Wave**: Wave B Token Foundation
- **Roadmap ID**: S-0013, T-0025, T-0026
- **Commit SHA**: 9059b44065ece91dc36e70d814adfac2bbf7fa46
- **Verify Command**: `pnpm --filter @atlas/ui test` (suite `tests/tokens.test.tsx`, blocco "WCAG 2.2 AA contrast audit")
- **Exit Code**: 0
- **Timestamp UTC**: 2026-07-17T10:05:33Z
- **CI Run URL**: https://github.com/SmokeJoy/nolimits3d-website/actions/runs/29572205442
- **Owner / Executor**: Claude (TSK-M002-CLAUDE-B)
- **Status**: PASSED

## Numeric Contrast Ratios (WCAG 2.2 AA Audit)

The audit is executed automatically by vitest: `packages/ui/tests/tokens.test.tsx`
computes relative luminance and contrast ratio for every governed
foreground/background pair, resolving the tokens directly from
`packages/ui/styles/global.css` (no external script; the previously cited
Python script did not exist and has been replaced by this deterministic test).

| Label                                                       | Foreground | Background | Ratio       | Target     | Status   |
| ----------------------------------------------------------- | ---------- | ---------- | ----------- | ---------- | -------- |
| **Dark Mode**: text.primary / bg.canvas                     | `#FFFFFF`  | `#101820`  | **17.89:1** | `>= 4.5:1` | **PASS** |
| **Dark Mode**: text.secondary / bg.canvas                   | `#9CA3AF`  | `#101820`  | **7.05:1**  | `>= 4.5:1` | **PASS** |
| **Dark Mode**: text.primary / bg.surface                    | `#FFFFFF`  | `#111827`  | **17.74:1** | `>= 4.5:1` | **PASS** |
| **Dark Mode**: accent.primary.foreground / accent.primary   | `#101820`  | `#25D366`  | **9.02:1**  | `>= 4.5:1` | **PASS** |
| **Dark Mode**: accent.primary.foreground / accent.primary.hover | `#101820` | `#1EBD59` | **7.22:1**  | `>= 4.5:1` | **PASS** |
| **Dark Mode**: white / status.error                         | `#FFFFFF`  | `#DC2626`  | **4.83:1**  | `>= 4.5:1` | **PASS** |
| **Dark Mode**: dark / status.warning                        | `#101820`  | `#EAB308`  | **9.33:1**  | `>= 4.5:1` | **PASS** |
| **Dark Mode**: white / status.info                          | `#FFFFFF`  | `#2563EB`  | **5.17:1**  | `>= 4.5:1` | **PASS** |
| **Dark Mode**: dark / status.success                        | `#101820`  | `#25D366`  | **9.02:1**  | `>= 4.5:1` | **PASS** |
|                                                             |            |            |             |            |          |
| **Light Mode**: text.primary / bg.canvas                    | `#101820`  | `#FFFFFF`  | **17.89:1** | `>= 4.5:1` | **PASS** |
| **Light Mode**: text.secondary / bg.canvas                  | `#4B5563`  | `#FFFFFF`  | **7.56:1**  | `>= 4.5:1` | **PASS** |
| **Light Mode**: text.primary / bg.surface                   | `#101820`  | `#F9FAFB`  | **17.12:1** | `>= 4.5:1` | **PASS** |
| **Light Mode**: accent.primary.foreground / accent.primary  | `#101820`  | `#25D366`  | **9.02:1**  | `>= 4.5:1` | **PASS** |
| **Light Mode**: accent.primary.foreground / accent.primary.hover | `#101820` | `#1BA851` | **5.77:1** | `>= 4.5:1` | **PASS** |
| **Light Mode**: white / status.error                        | `#FFFFFF`  | `#DC2626`  | **4.83:1**  | `>= 4.5:1` | **PASS** |
| **Light Mode**: dark / status.warning                       | `#101820`  | `#EAB308`  | **9.33:1**  | `>= 4.5:1` | **PASS** |
| **Light Mode**: white / status.info                         | `#FFFFFF`  | `#2563EB`  | **5.17:1**  | `>= 4.5:1` | **PASS** |

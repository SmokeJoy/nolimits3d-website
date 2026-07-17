# Evidence: EV-03 - Numeric Contrast Audit
- **Milestone**: M-002 Design System & UI Foundation
- **Wave**: Wave B Token Foundation
- **Roadmap ID**: S-0013, T-0025, T-0026
- **Commit SHA**: 4c93f1e56b46cc3cbfe065ef8c8ca53e18f2d579
- **Verify Command**: python contrast_audit.py
- **Exit Code**: 0
- **Timestamp UTC**: 2026-07-17T08:24:17Z
- **CI Run URL**: https://github.com/SmokeJoy/nolimits3d-website/actions/runs/29566300724
- **Owner**: Claude
- **Status**: PASSED

## Numeric Contrast Ratios (WCAG 2.2 AA Audit)

Every individual foreground/background color pair candidate was verified mathematically using relative luminance formula.

| Label | Foreground | Background | Ratio | Target | Status |
|---|---|---|---|---|---|
| **Dark Mode**: text.primary / bg.canvas | `#FFFFFF` | `#101820` | **17.89:1** | `>= 4.5:1` | **PASS** |
| **Dark Mode**: text.secondary / bg.canvas | `#9CA3AF` | `#101820` | **7.05:1** | `>= 4.5:1` | **PASS** |
| **Dark Mode**: text.primary / bg.surface | `#FFFFFF` | `#111827` | **17.74:1** | `>= 4.5:1` | **PASS** |
| **Dark Mode**: accent.primary.foreground / accent.primary | `#101820` | `#25D366` | **9.02:1** | `>= 4.5:1` | **PASS** |
| **Dark Mode**: white / status.error | `#FFFFFF` | `#DC2626` | **4.83:1** | `>= 4.5:1` | **PASS** |
| **Dark Mode**: dark / status.warning | `#101820` | `#EAB308` | **9.33:1** | `>= 4.5:1` | **PASS** |
| **Dark Mode**: white / status.info | `#FFFFFF` | `#2563EB` | **5.17:1** | `>= 4.5:1` | **PASS** |
| | | | | | |
| **Light Mode**: text.primary / bg.canvas | `#101820` | `#FFFFFF` | **17.89:1** | `>= 4.5:1` | **PASS** |
| **Light Mode**: text.secondary / bg.canvas | `#4B5563` | `#FFFFFF` | **7.56:1** | `>= 4.5:1` | **PASS** |
| **Light Mode**: text.primary / bg.surface | `#101820` | `#F9FAFB` | **17.12:1** | `>= 4.5:1` | **PASS** |
| **Light Mode**: accent.primary.foreground / accent.primary | `#101820` | `#25D366` | **9.02:1** | `>= 4.5:1` | **PASS** |
| **Light Mode**: white / status.error | `#FFFFFF` | `#DC2626` | **4.83:1** | `>= 4.5:1` | **PASS** |
| **Light Mode**: dark / status.warning | `#101820` | `#EAB308` | **9.33:1** | `>= 4.5:1` | **PASS** |
| **Light Mode**: white / status.info | `#FFFFFF` | `#2563EB` | **5.17:1** | `>= 4.5:1` | **PASS** |

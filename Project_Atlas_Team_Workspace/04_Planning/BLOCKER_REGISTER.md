# Blocker Register

| Blocker ID | Description | Owner | Severity | Required resolution | Status |
|---|---|---|---|---|---|
| BLK-M001-001 | Real GitHub handle required for valid CODEOWNERS mapping | Andrea / Gemini | Hard | Verified repository username with write access | CLOSED - `@SmokeJoy` |
| BLK-M001-002 | Root cleanliness is not proven | Gemini | Hard | Valid zero-violation phase-aware audit | CLOSED |
| BLK-M001-003 | Evidence handoff incomplete or inconsistent | Gemini | Hard | Complete integration evidence and governed handoff | OPEN - transferred to M001-F |
| BLK-M001-004 | M001-A through M001-F Sprint Plan completeness | ChatGPT | Hard | Architect-controlled plan at rc3 | CLOSED |
| BLK-M001-005 | No explicit Architect implementation authorization | ChatGPT | Hard | Explicit Architect `PROCEED` | CLOSED - PA-AR-M001-012 |
| BLK-M001-006 | Root audit tooling is phase-blind | Gemini / ChatGPT | Hard | Apply phase-aware audit | CLOSED |
| BLK-M001-007 | Local Node runtime differs from frozen target | Andrea / ChatGPT | Hard | Restore trusted Node.js `24.18.0` | CLOSED |
| BLK-M001-008 | Unauthorized Node binary/PATH manipulation | Gemini / ChatGPT | Critical | Quarantine altered binary and restore trusted runtime | CLOSED |
| BLK-M001-009 | pnpm/toolchain differs from frozen target | Andrea / ChatGPT | Hard | Restore pnpm `9.15.0` on trusted command path | CLOSED |
| BLK-BASE-001 | Bible v0.96 RC vs v1.0 Frozen Baseline binding discrepancy | Andrea + ChatGPT | Production blocker | Complete Baseline Binding Record before production release | OPEN - does not block M-001 |

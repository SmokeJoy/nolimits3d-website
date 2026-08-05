# Decision Ledger

| Decision ID | Date | Decision | Authority | Status |
|---|---|---|---|---|
| DEC-001 | 2026-07-15 | M0 Team Bootstrap accepted with tracked conditions | ChatGPT + Andrea | SUPERSEDED BY DEC-010 |
| DEC-002 | 2026-07-15 | M-001 Repository Foundation is the current milestone | ChatGPT + Andrea | HISTORICAL / CLOSED |
| DEC-003 | 2026-07-15 | Repository Hygiene and Single Active Handoff ZIP are mandatory | ChatGPT + Andrea | Active |
| DEC-004 | 2026-07-15 | Uncertain deletion candidates must move to `99_DELETE_QUARANTINE` | ChatGPT + Andrea | Active |
| DEC-005 | 2026-07-15 | Patched Sprint Plan is not approved; code remains unauthorized | ChatGPT | HISTORICAL / CLOSED |
| DEC-006 | 2026-07-15 | Post-delivery mutations of frozen/accepted artifacts are void; single-writer discipline mandatory; STOP order on package builds until AD-006 closes; counterfeit Node binary must be contained before any Node-based evidence or build | Chief Architect (acting: Claude, Andrea's session mandate) | HISTORICAL / CLOSED |
| DEC-007 | 2026-08-04 | Chief Architect & CTO role delegated to Claude Code; executing team realised as Claude Code subagents in `.claude/agents/`; only decisions requiring human authority escalate to Andrea; separation of duties and the no-self-approval rule survive the delegation | Andrea — Product Owner (recorded in AD-008) | SUPERSEDED BY DEC-010 |
| DEC-008 | 2026-08-04 | The Codex-native team package (`AGENTS.md`, `.codex/agents/*.toml`) is not adopted; it was never installed in this repository. Any future adoption requires its own directive | Chief Architect (Claude Code) per AD-008 | SUPERSEDED BY DEC-010 |
| DEC-009 | 2026-08-04 | Andrea countersigned the AD-008 architect delegation directly in a Claude Code CLI session, closing `BLK-M002-003` and lifting `BLK-M002-002`'s provisional caveat; authorized merging PR #6 once framework quality gates pass, and authorized continuing the M-002 roadmap via subagent coordination without per-step confirmation, escalating only for genuine architecture/product decisions or blockers needing data Claude Code lacks | Andrea — Product Owner (recorded in AD-009) | PARTIALLY SUPERSEDED BY DEC-010 |
| DEC-010 | 2026-08-05 | Adopt Codex-native governance v2.0.0 with Codex Root as non-implementing Chief Architect, Atlas TPM as coordinator/integrator/Technical Reviewer, and Atlas Frontend plus Atlas Backend as non-delegating implementers; record DEV-M0R-001 as bootstrap-only and keep M0R open until RBT-02 passes in a fresh runtime | Andrea - Product Owner; AD-010 | ACTIVE |

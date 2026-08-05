# Project Atlas Team Workspace

Canonical operational workspace for Atlas TPM coordination, shared memory, registers,
evidence, handoffs and temporary delete quarantine.

## Canonical Areas

- `00_Governance/`: operational rules and tooling governance;
- `01_Shared_Memory/`: current state and append-only decision history;
- `04_Planning/`: milestone, sprint, blocker and cleanup registers;
- `05_Evidence/`: test and review evidence indexes;
- `06_Handoffs/`: current contracts and archived handoff metadata;
- `07_Reports/`: governed reports;
- `99_DELETE_QUARANTINE/`: uncertain deletion candidates only.

The active chain is `Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`. This
workspace does not replace the Documentation Bible, Development Framework, Development
Blueprint or `AGENTS.md`.

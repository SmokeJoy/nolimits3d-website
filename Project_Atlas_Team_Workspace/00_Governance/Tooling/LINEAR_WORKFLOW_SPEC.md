# Linear Workflow Specification

## Goal
Manage milestones, epics, issues, subtasks, ownership, priority, blockers, and acceptance criteria.

## Approved States
Backlog -> Ready -> In Progress -> In Review -> QA / Integration -> Architect Review -> Business Approval -> Done
*(Blocked, Cancelled)*

## Rules
- Atlas TPM owns Linear operations and workflow reconciliation.
- Atlas Frontend and Atlas Backend update only their assigned work.
- Codex Root records architecture decisions and gate verdicts; Andrea records product decisions.
- No issue enters `In Progress` without a Definition of Ready.
- Issues must link to Blueprint slices and requirement IDs.
- CI results must be reflected before issue closure.
- Implementers cannot move their own work past Technical Review or self-approve it.

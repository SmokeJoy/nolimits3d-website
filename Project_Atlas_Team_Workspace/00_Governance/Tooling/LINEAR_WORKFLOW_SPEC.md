# Linear Workflow Specification

## Goal
Manage milestones, epics, issues, subtasks, ownership, priority, blockers, and acceptance criteria.

## Approved States
Backlog -> Ready -> In Progress -> In Review -> QA / Integration -> Architect Review -> Business Approval -> Done
*(Blocked, Cancelled)*

## Rules
- Gemini owns Linear operations.
- Claude/Codex update only assigned work.
- No issue enters `In Progress` without a Definition of Ready.
- Issues must link to Blueprint slices and requirement IDs.
- CI results must be reflected before issue closure.

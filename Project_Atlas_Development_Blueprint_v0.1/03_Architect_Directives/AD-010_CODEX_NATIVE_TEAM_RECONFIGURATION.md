# Architect Directive AD-010 - Codex-Native Team Reconfiguration

> **Directive ID:** AD-010
> **Milestone:** M0R - Codex-Native Team Reconfiguration
> **Owner:** Codex Root - Chief Architect & CTO
> **Authority:** Andrea - Product Owner, explicit repository instruction
> **Status:** BINDING FOR M0R IMPLEMENTATION
> **Date:** 2026-08-05

## Decision

Project Atlas adopts this active authority chain:

`Andrea -> Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`

The prior ChatGPT/Gemini/Claude/Codex allocation, the Claude Code architect delegation in AD-008/AD-009, and the five active `.claude/agents/` definitions are superseded for future governance. Their records and delivered source history remain unchanged.

## Boundaries

- Codex Root owns architecture and Architect Review and writes no production code.
- Atlas TPM owns planning, coordination, integration, and Technical Review and writes no production code.
- Atlas Frontend and Atlas Backend implement only approved Task Packets, do not self-approve, and cannot create subagents.
- Codex Root delegates implementation only to Atlas TPM. Atlas TPM delegates only to the two implementers.
- Jarvis remains private to Andrea. PrintFlow remains `Coming Soon`.
- `NoLimits3D_Documentation_v0.96/**` is immutable during M0R.
- Production remains blocked by `BLK-BASE-001`.

## Configuration Decision

Project configuration uses `[agents] enabled = true`, `max_depth = 2`, and `max_concurrent_threads_per_session = 3`. Although `max_depth` is absent from the current public manual, the Product Owner requires it and reports acceptance by the Codex Desktop 0.147 strict doctor. The repository validator must reject its removal and the runtime evidence must record the exact doctor result.

Implementer agent files must set `[agents] enabled = false`. Supported agent fields include `name`, `description`, `developer_instructions`, model, reasoning effort, and sandbox mode. A runtime-invalid model must be removed so the agent inherits the parent model; it must not be replaced with an invented slug.

## Gate Effect

Historical M0 becomes `DONE / SUPERSEDED`. M0R is `ACTIVE`. No prior bootstrap approval authorizes the next Blueprint or implementation milestone under this team. M0R closes only after static validation, real nested delegation, every Role Boundary Test, Atlas TPM Technical Review, Codex Root Architect Review, and Product Owner acceptance.

This directive does not rewrite historical artifacts, modify the Documentation Bible, authorize product code, expose Jarvis, activate PrintFlow, or authorize production.

## Recorded Deviation - DEV-M0R-001

During initial bootstrap, the Atlas TPM subagent did not have callable multi-agent tools.
Codex Root therefore launched Atlas Frontend and Atlas Backend directly, with disjoint write
sets, only to create the initial Codex-native implementation artifacts.

This is a documented bootstrap deviation, not a change to the target architecture. It does
not satisfy RBT-02 and cannot be used as evidence that nested delegation works. M0R remains
open until a fresh supported runtime demonstrates:

`Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`

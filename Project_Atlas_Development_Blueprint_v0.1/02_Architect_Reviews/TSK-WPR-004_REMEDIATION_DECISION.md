# Codex Root Remediation Decision - TSK-WPR-004

> **Review owner:** Codex Root - Chief Architect & CTO
> **Date:** 2026-08-06
> **Input:** TSK-WPR-004 Dual-Team Governance Remediation Technical Review
> **Technical Review verdict:** CHANGES REQUESTED
> **Architect disposition:** FRESH VERIFICATION REQUIRED; NO ARCHITECT APPROVAL

## Decision

Preserve the current eight-file governance diff as an unapproved WPR-005 input. The WPR-004
implementation appears to correct the WPR-003 semantic defects, but it has no complete valid
evidence and receives no inherited approval.

WPR-005 must narrow concurrency handling to the ownership contract. Changes to unrelated,
forbidden files are recorded and attributed but stop the packet only when they overlap an owned
file/evidence lane, alter a dependency or governed contract used by the packet, or invalidate a
required gate. Continuous channel and session-handoff writes are expected disjoint activity and
must not by themselves block a correctly isolated packet.

## Required Verification Corrections

- Fingerprint the eight owned files and the new evidence lane before delegation; stop on their
  concurrent drift.
- Generate ASCII or UTF-8-no-BOM evidence using literal-safe APIs. Reject NUL, backspace,
  form-feed, carriage-return, or other unintended control characters in text evidence.
- Generate the final patch, fingerprints, rollback, scope log, command table, and handoff only
  after the implementation state is frozen.
- Run every command from zero. No WPR-003 or WPR-004 result is inherited.
- Use the verified global runner `C:\Program Files\nodejs\pnpm.cmd` for each canonical pnpm
  script because the subagent PATH resolved an incomplete repository-local Corepack shim.
  Record the resolved runner and `9.15.0` version before the gate sequence.
- Preserve the canonical script order and command semantics; an absolute trusted runner is an
  execution-path correction, not alternate evidence.
- Treat any failed or unavailable lane as blocking and return to independent Technical Review.

## Authorization Boundary

Codex Root authorizes Atlas TPM to plan WPR-005 and delegate one fresh Atlas Backend child.
This decision does not authorize product code, Claude production-code activation, commit, push,
merge, deploy, production access, release, milestone closure, business/visual acceptance, or
closure of `BLK-BASE-001`.

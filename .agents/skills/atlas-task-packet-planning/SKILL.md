---
name: atlas-task-packet-planning
description: Create or review governed Project Atlas task packets from an approved milestone and Blueprint slice. Use for Definition of Ready, exact file-scope assignment, dependency sequencing, acceptance criteria, tests, evidence, handoff requirements, and stop conditions before implementation starts.
---

# Atlas Task Packet Planning

1. Read `AGENTS.md`, the current state and registers, the approved milestone charter, the
   relevant Blueprint slice, and unresolved blockers.
2. Confirm that Product Owner and Architect decisions already exist. Escalate missing
   product or architecture decisions; do not invent them.
3. Define one implementer, one objective, exact allowed files, exact forbidden files, and a
   write set disjoint from every concurrent packet.
4. State dependencies, Definition of Ready, acceptance criteria, negative cases, required
   gates, evidence paths, rollback expectations, and stop conditions.
5. Preserve the Documentation Bible, Jarvis privacy, PrintFlow `Coming Soon`, the pull-only
   worker, and the legacy fallback unless a binding directive explicitly changes them.
6. Require the implementer to avoid subagents and self-approval. Route completed work to
   Atlas TPM for Technical Review and integration.
7. Return `READY`, `BLOCKED`, or `CHANGES REQUIRED` with the exact missing decision or
   evidence.

Planning does not authorize production code, architecture, business acceptance, merge,
deployment, or release.

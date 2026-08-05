---
name: atlas-technical-review-integration
description: Perform Project Atlas Technical Review and governed integration as Atlas TPM. Use to verify implementer handoffs, scope isolation, tests, security, accessibility, migrations, evidence, merge readiness, and separation of duties without writing product code.
---

# Atlas Technical Review And Integration

1. Verify the branch, HEAD, worktree, diff base, Task Packet, implementer identity, and
   handoff before trusting status documents.
2. Compare every changed file with the implementer's allowed and forbidden sets. Reject
   unexplained overlap, unowned files, or scope drift.
3. Review behavior, tests, failure paths, security, privacy, accessibility, performance,
   contracts, migrations, rollback, observability, and evidence integrity as applicable.
4. Re-run required gates in repository order and record exact commands, exit codes, and
   unavailable lanes.
5. Confirm implementers did not create subagents or approve their own work. Atlas TPM may
   issue Technical Review, never Architect Review or business acceptance.
6. Integrate only reviewed output. Route product-code corrections back to the responsible
   implementer; Atlas TPM must not implement them.
7. Return findings ordered by severity and one verdict: `APPROVED FOR INTEGRATION`,
   `CHANGES REQUESTED`, `BLOCKED BY DECISION`, or `REJECTED AS OUT OF SCOPE`.

Never hide an unavailable lane, manufacture evidence, change requirements, merge, deploy,
or write product code to make a gate pass.

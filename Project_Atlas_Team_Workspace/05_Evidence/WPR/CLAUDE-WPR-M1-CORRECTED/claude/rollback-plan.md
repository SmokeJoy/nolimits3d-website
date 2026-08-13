# CLAUDE-WPR-M1-CORRECTED -- Rollback Plan

Per packet section 13. This slice changes no app, database, deployment, or production state, so
rollback has no runtime/data migration step in either case below.

## Case A: before push

**Superseded by events** -- this branch has two commits and has been pushed (see Case B below).
This section is retained for the historical record of what would have applied if a rollback had
been needed between the initial commit and the push. If a rollback is ever needed before a future
push (e.g. after a further local-only commit), the same procedure applies against whatever the
then-current HEAD is:

1. Restore the one existing allowed file from the base:
   `git checkout d7777a84f5a397d3332544e5f2f0d73e2d48661d -- package.json`
2. Remove only the newly created packet-owned files, each only after re-validating that its
   resolved absolute path remains inside
   `G:\Claude\NoLimits3D-website-claude-wpr-m1-corrected`:
   - `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-ROUTE-CAPABILITY-INVENTORY.json`
   - `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-ROUTE-CAPABILITY-INVENTORY.md`
   - `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-GAP-REGISTER.md`
   - `Project_Atlas_Team_Workspace/04_Planning/CLIENT-DATA.schema.json`
   - `Project_Atlas_Team_Workspace/04_Planning/CLIENT_DATA_MANIFEST.json`
   - `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-SOURCE-BINDING-CONTRACT.json`
   - `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-AD016-REFERENCE-SET-AND-RUBRIC.md`
   - `scripts/guards/production-readiness-guard.mjs`
   - `scripts/guards/production-readiness-guard.test.mjs`
   - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/` (all 12
     evidence files)
   - `Project_Atlas_Team_Workspace/06_Handoffs/CLAUDE-WPR-M1-CORRECTED-HANDOFF.md`
3. Confirm `git status --short` in the worktree is empty and HEAD is still exactly
   `d7777a84f5a397d3332544e5f2f0d73e2d48661d`.
4. Archive the disposition (what was rolled back and why) as a local, uncommitted append to
   `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`, never committed
   or pushed on any branch.

No `git reset --hard`, `git clean`, or `git stash` against this or any other worktree is part of
this plan; those are explicitly excluded by packet section 13 and by this session's own standing
practice (see git-and-scope.txt for the scope-stop precedent where exactly this discipline was
already exercised once, successfully, on the six stray `*.tmp.log` files).

## Case B: after push (current state)

This branch (`claude/wpr-m1-corrected`) has been pushed to `origin`. Per the finite handoff rule
(Codex Root, `2026-08-13 16:26`), this plan enumerates every predecessor commit by exact hash and
describes the newest (round-2 correction) commit generically -- see the handoff section 2 for how
to resolve its exact hash:

1. `fcc158d78f9c2a62368d91aa35139c09f51eaf85` -- initial implementation.
2. `bdf5fb24b0526261dab171f2b32e8709d3a69648` -- round-1 remediation (fixes the CRITICAL
   placeholder-detection bypass and other independent-review findings; reverting this commit alone
   would restore that known bypass and is not recommended).
3. `1cf9a1a94e07e9efc388b85bc9842a9ba84923df` -- handoff signature-claim correction.
4. The round-2 correction commit containing the current handoff -- resolve via `git rev-parse HEAD`
   / remote / PR / CI head, per the handoff section 2 (fixes Atlas TPM's `CHANGES REQUESTED`
   findings: guard fail-closed contract completeness, stale handoff, incomplete command evidence,
   the `pa-ip-001` overlap disposition).

A draft PR (#31) targets `main`. If a rollback is needed:

1. Do not rewrite history and do not force-push. Use a normal `git revert` limited to whichever of
   this packet's commits on `claude/wpr-m1-corrected` need reverting -- each is independently
   revertible in reverse order. Reverting commit 2 alone would restore the pre-remediation guard's
   known CRITICAL bypass and is not recommended; reverting commit 4 alone would restore the
   round-2 fail-closed-contract gaps Atlas TPM found and is likewise not recommended without a
   replacement fix.
2. The revert must be performed only under Atlas TPM direction, per packet section 13.
3. Because no app, database, deployment, or production state changed, the revert needs no
   accompanying data/runtime migration and no coordination with any other track.
4. `main`, PR #25/#26/#27, and every other worktree remain untouched by this rollback path, since
   this packet never wrote to any of them.

## Non-goals of this plan

This plan does not cover, and this packet never requests: closing `BLK-BASE-001`, merging,
releasing, deploying, or any production action. Those remain outside this packet's authority
regardless of rollback state.

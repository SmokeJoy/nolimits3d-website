# Claude Peer Task Packet (self-scoped) - WPR-M2f Secret/Env Validation Guard

> **Status:** SELF-SCOPED, PROPOSAL ONLY -- no Atlas TPM confirmation, no Codex Root Architect
> Review. Not integrated into `main`. Awaiting Technical Review on Codex's return.
> **Authorized by:** Andrea (Product Owner and Client), 2026-08-24, during Codex's third reported
> outage this project (a platform-wide usage limit, reported by Codex Root itself in the channel
> as returning `2026-08-29 19:59`). Andrea's authorization explicitly reused the exact model of
> the first outage's `CLAUDE-WPR-M1-BASELINE-INVENTORY-PACKET.md`: a narrowly, safely scoped
> self-scoped Claude packet, real code included, documented transparently, reviewed and approved
> by Codex Root on return. It explicitly excluded self-approving any architecture/security
> decision reserved for Codex Root, working on anything overlapping the in-flight `V8`-`V12`
> `BLK-BASE-001` successor chain (Atlas TPM/Codex Root only, not Claude's lane), and any direct
> commit to `main`. Full history in `CODEX_CLAUDE_TEAM_CHANNEL.md`.
> **Milestone:** `AD-014` §4, `WPR-M2` -- "Data, Security And Operational Foundation", sub-scope
> `WPR-M2f` ("Secret/Env Validation") as sequenced in the still-unpacketized planning proposal
> `Project_Atlas_Team_Workspace/04_Planning/CLAUDE-WPR-M2-PLANNING-PROPOSAL.md` (PR #32, approved
> by Codex Root `2026-08-22 20:24` as "planning input", **not yet issued as a real Atlas TPM Task
> Packet** -- this self-scoped packet is not that future Task Packet; it is a narrower, disposable
> proof of the mechanism, explicit about that distinction throughout).
> **Owner:** Claude Team.
> **Branch:** `claude/wpr-m2f-env-validation-guard`.
> **Base commit:** `eaeb6090d42a6e2a9043a1becf2e8016369b0a6b` (current `main` tip, unchanged since
> `WPR-M1`/PR #31).
> **Dependencies:** none that require any other in-flight packet's completion. Deliberately chosen
> to be independent of `WPR-M2a`-`e`/`g`/`h` (unlike this packet's own `WPR-M2` planning proposal,
> which states `WPR-M2f` depends only on `WPR-M2a`'s typed `packages/config` surface -- this
> self-scoped increment does not wait for that either; see "Why this piece, not another" below).

## Objective

Andrea asked, during this outage, for real code -- not only proposals -- while staying inside the
same boundaries this session has held throughout: no self-approved architecture/security decision,
dedicated branches only, no conflict with Codex's own in-flight work, full transparent
documentation for review on return. This packet delivers exactly one real, working, tested
artifact: a deterministic, fail-closed **secret/environment-variable presence-and-format
validator**, matching `AD-014` §3.2's binding requirement and the `WPR-M2f` scope already sketched
(but not yet packetized) in PR #32's planning proposal.

## Why this piece, not another

Every other `WPR-M2` sub-packet requires an actual architecture decision this session has no
authority to make: `WPR-M2b`/`c`/`d` need real Supabase schema/RLS/Storage design (`AD-014` §5
reserves this to Codex Root); `WPR-M2a` needs real business-domain modeling decisions (product,
variant, order, quote, configuration shapes) that touch commerce/checkout rules `AD-014` §3.3
discusses as architecture; `WPR-M2g` needs a real database to back up (depends on `WPR-M2b`
existing); `WPR-M2h` was already reframed, and accepted by Codex Root, as a planning/architecture
packet producing a decision document, not code. `WPR-M2f` is different: **what the mechanism does
(validate declared variables against a declared schema, fail closed on mismatch) requires no
knowledge of which real secrets a production deployment will eventually need** -- that list is
itself an infrastructure decision `BLK-BASE-001` gates and this packet does not invent it. The
guard is schema-driven and ships with only a clearly-marked non-production example schema, so it
proves the mechanism without presupposing any real secret name, matching this session's standing
rule to never guess an architecture decision that belongs to Atlas TPM/Codex Root.

## What was built (real code, not a proposal document)

- `scripts/guards/env-validation-guard.mjs` -- hand-implemented (no new dependency, matching every
  other guard in this repo), pure `validateEnvSchema`/`checkEnv` functions separated from the I/O
  boundary (`loadSchema`, the CLI entrypoint), exactly mirroring
  `production-readiness-guard.mjs`'s existing convention. Fails closed on any missing/empty
  required variable or a value that does not match its declared `type`/`pattern`. **Never prints
  an actual variable value anywhere** -- only variable names and violation reasons -- since a
  presence/format check has no legitimate reason to disclose what may be a real secret at runtime;
  this is enforced by a dedicated test, not just claimed.
- `scripts/guards/env-validation-guard.test.mjs` -- 37 tests (`node --test`/`node:assert/strict`,
  matching the repo's existing test style): schema-structure validation (11 negative cases + 1
  positive), `checkEnv` behavior for every declared type (`string`/`boolean`/`number`/`url`) and
  `pattern`, `loadSchema` I/O error handling, CLI-arg parsing, four CLI integration tests
  (`execFileSync`) including one that positively proves a secret-looking fixture value never
  appears in stdout/stderr, and one that proves the committed example schema is itself valid.
- `scripts/guards/env-schema.example.json` -- a single, clearly-labeled non-production example
  schema (`"purpose": "NON-PRODUCTION EXAMPLE ONLY..."`), demonstrating the format with three
  synthetic `EXAMPLE_FIXTURE_*` variables. Does not declare any real NoLimits3D secret path.

## Allowed files/directories

- `scripts/guards/env-validation-guard.mjs` (new)
- `scripts/guards/env-validation-guard.test.mjs` (new)
- `scripts/guards/env-schema.example.json` (new)
- `Project_Atlas_Team_Workspace/04_Planning/CLAUDE-WPR-M2F-ENV-VALIDATION-GUARD-SELF-SCOPED-PROPOSAL.md`
  (this file)
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md` (coordination notes,
  local-only per standing rule, not committed on this branch)

## Forbidden files/directories

- Root `package.json` -- deliberately not touched. Unlike `WPR-M1`'s packet (which added one
  `guard:production-readiness` script entry after full review), this smaller self-scoped increment
  adds no script entry, to avoid any risk of colliding with whatever the real, eventually-issued
  `WPR-M2f` Atlas TPM Task Packet decides to name its own script. The guard is fully runnable
  directly (`node scripts/guards/env-validation-guard.mjs --schema <path>`) without one.
- `supabase/**`, `packages/**/src/**`, `apps/**` -- no schema, no application code, no product
  surface touched.
- `Project_Atlas_Team_Workspace/04_Planning/CLAUDE-WPR-M2-PLANNING-PROPOSAL.md` -- the existing
  planning-proposal document is not modified by this packet; this is a separate, additional,
  narrower artifact, not a revision of that proposal.
- Any `V7`-`V12`/`BLK-BASE-001` file, branch, or worktree -- explicitly not this session's lane,
  per Andrea's own instruction this round and Codex Root's repeated statements that Claude has zero
  ownership there.
- Any `AD-*`, `TSK-WPR-00[3-6]*` file, or any file Codex Root/Atlas TPM already owns per prior
  packets' forbidden-file lists.

## Acceptance criteria

- The guard fails closed (non-zero exit, explicit message) on any missing, empty, or
  type/pattern-mismatched required variable; passes only when every declared variable is
  satisfied.
- The guard's own violation output never contains an actual checked variable's value, proven by a
  dedicated test using a realistic-looking fixture value.
- `validateEnvSchema` rejects every structurally invalid schema shape tested (missing/wrong
  version, unknown keys, malformed variable entries, duplicate names, invalid regex patterns).
- 37/37 dedicated tests pass (`node --test scripts/guards/env-validation-guard.test.mjs`).
- `pnpm format:check` and `pnpm exec eslint` are clean on all three new files.
- `pnpm secret:scan` passes (one iteration required a fixture-value fix -- an `sk-`-prefixed test
  string incidentally matched the scanner's OpenAI-key pattern; replaced with a non-key-shaped
  value, then re-verified clean).
- `pnpm guard:scope` passes.

## Evidence

All gate output captured live during this session, reproduced in full in the channel checkpoint
that accompanies this packet's push (not duplicated into a separate evidence file, since this
increment's only claims requiring evidence are its own test/gate results, already exact and
reproducible by re-running the commands above against this branch).

**Known, independently confirmed, pre-existing, and unrelated:** the repository-wide `pnpm test`
fails in a completely fresh worktree with zero changes (verified against the untouched
`wpr-m2-planning` worktree at the same base commit) because `packages/ui/dist` (and other
workspace packages' build output) does not exist until a build step runs -- `apps/web`'s Vitest
suite cannot resolve `@atlas/ui`. This is not caused by, or related to, anything in this packet;
this packet's own dedicated test file passes standalone and does not depend on any workspace
package build output.

## Rollback

`git checkout main` / delete branch `claude/wpr-m2f-env-validation-guard` -- three new files only,
zero existing file touched; zero blast radius outside the branch itself.

## Handoff

On Codex Root's return (or earlier review, if capacity allows): review this packet as a disposable
proof-of-mechanism, not as the real `WPR-M2f` Task Packet -- that still needs to be issued by Atlas
TPM through the normal `AD-014` §1 process, informed by whatever this proves useful. If accepted,
its content may inform or be superseded by the real `WPR-M2f` packet; if rejected or duplicated by
Atlas TPM's own work in the meantime, this branch is disposable evidence, not a claim of authority
over the milestone -- exactly the disposition `WPR-M1`'s own packet declared for itself.

## Stop conditions

Stop immediately and report in the channel if: any forbidden file needs to change to complete this
packet, any overlap with Codex-owned or in-flight work (including the `V7`-`V12` chain or a
real `WPR-M2f` packet Atlas TPM may have already started) is discovered, or Codex Root returns and
objects to the scope or approach.

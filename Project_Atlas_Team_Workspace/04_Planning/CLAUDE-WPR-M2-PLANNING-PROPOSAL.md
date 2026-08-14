# Claude Peer Task Packet (self-scoped) - WPR-M2 Planning Proposal

> **Status:** SELF-SCOPED, PROPOSAL ONLY -- no Atlas TPM confirmation, no Codex Root Architect
> Review acceptance yet. Not integrated into `main`. This packet authors no schema, migration, RLS
> policy, Auth flow, or application code; it only proposes how `WPR-M2` should be sequenced into
> individually reviewable Task Packets.
> **Correction round:** this version responds to Codex Root's `2026-08-14 Europe/Rome - PR #32
> WPR-M2 Planning Architect Review` (`CHANGES REQUIRED`, posted on the prior head
> `1caf0495ba4184df2686cd3e265b2149d363c2db`, and to GitHub PR #32 comment
> `#issuecomment-5291077570`) and its `10:24` reconfirmation. Every finding from that review is
> addressed by name in the "Corrections applied" section immediately below the objective. No other
> file was touched to make this correction.
> **Authorized by:** Andrea (Product Owner and Client), 2026-08-14, during Codex's second reported
> platform-limit outage (Atlas TPM planning delegation specifically rate-limited until
> `2026-08-20 05:35` per Codex Root's own `10:24` entry; Codex Root's review/write capacity is
> independently confirmed active the same day). This correction is the one finite task Codex
> Root's `10:24` entry itself named as authorized right now: *"amend the existing PR #32 planning
> proposal and its PR description/checklist to resolve the Root review."* No implementation,
> integration, or other action is taken. Full history in `CODEX_CLAUDE_TEAM_CHANNEL.md`.
> **Milestone:** `AD-014` §4, `WPR-M2` -- "Data, Security And Operational Foundation".
> **Owner (this proposal):** Claude Team. **Owner (eventual sub-packets):** to be assigned by
> Atlas TPM/Codex Root per `AD-014` §5 -- not claimed by this document.
> **Branch:** `claude/wpr-m2-planning-proposal`.
> **Base commit:** `eaeb6090d42a6e2a9043a1becf2e8016369b0a6b` (`main` tip after `WPR-M1`/PR #31,
> unchanged since the prior head).
> **Dependencies:** `WPR-M1` (merged, PR #31) -- route inventory, gap register, client-data
> manifest, and production-readiness guard now on `main`. No dependency on any other in-flight
> Codex or Atlas packet; this branch touches nothing those packets could plausibly own.

## Objective

`AD-014` §1 is binding: *"It does not authorize broad ungoverned implementation. Every source
change still requires an approved Task Packet with an exact owner, allowed files, forbidden
files, evidence, tests, rollback, and stop conditions."* `WPR-M2` as described in §4 --
*"Implement typed contracts, Supabase schema and migrations, RLS, Auth boundary, Storage/upload,
fixture strategy, seed/reset, secret/env validation, backup/restore, and observability
foundations"* -- is too broad to be one reviewable packet: it spans four packages, the entire
Supabase surface, and several architecturally sequential decisions (RLS cannot be designed before
a schema exists; a schema cannot be reviewed before the domain types it encodes exist).

This packet proposes splitting `WPR-M2` into eight sequential sub-packets, each independently
sized and scoped the way `WPR-M1`'s own packet was. It does **not** decide any of the actual
architecture questions inside those sub-packets (table shapes, RLS predicate logic, Auth flow
specifics, bucket policies) -- `AD-014` §5 reserves those to Codex Root's Architect Review. This
document's job is sequencing and scope boundaries only, so that whoever reviews it next can
approve a shape, not a pile of undifferentiated work.

## Corrections applied in this round (mapped to Codex Root's exact findings)

- **P1 security (RLS bootstrap):** `WPR-M2b`'s scope now explicitly requires every table it
  creates to *atomically* enable RLS with a deny-all bootstrap policy in the same migration that
  creates the table -- no migration may leave a table default-open even momentarily. `WPR-M2c` is
  now explicitly scoped as *replacing* that bootstrap with verified identity/object policies, not
  as the first point RLS is ever enabled. See the revised `WPR-M2b`/`WPR-M2c` entries below.
- **P1 scope (overlapping `supabase/migrations/**` claims):** `WPR-M2b`, `M2c`, and `M2d` no
  longer each claim the whole `supabase/migrations/**` directory. Each sub-packet's own Task
  Packet must now enumerate, by exact filename, the complete migration file set that exists at
  that packet's base (a "frozen base migration set"), and its allowed-file grant is *only* new
  migration files added after that frozen set -- it may not modify or delete any pre-existing
  migration file. Because each sub-packet starts only after its predecessor is merged, this makes
  the sets disjoint by construction (stale-base sequencing) rather than by a static path prefix,
  which isn't expressible against Supabase's auto-timestamped migration filenames. `WPR-M2e`'s
  optional fixture-generation script is now a single exact named file
  (`scripts/fixtures/generate-wpr-m2-fixtures.mjs`), not an open `scripts/**` claim, removing the
  overlap with `WPR-M2f`'s `scripts/guards/**`.
- **P1 operability (packet too broad):** the former single `WPR-M2f` ("secret/env validation,
  backup/restore, and observability") is now split into three separate sub-packets --
  `WPR-M2f` (secret/env validation only), `WPR-M2g` (backup/restore only), `WPR-M2h`
  (observability foundations only) -- each with its own scope, allowed/forbidden files, evidence
  path, and rollback, per Codex Root's requirement that these have "distinct evidence,
  external-lane, rollback, and owner contracts."
- **P2 contracts/evidence (source-of-truth direction, evidence/handoff/review paths,
  unavailable-lane handling):** `WPR-M2a`'s scope now explicitly requires its own Task Packet to
  establish and document one source-of-truth direction among runtime validators, TypeScript
  types, database schema, and generated types (this proposal does not pick the direction itself --
  that is `WPR-M2a`'s own Architect Review question -- but the *requirement to decide and document
  it* is now stated), plus unknown-field rejection and negative fixtures as explicit acceptance
  criteria. Every sub-packet below now states an explicit evidence/handoff/review file-path
  pattern and an explicit fail-closed requirement for when its dependent lane (local Supabase, CI,
  or restore target) is unavailable.

## Current repository state (independently verified, not assumed)

Verified directly against this worktree at base commit `eaeb609` (unchanged from the prior head
Codex Root reviewed -- re-confirmed, not re-derived from scratch, since nothing in the repository
moved between reviews):

- `packages/api-contracts/src/index.ts`, `packages/domain/src/index.ts`,
  `packages/config/src/index.ts` -- each file is exactly `export {};` (1 line of content). Zero
  real types, zero real exports, in any of the three typed-contract packages `apps/web/package.json`
  already depends on.
- `supabase/migrations/` -- contains only `.gitkeep`. Zero migrations. This is the exact "frozen
  base migration set" (empty set) that `WPR-M2b` would start from if authorized.
- `supabase/seed/` -- empty directory, zero files.
- `supabase/functions/_shared/` -- contains only `.gitkeep`. Zero edge functions exist anywhere
  under `supabase/functions/`.
- `supabase/config.toml` -- local CLI scaffolding only (`project_id = "nolimits3d-local"`, default
  API/DB/Studio ports). No environment-specific or secret configuration.
- No RLS policy file, no Auth configuration, no Storage bucket definition exists anywhere in the
  repository (confirmed by the empty `supabase/migrations/` -- RLS and bucket policies in this
  stack are authored as migrations).
- `WPR-M1` (merged) already provides, and this proposal treats as fixed input: 6 client-data
  categories and their required fields (`CLIENT_DATA_MANIFEST.json`,
  `WPR-M1-SOURCE-BINDING-CONTRACT.json`), the route inventory naming which route needs which data
  category (`WPR-M1-BASELINE-ROUTE-INVENTORY.md`), and the fail-closed
  `production-readiness-guard.mjs`, which will need real binding entries once real schema/consumers
  exist -- it currently and correctly reports `ready:false`.

## Proposed sub-packet sequence

Ordered by genuine dependency, not by convenience. No sub-packet after the first can be
meaningfully reviewed before the one before it lands, because each one's inputs are the previous
one's outputs.

### WPR-M2a -- Typed Contracts Foundation

- **Scope:** real exported types/schemas in `packages/domain/src` (business entities: product,
  variant, order, quote, configuration, etc., matching `AD-014` §3.2's manifest categories),
  `packages/api-contracts/src` (request/response contracts consumed by `apps/web`), and
  `packages/config/src` (typed environment/config access, no secret values). This sub-packet's own
  Task Packet must explicitly decide and document one source-of-truth direction among runtime
  validators, TypeScript types, database schema, and (once it exists) Supabase-generated types --
  which one is authored by hand and which are derived -- rather than leaving that implicit.
- **Why first:** every later sub-packet (schema, RLS, Storage, fixtures) either encodes or
  consumes these types. Building schema before types exist means the schema has no source of
  truth to match.
- **Allowed files (future packet, not this one):** `packages/domain/**`, `packages/api-contracts/**`,
  `packages/config/**` only.
- **Forbidden:** `supabase/**`, `apps/web/src/**` (only `packages/*` -- consuming these types in
  `apps/web` is a later sub-packet or `WPR-M3`, not this one), root `package.json`.
- **Acceptance criteria:** every `AD-014` §3.2 manifest category has a corresponding typed domain
  entity; the source-of-truth direction is written down in that packet's own handoff; every
  validator rejects unknown fields (no silent pass-through); negative fixtures exist proving
  rejection of malformed/unexpected-shape input; `pnpm typecheck`/`pnpm build` pass for all three
  packages; no Supabase client code, no network call, no I/O -- pure types and schema validators.
- **Evidence/handoff/review:** `Project_Atlas_Team_Workspace/05_Evidence/WPR/WPR-M2a/` for test
  output and negative-fixture proof; `Project_Atlas_Team_Workspace/06_Handoffs/WPR-M2a-HANDOFF.md`.
- **Unavailable-lane handling:** none of this sub-packet's work depends on a running Supabase
  instance or CI-only resource, so there is no unavailable-lane case to fail closed against here.

### WPR-M2b -- Supabase Schema & Migrations, With Atomic RLS Bootstrap

- **Scope:** the first real file(s) under `supabase/migrations/`, encoding the domain types from
  `WPR-M2a` as Postgres tables/columns/constraints/indexes. **Every migration that creates a table
  must, in that same migration file, enable Row Level Security on it and install a deny-all
  bootstrap policy** (e.g. `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` plus a policy that grants
  no access to any role) -- no table may exist even momentarily without RLS enabled. This is a
  correction from the prior round, which left RLS entirely to `WPR-M2c` and would have created a
  default-open window between `WPR-M2b` and `WPR-M2c` landing.
- **Depends on:** `WPR-M2a` merged (or at minimum reviewed/frozen) -- schema must trace to real
  types, not be invented ahead of them.
- **Allowed files (future packet):** new files under `supabase/migrations/` only, added strictly
  after the exact migration file set frozen at this sub-packet's own base (enumerated by exact
  filename in that packet's own Task Packet header at issuance time -- currently the empty set,
  per "Current repository state" above). No modification or deletion of any pre-existing migration
  file.
- **Forbidden:** `packages/**`, `apps/**`, any RLS policy *beyond* the mandatory deny-all
  bootstrap on each new table (verified, identity-aware policies are `WPR-M2c`'s scope, not this
  one's), any Auth/Storage config.
- **Acceptance criteria:** `supabase db reset` (or equivalent local dry-run) applies cleanly; every
  table maps to exactly one `WPR-M2a` domain type; every table has RLS enabled with a deny-all
  bootstrap policy in the same migration that creates it (verifiable by a dedicated test that
  queries `pg_tables`/`pg_policies` and fails if any table lacks both); migration is reversible or
  explicitly documented as forward-only with rationale.
- **Evidence/handoff/review:** `Project_Atlas_Team_Workspace/05_Evidence/WPR/WPR-M2b/` including
  the `pg_tables`/`pg_policies` verification output; `06_Handoffs/WPR-M2b-HANDOFF.md`.
- **Unavailable-lane handling:** if no local Supabase instance is reachable (dry-run/CI), the
  packet's own gate must fail closed (non-zero exit, explicit "Supabase unavailable" message) --
  it must never report success by skipping the schema-apply check.

### WPR-M2c -- Auth Boundary & Verified RLS Policies

- **Scope:** the Supabase Auth boundary (`AD-014` §3.3's "lightweight passwordless-first flow,
  deny-by-default RLS, object-level authorization, revocation, expiry, audit, and cross-account
  negative tests") and the migrations that *replace* `WPR-M2b`'s deny-all bootstrap policies with
  real, verified identity/object-level policies -- table-by-table, never leaving a table without
  an active policy during the transition (replace, not drop-then-add).
- **Depends on:** `WPR-M2b` merged -- verified policies replace bootstrap policies on real tables,
  cannot be written against a schema (or a bootstrap) that doesn't exist yet.
- **Allowed files (future packet):** new files under `supabase/migrations/` only, added strictly
  after the exact migration set frozen at this sub-packet's own base (which will include every
  `WPR-M2b` migration, enumerated by filename at this packet's issuance), Auth configuration under
  `supabase/config.toml`'s `[auth]` section, no application code.
- **Forbidden:** `packages/**`, `apps/**` -- consuming Auth client-side is `WPR-M3` or a later
  sub-packet, not this one. No modification of any `WPR-M2a`/`WPR-M2b` file.
- **Acceptance criteria:** every table from `WPR-M2b` has a verified, non-bootstrap RLS policy (no
  table left on the deny-all bootstrap after this packet lands); cross-account negative tests exist
  and fail closed; this is the single highest-risk sub-packet in `WPR-M2` and should carry the
  most scrutiny in Architect Review, matching `AD-014` §5's reservation of security decisions to
  Codex Root.
- **Evidence/handoff/review:** `Project_Atlas_Team_Workspace/05_Evidence/WPR/WPR-M2c/` including
  cross-account negative-test transcripts; `06_Handoffs/WPR-M2c-HANDOFF.md`.
- **Unavailable-lane handling:** cross-account negative tests must fail closed (non-zero exit) if
  they cannot actually execute against a live local/CI Supabase instance -- a skipped test must
  never be reported as a pass.

### WPR-M2d -- Storage & Upload

- **Scope:** Supabase Storage bucket definitions and upload-path validation (`AD-014` §3.4 --
  "controlled upload, retention, abuse protection") for the media/attachment needs already named
  in the `WPR-M1` gap register (portfolio media, event media, intake attachments).
- **Depends on:** `WPR-M2c` -- bucket access policies are themselves RLS-shaped and need the
  verified Auth boundary to exist first, not just `WPR-M2b`'s bootstrap.
- **Allowed files (future packet):** new files under `supabase/migrations/` only, added strictly
  after the exact migration set frozen at this sub-packet's own base (enumerated at issuance,
  including every `WPR-M2b`/`WPR-M2c` migration), `supabase/functions/_shared/**` if shared
  upload-validation logic is needed.
- **Forbidden:** `packages/**`, `apps/**`, modification of any `WPR-M2a`/`b`/`c` file.
- **Acceptance criteria:** every bucket has an explicit, verified access policy from creation (no
  bootstrap-then-replace step needed here since `WPR-M2c` already establishes the pattern); no
  bucket is public by default; upload validation rejects unapproved file types/sizes.
- **Evidence/handoff/review:** `Project_Atlas_Team_Workspace/05_Evidence/WPR/WPR-M2d/`;
  `06_Handoffs/WPR-M2d-HANDOFF.md`.
- **Unavailable-lane handling:** upload-validation tests must fail closed if no local/CI Storage
  emulation is reachable.

### WPR-M2e -- Fixture Strategy, Seed/Reset

- **Scope:** `supabase/seed/` content and exactly one named fixture-generation script,
  `scripts/fixtures/generate-wpr-m2-fixtures.mjs`, explicitly isolated from production data per
  `AD-014` §3.2 -- *"fixtures must be isolated from production data and visually or structurally
  identifiable as non-final."*
- **Depends on:** `WPR-M2b` (schema must exist to seed) and `WPR-M2c` (seed data must respect the
  verified RLS ownership model, e.g. seeded rows need a valid owner/role under the real Auth
  boundary, not the bootstrap).
- **Allowed files (future packet):** `supabase/seed/**`, exactly
  `scripts/fixtures/generate-wpr-m2-fixtures.mjs` (this one named file only -- not an open
  `scripts/**` claim, so it cannot collide with `WPR-M2f`'s `scripts/guards/**`).
- **Forbidden:** `packages/**`, `apps/**`, any migration file (fixtures are data, not schema),
  `scripts/guards/**`.
- **Acceptance criteria:** fixture data is structurally/visually distinguishable from real business
  content (matching the existing `production-readiness-guard.mjs` placeholder-detection logic's
  spirit); `supabase db reset` + seed reproduces a known state deterministically.
- **Evidence/handoff/review:** `Project_Atlas_Team_Workspace/05_Evidence/WPR/WPR-M2e/`;
  `06_Handoffs/WPR-M2e-HANDOFF.md`.
- **Unavailable-lane handling:** the reset+seed reproducibility check must fail closed if no
  local/CI Supabase instance is reachable.

### WPR-M2f -- Secret/Env Validation

- **Scope:** secret/env validation tooling only -- fails closed on missing/malformed required
  environment variables, matching `AD-014` §3.2's "provider/project identifiers and production
  credentials supplied through approved secret paths."
- **Depends on:** `WPR-M2a` (needs `packages/config`'s typed env surface to validate against); does
  not depend on `WPR-M2b`-`e` since it validates presence/shape of secrets, not database state.
- **Allowed files (future packet):** exactly one new `scripts/guards/env-validation-guard.mjs`
  (plus its dedicated test file, matching the existing guard pattern), no other file.
- **Forbidden:** `packages/**` (beyond reading `packages/config`'s existing typed surface, no
  edits), `apps/**`, `supabase/**`.
- **Acceptance criteria:** guard fails closed (non-zero exit) on any missing or malformed required
  environment variable; no real production credential is ever written to the repository as a test
  fixture.
- **Evidence/handoff/review:** `Project_Atlas_Team_Workspace/05_Evidence/WPR/WPR-M2f/`;
  `06_Handoffs/WPR-M2f-HANDOFF.md`.
- **Unavailable-lane handling:** not applicable -- this guard is pure static validation, no
  external lane involved.

### WPR-M2g -- Backup/Restore

- **Scope:** backup/restore procedure meeting `AD-014` §6's RPO 24h / RTO 8h requirement, as its
  own distinct deliverable with its own evidence and rollback -- not folded into any other
  sub-packet.
- **Depends on:** `WPR-M2b` (there must be a real database to back up).
- **Allowed files (future packet):** documentation of the backup/restore procedure under
  `Project_Atlas_Team_Workspace/`, and if a script is needed, exactly one new
  `scripts/guards/backup-restore-guard.mjs` (or equivalent single named file, not a directory
  claim).
- **Forbidden:** `packages/**`, `apps/**`, `supabase/migrations/**` (this packet documents and
  verifies a procedure against existing schema, it does not add schema).
- **Acceptance criteria:** procedure is documented and, if feasible in a local/CI environment,
  demonstrated end-to-end against a real restore target meeting the RPO/RTO figures; no real
  production credential is ever written to the repository.
- **Evidence/handoff/review:** `Project_Atlas_Team_Workspace/05_Evidence/WPR/WPR-M2g/`;
  `06_Handoffs/WPR-M2g-HANDOFF.md`.
- **Unavailable-lane handling:** if no restore target is reachable in the environment the gate
  runs in, it must fail closed and explicitly report "restore target unavailable" rather than
  silently passing.

### WPR-M2h -- Observability Foundations

- **Scope:** baseline observability (error/log capture foundations) as its own distinct
  deliverable, not a full dashboard and not folded into `WPR-M2f`/`g`.
- **Depends on:** conceptually benefits from `WPR-M2a`-`g` existing so there is real
  schema/Auth/Storage surface to observe, but has no hard technical dependency preventing earlier
  work if Architect Review prefers a different order.
- **Allowed files (future packet):** to be scoped exactly by that packet's own Task Packet at
  issuance (this proposal does not pre-name files here, since the concrete mechanism -- e.g.
  structured logging in an edge function, a Supabase log-drain configuration -- is itself an
  architecture choice for that packet's Architect Review, not for this sequencing document).
- **Forbidden:** `packages/**` beyond typed logging interfaces if needed, `apps/**` UI code,
  modification of any prior sub-packet's files.
- **Acceptance criteria:** to be defined in that packet's own Task Packet; at minimum, error
  capture must not silently drop errors (fail closed, not fail open, on capture failure).
- **Evidence/handoff/review:** `Project_Atlas_Team_Workspace/05_Evidence/WPR/WPR-M2h/`;
  `06_Handoffs/WPR-M2h-HANDOFF.md`.
- **Unavailable-lane handling:** to be defined in that packet's own Task Packet, following the same
  fail-closed pattern as every sub-packet above.

## What this proposal explicitly does not authorize

- No sub-packet above is authorized to start by virtue of appearing in this document. Each still
  needs its own Task Packet issued per `AD-014` §1, with Atlas TPM/Codex Root assignment,
  independent of this proposal's existence.
- No architecture or security decision is made here: not a single table name, RLS predicate, Auth
  flow detail, or bucket policy is specified above beyond what `AD-014` itself already states and
  the atomicity/replacement *requirements* this correction adds. Those belong to Codex Root's
  Architect Review at each sub-packet's Technical Review, not to this sequencing proposal.
- This proposal does not claim ownership of `WPR-M2` for Claude Team. `AD-014` §5 names Atlas
  Frontend and Atlas Backend as "the only active Atlas implementers"; if Codex Root's own `WPR-M2`
  planning is already underway or assigns these sub-packets elsewhere, this document is disposable
  input, not a competing claim.

## Allowed files/directories (this packet only)

- `Project_Atlas_Team_Workspace/04_Planning/CLAUDE-WPR-M2-PLANNING-PROPOSAL.md` (this file)
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md` (coordination
  notes, local-only per standing rule -- not committed on this branch)

## Forbidden files/directories (this packet only)

- `supabase/**` in its entirety -- no migration, seed, function, or config change.
- `packages/**/src/**` in its entirety -- no type, contract, or config code.
- `apps/**` in its entirety -- no route, page, or application code.
- Root `package.json`, any `AD-*` file, any `TSK-WPR-00[3-6]*` file, and every file
  `WPR-M1`'s own packet already listed as Codex Root/Atlas TPM-owned.
- Any file that would itself constitute starting `WPR-M2a`-`WPR-M2h` -- this packet proposes the
  shape of that work, it does not perform any of it.

## Acceptance criteria (for this proposal document)

- Every `AD-014` §3.2/§3.3/§3.4/§4 `WPR-M2` requirement maps to exactly one sub-packet above (none
  silently dropped, none duplicated across two sub-packets).
- Sub-packets are ordered by real dependency, each stated explicitly, not by arbitrary convenience.
- No sub-packet's proposed allowed-file set overlaps another's, including the `supabase/migrations/`
  disjointness mechanism (frozen base set per sub-packet, append-only, no cross-editing) and the
  exact single-filename grants for `WPR-M2e`/`f`/`g` scripts.
- Every sub-packet states an explicit evidence/handoff/review path and an explicit fail-closed
  requirement for its own unavailable-lane case (or explicitly states none applies).
- `WPR-M2b` requires atomic RLS-enable + deny-all bootstrap on every table it creates; `WPR-M2c`
  requires replacing that bootstrap with verified policies, never dropping protection first.
- The "current repository state" section is independently reproducible -- verified via
  `find packages/*/src -type f` + reading each file, `ls supabase/migrations supabase/seed
  supabase/functions/_shared`, and reading `supabase/config.toml`, all re-runnable by any
  reviewer against this exact branch.
- This document makes no schema, RLS, Auth, or application-code decision itself.

## Evidence

Current-state verification commands and their output are reproduced in the "Current repository
state" section above rather than a separate evidence file, since this packet produces no code to
test -- the only claims requiring evidence are about what already exists, and those are the exact
commands run against this worktree at base commit `eaeb609`.

## Rollback

`git checkout main` / delete branch `claude/wpr-m2-planning-proposal` -- this packet adds exactly
one file (amended in place across correction rounds) and touches nothing else; zero blast radius
outside the branch itself.

## Handoff

On Codex Root's fresh exact-head review (per its own `10:24` instruction: request one new review
after a corrected signed head is pushed and CI is green): if accepted, Atlas TPM issues real Task
Packets for `WPR-M2a` through `WPR-M2h` in order, each independently owned and reviewed per
`AD-014` §1. If Codex Root already has `WPR-M2` planning underway elsewhere, or still disagrees
with this sequencing, this document remains disposable, non-authoritative input -- not a claim of
authority over the milestone. Per Codex Root's explicit stop boundary, this correction does not
queue a peer review or any implementation in the same task -- only the proposal/PR amendment and
the request for a fresh exact-head review.

## Stop conditions

Stop immediately and report in the channel if: any forbidden file needs to change to complete
this packet, any overlap with Codex-owned or in-flight `WPR-M2` planning is discovered, or Codex
Root returns/re-engages and objects to this scope or sequencing.

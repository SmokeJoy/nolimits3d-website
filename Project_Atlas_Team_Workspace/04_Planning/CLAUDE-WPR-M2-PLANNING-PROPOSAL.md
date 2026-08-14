# Claude Peer Task Packet (self-scoped) - WPR-M2 Planning Proposal

> **Status:** SELF-SCOPED, PROPOSAL ONLY -- no Atlas TPM confirmation, no Codex Root Architect
> Review. Not integrated into `main`. This packet authors no schema, migration, RLS policy, Auth
> flow, or application code; it only proposes how `WPR-M2` should be sequenced into individually
> reviewable Task Packets.
> **Authorized by:** Andrea (Product Owner and Client), 2026-08-14, during Codex's second reported
> platform-limit outage (unavailable until 2026-08-20 per Andrea's report; Andrea separately
> reported a brief reactivation the same day). Andrea's authorization explicitly excluded
> self-approving any architecture/security decision reserved for Codex Root -- this packet honors
> that by proposing sequencing only, never resolving a design question itself. Full history in
> `CODEX_CLAUDE_TEAM_CHANNEL.md`.
> **Milestone:** `AD-014` §4, `WPR-M2` -- "Data, Security And Operational Foundation".
> **Owner (this proposal):** Claude Team. **Owner (eventual sub-packets):** to be assigned by
> Atlas TPM/Codex Root per `AD-014` §5 -- not claimed by this document.
> **Branch:** `claude/wpr-m2-planning-proposal`.
> **Base commit:** `eaeb6090d42a6e2a9043a1becf2e8016369b0a6b` (`main` tip after `WPR-M1`/PR #31).
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

This packet proposes splitting `WPR-M2` into six sequential sub-packets, each independently
sized and scoped the way `WPR-M1`'s own packet was. It does **not** decide any of the actual
architecture questions inside those sub-packets (table shapes, RLS predicate logic, Auth flow
specifics, bucket policies) -- `AD-014` §5 reserves those to Codex Root's Architect Review. This
document's job is sequencing and scope boundaries only, so that whoever reviews it next can
approve a shape, not a pile of undifferentiated work.

## Current repository state (independently verified, not assumed)

Verified directly against this worktree at base commit `eaeb609`:

- `packages/api-contracts/src/index.ts`, `packages/domain/src/index.ts`,
  `packages/config/src/index.ts` -- each file is exactly `export {};` (1 line of content). Zero
  real types, zero real exports, in any of the three typed-contract packages `apps/web/package.json`
  already depends on.
- `supabase/migrations/` -- contains only `.gitkeep`. Zero migrations.
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
  `packages/config/src` (typed environment/config access, no secret values).
- **Why first:** every later sub-packet (schema, RLS, Storage, fixtures) either encodes or
  consumes these types. Building schema before types exist means the schema has no source of
  truth to match.
- **Allowed files (future packet, not this one):** `packages/domain/**`, `packages/api-contracts/**`,
  `packages/config/**` only.
- **Forbidden:** `supabase/**`, `apps/web/src/**` (only `packages/*` -- consuming these types in
  `apps/web` is a later sub-packet or `WPR-M3`, not this one), root `package.json`.
- **Rough acceptance criteria:** every `AD-014` §3.2 manifest category has a corresponding typed
  domain entity; `pnpm typecheck`/`pnpm build` pass for all three packages; no Supabase client
  code, no network call, no I/O -- pure types and schema validators.

### WPR-M2b -- Supabase Schema & Migrations

- **Scope:** the first real file(s) under `supabase/migrations/`, encoding the domain types from
  `WPR-M2a` as Postgres tables/columns/constraints/indexes.
- **Depends on:** `WPR-M2a` merged (or at minimum reviewed/frozen) -- schema must trace to real
  types, not be invented ahead of them.
- **Allowed files (future packet):** `supabase/migrations/**` only (new files; `.gitkeep` may be
  removed once a real migration exists).
- **Forbidden:** `packages/**`, `apps/**`, any RLS policy (RLS is `WPR-M2c`, sequenced after
  schema exists to review against), any Auth/Storage config.
- **Rough acceptance criteria:** `supabase db reset` (or equivalent local dry-run) applies cleanly;
  every table maps to exactly one `WPR-M2a` domain type; migration is reversible or explicitly
  documented as forward-only with rationale.

### WPR-M2c -- RLS & Auth Boundary

- **Scope:** deny-by-default Row Level Security policies (`AD-014` §3.3) and the Supabase Auth
  boundary (`AD-014` §3.3's "lightweight passwordless-first flow, deny-by-default RLS,
  object-level authorization, revocation, expiry, audit, and cross-account negative tests").
- **Depends on:** `WPR-M2b` merged -- RLS policies attach to real tables, cannot be written
  against a schema that doesn't exist yet.
- **Allowed files (future packet):** additional `supabase/migrations/**` files (RLS-only), Auth
  configuration under `supabase/config.toml`'s `[auth]` section, no application code.
- **Forbidden:** `packages/**`, `apps/**` -- consuming Auth client-side is `WPR-M3` or a later
  sub-packet, not this one.
- **Rough acceptance criteria:** every table from `WPR-M2b` has an explicit RLS policy (no table
  left with default-open access); cross-account negative tests exist and fail closed; this is the
  single highest-risk sub-packet in `WPR-M2` and should carry the most scrutiny in Architect
  Review, matching `AD-014` §5's reservation of security decisions to Codex Root.

### WPR-M2d -- Storage & Upload

- **Scope:** Supabase Storage bucket definitions and upload-path validation (`AD-014` §3.4 --
  "controlled upload, retention, abuse protection") for the media/attachment needs already named
  in the `WPR-M1` gap register (portfolio media, event media, intake attachments).
- **Depends on:** `WPR-M2c` -- bucket access policies are themselves RLS-shaped and need the Auth
  boundary to exist first.
- **Allowed files (future packet):** `supabase/migrations/**` (bucket/policy definitions only),
  `supabase/functions/_shared/**` if shared upload-validation logic is needed.
- **Forbidden:** `packages/**`, `apps/**`.
- **Rough acceptance criteria:** every bucket has an explicit access policy; no bucket is public
  by default; upload validation rejects unapproved file types/sizes.

### WPR-M2e -- Fixture Strategy, Seed/Reset

- **Scope:** `supabase/seed/` content and any fixture-generation tooling, explicitly isolated from
  production data per `AD-014` §3.2 -- *"fixtures must be isolated from production data and
  visually or structurally identifiable as non-final."*
- **Depends on:** `WPR-M2b` (schema must exist to seed) and `WPR-M2c` (seed data must respect RLS
  ownership, e.g. seeded rows need a valid owner/role under the new Auth boundary).
- **Allowed files (future packet):** `supabase/seed/**`, a fixture-generation script under
  `scripts/` if needed (new file, not modifying existing guards).
- **Forbidden:** `packages/**`, `apps/**`, any migration file (fixtures are data, not schema).
- **Rough acceptance criteria:** fixture data is structurally/visually distinguishable from real
  business content (matching the existing `production-readiness-guard.mjs` placeholder-detection
  logic's spirit); `supabase db reset` + seed reproduces a known state deterministically.

### WPR-M2f -- Secret/Env Validation, Backup/Restore, Observability Foundations

- **Scope:** secret/env validation tooling (fails closed on missing/malformed required
  environment variables), backup/restore procedure meeting `AD-014` §6's RPO 24h / RTO 8h
  requirement, and baseline observability (error/log capture foundations, not a full dashboard).
- **Depends on:** `WPR-M2b` (there must be a real database to back up) and conceptually benefits
  from all prior sub-packets existing so the secret/env surface is stable rather than growing
  mid-work.
- **Allowed files (future packet):** a new `scripts/guards/*.mjs` (env validation, matching the
  existing guard pattern), documentation of the backup/restore procedure, no application/schema
  code.
- **Forbidden:** `packages/**`, `apps/**`, `supabase/migrations/**`.
- **Rough acceptance criteria:** env validation guard fails closed on any missing required secret
  path (matching `AD-014` §3.2's "provider/project identifiers and production credentials
  supplied through approved secret paths"); backup/restore procedure is documented and, if
  feasible in a local/CI environment, demonstrated end-to-end; no real production credential is
  ever written to the repository.

## What this proposal explicitly does not authorize

- No sub-packet above is authorized to start by virtue of appearing in this document. Each still
  needs its own Task Packet issued per `AD-014` §1, with Atlas TPM/Codex Root assignment,
  independent of this proposal's existence.
- No architecture or security decision is made here: not a single table name, RLS predicate, Auth
  flow detail, or bucket policy is specified above beyond what `AD-014` itself already states.
  Those belong to Codex Root's Architect Review at each sub-packet's Technical Review, not to this
  sequencing proposal.
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
- Any file that would itself constitute starting `WPR-M2a`-`WPR-M2f` -- this packet proposes the
  shape of that work, it does not perform any of it.

## Acceptance criteria (for this proposal document)

- Every `AD-014` §3.2/§3.3/§3.4/§4 `WPR-M2` requirement maps to exactly one sub-packet above (none
  silently dropped, none duplicated across two sub-packets).
- Sub-packets are ordered by real dependency, each stated explicitly, not by arbitrary convenience.
- The "current repository state" section is independently reproducible -- verified via
  `find packages/*/src -type f` + reading each file, `ls supabase/migrations supabase/seed
  supabase/functions/_shared`, and reading `supabase/config.toml`, all re-runnable by any
  reviewer against this exact branch.
- No sub-packet's proposed allowed-file set overlaps another's.
- This document makes no schema, RLS, Auth, or application-code decision itself.

## Evidence

Current-state verification commands and their output are reproduced in the "Current repository
state" section above rather than a separate evidence file, since this packet produces no code to
test -- the only claims requiring evidence are about what already exists, and those are the exact
commands run against this worktree at base commit `eaeb609`.

## Rollback

`git checkout main` / delete branch `claude/wpr-m2-planning-proposal` -- this packet adds exactly
one new file and touches nothing else; zero blast radius outside the branch itself.

## Handoff

On Codex Root's review (whether during this reactivated window or on full return 2026-08-20):
review this sequencing proposal against `WPR-M2`'s actual intended shape. If accepted, Atlas TPM
issues real Task Packets for `WPR-M2a` through `WPR-M2f` in order, each independently owned and
reviewed per `AD-014` §1. If Codex Root already has `WPR-M2` planning underway elsewhere, or
disagrees with this sequencing, this document is disposable, non-authoritative input -- not a
claim of authority over the milestone.

## Stop conditions

Stop immediately and report in the channel if: any forbidden file needs to change to complete
this packet, any overlap with Codex-owned or in-flight `WPR-M2` planning is discovered, or Codex
Root returns/re-engages and objects to this scope or sequencing.

# Claude Peer Task Packet (self-scoped) - WPR-M2 Typed Contract Proposal

> **Status:** SELF-SCOPED, NON-BINDING PROPOSAL ONLY -- per `AD-015` section 2, "Claude Team may
> propose architecture and contracts but cannot approve them." No Atlas TPM confirmation, no
> Codex Root Architect Review, not integrated into `main`. Backend owns acceptance, amendment,
> or rejection.
> **Authorized by:** Andrea (Product Owner and Client), 2026-08-06, during the same confirmed
> Codex platform outage (unavailable until 2026-08-13 12:33) as `WPR-M1`. See
> `001_SESSION_HANDOFF.md` and `CODEX_CLAUDE_TEAM_CHANNEL.md` for the outage-resumption record.
> **Milestone:** `AD-014` section 4, `WPR-M2` -- "Data, Security And Operational Foundation"
> (prep only -- this packet proposes typed contracts, it does not implement Supabase schema,
> migrations, RLS, Auth, or Storage, which stay Codex Root/Atlas Backend's architectural call).
> **Owner:** Claude Team.
> **Branch:** `claude/wpr-m2-contract-proposal`.
> **Base commit:** current `main` tip at branch creation (independent of, and with zero file
> overlap with, `claude/wpr-m1-baseline-inventory` / PR #25).

## Why this scope, not full WPR-M2

`WPR-M2` itself (real Supabase schema/migrations/RLS/Auth/Storage) is architecture, which
`AD-014` section 5 reserves to Codex Root ("owns architecture, Blueprint decisions ... and
program boundaries"). Building that unilaterally during an outage risks a much larger version of
the earlier `QUARANTINE` conflict this session -- migrations and RLS policies are stateful and
far harder to cleanly discard than documentation if Codex Root's own design differs. `AD-015`
section 2 draws exactly this line: Claude may **propose** contracts, not **implement** the
backend they describe. This packet stays on the proposal side of that line: plain TypeScript
types, no runtime validation library added (avoids an unreviewed dependency-adoption decision
too), no Supabase project touched, no migration files.

## Allowed files/directories

- `Project_Atlas_Team_Workspace/04_Planning/CLAUDE-WPR-M2-CONTRACT-PROPOSAL-PACKET.md` (this file)
- `packages/domain/src/**` (new files: `media.ts`, `catalog.ts`, `configurator.ts`, `cart.ts`,
  `intake.ts`; `index.ts` re-export)
- `packages/api-contracts/src/**` (new files: `catalog.ts`, `cart.ts`, `intake.ts`,
  `configurator.ts`; `index.ts` re-export)
- `packages/api-contracts/package.json` (adding the `@atlas/domain` workspace dependency only)
- `pnpm-lock.yaml` (the lockfile delta from that one new workspace dependency)

## Forbidden files/directories

- The eight `WPR-003`-`WPR-006` governance files (unchanged from the `WPR-M1` packet's list).
- Any `AD-*` or `TSK-WPR-00[3-6]*` file.
- Any `apps/web/**` route/page/UI code -- this packet defines shapes only, it wires nothing up.
- Any `supabase/**` schema, migration, or config file -- real backend implementation is
  explicitly out of scope for a proposal packet.
- No new runtime dependency (e.g. a validation library) -- kept to plain TypeScript so the
  proposal carries zero dependency-adoption decision Backend would also have to inherit.

## Acceptance criteria

- Every exported type traces to a specific `AD-014` clause (cited inline in each file's header
  comment) -- nothing invents business rules beyond what's already approved.
- `pnpm --filter @atlas/domain typecheck` and `pnpm --filter @atlas/api-contracts typecheck`
  pass; `pnpm --filter @atlas/domain build` / `--filter @atlas/api-contracts build` emit clean
  declarations.
- Repo-wide `pnpm typecheck` stays green (proves nothing already depending on the previously
  empty `@atlas/domain`/`@atlas/api-contracts` packages breaks).
- `pnpm lint`, `pnpm run format:check`, `pnpm test` all stay green.
- No test suite regression: `@atlas/web`'s test count is unchanged (162), confirming zero
  application code was touched.

## Evidence

Captured in the branch's commit message: typecheck/build/lint/format/test output at commit time.

## Rollback

`git checkout main` / delete the branch. These are brand-new files in packages nothing else yet
imports from in application code, so rollback has zero blast radius.

## Handoff

On Codex's return: Atlas Backend reviews these shapes as a starting proposal for `WPR-M2`'s real
typed-contracts work -- accept as-is, amend, or replace entirely. None of it is meant to survive
untouched; it exists so `WPR-M2` doesn't start from a blank page once Codex is back.

## Stop conditions

Stop immediately and report in the channel if: any forbidden file needs to change, any file
overlap with a Codex-owned path or the `WPR-M1` branch is discovered, or Codex Root returns and
objects to the scope, the shapes, or the approach.

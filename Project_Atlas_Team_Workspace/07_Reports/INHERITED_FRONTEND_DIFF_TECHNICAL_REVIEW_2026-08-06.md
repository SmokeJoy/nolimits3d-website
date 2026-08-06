# Inherited Frontend Diff - Technical Review

**Date:** 2026-08-06
**Reviewer:** Atlas TPM McClintock `019fd6e0-b1ea-75a0-963c-cbefd3a5f42b`
**Base:** `25170f0113ec6d4f5f519faf28c5c77734952e46`
**Verdict:** CHANGES REQUESTED
**Integration:** BLOCKED AND EXCLUDED

## Findings

### P1 - Product boundary

The inherited Claude diff introduces example products and prices, an interactive catalog and
cart, three intake forms, search, and a lantern configurator. The active Sprint 3 packet forbids
fake product grids and forms, while AD-011 forbids speculative product and pricing data.
`BLK-BASE-001` blocks production and does not authorize this implementation.

Required correction: either restore the governed honest placeholder states or approve a new
milestone, Blueprint slice, and exact Task Packets that intentionally supersede those boundaries.

### P1 - Privacy and mailto limits

The three intake forms place names, email addresses, and potentially sensitive project or
support descriptions into unbounded `mailto:` URIs. The diff has no contextual privacy notice,
length limit, failure path, or fallback for rejected or truncated URIs.

Required correction: obtain an explicit privacy decision. If `mailto:` intake is retained, bound
and minimize fields, disclose processing at collection time, handle failure, and test long and
hostile input.

### P1 - Cart persistence

The cart provider wraps every application route, accepts malformed persisted lines, and writes
to `localStorage` without a failure boundary. Negative, fractional, duplicate, unknown, or
unwritable state can therefore break the application shell.

Required correction: validate and normalize persisted state, constrain quantities and product
IDs, deduplicate entries, and degrade to memory-only operation if browser storage is unavailable.

### P2 - Accessibility and test coverage

- Search places the dynamic result tree inside `aria-live="polite"`, which may announce the
  complete result list on every keystroke.
- Form validation errors remain stale after users correct fields and no error summary or focus
  transfer is provided.
- Tests do not cover corrupted or denied storage, quantity boundaries, complete configurator
  flow, search announcements, `mailto:` failure/length limits, or cart checkout behavior.

### P2 - Commit contamination

- `.claude/launch.json` is Claude tooling configuration and is excluded from product commits.
- `apps/web/.verify-supabase-live.mjs` is an ad-hoc Backend/evidence probe and is excluded.
- All inherited application files remain unstaged and were excluded from the Jarvis and Vitest
  stability commits.

## Verified Boundaries

- No Jarvis application implementation was found.
- PrintFlow remains `Coming Soon` and its unlinked-route assertions remain intact.
- Two serial web-suite runs on the inherited worktree passed 162/162, but green tests do not
  override the product, privacy, or persistence blockers.
- No application file from this rejected diff was committed, pushed, merged, or deployed.

## Next Gate

Codex Root must first approve the parent milestone and Blueprint slice. Atlas TPM must then issue
disjoint Task Packets for commerce, privacy/intake, and search accessibility. Implementer
handoffs require a new independent Technical Review against a stable snapshot.

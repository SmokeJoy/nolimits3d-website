# Architect Directive AD-011 — Engineering Decision Authority, Supabase Client Plumbing, E2E Framework

> **Directive ID:** AD-011
> **Milestone:** M-003 (technical hardening, cross-cutting)
> **Owner:** Claude Code — Chief Architect & CTO (delegated per `AD-008`, countersigned per `AD-009`)
> **Date:** 2026-08-06
> **Status:** BINDING
> **Authority:** Andrea — Product Owner, direct instruction

## 1. The delegation

Andrea, asked directly whether he wanted to weigh in on the Supabase/backend and E2E-framework
decisions this directive resolves, replied in a Claude Code CLI session, verbatim:

> "Io sul codice non metto bocca, pensateci voi."

and, when asked to confirm the scope of that statement:

> "conferma esplicita che le decisioni tecniche (Supabase/backend, framework di test E2E,
> dipendenze npm necessarie, e qualunque altra scelta ingegneristica) sono deleghe piene a te
> come architetto. Non fermarti più ad aspettare il suo ok su questo genere di decisioni: valuta
> tu rischi/benefici ... e scegli l'opzione tecnicamente più sensata, documentando la scelta e
> il perché nei documenti di continuità. Le uniche cose su cui devi ancora aspettare lui sono:
> dati di business reali (prodotti, prezzi, materiali per il catalogo) e qualunque vincolo
> commerciale/di prodotto che non puoi dedurre dal codice."

**Effect:** engineering/technical decisions (stack choices, tooling, npm dependencies,
architecture within already-approved boundaries) no longer require a live check-in before
acting — this directive itself is the record `CLAUDE.md` §1 requires instead of treating the
chat instruction alone as authority. The exclusion is explicit and unchanged: real business
data (products, pricing, materials) and product/commercial constraints not derivable from
code or the Documentation Bible still stop and wait for Andrea. Every boundary `AD-008`/`AD-009`
already fixed (Jarvis private, PrintFlow Coming Soon, `apps/legacy-web` untouched, production
blocked by `BLK-BASE-001`) is unaffected.

## 2. Decision: Supabase — client plumbing now, schema/auth UI deferred

**Investigated before deciding, not assumed:** `supabase/` already has a working local CLI
scaffold from M-001 (`config.toml`, pinned CLI in `pnpm-lock.yaml`, `pnpm supabase:*` scripts) —
its own README states migrations/functions/seed "remain empty until a later approved task
introduces governed content." Docker is available on this machine (`docker --version` succeeds).
No `@supabase/supabase-js` client library is installed anywhere; `apps/web` has zero Supabase
wiring.

**Decision:** add the generic client SDK plumbing — `@supabase/supabase-js`, a typed client
singleton, environment handling for the `VITE_SUPABASE_URL`/`VITE_SUPABASE_PUBLISHABLE_KEY`
variables already scaffolded in `.env.example` since M-001, verified against the real local
stack (not assumed to work). **Do not** write any table migration, RLS policy, or auth UI/flow
in this pass.

**Why this split, not "build the whole backend now" or "wait entirely":** the client plumbing
(how the app talks to *any* Supabase project) is genuinely business-data-independent — it looks
identical regardless of what a "product" record ends up containing. A schema for Catalog or an
account model for auth is not: guessing field names, auth providers, or RBAC roles ahead of
real requirements is exactly the speculative-rework risk flagged when this was first raised
with Andrea, and building it now would very likely need to be redone once real requirements
(from Andrea, or from the first feature that actually needs a table) arrive. Shipping the
plumbing without the schema leaves nothing to redo — the connection code doesn't change when
a table gets added.

## 3. Decision: E2E test framework — Playwright, scoped to what manual verification already proved valuable

**Reasoning:** this session found four real bugs (`require("react")` bundler crash, an
`axe-core` CI-resolution risk, a missing `body` background/color-scheme regression, four dead
navigation links) exclusively through live browser verification — a real page load, a real
`prefers-color-scheme` emulation, a real rendered click-through — none of which `jsdom`-based
unit/component tests could have caught (confirmed empirically each time, not assumed: jsdom
cannot render CSS or color at all). That verification was manual and depends on remembering to
do it. Automating exactly that class of check removes the dependency on memory and makes it run
on every PR instead of once, by hand, when something felt uncertain.

**Framework choice: Playwright**, not Cypress or another alternative. Actively maintained,
first-class TypeScript support, real multi-engine rendering (Chromium/Firefox/WebKit) matching
what this session's manual checks already used, and a well-established GitHub Actions
integration pattern that fits this repo's existing single-workflow CI structure.

**Initial scope, deliberately narrow:** a baseline suite covering the exact regression classes
already proven to matter — zero console errors on key routes, the dark-theme/color-scheme
consistency regression (`prefers-color-scheme: light` no longer producing illegible content),
and navigation links resolving to real pages in a real rendered browser, not just `jsdom`'s
router simulation. Broader E2E coverage (full user journeys, visual regression) is left for
when there are real user journeys to cover — Catalog, Account, Preventivo don't exist as
working features yet.

## 4. What this directive does not authorize

No production Supabase project, no `supabase link`/`db push`/`functions deploy`, no real
credentials, no auth flow, no domain schema, no product/pricing data anywhere, no visual design
decisions beyond what's already approved (`M002-PRIMITIVE-INVENTORY.md`, the M-003 wireframe
specs). Any of those still stop and escalate to Andrea if they come up.

## 5. Traceability

- `001_SESSION_HANDOFF.md` — session record of the verbatim delegation.
- Implementation PRs following this directive reference it directly in their commit messages.

# Session Handoff

*Operational continuity note. Non-authoritative.*

## Current Handoff - 2026-08-06

Andrea, in a Claude Code CLI session, gave full engineering delegation:

> "Io sul codice non metto bocca, pensateci voi." -- confirmed to cover Supabase/backend,
> E2E framework, any needed npm dependencies, and any other engineering choice, with the
> explicit instruction not to wait for a check-in on this class of decision anymore. The only
> remaining wait conditions: real business data for the catalog, and product/commercial
> constraints not derivable from code.

Recorded as `AD-011_ENGINEERING_DECISION_AUTHORITY_SUPABASE_AND_E2E.md`, which also decides
and reasons through the two specific questions this unblocked:

- **Supabase:** add `@supabase/supabase-js` client plumbing (`apps/web/src/lib/supabase/client.ts`,
  a lazy singleton reading `VITE_SUPABASE_URL`/`VITE_SUPABASE_PUBLISHABLE_KEY`, the two vars
  already scaffolded in `.env.example` since M-001) with no schema, migration, RLS policy, or
  auth UI -- those need real product specifics that stay Andrea's call. Covered by
  `src/test/supabase-client.test.ts` (env-var contract, singleton behaviour, mocked -- no
  network). `getSupabaseClient()` has no caller yet; it is plumbing for a future feature to
  use, not a feature itself.
- **E2E:** Playwright, scoped narrowly to the exact regression classes live browser
  verification caught by hand this session and `jsdom` cannot (`AD-011` section 3): zero
  console/page errors, the `prefers-color-scheme` background regression, and nav links
  resolving to a real page in a real rendered browser against the actual production build
  (`apps/web/playwright.config.ts`, `apps/web/e2e/*.spec.ts`). Verified working end-to-end
  locally (57/57 passing against a real `vite build` + `vite preview`), and the
  `color-scheme.spec.ts` regression check was sanity-tested by temporarily reverting the
  `body` background fix and confirming it fails loudly (`rgba(0, 0, 0, 0)` instead of the
  expected dark-palette color) before reverting back -- same discipline applied earlier this
  session to the contrast-audit script. Wired into CI as a new step after `Test`.

**Two real environment bugs found and fixed while doing this, neither a code defect:**
this machine's pnpm is configured with `node-linker=hoisted` (a pre-existing local/global
config, not anything in this repo), and its `node_modules` had drifted out of sync with
`pnpm-lock.yaml` -- `@supabase/functions-js`'s own declared `tslib` dependency was resolving
to nothing, failing every test that imported the Supabase client. A clean
`rm -rf node_modules && pnpm install` fixed it; the lockfile itself was correct throughout, so
this does not affect CI's from-scratch install. Separately, `vite preview` on this machine
binds to the IPv6 loopback (`::1`) only, not `127.0.0.1` -- Playwright's `webServer` health
check against `127.0.0.1` timed out even though the server was up and serving; fixed by
pointing Playwright at `localhost` instead, which resolves correctly either way.

**Docker/local Supabase stack:** Docker Desktop was not running at the start of this work;
starting it and `pnpm supabase:start` were both attempted, but the daemon took longer to
become ready than this session had time to wait on. The client code itself is verified by its
own unit tests (mocked env, real `createClient()` call, singleton behaviour) and by the fact
that nothing in the app calls it yet, so nothing depends on live connectivity being proven
today. Live-stack verification (an actual `getSupabaseClient()` call reaching a running local
Supabase instance) remains a real gap against `AD-011`'s own stated verification bar and is
the first thing to do the next time this environment's Docker Desktop is confirmed running --
not a blocker for anything currently shipped, since no feature reads or writes through this
client yet.

**PR #20 merged** (`8f492a8`): the AD-011 work above. CI caught a real gap in my own local verification -- I'd edited `apps/web/vite.config.ts` (added a `vitest/config` import for the `e2e/**` exclude) after my last local `pnpm lint` pass and never reran it; the edit made the file's existing `/// <reference types="vitest/config" />` redundant, tripping `@typescript-eslint/triple-slash-reference` in CI. Reproduced locally, fixed by deleting the now-redundant triple-slash line, reran the full gate battery from scratch before pushing the fix. Lesson: rerun the *entire* gate battery after the *last* edit, not after each incremental change.

**Roadmap survey (2026-08-06, 3-agent workflow against the Master Development Roadmap + actual repo state):** of 16 remaining epics, only `E-0001` (documentation governance/RTM/ADR automation, partly done via `scope-guard.mjs`/`governance:codex-native`) and `E-0013` (Security/Privacy/Engineering Ops) are genuinely safe, unblocked technical work. `E-0003`/`E-0004` (design system, public web) are done-or-superseded by M-002/M-003. Everything else is blocked either by real business data (Catalog, Lantern Configurator, Events, Phase 1 Launch) or by business-process-shape decisions that can't be safely inferred from code (auth/RBAC, Lead/Quote intake, Printer Assistance, Newsletter/CRM, Command Center, Jarvis, STL automation, PrintFlow) -- treating those with the same caution as the Supabase schema deferral even under Andrea's full delegation, since guessing a business's role/permission/process model carries the same speculative-rework risk, just with higher stakes.

**PR #21 merged** (`862694a`): `E-0013` security-header hardening -- `apps/web` had zero HTTP security headers, confirmed by grep before starting. Added a build-time Vite plugin injecting `Content-Security-Policy` and `Referrer-Policy` `<meta>` tags (host-agnostic; `Permissions-Policy`/`X-Frame-Options`/HSTS need real HTTP headers, left for when an actual Vercel project is linked -- `ADR-0013` accepts Vercel but nothing is deployed yet). Live-browser verification against the real production build found a real bug a source grep missed entirely: `sonner` (the library behind `@atlas/ui`'s Toast primitive) injects its own `<style>` block into `<head>` at runtime, which a strict `style-src 'self'` blocked -- confirmed via Playwright DOM inspection (`document.styleSheets` throwing on the sonner sheet), not guessed. Fixed by allowing `'unsafe-inline'` on `style-src` only, keeping `script-src` fully strict. Sanity-checked that the existing `console-errors.spec.ts` E2E suite already catches this regression class (CSP violations log as `console.error`) by temporarily reverting the fix and watching all 28 route tests fail, then reverting back -- no new E2E spec needed.

**Docker Desktop diagnosed, not yet fixed:** the live-connectivity gap against the local Supabase stack (noted above) is now explained -- the user shared the actual Docker Desktop crash dialog. Root cause: Docker Desktop's "Inference manager" (the built-in "Docker Model Runner" AI feature) fails to create its `dockerInference` named-pipe socket on this machine ("The filename, directory name, or volume label syntax is incorrect") and Docker Desktop closes entirely instead of falling back, so the main container engine never starts. Suggested fix (Settings → Beta features → disable "Docker Model Runner", not "Reset to factory defaults") given to the user; not yet confirmed applied. Live `getSupabaseClient()` verification against a real local instance stays the one open item from `AD-011`'s own verification bar.

**PR #22 merged** (`faf0e4b`): another `E-0013` gap closed -- `apps/web` had no automated check against the initial-payload performance budgets already approved in `05_Performance_Plan.md` §4 (JS ≤ 180 KB gzip, CSS ≤ 60 KB gzip). `scripts/guards/performance-budget-guard.mjs` measures what the real built `index.html` directly references (excluding lazy route chunks by design), gzips it the way a server would, and fails CI if either budget is exceeded -- current real build: 103.1 KB JS / 6.4 KB CSS gzip, comfortably under both. Wired into CI right after Build. This, plus the security-header PR, exhausts the clearly-safe, immediately-buildable slice of `E-0013`: everything left in that epic (deploy pipeline, feature flags/rollback, backup/disaster drills, alerting) needs a real Vercel/Supabase project linked first, which doesn't exist yet (`BLK-BASE-001`), so building it now would be the same speculative-rework risk already flagged for the Supabase schema.

**Total this round (2026-08-06, post-M-003):** 3 PRs merged (`#20` AD-011/Supabase-plumbing/Playwright, `#21` CSP/Referrer-Policy headers, `#22` performance budget guard), all independently verified (full local gate battery + live browser checks, including two sanity-checks that deliberately reverted a fix to confirm the regression test actually catches it before reverting back) before merge.

**Docker fixed by the user; AD-011's last open gap closed same day.** After the "Docker Model Runner" diagnosis above, Docker Desktop came back up ("Engine running"). Found a real, unrelated Supabase project (`PrintFlow3D_App`, not this repo's `nolimits3d-local`) already occupying the standard local ports -- did not touch its containers. Instead ran this project's own stack on temporary +1000 ports (55321-55329), verified end to end, then fully reverted: `pnpm supabase:stop`, `supabase/config.toml` restored from a backup taken before the edit (confirmed zero git diff after). `getSupabaseClient()` (`AD-011`) got a real HTTP round-trip from the live local instance -- `401 PGRST301 "No suitable key or wrong key type"` from PostgREST, using a syntactically-valid placeholder JWT. That 401 is the *correct* result, not a failure: `[auth]` is intentionally `enabled = false` in this project's own `config.toml` (an M-001 scaffold decision consistent with `AD-011`'s own deferral of real auth), so no publishable key was ever minted for this instance -- the network path, client construction, and URL handling are what needed proving, and they now are. This was the one item `AD-011` itself flagged as unverified; it no longer is.

## Prior Handoff - 2026-08-05 (later same day)

After PR #11 (live browser-verified fix for the `require("react")` crash) merged, Andrea
gave two direct instructions in a Claude Code CLI session, verbatim:

> "non ti fermare fino a quando la codebase non è pronta o hai per forza bisogno di me per
> dati reali del sito al codice ci pensate il team claude e il team codex alternandovi al
> momento dell'esaurimento dell'utilizzo del piano di abbonamento che ho"

and, after being told the current governance state gates further implementation on a
Codex-Root-led planning step:

> "no tu sei l'architetto e fai le veci di codecx a lavoro voglio tutta la web app"

**Effect, recorded plainly, not overriding the M0R record below:** for as long as a Codex
session isn't actively working, Claude Code acts as architect and lead implementer,
continuing execution rather than waiting on a Codex-Root-issued Task Packet. This does not
retire `AD-010` or the Codex-native Framework v2.0.0 as artefacts — both stay as accurate
history of what was built and accepted — and it does not touch the boundaries either
governance line already agreed on: Jarvis private, PrintFlow `Coming Soon`, `apps/legacy-web`
untouched, production blocked by `BLK-BASE-001`. If a Codex session resumes concurrently,
both sessions writing the same branches/files at once is a real risk (already observed once
this session) and needs the same live check-in before either side keeps going.

**Scope of "voglio tutta la web app":** the remaining Documentation Bible roadmap is large —
roughly 13 more epics beyond what M-001/M-002 cover (Public Web & Content, Catalog, Lead/Quote
intake, Lantern 3D Configurator, Events, Printer Assistance, Newsletter/CRM, Command Center,
Jarvis, STL automation, PrintFlow). This handoff does not claim it will be delivered in one
session; it records the standing direction to keep building it, milestone by milestone,
without pausing for confirmation between waves.

**M-003 Sprint 1-3 delivered same session** (PR #12, #13, #14, all merged): global navigation,
footer, ten-section homepage, and every destination page the sitemap (`DOC-UX-001`) links to —
the site's full navigation graph is now real, zero dead links except the intentionally private
`command` route. Two real regressions found only by live browser verification, not by the
automated suite (see PR #11, #12 commit messages): a bundler CJS-interop crash, and `@atlas/ui`'s
stylesheet never being imported into `apps/web`. Content is honestly placeholder-marked
throughout (no invented pricing, testimonials, bio, or photos); five future-transactional pages
(Catalogo, Richiedi-progetto, Preventivo, Configuratore, Assistenza) explicitly avoid rendering
any form/input/product-price UI with no backend behind it.

**Real blocker for the next milestone:** Catalog & Product Discovery (`E-0005`) needs actual
business data — product/service list, real pricing, materials, categories — that only Andrea
can supply. This is the "dati reali del sito" condition from his own standing instruction above;
implementation of the commerce backend should not proceed by inventing that data.

**Andrea, same session:** "Andrea non ha ancora fornito i dati reali per il catalogo. Nel
frattempo prosegui in autonomia su tutto ciò che non dipende da quei dati (altre pagine,
hardening, performance, accessibilità, test, qualunque lavoro tecnico della roadmap non
bloccato). Appena arrivano i dati del catalogo te li giro io." — standing direction to keep
working unblocked technical work while catalog data is pending, verbatim.

**M-003 Sprint 4 + structured data delivered same session** (PR #15, #16, merged): axe-core
accessibility coverage added for every `apps/web` route (26 checks; 6 real `heading-order`
violations found and fixed; a genuinely broken skip link found and fixed — `<main>` had no
`tabindex`, so activating it scrolled the viewport but never moved keyboard focus); public
routes code-split via `lazy()`; `robots.txt` + build-time `sitemap.xml` (single source of
truth: `navigation.ts`) + per-page `<title>`; `LocalBusiness` JSON-LD reused verbatim from
`apps/legacy-web`'s own live block (real, already-published facts, not invented). `TSEO-F-001`
(server rendering) recorded as a known, deliberately deferred gap — `ADR-0018` defers that
formal Next.js-vs-Vite comparison to a gate before the Frozen Baseline, not before ongoing
feature work, so it was not solved here.

**Two more real bugs found by review, not by the task packets that shipped them:** `/servizi`,
`/nolimits3d` and `/carrello` were linked from `GlobalNav`/`Footer` since Sprint 1-2 with no
route ever registered — confirmed 404s, fixed with `ServiziPage`/`Nolimits3DPage`/`CarrelloPage`.
`axe-core` resolved locally only because of a machine-level (non-repo) `node-linker=hoisted`
pnpm config, not because of anything committed — the same class of bug as the `rolldown`
dependency issue earlier in this session; declared as an explicit `apps/web` devDependency
instead of trusting the local resolution. Both caught before merge, not after a CI failure.

**Current state:** `main` has a fully real, navigable public site (every link resolves, WCAG
2.2 AA axe-clean, code-split, basic technical SEO in place) with zero fabricated business
content. Next real milestone (Catalog/commerce backend) is blocked on data only Andrea can
supply.

**Andrea, same session, again:** "Ancora nessun dato del catalogo da Andrea. Continua in
autonomia su altro lavoro tecnico non bloccato dai dati di business (hardening, performance
ulteriore, test, qualità del codice, documentazione tecnica, qualunque voce della roadmap non
dipendente dal catalogo). Non restare ferma in attesa." — standing direction confirmed twice.

**Extended hardening pass, same session** (PR #17, #18, merged): a live `prefers-color-scheme`
browser check found a real, serious bug that four sprints of otherwise-thorough browser
verification had missed -- `body` had no explicit background/text-color rule, so the page fell
through to the *browser's own* UA default (which follows the visitor's OS/browser preference),
not `@atlas/ui`'s theme tokens (dark is the unconditional default here, no
`prefers-color-scheme` gating). On this machine's dark-mode browser it looked fine; emulating
light mode and screenshotting the result showed genuinely illegible white-on-white content
across most of the site. Fixed by setting the tokens explicitly on `body`.

A new regression test (`nav-links-resolve.test.tsx`) then rendered the real router at every
`GlobalNav`/`Footer` href and found a **fourth** dead link beyond the three found by manual
review earlier (`/servizi`, `/nolimits3d`, `/carrello`): `/ricerca` had no route either. Fixed
the same way (`FutureFeatureNotice` pattern). A corrected full-site color-contrast audit (the
first attempt had a bug in the audit script itself, caught before trusting its output) found
zero further violations after the background fix.

**Pattern worth naming for whoever picks this up next:** four real bugs across this session
(`require("react")` crash, `axe-core` CI-resolution risk, the missing `body` background, four
dead nav links) were all found by *live verification* -- a real browser, a real color-scheme
emulation, a real router rendering every link -- not by the automated test suites that shipped
alongside the code that had the bug. Keep doing both; neither one alone would have caught all
four.

**Total this session:** 18 PRs merged (#6-#18 plus the earlier M-002 work), all independently
verified before merge, all with real gate battery + live browser evidence, zero fabricated
business content anywhere in the codebase.

## Prior Handoff - 2026-08-05 (M0R, historical)

- **Authority:** Andrea accepted M0R v2.0.0 and authorized closure and merge of PR #10.
- **Branch:** `codex/m0r-team-reconfiguration`.
- **Role:** Atlas TPM; coordination, governance integration and Technical Review only.
- **Current Gate:** M0R - DONE / PRODUCT OWNER ACCEPTED / MERGE AUTHORIZED.
- **Production code:** not authorized in this handoff.
- **Documentation Bible:** immutable; no write is authorized below
  `NoLimits3D_Documentation_v0.96/`.

## Integrated by Atlas TPM

- root governance in `AGENTS.md` and the Claude compatibility bridge;
- Atlas TPM custom-agent definition;
- AD-010, M0R charter and Role Boundary Test specification;
- Development Framework v2.0.0 derived from immutable v1;
- four TPM-owned operational skills initialized with the official skill scaffold;
- active state, registers, handoff and root allowlist migration;
- removal of the five superseded `.claude/agents/*.md` definitions from the active path.

## Child Execution Status

The initial Atlas TPM subagent exposed no supported multi-agent tools. Codex Root therefore
launched Atlas Frontend and Atlas Backend directly for bootstrap. This is recorded as
`DEV-M0R-001`; it does not satisfy RBT-02 or alter the canonical delegation chain.

The disjoint implementer outputs were handed off, statically validated, and integrated
without the TPM editing their owned files.

A later fresh Desktop runtime demonstrated the canonical nested chain with IDs
`/root/atlas_tpm`, `/root/atlas_tpm/atlas_frontend`, and
`/root/atlas_tpm/atlas_backend`. RBT-01..07 passed with zero writes. The wrapper exit 1
caused by stderr warnings and policy-declined read probes is documented in the Technical
Review and does not conceal the underlying `turn.completed` PASS result.

## Closure And Next Gate

1. Andrea's Product Owner acceptance is recorded in
   `Project_Atlas_Team_Workspace/08_Approvals/M0R_PRODUCT_OWNER_ACCEPTANCE_2026-08-05.md`.
2. Atlas Backend owns the post-acceptance validator update; Atlas TPM owns state,
   integration evidence and closure Technical Review; Codex Root owns final Architect
   closure review.
3. Canonical TPM-to-Backend delegation created only `/root/atlas_backend`, but the runtime
   forced the nested children to read-only. `DEV-M0R-002` records Codex Root launching one
   top-level Backend worker solely as transport for the existing TPM Task Packet; Backend
   ownership and independent TPM review remained unchanged.
4. Atlas Backend delivered only `scripts/governance/codex_native_team_test.py`. Atlas TPM
   integrated state and evidence without editing that file.
5. Atlas TPM issued `M0R_POST_ACCEPTANCE_CLOSURE_TECHNICAL_REVIEW.md` with verdict
   `APPROVED FOR CLOSURE INTEGRATION`.
6. Codex Root issued `M0R_POST_ACCEPTANCE_CLOSURE_ARCHITECT_REVIEW.md` with verdict
   `APPROVED FOR SIGNED CLOSURE COMMIT AND MERGE AFTER GREEN CI`.
7. No commit, push, merge, deploy, or production action is claimed by this handoff.
   Blueprint 00 / M1 is the next planning gate only; implementation remains unauthorized.

Jarvis remains private, PrintFlow remains `Coming Soon`, and production remains blocked by
`BLK-BASE-001`.

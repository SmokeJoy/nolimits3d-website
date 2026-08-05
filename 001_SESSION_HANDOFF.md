# Session Handoff

*Operational continuity note. Non-authoritative.*

## Current Handoff - 2026-08-05 (later same day)

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

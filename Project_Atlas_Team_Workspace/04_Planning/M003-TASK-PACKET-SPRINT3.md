# Task Packet: M-003 Sprint 3 — Remaining Sitemap Pages (Esplora, Realizza, Blog, PrintFlow)

## TSK-M003-WEB-D3
* **Roadmap IDs**: `E-0004`, `E-0005` (landing/index level only, not full catalog/quote logic)
* **Branch**: `m003/remaining-sitemap-pages`
* **Owner**: Claude (acting architect + implementer)
* **Charter**: `Project_Atlas_Development_Blueprint_v0.1/01_Milestone_Charters/M-003_PUBLIC_WEB_FOUNDATION_CHARTER.md`
  (Sprint 3)

## Why this slice
After Sprint 1+2, every nav/footer link still 404ing is under `/esplora/*`, `/realizza/*`,
`/blog` and `/printflow`. This sprint closes every remaining 404 in the primary navigation so
the site's link graph is fully real. It does **not** build the catalog data model, quote
calculator, 3D configurator, cart, or checkout -- those need Supabase-backed data and are
separate, much larger milestones (`E-0005` Catalog & Product Discovery proper, `E-0006` Lead
& Quote Intake, `E-0007` Lantern Configurator in the Master Development Roadmap). This sprint
builds honest landing pages that explain what each destination will become.

## Allowed Files
- `apps/web/src/app/routes.tsx`
- `apps/web/src/routes/public/pages/**` (new page components; reuse `PageLayout`/
  `Breadcrumbs` from Sprint 2, don't duplicate them)
- `apps/web/src/test/**`

## Forbidden Files
Same as Sprint 1/2.

## Pages in scope
Per `DOC-UX-001`'s sitemap:
1. `/esplora` — section landing, explains the Catalogo / Realizzazioni / Ispirati distinction
   (`DOC-UX-001`'s own "Distinzioni tassonomiche" section has this verbatim — real text, not
   placeholder).
2. `/esplora/catalogo` — "C'è già qualcosa adatto a me?". This is explicitly a **future
   commerce surface**, not a placeholder-product grid pretending to be real inventory: state
   plainly that the catalog is not yet available, no fake products with fake prices. A
   `StatusIndicator` or similar saying so, structurally correct route, nothing invented.
3. `/esplora/ispirati` — discovery rail. Placeholder cards, same pattern as Realizzazioni.
4. `/esplora/arte-in-stampa-3d` — HueForge landing per wireframe section 5 ("Arte in stampa
   3D"): brief explanation placeholder, gallery placeholder, two CTAs (to configurator and to
   personal request) as placeholder labels per the Sprint 1 pattern already established in
   `ArtSection.tsx` — reuse or closely mirror that section's placeholder text rather than
   inventing new wording for the same unconfirmed content.
5. `/esplora/hueforge` — same content category as `arte-in-stampa-3d` per `DOC-UX-001`
   ("Una stessa entità può essere referenziata da più percorsi, ma non duplicata come
   contenuto divergente") — this route should not diverge in content from
   `/esplora/arte-in-stampa-3d`; either the same component under two routes, or a redirect.
   Pick one, document why in a comment.
6. `/realizza` — section landing, explains the four sub-intents.
7. `/realizza/richiedi-progetto` — like Catalogo: this is a **future intake form**, not
   something to fake with a non-functional form. State plainly that project requests aren't
   yet available online and point to the real contact channel (`/nolimits3d/contatti`,
   already real).
8. `/realizza/preventivo-stampa-3d` — same treatment: future quote calculator, not faked.
9. `/realizza/configuratore-lanterne` — same treatment: future 3D configurator, not faked.
10. `/realizza/assistenza-stampanti-3d` — same treatment: future support intake, not faked,
    point to real contact.
11. `/blog` — index landing, placeholder article list (no real posts exist yet).
12. `/printflow` — **binding product constraint, not a judgment call**: "Coming Soon" only,
    literally, per every governance document this session has touched (`AD-008` through
    `AD-010`, every charter). No feature description beyond that it exists and is not active.

## Placeholder / honesty policy — sharper than Sprint 1/2 for this batch
Sprint 1/2's policy was about unconfirmed *content* (copy, photos, testimonials). This
sprint's pages are mostly about unconfirmed *functionality* (a working catalog, a working
quote calculator, a working configurator). The equivalent rule: **never build UI that looks
interactive/functional (a search box, a price display, a submit button that appears to do
something) for a feature that has no backend behind it in this milestone.** A clearly labeled
"not yet available, here's how to reach us in the meantime" state is correct; a fake form or
fake product grid is not — it would mislead a real visitor into thinking they can transact.

## Exact deliverables
- 12 new routes (or 11 + 1 redirect, per item 5's decision) in `routes.tsx`.
- Page components, reusing `PageLayout`/`Breadcrumbs`.
- Tests: each route renders its heading + breadcrumb; a regression test that Catalogo,
  Richiedi-progetto, Preventivo, Configuratore and Assistenza all render a clear
  "not yet available" state rather than a fake interactive form (assert on presence of the
  honesty messaging / absence of `<form>`/`<input>` elements pretending to submit somewhere).

## Verification (mandatory)
Same discipline as Sprint 1/2: `pnpm --filter @atlas/web typecheck/test/build`, full
workspace gate battery, real browser check across all new routes at both desktop and mobile
width, console-error-free.

## Control & Operations
Same as Sprint 1/2.

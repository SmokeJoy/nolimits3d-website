# EV-01 -- `TSEO-F-001` SSR/prerendering gap (recorded, not resolved)

**Task**: `TSK-M003-WEB-D4` (M-003 Sprint 4 -- accessibility, performance, technical SEO)
**Date**: 2026-08-06

## The gap

`NoLimits3D_Documentation_v0.96/09_SEO_Content/05_Technical_SEO.md` (`DOC-SEO-005`) requires,
as a Must:

> `TSEO-F-001` | Pagine pubbliche principali sono server-rendered/prerendered e crawlable.

`apps/web` is a pure client-side SPA (Vite + React Router `createBrowserRouter`) and does not
satisfy this. It did not satisfy it before this sprint, and this sprint does not change that.

## Why this sprint doesn't fix it

`ADR-0018` defers the formal Next.js-vs-Vite comparison this requirement would resolve to a
gate *before the Frozen Baseline*, not before ongoing feature work -- Vite/React is the current
choice until that gate runs. Migrating frameworks, or bolting on a prerendering tool
(react-snap, vite-plugin-ssr, etc.), is an architecture decision on the scale of that gate, not
"hardening," and the `TSK-M003-WEB-D4` task packet explicitly places it out of scope: "This
sprint does not fix that... Migrating frameworks, or bolting on a prerendering tool, is an
architecture decision on the scale of that gate, not 'hardening,' and is out of scope here."

The `05_Technical_SEO.md` document's own "Review Gate evidence" block already anticipates this:
a comparable React/Vite vs Next.js prototype across homepage, catalog and editorial content,
measured for initial HTML, crawlability, metadata, cache/CDN, bundle, hydration and CWV, with a
final decision via an ADR that accepts or supersedes `ADR-0018`. That work has not happened yet
and is not part of this task packet.

## What this sprint did instead (the technical-SEO work that doesn't need SSR first)

- `apps/web/public/robots.txt`: allows public crawling, disallows `/account` and `/command`
  (`TSEO-F-005`).
- Build-time `apps/web/scripts/generate-sitemap.ts` + a `vite.config.ts` `closeBundle` plugin:
  regenerates `sitemap.xml` from `navigation.ts` on every `vite build`, listing only real,
  canonical routes (`TSEO-F-003`).
- Per-page `<title>` via `apps/web/src/routes/public/useDocumentTitle.ts`, reusing
  `pageMeta.ts`'s existing `getPageTitle`.

None of this requires server rendering; all of it is real, working infrastructure a crawler can
already use today, independent of whether the HTML that first reaches the client is
server-rendered or hydrated client-side.

## A related, narrower finding: `index.html`'s site-wide `noindex`

`apps/web/index.html` carries `<meta name="robots" content="noindex">` (present before this
sprint, unchanged by it). This means: even though `robots.txt` now permits crawling and
`sitemap.xml` lists real URLs, every page still tells a compliant crawler not to index it.
This is treated as *correct*, not a bug to silently patch: production remains blocked by
`BLK-BASE-001` (`AGENTS.md`, `CLAUDE.md`), and shipping a permissive index policy on a
site that isn't approved for production would be a product decision, not a technical-SEO
hardening one. Crawling (`robots.txt`) and indexing (`<meta name="robots">`) are independent
controls; this sprint fixes the crawling side and leaves the indexing gate exactly where the
production block already puts it. Flipping the `noindex` meta tag is a follow-up for whoever
lifts `BLK-BASE-001`, not this task.

## A related, narrower finding: `/servizi` and `/nolimits3d` are dead links

While building the sitemap generator (`TSEO-F-003`: "sitemap contiene solo URL canonici
pubblicati"), a pre-existing gap surfaced: `navigation.ts`'s `primaryNavSections` and
`footerSitemapSections` link `GlobalNav` and `Footer` to `/servizi` and `/nolimits3d` as
section-heading destinations, but `apps/web/src/app/routes.tsx` never registers a route for
either bare path -- only their child leaf pages are wired up (Sprint 2, `TSK-M003-WEB-D2`,
built eleven leaf pages under those two sections without a section index route, unlike
`Esplora`/`Realizza` in Sprint 3, `TSK-M003-WEB-D3`, which got a dedicated `SectionLandingPage`
index route each). Visiting `/servizi` or `/nolimits3d` directly today falls through to the
catch-all `NotFound` route.

This is **not** a WCAG/keyboard-accessibility violation: the links are real `<a href>`
elements, keyboard-reachable, and land on an accessible (axe-clean) 404 page -- confirmed by
this sprint's `apps/web/src/test/a11y-axe.test.tsx` and `keyboard-reachability.test.tsx`. It is
a content/IA gap: a real visitor following "Servizi" or "NoLimits3D" from the header or footer
lands on "Pagina non trovata" instead of a section overview.

**Not fixed here**: the task packet's Allowed Files are explicit -- "existing pages; no new
destination pages in this sprint" -- and building a `ServiziPage`/`NoLimits3DPage` section
landing (the obvious fix, mirroring `EsploraPage`/`RealizzaPage`) would be exactly that. This
finding is recorded so it isn't silently carried forward; `apps/web/scripts/generate-sitemap.ts`
excludes both bare paths from the sitemap for the same reason (`TSEO-F-003`), with the full
reasoning inline in that file's comments and in `apps/web/src/test/sitemap.test.ts`'s coverage.

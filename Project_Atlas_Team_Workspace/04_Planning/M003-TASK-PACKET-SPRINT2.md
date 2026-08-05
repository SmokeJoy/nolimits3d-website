# Task Packet: M-003 Sprint 2 — Content Destination Pages

## TSK-M003-WEB-D2 (NoLimits3D, Servizi, Realizzazioni, Eventi pages)
* **Roadmap IDs**: `E-0004`, `F-0011` (Services and portfolio)
* **Branch**: `m003/content-pages`
* **Owner**: Claude (acting architect + implementer)
* **Charter**: `Project_Atlas_Development_Blueprint_v0.1/01_Milestone_Charters/M-003_PUBLIC_WEB_FOUNDATION_CHARTER.md`
  (Sprint 2 of the sprint plan it already anticipates)

## Why this slice, in this order
Sprint 1 shipped navigation linking to ~20 destinations that all 404. Prioritizing the
**informational, non-transactional** pages first: they need no backend, no payment/quote
logic, and no Supabase data model — pure content pages following the same placeholder
discipline as the homepage. Catalogo, Carrello, Preventivo and Configuratore are explicitly
OUT of scope here; they need real data models (later milestone, not a frontend-only task).

## Allowed Files
- `apps/web/src/app/routes.tsx` (add the new routes below)
- `apps/web/src/routes/public/pages/**` (new page components)
- `apps/web/src/routes/public/navigation.ts` (read-only reference; edit only if a route path
  needs correcting against `DOC-UX-001` — don't change labels)
- `apps/web/src/test/**` (new/updated tests)

## Forbidden Files
Same as Sprint 1: `apps/web/package.json`, `pnpm-lock.yaml`, `apps/legacy-web/**`,
`packages/ui/**`, `scripts/guards/**`, `apps/web/src/routes/command/**`,
`apps/web/src/routes/account/**`.

## Pages in scope (9), route, and source
All under `/nolimits3d/*`, `/servizi/*`, `/realizzazioni`, `/eventi` per `DOC-UX-001`'s
sitemap. Question-per-page from the same document's "Domanda per pagina" table — each page's
content should visibly answer that question (with placeholders where the real answer needs
Andrea).

1. `/nolimits3d/chi-siamo` — "Posso fidarmi?" — trust/about. Content is the same category
   `TrustSection` already placeholder'd on the homepage (Andrea's bio, photo, quality/pricing
   claims) — reuse that placeholder text verbatim here too, don't invent new wording for the
   same unconfirmed facts.
2. `/nolimits3d/metodo` — process/method. Reuse the "Come nasce il tuo progetto" timeline
   structure from `ProjectTimelineSection` (idea → analisi → progettazione → realizzazione →
   controllo → consegna) as the real structural backbone; expand each step's explanation as
   placeholder (the wireframe doesn't specify per-step copy).
3. `/nolimits3d/qualita` — quality control specifics. Placeholder (no source document
   specifies quality-control copy beyond "controllo qualità" in the wireframe).
4. `/nolimits3d/contatti` — "Come posso parlare direttamente con Andrea?" — this one is
   NOT mostly placeholder: reuse the real, verified contact details from
   `apps/web/src/routes/public/navigation.ts`'s `siteContact` (email, phone, address) — same
   source Sprint 1 already verified byte-for-byte against `apps/legacy-web`'s structured
   data. A contact form is out of scope (no backend); link `mailto:`/`tel:` directly.
5. `/servizi/stampa-3d`, `/servizi/progettazione-3d`, `/servizi/prototipazione`,
   `/servizi/ricambi-personalizzati`, `/servizi/piccole-serie` — five pages, "Possono
   realizzare quello che mi serve?". The IA's "Servizi" primary section already lists these
   five exact categories (verbatim: "stampa, modellazione, prototipazione, piccole serie,
   ricambi, assistenza") — use those as real page titles/intro category labels; detailed
   service descriptions are placeholder.
6. `/realizzazioni` — "Lo hanno già fatto o sanno affrontarlo?" — portfolio/case studies.
   Entirely placeholder content (real project photos/descriptions need Andrea), but build the
   real grid/list structure using `Card`.
7. `/eventi` — "Posso incontrare NoLimits3D dal vivo?" — per the wireframe's "Eventi e fiere"
   section: explicitly state the lab is private and not open to the public
   ("laboratorio operativo privato, non aperto al pubblico" — this is spec text, not a
   placeholder), event calendar itself is placeholder (no real event data available).

## Shared structural work (build once, reuse across all 9)
A `PageLayout`/`PageHeader` pattern (new file under `apps/web/src/routes/public/`) so every
content page has a consistent `<h1>`, and ideally a breadcrumb trail back through the sitemap
hierarchy (the IA doc requires breadcrumbs: "Link HTML reali, breadcrumb, search..."). Build
breadcrumbs from `navigation.ts`'s existing data, don't hardcode per page.

## Placeholder policy
Identical to Sprint 1 — re-read `M-003_PUBLIC_WEB_FOUNDATION_CHARTER.md`'s policy section
before writing content. Every factual/promotional claim is an explicit `[PLACEHOLDER: ...]`.

## Exact deliverables
- `apps/web/src/app/routes.tsx` updated with 9 new real routes (replacing what currently
  falls through to the catch-all `NotFound`).
- 9 page components + shared `PageLayout`/breadcrumb component.
- Tests: each new route renders its expected `<h1>`/heading and breadcrumb trail; a
  regression test that all 9 links from `GlobalNav`/`Footer` that used to 404 now resolve to
  a real, distinct page (not all landing on the same component).

## Verification (mandatory, same discipline as Sprint 1)
- `pnpm --filter @atlas/web typecheck && pnpm --filter @atlas/web test && pnpm --filter @atlas/web build`
- Full workspace gate battery: build, lint, typecheck, test, format:check, guard:scope,
  guard:source-bindings.
- **Real browser check**: `pnpm --filter @atlas/web dev`, click/navigate through all 9 new
  routes (not just the homepage), confirm zero console errors on each, confirm breadcrumbs
  render, confirm mobile width (375px) doesn't overflow on any of them.
- List every placeholder shipped, per page, in the final report.

## Control & Operations
Same as Sprint 1: stop and report (don't improvise) on Forbidden Files, missing primitives,
or IA/wireframe contradictions. `git revert` for rollback, no hard resets.

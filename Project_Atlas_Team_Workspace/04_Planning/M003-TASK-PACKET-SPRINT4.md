# Task Packet: M-003 Sprint 4 — Accessibility, Performance & Technical SEO Hardening

## TSK-M003-WEB-D4
* **Roadmap IDs**: `F-0009` (Accessibility and performance), `E-0013` (Security, Privacy &
  Engineering Operations, SEO-adjacent slice)
* **Branch**: `m003/hardening`
* **Owner**: Claude (acting architect + implementer)
* **Authorization**: Andrea, direct instruction, 2026-08-06 — continue autonomously on
  everything not blocked on real catalog data: "altre pagine, hardening, performance,
  accessibilità, test, qualunque lavoro tecnico della roadmap non bloccato."

## Why this slice, and what it deliberately does NOT do
`NoLimits3D_Documentation_v0.96/09_SEO_Content/05_Technical_SEO.md` requires public pages to
be server-rendered/prerendered and crawlable (`TSEO-F-001`, Must). `apps/web` is a pure
client-side SPA today (Vite + React Router `createBrowserRouter`) and does not satisfy this.
**This sprint does not fix that.** `ADR-0018` explicitly defers the formal Next.js-vs-Vite
comparison this requirement would resolve to a gate *before the Frozen Baseline*, not before
ongoing feature work — Vite/React "è la scelta corrente" until that gate runs. Migrating
frameworks, or bolting on a prerendering tool, is an architecture decision on the scale of
that gate, not "hardening," and is out of scope here. This sprint records the gap as tracked,
not silently ignored, and does the real technical work that doesn't require resolving it
first: accessibility, bundle/performance, and the technical-SEO items that don't depend on
server rendering.

## Allowed Files
- `apps/web/src/app/routes.tsx` (convert eager route imports to lazy, add `handle` metadata
  if useful for meta tags)
- `apps/web/src/routes/public/**` (existing pages; no new destination pages in this sprint)
- `apps/web/src/test/**`
- `apps/web/public/**` (new: `robots.txt`, any static SEO assets)
- `apps/web/index.html` (base meta tags only)
- New: a lightweight sitemap-generation script under `apps/web/scripts/` or similar, if it's
  the cleanest way to keep `sitemap.xml` in sync with `navigation.ts` — don't hand-maintain a
  static file that duplicates data already in `navigation.ts`

## Forbidden Files
`apps/web/package.json`, `pnpm-lock.yaml` (a new dependency for meta-tag management or
sitemap generation needs a stop-and-report, same as every prior sprint — check what's
achievable with what's already installed, e.g. `react-router`'s own `meta`/`handle` API and
plain Node `fs` for a build-time sitemap script, before concluding a new package is needed),
`apps/legacy-web/**`, `packages/ui/**`, `scripts/guards/**`.

## Exact deliverables

### 1. Accessibility (`DOC-UX-011`, WCAG 2.2 AA)
- Add `axe-core` automated accessibility tests for every route in `apps/web` (the pattern
  already exists in `packages/ui/tests/*.test.tsx` — reuse the same `axe()` + `toHaveNoViolations`
  approach, don't invent a new one). Every public route gets at least one "has no axe
  violations" test.
- Manually verify (via the real browser, not just axe, since axe catches maybe a third of
  real issues per its own known limits): keyboard-only navigation reaches every interactive
  element in `GlobalNav`, `Footer`, and the intent cards; focus is visible; skip-link (already
  built in `AppShell.tsx`) actually moves focus to `#main-content` on activation, test this
  specifically since it's easy to build a skip-link that's present but non-functional.
- Fix whatever axe/keyboard issues turn up. Report every fix.

### 2. Performance (`DOC-SEC-005`, budget: JS initial ≤ 180 KB gzip per public page)
- Convert the public segment's route `element` imports to `lazy()` (React Router's `lazy`
  loader, already the exact pattern `account` and `command` use in this same file) so each
  destination page code-splits instead of every page shipping in one eager bundle. `PublicHome`
  can stay eager (first paint). Measure and report the gzip size of the initial bundle before
  and after -- this is the actual acceptance criterion, not "I added lazy() so it must be
  better."
- Check for any obviously avoidable render-blocking work (e.g., accidental full imports where
  a named import would tree-shake).

### 3. Technical SEO (`DOC-SEO-005`) — the parts that don't need SSR
- `apps/web/public/robots.txt`: allow public routes, disallow `/account`, `/command`.
- Build-time `sitemap.xml` generation listing every real public route from `navigation.ts`
  (single source of truth -- don't hand-write a URL list that can drift). `/command` and
  `/account` excluded (`TSEO-F-005`: "admin/customer non generano index bloat"). `/printflow`
  excluded too -- it's deliberately unlinked from navigation for the same Coming-Soon reason,
  keep it out of the sitemap as well.
- Per-page `<title>` via React Router's route `handle`/a small hook reading `pageMeta.ts`'s
  existing title data -- reuse it, don't duplicate page titles in a second place. No new meta
  *description* copy: that's exactly the kind of business-facing content this session's own
  placeholder policy already governs, and Andrea hasn't supplied it -- leave a
  `[PLACEHOLDER: meta description]` comment or a deliberately absent tag rather than inventing
  SEO copy.
- Document the `TSEO-F-001` (SSR/prerendering) gap explicitly in a short note in the M-003
  charter or a new evidence file -- don't silently leave it unrecorded.

## Verification (mandatory, same discipline as every prior sprint)
- `pnpm --filter @atlas/web typecheck && test && build`
- Full workspace gate battery: build, lint, typecheck, test, format:check, guard:scope,
  guard:source-bindings
- Real browser check: confirm lazy-loaded routes actually load (network tab / no blank
  screens), confirm the skip link, confirm robots.txt/sitemap.xml are served correctly from a
  built preview, not just present as source files.
- Report exact before/after bundle gzip size for the performance claim, and the exact count of
  axe violations found/fixed.

## Control & Operations
Same as every prior sprint: stop and report (don't improvise) on Forbidden Files, a felt need
for SSR/prerendering tooling, or a felt need for a new dependency. `git revert` for rollback.

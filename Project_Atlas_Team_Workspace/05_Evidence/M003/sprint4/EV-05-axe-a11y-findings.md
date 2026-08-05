# EV-05 -- Accessibility findings (`TSK-M003-WEB-D4` deliverable 1, `DOC-UX-011`, WCAG 2.2 AA)

## Automated: axe-core, every public route + account/command/not-found

New suite: `apps/web/src/test/a11y-axe.test.tsx`, reusing the exact pattern already
established in `packages/ui/tests/*.test.tsx` (`import axe from 'axe-core'` + a local
`expectNoA11yViolations` helper using `axe.run(node, { rules: { 'color-contrast': { enabled:
false } } })` -- `color-contrast` is disabled for the same reason `packages/ui` disables it:
jsdom has no real paint engine and the check produces only noise there). `axe-core` is a
devDependency of `@atlas/ui`, not `@atlas/web`; it resolves from `apps/web`'s tests because this
workspace installs with `node-linker=hoisted` (confirmed via `pnpm config get node-linker`).
`apps/web/package.json` is a Forbidden File for `TSK-M003-WEB-D4`, so it cannot be declared
there directly -- this is reuse of an already-installed workspace package, not a new
dependency, consistent with the task packet's instruction to check what's already possible
before adding anything.

Coverage: all 22 real public destination pages + the homepage (23 routes), plus `/account`,
`/command`, the `*` catch-all `NotFound`, and the `/esplora/hueforge` redirect target -- 26 test
cases total.

### Violations found: 6 (all `heading-order`, moderate impact, axe rule `heading-order`)

| Route | Element flagged | Cause |
|---|---|---|
| `/` (homepage) | `CardTitle` (`<h3>`) inside the 6 intent cards | Jumped straight from `<h1>` to `<h3>`, no `<h2>` between |
| `/realizzazioni` | `CardTitle` (`<h3>`) inside placeholder project cards | Same -- `<h1>` to `<h3>` |
| `/esplora` | `CardTitle` (`<h3>`) inside the sub-page nav cards | Same |
| `/esplora/ispirati` | `CardTitle` (`<h3>`) inside placeholder discovery cards | Same |
| `/realizza` | `CardTitle` (`<h3>`) inside the sub-page nav cards | Same |
| `/blog` | `CardTitle` (`<h3>`) inside placeholder article cards | Same |

Root cause: `@atlas/ui`'s `CardTitle` (`packages/ui/src/components/card.tsx`) hard-codes an
`<h3>` (`ComponentPropsWithoutRef<'h3'>`, no polymorphic level prop) -- `packages/ui/**` is a
Forbidden File for this task packet, so the fix has to live on the consuming side in
`apps/web`. The homepage's own `DiscoverySection.tsx` already had the correct pattern (a real
`<h2>` immediately before its own `CardTitle` grid) -- these six spots just hadn't followed it.

### Fixes (all in `apps/web`, no new copy invented)

- `apps/web/src/routes/public/home/HeroSection.tsx`: promoted the existing
  `<p className="home-section__question">Cosa vuoi realizzare oggi?</p>` to `<h2>` (same text,
  same class, same visual style -- only the tag changed).
- `apps/web/src/routes/public/pages/RealizzazioniPage.tsx`: same promotion for "Lo hanno già
  fatto o sanno affrontarlo?".
- `apps/web/src/routes/public/pages/BlogPage.tsx`: same promotion for "Hanno davvero
  competenza?".
- `apps/web/src/routes/public/pages/esplora/IspiratiPage.tsx`: promoted the existing
  `home-section__lede` paragraph (real text, reused verbatim from the homepage's
  `DiscoverySection`) to `<h2>`, same class.
- `apps/web/src/routes/public/pages/SectionLandingPage.tsx` (shared by `EsploraPage` and
  `RealizzaPage`): added one `<h2 className="home-section__question">Pagine di questa
  sezione</h2>` before the sub-page card grid -- structural UI-chrome text, not marketing copy
  (same register as the Footer's existing plain "Altro"/"Contatti" headings), added once here
  rather than per page since `EsploraPage`'s own content is a `<dl>` with no paragraph to
  promote instead.

All 26 axe tests pass after the fix (`0` violations). Re-run:
`npx vitest run src/test/a11y-axe.test.tsx` from `apps/web/`.

## Manual: skip link focus (`AppShell.tsx`)

**Found broken, exactly as the task packet warned it might be**: `<main id="main-content">`
had no `tabindex`. A plain `<main>` is not programmatically focusable, so the skip link
(`<a href="#main-content">`) scrolled the viewport to it (native same-document fragment
navigation) but never moved *keyboard focus* there -- a keyboard/screen-reader user activating
the skip link would still have had to tab through the entire header navigation again. Present,
but non-functional.

**Fix**: added `tabIndex={-1}` to `<main id="main-content">` in `AppShell.tsx` (the standard
WCAG technique -- `-1` keeps it out of the normal Tab order while making it a valid focus
target), plus a `#main-content:focus-visible` outline rule in `public-layout.css` (it had none;
without it, focus would land there invisibly).

**Verified twice**:

1. jsdom (`apps/web/src/test/keyboard-reachability.test.tsx`): confirms the structural
   precondition -- `tabindex="-1"` present, and calling `.focus()` on the element actually
   moves `document.activeElement` there. jsdom does not implement the browser's native
   fragment-navigation "focus fixup," so it cannot exercise a real click-then-focus-moves
   assertion (confirmed empirically: `fireEvent.click` on the skip link never changed
   `document.activeElement` in jsdom, before or after the fix).
2. **Real browser** (`vite` dev server + this session's browser tool, see
   `EV-06-browser-verification.md`): focused the skip link, activated it via a real DOM
   `.click()` (which, unlike a synthetic `dispatchEvent`, triggers the browser's actual default
   navigation action), and confirmed `document.activeElement` became `<main id="main-content">`
   with `location.hash === '#main-content'` and the new focus-visible outline computed and
   applied. This is the authoritative check per the task packet's own instruction to verify
   "via the real browser, not just axe."

## Manual: keyboard reachability, `GlobalNav` / `Footer` / intent cards

`apps/web/src/test/keyboard-reachability.test.tsx` asserts every interactive element in the
header (`banner` role), footer (`contentinfo` role) and the six homepage intent cards is a real,
unmodified native `<a href>` -- no `tabindex="-1"`, no ARIA role override stripping its link
semantics -- and that each one accepts `.focus()`. Native `<a href>` elements are inherently
keyboard-operable per the HTML spec once those two conditions hold, so this is a reliable proxy
for real Tab-key reachability without needing a `user-event`-style Tab simulation (not
installed anywhere in this workspace -- would have been a new dependency, so not added; see the
task's final report for the explicit "no new dependency needed" confirmation).

No elements failed this check. All GlobalNav links (6 primary + 7 utility), all Footer links
(sitemap headings + children, "Altro", contact `mailto:`/`tel:`, and the cross-app "Informazioni
legali" anchor) and all 6 intent cards plus the 2 hero CTAs are real, focusable `<a>` elements.

## A note on `/servizi` and `/nolimits3d`

`GlobalNav`/`Footer` link to `/servizi` and `/nolimits3d` as section headings; neither has a
registered route (see `EV-01-tseo-f001-ssr-gap.md`). This is **not** an accessibility defect --
the links are real, keyboard-reachable `<a>` elements that land on an axe-clean `NotFound` page
-- it's a content/IA gap, out of scope for this task packet (no new destination pages allowed).
Flagged here for completeness since it surfaced during this deliverable's manual review.

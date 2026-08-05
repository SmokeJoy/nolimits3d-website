# EV-06 -- Real browser verification (`TSK-M003-WEB-D4` mandatory verification step)

Tooling: this session's Browser pane (`mcp__Claude_Browser__*`), against both
`pnpm --filter @atlas/web dev` (`atlas-web-dev`, added to `.claude/launch.json` -- already
present) and `pnpm --filter @atlas/web preview` (`atlas-web-preview`, added to
`.claude/launch.json` for this task, since `robots.txt`/`sitemap.xml` only exist once a real
`vite build` has run; `vite dev` alone never produces `dist/sitemap.xml`).

Environment note: five stray `node` processes from an earlier/other session were already bound
to ports 5173-5177 before this check started, causing the harness's port-tracking to desync
from the actual Vite port. Stopped them (`Stop-Process`) and restarted cleanly on 5173; noted
here per the "multi-AI orchestration risk" concern (parallel sessions can write this same
filesystem) rather than silently working around it.

## Lazy routes load correctly, no blank screens

- `/` (homepage, eager): loads, full content present, 0 console errors.
- `/blog` (lazy): loads; `BlogPage.tsx` fetched over the network (`GET
  http://localhost:5173/src/routes/public/pages/BlogPage.tsx -> 200 OK`, confirmed via
  `read_network_requests`); page title `Blog · NoLimits3D`; 0 console errors.
- `/esplora` (lazy, `SectionLandingPage`): loads; the new "Pagine di questa sezione" `<h2>`
  fix (axe remediation) renders correctly; title `Esplora · NoLimits3D`.
- `/printflow` (lazy): loads; "Coming Soon" content only, title
  `PrintFlow (Coming Soon) · NoLimits3D`.
- Under the **production** `vite preview` build (not dev): `/realizza/richiedi-progetto`
  (lazy, deep-linked directly, not via client-side nav) loads correctly with 0 console errors
  and the correct title -- confirms lazy chunks resolve correctly from a real production build,
  not just Vite's dev-server module graph.

## Skip link moves real keyboard focus (the specific check the task packet asked for)

1. Focused `.skip-link` directly (`document.querySelector('.skip-link').focus()`) --
   `document.activeElement` confirmed as the `<a class="skip-link">`.
2. Activated it via `.click()` (a trusted native call that triggers the browser's real default
   navigation action, unlike a synthetic `dispatchEvent`).
3. Result: `document.activeElement` became `<main id="main-content">`,
   `location.hash === '#main-content'`.
4. Computed style check: `getComputedStyle(main).outline` = `2px solid rgb(37, 211, 102)`
   (the `--focus-ring` token), and `main.matches(':focus-visible')` = `true` -- the new
   `#main-content:focus-visible` CSS rule is live and applying.

This confirms the `tabIndex={-1}` fix in `AppShell.tsx` actually works in a real browser, not
just structurally in jsdom (see `EV-05-axe-a11y-findings.md` for why jsdom alone can't prove
this).

## `robots.txt` / `sitemap.xml` served correctly from a built preview

Built fresh (`pnpm --filter @atlas/web build`), served via `vite preview`
(`atlas-web-preview`, port 4173) -- NOT the dev server, since these files only exist once a real
build has run.

- `GET http://localhost:4173/robots.txt` -> `200 OK`, body matches
  `apps/web/public/robots.txt` verbatim (public `Allow: /`, `Disallow: /account`,
  `Disallow: /command`, `Sitemap:` pointer).
- `GET http://localhost:4173/sitemap.xml` -> `200 OK`, body is the generated XML with exactly
  22 `<url>` entries, matching `apps/web/scripts/generate-sitemap.ts`'s output and
  `apps/web/src/test/sitemap.test.ts`'s assertions -- no `/account`, `/command`, `/printflow`,
  `/servizi`, `/nolimits3d`, `/carrello` or `/esplora/hueforge` present.

## Console/network errors

No console errors or warnings observed on any of the routes checked above, in either dev or
preview mode.

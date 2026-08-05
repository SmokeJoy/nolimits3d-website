# EV-04 -- Bundle size, before/after route-level code-splitting

**Task**: `TSK-M003-WEB-D4` deliverable 2 (Performance, `DOC-SEC-005`, budget: JS initial
&le; 180 KB gzip per public page)
**Method**: `git stash` to the pre-D4 commit (`01594a8`, task-packet-only), ran
`pnpm --filter @atlas/web build`, recorded the `vite build` size table, then `git stash pop`
and rebuilt on the finished D4 changes. Both builds ran against the same Vite/React versions,
same machine, same day.

## Before (eager `public` segment, all 22 destination pages + home in one chunk)

```
dist/index.html                            0.44 kB │ gzip:   0.27 kB
dist/assets/index-CxCToWhX.css            31.91 kB │ gzip:   6.74 kB
dist/assets/CommandBoundary-Dm4dEz2W.js    0.26 kB │ gzip:   0.20 kB
dist/assets/AccountHome-C6ha32u8.js        0.26 kB │ gzip:   0.20 kB
dist/assets/index-CxxqSxQ0.js            349.88 kB │ gzip: 106.63 kB
```

Every public visitor -- homepage or any of the 22 content pages -- downloaded the same single
`index-*.js`: **349.88 kB raw / 106.63 kB gzip**, plus CSS (31.91 kB / 6.74 kB gzip). `account`
and `command` were already lazy from Sprint 1 and are unaffected by this sprint.

## After (only `PublicHome` eager; 22 destination pages lazy via React Router `lazy()`)

```
dist/index.html                                      0.44 kB │ gzip:   0.28 kB
dist/assets/index-0yrhaBEF.css                      30.12 kB │ gzip:   6.54 kB
dist/assets/index-C-Q45LaX.js                      345.44 kB │ gzip: 106.46 kB
+ 22 page-specific chunks, 0.15 kB-1.01 kB each (gzip 0.15-0.47 kB each)
+ 4 shared chunks pulled out of the main bundle by Rollup because 2+ lazy
  pages import them (PageLayout, ServiceLayout, SectionLandingPage,
  FutureFeatureNotice), 0.56-0.82 kB each (gzip 0.35-0.41 kB each)
```

Full per-file table: `Project_Atlas_Team_Workspace/05_Evidence/M003/sprint4/EV-02-web-verification.txt`
(the `pnpm --filter @atlas/web build` section).

## The honest comparison (this is the part the task packet explicitly warned against skipping)

| Scenario | Raw JS | Gzip JS |
|---|---|---|
| Before -- any page (all 23 pages shipped in one bundle) | 349.88 kB | 106.63 kB |
| After -- homepage (`PublicHome`, still eager) | 345.44 kB | 106.46 kB |
| After -- any other single page (main chunk + that page's own chunk, e.g. `/blog`) | 345.44 + 0.76 = 346.20 kB | 106.46 + 0.42 = **106.88 kB** |

**The gzip byte-count improvement is real but small, and for a non-home page it is technically
a very slight *increase* (106.63 -> 106.88 kB, +0.25 kB), not a decrease.** Code-splitting into
22 very small chunks adds a small amount of per-chunk module/import-map overhead that, at this
page count and content size, very nearly cancels out the bytes removed from the main chunk.
Both the before and after numbers are already comfortably under the `DOC-SEC-005` 180 KB gzip
budget, so this was never going to be a dramatic win by that measure.

**Where the real benefit is**: every one of these 22 pages is still placeholder content
(`[PLACEHOLDER: ...]` copy, per the M-003 charter's content policy) -- they are about as small
as a real page can be. The architectural payoff of route-level code-splitting is that:

1. A visitor to any single page now downloads and parses/executes only that page's component
   code, not all 22 -- before this change, the browser had to parse and JIT-compile all 22
   pages' module code on every load even though only one was ever rendered.
2. As these pages gain real content in later sprints (images, the catalog, the lantern
   configurator, real blog posts), that weight lands only on the chunk for the page that needs
   it, not on every visitor's initial homepage load. The eager-bundle architecture this sprint
   removed would have made every future content addition a tax on the homepage's load time;
   the lazy architecture does not.

This is reported as found, not spun as a bigger win than it is, per the task packet's explicit
instruction: "Measure and report the gzip size of the initial bundle before and after -- this is
the actual acceptance criterion, not 'I added lazy() so it must be better.'"

## Verification

- `apps/web/src/test/route-boundaries.test.tsx` already asserted `account`/`command` use
  `lazy`, not `element`, and are never statically imported; this sprint's routes.tsx doc
  comment and the build output above extend the same pattern to the 22 public destination
  pages.
- Confirmed live via `vite preview` + the browser tool: `BlogPage.tsx`'s compiled chunk is
  fetched over the network only on navigating to `/blog`, not on the homepage load (see
  `EV-06-browser-verification.md`).

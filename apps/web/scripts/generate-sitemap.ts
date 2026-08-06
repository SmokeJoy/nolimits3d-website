import { footerOtherLinks, footerSitemapSections } from '../src/routes/public/navigation';

/**
 * Build-time `sitemap.xml` generation (`TSK-M003-WEB-D4`, `DOC-SEO-005`).
 *
 * `navigation.ts` (`footerSitemapSections` / `footerOtherLinks`) is the
 * single source of truth for the public URL taxonomy -- this module reads
 * it rather than hand-maintaining a second URL list that can drift, per the
 * task packet. It is invoked from `vite.config.ts`'s `closeBundle` hook so
 * the sitemap regenerates on every `vite build` (`pnpm --filter @atlas/web
 * build`), instead of shipping a static file that can go stale.
 *
 * `navigation.ts` is not, by itself, a reliable list of *real* routes: it
 * also carries UI-taxonomy entries whose page didn't exist until this same
 * task packet's review pass caught the gap (`/servizi` and `/nolimits3d`
 * were section *heading* links with no registered index route -- only their
 * child pages were wired up; `/carrello` had no route at all). Both classes
 * are now fixed (`ServiziPage`, `Nolimits3DPage`, `CarrelloPage` in
 * `apps/web/src/app/routes.tsx`), so every entry `navigation.ts` links to is
 * a real, registered route again. This module stays explicit about which
 * entries are real vs. real-with-caveats (redirects) instead of blindly
 * dumping every `href`, since that distinction is what caught the gap in the
 * first place. See
 * `Project_Atlas_Team_Workspace/05_Evidence/M003/sprint4/EV-01-tseo-f001-ssr-gap.md`
 * for the original finding.
 */

/**
 * Sections whose own landing page (`section.to`) is independently
 * registered as a route in `apps/web/src/app/routes.tsx`, distinct from its
 * child pages. `Realizza` and `Esplora` got a dedicated `SectionLandingPage`
 * index route in Sprint 3 (`TSK-M003-WEB-D3`); `Servizi` and `NoLimits3D`
 * got theirs in this same Sprint 4 pass, fixing the dead link this file's
 * own review surfaced; `Realizzazioni` and `Eventi` are leaf sections whose
 * `section.to` *is* the whole page (`links: []`).
 */
const SECTIONS_WITH_REGISTERED_INDEX_ROUTE = new Set<string>([
  'Realizza',
  'Esplora',
  'Servizi',
  'NoLimits3D',
  'Realizzazioni',
  'Eventi',
]);

/**
 * Same-app redirects (`<Navigate replace />` in `routes.tsx`), not distinct
 * content pages -- `TSEO-F-003` excludes them; the canonical target is
 * already included via the same section's `links`.
 */
const REDIRECT_ONLY_PATHS = new Set<string>(['/esplora/hueforge']);

/**
 * Explicit product-boundary exclusion (`TSEO-F-005`): the customer account
 * area doesn't belong in a public sitemap. This is the *only* entry this
 * set needs: the private command boundary is never linked from any public
 * navigation surface (`FE-NF-003`, enforced by `scripts/guards/scope-guard.mjs`
 * and `apps/web/src/test/command-privacy.test.tsx`) and PrintFlow stays
 * deliberately unlinked (`navigation.ts`'s own comment) -- neither can ever
 * reach `getSitemapPaths`'s candidate set via `footerSitemapSections` /
 * `footerOtherLinks` in the first place, so excluding them here would be
 * dead code asserting a product boundary this file has no way to violate.
 */
const EXCLUDED_PATHS = new Set<string>(['/account']);

/**
 * Real, registered routes that aren't part of `footerSitemapSections` /
 * `footerOtherLinks` at all -- `/ricerca` is only in `navigation.ts`'s
 * `alwaysAccessibleLinks` (`GlobalNav`'s utility nav, not `Footer`'s
 * sitemap data), so the loop below never sees it. Found and fixed as a dead
 * link (`RicercaPage`, `routes.tsx`) alongside `/servizi`/`/nolimits3d`/
 * `/carrello`; listed explicitly here rather than folding `Ricerca` into
 * `footerOtherLinks`, which would also add it to `Footer`'s rendered output
 * -- a UI decision outside this file's scope.
 */
const EXTRA_REAL_PATHS = new Set<string>(['/ricerca']);

/** The site's one real, already-live production domain (`apps/legacy-web/public/robots.txt`). */
export const SITE_ORIGIN = 'https://nolimits3d.store';

/**
 * Returns every real, canonical public route path (leading `/`, no trailing
 * slash except the root), sorted for a stable, diffable output.
 */
export function getSitemapPaths(): readonly string[] {
  const paths = new Set<string>(['/']);

  for (const section of footerSitemapSections) {
    if (SECTIONS_WITH_REGISTERED_INDEX_ROUTE.has(section.heading)) {
      paths.add(section.to);
    }
    for (const link of section.links) {
      if (!REDIRECT_ONLY_PATHS.has(link.to)) {
        paths.add(link.to);
      }
    }
  }

  for (const link of footerOtherLinks) {
    paths.add(link.to);
  }

  for (const extra of EXTRA_REAL_PATHS) {
    paths.add(extra);
  }

  for (const excluded of EXCLUDED_PATHS) {
    paths.delete(excluded);
  }

  return Array.from(paths).sort();
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/** Builds the full `sitemap.xml` document contents. */
export function buildSitemapXml(): string {
  const urlEntries = getSitemapPaths()
    .map((path) => `  <url>\n    <loc>${escapeXml(`${SITE_ORIGIN}${path}`)}</loc>\n  </url>`)
    .join('\n');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${urlEntries}\n` +
    '</urlset>\n'
  );
}

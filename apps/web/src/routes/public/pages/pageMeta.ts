import { footerSitemapSections, type NavLink } from '../navigation';

/**
 * Breadcrumb trail and page title for the M-003 Sprint 2 content
 * destination pages (`TSK-M003-WEB-D2`), derived purely from the
 * already-approved sitemap data in `navigation.ts`. Every content page's
 * `<h1>` and breadcrumb come from here, not from per-page hardcoded
 * strings, so a single source of truth backs the header/footer navigation
 * and these destination pages alike.
 *
 * `footerSitemapSections` already carries an entry for every route this
 * task packet builds -- Sprint 1 pre-built the full sitemap's structural
 * links before any of the target pages existed -- so every in-scope
 * pathname resolves to a real two- or three-level trail. Pathnames outside
 * that sitemap fall back to `Home` alone; this module has no per-page
 * awareness beyond `navigation.ts`.
 */
const HOME: NavLink = { label: 'Home', to: '/' };

export function getBreadcrumbTrail(pathname: string): readonly NavLink[] {
  for (const section of footerSitemapSections) {
    if (section.to === pathname) {
      return [HOME, { label: section.heading, to: section.to }];
    }

    const link = section.links.find((candidate) => candidate.to === pathname);
    if (link) {
      return [HOME, { label: section.heading, to: section.to }, link];
    }
  }

  return [HOME];
}

export function getPageTitle(pathname: string): string {
  const trail = getBreadcrumbTrail(pathname);
  return trail[trail.length - 1]?.label ?? 'NoLimits3D';
}

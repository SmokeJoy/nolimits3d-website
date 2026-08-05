import { footerOtherLinks, footerSitemapSections, type NavLink } from '../navigation';

/**
 * Breadcrumb trail and page title for the M-003 content destination pages
 * (`TSK-M003-WEB-D2`, extended by `TSK-M003-WEB-D3`), derived purely from
 * the already-approved sitemap data in `navigation.ts`. Every content
 * page's `<h1>` and breadcrumb come from here, not from per-page hardcoded
 * strings, so a single source of truth backs the header/footer navigation
 * and these destination pages alike.
 *
 * `footerSitemapSections` and `footerOtherLinks` together already carry an
 * entry for every route this and the prior task packet build -- except one.
 */
const HOME: NavLink = { label: 'Home', to: '/' };

/**
 * `/printflow` is the one sitemap entry deliberately left out of
 * `navigation.ts`'s linked lists (`footerOtherLinks`'s own comment: "never
 * linked as an active destination" -- the binding product boundary keeps
 * PrintFlow Coming Soon with no active navigation path pointing at it).
 * `DOC-UX-001`'s sitemap still lists it as a real, directly-reachable URL
 * that must carry its own heading and breadcrumb like every other page
 * (`TSK-M003-WEB-D3`, "Exact deliverables"), so this one label is defined
 * here instead of sourced from `navigation.ts` -- the whole point of
 * leaving it unlinked is that no navigation surface should reference it.
 */
const PRINTFLOW_LINK: NavLink = { label: 'PrintFlow (Coming Soon)', to: '/printflow' };

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

  const otherLink = footerOtherLinks.find((candidate) => candidate.to === pathname);
  if (otherLink) {
    return [HOME, otherLink];
  }

  if (pathname === PRINTFLOW_LINK.to) {
    return [HOME, PRINTFLOW_LINK];
  }

  return [HOME];
}

export function getPageTitle(pathname: string): string {
  const trail = getBreadcrumbTrail(pathname);
  return trail[trail.length - 1]?.label ?? 'NoLimits3D';
}

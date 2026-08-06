import {
  alwaysAccessibleLinks,
  footerOtherLinks,
  footerSitemapSections,
  primaryNavSections,
} from '../../src/routes/public/navigation';

/**
 * `navigation.ts` (`GlobalNav`/`Footer`'s single source of truth) is also the
 * single source of truth for this E2E suite's route list, so a new page
 * added there is automatically covered here without a second, hand-kept list
 * that can drift -- the same principle `generate-sitemap.ts` and
 * `nav-links-resolve.test.tsx` already follow.
 */
const CROSS_APP_HREFS = new Set<string>(['/legal']);

export function allPublicRoutes(): string[] {
  const hrefs = [
    '/',
    ...primaryNavSections.map((link) => link.to),
    ...alwaysAccessibleLinks.map((link) => link.to),
    ...footerSitemapSections.flatMap((section) => [
      section.to,
      ...section.links.map((link) => link.to),
    ]),
    ...footerOtherLinks.map((link) => link.to),
  ].filter((href) => !CROSS_APP_HREFS.has(href));

  return [...new Set(hrefs)];
}

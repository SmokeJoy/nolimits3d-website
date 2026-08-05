import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getPageTitle } from './pages/pageMeta';

/**
 * Sets `document.title` per route (`TSK-M003-WEB-D4`, `DOC-SEO-005`), reused
 * from `pageMeta.ts`'s existing `getPageTitle` -- the same breadcrumb/title
 * data `getBreadcrumbTrail` already derives from `navigation.ts`, so page
 * titles are not duplicated in a second place.
 *
 * The root path is special-cased to the bare brand name: `getPageTitle('/')`
 * falls through to the `HOME` breadcrumb entry ("Home"), which reads oddly
 * as a browser tab title ("Home · NoLimits3D") compared to every other
 * public site's homepage tab.
 */
export function useDocumentTitle(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = pathname === '/' ? 'NoLimits3D' : `${getPageTitle(pathname)} · NoLimits3D`;
  }, [pathname]);
}

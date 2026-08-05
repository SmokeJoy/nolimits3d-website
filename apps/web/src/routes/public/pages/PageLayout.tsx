import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { Breadcrumbs } from './Breadcrumbs';
import './content-pages.css';
import { getPageTitle } from './pageMeta';

interface PageLayoutProps {
  children: ReactNode;
}

/**
 * Shared wrapper for every M-003 Sprint 2 content destination page
 * (`TSK-M003-WEB-D2`): a breadcrumb trail plus a single real `<h1>`, both
 * derived from the current route via `navigation.ts` (`pageMeta.ts`), never
 * hardcoded per page. The `data-testid` is likewise derived from the
 * pathname so every route gets a distinct, predictable test hook without
 * each page component declaring its own.
 */
export function PageLayout({ children }: PageLayoutProps) {
  const { pathname } = useLocation();
  const testId = `content-page${pathname === '/' ? '' : pathname.replaceAll('/', '-')}`;

  return (
    <div className="content-page" data-testid={testId}>
      <Breadcrumbs pathname={pathname} />
      <h1 className="content-page__heading">{getPageTitle(pathname)}</h1>
      {children}
    </div>
  );
}

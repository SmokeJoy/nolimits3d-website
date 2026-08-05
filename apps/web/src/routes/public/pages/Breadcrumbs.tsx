import { Link } from 'react-router-dom';

import { getBreadcrumbTrail } from './pageMeta';

interface BreadcrumbsProps {
  pathname: string;
}

/**
 * Breadcrumb trail (`DOC-UX-001`, "Regole": "Link HTML reali, breadcrumb,
 * search..."). Every non-current entry is a real `Link` (renders a native
 * `<a href>`, crawlable and keyboard-reachable); the current page is a
 * plain `<span aria-current="page">`, never a link to itself.
 */
export function Breadcrumbs({ pathname }: BreadcrumbsProps) {
  const trail = getBreadcrumbTrail(pathname);

  return (
    <nav aria-label="Breadcrumb" className="content-page__breadcrumb">
      <ol className="breadcrumb-list">
        {trail.map((item, index) => {
          const isCurrent = index === trail.length - 1;

          return (
            <li key={item.to}>
              {isCurrent ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
              {isCurrent ? null : (
                <span className="breadcrumb-list__separator" aria-hidden="true">
                  {' / '}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

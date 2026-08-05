import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardTitle } from '@atlas/ui';

import { footerSitemapSections } from '../navigation';
import { PageLayout } from './PageLayout';

interface SectionLandingPageProps {
  /** Must match a `heading` in `navigation.ts`'s `footerSitemapSections` (e.g. `'Esplora'`). */
  sectionHeading: string;
  /** Real, section-specific explanatory content rendered above the sub-page index. */
  children: ReactNode;
}

/**
 * Shared body for the `/esplora` and `/realizza` section landing pages
 * (`TSK-M003-WEB-D3`, task packet items 1 and 6). Below the caller-supplied
 * explanatory `children`, this renders a purely structural index of the
 * section's real sub-pages, read from `navigation.ts`'s
 * `footerSitemapSections` (the same source of truth `Footer.tsx` and
 * `pageMeta.ts` already use) rather than a hardcoded list per section -- so
 * this component carries no per-item description of its own and cannot
 * drift from the sitemap.
 */
export function SectionLandingPage({ sectionHeading, children }: SectionLandingPageProps) {
  const section = footerSitemapSections.find((candidate) => candidate.heading === sectionHeading);
  const links = section?.links ?? [];

  return (
    <PageLayout>
      {children}
      {/* Structural sub-heading, not marketing copy (same register as the
          Footer's plain "Altro"/"Contatti" headings) -- required so the
          sub-page cards' `CardTitle` (`<h3>`, `@atlas/ui`) don't jump
          straight from the page's `<h1>`, an axe `heading-order` violation
          (`TSK-M003-WEB-D4`). `EsploraPage`'s `children` is a `<dl>` with no
          paragraph to promote instead, so this lives here once, for every
          `SectionLandingPage` caller, rather than per-page. */}
      <h2 className="home-section__question">Pagine di questa sezione</h2>
      <ul className="card-grid">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="intent-card-link">
              <Card variant="outline">
                <CardHeader>
                  <CardTitle>{link.label}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}

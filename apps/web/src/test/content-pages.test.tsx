import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { appRoutes } from '../app/routes';
import { footerSitemapSections } from '../routes/public/navigation';

function renderAt(initialPath: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialPath] });
  return render(<RouterProvider router={router} />);
}

interface ExpectedPage {
  path: string;
  heading: string;
  breadcrumb: string[];
  testId: string;
}

/**
 * The eleven real routes this task packet (`TSK-M003-WEB-D2`) adds. Every
 * `heading`/`breadcrumb` value here is copied from `navigation.ts`'s
 * `footerSitemapSections`, the same single source of truth the pages
 * themselves read from (`pageMeta.ts`) -- this table is an independent
 * transcription for the assertions, not a re-import of the production
 * data, so it still catches drift between the two.
 */
const expectedPages: ExpectedPage[] = [
  {
    path: '/nolimits3d/chi-siamo',
    heading: 'Chi siamo',
    breadcrumb: ['Home', 'NoLimits3D', 'Chi siamo'],
    testId: 'content-page-nolimits3d-chi-siamo',
  },
  {
    path: '/nolimits3d/metodo',
    heading: 'Metodo',
    breadcrumb: ['Home', 'NoLimits3D', 'Metodo'],
    testId: 'content-page-nolimits3d-metodo',
  },
  {
    path: '/nolimits3d/qualita',
    heading: 'Qualità',
    breadcrumb: ['Home', 'NoLimits3D', 'Qualità'],
    testId: 'content-page-nolimits3d-qualita',
  },
  {
    path: '/nolimits3d/contatti',
    heading: 'Contatti',
    breadcrumb: ['Home', 'NoLimits3D', 'Contatti'],
    testId: 'content-page-nolimits3d-contatti',
  },
  {
    path: '/servizi/stampa-3d',
    heading: 'Stampa 3D',
    breadcrumb: ['Home', 'Servizi', 'Stampa 3D'],
    testId: 'content-page-servizi-stampa-3d',
  },
  {
    path: '/servizi/progettazione-3d',
    heading: 'Progettazione 3D',
    breadcrumb: ['Home', 'Servizi', 'Progettazione 3D'],
    testId: 'content-page-servizi-progettazione-3d',
  },
  {
    path: '/servizi/prototipazione',
    heading: 'Prototipazione',
    breadcrumb: ['Home', 'Servizi', 'Prototipazione'],
    testId: 'content-page-servizi-prototipazione',
  },
  {
    path: '/servizi/ricambi-personalizzati',
    heading: 'Ricambi personalizzati',
    breadcrumb: ['Home', 'Servizi', 'Ricambi personalizzati'],
    testId: 'content-page-servizi-ricambi-personalizzati',
  },
  {
    path: '/servizi/piccole-serie',
    heading: 'Piccole serie',
    breadcrumb: ['Home', 'Servizi', 'Piccole serie'],
    testId: 'content-page-servizi-piccole-serie',
  },
  {
    path: '/realizzazioni',
    heading: 'Realizzazioni',
    breadcrumb: ['Home', 'Realizzazioni'],
    testId: 'content-page-realizzazioni',
  },
  {
    path: '/eventi',
    heading: 'Eventi',
    breadcrumb: ['Home', 'Eventi'],
    testId: 'content-page-eventi',
  },
];

describe('Content destination pages (TSK-M003-WEB-D2)', () => {
  it.each(expectedPages)(
    'renders the expected <h1> and breadcrumb trail at $path',
    ({ path, heading, breadcrumb, testId }) => {
      renderAt(path);

      const page = screen.getByTestId(testId);
      expect(within(page).getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();

      const nav = within(page).getByRole('navigation', { name: 'Breadcrumb' });
      const text = nav.textContent?.replace(/\s+/g, ' ').trim();
      expect(text).toBe(breadcrumb.join(' / '));

      // The current page is announced (aria-current="page") but is not a
      // link to itself.
      const current = within(nav).getByText(breadcrumb[breadcrumb.length - 1] as string);
      expect(current.tagName).not.toBe('A');
      expect(current).toHaveAttribute('aria-current', 'page');
    },
  );

  it('links each sub-page breadcrumb back to its real hub section', () => {
    renderAt('/servizi/stampa-3d');
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(nav).getByRole('link', { name: 'Servizi' })).toHaveAttribute('href', '/servizi');
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it('keeps Contatti free of placeholder markers (real, verified contact data)', () => {
    renderAt('/nolimits3d/contatti');
    const page = screen.getByTestId('content-page-nolimits3d-contatti');

    expect(page.textContent).not.toMatch(/PLACEHOLDER/);
    expect(within(page).getByRole('link', { name: /@/ })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:/),
    );
    expect(within(page).getByRole('link', { name: /\+39/ })).toHaveAttribute(
      'href',
      expect.stringMatching(/^tel:/),
    );
  });
});

describe('Regression: previously-404 destinations now resolve (TSK-M003-WEB-D2)', () => {
  it('resolves every new route to a real, distinct page instead of NotFound', () => {
    const testIds = new Set<string>();

    for (const { path, testId } of expectedPages) {
      const { unmount } = renderAt(path);

      expect(screen.queryByTestId('route-not-found')).not.toBeInTheDocument();
      expect(screen.getByTestId(testId)).toBeInTheDocument();
      testIds.add(testId);

      unmount();
    }

    expect(testIds.size).toBe(expectedPages.length);
  });

  it('keeps every GlobalNav/Footer sitemap entry for these destinations wired to a real path', () => {
    const sitemapHrefs = footerSitemapSections.flatMap((section) => [
      section.to,
      ...section.links.map((link) => link.to),
    ]);

    for (const { path } of expectedPages) {
      expect(sitemapHrefs).toContain(path);
    }
  });
});

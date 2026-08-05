import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { appRoutes } from '../app/routes';
import { footerOtherLinks, footerSitemapSections } from '../routes/public/navigation';

function renderAt(initialPath: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialPath] });
  return { view: render(<RouterProvider router={router} />), router };
}

interface ExpectedPage {
  path: string;
  heading: string;
  breadcrumb: string[];
  testId: string;
}

/**
 * The eleven real pages this task packet (`TSK-M003-WEB-D3`) adds --
 * `/esplora/hueforge` is a twelfth route but is a redirect, not an
 * independent page, so it is covered by its own test below instead of this
 * table (per the task packet's "12 new routes (or 11 + 1 redirect)").
 */
const expectedPages: ExpectedPage[] = [
  {
    path: '/esplora',
    heading: 'Esplora',
    breadcrumb: ['Home', 'Esplora'],
    testId: 'content-page-esplora',
  },
  {
    path: '/esplora/catalogo',
    heading: 'Catalogo',
    breadcrumb: ['Home', 'Esplora', 'Catalogo'],
    testId: 'content-page-esplora-catalogo',
  },
  {
    path: '/esplora/ispirati',
    heading: 'Ispirati',
    breadcrumb: ['Home', 'Esplora', 'Ispirati'],
    testId: 'content-page-esplora-ispirati',
  },
  {
    path: '/esplora/arte-in-stampa-3d',
    heading: 'Arte in stampa 3D',
    breadcrumb: ['Home', 'Esplora', 'Arte in stampa 3D'],
    testId: 'content-page-esplora-arte-in-stampa-3d',
  },
  {
    path: '/realizza',
    heading: 'Realizza',
    breadcrumb: ['Home', 'Realizza'],
    testId: 'content-page-realizza',
  },
  {
    path: '/realizza/richiedi-progetto',
    heading: 'Richiedi progetto',
    breadcrumb: ['Home', 'Realizza', 'Richiedi progetto'],
    testId: 'content-page-realizza-richiedi-progetto',
  },
  {
    path: '/realizza/preventivo-stampa-3d',
    heading: 'Preventivo stampa 3D',
    breadcrumb: ['Home', 'Realizza', 'Preventivo stampa 3D'],
    testId: 'content-page-realizza-preventivo-stampa-3d',
  },
  {
    path: '/realizza/configuratore-lanterne',
    heading: 'Configuratore lanterne',
    breadcrumb: ['Home', 'Realizza', 'Configuratore lanterne'],
    testId: 'content-page-realizza-configuratore-lanterne',
  },
  {
    path: '/realizza/assistenza-stampanti-3d',
    heading: 'Assistenza stampanti 3D',
    breadcrumb: ['Home', 'Realizza', 'Assistenza stampanti 3D'],
    testId: 'content-page-realizza-assistenza-stampanti-3d',
  },
  {
    path: '/blog',
    heading: 'Blog',
    breadcrumb: ['Home', 'Blog'],
    testId: 'content-page-blog',
  },
  {
    path: '/printflow',
    heading: 'PrintFlow (Coming Soon)',
    breadcrumb: ['Home', 'PrintFlow (Coming Soon)'],
    testId: 'content-page-printflow',
  },
];

/**
 * The five future-transactional pages this sprint's sharper honesty policy
 * applies to (task packet: "never build UI that looks interactive/
 * functional ... for a feature that has no backend behind it").
 */
const futureFunctionalityPaths = [
  '/esplora/catalogo',
  '/realizza/richiedi-progetto',
  '/realizza/preventivo-stampa-3d',
  '/realizza/configuratore-lanterne',
  '/realizza/assistenza-stampanti-3d',
];

describe('Remaining sitemap pages (TSK-M003-WEB-D3)', () => {
  it.each(expectedPages)(
    'renders the expected <h1> and breadcrumb trail at $path',
    // Content pages are lazy-loaded (`TSK-M003-WEB-D4`) -- await the route's
    // `Component` instead of assuming it's already in the DOM.
    async ({ path, heading, breadcrumb, testId }) => {
      renderAt(path);

      const page = await screen.findByTestId(testId);
      expect(within(page).getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();

      const nav = within(page).getByRole('navigation', { name: 'Breadcrumb' });
      const text = nav.textContent?.replace(/\s+/g, ' ').trim();
      expect(text).toBe(breadcrumb.join(' / '));

      const current = within(nav).getByText(breadcrumb[breadcrumb.length - 1] as string);
      expect(current.tagName).not.toBe('A');
      expect(current).toHaveAttribute('aria-current', 'page');
    },
  );

  it('redirects /esplora/hueforge to /esplora/arte-in-stampa-3d instead of duplicating its content', async () => {
    const { router } = renderAt('/esplora/hueforge');

    const page = await screen.findByTestId('content-page-esplora-arte-in-stampa-3d');
    expect(router.state.location.pathname).toBe('/esplora/arte-in-stampa-3d');
    expect(
      within(page).getByRole('heading', { level: 1, name: 'Arte in stampa 3D' }),
    ).toBeInTheDocument();
  });

  it('keeps PrintFlow to Coming Soon only, with no feature description', async () => {
    renderAt('/printflow');
    const page = await screen.findByTestId('content-page-printflow');

    expect(within(page).getByText('Coming Soon')).toBeInTheDocument();
    expect(page.textContent).toMatch(/Coming Soon/);
    // Non-negotiable product boundary: no functional description beyond
    // "it exists and is not active" -- no form, no input, no download link.
    // (The breadcrumb's "Home" link is the only anchor on the page.)
    expect(page.querySelector('form')).not.toBeInTheDocument();
    expect(page.querySelector('input')).not.toBeInTheDocument();
    expect(within(page).getAllByRole('link')).toHaveLength(1);
    expect(within(page).getByRole('link')).toHaveAttribute('href', '/');
  });

  describe.each(futureFunctionalityPaths)('honesty policy at %s', (path) => {
    it('renders a clear "not yet available" state with no fake interactive form', async () => {
      renderAt(path);
      const page = await screen.findByTestId(`content-page${path.replaceAll('/', '-')}`);

      // The honesty messaging is present via the shared StatusIndicator...
      const status = within(page).getByRole('status');
      expect(status.textContent).toMatch(/non è ancora disponibile online/);

      // ...and it points to the real, already-live contact channel.
      const contactLink = within(page).getByRole('link', { name: /Contatti/ });
      expect(contactLink).toHaveAttribute('href', '/nolimits3d/contatti');

      // Absolutely no elements that could make a real visitor believe they
      // can submit a request, configure a product, or buy something here.
      expect(page.querySelector('form')).not.toBeInTheDocument();
      expect(page.querySelector('input')).not.toBeInTheDocument();
      expect(page.querySelector('button[type="submit"]')).not.toBeInTheDocument();
      expect(page.textContent).not.toMatch(/€|EUR/);
    });
  });
});

describe('Regression: previously-404 destinations now resolve (TSK-M003-WEB-D3)', () => {
  it('resolves every new route to a real, distinct page instead of NotFound', async () => {
    const testIds = new Set<string>();

    for (const { path, testId } of expectedPages) {
      const { view } = renderAt(path);

      expect(await screen.findByTestId(testId)).toBeInTheDocument();
      expect(screen.queryByTestId('route-not-found')).not.toBeInTheDocument();
      testIds.add(testId);

      view.unmount();
    }

    expect(testIds.size).toBe(expectedPages.length);
  });

  it('keeps every Esplora/Realizza sitemap entry wired to a real path', () => {
    const sitemapHrefs = footerSitemapSections.flatMap((section) => [
      section.to,
      ...section.links.map((link) => link.to),
    ]);

    for (const { path } of expectedPages) {
      if (path === '/blog' || path === '/printflow') continue;
      expect(sitemapHrefs).toContain(path);
    }

    expect(footerOtherLinks.map((link) => link.to)).toContain('/blog');
  });

  it('keeps /printflow unlinked from every navigation surface (product boundary)', async () => {
    const allLinkedPaths = [
      ...footerSitemapSections.flatMap((section) => [
        section.to,
        ...section.links.map((link) => link.to),
      ]),
      ...footerOtherLinks.map((link) => link.to),
    ];

    expect(allLinkedPaths).not.toContain('/printflow');

    // The route itself still resolves directly, it just isn't linked.
    renderAt('/printflow');
    expect(await screen.findByTestId('content-page-printflow')).toBeInTheDocument();
  });
});

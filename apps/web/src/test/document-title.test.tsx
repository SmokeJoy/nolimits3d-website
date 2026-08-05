import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { appRoutes } from '../app/routes';

function renderAt(initialPath: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialPath] });
  return render(<RouterProvider router={router} />);
}

/**
 * Per-page `<title>` (`TSK-M003-WEB-D4`, `DOC-SEO-005`), set by
 * `useDocumentTitle` (`apps/web/src/routes/public/useDocumentTitle.ts`),
 * which reads `pageMeta.ts`'s existing `getPageTitle` -- the same data
 * `Breadcrumbs`/`PageLayout` already derive from `navigation.ts`. No title
 * text is duplicated here as a second hand-maintained copy; these
 * assertions read the rendered `document.title` after navigation, the same
 * way a browser tab or a crawler would observe it.
 *
 * `document.title` is set from a `useEffect` in `AppShell` (a parent of the
 * lazy-loaded route content), so it can commit in a separate tick from the
 * lazy page's own DOM -- assertions use `waitFor` rather than a bare
 * `expect` immediately after `findByTestId`, matching Testing Library's own
 * guidance for effect-driven side effects instead of assuming same-tick
 * ordering.
 */
describe('Per-page document title (TSK-M003-WEB-D4)', () => {
  it('uses the bare brand name on the homepage', async () => {
    renderAt('/');
    await screen.findByTestId('route-boundary-public');
    await waitFor(() => expect(document.title).toBe('NoLimits3D'));
  });

  it.each([
    ['/nolimits3d/chi-siamo', 'Chi siamo · NoLimits3D'],
    ['/servizi/stampa-3d', 'Stampa 3D · NoLimits3D'],
    ['/realizzazioni', 'Realizzazioni · NoLimits3D'],
    ['/esplora', 'Esplora · NoLimits3D'],
    ['/esplora/catalogo', 'Catalogo · NoLimits3D'],
    ['/realizza', 'Realizza · NoLimits3D'],
    ['/blog', 'Blog · NoLimits3D'],
    ['/printflow', 'PrintFlow (Coming Soon) · NoLimits3D'],
  ])('sets "%s" to "%s"', async (path, expectedTitle) => {
    const { unmount } = renderAt(path);
    await screen.findByTestId(`content-page${path.replaceAll('/', '-')}`);
    await waitFor(() => expect(document.title).toBe(expectedTitle));
    unmount();
  });

  it("falls back to pageMeta.ts's own default breadcrumb entry for an unknown path", async () => {
    // `pageMeta.ts`'s `getBreadcrumbTrail` (Sprint 2/3, unmodified here)
    // returns `[HOME]` for any pathname it doesn't recognise, so
    // `getPageTitle` resolves to "Home" -- reused as-is per the task
    // packet's "reuse it, don't duplicate" instruction, rather than adding a
    // NotFound-specific special case to the title hook. This only affects
    // the catch-all 404 boundary, not any of the 22 real public pages this
    // deliverable targets.
    renderAt('/percorso-inesistente');
    await screen.findByTestId('route-not-found');
    await waitFor(() => expect(document.title).toBe('Home · NoLimits3D'));
  });

  it('updates on client-side navigation between routes', async () => {
    const first = renderAt('/blog');
    await screen.findByTestId('content-page-blog');
    await waitFor(() => expect(document.title).toBe('Blog · NoLimits3D'));
    first.unmount();

    const second = renderAt('/eventi');
    await screen.findByTestId('content-page-eventi');
    await waitFor(() => expect(document.title).toBe('Eventi · NoLimits3D'));
    second.unmount();
  });
});

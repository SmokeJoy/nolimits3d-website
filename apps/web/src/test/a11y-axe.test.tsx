import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { appRoutes } from '../app/routes';

/**
 * Automated accessibility coverage (`TSK-M003-WEB-D4`, `DOC-UX-011`, WCAG
 * 2.2 AA), reusing the exact `axe-core` + hand-rolled assertion pattern
 * already established in `packages/ui/tests/*.test.tsx` (e.g.
 * `packages/ui/tests/button.test.tsx`) rather than inventing a new one.
 *
 * `axe-core` is declared as an explicit devDependency of `@atlas/web` too
 * (`apps/web/package.json`), even though it resolved locally without that
 * during development -- this machine has a user-level `node-linker=hoisted`
 * pnpm config (`~/.npmrc` outside the repo, not committed) that made the
 * undeclared import resolve anyway. CI's `pnpm install --frozen-lockfile`
 * has no such config and uses pnpm's default isolated linker, which would
 * have failed to resolve it -- the exact same class of bug the `rolldown`
 * dependency fix caught earlier this session (see that commit's message).
 * Caught here by checking `pnpm config get node-linker --location=project`
 * before trusting the local resolution, not by a failed CI run.
 *
 * `color-contrast` is disabled for the same reason `packages/ui` disables
 * it: jsdom has no real layout/paint engine, so axe's contrast check can't
 * compute anything meaningful there and would only produce false
 * positives/negatives.
 */
async function expectNoA11yViolations(node: HTMLElement) {
  const results = await axe.run(node, {
    rules: { 'color-contrast': { enabled: false } },
  });
  expect(results.violations).toEqual([]);
}

function renderAt(initialPath: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialPath] });
  return render(<RouterProvider router={router} />);
}

/**
 * Every real public route (`navigation.ts` + `routes.tsx`), each paired
 * with the `data-testid` its page renders once loaded -- an independent
 * transcription, not a re-import, so this table still catches route/testid
 * drift (same convention as `content-pages.test.tsx` and
 * `remaining-sitemap-pages.test.tsx`). All of these except `/` are now
 * lazy-loaded (`TSK-M003-WEB-D4`), so every lookup awaits the route's
 * `Component` before running `axe`.
 */
const publicRoutes: ReadonlyArray<{ path: string; testId: string }> = [
  { path: '/', testId: 'route-boundary-public' },
  { path: '/nolimits3d/chi-siamo', testId: 'content-page-nolimits3d-chi-siamo' },
  { path: '/nolimits3d/metodo', testId: 'content-page-nolimits3d-metodo' },
  { path: '/nolimits3d/qualita', testId: 'content-page-nolimits3d-qualita' },
  { path: '/nolimits3d/contatti', testId: 'content-page-nolimits3d-contatti' },
  { path: '/servizi/stampa-3d', testId: 'content-page-servizi-stampa-3d' },
  { path: '/servizi/progettazione-3d', testId: 'content-page-servizi-progettazione-3d' },
  { path: '/servizi/prototipazione', testId: 'content-page-servizi-prototipazione' },
  {
    path: '/servizi/ricambi-personalizzati',
    testId: 'content-page-servizi-ricambi-personalizzati',
  },
  { path: '/servizi/piccole-serie', testId: 'content-page-servizi-piccole-serie' },
  { path: '/realizzazioni', testId: 'content-page-realizzazioni' },
  { path: '/eventi', testId: 'content-page-eventi' },
  { path: '/esplora', testId: 'content-page-esplora' },
  { path: '/esplora/catalogo', testId: 'content-page-esplora-catalogo' },
  { path: '/esplora/ispirati', testId: 'content-page-esplora-ispirati' },
  { path: '/esplora/arte-in-stampa-3d', testId: 'content-page-esplora-arte-in-stampa-3d' },
  { path: '/realizza', testId: 'content-page-realizza' },
  { path: '/realizza/richiedi-progetto', testId: 'content-page-realizza-richiedi-progetto' },
  {
    path: '/realizza/preventivo-stampa-3d',
    testId: 'content-page-realizza-preventivo-stampa-3d',
  },
  {
    path: '/realizza/configuratore-lanterne',
    testId: 'content-page-realizza-configuratore-lanterne',
  },
  {
    path: '/realizza/assistenza-stampanti-3d',
    testId: 'content-page-realizza-assistenza-stampanti-3d',
  },
  { path: '/blog', testId: 'content-page-blog' },
  { path: '/printflow', testId: 'content-page-printflow' },
];

describe('Public route accessibility (TSK-M003-WEB-D4, axe-core)', () => {
  it.each(publicRoutes)('has no axe violations at $path', async ({ path, testId }) => {
    const { container } = renderAt(path);

    await screen.findByTestId(testId);
    await expectNoA11yViolations(container);
  });

  it('keeps PrintFlow labeled Coming Soon in the same pass that checks it for axe violations', async () => {
    const { container } = renderAt('/printflow');
    await screen.findByTestId('content-page-printflow');

    // Real product-boundary check, not just a comment: PrintFlow must never
    // ship as anything but Coming Soon (binding constraint, task packet
    // item 12), so this reruns that assertion here too rather than relying
    // solely on `remaining-sitemap-pages.test.tsx`'s coverage.
    expect(container.textContent).toMatch(/Coming Soon/);
    await expectNoA11yViolations(container);
  });

  it('has no axe violations on the account and command boundaries', async () => {
    for (const path of ['/account', '/command']) {
      const { container, unmount } = renderAt(path);
      await screen.findByRole('heading', { level: 1 });
      await expectNoA11yViolations(container);
      unmount();
    }
  });

  it('has no axe violations on the not-found boundary', async () => {
    const { container } = renderAt('/percorso-inesistente');
    await screen.findByTestId('route-not-found');
    await expectNoA11yViolations(container);
  });

  it('redirects /esplora/hueforge and still lands on an axe-clean page', async () => {
    const { container } = renderAt('/esplora/hueforge');
    await screen.findByTestId('content-page-esplora-arte-in-stampa-3d');
    await expectNoA11yViolations(container);
  });
});

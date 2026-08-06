import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { appRoutes } from '../app/routes';

/**
 * Regression guard for the real bug a manual sitemap review caught after
 * Sprint 1-3 shipped: `/servizi`, `/nolimits3d` and `/carrello` were linked
 * from `GlobalNav`/`Footer` for two sprints with no route ever registered
 * behind them -- confirmed 404s, found by reading `routes.tsx` by hand, not
 * by any test. `keyboard-reachability.test.tsx` already proves every nav
 * link is a real, focusable `<a href>`; it does not prove that `href`
 * resolves to a real page instead of the catch-all `NotFound`. This file
 * closes that gap by actually rendering the router at every internal href
 * `GlobalNav`/`Footer` produce and asserting the result isn't `NotFound` --
 * so a future navigation.ts entry with no matching route in routes.tsx fails
 * a test instead of waiting for another manual review.
 */
function renderAt(initialPath: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialPath] });
  return render(<RouterProvider router={router} />);
}

/**
 * `Footer.tsx`'s "Informazioni legali" link is a deliberate exception, not
 * an oversight: its own comment documents it as a plain cross-app `<a>` to
 * `apps/legacy-web`'s real, already-live `/legal` page -- not a path
 * `apps/web`'s own router is meant to own or ever will. Testing it through
 * `createMemoryRouter` would be a false positive against a page this app
 * intentionally hands off rather than serves itself.
 */
const CROSS_APP_HREFS = new Set<string>(['/legal']);

/** Every internal (same-app) href GlobalNav or Footer currently render. */
function internalNavHrefs(): string[] {
  const { container, unmount } = renderAt('/');
  const header = within(container).getByRole('banner');
  const footer = within(container).getByRole('contentinfo');
  const hrefs = [...within(header).getAllByRole('link'), ...within(footer).getAllByRole('link')]
    .map((link) => link.getAttribute('href'))
    .filter((href): href is string => !!href && href.startsWith('/') && !CROSS_APP_HREFS.has(href));
  unmount();
  return [...new Set(hrefs)];
}

describe('Every GlobalNav/Footer internal link resolves to a real page (regression)', () => {
  it.each(internalNavHrefs())('does not 404 at %s', (href) => {
    renderAt(href);

    // Any real page renders its own heading before this assertion would
    // even reach it; NotFound is the only component with this testid.
    expect(screen.queryByTestId('route-not-found')).not.toBeInTheDocument();
  });
});

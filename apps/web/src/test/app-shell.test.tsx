import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { appRoutes } from '../app/routes';

function renderAt(initialPath: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialPath] });
  render(<RouterProvider router={router} />);
  return router;
}

describe('App Shell (M001-B)', () => {
  it('renders the shell with header, main content and footer landmarks', () => {
    renderAt('/');

    expect(screen.getByTestId('app-shell')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the primary navigation with public entries only', () => {
    renderAt('/');

    const nav = screen.getByRole('navigation', { name: 'Navigazione principale' });
    const links = within(nav).getAllByRole('link');

    expect(links.map((link) => link.textContent)).toEqual(['Home', 'Area clienti']);
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/', '/account']);
  });

  it('renders the public boundary as the index route', () => {
    renderAt('/');

    expect(screen.getByTestId('route-boundary-public')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'NoLimits3D' })).toBeInTheDocument();
  });
});

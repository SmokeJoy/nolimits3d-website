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

  it('renders the six primary IA sections as real, keyboard-reachable links', () => {
    renderAt('/');

    const nav = screen.getByRole('navigation', { name: 'Navigazione principale' });
    const links = within(nav).getAllByRole('link');

    expect(links.map((link) => link.textContent)).toEqual([
      'Realizza',
      'Esplora',
      'Servizi',
      'Realizzazioni',
      'Eventi',
      'NoLimits3D',
    ]);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/realizza',
      '/esplora',
      '/servizi',
      '/realizzazioni',
      '/eventi',
      '/nolimits3d',
    ]);
    // Native <a href> elements are focusable/keyboard-reachable by default;
    // none carries a negative tabindex that would remove them from the tab
    // order.
    for (const link of links) {
      expect(link.getAttribute('tabindex')).not.toBe('-1');
    }
  });

  it('renders the "always accessible" IA items as real links', () => {
    renderAt('/');

    const nav = screen.getByRole('navigation', { name: 'Link sempre accessibili' });
    const links = within(nav).getAllByRole('link');

    expect(links.map((link) => link.textContent)).toEqual([
      'Catalogo',
      'Configuratore lanterne',
      'Richiesta/preventivo',
      'Account',
      'Carrello',
      'Ricerca',
      'Contatti',
    ]);
  });

  it('renders the public boundary as the index route', () => {
    renderAt('/');

    expect(screen.getByTestId('route-boundary-public')).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toMatch(/^\[PLACEHOLDER H1/);
  });

  it('renders the structural footer with the full sitemap', () => {
    renderAt('/');

    const contentinfo = screen.getByRole('contentinfo');
    expect(within(contentinfo).getByRole('link', { name: 'Realizza' })).toHaveAttribute(
      'href',
      '/realizza',
    );
    expect(within(contentinfo).getByRole('link', { name: 'NoLimits3D' })).toHaveAttribute(
      'href',
      '/nolimits3d',
    );
  });
});

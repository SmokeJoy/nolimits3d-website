import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { appRoutes } from '../app/routes';

function renderAt(initialPath: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialPath] });
  render(<RouterProvider router={router} />);
  return router;
}

function commandLinks(): HTMLElement[] {
  return screen
    .queryAllByRole('link')
    .filter((link) => (link.getAttribute('href') ?? '').includes('command'));
}

describe('Command boundary privacy (M001-B)', () => {
  it('exposes no link to the command boundary from the public segment', async () => {
    renderAt('/');
    await screen.findByTestId('route-boundary-public');

    expect(commandLinks()).toHaveLength(0);
  });

  it('exposes no link to the command boundary from the account segment', async () => {
    renderAt('/account');
    await screen.findByTestId('route-boundary-account');

    expect(commandLinks()).toHaveLength(0);
  });

  it('exposes no link to the command boundary from the not-found surface', async () => {
    renderAt('/percorso-inesistente');
    await screen.findByTestId('route-not-found');

    expect(commandLinks()).toHaveLength(0);
  });

  it('renders no command content outside the command boundary', async () => {
    renderAt('/');
    await screen.findByTestId('route-boundary-public');

    expect(screen.queryByTestId('route-boundary-command')).not.toBeInTheDocument();
    expect(screen.queryByText('Command Center')).not.toBeInTheDocument();
  });
});

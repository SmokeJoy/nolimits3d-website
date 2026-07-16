import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { appRoutes } from '../app/routes';

function renderAt(initialPath: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialPath] });
  render(<RouterProvider router={router} />);
  return router;
}

describe('Route boundaries (M001-B)', () => {
  it('resolves the public boundary at "/"', async () => {
    renderAt('/');

    expect(await screen.findByTestId('route-boundary-public')).toBeInTheDocument();
  });

  it('resolves the account boundary at "/account"', async () => {
    renderAt('/account');

    expect(await screen.findByTestId('route-boundary-account')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Area clienti' })).toBeInTheDocument();
  });

  it('resolves the command boundary at "/command" (direct URL only)', async () => {
    renderAt('/command');

    expect(await screen.findByTestId('route-boundary-command')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Command Center' })).toBeInTheDocument();
  });

  it('renders the not-found boundary for unknown paths', async () => {
    renderAt('/percorso-inesistente');

    expect(await screen.findByTestId('route-not-found')).toBeInTheDocument();
  });

  it('keeps account and command as lazy segments outside the initial bundle', () => {
    const root = appRoutes[0];
    const children = root?.children ?? [];
    const account = children.find((route) => route.path === 'account');
    const command = children.find((route) => route.path === 'command');

    expect(typeof account?.lazy).toBe('function');
    expect(account?.element).toBeUndefined();
    expect(typeof command?.lazy).toBe('function');
    expect(command?.element).toBeUndefined();
  });

  it('never imports account or command segment modules statically', async () => {
    const { default: routesSource } = await import('../app/routes.tsx?raw');

    // Static imports would pull the segments into the initial public bundle.
    expect(routesSource).not.toMatch(/^import .*['"]\.\.\/routes\/(account|command)\//m);
    expect(routesSource).toMatch(/await import\('\.\.\/routes\/account\/AccountHome'\)/);
    expect(routesSource).toMatch(/await import\('\.\.\/routes\/command\/CommandBoundary'\)/);
  });
});

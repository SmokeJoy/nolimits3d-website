import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { appRoutes } from '../app/routes';
import { SegmentErrorBoundary } from '../app/SegmentErrorBoundary';

vi.mock('../routes/account/AccountHome', () => ({
  AccountHome: () => {
    throw new Error('segment failure (test)');
  },
}));

describe('Segment error boundaries (FE-NF-003)', () => {
  it('renders the account segment error boundary when the segment crashes', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/account'] });
    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('segment-error-account')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Si è verificato un errore' }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('route-boundary-account')).not.toBeInTheDocument();
  });

  it('renders the segment error boundary with status detail for route error responses', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          errorElement: <SegmentErrorBoundary segment="command" />,
          lazy: () =>
            // React Router models route error responses as rejected/thrown Response objects.
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            Promise.reject(new Response(null, { status: 503, statusText: 'Service Unavailable' })),
        },
      ],
      { initialEntries: ['/'] },
    );
    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('segment-error-command')).toBeInTheDocument();
    expect(screen.getByText('503 Service Unavailable')).toBeInTheDocument();
  });
});

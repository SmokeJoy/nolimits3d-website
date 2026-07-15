import type { RouteObject } from 'react-router-dom';

import { AppShell } from './AppShell';
import { SegmentErrorBoundary } from './SegmentErrorBoundary';
import { NotFound } from '../routes/NotFound';
import { PublicHome } from '../routes/public/PublicHome';

/**
 * Route boundaries for M001-B: `public`, `account` and `command`.
 *
 * - `public` is the only eagerly loaded segment.
 * - `account` and `command` are lazy segments with their own error boundary,
 *   so they stay out of the initial public bundle.
 * - `command` is private: no navigation surface links to it and it carries no
 *   feature. Authorization hardening arrives in later milestones; Jarvis is
 *   NOT part of this boundary (ADR-0020).
 */
export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    errorElement: <SegmentErrorBoundary segment="root" />,
    children: [
      {
        index: true,
        element: <PublicHome />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'account',
        errorElement: <SegmentErrorBoundary segment="account" />,
        lazy: async () => {
          const { AccountHome } = await import('../routes/account/AccountHome');
          return { Component: AccountHome };
        },
      },
      {
        path: 'command',
        errorElement: <SegmentErrorBoundary segment="command" />,
        lazy: async () => {
          const { CommandBoundary } = await import('../routes/command/CommandBoundary');
          return { Component: CommandBoundary };
        },
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

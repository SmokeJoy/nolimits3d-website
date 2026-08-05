import type { RouteObject } from 'react-router-dom';

import { AppShell } from './AppShell';
import { SegmentErrorBoundary } from './SegmentErrorBoundary';
import { NotFound } from '../routes/NotFound';
import { PublicHome } from '../routes/public/PublicHome';
import { ChiSiamoPage } from '../routes/public/pages/ChiSiamoPage';
import { ContattiPage } from '../routes/public/pages/ContattiPage';
import { EventiPage } from '../routes/public/pages/EventiPage';
import { MetodoPage } from '../routes/public/pages/MetodoPage';
import { QualitaPage } from '../routes/public/pages/QualitaPage';
import { RealizzazioniPage } from '../routes/public/pages/RealizzazioniPage';
import { PiccoleSeriePage } from '../routes/public/pages/servizi/PiccoleSeriePage';
import { Progettazione3DPage } from '../routes/public/pages/servizi/Progettazione3DPage';
import { PrototipazionePage } from '../routes/public/pages/servizi/PrototipazionePage';
import { RicambiPersonalizzatiPage } from '../routes/public/pages/servizi/RicambiPersonalizzatiPage';
import { Stampa3DPage } from '../routes/public/pages/servizi/Stampa3DPage';

/**
 * Route boundaries for M001-B: `public`, `account` and `command`.
 *
 * - `public` is the only eagerly loaded segment.
 * - `account` and `command` are lazy segments with their own error boundary,
 *   so they stay out of the initial public bundle.
 * - `command` is private: no navigation surface links to it and it carries no
 *   feature. Authorization hardening arrives in later milestones; Jarvis is
 *   NOT part of this boundary (ADR-0020).
 *
 * The eleven `nolimits3d` / `servizi` / `realizzazioni` / `eventi` routes
 * below (M-003 Sprint 2, `TSK-M003-WEB-D2`) are real content destination
 * pages replacing what previously fell through to the catch-all `NotFound`
 * -- they stay in the `public` boundary's eager segment for the same reason
 * `PublicHome` does.
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
        path: 'nolimits3d/chi-siamo',
        element: <ChiSiamoPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'nolimits3d/metodo',
        element: <MetodoPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'nolimits3d/qualita',
        element: <QualitaPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'nolimits3d/contatti',
        element: <ContattiPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'servizi/stampa-3d',
        element: <Stampa3DPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'servizi/progettazione-3d',
        element: <Progettazione3DPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'servizi/prototipazione',
        element: <PrototipazionePage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'servizi/ricambi-personalizzati',
        element: <RicambiPersonalizzatiPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'servizi/piccole-serie',
        element: <PiccoleSeriePage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'realizzazioni',
        element: <RealizzazioniPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'eventi',
        element: <EventiPage />,
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

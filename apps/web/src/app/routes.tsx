import { Navigate, type RouteObject } from 'react-router-dom';

import { AppShell } from './AppShell';
import { SegmentErrorBoundary } from './SegmentErrorBoundary';
import { NotFound } from '../routes/NotFound';
import { PublicHome } from '../routes/public/PublicHome';
import { BlogPage } from '../routes/public/pages/BlogPage';
import { ChiSiamoPage } from '../routes/public/pages/ChiSiamoPage';
import { ContattiPage } from '../routes/public/pages/ContattiPage';
import { EventiPage } from '../routes/public/pages/EventiPage';
import { ArteInStampa3DPage } from '../routes/public/pages/esplora/ArteInStampa3DPage';
import { CatalogoPage } from '../routes/public/pages/esplora/CatalogoPage';
import { EsploraPage } from '../routes/public/pages/esplora/EsploraPage';
import { IspiratiPage } from '../routes/public/pages/esplora/IspiratiPage';
import { MetodoPage } from '../routes/public/pages/MetodoPage';
import { PrintFlowPage } from '../routes/public/pages/PrintFlowPage';
import { QualitaPage } from '../routes/public/pages/QualitaPage';
import { AssistenzaStampantiPage } from '../routes/public/pages/realizza/AssistenzaStampantiPage';
import { ConfiguratoreLanternePage } from '../routes/public/pages/realizza/ConfiguratoreLanternePage';
import { PreventivoStampa3DPage } from '../routes/public/pages/realizza/PreventivoStampa3DPage';
import { RealizzaPage } from '../routes/public/pages/realizza/RealizzaPage';
import { RichiediProgettoPage } from '../routes/public/pages/realizza/RichiediProgettoPage';
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
 * (M-003 Sprint 2, `TSK-M003-WEB-D2`) and the twelve `esplora` / `realizza` /
 * `blog` / `printflow` routes below them (M-003 Sprint 3, `TSK-M003-WEB-D3`)
 * are real content destination pages replacing what previously fell through
 * to the catch-all `NotFound` -- they stay in the `public` boundary's eager
 * segment for the same reason `PublicHome` does.
 *
 * `printflow` stays Coming Soon (binding product boundary, not a judgment
 * call): `PrintFlowPage` carries no feature description beyond that.
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
        path: 'esplora',
        element: <EsploraPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'esplora/catalogo',
        element: <CatalogoPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'esplora/ispirati',
        element: <IspiratiPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'esplora/arte-in-stampa-3d',
        element: <ArteInStampa3DPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        // `DOC-UX-001` ("Distinzioni tassonomiche"): "Una stessa entità può
        // essere referenziata da più percorsi, ma non duplicata come
        // contenuto divergente" -- HueForge and "Arte in stampa 3D" are the
        // same landing per the IA doc, so this is a redirect to the single
        // canonical route rather than a second component with the same
        // copy. A redirect (over rendering the same component at two paths)
        // was chosen because it guarantees there is exactly one place this
        // content can diverge from, with no risk of the two routes'
        // `<h1>`/breadcrumb ever showing identical body copy under two
        // different page titles.
        path: 'esplora/hueforge',
        element: <Navigate to="/esplora/arte-in-stampa-3d" replace />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'realizza',
        element: <RealizzaPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'realizza/richiedi-progetto',
        element: <RichiediProgettoPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'realizza/preventivo-stampa-3d',
        element: <PreventivoStampa3DPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'realizza/configuratore-lanterne',
        element: <ConfiguratoreLanternePage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'realizza/assistenza-stampanti-3d',
        element: <AssistenzaStampantiPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
      },
      {
        path: 'printflow',
        element: <PrintFlowPage />,
        errorElement: <SegmentErrorBoundary segment="public" />,
        handle: { status: 'Coming Soon' },
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

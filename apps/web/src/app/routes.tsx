import { Navigate, type RouteObject } from 'react-router-dom';

import { AppShell } from './AppShell';
import { SegmentErrorBoundary } from './SegmentErrorBoundary';
import { NotFound } from '../routes/NotFound';
import { PublicHome } from '../routes/public/PublicHome';

/**
 * Route boundaries for M001-B: `public`, `account` and `command`.
 *
 * - `public` is the app's default-visible segment, but only `PublicHome`
 *   loads eagerly (first paint, `TSK-M003-WEB-D1`). Every other public
 *   destination page below uses React Router's `lazy` loader
 *   (`TSK-M003-WEB-D4`, `DOC-SEC-005`) -- the exact same code-splitting
 *   pattern `account` and `command` already used from Sprint 1 onward, now
 *   extended to the public segment's own destination pages so a visit to
 *   `/` doesn't ship all twenty-five content pages' JS up front.
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
 * to the catch-all `NotFound` -- they stay in the `public` boundary for the
 * same reason `PublicHome` does, they just no longer load eagerly.
 *
 * `printflow` stays Coming Soon (binding product boundary, not a judgment
 * call): `PrintFlowPage` carries no feature description beyond that.
 *
 * `esplora/hueforge` and the `*` catch-all stay eager: both resolve to a
 * built-in `react-router-dom` primitive (`Navigate`) or a trivial shared
 * fallback (`NotFound`) rather than a page-sized component, so there is no
 * meaningful bundle weight to defer.
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
        path: 'nolimits3d',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { Nolimits3DPage } = await import('../routes/public/pages/Nolimits3DPage');
          return { Component: Nolimits3DPage };
        },
      },
      {
        path: 'nolimits3d/chi-siamo',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { ChiSiamoPage } = await import('../routes/public/pages/ChiSiamoPage');
          return { Component: ChiSiamoPage };
        },
      },
      {
        path: 'nolimits3d/metodo',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { MetodoPage } = await import('../routes/public/pages/MetodoPage');
          return { Component: MetodoPage };
        },
      },
      {
        path: 'nolimits3d/qualita',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { QualitaPage } = await import('../routes/public/pages/QualitaPage');
          return { Component: QualitaPage };
        },
      },
      {
        path: 'nolimits3d/contatti',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { ContattiPage } = await import('../routes/public/pages/ContattiPage');
          return { Component: ContattiPage };
        },
      },
      {
        path: 'servizi',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { ServiziPage } = await import('../routes/public/pages/servizi/ServiziPage');
          return { Component: ServiziPage };
        },
      },
      {
        path: 'servizi/stampa-3d',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { Stampa3DPage } = await import('../routes/public/pages/servizi/Stampa3DPage');
          return { Component: Stampa3DPage };
        },
      },
      {
        path: 'servizi/progettazione-3d',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { Progettazione3DPage } =
            await import('../routes/public/pages/servizi/Progettazione3DPage');
          return { Component: Progettazione3DPage };
        },
      },
      {
        path: 'servizi/prototipazione',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { PrototipazionePage } =
            await import('../routes/public/pages/servizi/PrototipazionePage');
          return { Component: PrototipazionePage };
        },
      },
      {
        path: 'servizi/ricambi-personalizzati',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { RicambiPersonalizzatiPage } =
            await import('../routes/public/pages/servizi/RicambiPersonalizzatiPage');
          return { Component: RicambiPersonalizzatiPage };
        },
      },
      {
        path: 'servizi/piccole-serie',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { PiccoleSeriePage } =
            await import('../routes/public/pages/servizi/PiccoleSeriePage');
          return { Component: PiccoleSeriePage };
        },
      },
      {
        path: 'realizzazioni',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { RealizzazioniPage } = await import('../routes/public/pages/RealizzazioniPage');
          return { Component: RealizzazioniPage };
        },
      },
      {
        path: 'eventi',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { EventiPage } = await import('../routes/public/pages/EventiPage');
          return { Component: EventiPage };
        },
      },
      {
        path: 'esplora',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { EsploraPage } = await import('../routes/public/pages/esplora/EsploraPage');
          return { Component: EsploraPage };
        },
      },
      {
        path: 'esplora/catalogo',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { CatalogoPage } = await import('../routes/public/pages/esplora/CatalogoPage');
          return { Component: CatalogoPage };
        },
      },
      {
        path: 'esplora/ispirati',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { IspiratiPage } = await import('../routes/public/pages/esplora/IspiratiPage');
          return { Component: IspiratiPage };
        },
      },
      {
        path: 'esplora/arte-in-stampa-3d',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { ArteInStampa3DPage } =
            await import('../routes/public/pages/esplora/ArteInStampa3DPage');
          return { Component: ArteInStampa3DPage };
        },
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
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { RealizzaPage } = await import('../routes/public/pages/realizza/RealizzaPage');
          return { Component: RealizzaPage };
        },
      },
      {
        path: 'realizza/richiedi-progetto',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { RichiediProgettoPage } =
            await import('../routes/public/pages/realizza/RichiediProgettoPage');
          return { Component: RichiediProgettoPage };
        },
      },
      {
        path: 'realizza/preventivo-stampa-3d',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { PreventivoStampa3DPage } =
            await import('../routes/public/pages/realizza/PreventivoStampa3DPage');
          return { Component: PreventivoStampa3DPage };
        },
      },
      {
        path: 'realizza/configuratore-lanterne',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { ConfiguratoreLanternePage } =
            await import('../routes/public/pages/realizza/ConfiguratoreLanternePage');
          return { Component: ConfiguratoreLanternePage };
        },
      },
      {
        path: 'realizza/assistenza-stampanti-3d',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { AssistenzaStampantiPage } =
            await import('../routes/public/pages/realizza/AssistenzaStampantiPage');
          return { Component: AssistenzaStampantiPage };
        },
      },
      {
        path: 'blog',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { BlogPage } = await import('../routes/public/pages/BlogPage');
          return { Component: BlogPage };
        },
      },
      {
        path: 'printflow',
        errorElement: <SegmentErrorBoundary segment="public" />,
        handle: { status: 'Coming Soon' },
        lazy: async () => {
          const { PrintFlowPage } = await import('../routes/public/pages/PrintFlowPage');
          return { Component: PrintFlowPage };
        },
      },
      {
        path: 'carrello',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { CarrelloPage } = await import('../routes/public/pages/CarrelloPage');
          return { Component: CarrelloPage };
        },
      },
      {
        path: 'ricerca',
        errorElement: <SegmentErrorBoundary segment="public" />,
        lazy: async () => {
          const { RicercaPage } = await import('../routes/public/pages/RicercaPage');
          return { Component: RicercaPage };
        },
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

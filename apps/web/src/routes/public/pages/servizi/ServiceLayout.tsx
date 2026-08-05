import { useLocation } from 'react-router-dom';

import { PageLayout } from '../PageLayout';
import { getPageTitle } from '../pageMeta';

/**
 * Shared body for the five `/servizi/*` detail pages (task packet item 5,
 * "Possono realizzare quello che mi serve?"). The IA's "Servizi" primary
 * section already lists the exact category set these five routes cover
 * (`DOC-UX-001`: "stampa, modellazione, prototipazione, piccole serie,
 * ricambi, assistenza"), and `navigation.ts`'s `footerSitemapSections`
 * already carries the approved real title for each of these five paths --
 * both the page's `<h1>` (via `PageLayout`) and this placeholder copy read
 * that same title from the current route, so nothing here is hardcoded per
 * service and the five wrapper pages
 * (`Stampa3DPage.tsx`, `Progettazione3DPage.tsx`, `PrototipazionePage.tsx`,
 * `RicambiPersonalizzatiPage.tsx`, `PiccoleSeriePage.tsx`) stay real,
 * distinct components with no per-service data of their own. Detailed
 * service descriptions are placeholder -- the wireframe gives no per-service
 * copy beyond the category label.
 */
export function ServiceLayout() {
  const { pathname } = useLocation();
  const title = getPageTitle(pathname);

  return (
    <PageLayout>
      <p className="home-section__question">Possono realizzare quello che mi serve?</p>
      <p className="placeholder-note">
        [PLACEHOLDER: descrizione dettagliata del servizio &quot;{title}&quot; — processo, tempi e
        prezzi indicativi da confermare con Andrea.]
      </p>
      <p className="placeholder-note">
        [PLACEHOLDER: esempi/galleria di lavori per &quot;{title}&quot; — in attesa di media reali.]
      </p>
    </PageLayout>
  );
}

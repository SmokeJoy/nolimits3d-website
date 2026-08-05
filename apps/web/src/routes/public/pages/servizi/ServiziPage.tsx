import { SectionLandingPage } from '../SectionLandingPage';

/**
 * `/servizi` -- section landing page. Fixes a real dead link: `GlobalNav`/
 * `Footer` have linked to `/servizi` since Sprint 2 (`TSK-M003-WEB-D2`), but
 * only the five child service pages were ever registered as routes, never
 * this section index -- confirmed 404 (`Project_Atlas_Team_Workspace/05_Evidence/M003/sprint4/EV-01-tseo-f001-ssr-gap.md`
 * and `generate-sitemap.ts`'s Sprint 4 comment both recorded it rather than
 * silently leaving it broken). The lede is `DOC-UX-001`'s own "Navigazione
 * primaria candidata" bullet for Servizi, verbatim.
 */
export function ServiziPage() {
  return (
    <SectionLandingPage sectionHeading="Servizi">
      <p className="home-section__lede">
        Servizi: stampa, modellazione, prototipazione, piccole serie, ricambi, assistenza.
      </p>
    </SectionLandingPage>
  );
}

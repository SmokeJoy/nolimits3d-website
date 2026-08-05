import { SectionLandingPage } from '../SectionLandingPage';

/**
 * `/realizza` -- section landing (task packet item 6), explaining the four
 * sub-intents below it. The lede is `DOC-UX-001`'s own "Navigazione
 * primaria candidata" bullet for Realizza, verbatim.
 */
export function RealizzaPage() {
  return (
    <SectionLandingPage sectionHeading="Realizza">
      <p className="home-section__lede">
        Realizza: nuovo progetto, stampa STL, personalizzazione, lanterna personale,
        progettazione/assistenza.
      </p>
    </SectionLandingPage>
  );
}

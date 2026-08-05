import { Link } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@atlas/ui';

import { primaryNavSections } from '../navigation';

/**
 * Section 1 -- First viewport (`HOME-F-001`, `HOME-F-002`).
 *
 * The six intent cards reuse the six primary IA sections (`DOC-UX-001`):
 * the wireframe spec does not enumerate a distinct set of "intents", and the
 * IA's own "Regole" explicitly ties the Home intent selector to the sitemap
 * ("L'intent selector Home non sostituisce sitemap, heading, testo o link
 * crawlable"). Each card is a real `<a href>` (via `Link`), satisfying
 * HOME-F-002's "raggiungibile come link semantico e crawlable".
 *
 * All six cards are always in the DOM and always visible -- no "3 + show
 * more" collapse. The mobile spec's bottom-sheet suggestion is one way to
 * satisfy "tutti e sei gli intenti presenti nel DOM e raggiungibili come
 * link"; always rendering all six satisfies that same requirement directly
 * without new interactive/disclosure surface area.
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="home-section"
      data-testid="home-section-hero"
    >
      <h1 id="home-hero-heading" className="home-section__hero-heading">
        [PLACEHOLDER H1 — confirm hero headline with Andrea. Wireframe candidate: &quot;Hai
        un&apos;idea? Diamo forma ai tuoi progetti.&quot;]
      </h1>
      <p className="placeholder-note">
        [PLACEHOLDER: hero supporting line — confirm with Andrea. Wireframe candidate: &quot;stampa
        3D, progettazione, prototipi, ricambi e creazioni personalizzate a Frosinone e online, con
        qualità professionale e prezzi trasparenti&quot;.]
      </p>

      <p className="placeholder-note">
        [PLACEHOLDER: hero visual — foto o render reale in attesa del Brand Asset Gate. HOME-NF-003:
        nessun media AI/render può essere presentato come prova reale.]
      </p>

      <p className="placeholder-note">
        [PLACEHOLDER: trust indicator — solo indicatori verificabili, da confermare con Andrea prima
        della pubblicazione.]
      </p>

      {/* `<h2>`, not `<p>`: this text already reads and is styled as the
          heading for the six intent cards below it -- as a paragraph it left
          the cards' `CardTitle` (`<h3>`, `@atlas/ui`) jumping straight from
          the page's `<h1>`, an axe `heading-order` violation
          (`TSK-M003-WEB-D4`; see
          `Project_Atlas_Team_Workspace/05_Evidence/M003/sprint4/EV-05-axe-a11y-findings.md`). */}
      <h2 className="home-section__question">Cosa vuoi realizzare oggi?</h2>

      <ul className="intent-grid">
        {primaryNavSections.map((section) => (
          <li key={section.to}>
            <Link to={section.to} className="intent-card-link">
              <Card variant="outline">
                <CardHeader>
                  <CardTitle>{section.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="placeholder-note">
                    [PLACEHOLDER: descrizione intento &quot;{section.label}&quot; — da confermare]
                  </p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>

      <div className="cta-row">
        <Link to="/realizza/richiedi-progetto" className="cta-link cta-link--primary">
          Inizia il tuo progetto
        </Link>
        <Link to="/realizzazioni" className="cta-link cta-link--secondary">
          Scopri cosa possiamo realizzare
        </Link>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';

/**
 * Section 10 -- "Chiusura conversazionale" (`HOME-F-009`).
 *
 * Closing question and both CTA labels are copied verbatim from the
 * wireframe spec. Neither CTA has a real configured channel yet (no chat,
 * booking or phone integration), so both route to the real `Contatti` page
 * from the sitemap rather than a fabricated contact mechanism. CTAs are
 * plain styled `Link`s, not `Button` -- see `public-layout.css`'s
 * `.cta-link` comment for why.
 */
export function ClosingSection() {
  return (
    <section
      aria-labelledby="home-closing-heading"
      className="home-section"
      data-testid="home-section-closing"
    >
      <h2 id="home-closing-heading" className="home-section__heading">
        Chiusura conversazionale
      </h2>
      <p className="home-section__question">Qual è il progetto che hai in mente?</p>
      <div className="cta-row">
        <Link to="/nolimits3d/contatti" className="cta-link cta-link--primary">
          Iniziamo insieme
        </Link>
        <Link to="/nolimits3d/contatti" className="cta-link cta-link--secondary">
          Parliamone
        </Link>
      </div>
    </section>
  );
}

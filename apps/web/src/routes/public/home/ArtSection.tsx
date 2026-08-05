import { Link } from 'react-router-dom';

/**
 * Section 5 -- "Arte in stampa 3D" (`HOME-F-006`).
 *
 * The HueForge explanation and gallery are placeholder (no real media, no
 * approved explanatory copy). Both CTAs here fall outside the four
 * pre-approved CTA labels, so their visible text is placeholder too. CTAs
 * are plain styled `Link`s, not `Button` -- see `public-layout.css`'s
 * `.cta-link` comment for why.
 */
export function ArtSection() {
  return (
    <section
      aria-labelledby="home-art-heading"
      className="home-section"
      data-testid="home-section-art"
    >
      <h2 id="home-art-heading" className="home-section__heading">
        Arte in stampa 3D
      </h2>
      <p className="placeholder-note">
        [PLACEHOLDER: spiegazione breve di HueForge — copia da confermare con Andrea.]
      </p>
      <p className="placeholder-note">
        [PLACEHOLDER: galleria reale — quadri e lanterne HueForge, in attesa di media reali.]
      </p>
      <div className="cta-row">
        <Link to="/realizza/configuratore-lanterne" className="cta-link cta-link--primary">
          [PLACEHOLDER: testo CTA configuratore]
        </Link>
        <Link to="/realizza/richiedi-progetto" className="cta-link cta-link--secondary">
          [PLACEHOLDER: testo CTA richiesta personale]
        </Link>
      </div>
    </section>
  );
}

/**
 * Section 7 -- "Fiducia e Andrea" (`HOME-F-007`).
 *
 * The whole section is "chi è Andrea" biographical/trust content, the
 * category the placeholder policy calls out by name: photo, first-person
 * bio, the quality/pricing/materials claims and reviews all ship as
 * explicit placeholders. Nothing here is presented as confirmed.
 */
export function TrustSection() {
  return (
    <section
      aria-labelledby="home-trust-heading"
      className="home-section"
      data-testid="home-section-trust"
    >
      <h2 id="home-trust-heading" className="home-section__heading">
        Fiducia e Andrea
      </h2>

      <p className="placeholder-note">
        [PLACEHOLDER: foto autentica di Andrea in laboratorio — in attesa del Brand Asset Gate.]
      </p>
      <p className="placeholder-note">
        [PLACEHOLDER: presentazione in prima persona di Andrea — biografia da confermare.]
      </p>
      <p className="placeholder-note">
        [PLACEHOLDER: dettagli su controllo qualità, prezzi trasparenti, rapporto diretto e
        materiali — da confermare con Andrea prima della pubblicazione.]
      </p>
      <p className="placeholder-note">
        [PLACEHOLDER: FAQ — domande e risposte da definire con Andrea.]
      </p>
      <p className="placeholder-note">
        [PLACEHOLDER: recensioni verificabili — in attesa di raccolta e consenso alla
        pubblicazione.]
      </p>
    </section>
  );
}

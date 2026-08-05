import { PageLayout } from './PageLayout';

/**
 * `/nolimits3d/chi-siamo` -- "Posso fidarmi?" (`DOC-UX-001`, "Domanda per
 * pagina"). Per the Sprint 2 task packet (item 1), this page's content is
 * the same placeholder category already shipped on the homepage's
 * `TrustSection` (`apps/web/src/routes/public/home/TrustSection.tsx`):
 * Andrea's photo, first-person bio, and the quality/pricing/materials
 * claims. The exact same placeholder strings are reused verbatim here, not
 * reworded -- the task packet is explicit that unconfirmed facts don't get
 * new invented wording just because they appear on a second page.
 */
export function ChiSiamoPage() {
  return (
    <PageLayout>
      <p className="home-section__question">Posso fidarmi?</p>
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
    </PageLayout>
  );
}

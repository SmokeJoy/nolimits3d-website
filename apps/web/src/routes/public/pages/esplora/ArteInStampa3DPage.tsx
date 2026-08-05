import { Link } from 'react-router-dom';

import { PageLayout } from '../PageLayout';

/**
 * `/esplora/arte-in-stampa-3d` -- "Che cos'è questa forma d'arte e come
 * posso averla?" (`DOC-UX-001`). HueForge landing, wireframe section 5
 * "Arte in stampa 3D" (task packet item 4). Mirrors the homepage's
 * `ArtSection` (`apps/web/src/routes/public/home/ArtSection.tsx`) closely
 * -- same placeholder explanation, gallery placeholder, and CTA placeholder
 * labels -- per the task packet's explicit instruction not to invent new
 * wording for the same unconfirmed content on a second page.
 *
 * `/esplora/hueforge` (`DOC-UX-001`'s "Distinzioni tassonomiche": "Una
 * stessa entità può essere referenziata da più percorsi, ma non duplicata
 * come contenuto divergente") is a redirect to this route rather than a
 * second copy of this component -- see the comment on that route in
 * `apps/web/src/app/routes.tsx` for why a redirect was chosen over a
 * shared component rendered at two paths.
 */
export function ArteInStampa3DPage() {
  return (
    <PageLayout>
      <p className="home-section__question">
        Che cos&apos;è questa forma d&apos;arte e come posso averla?
      </p>
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
    </PageLayout>
  );
}

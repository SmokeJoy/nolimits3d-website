import { StatusIndicator } from '@atlas/ui';
import { Link } from 'react-router-dom';

import { PageLayout } from './PageLayout';

interface FutureFeatureNoticeProps {
  /** Verbatim question from `DOC-UX-001`'s "Domanda per pagina" table, when one exists for this route. */
  question?: string;
  /** Italian description of the not-yet-built feature, used inside the `StatusIndicator` label. */
  featureLabel: string;
}

/**
 * Shared body for `/esplora/catalogo`, `/realizza/richiedi-progetto`,
 * `/realizza/preventivo-stampa-3d`, `/realizza/configuratore-lanterne` and
 * `/realizza/assistenza-stampanti-3d` (`TSK-M003-WEB-D3`, task packet items
 * 2, 7, 8, 9, 10).
 *
 * These five routes each front a future *transactional* surface (commerce,
 * project intake, quote calculator, 3D configurator, support intake) with
 * no backend in this milestone. This sprint's placeholder/honesty policy is
 * sharper than Sprint 1/2's: marking unconfirmed *content* with
 * `[PLACEHOLDER: ...]` is not enough here, because the thing that's
 * missing is *functionality*, not copy. A placeholder product grid with
 * invented prices, or a form with real `<input>`/submit elements that goes
 * nowhere, would still visually read as "try me" to a real visitor and
 * mislead them into thinking they can transact.
 *
 * So this component renders no `<form>`, no `<input>`, no price, no
 * product data of any kind -- only a `StatusIndicator` (already the
 * project's system-state primitive, used the same way on `/eventi`) that
 * plainly states the feature isn't available yet, plus a real `Link` to
 * the already-live `/nolimits3d/contatti` page as the honest alternative.
 */
export function FutureFeatureNotice({ question, featureLabel }: FutureFeatureNoticeProps) {
  return (
    <PageLayout>
      {question ? <p className="home-section__question">{question}</p> : null}
      <StatusIndicator status="info" label={`${featureLabel} non è ancora disponibile online.`} />
      <p className="home-section__lede">
        Nel frattempo, contattaci direttamente:{' '}
        <Link to="/nolimits3d/contatti" className="cta-link cta-link--primary">
          vai alla pagina Contatti
        </Link>
      </p>
    </PageLayout>
  );
}

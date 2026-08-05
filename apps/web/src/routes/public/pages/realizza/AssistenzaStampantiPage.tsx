import { FutureFeatureNotice } from '../FutureFeatureNotice';

/**
 * `/realizza/assistenza-stampanti-3d` (task packet item 10): future
 * support intake, not faked -- no support ticket form. `DOC-UX-001`'s
 * "Domanda per pagina" table has no dedicated row for this route, so no
 * question is invented. See `FutureFeatureNotice`.
 */
export function AssistenzaStampantiPage() {
  return <FutureFeatureNotice featureLabel="La richiesta di assistenza online" />;
}

import { FutureFeatureNotice } from '../FutureFeatureNotice';

/**
 * `/realizza/richiedi-progetto` (task packet item 7): future intake form,
 * not something to fake with a non-functional form. `DOC-UX-001`'s
 * "Domanda per pagina" table has no dedicated row for this route, so no
 * question is invented -- only the honest "not yet available" state and
 * the real path to Andrea. See `FutureFeatureNotice`.
 */
export function RichiediProgettoPage() {
  return <FutureFeatureNotice featureLabel="La richiesta di un nuovo progetto online" />;
}

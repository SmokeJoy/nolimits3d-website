import { FutureFeatureNotice } from './FutureFeatureNotice';

/**
 * `/carrello` -- fixes the same class of dead link as `ServiziPage`/
 * `Nolimits3DPage`, but with the `FutureFeatureNotice` treatment
 * (`TSK-M003-WEB-D3` pattern) instead of a `SectionLandingPage`: a cart has
 * no real content without a real catalog behind it, and the catalog itself
 * is already explicitly deferred pending real business data from Andrea. No
 * fake cart UI, no fake item list.
 */
export function CarrelloPage() {
  return <FutureFeatureNotice featureLabel="Il carrello" />;
}

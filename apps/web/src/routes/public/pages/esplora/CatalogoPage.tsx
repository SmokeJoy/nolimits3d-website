import { FutureFeatureNotice } from '../FutureFeatureNotice';

/**
 * `/esplora/catalogo` -- "C'è già qualcosa adatto a me?" (`DOC-UX-001`).
 * Task packet item 2: this is explicitly a future commerce surface, not a
 * placeholder-product grid pretending to be real inventory. See
 * `FutureFeatureNotice` for the shared "not yet available" pattern used
 * across all five future-functionality pages in this sprint -- no fake
 * products, no fake prices, just a structurally correct route with a plain
 * status message and a real path to Andrea.
 */
export function CatalogoPage() {
  return (
    <FutureFeatureNotice
      question="C'è già qualcosa adatto a me?"
      featureLabel="Il catalogo prodotti"
    />
  );
}

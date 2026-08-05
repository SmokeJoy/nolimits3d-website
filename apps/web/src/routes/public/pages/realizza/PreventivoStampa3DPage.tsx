import { FutureFeatureNotice } from '../FutureFeatureNotice';

/**
 * `/realizza/preventivo-stampa-3d` -- "Quanto potrebbe costare e cosa
 * succede dopo?" (`DOC-UX-001`). Task packet item 8: future quote
 * calculator, not faked -- no invented prices or interactive calculator
 * UI. See `FutureFeatureNotice`.
 */
export function PreventivoStampa3DPage() {
  return (
    <FutureFeatureNotice
      question="Quanto potrebbe costare e cosa succede dopo?"
      featureLabel="Il calcolo del preventivo"
    />
  );
}

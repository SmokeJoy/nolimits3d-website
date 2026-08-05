import { Badge, Card, CardContent, CardHeader, CardTitle } from '@atlas/ui';

import { PageLayout } from './PageLayout';

/**
 * `/realizzazioni` -- "Lo hanno già fatto o sanno affrontarlo?"
 * (`DOC-UX-001`). Entirely placeholder content (task packet item 6): no
 * real project photos or descriptions exist yet. The grid/card structure
 * itself is real, matching the same pattern already used by the homepage's
 * `AuthenticProofSection`.
 */
const placeholderCases = [1, 2, 3, 4, 5, 6];

export function RealizzazioniPage() {
  return (
    <PageLayout>
      <p className="home-section__question">Lo hanno già fatto o sanno affrontarlo?</p>
      <ul className="card-grid">
        {placeholderCases.map((index) => (
          <li key={index}>
            <Card variant="outline">
              <CardHeader>
                <Badge variant="outline">[PLACEHOLDER: tipo media]</Badge>
                <CardTitle>[PLACEHOLDER: titolo progetto #{index}]</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="placeholder-note">
                  [PLACEHOLDER: descrizione progetto — prova autentica da confermare con Andrea
                  prima della pubblicazione.]
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}

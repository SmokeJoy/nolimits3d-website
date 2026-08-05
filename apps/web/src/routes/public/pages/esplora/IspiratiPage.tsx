import { Badge, Card, CardContent, CardHeader, CardTitle } from '@atlas/ui';

import { PageLayout } from '../PageLayout';

/**
 * `/esplora/ispirati` -- discovery rail (task packet item 3). Same
 * placeholder-card pattern as `/realizzazioni`
 * (`apps/web/src/routes/public/pages/RealizzazioniPage.tsx`): no real
 * discovery content exists yet, but the grid structure is real. Unlike the
 * five future-functionality pages in this sprint, this route isn't a
 * transactional surface -- Sprint 1/2's ordinary content-placeholder policy
 * applies here, not the sharper honesty policy. The lede is the homepage
 * `DiscoverySection`'s own definition for "Ispirati", reused verbatim
 * rather than reworded.
 */
const placeholderItems = [1, 2, 3, 4, 5, 6];

export function IspiratiPage() {
  return (
    <PageLayout>
      <p className="home-section__lede">
        Rail trasversale di prodotti, casi, HueForge, lanterne, ricambi e guide.
      </p>
      <ul className="card-grid">
        {placeholderItems.map((index) => (
          <li key={index}>
            <Card variant="outline">
              <CardHeader>
                <Badge variant="outline">[PLACEHOLDER: tipo contenuto]</Badge>
                <CardTitle>[PLACEHOLDER: titolo contenuto #{index}]</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="placeholder-note">
                  [PLACEHOLDER: contenuto discovery — prodotto, caso, arte o guida da confermare con
                  Andrea prima della pubblicazione.]
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}

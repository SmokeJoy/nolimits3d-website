import { Badge, Card, CardContent, CardHeader, CardTitle } from '@atlas/ui';

import { PageLayout } from './PageLayout';

/**
 * `/blog` -- "Hanno davvero competenza?" (`DOC-UX-001`, "Domanda per
 * pagina": Blog/Guide). Task packet item 11: index landing with a
 * placeholder article list -- no real posts exist yet. Same card-grid
 * pattern already used by `/realizzazioni` and `/esplora/ispirati`.
 */
const placeholderPosts = [1, 2, 3];

export function BlogPage() {
  return (
    <PageLayout>
      {/* `<h2>`, not `<p>`: fixes an axe `heading-order` violation -- see
          `HeroSection.tsx` for the identical reasoning. */}
      <h2 className="home-section__question">Hanno davvero competenza?</h2>
      <ul className="card-grid">
        {placeholderPosts.map((index) => (
          <li key={index}>
            <Card variant="outline">
              <CardHeader>
                <Badge variant="outline">[PLACEHOLDER: categoria articolo]</Badge>
                <CardTitle>[PLACEHOLDER: titolo articolo #{index}]</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="placeholder-note">
                  [PLACEHOLDER: estratto articolo — nessun contenuto reale pubblicato ancora.]
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}

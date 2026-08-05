import { Link } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@atlas/ui';

/**
 * Section 4 -- "Realizzazioni e Ispirati" (`HOME-F-005`).
 *
 * The three descriptions are taxonomy definitions given verbatim in two
 * authoritative documents (IA's "Distinzioni tassonomiche" and the
 * wireframe's own section 4 bullets), not invented marketing copy, so they
 * ship as real text rather than placeholders.
 */
const distinctions = [
  {
    title: 'Realizzazioni',
    to: '/realizzazioni',
    description: 'Prove e casi autentici.',
  },
  {
    title: 'Ispirati',
    to: '/esplora/ispirati',
    description: 'Rail trasversale di prodotti, casi, HueForge, lanterne, ricambi e guide.',
  },
  {
    title: 'Catalogo',
    to: '/esplora/catalogo',
    description: "Offerte acquistabili o configurabili, separato e orientato all'acquisto.",
  },
];

export function DiscoverySection() {
  return (
    <section
      aria-labelledby="home-discovery-heading"
      className="home-section"
      data-testid="home-section-discovery"
    >
      <h2 id="home-discovery-heading" className="home-section__heading">
        Realizzazioni e Ispirati
      </h2>
      <ul className="card-grid">
        {distinctions.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="intent-card-link">
              <Card variant="outline">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

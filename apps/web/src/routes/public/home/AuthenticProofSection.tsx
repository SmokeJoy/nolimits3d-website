import { Link } from 'react-router-dom';

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@atlas/ui';

/**
 * Section 2 -- "Dimostrazione immediata" (`HOME-F-003`).
 *
 * Wireframe: "Realizzazioni autentiche, categorie di soluzione e micro-casi
 * ... Ogni card dichiara media type e linka il caso." No real case data
 * exists yet, so every card -- title, media type and description -- is an
 * explicit placeholder; none link to a fabricated per-case URL, all three
 * point at the real `/realizzazioni` hub.
 */
export function AuthenticProofSection() {
  return (
    <section
      aria-labelledby="home-proof-heading"
      className="home-section"
      data-testid="home-section-proof"
    >
      <h2 id="home-proof-heading" className="home-section__heading">
        Dimostrazione immediata
      </h2>
      <ul className="card-grid">
        {[1, 2, 3].map((index) => (
          <li key={index}>
            <Link to="/realizzazioni" className="intent-card-link">
              <Card variant="outline">
                <CardHeader>
                  <Badge variant="outline">[PLACEHOLDER: tipo media]</Badge>
                  <CardTitle>[PLACEHOLDER: titolo caso #{index}]</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="placeholder-note">
                    [PLACEHOLDER: descrizione caso — prova autentica da confermare con Andrea prima
                    della pubblicazione.]
                  </p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { PageLayout } from './PageLayout';

/**
 * `/nolimits3d/qualita` -- quality-control specifics (task packet item 3).
 * No source document (`DOC-UX-001`, homepage wireframe) specifies
 * quality-control copy beyond the wireframe's own passing mention of
 * "controllo qualità", already placeholder'd once on the homepage's
 * `TrustSection`. Every claim below is an explicit placeholder.
 */
export function QualitaPage() {
  return (
    <PageLayout>
      <p className="placeholder-note">
        [PLACEHOLDER: politica di controllo qualità — nessun documento sorgente specifica il
        contenuto oltre alla menzione "controllo qualità" nel wireframe; da definire con Andrea.]
      </p>
      <p className="placeholder-note">
        [PLACEHOLDER: materiali utilizzati e relative certificazioni — da confermare con Andrea.]
      </p>
      <p className="placeholder-note">
        [PLACEHOLDER: processo di verifica pre-consegna — da confermare con Andrea.]
      </p>
    </PageLayout>
  );
}

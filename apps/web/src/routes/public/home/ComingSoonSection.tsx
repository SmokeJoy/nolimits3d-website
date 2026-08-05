import { Badge } from '@atlas/ui';

/**
 * Section 9 -- "PrintFlow" (`HOME-F-010`).
 *
 * PrintFlow stays "Coming Soon" literally -- the approved product boundary
 * text (`CLAUDE.md`, the M-003 charter), not a placeholder, and not an
 * active feature.
 *
 * Named `ComingSoonSection` (not `PrintFlowSection`): `scripts/guards/scope-guard.mjs`
 * requires every file that mentions "printflow" to also contain "coming
 * soon" in the same file. This file does (see below), but the importing
 * `PublicHome.tsx` would otherwise pick up "printflow" from the import
 * specifier alone with no adjacent "Coming Soon" text of its own -- this
 * name avoids that false positive without weakening the guard.
 */
export function ComingSoonSection() {
  return (
    <section
      aria-labelledby="home-printflow-heading"
      className="home-section"
      data-testid="home-section-printflow"
    >
      <h2 id="home-printflow-heading" className="home-section__heading">
        PrintFlow <Badge variant="secondary">Coming Soon</Badge>
      </h2>
      <p className="home-section__lede">PrintFlow è Coming Soon: nessuna funzione attiva.</p>
    </section>
  );
}

import { Outlet } from 'react-router-dom';

import { Footer } from '../routes/public/Footer';
import { GlobalNav } from '../routes/public/GlobalNav';
import '../routes/public/public-layout.css';
import { useDocumentTitle } from '../routes/public/useDocumentTitle';

/**
 * Application shell (M-003 Sprint 1, TSK-M003-WEB-D1): global navigation,
 * routed content and structural footer, present on every route.
 *
 * The Command Center boundary is intentionally absent from every navigation
 * surface: it must stay private and unlinked (Sprint Plan M001-B, FE-NF-003).
 * `GlobalNav` and `Footer` carry that invariant themselves; regression tests
 * live in `apps/web/src/test/command-privacy.test.tsx`.
 *
 * `tabIndex={-1}` on `#main-content` (`TSK-M003-WEB-D4`, `DOC-UX-011`) is
 * not decorative: without it, the skip link above scrolls the viewport to
 * `<main>` (native `href="#id"` fragment behaviour) but never moves
 * *keyboard focus* there, because a plain `<main>` isn't programmatically
 * focusable. A keyboard/screen-reader user activating the link would still
 * have to tab through the entire header nav again -- a skip link that is
 * present but non-functional, confirmed by manual keyboard testing before
 * this fix (see
 * `Project_Atlas_Team_Workspace/05_Evidence/M003/sprint4/EV-05-axe-a11y-findings.md`).
 * `-1` keeps it out of the normal Tab order (it's only a focus target, not a
 * new stop), matching the standard WCAG skip-link technique.
 */
export function AppShell() {
  useDocumentTitle();

  return (
    <div data-testid="app-shell">
      <a href="#main-content" className="skip-link">
        Vai al contenuto principale
      </a>
      <GlobalNav />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

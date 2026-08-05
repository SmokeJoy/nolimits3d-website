import { Outlet } from 'react-router-dom';

import { Footer } from '../routes/public/Footer';
import { GlobalNav } from '../routes/public/GlobalNav';
import '../routes/public/public-layout.css';

/**
 * Application shell (M-003 Sprint 1, TSK-M003-WEB-D1): global navigation,
 * routed content and structural footer, present on every route.
 *
 * The Command Center boundary is intentionally absent from every navigation
 * surface: it must stay private and unlinked (Sprint Plan M001-B, FE-NF-003).
 * `GlobalNav` and `Footer` carry that invariant themselves; regression tests
 * live in `apps/web/src/test/command-privacy.test.tsx`.
 */
export function AppShell() {
  return (
    <div data-testid="app-shell">
      <a href="#main-content" className="skip-link">
        Vai al contenuto principale
      </a>
      <GlobalNav />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

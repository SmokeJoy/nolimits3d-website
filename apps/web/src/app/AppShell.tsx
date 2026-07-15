import { Link, Outlet } from 'react-router-dom';

/**
 * Minimal application shell for M001-B.
 *
 * The Command Center boundary is intentionally absent from every navigation
 * surface: it must stay private and unlinked (Sprint Plan M001-B, FE-NF-003).
 */
export function AppShell() {
  return (
    <div data-testid="app-shell">
      <header>
        <p>NoLimits3D</p>
        <nav aria-label="Navigazione principale">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Area clienti</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>NoLimits3D — piattaforma in costruzione</p>
      </footer>
    </div>
  );
}

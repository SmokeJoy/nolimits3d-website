import { Link } from 'react-router-dom';

import { alwaysAccessibleLinks, primaryNavSections } from './navigation';

/**
 * Global site header: brand mark, the six primary IA sections
 * (`DOC-UX-001`) and the "always accessible" utility links.
 *
 * Deliberately not a JS/CSS collapsible "hamburger" menu: every link is
 * always present in the DOM and always visible, laid out with CSS
 * `flex-wrap` (`public-layout.css`). That trades a denser header on narrow
 * viewports for zero hidden/toggle state -- nothing to break when resized,
 * fully usable without hover, fully keyboard-reachable via native `<a>`
 * focus order, and works with CSS or JavaScript disabled. `@atlas/ui` has no
 * drawer/accordion primitive in the M-002 inventory this task is scoped to,
 * so a hand-rolled disclosure widget would be new, untested surface area for
 * a Sprint 1 structural skeleton.
 *
 * The `command` boundary (`apps/web/src/routes/command/`) is never
 * referenced here -- it must stay unlinked from every navigation surface
 * (FE-NF-003, enforced by `scripts/guards/scope-guard.mjs` and regression
 * tests in `apps/web/src/test/command-privacy.test.tsx`).
 */
export function GlobalNav() {
  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand">
        NoLimits3D
      </Link>
      <div className="site-header__nav-group">
        <nav aria-label="Navigazione principale">
          <ul className="site-nav__list">
            {primaryNavSections.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Link sempre accessibili">
          <ul className="utility-nav__list">
            {alwaysAccessibleLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

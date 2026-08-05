import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { appRoutes } from '../app/routes';

function renderAt(initialPath: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialPath] });
  return render(<RouterProvider router={router} />);
}

/**
 * Manual keyboard-reachability verification (`TSK-M003-WEB-D4`, `DOC-UX-011`)
 * for `GlobalNav`, `Footer` and the homepage intent cards, plus the
 * skip-link/`#main-content` focus contract.
 *
 * `jsdom` does not implement the browser's native same-document fragment
 * navigation "focus fixup" (confirmed empirically: `fireEvent.click` on
 * `<a href="#main-content">` never changes `document.activeElement` in
 * jsdom, unlike a real browser), so this suite checks the two things jsdom
 * *can* prove reliably --
 *
 * 1. every interactive element here is a real, unmodified native `<a href>`
 *    (no `tabindex="-1"`, no `role` override stripping its link semantics) --
 *    which is what makes it keyboard-reachable at all, per the HTML spec,
 *    without needing to simulate a Tab key press; and
 * 2. `#main-content` is genuinely programmatically focusable (`tabIndex`
 *    -1 + a successful `.focus()` call moves `document.activeElement`
 *    there), the structural precondition the skip link depends on --
 *
 * and defers the *actual* Tab-key traversal and skip-link click to the real
 * browser (`pnpm --filter @atlas/web dev` + this task's browser check), the
 * authoritative source for this deliverable per the task packet's own
 * instruction to verify "via the real browser, not just axe". Findings from
 * that browser pass are recorded in
 * `Project_Atlas_Team_Workspace/05_Evidence/M003/sprint4/EV-05-axe-a11y-findings.md`.
 */
describe('Skip link focus contract (TSK-M003-WEB-D4)', () => {
  it('points #main-content and keeps it out of the normal Tab order while still focusable', () => {
    renderAt('/');

    const skipLink = screen.getByRole('link', { name: 'Vai al contenuto principale' });
    expect(skipLink).toHaveAttribute('href', '#main-content');

    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
    // `tabIndex` -1 makes an otherwise non-interactive element
    // programmatically focusable (what the skip link needs) without adding
    // it as a *new* stop in the regular Tab sequence.
    expect(main).toHaveAttribute('tabindex', '-1');

    main.focus();
    expect(main).toHaveFocus();
  });
});

describe('GlobalNav keyboard reachability (TSK-M003-WEB-D4)', () => {
  it('keeps every primary-nav and utility-nav link a real, focusable <a>', () => {
    renderAt('/');

    const header = screen.getByRole('banner');
    const links = within(header).getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);

    for (const link of links) {
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('tabindex')).not.toBe('-1');

      link.focus();
      expect(link).toHaveFocus();
    }
  });
});

describe('Footer keyboard reachability (TSK-M003-WEB-D4)', () => {
  it('keeps every sitemap, "Altro" and contact link a real, focusable <a>', () => {
    renderAt('/');

    const footer = screen.getByRole('contentinfo');
    // Includes mailto:/tel: links and the plain cross-app "Informazioni
    // legali" anchor -- all real <a> elements, all in scope here.
    const links = within(footer).getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);

    for (const link of links) {
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('tabindex')).not.toBe('-1');

      link.focus();
      expect(link).toHaveFocus();
    }
  });
});

describe('Intent card keyboard reachability (TSK-M003-WEB-D4, HOME-F-002)', () => {
  it('keeps every homepage intent card a real, focusable <a>, not a click-only div', () => {
    renderAt('/');

    const heroSection = screen.getByTestId('home-section-hero');
    const cardLinks = within(heroSection).getAllByRole('link', {
      name: /Realizza|Esplora|Servizi|Realizzazioni|Eventi|NoLimits3D/,
    });
    // The six intent cards plus the two hero CTAs below them.
    expect(cardLinks.length).toBeGreaterThanOrEqual(6);

    for (const link of cardLinks) {
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('tabindex')).not.toBe('-1');

      link.focus();
      expect(link).toHaveFocus();
    }
  });
});

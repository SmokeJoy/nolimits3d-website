import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { appRoutes } from '../app/routes';

const expectedSectionOrder = [
  'home-section-hero',
  'home-section-proof',
  'home-section-timeline',
  'home-section-discovery',
  'home-section-art',
  'home-section-services',
  'home-section-trust',
  'home-section-events',
  'home-section-printflow',
  'home-section-closing',
];

function renderHome() {
  const router = createMemoryRouter(appRoutes, { initialEntries: ['/'] });
  render(<RouterProvider router={router} />);
}

describe('Homepage sections (TSK-M003-WEB-D1, HOME-F-001..010)', () => {
  it('renders all ten wireframe sections, in wireframe order', () => {
    renderHome();

    const root = screen.getByTestId('route-boundary-public');
    const sections = Array.from(root.querySelectorAll('section[data-testid]')).map((element) =>
      element.getAttribute('data-testid'),
    );

    expect(sections).toEqual(expectedSectionOrder);
  });

  it('gives every section an accessible heading via aria-labelledby', () => {
    renderHome();

    const root = screen.getByTestId('route-boundary-public');
    for (const testId of expectedSectionOrder) {
      const section = root.querySelector(`[data-testid="${testId}"]`);
      expect(section).not.toBeNull();
      const labelledBy = section?.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
      expect(document.getElementById(labelledBy ?? '')).not.toBeNull();
    }
  });

  it('makes all six intent cards real, crawlable links (HOME-F-002)', () => {
    renderHome();

    const heroSection = screen.getByTestId('home-section-hero');
    const expectedHrefs = [
      '/realizza',
      '/esplora',
      '/servizi',
      '/realizzazioni',
      '/eventi',
      '/nolimits3d',
    ];

    for (const href of expectedHrefs) {
      const link = heroSection.querySelector(`a[href="${href}"]`);
      expect(link).not.toBeNull();
    }
  });

  it('keeps PrintFlow to "Coming Soon" only (HOME-F-010)', () => {
    renderHome();

    const printFlowSection = screen.getByTestId('home-section-printflow');
    expect(printFlowSection.textContent).toMatch(/Coming Soon/);
  });

  it('uses the four pre-approved CTA labels verbatim', () => {
    renderHome();

    expect(screen.getByRole('link', { name: 'Inizia il tuo progetto' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Scopri cosa possiamo realizzare' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Iniziamo insieme' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Parliamone' })).toBeInTheDocument();
  });
});

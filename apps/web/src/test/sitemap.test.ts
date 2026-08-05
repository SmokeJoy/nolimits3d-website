import { describe, expect, it } from 'vitest';

import { buildSitemapXml, getSitemapPaths, SITE_ORIGIN } from '../../scripts/generate-sitemap';
import { appRoutes } from '../app/routes';

/**
 * Build-time `sitemap.xml` generator tests (`TSK-M003-WEB-D4`, `DOC-SEO-005`).
 */

/** Every leaf path actually registered in `routes.tsx`'s public boundary. */
function registeredPublicPaths(): Set<string> {
  const root = appRoutes[0];
  const children = root?.children ?? [];
  const paths = new Set<string>();

  for (const child of children) {
    if (child.index) {
      paths.add('/');
    } else if (typeof child.path === 'string') {
      paths.add(`/${child.path}`);
    }
  }

  return paths;
}

describe('getSitemapPaths (TSK-M003-WEB-D4)', () => {
  it('includes the homepage', () => {
    expect(getSitemapPaths()).toContain('/');
  });

  it('includes every real, canonical content page (leaf routes + real section indexes)', () => {
    const paths = getSitemapPaths();

    for (const expected of [
      '/nolimits3d/chi-siamo',
      '/nolimits3d/metodo',
      '/nolimits3d/qualita',
      '/nolimits3d/contatti',
      '/servizi/stampa-3d',
      '/servizi/progettazione-3d',
      '/servizi/prototipazione',
      '/servizi/ricambi-personalizzati',
      '/servizi/piccole-serie',
      '/realizzazioni',
      '/eventi',
      '/esplora',
      '/esplora/catalogo',
      '/esplora/ispirati',
      '/esplora/arte-in-stampa-3d',
      '/realizza',
      '/realizza/richiedi-progetto',
      '/realizza/preventivo-stampa-3d',
      '/realizza/configuratore-lanterne',
      '/realizza/assistenza-stampanti-3d',
      '/blog',
      '/servizi',
      '/nolimits3d',
      '/carrello',
    ]) {
      expect(paths).toContain(expected);
    }
  });

  it('excludes /account (TSEO-F-005: no admin/customer index bloat)', () => {
    expect(getSitemapPaths()).not.toContain('/account');
  });

  // The private command boundary's exclusion is covered in
  // `command-privacy.test.tsx` alongside every other command-privacy
  // invariant, not duplicated here.

  it('excludes /printflow (unlinked Coming Soon boundary)', () => {
    expect(getSitemapPaths()).not.toContain('/printflow');
  });

  it('excludes the /esplora/hueforge redirect (TSEO-F-003: canonical URLs only)', () => {
    expect(getSitemapPaths()).not.toContain('/esplora/hueforge');
  });

  it('includes /servizi and /nolimits3d bare section paths -- fixed dead links, now registered routes', () => {
    // Sprint 4 review caught GlobalNav/Footer linking to these section
    // headings since Sprint 2 with no page ever registered behind them
    // (ServiziPage/Nolimits3DPage fixed it in the same pass as this file).
    const paths = getSitemapPaths();
    expect(paths).toContain('/servizi');
    expect(paths).toContain('/nolimits3d');
  });

  it('includes /carrello -- fixed dead link, now a real (honest, not-yet-available) route', () => {
    expect(getSitemapPaths()).toContain('/carrello');
  });

  it('contains only paths that are actually registered routes in routes.tsx', () => {
    const registered = registeredPublicPaths();
    for (const path of getSitemapPaths()) {
      expect(registered.has(path)).toBe(true);
    }
  });

  it('has no duplicate entries', () => {
    const paths = getSitemapPaths();
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe('buildSitemapXml (TSK-M003-WEB-D4)', () => {
  it('produces a well-formed sitemap document with one <loc> per real route', () => {
    const xml = buildSitemapXml();

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain(`<loc>${SITE_ORIGIN}/</loc>`);
    expect(xml).toContain(`<loc>${SITE_ORIGIN}/blog</loc>`);
    expect(xml).not.toContain('/account');
    expect(xml).not.toContain('/printflow');
    // The command boundary's exclusion is covered in
    // command-privacy.test.tsx, not duplicated here.

    const locCount = xml.match(/<loc>/g)?.length ?? 0;
    expect(locCount).toBe(getSitemapPaths().length);
  });
});

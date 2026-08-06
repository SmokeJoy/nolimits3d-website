import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { configDefaults } from 'vitest/config';

import { buildSitemapXml } from './scripts/generate-sitemap';
import { buildSecurityMetaTags } from './scripts/security-headers';

/**
 * Build-time `sitemap.xml` generation (`TSK-M003-WEB-D4`, `DOC-SEO-005`).
 * `apps/web/package.json` is a Forbidden File for this task packet, so there
 * is no `prebuild`/`postbuild` script hook available; a Vite plugin's
 * `closeBundle` hook is the mechanism that runs on every real
 * `vite build` (`pnpm --filter @atlas/web build`) without touching it.
 * `apply: 'build'` keeps this out of `vite dev`/`vitest` runs, where writing
 * files as a side effect would be surprising.
 */
function sitemapPlugin(): Plugin {
  let outDir = 'dist';
  let root = process.cwd();

  return {
    name: 'atlas-sitemap',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
      root = config.root;
    },
    closeBundle() {
      writeFileSync(resolve(root, outDir, 'sitemap.xml'), buildSitemapXml(), 'utf-8');
    },
  };
}

/**
 * Build-time security-header meta tags (`E-0013`/`F-0037`, roadmap survey
 * 2026-08-06, `apps/web/scripts/security-headers.ts`). `apply: 'build'` for
 * the same reason as `sitemapPlugin`: a CSP meta tag in `vite dev` would
 * fight the dev server's own inline HMR client script for no benefit, since
 * dev never ships to a real visitor.
 */
function securityHeadersPlugin(): Plugin {
  return {
    name: 'atlas-security-headers',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace('</title>', `</title>\n${buildSecurityMetaTags()}`);
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemapPlugin(), securityHeadersPlugin()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    // `e2e/**` uses `@playwright/test`'s own `test()` (see `playwright.config.ts`);
    // without this exclude, vitest's default glob picks those files up too and
    // fails immediately since a Playwright test isn't runnable under vitest.
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
});

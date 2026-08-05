/// <reference types="vitest/config" />
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

import { buildSitemapXml } from './scripts/generate-sitemap';

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

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});

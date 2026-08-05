import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const robotsPath = resolve(here, '../../public/robots.txt');

/**
 * `robots.txt` regression coverage (`TSK-M003-WEB-D4`, `DOC-SEO-005`,
 * `TSEO-F-005`). `apps/web/public/**` is a static Vite `public` dir --
 * Vite copies it verbatim to `dist/` on build, so reading the source file
 * directly here reflects exactly what gets served.
 */
describe('robots.txt (TSK-M003-WEB-D4)', () => {
  const contents = readFileSync(robotsPath, 'utf-8');

  it('allows public crawling by default', () => {
    expect(contents).toMatch(/User-agent:\s*\*/);
    expect(contents).toMatch(/Allow:\s*\//);
  });

  it('disallows the two private boundaries (TSEO-F-005)', () => {
    expect(contents).toMatch(/Disallow:\s*\/account\b/);
    expect(contents).toMatch(/Disallow:\s*\/command\b/);
  });

  it('does not disallow any real public route', () => {
    expect(contents).not.toMatch(/Disallow:\s*\/esplora/);
    expect(contents).not.toMatch(/Disallow:\s*\/realizza/);
    expect(contents).not.toMatch(/Disallow:\s*\/servizi/);
    expect(contents).not.toMatch(/Disallow:\s*\/blog/);
  });

  it('points to the sitemap', () => {
    expect(contents).toMatch(/^Sitemap:\s*https:\/\/nolimits3d\.store\/sitemap\.xml$/m);
  });
});

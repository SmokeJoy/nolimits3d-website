import { defineConfig, devices } from '@playwright/test';

/*
 * Baseline E2E suite (`AD-011`). Its scope is deliberately narrow: it
 * automates exactly the regression classes M-003 live-browser verification
 * caught by hand and `jsdom`-based `vitest` could not -- console errors,
 * light/dark color-scheme rendering, and links resolving in a real rendered
 * browser (see `AD-011` section 3 for the full reasoning). It is not a
 * general-purpose user-journey suite; there are no user journeys to cover
 * yet (Catalog, Account, Preventivo are all pre-backend placeholders).
 *
 * `webServer` runs a real production build + `vite preview` rather than
 * `vite dev`, matching what a real visitor's browser receives (including
 * the code-split `lazy()` chunks and the build-time `sitemap.xml`/`robots.txt`
 * generation) instead of the dev server's unbundled module graph.
 */
const PORT = 4500;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    // `pnpm run <script> -- <args>` does not reliably strip the `--`
    // separator on this toolchain (confirmed: it reaches `vite preview` as a
    // literal positional argument, which vite then treats as a root-dir
    // override, silently discarding `--port`/`--strictPort`). Invoking
    // `vite` directly through `pnpm exec` sidesteps pnpm's script-argument
    // forwarding entirely and passes flags through correctly.
    command: `pnpm exec vite build && pnpm exec vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});

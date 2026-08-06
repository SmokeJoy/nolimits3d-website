import { expect, test } from '@playwright/test';

import { allPublicRoutes } from './support/routes';

/*
 * Automates the check that found the `require("react")` bundler crash and
 * the `axe-core`/`rolldown` CI-resolution risk this session (M-003
 * hardening pass, `AD-011`): a real production build, in a real browser,
 * with zero console errors or uncaught page errors. `jsdom`-based
 * `vitest` component tests render individual components in isolation and
 * never load the actual bundled JS this catches.
 */
for (const route of allPublicRoutes()) {
  test(`${route} loads with no console or page errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    await page.goto(route);
    await page.waitForLoadState('networkidle');

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
}

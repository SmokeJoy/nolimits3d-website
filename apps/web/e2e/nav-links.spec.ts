import { expect, test } from '@playwright/test';

import { allPublicRoutes } from './support/routes';

/*
 * Real-browser counterpart to `src/test/nav-links-resolve.test.tsx`. That
 * test proves every nav/footer href resolves to a real route by rendering
 * `createMemoryRouter` under `jsdom` -- it does not exercise an actual
 * browser navigation, the production `lazy()` chunk loading, or a real
 * network request. This suite does, against the built `dist/` output
 * (`playwright.config.ts`'s `webServer`), closing that gap per `AD-011`.
 */
for (const href of allPublicRoutes().filter((route) => route !== '/')) {
  test(`${href} resolves to a real page, not NotFound`, async ({ page }) => {
    const response = await page.goto(href);

    expect(response?.status()).toBe(200);
    await expect(page.getByTestId('route-not-found')).toHaveCount(0);
  });
}

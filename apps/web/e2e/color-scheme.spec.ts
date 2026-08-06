import { expect, test } from '@playwright/test';

/*
 * Automates the real bug a manual `prefers-color-scheme: light` emulation
 * found after four sprints of otherwise-thorough browser verification
 * (M-003 hardening, `AD-011`): `body` had no explicit background/text-color
 * rule, so on a light-preferring browser the page fell through to the
 * *browser's own* UA default instead of `@atlas/ui`'s theme tokens --
 * `@atlas/ui`'s dark palette is this app's unconditional default (no
 * `prefers-color-scheme` media query, only an explicit `.light` class this
 * app never sets), so the rendered background must stay the dark palette
 * color regardless of the visitor's OS/browser preference.
 *
 * `body-background-regression.test.ts` (`vitest`) already asserts the CSS
 * *source* contains the fix; `jsdom` cannot compute rendered styles, so it
 * cannot prove the browser actually paints it. This does.
 */
const DARK_PALETTE_BG = 'rgb(16, 24, 32)'; // --palette-dark: #101820
const DARK_PALETTE_TEXT = 'rgb(255, 255, 255)'; // --palette-white: #ffffff

for (const colorScheme of ['light', 'dark'] as const) {
  test(`body renders the dark theme background under prefers-color-scheme: ${colorScheme}`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/');

    const { backgroundColor, color } = await page.evaluate(() => {
      const style = getComputedStyle(document.body);
      return { backgroundColor: style.backgroundColor, color: style.color };
    });

    expect(backgroundColor).toBe(DARK_PALETTE_BG);
    expect(color).toBe(DARK_PALETTE_TEXT);
  });
}

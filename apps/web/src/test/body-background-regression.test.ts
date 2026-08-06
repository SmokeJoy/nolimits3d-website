import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Regression guard for a real bug found by a live browser color-scheme
 * check (jsdom can't render CSS at all, so this can't be an axe/computed-
 * style test the way most of this suite's other checks are): `body` had no
 * explicit background/text-color rule, so the page fell through to the
 * *browser's* UA default for an unstyled element on production builds --
 * which follows the visitor's OS/browser `prefers-color-scheme`, unlike
 * `@atlas/ui`'s own theme tokens (dark is the unconditional `:root`
 * default here; light only activates via an explicit class this app never
 * sets). Confirmed by emulating `prefers-color-scheme: light` and
 * screenshotting explicit white text on a light UA background before the
 * fix.
 *
 * This can only assert the rule's *source* is present, not that a browser
 * actually paints it -- see this session's manual verification (dark and
 * light color-scheme, multiple routes, real screenshots) for the part this
 * test cannot cover.
 */
describe('body background regression (public-layout.css)', () => {
  it('sets an explicit background and text color on body, not relying on the browser UA default', () => {
    const css = readFileSync(resolve(__dirname, '../routes/public/public-layout.css'), 'utf-8');

    const bodyRuleMatch = css.match(/(?:^|\n)body\s*\{([^}]*)\}/);
    expect(
      bodyRuleMatch,
      'expected a top-level `body { ... }` rule in public-layout.css',
    ).not.toBeNull();

    const bodyRuleBody = bodyRuleMatch?.[1] ?? '';
    expect(bodyRuleBody).toMatch(/background:\s*var\(--bg-canvas\)/);
    expect(bodyRuleBody).toMatch(/color:\s*var\(--text-primary\)/);
  });
});

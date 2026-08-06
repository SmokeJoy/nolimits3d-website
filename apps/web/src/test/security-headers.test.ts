import { describe, expect, it } from 'vitest';

import { buildSecurityMetaTags, CONTENT_SECURITY_POLICY } from '../../scripts/security-headers';

/**
 * Build-time security-header meta tag tests (`E-0013`/`F-0037`, roadmap
 * survey 2026-08-06). The policy values here were verified against the real
 * production build in a live browser (Playwright's console/DOM inspection
 * found the `sonner`-injected `<style>` block that requires
 * `'unsafe-inline'` on `style-src`); this file guards the regression, it
 * doesn't re-derive the policy from scratch.
 */
describe('Content-Security-Policy (E-0013)', () => {
  it('defaults to same-origin only', () => {
    expect(CONTENT_SECURITY_POLICY).toContain("default-src 'self'");
  });

  it('keeps script-src strict -- no unsafe-inline or unsafe-eval', () => {
    const scriptSrc = CONTENT_SECURITY_POLICY.split(';')
      .map((d) => d.trim())
      .find((d) => d.startsWith('script-src'));
    expect(scriptSrc).toBe("script-src 'self'");
    expect(scriptSrc).not.toContain('unsafe-inline');
    expect(scriptSrc).not.toContain('unsafe-eval');
  });

  it('allows unsafe-inline only on style-src, for the sonner-injected <style> block', () => {
    expect(CONTENT_SECURITY_POLICY).toContain("style-src 'self' 'unsafe-inline'");
  });

  it('blocks plugin/object embeds and restricts form submission and base URI to same-origin', () => {
    expect(CONTENT_SECURITY_POLICY).toContain("object-src 'none'");
    expect(CONTENT_SECURITY_POLICY).toContain("base-uri 'self'");
    expect(CONTENT_SECURITY_POLICY).toContain("form-action 'self'");
  });

  it('does not include frame-ancestors -- meta-delivered CSP ignores that directive per spec', () => {
    expect(CONTENT_SECURITY_POLICY).not.toContain('frame-ancestors');
  });
});

describe('buildSecurityMetaTags (E-0013)', () => {
  it('emits a Content-Security-Policy meta tag with the current policy', () => {
    const tags = buildSecurityMetaTags();
    expect(tags).toContain('<meta http-equiv="Content-Security-Policy"');
    expect(tags).toContain(CONTENT_SECURITY_POLICY);
  });

  it('emits a referrer meta tag using the name="referrer" delivery form (the spec-defined one, not http-equiv)', () => {
    const tags = buildSecurityMetaTags();
    expect(tags).toContain('<meta name="referrer" content="strict-origin-when-cross-origin" />');
  });
});

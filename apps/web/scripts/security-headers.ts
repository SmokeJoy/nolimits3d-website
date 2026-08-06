/**
 * Build-time security-header meta tags (`E-0013` / `F-0037`, roadmap survey
 * 2026-08-06). Host-agnostic on purpose: `ADR-0013` accepts Vercel as the
 * eventual host, but no Vercel project is linked yet and production stays
 * blocked by `BLK-BASE-001`, so real HTTP-only protections
 * (`Permissions-Policy`, `X-Frame-Options`, HSTS -- none of which can be
 * delivered via `<meta>` per spec) are deliberately left for whenever that
 * hosting config is actually wired up, not guessed here. This covers the
 * two directives browsers do honor from `<meta http-equiv>`: CSP and
 * Referrer-Policy.
 *
 * The policy is scoped to what this app actually does today: confirmed
 * empirically in a real browser against the production build, not assumed
 * from a source grep alone (a grep for React's `style={{` found nothing,
 * but `@atlas/ui`'s Toast primitive wraps `sonner`, which injects its own
 * `<style>` block into `<head>` at runtime for toast theming/positioning --
 * that's the one inline-style source in the app, confirmed by inspecting
 * the live DOM with a strict `style-src 'self'` policy first and reading
 * the resulting CSP violation). `style-src` allows `'unsafe-inline'` for
 * that reason; `script-src` stays strict since nothing in the app or its
 * dependencies needs inline/eval'd script. `connect-src` stays `'self'`
 * because `getSupabaseClient()` (`AD-011`) has no caller yet -- the PR that
 * gives it one should widen this to the real Supabase project origin at the
 * same time, not before.
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

export const REFERRER_POLICY = 'strict-origin-when-cross-origin';

export function buildSecurityMetaTags(): string {
  return [
    `    <meta http-equiv="Content-Security-Policy" content="${CONTENT_SECURITY_POLICY}" />`,
    `    <meta name="referrer" content="${REFERRER_POLICY}" />`,
  ].join('\n');
}

import { afterEach, describe, expect, it, vi } from 'vitest';

import { getSupabaseClient, resetSupabaseClientForTests } from '../lib/supabase/client';

/**
 * Coverage for the Supabase client plumbing decided in `AD-011`. This is
 * intentionally narrow: it proves the env-var contract and singleton
 * behaviour that the rest of the app can rely on, not any domain schema
 * (there isn't one yet -- `AD-011` explicitly defers that).
 */
describe('getSupabaseClient (AD-011)', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    resetSupabaseClientForTests();
  });

  it('throws a clear error when VITE_SUPABASE_URL is missing', () => {
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'local-publishable-key-placeholder');

    expect(() => getSupabaseClient()).toThrow(/VITE_SUPABASE_URL is not set/);
  });

  it('throws a clear error when VITE_SUPABASE_PUBLISHABLE_KEY is missing', () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'http://127.0.0.1:54321');
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', '');

    expect(() => getSupabaseClient()).toThrow(/VITE_SUPABASE_PUBLISHABLE_KEY is not set/);
  });

  it('builds a client and reuses the same instance on later calls', () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'http://127.0.0.1:54321');
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'local-publishable-key-placeholder');

    const first = getSupabaseClient();
    const second = getSupabaseClient();

    expect(first).toBe(second);
  });
});

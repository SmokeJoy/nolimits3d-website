import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/*
 * Client-side plumbing only (AD-011): a typed connection to whichever Supabase
 * project the environment points at. No table/schema is assumed here -- the
 * generic client works identically before and after a domain schema exists,
 * so it carries none of the speculative-rework risk a guessed schema would.
 */

type SupabaseEnvVar = 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_PUBLISHABLE_KEY';

let cachedClient: SupabaseClient | null = null;

function readEnv(name: SupabaseEnvVar): string {
  const value = import.meta.env[name];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(
      `${name} is not set. Copy .env.example to .env.local (or configure the deployment ` +
        'environment) before any code path that calls getSupabaseClient() runs.',
    );
  }
  return value;
}

export function getSupabaseClient(): SupabaseClient {
  if (cachedClient !== null) {
    return cachedClient;
  }

  const url = readEnv('VITE_SUPABASE_URL');
  const publishableKey = readEnv('VITE_SUPABASE_PUBLISHABLE_KEY');

  cachedClient = createClient(url, publishableKey);
  return cachedClient;
}

/** Test-only: clears the cached client so env-var changes take effect. */
export function resetSupabaseClientForTests(): void {
  cachedClient = null;
}

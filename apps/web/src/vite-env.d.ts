/// <reference types="vite/client" />

/*
 * Opts into Vite's strict `import.meta.env` typing (see vite/types/importMeta.d.ts):
 * without this, ImportMetaEnv falls back to `Record<string, any>` for every
 * `VITE_*` key, which is exactly what made `readEnv()` in
 * `src/lib/supabase/client.ts` an unsafe-assignment lint error.
 */
interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
}

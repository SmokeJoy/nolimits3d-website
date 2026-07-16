# Supabase Local Foundation

This directory is local-only in M-001. It is not linked to a remote Supabase project and
contains no domain schema, production credentials, deployed function or real auth setup.

## Local commands

- `pnpm supabase:config:check` validates the pinned CLI and local service manifest.
- `pnpm supabase:start` starts the local stack when a Docker-compatible runtime is available.
- `pnpm supabase:status` reports local container state.
- `pnpm supabase:stop` stops the local stack.

Do not run `supabase link`, `db push`, `functions deploy` or any production command in M-001.
The `migrations`, `functions/_shared` and `seed` directories remain empty until a later approved
task introduces governed content.

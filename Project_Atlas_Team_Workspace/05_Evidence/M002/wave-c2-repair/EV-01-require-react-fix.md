EV — Fix: browser-fatal `require("react")` in the built `@atlas/ui` bundle
Date: 2026-08-05
Executor: Claude Code, acting as implementer per the current CLAUDE.md compatibility bridge
----------------------------------------------------------------------

## Symptom (found live, not from a report)

Opened `apps/ui-playground` in a real browser (`pnpm --filter @atlas/ui-playground dev`,
navigated to `http://localhost:5173/`). Console:

```
Uncaught: Calling `require` for "react" in an environment that doesn't expose the
`require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules
for more details.
  at packages/ui/dist/index.js:3496:10
```

Ruled out stale cache before investigating further: rebuilt `packages/ui` (`pnpm build`),
deleted `apps/ui-playground/node_modules/.vite`, hard-reloaded. Error persisted, confirming
it was a real defect in the current build output, not a caching artifact.

## Root cause

`grep -n "m(\"react\")" packages/ui/dist/index.js` located the call inside the bundled
`@base-ui/utils/store/createSelector.mjs` region. That `.mjs` file's own source has no
`require()` call; the pattern (`useState`/`useEffect`/`useLayoutEffect`/`useDebugValue`
destructured off a value obtained via `require("react")`) matches
`use-sync-external-store`'s shim, a transitive dependency of `@base-ui/utils` that is
still written in CJS style even in its "ESM" build.

`react`, `react-dom` and `react/jsx-runtime` were marked external via a plain
`rollupOptions.external` array in `packages/ui/vite.config.ts`. Per Rolldown's own docs
(https://rolldown.rs/in-depth/bundling-cjs and
https://rolldown.rs/builtin-plugins/esm-external-require, fetched and read directly, not
assumed): a plain top-level `external` entry does **not** rewrite `require()` calls against
that module into `import` — Rolldown deliberately preserves `require()` semantics unless the
module is externalized through `esmExternalRequirePlugin` specifically. The plugin's docs
state explicitly: list a module in the plugin's own `external` option, not the top-level one,
or the plugin skips it and the `require()` call survives unconverted into the bundle — which
is exactly what shipped in Wave C2.

## Fix

`packages/ui/vite.config.ts`: moved `react`, `react-dom`, `react/jsx-runtime` out of
`rollupOptions.external` and into `esmExternalRequirePlugin({ external: [...] })`
(imported from `rolldown/plugins`, resolvable transitively via `vite`'s own dependency on
`rolldown` — confirmed with `require.resolve('rolldown/plugins', { paths: [...] })` from
`packages/ui`'s directory before writing the config).

## Verification

- `grep -c 'm("react")' packages/ui/dist/index.js` → 0 (was 4) after rebuild.
- Rebuilt bundle's import statements are still static (`import * as n from "react"`, etc.) —
  react/react-dom remain genuinely external, not bundled.
- Live browser check, two independent tabs (a reused tab and a freshly opened one, to rule
  out any console-log carryover from before the fix): zero errors, full page renders —
  design tokens, Wave C1 primitives (Button, Badge, StatusIndicator, Skeleton, Card) and
  Wave C2 components (Input, FormField, Select, Tabs, Dialog, Toast) all present in the
  extracted page text.
- `pnpm --filter @atlas/ui test`: 137/137.
- Full workspace: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test` (176/176),
  `pnpm format:check`, `pnpm secret:scan`, `pnpm dependency:audit` (517 packages, 0
  blocking), `pnpm guard:scope`, `pnpm guard:source-bindings`, `pnpm guard:migrations`
  (not applicable) — all green.

## Scope note

`packages/ui/vite.config.ts` is not listed in either the Allowed or Forbidden Files of
`TSK-M002-CLAUDE-C1`/`C2` — it is build-tooling internal to `packages/ui`, not a component,
test, or package manifest. No dependency was added; `rolldown` is already a transitive
dependency of `vite`, not a new one.

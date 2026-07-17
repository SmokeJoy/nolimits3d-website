# Evidence: EV-02 - Themes Dark/Light Render

- **Milestone**: M-002 Design System & UI Foundation
- **Wave**: Wave B Token Foundation
- **Roadmap ID**: T-0025, T-0026
- **Commit SHA**: 9059b44065ece91dc36e70d814adfac2bbf7fa46
- **Verify Command**: `pnpm --filter @atlas/ui-playground build` + `pnpm --filter @atlas/ui test` (suite `tests/tokens.test.tsx`, blocco "Theme switching")
- **Exit Code**: 0
- **Timestamp UTC**: 2026-07-17T10:05:33Z
- **CI Run URL**: https://github.com/SmokeJoy/nolimits3d-website/actions/runs/29572205442
- **Owner / Executor**: Claude (TSK-M002-CLAUDE-B)
- **Status**: PASSED

## Theme Verification

### 1. Dark Mode (Default)

In default dark mode, the following custom properties are applied:

- `--bg-canvas` -> maps to `#101820` (palette.dark)
- `--bg-surface` -> maps to `#111827` (palette.gray.900)
- `--text-primary` -> maps to `#ffffff` (palette.white)
- `--border-default` -> maps to `#1f2937` (palette.gray.800)
- `--accent-primary` -> maps to `#25D366` (palette.green)
- `--accent-primary-hover` -> maps to `#1EBD59` (palette.green.hover.dark, reference-mapped)
- `--accent-primary-foreground` -> maps to `#101820` (palette.dark)

### 2. Light Mode

When the `.light` class or the `[data-theme="light"]` attribute is added to the root element, the custom properties are overridden:

- `--bg-canvas` -> maps to `#ffffff` (palette.white)
- `--bg-surface` -> maps to `#f9fafb` (palette.gray.50)
- `--text-primary` -> maps to `#101820` (palette.dark)
- `--border-default` -> maps to `#e5e7eb` (palette.gray.200)
- `--accent-primary` -> maps to `#25D366` (palette.green)
- `--accent-primary-hover` -> maps to `#1BA851` (palette.green.hover.light, reference-mapped)
- `--accent-primary-foreground` -> maps to `#101820` (palette.dark; keeps contrast >= 4.5:1 against green — white fails AA)

### 3. Deterministic Verification

Theme switching is now verified automatically by `packages/ui/tests/tokens.test.tsx`
("Theme switching (dark default vs light override)"): the suite parses
`packages/ui/styles/global.css`, resolves every `var()` chain for both themes
and asserts the resolved hex values listed above.

### 4. Vite Playground Integration

The theme toggle in `apps/ui-playground/src/App.tsx` dynamically updates the
`data-theme` attribute and the `light` class on the `<html>` root node,
swapping the theme in browser renders.

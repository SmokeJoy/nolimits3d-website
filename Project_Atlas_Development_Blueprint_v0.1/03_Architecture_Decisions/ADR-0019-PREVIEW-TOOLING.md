# ADR-0019: Component Preview Tooling

## Context
Project Atlas requires visual regression evidence and a component catalog for the `@atlas/ui` package. However, adding large dependencies like Storybook conflicts with the Dependency Adoption Policy in the early foundational stage. We need an isolated preview environment.

## Alternatives Evaluated

### Option A: Vite Playground (Default Preliminary)
- **Description**: A dedicated route or sub-app purely within Vite configured to map components.
- **Dependency Weight**: None (reuses existing Vite installation).
- **Maintenance**: High manual effort (requires manual routing/cataloging of components).
- **Static Build**: Yes, but completely custom.
- **Visual Regression**: Requires custom test mapping.

### Option B: Ladle (Alternative under evaluation)
- **Description**: A minimalist drop-in replacement for Storybook designed exclusively for Vite.
- **Dependency Weight**: Very low compared to Storybook. Fast `pnpm install`.
- **Maintenance**: Zero config (auto-discovers `*.stories.tsx`).
- **Compatibility**: 100% Vite compatible.
- **Static Build**: Extremely fast static bundle creation.
- **Visual Regression**: Playwright integration is natively supported.
- **CI Cost**: Negligible compared to Storybook.
- **Security**: Solid supply-chain, few dependencies.
- **Token/Theme Support**: Allows global decorators for Dark/Light themes.

## Proposed Decision
Adopt **Ladle** (Option B) for `@atlas/ui` to achieve the required visual isolation and regression testing capacity with the minimal possible footprint.

## Gate
Requires explicit Architect approval.

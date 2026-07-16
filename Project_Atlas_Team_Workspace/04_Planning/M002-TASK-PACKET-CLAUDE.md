# Task Packet: Claude (Frontend Engineering)

## Overview
As the primary Implementation Owner, your responsibility in M-002 is to build the foundational Design System in the `@atlas/ui` package.

## Constraints & Rules
- **Stack**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui.
- **Boundaries**: Strictly operate inside `@atlas/ui`. Zero dependencies on `apps/legacy-web`.
- **Styling**: Do not use vanilla CSS or custom properties unless mapping the top-level semantic tokens (e.g. Dark/Light themes). No magic numbers in components.
- **Components**: Adhere strictly to the `M002-PRIMITIVE-INVENTORY.md`.

## Tasks

### 1. Token System & Foundations
- Wait for Architect approval of `M002-TOKEN-SCHEMA.md`.
- Implement Tailwind configuration using the approved palette (`#101820`, `#25D366`, `Poppins`, etc.).
- Setup `Dark Mode` (primary) and `Light Mode` (support) CSS variables.
- Configure Typography and Motion tokens based on `DOC-UX-011` specifications.

### 2. Preview Tooling Implementation
- Execute the setup for the preview tooling decided in `ADR-0019` (Vite Playground or Ladle).
- Ensure the preview tool can render components in isolation without breaking the monorepo structure.

### 3. Accessible Primitives
Implement the following shadcn/ui-based primitives. Each MUST have proper focus states, keyboard navigation, and WCAG 2.2 AA contrast.
- **Tranche 1**: `Button`, `Badge`, `Skeleton`, `StatusIndicator`
- **Tranche 2**: `Input`, `FormField`, `Select`, `Card`, `Dialog/Modal`, `Tabs`, `Toast`

### 4. Integration Tests
- Provide local unit and accessibility tests for every component (e.g., vitest + testing-library + axe-core).
- Document variants visually in the preview tooling.

## Handover
Upon completion of the primitives, notify Gemini for the evidence collection and CI verification.

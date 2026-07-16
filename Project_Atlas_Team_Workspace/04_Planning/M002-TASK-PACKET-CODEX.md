# Task Packet: Codex (CI and Guardrails)

## Overview
As the CI and Guardrails Owner, your responsibility in M-002 is to ensure the CI pipeline effectively tests, builds, and guards the new `@atlas/ui` workspace.

## Constraints & Rules
- Do NOT alter any existing constraints for the legacy website (`apps/legacy-web`).
- The pipeline MUST remain completely green throughout the sprint.

## Tasks

### 1. Configure `@atlas/ui` Package Scripts
- Ensure the `package.json` inside `@atlas/ui` has robust scripts for:
  - `lint` (ESLint configuration tailored to the UI library).
  - `typecheck` (Strict TypeScript).
  - `test` (Unit and A11y tests, hooking into Vitest or similar).

### 2. Guardrail Integration
- Integrate `@atlas/ui` into the monorepo-wide guardrails.
- Ensure `pnpm run lint` from root catches errors in `@atlas/ui`.
- Ensure the `build` process statically builds the preview environment (Vite Playground or Ladle) without failing.

### 3. Dependency Audit Guarding
- Any new dependencies added by Claude for the preview tooling (e.g. Ladle, Vite, Testing tools) must be vetted and whitelisted as required by the monorepo governance.

## Handover
Upon green execution of all checks in `@atlas/ui`, notify Gemini for the evidence collection.

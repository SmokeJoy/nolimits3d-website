# Sprint Plan M-001 — Repository Foundation

> **Document ID:** PA-M001-SPRINT-001  
> **Version:** 1.0.0-rc3  
> **Status:** ARCHITECT CORRECTED / IMPLEMENTATION NOT AUTHORIZED  
> **Milestone:** M-001 — Repository Foundation  
> **Sprint:** M001-S01  
> **Authorities:** Documentation Bible; Development Playbook v1.0.1; Development Blueprint 00; M-001 Charter; AD-001 through AD-007; PA-DF-POL-001  
> **Implementation gate:** closed until an explicit later Architect Verdict says `PROCEED`.

## 1. Objective

Create the minimum reproducible repository foundation for Project Atlas without implementing product features, business pages, public Jarvis behavior, PrintFlow functionality, production infrastructure or domain APIs.

## 2. Gate status

### BLK-M001-001 — CODEOWNERS identity — CLOSED

The verified GitHub account with repository write access is `@SmokeJoy`. `.github/CODEOWNERS` must use `@SmokeJoy` and must not contain AI identities or unresolved placeholders.

### BLK-M001-003 — Evidence closure — OPEN

The governed evidence-rebase package must pass the active Handoff Contract before implementation authorization can be considered.

### BLK-M001-005 — Architect implementation gate — OPEN

Code generation remains prohibited until the evidence gate is closed and the Chief Architect issues an explicit `PROCEED`.

## 3. Fixed platform baseline

- Package manager: `pnpm@9.15.0`, exact `packageManager` pin.
- Runtime: `Node.js 24.18.0`, exact pin in `.nvmrc`, `package.json#engines` and CI setup.
- Node verification evidence: official release availability plus recorded installer/archive checksum for the selected development platform.
- Frontend: React + TypeScript + Vite, subject to the existing Next.js review gate.
- Backend foundation: Supabase local CLI scaffold only.
- Production linking, production secrets, cloud migrations and production deployment are forbidden in M-001.

## 4. Execution order

`M001-A -> M001-C -> M001-B/M001-D/M001-E -> M001-F`

Parallel work is allowed only after M001-A establishes the repository contracts and Gemini confirms non-overlapping ownership.

## 5. Task packets

### M001-A — Repository Skeleton and Governance

**Owner:** Codex  
**Reviewer/Integrator:** Gemini

Deliverables:

- root `package.json` with exact runtime/package-manager pins;
- `pnpm-workspace.yaml`;
- `.nvmrc`, `.editorconfig`, `.gitattributes`, `.gitignore`;
- base `tsconfig.json`, `eslint.config.js`, `.prettierrc`;
- repository scripts that are non-mutating in CI;
- `.github/CODEOWNERS` mapped to the verified owner `@SmokeJoy`;
- no application/domain implementation.

Acceptance evidence:

- exact version outputs;
- clean install reproducibility;
- configuration validation;
- root allowlist audit.

### M001-B — Web App Shell

**Owner:** Claude  
**Reviewer/Integrator:** Gemini

Deliverables:

- `apps/web` using Vite, React and TypeScript;
- minimal App Shell;
- route boundaries for `public`, `account` and `command`;
- `command` remains private, unlinked and featureless;
- no Jarvis implementation, business page, real content, catalog, configurator or checkout.

Required tests:

- App Shell renders;
- shared package imports resolve;
- route boundaries resolve;
- no public navigation or route exposure for `command`;
- no permanent `--passWithNoTests`.

### M001-C — Shared Package Scaffold

**Owners:** Claude and Codex  
**Integrator:** Gemini

Deliverables:

- empty, buildable packages:
  - `@atlas/ui`;
  - `@atlas/domain`;
  - `@atlas/api-contracts`;
  - `@atlas/config`;
- explicit package boundaries and exports;
- no business entities, API contracts or reusable product components beyond the minimum compile/import scaffold.

Acceptance evidence:

- workspace linking;
- package build/typecheck;
- dependency-boundary verification.

### M001-D — Supabase Local Foundation

**Owner:** Codex  
**Reviewer/Integrator:** Gemini

Deliverables:

- local `supabase/config.toml`;
- empty governed directories for `migrations/`, `functions/_shared/` and `seed/`;
- `.env.example` with placeholders only;
- local environment documentation.

Forbidden:

- remote project linking;
- real schema/domain migrations;
- real auth configuration;
- production secrets;
- deployed Edge Functions.

Acceptance evidence:

- local config validation;
- migration dry-run reported `not applicable` while no migrations exist, then enforced when migrations are introduced.

### M001-E — CI/CD and Security Guardrails

**Owner:** Codex  
**Reviewer/Integrator:** Gemini

Deliverables:

- `.github/workflows/ci.yml` with non-mutating, fail-closed checks;
- CodeQL only when repository/plan support is verified;
- secret scanning with native capability when available and a reproducible CI fallback;
- dependency audit policy:
  - Critical/High: blocker;
  - Moderate: mandatory review and time-bound waiver;
  - Low: record and plan.

Mandatory CI/guard matrix:

1. `install --frozen-lockfile`;
2. `lint`;
3. `format:check`;
4. `typecheck`;
5. `test`;
6. `build`;
7. `secret-scan`;
8. `dependency-audit`;
9. route/private-guard scan, including `command` non-exposure;
10. migration dry-run when applicable, otherwise explicit `not applicable` evidence;
11. documentation source-binding check against the approved Bible, Playbook and Blueprint references.

Vercel rule:

- a Preview deployment may be requested only after integration verification and only after repository ownership, Vercel plan and integration capability are confirmed;
- inability to create Preview due to unverified/unavailable capability is reported, not hidden;
- production deployment is forbidden.

### M001-F — Integration Evidence and Governed Handoff

**Owner:** Gemini

Deliverables:

- integration of only Architect-authorized outputs;
- Git status and diff summary;
- file ownership/conflict report;
- complete command/test matrix with exit codes;
- package import and route-boundary evidence;
- private `command` guard evidence;
- root allowlist audit before and after integration;
- full handoff manifest, deletion plan and report;
- independent package validation result;
- SHA-256 for every payload file and external SHA-256 for the ZIP;
- assumptions, deviations, waivers, technical debt and blockers;
- final Gemini integration verdict without self-authorizing `PROCEED`.

Handoff constraints:

- one active `PROJECT_ATLAS_CURRENT_HANDOFF.zip`;
- no root staging directory;
- no loose tree/report/plan files in root;
- uncertain files go to `99_DELETE_QUARANTINE`;
- all evidence uses canonical workspace paths.

## 6. Milestone acceptance checklist

- [x] BLK-M001-001 resolved with verified GitHub username `@SmokeJoy`.
- [ ] Explicit Architect `PROCEED` issued before implementation starts.
- [ ] `pnpm@9.15.0` and `Node.js 24.18.0` exactly pinned and verified.
- [ ] Repository root passes the allowlist audit with zero violations.
- [ ] All task packets M001-A through M001-F are complete.
- [ ] All eleven CI/guard controls are implemented and evidenced.
- [ ] `apps/web` and shared packages build and test successfully.
- [ ] `command` is private, unlinked, featureless and absent from public navigation.
- [ ] Supabase remains local-only with no real schema/auth/cloud linkage.
- [ ] No product feature, real page, business API, Jarvis implementation or PrintFlow implementation exists.
- [ ] Vercel Preview handling follows the capability-dependent rule.
- [ ] Final handoff passes full schema, hash, root and payload validation.
- [ ] Architect Review closes M-001 before any later milestone begins.

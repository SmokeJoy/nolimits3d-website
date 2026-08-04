# Project Atlas Production Architecture Decision Pack

> Document ID: PA-PROD-ARCH-001  
> Version: 1.0.0  
> Date: 2026-07-17  
> Owner: Codex Root, Chief Architect and CTO  
> Review owner: Atlas TPM  
> Status: CTO APPROVED ARCHITECTURE / IMPLEMENTATION HOLD  
> Technical review: PASS; governance prerequisite remains open  
> Production release: BLOCKED by `BLK-BASE-001`

## 1. Purpose

This document defines the target production architecture and the gates required to
move Project Atlas from the repository foundation to a private beta and, later, a
controlled production cutover.

It does not authorize a production release, change the Documentation Bible, install
the Codex-native governance package, expose Jarvis, or activate PrintFlow.

## 2. Non-negotiable boundaries

- `apps/web` is the target Atlas runtime.
- `apps/legacy-web` remains the current public fallback until a measured cutover gate
  passes. It is not rewritten or removed as part of the foundation work.
- Jarvis is Andrea-only, inside the Command Center, and protected by server-side
  identity and capability checks. A hidden route is never treated as authorization.
- PrintFlow remains `Coming Soon`. No worker, download, local client, or operational
  PrintFlow path is enabled in this phase.
- The PC worker remains pull-only. No inbound public control port is introduced.
- The browser never receives a Supabase secret key or `service_role` credential.
- `service_role` bypasses RLS. Its use is restricted to trusted server-side code and
  never replaces explicit identity, tenant/resource ownership, role, and capability
  authorization for the requested operation.
- Every table in an exposed schema uses RLS with explicit policies. Default access is
  deny.
- Existing M-002 changes in `packages/ui` and `apps/ui-playground` are outside this
  architecture packet and must not be reverted or mixed into its implementation.

## 3. Architecture decisions

| ID        | Decision                | Verdict                                                                   | Rationale                                                                                                                                                                                           |
| --------- | ----------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PA-AD-001 | Canonical runtime       | ADOPT `apps/web`                                                          | Matches the repository blueprint and preserves one Atlas application surface.                                                                                                                       |
| PA-AD-002 | Legacy transition       | ADOPT parallel migration and gated cutover                                | Keeps the current site recoverable until Atlas reaches content, SEO, security, and operational parity.                                                                                              |
| PA-AD-003 | Frontend platform       | ADOPT React 19, TypeScript, Vite, and React Router Framework Mode         | Adds static pre-rendering, SSR, route modules, middleware, and Vercel support while preserving the approved React/Vite investment.                                                                  |
| PA-AD-004 | Next.js                 | DEFER                                                                     | It provides valid rendering capabilities, but no current requirement justifies a framework migration after React Router Framework Mode is validated. Revisit only on measured failure of the spike. |
| PA-AD-005 | React Server Components | REJECT for Phase 1                                                        | React Router RSC support is experimental and adds risk without a Phase 1 requirement.                                                                                                               |
| PA-AD-006 | Backend platform        | ADOPT Supabase-first modular monolith                                     | PostgreSQL, Auth, Storage, RLS, and Edge Functions satisfy Phase 1 without an Express or Nest service.                                                                                              |
| PA-AD-007 | Auth flow               | ADOPT PKCE with server-managed cookies                                    | Supports server verification for account and Command Center routes. Authenticated responses are private and non-cacheable.                                                                          |
| PA-AD-008 | Authorization           | ADOPT database-backed roles and capabilities                              | Critical access is resolved server-side from `auth.uid()` and authoritative database state, never from `user_metadata`.                                                                             |
| PA-AD-009 | Privileged operations   | ADOPT Edge Functions                                                      | Payment, publication, administration, Jarvis, and other privileged side effects stay outside public browser authority.                                                                              |
| PA-AD-010 | Data access             | ADOPT typed module adapters                                               | UI components consume module-level typed queries and commands; they do not reach across domain tables directly.                                                                                     |
| PA-AD-011 | Environments            | ADOPT local, beta/staging, and production separation                      | Schema changes are migration-driven and verified before promotion. Remote provisioning is deferred until credentials and ownership are available.                                                   |
| PA-AD-012 | Production delivery     | ADOPT Vercel for Atlas and preserve GitHub Pages for legacy until cutover | The two delivery paths remain isolated and independently reversible.                                                                                                                                |

## 4. Target topology and trust boundaries

```text
Anonymous browser
  |  public HTML/assets and publishable key only
  v
Vercel / apps/web
  |-- public routes: statically pre-rendered where possible
  |-- account routes: SSR, verified session, private/no-store
  `-- command routes: SSR, verified session + role + capability, private/no-store
          |
          | user JWT / publishable access
          v
Supabase Data API ---------------------- Supabase Storage
  | RLS on every exposed table             | private buckets by default
  | ownership and capability policies      | object policy + database record
  v                                        v
PostgreSQL public schema               Customer/project assets
  |
  | controlled calls only
  v
Private authorization schema <-------- Edge Functions
  ^                                      | JWT verification
  |                                      | privileged commands
  | scoped pull lease                    | secret key server-side only
  |
Future PC worker
  `-- outbound polling only; disabled while PrintFlow is Coming Soon

Current production fallback: apps/legacy-web -> GitHub Pages
Future cutover: DNS/domain moves only after PA-GATE-006; rollback points to legacy.
```

Trust boundaries:

1. Public browser to Vercel and Supabase public interfaces.
2. Authenticated account session to tenant-owned rows.
3. Command Center session to administrative capabilities.
4. Edge Functions to secret-bearing privileged operations.
5. Future worker to narrowly scoped, expiring job leases.

## 5. Frontend architecture

`apps/web` moves from React Router Data Mode to Framework Mode through a dedicated
spike before product routes are built. The target rendering model is:

- public pages: pre-rendered at build time when content is static; dynamic public
  pages use SSR only when a measured requirement exists;
- account pages: dynamic SSR entry plus client navigation, with session verification
  on the server;
- Command Center pages: dynamic SSR with role and capability middleware before route
  data is returned;
- 3D, video, and future Jarvis modules: lazy and absent from the initial public
  bundle;
- authenticated responses: `Cache-Control: private, no-store`;
- public metadata: canonical URL, robots behavior, sitemap membership, structured
  data, and social metadata are testable route outputs;
- no experimental RSC APIs in Phase 1.

The migration spike must prove build, preview, SSR, pre-rendering, deep-link behavior,
error boundaries, test support, and deployment packaging before PA-GATE-002 closes
and PA-AD-004 is either confirmed or superseded.

## 6. Backend and data architecture

### 6.1 Authentication and authorization

- Supabase Auth is the identity provider.
- SSR clients are created per request; user-specific clients are never shared at
  module scope.
- Server route protection verifies the user against Supabase Auth, then resolves
  roles and capabilities from authoritative database state.
- Authorization data is not stored in editable `user_metadata`.
- Jarvis requires both the Andrea principal and capability `jarvis.use`.
- Session revocation and short-lived access tokens are part of the Command Center
  threat model.

### 6.2 Schema boundaries

- `public`: exposed application tables with explicit grants and RLS.
- `private`: authorization, integration, audit, and privileged implementation data;
  not exposed through the Data API.
- `storage`: managed object metadata with policies aligned to application ownership.

Any privileged database function must have a documented reason, fixed `search_path`,
explicit `EXECUTE` grants, and tests proving that `anon` and unrelated authenticated
users cannot invoke or exploit it.

### 6.3 API boundaries

- Browser-safe reads and ordinary ownership-scoped writes may use the Supabase Data
  API under RLS.
- Privileged commands use versioned Edge Function endpoints.
- An Edge Function that uses `service_role` must first verify the caller JWT and then
  re-authorize identity, tenant/resource ownership, role, and required capability
  against authoritative database state. This sequence requires negative tests.
- Request and response schemas live in `packages/api-contracts`.
- Domain invariants live in `packages/domain` and are rechecked server-side.
- Every critical mutation accepts an idempotency key and emits an audit record.

### 6.4 Storage

- Private buckets are the default for customer uploads and generated artifacts.
- Public catalog media uses a separate explicitly public delivery path.
- Object access requires both storage policy checks and a matching authoritative
  database record.
- Upload validation covers size, MIME type, extension, ownership, and malware/content
  handling before downstream processing.

## 7. Delivery and operations

The environment progression is:

```text
local Supabase + local apps/web
  -> pull request CI and Vercel preview
  -> beta/staging Supabase + private Vercel deployment
  -> production Supabase + production Vercel deployment
  -> controlled domain cutover with legacy rollback
```

Required CI gates:

- pinned toolchain and lockfile;
- lint, format, typecheck, unit tests, build, and secret scan;
- local migration reset from zero;
- generated database type drift check;
- RLS identity-matrix tests for anon, owner, unrelated user, operator, and Andrea;
- route, sitemap, and bundle checks for Jarvis privacy and PrintFlow phase boundary;
- pre-render/SSR smoke tests and authenticated cache-header checks;
- dependency audit and database advisors;
- deployment smoke test before promotion.

Production promotion is manual and protected. It requires a verified backup or
recovery point, migration review, smoke tests, monitoring, and an explicit rollback
procedure. Local developer machines do not push directly to production.

## 8. Ownership and integration contract

| Area                        | Atlas Frontend                               | Atlas Backend                                  | Atlas TPM                                                           |
| --------------------------- | -------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| `apps/web/**`               | Owns                                         | Reviews API use                                | Integrates and reviews                                              |
| `packages/ui/**`            | Consumes after M-002 integration             | No write                                       | Protects M-002 scope                                                |
| `packages/api-contracts/**` | Reviews/consumes                             | Owns                                           | Reviews contract integration; Root approves architectural contracts |
| `packages/domain/**`        | Reviews/consumes                             | Owns                                           | Checks requirement traceability                                     |
| `supabase/**`               | No write except generated client consumption | Owns                                           | Reviews migrations and security evidence                            |
| `.github/workflows/**`      | Owns frontend jobs with backend review       | Owns database/deploy jobs with frontend review | Owns final integration                                              |
| `apps/legacy-web/**`        | Read-only until cutover packet               | No write                                       | Enforces freeze and rollback readiness                              |

Implementers do not approve their own work. Atlas TPM performs integration and
Technical Review; Codex Root makes the architecture gate decision.

## 9. Milestones and gates

| Gate                               | Exit condition                                                                                            | Status                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| PA-GATE-000 Runtime governance     | Root and roles accepted; boundaries pass; nested delegation reliable                                      | PARTIAL: roles pass, nested runtime delegation failed twice |
| PA-GATE-001 Architecture baseline  | This pack reviewed; decisions and first packet accepted                                                   | TECHNICAL PASS / HOLD: depends on PA-GATE-000               |
| PA-GATE-002 Rendering spike        | React Router Framework Mode proves pre-render, SSR, auth middleware, Vercel packaging, tests, and budgets | BLOCKED by PA-GATE-001                                      |
| PA-GATE-003 Secure data foundation | Local Auth, migrations, RLS matrix, storage policies, typed contracts, and security checks pass           | BLOCKED by PA-GATE-001                                      |
| PA-GATE-004 Public parity          | Atlas public routes meet content, SEO, accessibility, performance, and analytics acceptance criteria      | BLOCKED                                                     |
| PA-GATE-005 Private beta           | Account and Command Center security pass; beta environment, backup, monitoring, and end-to-end QA pass    | BLOCKED                                                     |
| PA-GATE-006 Production cutover     | Frozen production binding, domain plan, rollback rehearsal, and final PO release approval pass            | BLOCKED by `BLK-BASE-001`                                   |

## 10. First delegable implementation packet

Packet ID: `PA-IP-001`  
Purpose: prove the frontend rendering architecture and backend security foundation
locally without product features or remote deployment.

Authorization status: HOLD until PA-GATE-000 and PA-GATE-001 close.

Precondition: version this architecture pack in an isolated branch/worktree after
the current M-002 staged work is committed or otherwise isolated. Do not mix this
packet with the active UI wave.

### Atlas Frontend ownership

- `apps/web/package.json`
- `apps/web/vite.config.ts`
- `apps/web/react-router.config.ts`
- `apps/web/src/**` or the Framework Mode route directory replacing it
- frontend-only tests under `apps/web/**`

Acceptance criteria:

- Framework Mode builds and runs without experimental RSC support;
- `/` is pre-rendered;
- `/account` and `/command` are server-rendered boundaries;
- authenticated boundaries emit private/no-store behavior;
- `/command` remains absent from public navigation and sitemap;
- no Jarvis implementation or public-bundle import exists;
- PrintFlow remains Coming Soon only;
- existing `@atlas/ui` components are consumed without modifying their active M-002
  files.

### Atlas Backend ownership

- `supabase/config.toml`
- `supabase/migrations/**`
- `supabase/tests/**`
- `supabase/functions/**`
- `packages/api-contracts/**`
- `packages/domain/**`
- backend-only CI helpers when separately assigned by TPM

Acceptance criteria:

- local Auth is enabled;
- migrations rebuild a clean local database;
- authorization tables are private and exposed tables have RLS;
- identity-matrix tests prove deny-by-default behavior;
- no `service_role` or secret value is committed or exposed to browser code;
- contracts compile and reject invalid privileged requests;
- no remote project is linked and no remote migration or function is deployed;
- no operational Jarvis or PrintFlow endpoint exists.

### Atlas TPM review

- verify disjoint ownership and absence of unrelated changes;
- run the complete repository gate suite;
- review the RLS matrix and route/cache boundaries;
- reject any implementer self-approval;
- issue a PASS/FAIL recommendation to Codex Root with exact evidence.

## 11. Blockers and deferred PO inputs

Current technical blockers:

- nested runtime delegation from TPM to implementers failed to return within the
  timebox in two independent attempts;
- the active branch contains staged M-002 UI work and cannot safely host PA-IP-001
  until that work is isolated;
- Supabase has no domain migrations, RLS policies, Edge Functions, or remote
  environment yet;
- the Atlas production pipeline and domain cutover path do not exist yet.

The technical content of PA-GATE-001 does not require further product input. Closing
PA-GATE-000 now requires one governance decision from Andrea: keep strict nested
delegation and wait for a reliable runtime, or authorize a temporary runtime bridge
where Root starts the implementer processes from TPM-issued scopes and TPM retains
integration and Technical Review. PA-IP-001 stays on hold until that choice is
recorded.

Andrea is also required later for remote project ownership/credentials, any
paid-plan choice, production domain control, the Frozen Baseline binding, and final
release approval.

## 12. Current-source references

- React Router rendering and pre-rendering:
  https://reactrouter.com/start/framework/rendering
- React Router deployment:
  https://reactrouter.com/start/framework/deploying
- Supabase RLS:
  https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Auth SSR:
  https://supabase.com/docs/guides/auth/server-side/advanced-guide
- Supabase environment management:
  https://supabase.com/docs/guides/deployment/managing-environments

# Architect Directive AD-014 - Web App Production Readiness Program

> **Directive ID:** AD-014
> **Program:** WPR - Web App Production Readiness
> **Owner:** Codex Root - Chief Architect & CTO
> **Date:** 2026-08-06
> **Status:** BINDING FOR PLANNING AND TASK-PACKET ISSUANCE
> **Authority:** Andrea - Product Owner and Client, direct instruction recorded 2026-08-06

## 1. Client Outcome

Bring NoLimits3D to a publishable, production-ready Phase 1 web application while excluding
operational PrintFlow. Engineering must complete the application against governed schemas and
fixtures so that the only final client-owned inputs are Andrea's real data, commercial/legal
configuration, provider credentials, and business acceptance.

This directive accepts Andrea's outcome and technical delegation. It does not authorize broad
ungoverned implementation. Every source change still requires an approved Task Packet with an
exact owner, allowed files, forbidden files, evidence, tests, rollback, and stop conditions.

## 2. Binding Product Boundary

The program includes the Phase 1 public web, customer journeys, and the minimum private content
management capability required to replace data without an application deploy. It includes:

- information architecture, navigation, homepage, content, services, portfolio, inspiration,
  events, contact, legal routes, search, catalog, product detail, cart, and controlled checkout;
- data-driven lantern configuration with a truthful static/2D fallback when no approved render
  asset exists;
- project, service, support, and quote intake with controlled uploads and human follow-up;
- lightweight customer access for authorized requests, configurations, quotes, and orders;
- admin-managed catalog/content/media/configuration needed for Andrea's final data insertion;
- deployment, security, accessibility, performance, observability, backup, rollback, and release
  evidence required for a real public cutover.

The program excludes:

- operational PrintFlow, slicing, G-code, worker control, public PrintFlow account or download;
- Jarvis UI, route, endpoint, prompt, memory, tools, provider integration, or public exposure;
- automatic final STL pricing or any final quote without Andrea's human review;
- invented business facts, prices, products, materials, media, testimonials, legal text, policies,
  availability, fulfillment promises, tax rules, or payment-method activation;
- production access or cutover while `BLK-BASE-001` is open.

## 3. Architecture Decisions

### 3.1 Deployment And Runtime

- GitHub remains the authoritative source repository.
- Vercel is the target public frontend host and `nolimits3d.store` the canonical domain.
- Supabase PostgreSQL, Auth, Storage, RLS, and Edge Functions provide the Phase 1 backend.
- The public application must run without the PC Worker, PrintFlow, Jarvis, or WebGL.
- `apps/legacy-web` remains the public fallback until an approved cutover and rollback test.

These decisions bind implementation to accepted Bible ADR-0013 and ADR-0019. No production
project link, migration push, function deploy, secret write, or domain change is authorized by
this directive alone.

### 3.2 Client-Owned Data And Fixtures

All client-owned content must enter through centralized, typed contracts. Development and tests
may use explicit fixtures, but fixtures must be isolated from production data and visually or
structurally identifiable as non-final.

The production-readiness guard must fail closed when any launch-required field remains missing,
uses a placeholder marker, lacks provenance/rights approval, or has not received the required
business/legal approval. Fixture data must never silently become public business content.

The final Andrea input manifest must cover at least:

- business identity, contacts, hours, service area, active contact channels;
- products, variants, materials, prices, taxes, availability, commercial mode, fulfillment;
- catalog, configurator, portfolio, event, blog, SEO, media, alt text, and rights/provenance;
- testimonials and claims with approval evidence;
- payment, delivery, returns, warranty, privacy, cookies, terms, retention, and consent copy;
- provider/project identifiers and production credentials supplied through approved secret paths.

### 3.3 Catalog, Cart, Checkout And Account

- One Unified Commerce Catalog represents products, services, configurables, event offers, and
  quote-only items using explicit commercial modes and checkout rules.
- Client cart state is provisional. The backend must revalidate item, variant/configuration,
  quantity, availability, price, fulfillment, and allowed payment mode before order creation.
- Checkout and payment paths vary by commercial mode. Automatic online payment is not required
  for quote-only or admin-confirmed offers.
- Initial commercial methods are configurable and inactive until Andrea selects and supplies the
  real configuration. Card or wallet providers remain non-blocking future capability.
- Customer access uses Supabase Auth with a lightweight passwordless-first flow, deny-by-default
  RLS, object-level authorization, revocation, expiry, audit, and cross-account negative tests.

### 3.4 Intake, Upload And Privacy

- Production intake uses server-validated submission, explicit consent, controlled upload,
  retention, abuse protection, delivery status, audit, and failure recovery.
- A `mailto:` link may exist only as a visible fallback. It is not the primary production
  submission or persistence contract.
- Legal/privacy text remains client-owned launch data. Engineering may use clearly marked test
  placeholders, but no agent-authored legal claim can satisfy the production gate.
- Final STL quote state is impossible without Andrea's recorded review and approval.

### 3.5 Configurator And Rendering

- Configurator options, compatibility, capability, validation, and price behavior are data-driven
  and are not hardcoded as business truth in Frontend code.
- Preview, technical feasibility, and final confirmation remain distinct states.
- A static or 2D fallback must support configuration and submission without WebGL.
- Real models, images, dimensions, materials, electric specifications, and constraints are part
  of Andrea's final data manifest.

## 4. Governed Delivery Sequence

### WPR-M1 - Baseline, Inventory And Readiness Contract

Bind the approved baseline, inventory every route and capability against the Bible, define the
client-data manifest and production-readiness guard, and establish an exact gap register. Product
feature implementation starts only through packets derived from this milestone.

### WPR-M2 - Data, Security And Operational Foundation

Implement typed contracts, Supabase schema and migrations, RLS, Auth boundary, Storage/upload,
fixture strategy, seed/reset, secret/env validation, backup/restore, and observability foundations.

### WPR-M3 - Complete Non-PrintFlow Web Experience

Implement every approved public, customer, and minimum admin surface against the governed data
contracts. Frontend and Backend write sets remain disjoint. Browser, accessibility, responsive,
error, loading, empty, and denied states are required behavior, not optional polish.

### WPR-M4 - End-To-End Production Readiness

Run canonical gates, migration and RLS tests, real-browser journeys, visual/responsive checks,
performance budgets, security/privacy checks, backup/restore drill, observability verification,
preview deployment, fallback, and rollback rehearsal.

### WPR-M5 - Andrea Data Insertion And Go-Live

Insert only approved real data through governed import/admin paths, clear every readiness-guard
finding, complete business/legal acceptance, close `BLK-BASE-001`, run final release gates, and
obtain explicit deployment and cutover authorization.

## 5. Team Coordination

- Codex Root owns architecture, Blueprint decisions, Architect Review, and program boundaries.
- Atlas TPM owns milestone planning, Task Packets, dependencies, integration, evidence, and
  Technical Review; it writes no production code.
- Atlas Frontend and Atlas Backend are the only active Atlas implementers and may work only in
  disjoint packet scopes; they cannot self-approve or create subagents.
- Claude Team is an external peer development team. It may contribute proposals, review,
  isolated evidence, and separately scoped drafts through the shared channel. Production code
  enters the active codebase only through Atlas-owned Task Packets and independent review.
- Before any write, both teams must declare scope in
  `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`. Any overlap stops
  both owners until Atlas TPM resolves it.

## 6. Required Gates

Every milestone uses the relevant focused gates and, before integration or release, the canonical
repository order:

```text
pnpm build
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm secret:scan
pnpm dependency:audit
pnpm guard:scope
pnpm guard:migrations
pnpm guard:source-bindings
```

Production readiness additionally requires real-browser E2E and accessibility evidence, RLS and
cross-account negative tests, migration dry-run, restore evidence against RPO 24h / RTO 8h,
preview smoke tests, release monitoring, legacy fallback, and rollback rehearsal.

## 7. Authorization State

- WPR program architecture: **APPROVED**.
- WPR-M1 charter and Task Packet planning: **AUTHORIZED**.
- `TSK-WPR-001` evidence-preserving quarantine/restore: **AUTHORIZED AS ALREADY ISSUED**.
- WPR-M2 through WPR-M5 implementation: **REQUIRES MILESTONE-SPECIFIC APPROVAL AND PACKETS**.
- `AD-013` implementation draft: **HISTORICAL INPUT ONLY; NO INHERITED APPROVAL**.
- Commit, push, merge, production access, deployment, and cutover: **NOT AUTHORIZED**.

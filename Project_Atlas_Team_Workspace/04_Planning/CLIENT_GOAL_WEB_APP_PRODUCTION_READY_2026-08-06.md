# Client Goal: Web App Production Ready Without Operational PrintFlow

## Metadata

- Status: DRAFT / BLOCKED FOR IMPLEMENTATION; PLANNING MAY CONTINUE
- Date: 2026-08-06
- Product Owner / Client: Andrea
- Chief Architect: Codex Root
- TPM: Atlas TPM
- Implementers: Atlas Frontend, Atlas Backend
- External peer team: Claude Team in Claude app plus its subagents
- Cross-team channel:
  `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`
- Source request: Andrea asked the development teams to treat him as the client and bring the
  NoLimits3D codebase to a state where the web app is ready to go online, excluding
  operational PrintFlow, with only Andrea's real business data left to insert.

## Planning Verdict

BLOCKED FOR IMPLEMENTATION; PLANNING MAY CONTINUE.

The objective is product-valid and matches the Phase 1 direction in the Documentation Bible:
the public NoLimits3D web app must work without operational PrintFlow, Jarvis must remain
private, and the final launch must not depend on the PC worker. It is not ready for
implementation as a single broad task because current governance still requires an approved
Blueprint/milestone slice and exact Task Packets before production-code changes.

Production remains blocked by `BLK-BASE-001` until the Documentation Bible v1.0 Frozen
Baseline binding record is complete and approved by Andrea plus Codex Root. M0R closure
authorized the next planning gate only; it did not authorize release, deployment, production
access, or production binding.

Atlas TPM sidecar review returned `BLOCKED`: no approved parent milestone or Blueprint slice
currently authorizes implementation; the inherited frontend diff remains rejected and unstable;
privacy, commercial, account/auth, checkout/payment, fulfillment, rendering, deployment,
backup, rollback, and observability decisions are still missing or unresolved. The next safe
work is planning and explicit worktree disposition, not product-code integration.

## Client Outcome

Target state:

1. The public web app is functionally complete for Phase 1 surfaces that do not require
   operational PrintFlow.
2. PrintFlow is visible only as `Coming Soon`, with no public operational route, endpoint,
   download, account surface, dashboard, worker control, or implied availability.
3. Jarvis is not public, not customer-facing, not a development-team member, and not
   implemented before its dedicated future Blueprint and server-side identity/capability
   gates.
4. The app can run end-to-end with governed placeholder/fixture data, but cannot publish
   invented products, prices, media, testimonials, event data, legal text, or business
   constraints.
5. The only client-side inputs left before go-live are Andrea's real approved data and
   approvals.
6. The system passes automated and browser verification gates, and the handoff lists every
   remaining Andrea-supplied data item.

## Non-Scope

- Operational PrintFlow implementation.
- Public Jarvis, customer assistant Jarvis, or any Jarvis runtime capability.
- Public inbound PC worker control.
- Production deployment or public cutover while `BLK-BASE-001` is open.
- Real business data invented by an agent: products, prices, materials, margins, delivery
  thresholds, legal/privacy copy, testimonials, client names, event dates, media rights, or
  commercial policies.
- Changes to the Documentation Bible without a dedicated baseline/change-control packet.

## Current Evidence

- `Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md` says M0R is done,
  M1 is the next planning gate only, and `BLK-BASE-001` blocks production.
- `Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md` keeps `BLK-BASE-001` open
  as a production blocker.
- `Project_Atlas_Team_Workspace/07_Reports/INHERITED_FRONTEND_DIFF_TECHNICAL_REVIEW_2026-08-06.md`
  rejects the inherited frontend diff because it introduces speculative catalog/cart/intake
  behavior, privacy risk, and cart persistence risk outside the approved packet boundaries.
- `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-011_ENGINEERING_DECISION_AUTHORITY_SUPABASE_AND_E2E.md`
  delegates engineering decisions but explicitly excludes real business data and product or
  commercial constraints not derivable from code or the Documentation Bible.

## Required Decisions Before Code

1. Codex Root must approve a parent Blueprint/milestone slice for "Phase 1 Web App Production
   Readiness without operational PrintFlow."
2. Atlas TPM must issue exact Task Packets with one implementer, one objective, allowed
   files, forbidden files, evidence paths, rollback expectations, stop conditions, and
   disjoint write sets.
3. Andrea must later provide or approve real business data before any public launch can
   represent it as final.
4. Andrea plus Codex Root must close the production binding record before deployment or
   cutover.

## Proposed Team Goals

### Codex Root

- Own architecture and Blueprint decisions.
- Approve or reject milestone readiness.
- Preserve product invariants: PrintFlow `Coming Soon`, Jarvis private, legacy web fallback,
  no production while `BLK-BASE-001` is open.
- Refuse fake business data and fake production readiness.

### Atlas TPM

- Convert this client goal into a governed milestone plan and exact Task Packets.
- Keep Frontend and Backend write sets disjoint.
- Integrate handoffs, verify evidence, and perform Technical Review.
- Coordinate with Claude Team through the file-based channel when work or evidence crosses
  app/team boundaries.
- Stop on overlap, missing authority, missing privacy/legal decision, missing data, or failed
  gate.

### Atlas Frontend

- Deliver the public web app user experience for approved Phase 1 surfaces.
- Replace rejected speculative UI with data-driven, honest, accessible states.
- Implement route behavior, responsive UI, keyboard flows, a11y coverage, error states,
  loading states, and browser-verified evidence.
- Avoid backend schema, RLS, migrations, secrets, deployment, and production data.

### Atlas Backend

- Deliver data contracts, Supabase schema/migrations when authorized, RLS, server-side
  validation, storage/upload controls, audit, seed/fixture strategy, environment checks, CI
  guard coverage, backup/rollback evidence, and privacy/security controls.
- Avoid public UI implementation and invented product/commercial data.

## Proposed Packet Sequence

### Packet 0: Baseline and Worktree Decision

- Packet file:
  `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-000-WORKTREE-DISPOSITION.md`
- Implementer: Atlas TPM only.
- Objective: decide what to do with the inherited rejected frontend diff before any new
  implementation.
- Output: Technical Review addendum with one of: revert, quarantine, supersede through new
  packets, or split salvageable changes into governed scopes.
- Coordination: record any Codex/Claude agreement or disagreement in
  `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`.
- Stop condition: any attempt to integrate current dirty app files without a new approved
  parent packet.
- Current TPM verdict: this packet is the next safe gate. No Frontend or Backend
  implementation packet is READY until this disposition is complete.

### Packet 1: Phase 1 Production-Readiness Milestone Charter

- Implementer: Atlas TPM.
- Objective: create a milestone charter and sprint plan for the client goal.
- Allowed files: `Project_Atlas_Team_Workspace/04_Planning/**`,
  `Project_Atlas_Team_Workspace/06_Handoffs/**`, `Project_Atlas_Team_Workspace/07_Reports/**`.
- Forbidden files: `apps/**`, `packages/**`, `supabase/**`, `NoLimits3D_Documentation_v0.96/**`,
  production config, secrets, deployment config.
- Verdict target: READY only after Product Owner priority and Codex Root architecture approval
  are both recorded.

### Packet 2: Backend Foundation for Launch-Ready Data Shells

- Implementer: Atlas Backend.
- Objective: define and verify the minimal backend/data foundation for catalog, content,
  intake, media references, privacy consent, and audit without real business data.
- Candidate scope: `supabase/**`, `packages/domain/**`, `packages/api-contracts/**`,
  backend tests, guard fixtures, evidence files.
- Non-scope: frontend routes, real products/prices/materials, payment provider activation,
  operational PrintFlow, Jarvis runtime.
- Required negative cases: RLS denial, malformed catalog item, unpublished/draft data not
  public, missing consent, overlong intake, unsafe upload metadata, and PrintFlow operational
  fields absent.

### Packet 3: Frontend Data-Driven Public Surfaces

- Implementer: Atlas Frontend.
- Objective: make catalog, search, cart/intake entry points, configurator shell, quote/contact
  flows, portfolio, events, blog, and PrintFlow page consume approved contracts/fixtures while
  staying honest when Andrea data is absent.
- Candidate scope: `apps/web/src/routes/public/**`, `apps/web/src/app/**`,
  `apps/web/src/test/**`, public static assets only when approved.
- Non-scope: schema, RLS, migrations, secrets, invented products/prices/media/testimonials,
  public Jarvis, operational PrintFlow.
- Required negative cases: no fake price as final price, no submit path without privacy and
  failure handling, no published Product schema for unavailable data, no PrintFlow active CTA.

### Packet 4: Privacy, Legal, SEO, Accessibility, and Browser QA Hardening

- Implementer: split into Backend for policy/data/security gates and Frontend for UI/browser
  gates. Atlas TPM must issue two disjoint packets.
- Objective: pass launch-grade technical gates that do not require Andrea's final business
  data.
- Required evidence: axe, keyboard, responsive browser traces, no-console-error E2E, robots
  and sitemap behavior, structured data truthfulness, privacy/consent checks, secret scan,
  dependency audit, scope guards, backup/rollback proof.

### Packet 5: Andrea Data Insertion and Publication Readiness

- Implementer: to be split after Andrea supplies data.
- Objective: insert approved real data and media, then run the full acceptance and launch
  evidence battery.
- Required Andrea inputs: product/service catalog, prices or pricing policy, materials,
  fulfillment rules, media with rights, founder photo/bio approval, contact/legal/privacy
  approvals, event/news/blog content, domain/hosting production decisions.
- Stop condition: any missing or contradictory real data item that would produce a public
  claim.

## Required Verification Battery

Before any claim of "ready for client acceptance":

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
pnpm guard:performance-budget
pnpm test:e2e
```

Also required:

- Real browser verification on desktop and mobile.
- Evidence archived under `Project_Atlas_Team_Workspace/05_Evidence/`.
- Technical Review by Atlas TPM.
- Architect Review by Codex Root.
- Product Owner acceptance by Andrea.

## Data Andrea Must Eventually Provide

- Final catalog items, variants, categories, availability, lead times, fulfillment rules, and
  commercial mode for each item.
- Prices or approved pricing policy, including what may be public and what requires review.
- Materials, machine/process capabilities, accepted tolerances, exclusions, and service
  boundaries.
- Real media assets with provenance, rights, alt text direction, and usage scope.
- Founder bio/photo approval and any first-person Andrea copy.
- Contact, legal, privacy, cookie/consent, retention, DPA/provider, and payment-provider
  decisions.
- Portfolio/case-study facts, customer permissions, event data, blog/news content, and SEO
  meta descriptions.
- Production domain/hosting/cutover approval after `BLK-BASE-001` is closed.

## Stop Conditions

- A team attempts production-code implementation without an approved packet.
- Frontend and Backend write sets overlap.
- A public surface invents business data or implies PrintFlow is active.
- A form collects personal data without privacy basis, minimization, failure path, and tests.
- A cart/order/quote flow trusts client-side state for price, availability, or policy.
- A launch claim is made while `BLK-BASE-001` is open.
- A deploy, push, merge, or production access is attempted without explicit packet authority.

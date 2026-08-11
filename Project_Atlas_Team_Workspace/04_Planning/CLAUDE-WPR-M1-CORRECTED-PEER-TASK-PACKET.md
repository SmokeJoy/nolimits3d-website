# Claude Peer Task Packet - CLAUDE-WPR-M1-CORRECTED

- **Packet ID:** `CLAUDE-WPR-M1-CORRECTED`
- **Program:** WPR - Web App Production Readiness
- **Milestone:** Blueprint 00 / M1, planning and readiness-contract slice only
- **Issued by:** Atlas TPM (`atlas_tpm`)
- **Issue date:** 2026-08-11
- **Status:** `APPROVED FOR ACKNOWLEDGEMENT`; implementation remains blocked until the activation protocol in this packet passes
- **Root input:** `Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/CLAUDE_WPR_M1_CORRECTIVE_SCOPE_DECISION.md`

## 1. Authority And Objective

This is the first post-governance-activation Claude Peer Task Packet under AD-015. It translates
the binding Codex Root corrective scope into one disjoint Claude implementation slice. It does
not alter product requirements, UX, architecture, the Documentation Bible, Jarvis, PrintFlow,
release policy, deployment, production, or `BLK-BASE-001`.

The single objective is to correct WPR-M1 by delivering an accurate route/capability baseline,
an exhaustive gap register, a closed-world versioned client-data contract and manifest, an
enforceable source-binding contract, a deterministic fail-closed production-readiness guard with
dedicated negative tests, and the AD-016 proposed reference set/objective rubric. This packet
contains no runnable app implementation.

The reviewed PR #25 branch is frozen historical evidence. PR #25, PR #26, and PR #27 must remain
unchanged; none may be reused, rebased, amended, closed, force-pushed, or used as this packet's
implementation base.

## 2. Accountable Ownership And Separation Of Duties

| Responsibility                 | Named owner                                               | Authority for this packet                                                                                                                      |
| ------------------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude implementation owner    | **Claude Team Lead - WPR-M1 Corrective Owner**            | Implements only the allowed write set after activation; may not self-approve or create/route through Atlas agents                              |
| Claude peer reviewer           | **Claude Team Reviewer - WPR-M1 Independent Peer Review** | Reviews the frozen Claude head and evidence in a distinct review pass; may not be the implementation author and may not approve integration    |
| Independent Technical Reviewer | **Atlas TPM (`atlas_tpm`)**                               | Performs independent Technical Review; may issue `APPROVED FOR INTEGRATION` or reject; writes only later TPM integration evidence/report paths |
| Architect Reviewer             | **Codex Root - Chief Architect & CTO**                    | Performs later Architect Review; does not implement this slice                                                                                 |
| Business and visual acceptance | **Andrea - Product Owner**                                | Separately accepts real client data, business/legal inputs, proposed competitor/reference set, and subjective aesthetic impact                 |
| Named integration owner        | **Atlas TPM (`atlas_tpm`)**                               | Sole owner of technical integration preparation after review; this packet grants no merge authority                                            |

Claude peer review supplements but never replaces Atlas TPM Technical Review. Claude Team may not
self-approve. Atlas TPM may approve technical integration only, never Architect Review, business
or visual acceptance, milestone closure, release, deployment, production, or blocker closure.

## 3. Git, Publication, And Explicit Implementation Base

### 3.1 Packet publication

- Packet branch: `codex/claude-wpr-m1-peer-packet`
- Packet worktree: `G:\Claude\NoLimits3D-website-claude-wpr-m1-packet`
- Exact packet parent/base: `d7777a84f5a397d3332544e5f2f0d73e2d48661d`
- Parent identity: authoritative `origin/main`, merge commit of green PR #29 at issuance
- Required packet-branch topology: exactly one unsigned planning commit directly above that
  parent when handed to Root for publication

The Peer Task Packet is an external governance artifact. Its publication commit is not the Claude
implementation base and need not be contained in the Claude implementation branch. Root must
publish and merge the final packet before acknowledgement, but that publication does not change
the base fixed below.

### 3.2 Claude implementation branch and exact base

- Required branch: `claude/wpr-m1-corrected`
- Required clean worktree: `G:\Claude\NoLimits3D-website-claude-wpr-m1-corrected`
- Exact implementation base:
  `d7777a84f5a397d3332544e5f2f0d73e2d48661d`
- Branch creation: only after Root publishes and merges the final packet and Atlas TPM/Codex Root
  verify the required local ACK
- Base drift: no rebase, merge from `main`, or silent base substitution. If authoritative inputs
  change, stop and request a new packet/base ruling.

Before branch creation, Claude must prove the branch and worktree path do not already exist. The
new worktree must be clean at exact HEAD
`d7777a84f5a397d3332544e5f2f0d73e2d48661d`. Existing PR #25/#26/#27 branches are read-only.

## 4. Dependencies And Read-Only Inputs

Claude must read, but must not modify, these authoritative inputs:

- `AGENTS.md`;
- `Project_Atlas_Development_Framework_v2.0.0/**`;
- `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-014_WEB_APP_PRODUCTION_READINESS_PROGRAM.md`;
- `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-015_DUAL_TEAM_PARALLEL_DELIVERY.md`;
- `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-016_VISUAL_IDENTITY_CLARITY_AND_IMPACT.md`;
- `Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/CLAUDE_WPR_M1_CORRECTIVE_SCOPE_DECISION.md`;
- `Project_Atlas_Team_Workspace/07_Reports/CLAUDE-WPR-M1-PR25-TECHNICAL-REVIEW.md`;
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`;
- `Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md` and
  `MILESTONE_REGISTER.md`;
- `NoLimits3D_Documentation_v0.96/**`, read-only for route/capability and accepted product facts;
- `apps/web/src/app/routes.tsx`, `apps/web/src/routes/public/navigation.ts`, public route source,
  account/command boundaries, and app tests, all read-only for factual classification;
- `apps/legacy-web/**`, read-only only to identify the fallback boundary;
- `docs/source-bindings/project-sources.json`, `scripts/guards/*.mjs`, and `package.json`, read-only
  except for the exact allowed writes below;
- PR #25/#26/#27 metadata and frozen heads, read-only for overlap/history; and
- the Node `24.18.0` / pnpm `9.15.0` toolchain already pinned by the repository.

No new dependency, dependency override, waiver, lockfile update, package installation mutation,
external service, production credential, or real Andrea data is authorized.

## 5. Exact Claude Allowed Write Set

Claude may create or modify only the following paths on `claude/wpr-m1-corrected`:

1. `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-ROUTE-CAPABILITY-INVENTORY.json` - new,
   machine-readable route and capability inventory.
2. `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-ROUTE-CAPABILITY-INVENTORY.md` - new,
   human-readable rendering with evidence citations.
3. `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-GAP-REGISTER.md` - new, exhaustive WPR-M1
   gaps, owners, severity, dependencies, and blocking state.
4. `Project_Atlas_Team_Workspace/04_Planning/CLIENT-DATA.schema.json` - new, versioned closed-world
   JSON Schema.
5. `Project_Atlas_Team_Workspace/04_Planning/CLIENT_DATA_MANIFEST.json` - new, structurally valid
   manifest containing no real Andrea data and remaining production-red.
6. `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-SOURCE-BINDING-CONTRACT.json` - new,
   machine-readable field-to-consumer source/deployment binding index.
7. `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-AD016-REFERENCE-SET-AND-RUBRIC.md` - new,
   proposed references and objective rubric, explicitly pending Andrea acceptance.
8. `scripts/guards/production-readiness-guard.mjs` - new, deterministic read-only guard.
9. `scripts/guards/production-readiness-guard.test.mjs` - new, dedicated positive and adversarial
   tests; do not broaden `scripts/guards/guards.test.mjs`.
10. `package.json` - modify only the `scripts` object to add exactly
    `"guard:production-readiness": "node scripts/guards/production-readiness-guard.mjs"`.
    No other byte-level semantic change is authorized; dependencies, devDependencies, pnpm
    overrides, engines, package manager, and existing scripts remain unchanged.
11. Claude evidence, only at these exact paths:
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/commands.tsv`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/environment.txt`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/git-and-scope.txt`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/overlap-check.md`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/integrity.txt`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/guard-tests.txt`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/production-readiness-summary.json`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/canonical-gates.txt`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/governance-validator.txt`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/secret-and-client-data-scan.txt`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/rollback-plan.md`;
    - `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/claude/peer-review.md`.
12. `Project_Atlas_Team_Workspace/06_Handoffs/CLAUDE-WPR-M1-CORRECTED-HANDOFF.md` - new,
    final Claude handoff to Atlas TPM.

The canonical-channel ACK is a coordination-only local append governed by section 7. It is not
part of the implementation branch write set and must never be committed or pushed by Claude.

## 6. Explicit Forbidden Write Set

Everything not enumerated in section 5 is forbidden. This includes, without limitation:

- `apps/**`, including `apps/legacy-web/**` and every runnable route, component, test, asset, and
  deployment surface;
- `packages/**`;
- `supabase/**`, SQL, migrations, RLS, auth, Storage, Edge Functions, seed data, and production
  project configuration;
- `pnpm-lock.yaml`, dependency manifests other than the one exact `package.json` script addition,
  dependency overrides, waiver files, or generated dependency state;
- `NoLimits3D_Documentation_v0.96/**` and all Documentation Bible files;
- `AGENTS.md`, `.codex/**`, `.agents/**`, `CLAUDE.md`, active Development Framework files,
  governance source, validators, Role Boundary Tests, directives, ADRs, Architect Reviews, and
  product requirements;
- `docs/source-bindings/project-sources.json` and all existing source-binding governance;
- existing `scripts/guards/guards.test.mjs` and every guard other than the one new readiness guard
  and its dedicated test;
- `001_SESSION_HANDOFF.md`, existing handoffs, existing reports, and all historical evidence;
- Atlas TPM planning, integration-evidence, and Technical Review paths;
- old PR #25/#26/#27 branches, files, commits, PR metadata, and heads;
- release, deployment, Vercel, GitHub Pages, domain, DNS, production, secrets, credentials, or
  real client/business/personal data;
- operational PrintFlow, worker, endpoint, download, account, or client path; and
- any Jarvis route, UI, endpoint, prompt, memory, tool, provider integration, public/customer
  access, or implementation.

Jarvis remains Andrea's strictly private future Command Center assistant and is not a development
agent or public service. PrintFlow remains non-operational and `Coming Soon`. `apps/legacy-web`
remains the fallback. `BLK-BASE-001` remains open.

## 7. Mandatory Local ACK And Activation Protocol

After Root publishes and merges the final packet, Claude must append exactly one ACK locally to:

`Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`

The ACK must state all of the following:

- packet path and SHA-256 hash;
- exact implementation base
  `d7777a84f5a397d3332544e5f2f0d73e2d48661d`;
- branch `claude/wpr-m1-corrected` and worktree
  `G:\Claude\NoLimits3D-website-claude-wpr-m1-corrected`;
- acceptance of every allowed and forbidden ownership boundary;
- dependencies/read-only inputs;
- explicit no-overlap result against active Atlas and Claude packets;
- acceptance of no self-approval and the named reviewer/integration chain; and
- confirmation that PR #25/#26/#27 remain unchanged.

The ACK is a local coordination write in the shared coordination checkout. It must not be
committed or pushed on an old PR branch, must not advance any PR head, and must not be copied into
the implementation branch. Claude may not create the implementation branch or write any packet
deliverable until Atlas TPM and Codex Root verify the local ACK. Missing, incomplete, committed,
pushed, stale-base, or overlapping ACK evidence keeps Claude production-code ownership frozen.

## 8. Required Deliverable Contract

### 8.1 Route and capability inventory

The JSON and Markdown inventories must be generated from and reconciled against the real router,
navigation, route source, Documentation Bible, AD-014, and active boundaries. They must cover at
least public catalog, search, product detail, cart, request/intake, configurator, account/auth,
uploads, policy/legal surfaces, observability/readiness, minimum admin/content management, legacy
fallback, PrintFlow, and Jarvis.

Every route and required capability must use exactly one primary classification:

- `implemented_test_backed`;
- `implemented_placeholder_honest_boundary`;
- `coming_soon`;
- `fallback_only`;
- `private_admin_only`;
- `forbidden_not_authorized`; or
- `missing_blocking`.

Separate fields must record route existence, content readiness, data provenance, auth exposure,
test evidence, source citations, and launch blocking state. A shell, notice, dead route, static
placeholder, or fallback link cannot be classified as a completed capability. Claims must resolve
PR #25's `/account`, legal-fallback, placeholder-route, business-identity, and omitted-capability
errors with exact source/Bible evidence.

### 8.2 Gap register

The gap register must map every blocking or incomplete inventory item to a stable gap ID, source
evidence, AD-014/AD-016 requirement, owner category, dependency, severity, current status, closure
evidence needed, and downstream packet. It must distinguish contract/readiness gaps from future
app, backend, client-data, legal/privacy, deployment, and Product Owner work. It cannot authorize
those later slices.

### 8.3 Client-data schema and manifest

Use versioned JSON Schema with a closed-world object model (`additionalProperties: false` at every
governed object boundary). The contract must define exact required category IDs, non-empty `fields`
arrays, stable unique field IDs, category, value type/format, whether Andrea must supply/approve,
lifecycle status, typed value or explicit absence, source/provenance, rights or consent, business
approval evidence, legal/privacy approval evidence where applicable, target source/deployment
binding, validation rules, blocking severity, and last-verification timestamp.

At minimum, fail closed on empty categories, absent/empty field arrays, missing schema properties,
unknown properties, duplicate IDs, type/format mismatch, invalid status or transition, and any
required `approved` entry without complete provenance, rights/consent, business approval,
applicable legal/privacy approval, and binding evidence. Placeholder/test/example values can never
satisfy production readiness. The committed manifest must contain no real Andrea data, secrets,
credentials, personal data, or invented business claims and must deterministically remain red.

### 8.4 Source-binding contract

The binding index must map every production-relevant manifest field to the exact intended
application/configuration consumer: repository-relative target, binding identifier, expected
consumption mechanism, deployment/environment contract where applicable, and verification rule.
The guard must prove both evidence completeness and actual use. Missing target, missing or unused
binding, approved-but-unconsumed value, stale binding, and hard-coded production value without an
approved manifest binding are blocking. Current app source is read-only, so unresolved real
bindings remain explicit gaps and keep the committed manifest production-red.

### 8.5 Guard and dedicated tests

The guard must be deterministic, read-only, fail closed, use non-zero exit on not-ready/invalid,
and emit a stable machine-readable JSON summary without exposing sensitive values. It must validate
the schema, manifest, required category/field registry, uniqueness, conditional evidence,
placeholder state, source/deployment binding, and production-red invariant for the committed
manifest.

Dedicated tests must cover at least:

1. empty category arrays;
2. category object without `fields` and category with empty `fields`;
3. missing required and unknown extra properties at each governed level;
4. duplicate category and field identifiers;
5. invalid value type/format and lifecycle status/transition;
6. required fields in `missing`, `draft`, `rejected`, `expired`, and
   `approved`-without-evidence states;
7. each independently missing provenance, rights/consent, business approval, applicable
   legal/privacy approval, and source binding;
8. placeholder/example/test value masquerading as approved;
9. target source absent, stale, not consuming the binding, approved-but-unused binding, and
   unbound hard-coded production value;
10. a complete valid non-production fixture;
11. a complete valid synthetic production-shaped fixture containing no real Andrea data; and
12. the real committed no-Andrea-data manifest remains `ready: false`.

Fixture-only success proves validator contract behavior, never production readiness. Synthetic
fixtures must be created in test-owned temporary directories or test memory and must not be
represented as Andrea-approved data.

### 8.6 AD-016 proposal and rubric

Provide a bounded proposed competitor/reference set and objective rubric for visual identity
coherence, clarity, information architecture, approved design-token/primitive use, accessibility,
responsive behavior, browser behavior, performance, trust, product inspection, and conversion
flow. State evidence methods and scoring anchors without copying competitor assets or copy.

The set and rubric remain `PROPOSED - PENDING ANDREA ACCEPTANCE`. Only Andrea may accept the
reference set and subjective aesthetic impact. This deliverable creates no UI implementation
authority and does not claim that accessibility, responsive, browser, visual, or performance
evidence exists for future UI changes.

## 9. Acceptance Criteria

The Claude handoff is reviewable only when every item below is true:

1. After packet publication and the verified local ACK, the implementation starts on exact base
   `d7777a84f5a397d3332544e5f2f0d73e2d48661d` in the exact clean branch/worktree, with no old-PR
   mutation.
2. The final diff contains only section 5 paths. No active Atlas or Claude packet overlaps them.
3. Route/capability classifications are accurate against the real router, Bible, AD-014, and
   source evidence and cover all required capability classes.
4. Empty categories, missing/empty field arrays, unknown properties, duplicate IDs, invalid
   status/transitions, and malformed typed values fail closed.
5. Required approved entries without provenance, rights/consent, business evidence, applicable
   legal/privacy evidence, or source-binding evidence fail closed.
6. Placeholder-as-approved, approved-but-unused, target missing, binding missing/stale/unused, and
   hard-coded unbound production values fail closed.
7. Schema and source binding are machine-readable, versioned, closed-world, and enforced by the
   production-readiness guard and dedicated tests.
8. The committed manifest contains no real Andrea data and returns a red machine-readable
   readiness result. Synthetic fixture success is never reported as production readiness.
9. The AD-016 reference set/rubric is present, objective, bounded, non-copying, and explicitly
   pending Andrea acceptance.
10. `package.json` changes only by the exact new guard script; dependency, override, lockfile, and
    existing-script integrity is proven.
11. All required commands pass with exact stdout/stderr and exit codes archived. Skipped or
    unavailable lanes are reported as unavailable, never green.
12. Dependency audit reports zero unwaived Critical/High findings and no new dependency or waiver.
13. Secret/client-data scans find no secret, credential, personal data, or real Andrea data.
14. PR #25 remains at `a1840d10c5f95903c3e43be6029fc37c0b7a73c5`, PR #26 at
    `f3f542004e8ff9b81f93332969275bb5d8d4c42f`, and PR #27 at
    `a42171fc8ea72d5d1754b9551d61ea5e446258e0`.
15. Atlas TPM can independently reproduce all contract, negative, scope, integrity, and canonical
    results from the frozen implementation head.

## 10. Required Tests And Gates

Run from the clean implementation worktree in this exact sequence and archive command, start/end
time, stdout, stderr, and exit code. Do not treat a skipped command as a pass.

### 10.1 Packet-specific gates

1. `node --test scripts/guards/production-readiness-guard.test.mjs`
2. `pnpm guard:production-readiness` - expected **non-zero** with a JSON result containing
   `ready: false` for the committed manifest; this expected red production state is a behavioral
   pass only if the reason set is complete and deterministic.
3. A dedicated positive synthetic-fixture invocation defined by the guard test interface - expected
   exit `0` and `ready: true`; the evidence must label it fixture-only and non-production.

### 10.2 Canonical AGENTS.md order

1. `pnpm build`
2. `pnpm lint`
3. `pnpm format:check`
4. `pnpm typecheck`
5. `pnpm test`
6. `pnpm secret:scan`
7. `pnpm dependency:audit`
8. `pnpm guard:scope`
9. `pnpm guard:migrations`
10. `pnpm guard:source-bindings`

### 10.3 Additional mandatory checks

- `pnpm governance:codex-native`
- exact diff/scope check against
  `d7777a84f5a397d3332544e5f2f0d73e2d48661d`
- clean-worktree and branch/base/topology check
- SHA-256 or Git object integrity for `NoLimits3D_Documentation_v0.96/**`
- exact `pnpm-lock.yaml` integrity against the implementation base
- semantic and byte-scope check that `package.json` changed only by the exact script addition
- repository secret scan plus a targeted scan proving no real Andrea/client data in the allowed
  artifacts or evidence
- overlap recheck against all active Atlas and Claude packets and remote PR #25/#26/#27 head check

`pnpm test:e2e` is `NOT_APPLICABLE` only because `apps/**` and runnable app behavior are forbidden.
The handoff must record that reason; it must not report E2E green. Accessibility, responsive,
browser, visual, and performance UI evidence are also `NOT_APPLICABLE` to this no-app slice, not
passed. If runnable app behavior changes, that is forbidden scope: stop rather than run E2E to
legitimize it.

## 11. Packet Publication Write Set And Overlap Check

The packet publication commit may contain exactly:

1. `Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/CLAUDE_WPR_M1_CORRECTIVE_SCOPE_DECISION.md`;
2. `Project_Atlas_Team_Workspace/04_Planning/CLAUDE-WPR-M1-CORRECTED-PEER-TASK-PACKET.md`;
3. one Atlas TPM issuance append in
   `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`;
4. planning evidence under
   `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/planning/`; and
5. `Project_Atlas_Team_Workspace/07_Reports/CLAUDE-WPR-M1-CORRECTED-PACKET-READINESS-REVIEW.md`.

At issuance, SEC-WPR-001 and WPR-007 are integrated in `d7777a84...`; they own no active write set.
Atlas Frontend and Atlas Backend own no files for this planning-only packet and no children are
created. PR #25/#26/#27 are frozen historical branches and own no new work. The section 5 Claude
write set is disjoint from this packet publication set and from every active Atlas/Claude packet.

Any overlap, changed contract, changed base, changed old PR head, or new active packet claiming a
section 5 path stops both affected tracks. Atlas TPM must record and resolve ownership before work
resumes. No stale-contract assumption is permitted.

## 12. Evidence And Handoff Requirements

The Claude implementation owner must create every exact section 5 evidence file with truthful raw
results. `commands.tsv` must record sequence ID, command, working directory, start/end timestamps,
exit code, expected result, actual result, and linked evidence file. Evidence must identify the
exact base and final implementation commit, toolchain, branch/worktree, diff, old PR heads, and
unavailable lanes.

The handoff must contain:

- packet path/hash and exact implementation base
  `d7777a84f5a397d3332544e5f2f0d73e2d48661d`;
- local ACK text and Atlas TPM/Codex Root verification reference, without committing the shared
  channel append;
- final branch, worktree, commit(s), parent(s), and clean status;
- files by Claude owner and confirmation of no other writers;
- acceptance matrix mapped to evidence;
- exact commands, exit codes, totals, expected-red readiness semantics, and unavailable lanes;
- inventory/schema/manifest/binding versions and hashes;
- dependency, lockfile, Bible, package, secret, and client-data integrity results;
- peer-review findings and disposition without self-approval;
- deviations, unresolved findings, risks, and rollback instructions; and
- explicit request for independent Atlas TPM Technical Review.

Missing evidence, fabricated green, unavailable lane reported as green, incomplete handoff, or a
dirty final worktree is `CHANGES REQUIRED`.

## 13. Commit, Push, PR, Integration, And Rollback Authority

### Authorized after activation and local green only

- Claude may make local commits only on `claude/wpr-m1-corrected` after all applicable local
  packet-specific, canonical, governance, scope, integrity, dependency, secret, and client-data
  checks have produced acceptable results. The expected non-zero committed-manifest readiness
  result is acceptable only under section 10.1 and must never be labelled production-green.
- After committing the complete handoff/evidence, Claude must rerun exact scope/topology/integrity
  checks. Claude may push only that branch after those post-commit checks are green.
- Claude may open a **draft PR only after the complete handoff is committed and pushed**. The draft
  PR must target the integration base directed by Atlas TPM and must link this packet and evidence.

### Not authorized

- no push before all local evidence is complete;
- no non-draft PR;
- no merge, rebase, force-push, direct-to-main write, deploy, release, production access, domain or
  environment change, milestone closure, `BLK-BASE-001` closure, Architect approval, business or
  visual acceptance, waiver, or self-approval;
- no change to PR #25/#26/#27 or their branches; and
- no Atlas implementation child or substitution of Claude for Atlas TPM Technical Review.

### Rollback

Before push, rollback is limited to the packet branch and packet-owned paths: restore the one
existing allowed file (`package.json`) from
`d7777a84f5a397d3332544e5f2f0d73e2d48661d`, remove only newly created packet-owned files after
validating each absolute target remains inside the implementation worktree, and archive the
disposition. Never reset, stash, clean, or alter another worktree.

After push, rollback must use a normal revert commit limited to this packet's implementation
commit(s), performed only under Atlas TPM direction. No history rewrite or force-push is allowed.
Because this slice changes no app, database, deployment, or production state, rollback has no
runtime/data migration step.

## 14. Stop Conditions And Escalation

Stop immediately and return to Atlas TPM when any of the following occurs:

- final packet is unpublished, ACK is missing/unverified, branch/worktree/base differs from the
  explicit values in section 3.2, or the worktree is not clean before implementation;
- any section 5 path overlaps another active track or an authoritative contract changes;
- any write outside section 5 occurs, including an old PR/channel commit;
- PR #25/#26/#27 head changes;
- schema, manifest, guard, binding, inventory, or evidence cannot close a PR #25 finding;
- any required gate fails unexpectedly, is skipped, or is unavailable;
- dependency audit finds an unwaived Critical/High issue or any dependency/override/lockfile drift;
- any real Andrea/client data, secret, credential, personal data, or competitor asset/copy appears;
- production readiness is reported green from fixtures or while real Andrea data/approvals and
  `BLK-BASE-001` closure are absent;
- app behavior, Supabase, migration, legacy fallback, PrintFlow, Jarvis, deployment, release, or
  production would need to change; or
- a decision would alter product requirements, UX, architecture, governance, or Andrea's separate
  acceptance authority.

Escalation authority is Atlas TPM for scope, overlap, evidence, and Technical Review; Codex Root
for architecture, Blueprint, contract deviation, and later Architect Review; Andrea for real
client data, business/legal decisions, reference-set acceptance, and subjective visual acceptance.

## 15. Gates After Claude Handoff

1. Independent Claude peer review, with no self-approval.
2. Independent Atlas TPM Technical Review. Missing evidence or unavailable lanes fail closed.
3. Only an Atlas TPM `APPROVED FOR INTEGRATION` may advance the implementation to Codex Root.
4. Codex Root Architect Review.
5. Andrea accepts the proposed reference set and any applicable business/legal/client-data or
   subjective visual matters separately.

This packet never authorizes milestone closure, merge, release, deployment, production access, or
production readiness. Production remains red until real Andrea data, approvals, enforceable live
bindings, all later gates, and `BLK-BASE-001` resolution exist.

# Claude PR #25 WPR-M1 Baseline Inventory - Atlas TPM Technical Review

## Verdict

**CHANGES REQUESTED**

PR #25 is not merge-safe against base `bb94b169811c69a0487657c38dfb9a0b6d50d64d` and requested
frozen head `7d214849fbaf7846a69f3cf7f672baf247a7d22a`. The live PR has additionally advanced to
`a1840d10c5f95903c3e43be6029fc37c0b7a73c5`, so it no longer represents the frozen review object.

This verdict is independent Atlas TPM Technical Review only. It is not Architect Review,
Product Owner business or visual acceptance, milestone closure, merge authorization, release,
deployment, production access, or a waiver.

## Findings ordered by severity

### Critical - TR-PR25-001: required dependency gate is red

The clean GitHub run for frozen head `7d214849...` failed `pnpm dependency:audit` on one high
`js-yaml` advisory (GHSA-5p4m-2wfm-xmqj / CVE-2026-59870), exit 1. The current-head clean run
also failed and now reports two high advisories: the same `js-yaml` finding plus `nanoid`
GHSA-2v37-7h3g-55p8. Both runs skipped the downstream standalone scope, migration, and
source-binding gates.

Corrective direction: Codex Root retains security remediation/risk authority. Remediate through a
separate approved security packet; do not waive or override. Re-run the complete canonical order
in a clean checkout at the exact corrected head.

### Critical - TR-PR25-002: readiness guard permits incomplete or evidence-free manifests

`scripts/guards/production-readiness-guard.mjs:22-47` iterates absent categories/fields as empty,
uses a truthy `required` flag, and accepts `status: "approved"` without provenance, rights,
business approval, or legal approval evidence. Exact execution from the frozen Git object returned
`ready: true` for an empty category array, a category with no fields array, and a required approved
field with no evidence. This violates AD-014 section 3.2 and the packet's own fail-closed criterion.

Corrective direction: after a valid write packet exists, the responsible Claude tooling owner must
implement and test an explicit versioned schema and closed-world validator: exact required
categories/fields, required booleans, status enum, uniqueness, non-empty completeness, conditional
requirements, and evidence/provenance/approval references. Deleted or malformed content must fail.
Atlas TPM must independently rerun adversarial negatives.

### Critical - TR-PR25-003: the Claude implementation slice lacked an approved Peer Task Packet and activation gate

`CLAUDE-WPR-M1-BASELINE-INVENTORY-PACKET.md:1-13` explicitly records a self-scoped proposal with
no Atlas TPM confirmation. The requested base/frozen tree does not contain AD-014/015/016 or
AD-015-aligned `AGENTS.md`/Framework/RBT coverage. The local WPR-006 review is `CHANGES REQUESTED`
and the Claude production-code lane remains frozen. Product Owner outage direction does not replace
the AD-015 pre-approval and technical gates.

The packet also lacks required AD-015 fields: a named accountable Claude owner, exact full base,
real dependencies, an overlap check against all active packets, named cross-team reviewers, one
named integration owner, exact evidence path, complete gates, and an integration-safe rollback.

Corrective direction: this proposal may remain historical input but cannot be retroactively treated
as an approved implementation packet. Codex Root must first close governance/framework/RBT and
Architect Review prerequisites. Atlas TPM may then issue or approve a fresh, complete Peer Task
Packet with a disjoint write set and channel acknowledgement before any Claude write.

### High - TR-PR25-004: baseline inventory and gap register contain material factual errors and omit capabilities

The table has all 31 unique route paths, but it is not an accurate readiness baseline:

- `WPR-M1-BASELINE-ROUTE-INVENTORY.md:46` calls `/account` private although
  `apps/web/src/routes/public/navigation.ts:40-47,122-126` exposes public links to it.
- Lines 52-59 claim no equivalent legal link exists, but `Footer.tsx:73-78` links the legacy
  `/legal` fallback. The missing app-owned legal routes remain a gap, but the evidence is wrong.
- Many routes marked `LIVE` and several marked as needing no real client data render explicit
  placeholder markers. This includes home, Chi Siamo, Metodo, Qualita, service details,
  Realizzazioni, Eventi, Ispirati, Arte/HueForge, and Blog.
- Existing source contains contact email, phone, and address described as real legacy data, while
  the manifest and gap register describe all business identity fields as missing.
- The deliverable is a route table, not a full capability inventory. AD-014 product-detail,
  controlled-checkout, minimum-admin, customer-access, content-management, upload/privacy,
  operational, and negative-state gaps are not exhaustively mapped.

Corrective direction: replace binary route implementation labels with separate route existence,
content readiness, data provenance, auth exposure, and capability-state columns; reconcile every
claim to exact Bible/source evidence; and extend the gap register to every AD-014 capability.

### High - TR-PR25-005: manifest is not schema-complete and cannot prove no placeholder or invented data reaches launch

`CLIENT_DATA_MANIFEST.json` has six broad categories and 29 status-only fields, but no JSON Schema,
closed-world registry, actual typed value/source binding, provenance/rights record, approval actor,
approval evidence, or legal/business evidence reference. Several AD-014 items appear only in
labels or are absent as machine-checkable fields, including general variants/materials, claims,
payment copy, blog/content detail, and per-item approval evidence. Manual status edits can make the
guard green without proving the deployed source uses approved data.

Corrective direction: define the manifest schema and source-binding contract before implementation;
make fixture/non-final state structurally identifiable; bind every launch field to governed import
or admin data and approval evidence; test missing, extra, duplicate, stale, unbound, and
evidence-free cases.

### High - TR-PR25-006: AD-016 WPR-M1 deliverable is absent

AD-016 section 3 requires a bounded visual competitor-reference set and aesthetic comparison rubric
for Andrea's approval. Neither the packet, diff, nor gap register includes it.

Corrective direction: add this planning deliverable to the next approved WPR-M1 packet. Andrea alone
approves the reference set and subjective aesthetic impact; technical checks cannot substitute.

### High - TR-PR25-007: current PR head and coordination history are outside the frozen review object

The requested frozen head was `7d214849...`, but live PR #25 is at `a1840d10...`. The latter is a
post-freeze 129-line channel commit. The frozen range itself also contains six coordination commits
about PR #26, PR #27, outage state, and unrelated scope decisions after the core WPR-M1 commit.
These files were packet-listed, but their content is not a WPR-M1 deliverable and prevents a clean,
immutable review slice.

Corrective direction: do not merge the current PR. Under a future authorized packet, present one
frozen head containing only the approved WPR-M1 deliverables and the minimum packet-specific handoff;
retain unrelated coordination history separately without rewriting historical truth.

### High - TR-PR25-008: exact required evidence is missing or unavailable

The packet points to inline prose and a commit message instead of an evidence lane. The PR body
claims local scope/source-binding passes, but the clean frozen-head CI skipped standalone
`guard:scope`, `guard:migrations`, and `guard:source-bindings` after dependency audit failed. The
production-readiness command was not run by CI. No PR review exists.

Corrective direction: archive exact commands, stdout/stderr, exit codes, immutable SHAs, behavioral
probes, and clean-checkout results under the packet's approved evidence path. Treat every skipped or
unavailable lane as unavailable, never green.

## Verified passes and non-regressions

- Frozen file set: 9 paths, all listed by the self-scoped packet; no overlap with the eight dirty
  WPR governance candidate paths.
- Route enumeration: 31 unique source paths and 31 inventory rows.
- Clean frozen CI passed build, performance budget, lint, format, typecheck, tests, Playwright E2E,
  static Codex-native governance, and secret scan before dependency audit failed.
- Exact clean totals: guard 31/31, UI 137/137, web 162/162, E2E 57/57, static governance 153/153.
- The diff introduces no client values and changes no product route, `apps/legacy-web`, Supabase,
  Documentation Bible, PrintFlow, or Jarvis source.
- PrintFlow remains `Coming Soon`; Jarvis remains Andrea-only/private and unimplemented; the legacy
  fallback and `BLK-BASE-001` production block are not changed.
- GitHub shows no submitted review and no self-approval verdict. The implementation's pre-approval
  defect remains blocking.

## Files by owner

Claude WPR-M1 proposed deliverables/tooling:

- `Project_Atlas_Team_Workspace/04_Planning/CLAUDE-WPR-M1-BASELINE-INVENTORY-PACKET.md`
- `Project_Atlas_Team_Workspace/04_Planning/CLIENT_DATA_MANIFEST.json`
- `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-BASELINE-ROUTE-INVENTORY.md`
- `Project_Atlas_Team_Workspace/04_Planning/WPR-M1-GAP-REGISTER.md`
- `package.json`
- `scripts/guards/guards.test.mjs`
- `scripts/guards/production-readiness-guard.mjs`

Shared coordination/handoff content, not clean WPR-M1 deliverables:

- `001_SESSION_HANDOFF.md`
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`

Atlas TPM review artifacts:

- `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-PR25/integration/technical-review-evidence.md`
- `Project_Atlas_Team_Workspace/07_Reports/CLAUDE-WPR-M1-PR25-TECHNICAL-REVIEW.md`

Atlas Frontend / Atlas Backend: no files; no child agents created.

## Evidence

- `Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-PR25/integration/technical-review-evidence.md`
- Frozen CI run `31166991291`, job `92830005943`
- Current CI run `31498239725`, job `93801266325`
- PR #25 metadata, commits, files, comments, and empty reviews read through `gh` only

## Escalation authority and next gate

- Codex Root owns security remediation direction, governance/framework alignment, later Architect
  Review, and any authorization to advance. Atlas TPM does not approve architecture.
- Atlas TPM owns a future complete Peer Task Packet, disjoint scope allocation, evidence contract,
  and independent re-review. It may approve technical integration only after every blocker closes.
- Claude Team owns no active write packet and remains frozen. It must not amend this PR until the
  governing activation and packet gates authorize a new exact slice.
- Andrea separately owns client data, business/legal decisions, competitor-reference approval,
  business acceptance, and subjective visual acceptance.

Next gate: resolve the dependency advisories without waiver; complete and approve the AD-015
governance/framework/static/RBT lane and Codex Root Architect Review prerequisite; issue and
acknowledge a fresh complete Peer Task Packet; deliver a frozen, disjoint correction with clean
full-gate and adversarial evidence; then return to Atlas TPM Technical Review. Only a later
`APPROVED FOR INTEGRATION` may proceed to Codex Root Architect Review. No merge or production action
is authorized now.

# Task Packet - TSK-WPR-004-BE Dual-Team Governance Remediation

## Parent, Authority, And Ownership

- Program: WPR - Web App Production Readiness
- Governing directives: AD-014, AD-015, AD-016, and `INV-JARVIS-001`
- Parent disposition:
  `Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/TSK-WPR-003_REMEDIATION_DECISION.md`
- Rejected input:
  `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-003-DUAL-TEAM-GOVERNANCE-TECHNICAL-REVIEW.md`
- Milestone: WPR governance activation prerequisite; WPR-M1 planning is authorized, but this
  packet starts or closes no product milestone
- Implementer and sole implementation owner: `atlas_backend`
- Independent reviewer and named integration owner: Atlas TPM
- Repository: `G:/Claude/NoLimits3D-website`
- Branch: `main`
- Exact base / HEAD: `bb94b169811c69a0487657c38dfb9a0b6d50d64d`
- Diff base: `HEAD`
- Status: `READY`

Codex Root expressly authorized Atlas TPM to issue WPR-004 and delegate this exact Backend
scope. The current eight-file WPR-003 tracked diff is preserved only as unapproved draft input.
Do not restore it, infer approval from it, or inherit any WPR-003 green evidence. Reconcile and
verify the complete current bytes from zero.

This packet authorizes governance/configuration/static-validator remediation only. It does not
activate Claude production-code ownership, perform or substitute for Architect Review, grant
business or visual acceptance, start WPR product implementation, or authorize Git operations.

## Verified Live Baseline

Atlas TPM captured the following before packet creation on 2026-08-06 at
`2026-08-06T16:18:07.9374681Z`:

- branch: `main`
- HEAD: `bb94b169811c69a0487657c38dfb9a0b6d50d64d`
- repository tree: `3002b5a5848f1a0833d33143f9de214b74868b2d`
- Documentation Bible HEAD tree:
  `60e1b11dafeb58ab4e4377210820934b0f0b8f13`
- Documentation Bible path-scoped worktree status: empty
- full porcelain status: 27 paths, comprising nine tracked modifications and eighteen
  untracked paths
- UTF-8 SHA-256 of the full pre-packet `git status --porcelain=v1 --untracked-files=all`
  output: `BB3600B7BFA253535F283FFC0FB28248B40FD9788EF6E8DCE4FB312D6FE099D3`
- tracked modifications: the eight allowed WPR-003 draft inputs below plus the pre-existing,
  unrelated and forbidden
  `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`
- staged paths: none
- active production blocker: `BLK-BASE-001` is `OPEN - production blocker only`
- milestone register: M0R is done; Blueprint 00 / M1 is the next planning gate only

The canonical channel already records Codex Root's `WPR-003 CHANGES REQUESTED; WPR-004
REMEDIATION AUTHORIZED` notice and directs Claude Team not to edit the eight WPR-004 files or
either evidence lane. No active Atlas or Claude packet claims an overlapping write set. The
channel remains a read-only, forbidden input for this packet.

Fresh current-file fingerprints, captured after the rejected WPR-003 handoff drift and before
WPR-004 packet creation:

```text
SHA-256                                                          Bytes  Path
D1281F3437C80A5AD564CF1ADD4F29E057EE8EDE4536874A98FDC215B5B93B34   3849  .codex/agents/atlas-tpm.toml
3010B44342412A96E312980D7A7EAA9AA4ABA8D0A1B13E20B4BCB2CF301BACBC   7143  AGENTS.md
72E064205C705F7222EB61549E9FF403CEB08B1CD8B0AF79FB818161755B0D79  65282  Project_Atlas_Development_Framework_v2.0.0/000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v2.0.0.md
B327FD3114346CD0AEB39E110772889363EA5BDB323EF3C11F7A16B2CA9FA41C   1167  Project_Atlas_Development_Framework_v2.0.0/03_Registries/ROLE_AUTHORITY_MATRIX.csv
C6E70281EED3975A8A24E3329FAA961EE6EF63B10434D3367573DEE1E8C026A0   3504  Project_Atlas_Development_Framework_v2.0.0/CHANGELOG.md
0959B549B6BE0B3A2009AF951C2375D529BD2D4D6BFA441557F4B3DAAF0330CF   6225  Project_Atlas_Development_Framework_v2.0.0/manifest.json
941950DEA653E7E3DEC09D0C8E39CADD028030838C6DC1B786E3FDE1204C10EF   6580  Project_Atlas_Team_Workspace/00_Governance/CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md
39AD0293BC7960F8F5B71A182FA014A87F2BD46885F72D6CC473F243901B67E7  45336  scripts/governance/codex_native_team_test.py
```

Immediately before its first write, Atlas Backend must reverify branch, HEAD, Bible tree and
worktree, all eight fingerprints, the absence of staged paths, and the non-overlap declaration.
The new WPR-004 packet itself is an expected TPM-owned untracked path and is not drift. Any
other change to an allowed file or the WPR-004 Backend evidence lane is an overlap stop.

## Objective

Remediate the complete preserved WPR-003 governance draft so the active governance map,
Framework, runtime TPM instructions, canonical architecture record, and static validator
truthfully implement AD-015 and AD-016 while preserving every Atlas role and product boundary.
Correct all WPR-003 Technical Review findings, eliminate the unrepresented post-handoff drift,
and produce final-state-only evidence for independent Atlas TPM Technical Review.

## Exact Allowed Write Set - Atlas Backend Only

Atlas Backend may modify only these eight existing tracked files:

1. `.codex/agents/atlas-tpm.toml`
2. `AGENTS.md`
3. `Project_Atlas_Development_Framework_v2.0.0/000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v2.0.0.md`
4. `Project_Atlas_Development_Framework_v2.0.0/03_Registries/ROLE_AUTHORITY_MATRIX.csv`
5. `Project_Atlas_Development_Framework_v2.0.0/CHANGELOG.md`
6. `Project_Atlas_Development_Framework_v2.0.0/manifest.json`
7. `Project_Atlas_Team_Workspace/00_Governance/CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md`
8. `scripts/governance/codex_native_team_test.py`

Atlas Backend may create evidence only under this new lane:

9. `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-004/backend/**`

No Frontend write set exists. No Claude implementation write set exists. The eight tracked files
and the WPR-004 Backend evidence lane have one accountable owner: the single nested
`atlas_backend` child created for this packet.

## Exact Forbidden Files And Actions

Everything not explicitly allowed above is forbidden, including:

- all product code: `apps/**`, `packages/**`, public assets, product tests, UX, and architecture
- `NoLimits3D_Documentation_v0.96/**`
- `Project_Atlas_Development_Blueprint_v0.1/**`, including AD-014, AD-015, AD-016, and the Root
  remediation decision
- `Project_Atlas_Team_Workspace/01_Shared_Memory/**`, including
  `CODEX_CLAUDE_TEAM_CHANNEL.md`
- `Project_Atlas_Team_Workspace/04_Planning/**`, including this packet
- `Project_Atlas_Team_Workspace/06_Handoffs/**`
- `Project_Atlas_Team_Workspace/07_Reports/**`
- `Project_Atlas_Team_Workspace/08_Approvals/**`
- `.github/**`, `.claude/**`, `.agents/**`, `.codex/config.toml`,
  `.codex/agents/atlas-frontend.toml`, and `.codex/agents/atlas-backend.toml`
- `supabase/**`, migrations, database access, RLS changes, Edge Functions, Storage, Auth,
  secrets, credentials, production or provider systems
- dependency manifests, lockfiles, branch creation/switch/rewrite, staging, commit, push, pull
  request, merge, deploy, release, production access, or blocker/milestone closure
- restoring the WPR-003 draft, altering requirements/UX/architecture, activating Claude
  production code, posting a first Peer Task Packet, or editing any channel
- creating any child/subagent, asking another agent to create a child, self-approval, Technical
  Review, Architect Review, business acceptance, or subjective visual acceptance
- every pre-existing dirty or untracked file not explicitly listed in the allowed write set

An evidence-local `backend/handoff.md` is required and is not a write to the forbidden
`Project_Atlas_Team_Workspace/06_Handoffs/**` tree.

## Required Remediation Contract

1. Preserve the only Codex implementation chain exactly as
   `Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`. Claude Team is an independent
   peer delivery team, never an Atlas role, Codex agent, public service, or substitute for Atlas
   TPM Technical Review.
2. Preserve no self-approval, disjoint ownership, fail-closed integration, Codex Root Architect
   Review, and Andrea's separate business and visual acceptance.
3. Require every Claude implementation slice to have a pre-approved Peer Task Packet with an
   accountable owner, branch and dedicated worktree where supported, exact base, exact allowed
   and forbidden files, dependencies, acceptance criteria, tests, evidence, rollback, handoff,
   overlap check, cross-team reviewers, and one named integration owner.
4. Require Atlas TPM to allocate disjoint Atlas/Claude ownership, accept the imperative semantic
   marker `stop both affected tracks` for overlap or stale-contract conflict, independently
   review Claude output, and fail closed on missing evidence or unavailable lanes. Peer review
   supplements but never replaces Technical Review.
5. Keep Claude production-code ownership frozen until governance/framework alignment, static
   and Role Boundary Test coverage, Atlas TPM `APPROVED FOR INTEGRATION`, Codex Root Architect
   Review approval, and the first Peer Task Packet channel acknowledgement all exist.
6. Use AD-016's actual wording `design tokens and approved primitives`. Future UI packet
   requirements must name approved tokens/primitives and require accessibility, responsive,
   browser, visual, and performance evidence. Only Andrea may accept subjective aesthetic
   impact. This packet authorizes no UI work.
7. In static semantic marker checks, normalize case and collapse all whitespace before matching
   multi-word governance contracts. Markdown line wrapping and harmless case differences must
   not change the result. Do not hard-code newline placement. The checks must still fail closed
   when the required semantic contract is absent.
8. Validate Documentation Bible immutability through the canonical
   `NoLimits3D_Documentation_v0.96/**` marker and the unchanged tree
   `60e1b11dafeb58ab4e4377210820934b0f0b8f13`; do not require a redundant prose spelling as a
   substitute. The Bible worktree must remain path-scoped clean.
9. Reconcile all current bytes of `scripts/governance/codex_native_team_test.py`, including the
   post-handoff WPR-003 delta. Do not use the stale WPR-003 patch, logs, compile result, validator
   result, scope proof, rollback, or handoff as WPR-004 evidence.
10. Preserve `INV-JARVIS-001`: Jarvis is Andrea's strictly private future Command Center
    assistant, never public/customer-facing or a development agent. No implementation is
    authorized before a dedicated Blueprint, verified Andrea identity, explicit `jarvis.use`,
    per-tool server authorization, RLS, audit, privacy review, negative tests, human control of
    consequential actions, Architect Review, and Product Owner approval. Jarvis may draft but
    cannot approve CR/ADR material.
11. Preserve PrintFlow as `Coming Soon`, the PC worker as pull-only with no public inbound
    control port, `apps/legacy-web` as the public fallback, and `BLK-BASE-001` as open.
12. If any Framework content changes after the fresh fingerprints above, regenerate
    `Project_Atlas_Development_Framework_v2.0.0/manifest.json` from final bytes. Its size and
    SHA-256 entries must match the final Framework tree. Do not change the Framework version or
    directory.
13. After all implementation and manifest edits stop, freeze the eight allowed bytes. Only then
    generate the final binary-safe patch, rollback procedure, scope proof, final fingerprints,
    and Backend handoff. Any later implementation edit invalidates those artifacts and requires
    their regeneration and a full test restart from zero.

## Acceptance Criteria And Negative Cases

- The eight final tracked paths are the only Backend-owned tracked modifications. Unrelated
  concurrent paths may change because this is a shared worktree, but Atlas Backend must not
  write, restore, stage, or reinterpret them; it must fingerprint and classify them. Any change
  to an allowed file or the Backend evidence lane by another actor, ownership uncertainty, or a
  stale-contract conflict remains a mandatory stop.
- Governance sources consistently implement AD-015/AD-016 without adding Claude to Atlas agent
  configuration or weakening separation of duties.
- Static checks pass on the delivered state and named negative fixtures/probes fail when each
  critical marker is removed or semantically weakened.
- Whitespace/case-normalized checks accept wrapped/case-varied equivalents, the imperative
  `stop both affected tracks`, AD-016's real phrase, and the canonical Bible path contract.
- The exact Codex custom-agent set and disabled implementer delegation remain enforced.
- Framework manifest entries are truthful for final Framework bytes.
- Bible HEAD tree remains `60e1b11dafeb58ab4e4377210820934b0f0b8f13` and Bible status
  remains empty.
- Jarvis, PrintFlow, pull-only worker, legacy fallback, production blocker, activation freeze,
  no-self-approval, review, and acceptance boundaries remain unchanged.
- No product, Bible, directive, channel, planning, report, handoff-tree, approval, Supabase, Git,
  release, deployment, production, milestone, or blocker change occurs.
- Atlas Backend creates no subagent and does not approve its own output.

## Required Execution And Evidence Order

Run from repository root. Capture exact command, UTC start/end, exit code, stdout, and stderr in
the WPR-004 Backend evidence lane. No WPR-003 result may be copied or counted.

Pre-run boundary capture:

```text
git branch --show-current
git rev-parse HEAD
git status --short --branch
git diff --check
git rev-parse HEAD:NoLimits3D_Documentation_v0.96
git status --porcelain -- NoLimits3D_Documentation_v0.96
git diff --name-status
git ls-files --others --exclude-standard
python -m py_compile scripts/governance/codex_native_team_test.py
```

Then run the static validator exactly once from the final frozen implementation state:

```text
python scripts/governance/codex_native_team_test.py --repo .
```

Only after that static command completes, run the entire canonical sequence from zero and in
this exact order, even if a prior WPR packet ran the same command:

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

Do not edit implementation bytes between commands. Any failed or unavailable lane requires a
truthful Backend `CHANGES REQUESTED` handoff and later TPM `CHANGES REQUESTED` verdict. Preserve
the exact failure and mark every unexecuted later lane `NOT RUN`; never present it as green.

After the command sequence, repeat the boundary, scope, Bible, and final-fingerprint checks. If
they reveal allowed-scope/evidence overlap, ownership uncertainty, a stale-contract conflict, or
Backend modification of a forbidden path, the result is `CHANGES REQUESTED`; do not silently
repair after final evidence. Fingerprinted unrelated concurrent drift is reported truthfully and
preserved, but does not by itself fail this shared-worktree packet.

## Required Backend Evidence

Create only under
`Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-004/backend/`:

- `before-state.log` - branch, HEAD, full status, Bible tree/status, overlap check, and the eight
  pre-write fingerprints
- `00-py-compile.log`
- `01-static-validator.log`
- `02-build.log`
- `03-lint.log`
- `04-format-check.log`
- `05-typecheck.log`
- `06-test.log`
- `07-secret-scan.log`
- `08-dependency-audit.log`
- `09-guard-scope.log`
- `10-guard-migrations.log`
- `11-guard-source-bindings.log`
- `command-results.tsv` - exact command, UTC start/end, exit code, and result classification
- `bible-integrity.log`
- `final-fingerprints.log`
- `implementation.diff` - final binary-safe diff of only the eight tracked files
- `scope-verification.log` - final tracked/untracked classification against this packet,
  including proof that unrelated paths were preserved
- `rollback.md` - exact path-scoped rollback using the final patch; no broad reset/clean/checkout
- `handoff.md` - non-self-approved Backend handoff to Atlas TPM

The final patch, rollback, scope proof, final fingerprints, and handoff must be generated only
after implementation edits stop. Evidence must contain real command output; never manufacture,
summarize away, or relabel a failure or unavailable lane.

## Rollback

- Preserve a binary-safe patch of only the eight allowed tracked files.
- Because Git actions are forbidden, rollback is a separately authorized, path-scoped reversal
  of that patch or restoration of only those eight paths to exact HEAD bytes.
- Never execute rollback during this packet. Never use broad `reset`, `clean`, `checkout`, or
  restore against the repository/workspace.
- Evidence disposition belongs to Atlas TPM; automatic rollback must not delete evidence.

## Handoff Requirements

Return exactly one status: `READY FOR TECHNICAL REVIEW`, `CHANGES REQUESTED`, or `BLOCKED`.
Include:

- child identity and confirmation that no child/subagent was created or requested
- verified branch, HEAD, worktree, diff base, Bible tree/status, and packet path
- exact files changed, final fingerprints, and owner classification
- implementation summary tied to every WPR-003 finding and AD-015/AD-016
- every command in order, exact exit code/result, and every unavailable or not-run lane
- drift comparison from pre-write fingerprints through final handoff generation
- evidence and rollback paths
- unresolved findings, risks, and overlap status
- explicit non-self-approval and statements that Claude activation, Architect Review, Andrea
  acceptance, Git actions, integration, release, deployment, production, milestone closure, and
  blocker closure remain outside the handoff

## Stop Conditions

- Branch or HEAD differs from the exact packet baseline.
- Any of the eight pre-write fingerprints differs before the first Backend write.
- Another actor changes an allowed file or the WPR-004 Backend evidence lane during execution.
- Any Atlas/Claude ownership overlap or stale-contract conflict appears; stop both affected
  tracks and return to Atlas TPM.
- Any required correction needs a forbidden path or a new product, UX, architecture, security,
  privacy, visual, or business decision.
- Static validator, any canonical lane, manifest verification, Bible check, scope check, or
  evidence integrity check fails or is unavailable.
- Bible tree/status changes; Jarvis, PrintFlow, worker, legacy fallback, no-self-approval, or
  activation boundaries weaken; production is enabled; or `BLK-BASE-001` is shown as closed.
- An implementation file changes after final artifacts start. In that case invalidate the final
  artifacts, stop, and return `CHANGES REQUESTED`; do not patch evidence in place.

On any stop condition, make no further implementation edit. Preserve truthful evidence inside
the WPR-004 Backend lane and hand the finding to Atlas TPM. Atlas Backend may never self-approve.

## Controlled Revision 1 - Disjoint Coordination Drift Resolution

Atlas Backend's first execution stopped with a truthful `CHANGES REQUESTED` handoff before
`py_compile`, static validation, or any canonical lane because a new modification to
`001_SESSION_HANDOFF.md` appeared. That stopped attempt is not green and must be preserved byte
for byte under `backend/attempt-01-stopped/**` before any top-level evidence is regenerated.

Atlas TPM independently reviewed the drift and resolved ownership on 2026-08-06 at
`2026-08-06T16:31:06.5793782Z`:

- `001_SESSION_HANDOFF.md` is a forbidden, unowned coordination record; SHA-256
  `A45130DFBBA62F50BCCD072E64E9248DF811C7C4653E3DD67F3CD3C725BDD460`, 35,445 bytes.
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md` is the
  pre-existing forbidden coordination record and also changed concurrently; SHA-256
  `D5E741588D5A3F01B28CDA9E753B58810AA465330E752B687E4FBCE0FA16D3B8`, 57,578 bytes.
- Both changes are disjoint from the eight Backend files and the WPR-004 Backend evidence lane.
  Their content preserves WPR-003 rejection, the no-unpacketized-commit rule, and the Claude
  production-code freeze. Neither creates a stale implementation contract.
- Atlas Backend did not write, stage, restore, or approve either path.
- Current full porcelain status contains 29 paths; UTF-8 SHA-256 of
  `git status --porcelain=v1 --untracked-files=all` is
  `533A9AFB9FBFAC5CD48A41E4C6E8EB23498CF5D072E0A587E13D5D7480C387FB`.
- Branch remains `main`; HEAD remains
  `bb94b169811c69a0487657c38dfb9a0b6d50d64d`; Bible tree remains
  `60e1b11dafeb58ab4e4377210820934b0f0b8f13` with empty path-scoped status.

The frozen Backend candidate is authorized for controlled resume only at these exact
fingerprints:

```text
5894412C5971084A2FD7D45AA39477F5848022E929CBBF3F687394F8675F148E   3860  .codex/agents/atlas-tpm.toml
53FFEE6DD6FA9CD6FE212C1D309B6C7D506F4741EAECB58B02D1DCF0E35F8E35   7162  AGENTS.md
84A9C8AD550F1FF036EEBCDEA22ACC5D367DEBC4415DF28351810981B79695F8  65301  Project_Atlas_Development_Framework_v2.0.0/000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v2.0.0.md
B327FD3114346CD0AEB39E110772889363EA5BDB323EF3C11F7A16B2CA9FA41C   1167  Project_Atlas_Development_Framework_v2.0.0/03_Registries/ROLE_AUTHORITY_MATRIX.csv
BCDA7109435725811799ECD7F4CEC0BCF4E23B0474E604E5AAEB28F46AB18C2E   3619  Project_Atlas_Development_Framework_v2.0.0/CHANGELOG.md
7410AD521D46723EA5F660D36F549007E7CBF253C78610A29A87205F981BA4DE   6225  Project_Atlas_Development_Framework_v2.0.0/manifest.json
80597776D3D4CF8B0586D9EDC385F0768DF4BA237ED84FFFE8934FF52E800A3A   6599  Project_Atlas_Team_Workspace/00_Governance/CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md
7807B86273E3832CDEC306A43F90EBE48D1B4AE8A9C3450F5F57815AD132B1A7  48761  scripts/governance/codex_native_team_test.py
```

This revision changes no implementation ownership, acceptance contract, product requirement,
architecture, directive, or gate. The same child may resume; no replacement child is authorized.
Before resume it must verify the revised packet hash, branch, HEAD, Bible, the eight candidate
fingerprints, and the two coordination fingerprints. It must archive Attempt 1, regenerate all
top-level final artifacts from the resumed frozen state, and execute `py_compile`, then the static
validator, then the entire canonical sequence from zero in exact order. Any new allowed/evidence
overlap, stale-contract conflict, failed lane, or unavailable lane remains `CHANGES REQUESTED`.

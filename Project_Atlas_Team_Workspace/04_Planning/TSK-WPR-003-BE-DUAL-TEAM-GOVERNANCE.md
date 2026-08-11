# Task Packet - TSK-WPR-003-BE Dual-Team Governance Activation

## Parent And Ownership

- Program: WPR - Web App Production Readiness
- Governing directives: AD-015 Dual-Team Parallel Delivery and AD-016 Visual Identity,
  Clarity And Impact
- Milestone: WPR governance activation prerequisite; no WPR product milestone is started or
  closed by this packet
- Implementer: `atlas_backend`
- Reviewer and integration owner: Atlas TPM
- Branch: `main`
- Approved base commit: `bb94b169811c69a0487657c38dfb9a0b6d50d64d`
- Status: `READY`

This packet authorizes governance/configuration/validator work only. It does not activate the
Claude production-code lane by itself. AD-015 section 7 still requires Atlas TPM Technical
Review, Codex Root Architect Review, and a first Claude Peer Task Packet posted and acknowledged
in the canonical channel.

## Authority And Decisions Already Approved

- Andrea approved dual-team parallel delivery and remains Product Owner/client.
- Codex Root issued binding AD-015 and owns architecture and Architect Review.
- AD-015 establishes the Codex Team and Claude Team as peer delivery teams while preserving the
  internal Codex chain `Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`.
- AD-016 binds future UI planning but authorizes no UI implementation in this packet. Andrea
  retains subjective visual acceptance.
- `INV-JARVIS-001`, PrintFlow `Coming Soon`, the pull-only PC worker, the legacy fallback,
  Documentation Bible immutability, and `BLK-BASE-001` remain unchanged.

No product, UX, architecture, release, production, or baseline decision is delegated to the
implementer.

## Objective

Align the repository's active governance map and static machine validation with AD-015's
dual-team peer delivery lane, without weakening the canonical internal Atlas chain, role
separation, exact disjoint ownership, no self-approval, independent Atlas TPM Technical Review,
or fail-closed integration.

## Definition Of Ready

- Repository is `G:/Claude/NoLimits3D-website`, branch `main`, at the approved base commit.
- The exact allowed tracked inputs are clean against HEAD at delegation.
- AD-015 and AD-016 exist as binding, read-only inputs.
- WPR-002 cleanup/recovery has an Atlas TPM verdict of `APPROVED FOR INTEGRATION`; its write sets
  are closed and do not overlap this packet.
- No concurrent Atlas or Claude packet owns an allowed file below.
- The working tree contains unrelated pre-existing modified/untracked files. They are excluded,
  must not be staged, rewritten, restored, deleted, or reinterpreted.
- Before delegation, HEAD advanced from `84bb8f7f0671cbe072608372d890262899add756` to
  `bb94b169811c69a0487657c38dfb9a0b6d50d64d` through a concurrent commit touching only
  `001_SESSION_HANDOFF.md` and
  `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`. Atlas TPM
  verified zero overlap with this packet, revalidated every allowed-input fingerprint below,
  and approved the newer exact base before implementation.

Pre-delegation SHA-256 fingerprints:

```text
775F87DE0FABD6F665367B8640BA52607847EBB44C64212C4DCE4496716A003D  AGENTS.md
A2538B9B4D7CA3991563990A1AF31687544F5CF153AE2156681D6B444528E932  .codex/agents/atlas-tpm.toml
AFF722C1C96BF3B40890E65D70CDF4BF7FC3C9D0EF1ED3103E91695CE623F6B8  Project_Atlas_Development_Framework_v2.0.0/000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v2.0.0.md
0846A0AFA436A167C8B194572D13420302E119725855443DED5950B25EAB3E15  Project_Atlas_Development_Framework_v2.0.0/03_Registries/ROLE_AUTHORITY_MATRIX.csv
70D201481958D352C6EB7FB48B7049706C3297D194BDE49C1310528C5686A99D  Project_Atlas_Development_Framework_v2.0.0/CHANGELOG.md
BBB606D85ABE3953EEAE4EF75214A8414F8AB04537FF1CE288491D6F68B88E7B  Project_Atlas_Development_Framework_v2.0.0/manifest.json
D774F0CFEA498A42D13B0621624404D8E86D1080258A4FA766635537895695F7  Project_Atlas_Team_Workspace/00_Governance/CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md
D6269FD4EB45266A2FC5CF38EC05C39F4E968CF191184B105E1EB0B1096A2B49  scripts/governance/codex_native_team_test.py
```

If any Definition of Ready condition or fingerprint differs before the first write, return
`BLOCKED` without modifying the repository.

## Exact Allowed Files

Atlas Backend may modify only these existing files:

1. `AGENTS.md`
2. `.codex/agents/atlas-tpm.toml`
3. `Project_Atlas_Development_Framework_v2.0.0/000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v2.0.0.md`
4. `Project_Atlas_Development_Framework_v2.0.0/03_Registries/ROLE_AUTHORITY_MATRIX.csv`
5. `Project_Atlas_Development_Framework_v2.0.0/CHANGELOG.md`
6. `Project_Atlas_Development_Framework_v2.0.0/manifest.json`
7. `Project_Atlas_Team_Workspace/00_Governance/CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md`
8. `scripts/governance/codex_native_team_test.py`

Atlas Backend may create evidence only under:

9. `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-003/backend/**`

The Framework remains version/directory `2.0.0`. `CHANGELOG.md` must record the AD-015
governance amendment, and `manifest.json` must be regenerated only for the exact Framework files
changed by this packet so its size/hash checks remain truthful. Do not change `VERSION`, rename
the Framework directory, or claim a new Framework release.

## Exact Forbidden Files And Actions

- `apps/**`
- `packages/**`
- `supabase/**`
- `.github/**`
- `.claude/**`
- `.codex/config.toml`
- `.codex/agents/atlas-frontend.toml`
- `.codex/agents/atlas-backend.toml`
- `.agents/**`
- `NoLimits3D_Documentation_v0.96/**`
- `Project_Atlas_Development_Blueprint_v0.1/**`, including AD-015 and AD-016
- `Project_Atlas_Team_Workspace/01_Shared_Memory/**`, including the canonical team channel
- `Project_Atlas_Team_Workspace/04_Planning/**`, including this Task Packet
- `Project_Atlas_Team_Workspace/06_Handoffs/**`
- `Project_Atlas_Team_Workspace/07_Reports/**`
- `Project_Atlas_Team_Workspace/08_Approvals/**`
- `001_SESSION_HANDOFF.md`
- every pre-existing dirty or untracked file not explicitly listed as allowed
- dependency or lockfile changes; migrations; Supabase access; secrets or credentials
- commit, push, pull request, merge, deploy, release, production access, branch rewrite, or
  staging unrelated files
- creating a subagent, expanding scope, self-approval, Architect Review, business acceptance,
  milestone closure, or activation of Claude production-code writes

## Required Implementation Contract

1. Preserve the Codex Team's only internal implementation chain exactly as
   `Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`. Do not add Claude or Claude
   workers to Codex custom-agent configuration or the Atlas delegation chain.
2. Represent Claude Team as an independent peer delivery team, not an Atlas role, Codex agent,
   public service, development authority over Atlas, or replacement for Technical Review.
3. Require every Claude implementation slice to have a pre-approved Peer Task Packet with
   accountable owner, dedicated branch/worktree where supported, exact base, exact allowed and
   forbidden files, dependencies, acceptance criteria, tests, evidence, rollback, handoff,
   overlap check, cross-team reviewers, and one named integration owner.
4. Require Atlas TPM to allocate disjoint Atlas/Claude ownership, stop both affected tracks on
   overlap or stale-contract conflict, review Claude output independently, and fail closed on
   missing evidence or unavailable lanes. Claude peer review supplements but never replaces
   Atlas TPM Technical Review.
5. Preserve no self-approval for every implementer/team and preserve Codex Root Architect Review
   plus Andrea business/visual acceptance as separate later gates.
6. Encode AD-015 section 7 as a fail-closed activation state: Claude production-code ownership
   remains frozen until governance/framework alignment, static/RBT coverage, Atlas TPM
   `APPROVED FOR INTEGRATION`, Codex Root Architect Review approval, and first Peer Task Packet
   channel acknowledgement all exist.
7. Preserve AD-016 without implementing UI: machine/governance text may state that future UI
   packets require approved tokens/primitives and accessibility, responsive, browser, visual,
   and performance evidence, while only Andrea can accept subjective aesthetic impact.
8. Preserve `INV-JARVIS-001` exactly: no public/customer access, no team membership, no current
   implementation, Command Center/Andrea only, server-side identity and per-tool capability
   authorization, human control for consequential actions, dedicated Blueprint and required
   security/privacy/approval gates. Jarvis may draft but never approve CR/ADR material.
9. Preserve PrintFlow `Coming Soon`, pull-only worker, legacy public fallback, Bible tree, and
   open `BLK-BASE-001` production blocker.
10. Extend the static validator with explicit, named checks covering: binding AD-015/AD-016
    presence; both-team mapping; independent peer lane; canonical Atlas chain; exact Codex agent
    set; disjoint ownership/overlap stop; Peer Task Packet minimum contract; no self-approval;
    Atlas TPM Technical Review; fail-closed activation; Jarvis/PrintFlow/Bible/production
    boundaries; and Framework manifest integrity.

## Acceptance Criteria

- Every changed path is in the exact allowed set and no pre-existing unrelated path is altered.
- AGENTS, the active Framework playbook/matrix, canonical architecture document, and TPM runtime
  instructions consistently describe the same two-team model and activation gate.
- The canonical Atlas chain and exact three custom Codex agents remain unchanged.
- Claude Team is a peer delivery lane with no architecture, self-approval, direct-to-main,
  release, production, or Atlas-agent authority.
- Machine checks fail closed when required peer-lane, disjoint ownership, review, or activation
  markers are absent and pass on the delivered governed state.
- Framework manifest entries exactly match actual Framework files, including updated sizes and
  SHA-256 values.
- Documentation Bible tree remains
  `60e1b11dafeb58ab4e4377210820934b0f0b8f13` and its worktree is clean.
- No product code, directive, channel, handoff, planning, report, approval, Supabase, release, or
  production file is changed by Atlas Backend.
- Atlas Backend creates no subagent and does not approve its own output.

## Required Tests And Order

Run from repository root and archive exact stdout/stderr plus exit code for each command:

```text
git status --short --branch
git diff --check
python -m py_compile scripts/governance/codex_native_team_test.py
python scripts/governance/codex_native_team_test.py --repo .
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

Also record read-only boundary checks:

```text
git rev-parse HEAD:NoLimits3D_Documentation_v0.96
git status --porcelain -- NoLimits3D_Documentation_v0.96
git diff --name-status
git ls-files --others --exclude-standard
```

An unavailable or failing lane is not green. Stop implementation after preserving evidence and
return `CHANGES REQUIRED` or `BLOCKED`; do not alter unrelated files to make a gate pass.

## Required Evidence

Create only under `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-003/backend/`:

- `before-state.log` - branch, HEAD, status, Bible tree, allowed-input fingerprints
- `implementation.diff` - binary-safe diff of allowed tracked files
- `scope-verification.log` - exact changed/untracked paths classified against this packet
- `static-validator.log`
- one log per canonical command or a clearly delimited aggregate log preserving every command,
  exit code, stdout, and stderr
- `bible-integrity.log`
- `rollback.md`
- `handoff.md`

Evidence must be generated from real command output. Do not manufacture or summarize a pass
that did not execute.

## Rollback

- Preserve a binary-safe patch of only the eight allowed tracked files before handoff.
- Because no commit is authorized, rollback is to restore only those eight files to the approved
  base after separately preserving the patch and evidence.
- Evidence deletion is not part of automatic rollback; Atlas TPM decides its disposition.
- Never use broad reset/clean/checkout operations and never touch unrelated dirty/untracked
  paths.

## Handoff Requirements

Return exactly one status: `READY FOR TECHNICAL REVIEW`, `CHANGES REQUIRED`, or `BLOCKED`.
Include:

- verified branch, HEAD, worktree and Bible tree;
- implementer identity and confirmation that no child/subagent was created;
- exact files changed and ownership classification;
- concise implementation summary tied to AD-015/AD-016;
- every command, exit code, exact result, and unavailable lane;
- evidence paths and rollback path;
- unresolved findings and risks;
- explicit statement that Atlas Backend does not self-approve and that Claude production-code
  activation, Architect Review, business acceptance, commit, merge, deploy, release and
  production remain outside the handoff.

## Stop Conditions

- Branch or HEAD differs from the approved values.
- Any allowed-input fingerprint differs before the first write.
- Another actor changes an allowed file or this packet's evidence path during execution.
- Any required change would touch a forbidden or pre-existing unrelated path.
- Any Atlas/Claude ownership overlap is found.
- An approved product, UX, architecture, security, privacy, or visual decision is missing.
- A required test fails or is unavailable.
- Framework manifest cannot be made truthful within the exact allowed set.
- Bible tree/worktree changes, Jarvis or PrintFlow boundaries weaken, production becomes enabled,
  or `BLK-BASE-001` is represented as closed.

On a stop condition, preserve truthful evidence, make no further implementation change, and
handoff the blocker to Atlas TPM.

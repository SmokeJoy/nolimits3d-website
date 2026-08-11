# Task Packet - SEC-WPR-001 Dependency Security Remediation

## Status and authority

- Status: READY / APPROVED FOR ATLAS BACKEND IMPLEMENTATION
- Authorization: Codex Root authorization dated 2026-08-11 16:11 Europe/Rome, following Andrea's instruction to resume construction and unblock the governed critical path
- Milestone: Web Production Readiness critical path before WPR-007; this packet does not activate product implementation, Claude production-code ownership, release, deployment, or production
- Sprint: SEC-WPR-001
- Implementer: Atlas Backend (`atlas_backend`) only
- Reviewer and integration owner: Atlas TPM (`atlas_tpm`)
- Architect Review authority: Codex Root only; not delegated by this packet
- Business or visual acceptance: Andrea only; not delegated by this packet

## Verified execution identity

- Repository: `G:\Claude\NoLimits3D-website`
- Dedicated worktree: `G:\Claude\NoLimits3D-website-sec-wpr-001`
- Branch: `codex/sec-wpr-001`
- Exact base: `bb94b169811c69a0487657c38dfb9a0b6d50d64d`
- Base relationship: local `main` and `origin/main` both resolved to the exact base at packet preparation time
- Initial clean-worktree HEAD: `bb94b169811c69a0487657c38dfb9a0b6d50d64d`
- Shared dirty checkout: `G:\Claude\NoLimits3D-website`, branch `claude/wpr-m1-baseline-inventory`, HEAD `a1840d10c5f95903c3e43be6029fc37c0b7a73c5`; read-only and excluded
- Documentation Bible tree at base: `60e1b11dafeb58ab4e4377210820934b0f0b8f13`

## Objective

Reproduce and remediate every current unwaived high-severity dependency finding emitted by
`pnpm dependency:audit`, currently `js-yaml` and `nanoid`, with the smallest compatible
dependency override or update. Preserve behavior, package-manager/toolchain pins, workspace
resolution, and lockfile integrity. Do not add a waiver, suppress the guard, change advisory
classification, or bypass any test.

## Verified inputs and dependency paths

- Toolchain: Node `v24.18.0`; pnpm `9.15.0`.
- Clean install: `pnpm install --frozen-lockfile` passed for all seven workspace projects.
- Audit scope: 528 registry packages.
- `GHSA-5p4m-2wfm-xmqj`, high: `js-yaml@4.3.0`, vulnerable `>=4.0.0 <4.3.1`, patched `>=4.3.1`.
- Path: `packages/ui > shadcn@4.13.0 > cosmiconfig@9.0.2 > js-yaml@4.3.0`.
- `GHSA-2v37-7h3g-55p8`, high: `nanoid@3.3.16`, vulnerable `<3.3.17`, patched `>=3.3.17`; live audit proposes `3.3.18`.
- Paths: `postcss@8.5.25 > nanoid@3.3.16` through Vite/Vitest/Tailwind/shadcn consumers in `apps/ui-playground`, `apps/web`, and `packages/ui`.
- Existing `GHSA-qwww-vcr4-c8h2` for `react-router@7.18.1` is covered by an approved time-bound waiver through 2026-11-04. It is out of implementation scope and must remain visible as waived.

## Ownership and write sets

Frontend write set: empty. No Atlas Frontend agent is required or authorized for this backend/security packet.

Atlas Backend owns only the following implementation files:

1. `package.json`
2. `pnpm-lock.yaml`
3. `packages/ui/package.json` - conditional; modify only if a root override cannot safely produce the minimum compatible resolution
4. `scripts/guards/guards.test.mjs` - conditional; modify only if the current dependency-audit test behavior is demonstrably wrong and the change is narrowly limited to that guard contract

Atlas Backend also owns only these delivery artifacts:

1. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/00-preflight.md`
2. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/01-advisories-before.log`
3. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/02-dependency-paths-before.log`
4. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/03-frozen-install-after.log`
5. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/04-build.log`
6. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/05-lint.log`
7. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/06-format-check.log`
8. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/07-typecheck.log`
9. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/08-test.log`
10. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/09-secret-scan.log`
11. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/10-dependency-audit.log`
12. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/11-guard-scope.log`
13. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/12-guard-migrations.log`
14. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/13-guard-source-bindings.log`
15. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/14-governance-static-validator.log`
16. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/15-final-status.log`
17. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/command-results.tsv`
18. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/implementation.diff`
19. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/scope-verification.log`
20. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/bible-integrity.log`
21. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/rollback.md`
22. `Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/backend/role-boundary-response.md`
23. `Project_Atlas_Team_Workspace/06_Handoffs/SEC-WPR-001-BACKEND-HANDOFF.md`

Atlas TPM exclusively owns this packet, all files under
`Project_Atlas_Team_Workspace/05_Evidence/SEC-WPR-001/integration/`, and
`Project_Atlas_Team_Workspace/07_Reports/SEC-WPR-001-DEPENDENCY-SECURITY-REMEDIATION-TECHNICAL-REVIEW.md`.
The implementer must not stage or edit TPM-owned artifacts.

## Forbidden files and actions

- Every file not expressly listed above, including all `apps/**` and all other `packages/**` files.
- `NoLimits3D_Documentation_v0.96/**` and the accepted Bible tree.
- `apps/legacy-web/**`, `supabase/**`, product data, migrations, application behavior, UX, architecture, Jarvis, PrintFlow, release, deployment, production, and production access.
- The eight concurrent WPR governance candidates: `.codex/agents/atlas-tpm.toml`, `AGENTS.md`, `Project_Atlas_Development_Framework_v2.0.0/000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v2.0.0.md`, `Project_Atlas_Development_Framework_v2.0.0/03_Registries/ROLE_AUTHORITY_MATRIX.csv`, `Project_Atlas_Development_Framework_v2.0.0/CHANGELOG.md`, `Project_Atlas_Development_Framework_v2.0.0/manifest.json`, `Project_Atlas_Team_Workspace/00_Governance/CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md`, and `scripts/governance/codex_native_team_test.py`.
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`; coordination-channel changes remain Codex Root-owned.
- Any old Claude branch, shared-checkout file, branch switch, reset, stash, clean, overwrite, merge, rebase, cherry-pick, push, PR, release, deploy, or production action.
- Any waiver addition, audit bypass, script suppression, severity downgrade, broad dependency refresh, package-manager upgrade, or unrelated lockfile churn.

## Dependencies and overlap check

- This packet depends only on the exact committed base and registry availability.
- The shared Claude/WPR worktree and its uncommitted governance candidates are concurrent but disjoint and forbidden.
- Claude production-code ownership remains frozen. This packet does not count as AD-015/AD-016 alignment, Claude Peer Task Packet acknowledgement, Architect Review, or Andrea acceptance.
- If any concurrent track changes `package.json`, `pnpm-lock.yaml`, `packages/ui/package.json`, or `scripts/guards/guards.test.mjs` from the exact base before handoff, stop and report overlap or stale-contract conflict. Do not reconcile it locally.

## Acceptance criteria

1. The initial two unwaived high findings are reproduced with exact package versions, advisory IDs, patched ranges, and dependency paths.
2. The final resolved graph contains no vulnerable `js-yaml` version below `4.3.1` and no vulnerable `nanoid` version below `3.3.17`.
3. `pnpm dependency:audit` exits 0 with zero critical, high, moderate, low, info, and unknown unwaived findings; the existing React Router waiver remains explicitly visible and unchanged.
4. No waiver, bypass, audit-code suppression, package-manager upgrade, or behavior change is introduced.
5. `pnpm install --frozen-lockfile` exits 0 after the change and produces no tracked diff.
6. The lockfile change is minimal and explainable from the approved override/update only.
7. Every canonical repository gate passes in the exact AGENTS.md order.
8. `pnpm governance:codex-native` passes because role-boundary governance must remain unchanged.
9. Changed implementation files are a subset of the four exact candidates; conditional files remain untouched unless evidence proves necessity.
10. The Documentation Bible tree remains `60e1b11dafeb58ab4e4377210820934b0f0b8f13`.
11. The Backend handoff is evidence-backed and explicitly requests independent Atlas TPM Technical Review without self-approval.

## Required tests and exact order

First run the post-change clean-lockfile validation:

1. `pnpm install --frozen-lockfile`

Then run the canonical AGENTS.md gates in exactly this order:

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

Finally run:

11. `pnpm governance:codex-native`
12. Dependency-path verification for `js-yaml` and `nanoid`
13. `git diff --check`
14. Exact scope and Bible-tree verification

Each command must have an unedited log and an exact exit code in `command-results.tsv`.

## Role-boundary response

Before implementation, Atlas Backend must record that it:

- cannot and will not create a child agent;
- cannot self-approve, sign Technical Review or Architect Review, or provide business acceptance;
- will not write outside the packet;
- refuses public/customer Jarvis, Jarvis team membership, or Jarvis implementation; Jarvis remains Andrea-only in the administrative Command Center, requires server-side identity and `jarvis.use` capability authorization plus the complete future Blueprint/security gates, and may draft but never approve CR/ADR material;
- preserves PrintFlow as `Coming Soon`, the pull-only worker, legacy fallback, and the Documentation Bible.

## Evidence, rollback, and handoff

- Logs must contain real command output, command text, timestamps, and exit codes. Never present an unavailable lane as green.
- `implementation.diff` must be generated from the exact base and exclude TPM-owned files.
- Rollback is a normal revert of the Backend implementation commit or removal of the approved override/update followed by lockfile regeneration with pnpm `9.15.0`; no destructive reset is authorized.
- The handoff must identify base, branch, worktree, pre-commit HEAD, changed files, commands/results, residual advisories, risks, rollback, and any limitation.
- The handoff verdict is `READY FOR TPM TECHNICAL REVIEW`, `BLOCKED`, or `CHANGES REQUIRED`; never `APPROVED`.

## Stop conditions

Stop without committing and report `BLOCKED` or `CHANGES REQUIRED` if:

- the exact base, branch, worktree, toolchain, or clean starting state differs;
- any allowed implementation file has concurrent or unexplained edits;
- remediation requires an app, governance candidate, Bible, Supabase, product, architecture, waiver, audit-bypass, release, deployment, or production change;
- the lockfile requires broad unrelated churn or a package-manager upgrade;
- any required lane is unavailable, any required command fails, any unwaived advisory remains, or the existing React Router waiver changes;
- the changed-file set escapes the exact allowlist;
- the implementer is asked to create a subagent or approve its own output.

## Commit and push authority

- One local Backend implementation commit on `codex/sec-wpr-001` is authorized only after every Backend evidence lane above is green, scope is exact, and the handoff is complete.
- Stage only Atlas Backend-owned files. Do not stage the TPM packet or TPM integration artifacts.
- Evidence paths are repository-ignored by default; use `git add -f` only for the exact Backend-owned evidence and handoff files enumerated in this packet.
- Commit message: `fix(security): remediate SEC-WPR-001 dependency advisories`.
- If any evidence is not green, do not commit.
- Push, PR creation, merge, release, deployment, and production access are not authorized.

## TPM planning verdict

`READY` - exact objective, authority, ownership, disjoint write sets, acceptance criteria, tests,
evidence, rollback, handoff, stop conditions, and local-commit boundary are defined. Final
technical integration remains contingent on independent Atlas TPM review.

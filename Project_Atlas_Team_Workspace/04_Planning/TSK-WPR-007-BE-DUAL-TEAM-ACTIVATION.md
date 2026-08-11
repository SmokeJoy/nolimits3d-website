# Task Packet - TSK-WPR-007-BE Dual-Team Governance Activation

## Authority, Status, And Ownership

- Root authorization: `Codex Root WPR-007 authorization, 2026-08-11 after SEC-WPR-001 merge`, supplied directly to Atlas TPM.
- Program: WPR - Web App Production Readiness; governance activation prerequisite only.
- Governing decisions: AD-015, AD-016, `TSK-WPR-006_REMEDIATION_DECISION.md`, and `INV-JARVIS-001`.
- Milestone: M0R is done; Blueprint 00 / M1 remains the next planning gate only. This packet starts or closes no milestone.
- Active blocker: `BLK-BASE-001` remains `OPEN - production blocker only`.
- Repository: `G:/Claude/NoLimits3D-website-wpr-007`.
- Branch: `codex/wpr-007-dual-team-activation`.
- Exact authoritative base and pre-packet HEAD: `9dd43fa01e7cc30137fb8ae83c606c14621527f4`.
- Base tree: `2c75aca384fd9336e9f5fc58d90193927666a826`.
- Documentation Bible base tree: `60e1b11dafeb58ab4e4377210820934b0f0b8f13`.
- Read-only source checkout: `G:/Claude/NoLimits3D-website`, branch `claude/wpr-m1-baseline-inventory`, HEAD `a1840d10c5f95903c3e43be6029fc37c0b7a73c5`; its dirty state must not be mutated.
- Implementation/evidence owner: one fresh nested `atlas_backend` child created by Atlas TPM.
- Read-only runtime boundary owner: one fresh nested `atlas_frontend` child created by Atlas TPM; write set is empty.
- Independent Technical Reviewer and named integration owner: Atlas TPM.
- Cross-team reviewers: Claude Team may perform a later supplemental peer review; Codex Root performs later Architect Review. Neither substitutes for Atlas TPM Technical Review.
- Claude implementation write set: none. Claude production-code ownership remains frozen.
- Packet status: `READY`.

This packet is the approved Task Packet for the exact scope below. No WPR-003 through WPR-006
pass, evidence, command result, approval, or green status is inherited. WPR-006 remains stopped
historical evidence. PR #25, #26, and #27 branches are frozen historical inputs.

## Objective

Transport the approved eight-file AD-015/AD-016 governance candidate and the exact binding
historical records from the read-only source checkout onto the post-security base; correct only
a narrowly necessary defect in the eight candidate files if the already-approved contract cannot
otherwise pass; create a fresh evidence runner that fixes WPR-006's literal-sentinel defect; run
all required static, runtime, repository, integrity, and hash gates from zero; produce a Backend
handoff and one local Backend implementation/evidence commit for independent Atlas TPM review.

This is governance, validator, evidence, and handoff work only. It does not authorize production
code, a product/UX/architecture decision, Claude production-code activation, release, deployment,
production access, milestone closure, blocker closure, Architect Review, or business/visual
acceptance.

## Definition Of Ready And Dependencies

1. `origin/main` and this branch base are exactly `9dd43fa01e7cc30137fb8ae83c606c14621527f4`; PR #28 is represented by that merge commit.
2. Post-security dependency resolution is immutable: `js-yaml 4.3.1`, `nanoid 3.3.18`, zero unwaived findings.
3. The source checkout is read-only and all source bytes are bound below. A source mismatch stops before transport.
4. The target worktree was clean at the exact base; the WPR-007 packet is the only TPM pre-delegation write.
5. Backend, Frontend, TPM, and Claude write sets are disjoint. No active packet claims the WPR-007 paths.
6. Product Owner and Architect decisions already exist in AD-015, AD-016, WPR-006 remediation, and this Root authorization. No new product or architecture decision is delegated.

## Exact Binding Input And Final Sentinel Table

The table is immutable packet data. Every path and SHA-256 is a complete literal. `ABSENT` is an
exact pre-transport target state, not a hash. Rows 1-8 are governance candidates; rows 9-36 are
transport-only and must finish byte-identical to the source; rows 37-45 are immutable target
contract/dependency sentinels. Final expected SHA-256 is `source_sha256` for rows 1-36 and
`target_base_sha256` for rows 37-45. Candidate corrections, if strictly necessary, require a
recorded pre/post hash and then a truthful Framework manifest update; they must never silently
change the table comparison result.

<!-- BEGIN_WPR007_BINDING_SENTINELS -->

| # | Path | Source SHA-256 | Bytes | Target base SHA-256 | Base bytes | Mode |
|---:|---|---|---:|---|---:|---|
| 1 | `.codex/agents/atlas-tpm.toml` | `5894412c5971084a2fd7d45aa39477f5848022e929cbbf3f687394f8675f148e` | 3860 | `a2538b9b4d7ca3991563990a1af31687544f5cf153ae2156681d6b444528e932` | 2550 | candidate |
| 2 | `AGENTS.md` | `53ffee6dd6fa9cd6fe212c1d309b6c7d506f4741eaecb58b02d1dcf0e35f8e35` | 7162 | `775f87de0fabd6f665367b8640ba52607847ebb44c64212c4dce4496716a003d` | 5492 | candidate |
| 3 | `Project_Atlas_Development_Framework_v2.0.0/000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v2.0.0.md` | `84a9c8ad550f1ff036eebcdea22acc5d367debc4415df28351810981b79695f8` | 65301 | `aff722c1c96bf3b40890e65d70cdf4bf7fc3c9d0ef1ed3103e91695ce623f6b8` | 63549 | candidate |
| 4 | `Project_Atlas_Development_Framework_v2.0.0/03_Registries/ROLE_AUTHORITY_MATRIX.csv` | `b327fd3114346cd0aeb39e110772889363ea5bdb323ef3c11f7a16b2ca9fa41c` | 1167 | `0846a0afa436a167c8b194572d13420302e119725855443ded5950b25eab3e15` | 886 | candidate |
| 5 | `Project_Atlas_Development_Framework_v2.0.0/CHANGELOG.md` | `bcda7109435725811799ecd7f4cec0bcf4e23b0474e604e5aaeb28f46ab18c2e` | 3619 | `70d201481958d352c6eb7fb48b7049706c3297d194bde49c1310528c5686a99d` | 2720 | candidate |
| 6 | `Project_Atlas_Development_Framework_v2.0.0/manifest.json` | `7410ad521d46723ea5f660d36f549007e7cbf253c78610a29a87205f981ba4de` | 6225 | `bbb606d85abe3953eeae4ef75214a8414f8ab04537ff1ce288491d6f68b88e7b` | 6224 | candidate |
| 7 | `Project_Atlas_Team_Workspace/00_Governance/CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md` | `80597776d3d4cf8b0586d9edc385f0768df4ba237ed84fffe8934ff52e800a3a` | 6599 | `d774f0cfea498a42d13b0621624404d8e86d1080258a4fa766635537895695f7` | 4934 | candidate |
| 8 | `scripts/governance/codex_native_team_test.py` | `7807b86273e3832cdec306a43f90ebe48d1b4ae8a9c3450f5f57815ad132b1a7` | 48761 | `d6269fd4eb45266a2fc5cf38ec05c39f4e968cf191184b105e1eb0b1096a2b49` | 37551 | candidate |
| 9 | `Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/AD-013_RESPONSE_ARCHITECT_REVIEW.md` | `f094e29b2f5048fe28e7439623045b2497163e3908be72340a0fe14890683239` | 6377 | `ABSENT` | 0 | transport-only |
| 10 | `Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/TSK-WPR-003_REMEDIATION_DECISION.md` | `4ebbf541c992ed0272d1cbd209a3ce379bcc4667af323348b607c81a6d0a547a` | 2128 | `ABSENT` | 0 | transport-only |
| 11 | `Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/TSK-WPR-004_REMEDIATION_DECISION.md` | `31d67b363724cdb92bbfc99d4767607f8f19e70e90f9d9ebf9ced2a3aade727e` | 2393 | `ABSENT` | 0 | transport-only |
| 12 | `Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/TSK-WPR-005_REMEDIATION_DECISION.md` | `73ae05e89b9e07bd818d2aa8e96c1802cbcc85f4f3211f078de0427e6e80e2be` | 2112 | `ABSENT` | 0 | transport-only |
| 13 | `Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/TSK-WPR-006_REMEDIATION_DECISION.md` | `d1a16fb8c85e5dcc7993e83541d308a2f923aece0b8d0308731c73d36f6cac37` | 4103 | `ABSENT` | 0 | transport-only |
| 14 | `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-013_INTERACTIVE_PLACEHOLDER_UI_AUTHORIZATION.md` | `00c87cfd4d5acccdbe9920f90fd5d504adb7e12b983f3707a2ae81c5689bb030` | 6445 | `ABSENT` | 0 | transport-only-preserve-PROPOSED |
| 15 | `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-014_WEB_APP_PRODUCTION_READINESS_PROGRAM.md` | `6d6eb1d806eb30381252b5ab65f63a6c2c32d44b049f8fa65c4dcb23dff0a5b4` | 9793 | `ABSENT` | 0 | transport-only |
| 16 | `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-015_DUAL_TEAM_PARALLEL_DELIVERY.md` | `f08c6af14e711f193acc6aa981136215abc0a9ef4570c2b28d02db8996a801f5` | 6455 | `ABSENT` | 0 | transport-only |
| 17 | `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-016_VISUAL_IDENTITY_CLARITY_AND_IMPACT.md` | `155fe5468d52d174e94949e8a7fc18072111c7bde2fc66e544c6e8a2dfa2c27f` | 2651 | `ABSENT` | 0 | transport-only |
| 18 | `Project_Atlas_Team_Workspace/04_Planning/CLIENT_GOAL_WEB_APP_PRODUCTION_READY_2026-08-06.md` | `c0ea51fcfa04bfb14f401793c8f643cd6386695e0ee99d5569cd4683b3f5c528` | 12435 | `ABSENT` | 0 | transport-only |
| 19 | `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-000-WORKTREE-DISPOSITION.md` | `b7f873cda6cd5fa4d5936c3e33c0b4b120af77039cab96823cf18e25248a1c94` | 6450 | `ABSENT` | 0 | transport-only |
| 20 | `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-001-BE-TOOLING-QUARANTINE-RESTORE.md` | `9386562af029b62bd188fc8f607bc9d1ac071a266a36ce35a525cb27aedc0ee0` | 4214 | `ABSENT` | 0 | transport-only |
| 21 | `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-001-FE-QUARANTINE-RESTORE.md` | `fc6358bf81becca7a9156964cfcccfaced9ece229df58d0537b53b0c912c9cc2` | 6940 | `ABSENT` | 0 | transport-only |
| 22 | `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-002-BE-TOOLING-RECOVERY.md` | `45fd91ddad60d170f23f1165090ff8d667ae475c11e135fa33d381c27ee40bb5` | 5086 | `ABSENT` | 0 | transport-only |
| 23 | `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-002-FE-CLOSURE-VERIFICATION.md` | `55148a4ceb289ee1e486d4332cc4ab775946677d0677489a461099b7ffe615ff` | 4897 | `ABSENT` | 0 | transport-only |
| 24 | `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-003-BE-DUAL-TEAM-GOVERNANCE.md` | `e80959c1a0e55cfaf5f9bb55a7f0db06301a61b7bd2b117d95f94ccdbd816eb5` | 13833 | `ABSENT` | 0 | transport-only |
| 25 | `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-004-BE-DUAL-TEAM-GOVERNANCE-REMEDIATION.md` | `415e97c602d8fa867876e7b538f3bbefd22feb08ddd61a472508e0660d692008` | 22481 | `ABSENT` | 0 | transport-only |
| 26 | `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-005-BE-DUAL-TEAM-GOVERNANCE-VERIFICATION.md` | `b38f61a79c8e1bf64dfbdbe7694720924f5e8f5b3090f39fa2e2fac05128a0c3` | 21770 | `ABSENT` | 0 | transport-only |
| 27 | `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-006-BE-DUAL-TEAM-GOVERNANCE-FULL-VERIFICATION.md` | `cdc62a549bded2c84895c58da714da803d8a354c4f9fa232cbedd6b9017a5d9f` | 32808 | `ABSENT` | 0 | transport-only |
| 28 | `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-000-WORKTREE-DISPOSITION-TECHNICAL-REVIEW.md` | `10ee5b27fc92ee33600df6ce23fa9fcb08c5b112f05530a6221b6763f042b0ad` | 20023 | `ABSENT` | 0 | transport-only |
| 29 | `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-001-QUARANTINE-RESTORE-TECHNICAL-REVIEW.md` | `2ee2a39f4c8a828ecc17a3ad3f44fdf805ec45f891ad633075771db59a3d86f0` | 10963 | `ABSENT` | 0 | transport-only |
| 30 | `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-002-CLOSURE-RECOVERY-TECHNICAL-REVIEW.md` | `c8e908ef9a7b2b4e83419d641e9c35cb556fe4cb100bd3e8af83c32d5e643619` | 8347 | `ABSENT` | 0 | transport-only |
| 31 | `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-003-DUAL-TEAM-GOVERNANCE-TECHNICAL-REVIEW.md` | `55e8b5b28c49665903e27d7097550b8aa94f06d09d02bcbbbf3bbd38965949a4` | 11490 | `ABSENT` | 0 | transport-only |
| 32 | `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-004-DUAL-TEAM-GOVERNANCE-REMEDIATION-TECHNICAL-REVIEW.md` | `41b291f9d203a72289ed5768f7a5d7a980b74be29e2f055ddc77a4e6bf42e775` | 12921 | `ABSENT` | 0 | transport-only |
| 33 | `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-005-DUAL-TEAM-GOVERNANCE-VERIFICATION-TECHNICAL-REVIEW.md` | `b84586b5111fc9f7bb9a365064f4809141afe1dadb2bce7ab20641fadad8e7c0` | 16297 | `ABSENT` | 0 | transport-only |
| 34 | `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-006-DUAL-TEAM-GOVERNANCE-FULL-VERIFICATION-TECHNICAL-REVIEW.md` | `055935c51101ea5f6507078e43ec3e2c4145f3dd4117f0dae8f0e5657589e50e` | 14600 | `ABSENT` | 0 | transport-only |
| 35 | `Project_Atlas_Team_Workspace/07_Reports/CLAUDE-WPR-M1-PR25-TECHNICAL-REVIEW.md` | `06805c3b0be76dc0d4e2a7f33b3a2f1727c072f2a4425c93eb93226e95b72ebc` | 11474 | `ABSENT` | 0 | transport-only |
| 36 | `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md` | `19eafb5424d0ebf6c60db8f15a47216d87bafaa1a46dc10f30d78e9995e5b93d` | 93788 | `fefa86ae5ce3a2ea998d4dff0de2c572689f6bbbb1039255e5f83065b067b132` | 54137 | transport-only-canonical-history |
| 37 | `package.json` | `d1b2104760a557d0e11d346ec11f3bcd7badc673b5fec8dbb1d5bf47b70bd942` | 2409 | `d1b2104760a557d0e11d346ec11f3bcd7badc673b5fec8dbb1d5bf47b70bd942` | 2409 | immutable-post-security |
| 38 | `pnpm-lock.yaml` | `59c9d614d7f584bf3c423d31bbf217445bca95aac1381d681faa0ab54e77898e` | 169301 | `59c9d614d7f584bf3c423d31bbf217445bca95aac1381d681faa0ab54e77898e` | 169301 | immutable-post-security |
| 39 | `pnpm-workspace.yaml` | `fb3b6587c3ad9715fc82174b0d1a2b09077bc2b3ea2da8c6d896df9d53fc5b20` | 63 | `fb3b6587c3ad9715fc82174b0d1a2b09077bc2b3ea2da8c6d896df9d53fc5b20` | 63 | immutable-contract |
| 40 | `tsconfig.json` | `13950451aecf5b5f341b66487c28db5c3c82157fc20b5aba439e0362a9040dac` | 689 | `13950451aecf5b5f341b66487c28db5c3c82157fc20b5aba439e0362a9040dac` | 689 | immutable-contract |
| 41 | `eslint.config.js` | `ebaeadab95925c6b9548f85448043c844f5d9e36ac4958636f598296b81e124c` | 1107 | `ebaeadab95925c6b9548f85448043c844f5d9e36ac4958636f598296b81e124c` | 1107 | immutable-contract |
| 42 | `.prettierrc` | `33744eac51667adb9493bff986dea2f8330a45681fc8f0c94af4fc450951a599` | 174 | `33744eac51667adb9493bff986dea2f8330a45681fc8f0c94af4fc450951a599` | 174 | immutable-contract |
| 43 | `Project_Atlas_Team_Workspace/04_Planning/MILESTONE_REGISTER.md` | `c82998f529258c904fc15eb7e39bbe14aa0eb56d3c3c4b7a9391a2f69952a2ff` | 968 | `c82998f529258c904fc15eb7e39bbe14aa0eb56d3c3c4b7a9391a2f69952a2ff` | 968 | immutable-register |
| 44 | `Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md` | `4ccb388b543b638c9c87c44760d7e023288395f1bdfeadc936015f5477577237` | 6927 | `4ccb388b543b638c9c87c44760d7e023288395f1bdfeadc936015f5477577237` | 6927 | immutable-register |
| 45 | `Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md` | `8dfd80cfa933452393fa703ae579f45a7cd80cf949f303f6dd73e191d0d50e43` | 4157 | `8dfd80cfa933452393fa703ae579f45a7cd80cf949f303f6dd73e191d0d50e43` | 4157 | immutable-state |

<!-- END_WPR007_BINDING_SENTINELS -->

## Exact Write Sets

### Atlas Backend

Backend may write only:

1. Rows 1-8 above, solely to transport the exact candidate and then make a narrowly necessary correction if the approved contract fails.
2. Rows 9-36 above, transport-only: final bytes must exactly equal the listed source bytes; no content editing, reformatting, status change, or newline conversion is allowed.
3. `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-007/backend/**` for fresh helper, raw/sanitized evidence, inventories, RBT transcript, scope/rollback data, and evidence-local logs.
4. `Project_Atlas_Team_Workspace/06_Handoffs/TSK-WPR-007-BACKEND-HANDOFF.md` for the Backend handoff.
5. Temporary `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-007/backend/_pycache/**` only for the required `py_compile`; it must be narrowly removed before final freeze after recording its disposition. The resolved absolute deletion target must remain under the Backend evidence lane.

Backend owns no other path. It must stage and commit only this Backend write set, excluding the
TPM packet and integration lane. One local commit is authorized only after all Backend-required
lanes are truthful and green. No amend of unrelated history, push, PR, merge, or tag is authorized.

### Atlas Frontend

Write set: **none**. The child may only inspect its loaded role boundary, answer the RBT probes,
report its agent/trace ID, and return a transcript to Atlas TPM. It must not create evidence files,
run formatting that writes, stage, commit, create a child, or modify any byte.

### Atlas TPM

TPM alone may write:

- this packet;
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-007/integration/**`;
- `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-007-DUAL-TEAM-ACTIVATION-TECHNICAL-REVIEW.md`.

These paths are excluded from the Backend commit. After both children finish and independent
review is complete, TPM may create one local packet/review/integration-evidence commit. TPM may
not edit Backend-owned files to make a gate pass.

## Exact Forbidden Scope And Actions

Everything not expressly allowed is forbidden, including `apps/**`, `packages/**`, `supabase/**`,
migrations, product/frontend/UI code or tests, public assets, `.github/**`, `.claude/**`,
`.agents/**`, other `.codex/**`, `NoLimits3D_Documentation_v0.96/**`, `CROSS_TEAM_CHAT.md`, raw
historical WPR evidence, PR25 product/planning deliverables, `001_SESSION_HANDOFF.md`, and every
unlisted Blueprint, planning, report, handoff, approval, release, deployment, or production file.

`package.json` and `pnpm-lock.yaml` are immutable post-security sentinels. No dependency write,
lock repair, override, waiver, or package update is authorized. Jarvis implementation, public or
customer Jarvis, operational PrintFlow, public inbound PC-worker control, legacy-web cutover,
Documentation Bible change, requirements/UX/architecture change, real business-data invention,
Claude production-code activation, channel acknowledgement on Claude's behalf, release,
deployment, production access, milestone/blocker closure, fetch/pull/push/PR/merge, reset, stash,
clean, branch switch, broad deletion, self-approval, Architect Review, or business/visual
acceptance is forbidden.

Neither implementer may create a child or ask another role to create one. Claude Team is an
independent peer team and must never be represented as an Atlas/Codex child or substitute review.

## Binding Governance Contract And Negative Cases

1. Preserve the only Codex implementation chain as `Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`.
2. `DEV-M0R-001` is bootstrap history only and cannot pass the fresh RBT-02 trace.
3. Claude slices require a pre-approved Peer Task Packet naming accountable owner, dedicated branch/worktree where supported, exact base, exact allowed/forbidden files, dependencies, acceptance criteria, tests, evidence, rollback, handoff, overlap check, cross-team reviewers, and one integration owner.
4. Atlas/Claude ownership must be disjoint; overlap or stale-contract conflict stops both affected tracks. Missing evidence and unavailable lanes fail closed and cannot be green.
5. Peer review supplements but never replaces Atlas TPM Technical Review; no self-approval; Codex Root Architect Review and Andrea business/visual acceptance remain separate.
6. Claude production-code ownership remains frozen until governance/framework alignment, static and RBT coverage, Atlas TPM `APPROVED FOR INTEGRATION`, Codex Root Architect Review approval, and first Peer Task Packet channel acknowledgement all exist.
7. AD-016 requires future UI packets to name design tokens and approved primitives and accessibility, responsive, browser, visual, and performance evidence. Only Andrea accepts subjective aesthetics.
8. Jarvis is Andrea's strictly private future Command Center assistant, not public/customer-facing and not a development-team member. No implementation before a dedicated Blueprint, server-verified Andrea identity, explicit `jarvis.use`, per-tool server authorization, RLS, audit, privacy review, negative tests, human control, Architect Review, and Product Owner approval. Frontend hiding is insufficient. Jarvis may draft but not approve CR/ADR material and cannot change the Bible.
9. PrintFlow remains `Coming Soon`; the PC worker is pull-only without public inbound control; `apps/legacy-web` remains fallback; production remains blocked by `BLK-BASE-001`.

Negative RBT probes must fail closed: implementer child delegation; Backend or Frontend
self-approval; TPM product-code write or Architect Review signature; public/customer Jarvis;
operational PrintFlow; Bible/product writes; Claude activation with an unavailable lane; a Peer
Task Packet missing any mandatory field; overlap/stale contract continuation; and treating peer
review as Technical Review.

## Evidence Runner Requirements - WPR-006 Defect Closure

Backend must create a fresh helper in its evidence lane. It must:

1. Independently embed all 45 ordered `(path, final_expected_sha256)` literals; no abbreviation, concatenation, inferred fragment, wildcard, or ellipsis.
2. Parse the 45-row packet table between its markers and compare packet versus helper count, exact order, duplicate set, missing paths, extra paths, every path, every full 64-hex hash, and mode. Self-test must deliberately exercise and pass mismatch fixtures for each class.
3. Before transport, compare all source rows and target-base rows. Before the governed sequence and after its final command, compare all final sentinels. Emit every mismatch separately with path, expected hash, actual hash or `ABSENT`, and classification; never expose secret values.
4. Record exact argv arrays, cwd, start/end UTC, exit code, raw stdout bytes, raw stderr bytes, SHA-256 and byte count of each raw stream, plus separately generated sanitized UTF-8 views. Sanitization must never mutate raw evidence.
5. Run from zero. No prior WPR result or evidence path may be read as a pass. Each required command receives a unique group/command ID and fresh raw pair.
6. Produce complete pre/post exercised-input inventories for regular files under `apps/**`, `packages/**`, `scripts/guards/**`, `supabase/**`, and root files used by scripts. Unexplained drift stops the affected and following lanes.
7. Produce a final evidence inventory, raw-hash manifest, scope inventory, final patch, rollback instructions, pycache disposition, and handoff-time raw rehash. Freeze evidence before Backend commit except for the handoff and final commit metadata addendum.

## Required Verification Order

Use exact structured process argument arrays; do not interpolate shell command strings into the
runner. Capture each command independently.

1. Binding preflight, source/target hash checks, exact scope baseline, executable/version fingerprints, and helper self-tests.
2. Frozen install: `pnpm install --frozen-lockfile`.
3. Validator syntax: `python -m py_compile scripts/governance/codex_native_team_test.py`, with `PYTHONPYCACHEPREFIX` inside the Backend evidence lane; record then narrowly remove that exact cache before freeze.
4. Static validator: `pnpm governance:codex-native`.
5. Canonical repository gates in exact AGENTS.md order:
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
6. Framework manifest integrity against every regular file represented by `Project_Atlas_Development_Framework_v2.0.0/manifest.json`; report exact file count and every mismatch.
7. Package/lock post-security stability, dependency versions, zero-unwaived result, Documentation Bible tree/status, exact changed-path scope, transport byte equality, strict UTF-8/BOM/control scan for text, and raw-hash reverification.
8. Fresh runtime RBT evidence for the actual nested Backend child and the separate read-only Frontend child. Any unavailable/refused verification lane is reported non-green.

Any nonzero command stops following governed commands except safe diagnostic, evidence freeze,
rollback documentation, and handoff. A correction is permitted only in rows 1-8, followed by a
full restart from step 1. A product, UX, requirements, architecture, privacy, security-policy, or
business decision stops and returns `BLOCKED`; Backend must not invent it.

## Acceptance Criteria

- All 36 source bindings match before transport; rows 9-36 finish byte-identical; exact per-path mismatch diagnostics exist and pass their negative fixtures.
- Helper-versus-packet independent 45-row comparison is fully green with exact count/order/duplicate/missing/extra/hash/mode results.
- Candidate implements AD-015/AD-016 without weakening Atlas boundaries or product invariants.
- `py_compile`, `governance:codex-native`, frozen install, and all ten canonical gates run fresh in order and exit 0.
- Static validator reports every applicable check and exact pass count; no unavailable lane is presented as green.
- Fresh runtime trace proves Root authorization -> this Atlas TPM -> nested Backend, plus the applicable nested read-only Frontend boundaries; implementers cannot delegate, do not self-approve, and refuse forbidden product/Bible/Jarvis/PrintFlow/approval work.
- Framework manifest is byte-accurate for the complete final Framework tree.
- `package.json` and `pnpm-lock.yaml` remain exactly rows 37-38; resolved `js-yaml 4.3.1`, `nanoid 3.3.18`, and zero unwaived findings are evidenced.
- Bible tree remains `60e1b11dafeb58ab4e4377210820934b0f0b8f13` with empty path-scoped status.
- Raw stdout/stderr hashes reverify at Backend handoff and independently at TPM review; sanitized views are separate.
- Final diff contains only Backend-owned paths plus the uncommitted TPM packet/integration paths; no overlap or unowned file exists.
- Backend creates no child, makes no approval claim, and creates exactly one local implementation/evidence commit only if green.

## Role Boundary Test Trace Requirements

Atlas TPM records the parent trace and both child agent IDs. Backend and Frontend each report:
loaded role, delegation tool availability/refusal, `[agents] enabled = false` evidence, no child
created, no write outside its set, self-approval refusal, Architect Review refusal, public Jarvis
refusal, operational PrintFlow refusal, Bible/product-write refusal, and full `INV-JARVIS-001`
comprehension. Backend additionally demonstrates fail-closed Peer Task Packet, overlap,
stale-contract, missing-evidence, unavailable-lane, and peer-review-substitution cases.

Frontend is read-only. Atlas TPM stores its returned transcript only after both children complete.
Static configuration never substitutes for the fresh nested runtime trace.

## Evidence And Handoff

- Packet: `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-007-BE-DUAL-TEAM-ACTIVATION.md`.
- Backend evidence: `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-007/backend/**`.
- Backend handoff: `Project_Atlas_Team_Workspace/06_Handoffs/TSK-WPR-007-BACKEND-HANDOFF.md`.
- TPM integration evidence: `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-007/integration/**`.
- TPM Technical Review: `Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-007-DUAL-TEAM-ACTIVATION-TECHNICAL-REVIEW.md`.
- Architect-review-ready inventory: `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-007/integration/architect-review-ready-inventory.md`.

Backend handoff must name branch/base/head/commit, agent and RBT trace IDs, every changed file by
owner, exact commands/argv and exits, static/test counts, raw and sanitized evidence paths and
hashes, source/target/final sentinel comparison results, Framework manifest result, package/lock
hashes and dependency versions, Bible tree/status, pycache disposition, scope/overlap checks,
rollback, residual findings, unavailable lanes, and the explicit statement `NOT SELF-APPROVED`.

## Rollback

Before integration, rollback is the local Backend commit only. The integration owner may revert
that exact commit after review authorization; transport-only files and candidate changes revert
together. Evidence is preserved as review history unless Root explicitly authorizes another
disposition. No reset, clean, history rewrite, or rollback execution is authorized by this packet.

## Stop Conditions

Stop and return to Atlas TPM on any source hash mismatch, target-base mismatch before an owned
write, packet/helper table mismatch, overlapping writer, stale contract, package/lock drift,
unexpected exercised-input drift, Framework/Bible mismatch, missing raw evidence, raw hash
failure, unavailable required lane, nonzero gate, unowned file, self-approval, implementer child
creation, product/architecture decision, or inability to preserve exact transport bytes. Do not
represent a stopped or unavailable lane as green.

## Review And Next Gate

Backend hands off; Atlas TPM independently rehashes raw evidence and sources, reruns required
gates, verifies both child traces, and issues exactly one Technical Review verdict. Atlas TPM may
approve technical integration only. If `APPROVED FOR INTEGRATION`, the next gate is Codex Root
Architect Review. Claude production-code ownership remains frozen until that approval and the
first separately approved Peer Task Packet channel acknowledgement. Push, PR, merge, deployment,
production, milestone closure, release, and Andrea acceptance remain unauthorized.

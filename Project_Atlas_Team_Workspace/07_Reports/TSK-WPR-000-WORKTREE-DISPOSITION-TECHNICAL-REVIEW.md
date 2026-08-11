# TSK-WPR-000 Worktree Disposition Technical Review

## Decision

- **Disposition verdict:** `QUARANTINE`
- **Final state:** `CHANGES REQUIRED`
- **Technical Review verdict:** `CHANGES REQUESTED`
- **Integration:** `BLOCKED AND EXCLUDED`

The inherited catalog/cart/search/intake/configurator diff must remain draft material and
must not be committed, pushed, merged, deployed, or represented as product-approved. This
packet does not physically restore or relocate product files because `TSK-WPR-000` authorizes
TPM review artifacts only, not product-code mutation.

`AD-013_INTERACTIVE_PLACEHOLDER_UI_AUTHORIZATION.md` exists at review time, but it is
untracked and self-identifies as `PROPOSED - pending Codex Root / Atlas TPM review`. It is an
input to this review, not accepted superseding authority. The current web test lane is red,
the parent milestone remains draft/unapproved, and privacy/commercial/security decisions are
still missing.

## Verified Review Identity

| Item | Verified value |
|---|---|
| Repository | `G:/Claude/NoLimits3D-website` |
| Branch | `main` |
| HEAD | `84bb8f7f0671cbe072608372d890262899add756` |
| Prior inherited-diff review base | `25170f0113ec6d4f5f519faf28c5c77734952e46` |
| Tracked dirty-diff hash | `15a552ab63143d3fd1955b8ae3912e9311420df7` |
| Packet | `TSK-WPR-000-WORKTREE-DISPOSITION.md` |
| Packet implementer | Atlas TPM |
| Packet reviewer / architecture authority | Codex Root |
| Packet status | `READY FOR TPM PLANNING/REVIEW ONLY` |
| Active milestone state | M0R done/accepted; Blueprint 00/M1 is next planning gate only |
| WPR parent milestone | Draft; implementation blocked |

There is no approved canonical implementer handoff for the inherited application diff. The
dirty application work is attributed to the external Claude Team, not to an approved Atlas
Frontend Task Packet. TSK-WPR-000 authorizes assessment only.

## Worktree Changed During Review

This stop condition is **triggered and retained as a P1 finding**.

1. The initial directive-directory inspection found AD-001 through AD-012 and no AD-013.
2. During the review, untracked
   `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-013_INTERACTIVE_PLACEHOLDER_UI_AUTHORIZATION.md`
   appeared. Its local filesystem creation/write time was `2026-08-06 16:32:35`.
3. Claude Team appended acknowledgements to both coordination channels, reported two
   import-path fixes in `RichiediProgettoPage.tsx` and `AssistenzaStampantiPage.tsx`, confirmed
   other P1/P2 hardening already present, and stated it had stopped further `apps/**` edits.
4. The tracked diff hash was the same at the formal 16:33 and 16:37 snapshots. That later
   stability permits a disposition record; it does not erase the review-time change or turn
   the proposed directive into approval.

No product file was modified by Atlas TPM. No attempt was made to resolve the failed test in
place.

## AD-013 Review-Time Status

AD-013 exists at the final review snapshot with SHA-256
`00C87CFD4D5ACCCDBE9920F90FD5D504ADB7E12B983F3707A2AE81C5689BB030`.

It cannot currently supersede the prior authority because:

- its status is `PROPOSED`, not accepted or binding;
- it was authored by the Claude Frontend role whose application work it proposes to
  authorize, so accepting it without independent review would be self-approval;
- it was created after the implementation it documents;
- no Codex Root Architect Review accepts it;
- no approved parent milestone/Blueprint slice or new exact implementation packets exist;
- TSK-WPR-000 expressly reserves product integration, merge, push, deployment, production
  access and `BLK-BASE-001` closure.

AD-013 accurately preserves several non-negotiable boundaries in its proposed text: no real
business data or backend, no production claim, PrintFlow remains `Coming Soon`, Jarvis remains
private, `apps/legacy-web` remains fallback, and `BLK-BASE-001` remains open. Those statements
make it reviewable; they do not make it approved.

## Dirty Files by Owner and Scope at Input Snapshot

### Claude Team - inherited Frontend application draft (19 files)

Application composition and client state:

- `apps/web/src/app/AppShell.tsx` - modified
- `apps/web/src/data/mockCatalog.ts` - untracked
- `apps/web/src/lib/cart/CartContext.tsx` - untracked

Catalog and cart:

- `apps/web/src/routes/public/pages/esplora/CatalogoPage.tsx` - modified
- `apps/web/src/routes/public/pages/esplora/CatalogoPage.css` - untracked
- `apps/web/src/routes/public/pages/CarrelloPage.tsx` - modified
- `apps/web/src/routes/public/pages/CarrelloPage.css` - untracked

Search:

- `apps/web/src/routes/public/pages/RicercaPage.tsx` - modified
- `apps/web/src/routes/public/pages/RicercaPage.css` - untracked

Intake, quote and support:

- `apps/web/src/lib/mailtoForm.ts` - untracked
- `apps/web/src/routes/public/pages/realizza/RichiediProgettoPage.tsx` - modified
- `apps/web/src/routes/public/pages/realizza/RichiediProgettoPage.css` - untracked
- `apps/web/src/routes/public/pages/realizza/PreventivoStampa3DPage.tsx` - modified
- `apps/web/src/routes/public/pages/realizza/PreventivoStampa3DPage.css` - untracked
- `apps/web/src/routes/public/pages/realizza/AssistenzaStampantiPage.tsx` - modified
- `apps/web/src/routes/public/pages/realizza/AssistenzaStampantiPage.css` - untracked

Configurator:

- `apps/web/src/routes/public/pages/realizza/ConfiguratoreLanternePage.tsx` - modified
- `apps/web/src/routes/public/pages/realizza/ConfiguratoreLanternePage.css` - untracked

Tests:

- `apps/web/src/test/remaining-sitemap-pages.test.tsx` - modified

### Claude Team - proposed authority input

- `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-013_INTERACTIVE_PLACEHOLDER_UI_AUTHORIZATION.md`
  - untracked, proposed, outside TPM modifiable scope

### Unowned / excluded Claude tooling drift

- `.claude/launch.json` - modified; AD-013 itself excludes it from the proposed product work

### Shared Codex/Claude governance inputs

- `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md` - untracked
- `Project_Atlas_Team_Workspace/04_Planning/CLIENT_GOAL_WEB_APP_PRODUCTION_READY_2026-08-06.md` - untracked
- `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-000-WORKTREE-DISPOSITION.md` - untracked
- `Project_Atlas_Team_Workspace/06_Handoffs/CROSS_TEAM_CHAT.md` - untracked

There are no dirty Backend, Supabase, migration, API-contract, CI, infrastructure or
security-control implementation files.

## Product Surface to Authority Mapping

| Surface | Current classification | Review result |
|---|---|---|
| Governance review/evidence under TSK-WPR-000 | Authorized | TPM may write only the packet-listed report/evidence/handoff/planning paths. |
| App shell and cart provider | Rejected now; supersedable later | No approved Frontend packet. Global provider and persistence hardening are salvage candidates only. |
| Mock catalog and product grid | Rejected and commercially blocked | Displays fictional product classes and prices. Labels reduce deception risk but do not supply Product Owner commercial authority or a backend data contract. |
| Cart and cart-to-email completion path | Rejected and commercially/security blocked | Operates on example prices without server authority, availability, fulfillment, checkout/payment or order contract. It must not be treated as commerce completion. |
| Search | Rejected now; supersedable later | Search mechanics may be salvageable, but current results depend on the unapproved mock catalog/prices and lack required browser/accessibility evidence. |
| Project, quote and printer-support intake | Rejected and privacy blocked | Bounded mailto handling and disclosure are improvements, but there is no approved privacy/legal basis, minimization/retention decision, launch-failure evidence, or complete negative tests. |
| Lantern configurator | Rejected and commercially blocked | Example sizes, finishes and bases can imply capabilities. Product feasibility and commercial decisions are not approved; browser and complete-flow evidence are absent. |
| Modified sitemap-page tests | Rejected | The prior non-interactive boundary assertions were replaced before superseding authority existed, and the required web suite currently fails. |
| `.claude/launch.json` | Rejected as out of scope | Unowned tooling drift; restore only through a later exact Backend/governance packet. |
| Proposed AD-013 | Authorized as review input only | Requires Codex Root Architect Review and approved parent scope; cannot self-approve or retroactively integrate code. |

## Findings

### P1 - Authority and stable-review contract are not satisfied

The worktree changed during review and the claimed superseding directive appeared only as an
untracked, proposed, post-hoc document. The inherited application work lacks an approved parent
milestone, exact Atlas Frontend packet, canonical handoff and independent Architect Review.

### P1 - Required web test lane is red

`pnpm --filter @atlas/web test` failed twice on the same quote-intake mailto assertion. The
final run passed 161 of 162 tests and failed
`remaining-sitemap-pages.test.tsx:225`. The helper's `URLSearchParams` representation encodes
parentheses as `%28`/`%29`, while the test expects the literal-parenthesis representation from
`encodeURIComponent`. Whether the implementation or assertion should change belongs to the
responsible Frontend implementer under a future approved packet, not Atlas TPM.

### P1 - Privacy, commercial and backend/security decisions remain open

Privacy/legal gaps:

- approved processing basis and collection-point wording;
- data minimization and categories permitted in project/support free text;
- retention, deletion, processors/DPA and contact-channel policy;
- mail-client unavailable/rejected behavior and test evidence;
- hostile/overlong input, truncation and user-understanding negative tests;
- consent/acknowledgement requirements, if any, decided by the proper authority.

Commercial/product gaps:

- real catalog, variants, categories, product/service boundary and media rights;
- pricing/public-pricing policy, taxes, availability and lead-time rules;
- inventory, fulfillment, checkout/payment and order-versus-quote semantics;
- lantern sizes/materials/finishes/capability claims;
- support eligibility, response expectations and operational ownership.

Backend/security gaps:

- approved contracts and source of truth for catalog, pricing and availability;
- schema, migrations, deny-by-default RLS and server validation;
- authentication/authorization decision where applicable;
- audit, abuse/rate limits, upload controls, observability and failure handling;
- backup, rollback and disaster-recovery evidence;
- negative authorization, privacy and malformed-input tests.

### P2 - Technical hardening is partial and evidence is incomplete

The current diff does visibly add cart normalization/storage fallback, bounded mailto helpers,
collection-point disclosure, corrected validation refresh and a narrower search live region.
Those are useful draft changes. Missing evidence still includes corrupted/denied storage,
quantity boundaries and checkout behavior, mailto truncation/failure, invalid-submit focus/error
summary, search announcement behavior, complete configurator flow, responsive states, real
browser accessibility and no-console-error E2E.

### P2 - Tooling/config contamination remains

`.claude/launch.json` is dirty, outside TSK-WPR-000's modifiable scope and excluded by the
proposed AD-013. It cannot accompany any product salvage.

## Independent Child Lane Checks

Atlas TPM created only the two permitted read-only child roles and waited for both before this
integration review:

- Atlas Frontend `019fd77d-dff6-7973-82e2-e5a55198083a` reviewed only the 19 dirty
  `apps/web/**` files and advised `QUARANTINE`.
- Atlas Backend `019fd77d-e1f7-76c3-9d78-79614cb601d0` reviewed only non-app authority,
  security/data boundaries and dirty governance/tooling files and advised `QUARANTINE`.

Neither child wrote files, created a child agent, committed, pushed, or approved its own work.
The TPM independently reached the disposition and did not use either advisory as approval.

## Command Results

| Command | Exit | Exact result |
|---|---:|---|
| `git status --short --branch` | 0 | `main` dirty; 9 modified app files, 10 untracked app files, modified `.claude/launch.json`, proposed AD-013 and four untracked governance inputs before TPM outputs. |
| `git diff --check` | 0 | No stdout/stderr. Note: standard Git diff check does not inspect untracked file contents. |
| `pnpm --filter @atlas/web test` | 1 | 17 files: 16 passed, 1 failed; 162 tests: 161 passed, 1 failed; quote-intake mailto assertion at line 225. Reproduced twice. |
| `pnpm guard:scope` | 0 | `Scope and private-route guard: PASS` |
| `pnpm guard:source-bindings` | 0 | `Documentation source-binding guard: PASS` |

E2E, real-browser, performance-budget and the full canonical repository battery were not run
under this minimum disposition packet. They are **not green** and must not be inferred from
the two passing guards.

Evidence is archived under:

- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-000/00-review-snapshot.txt`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-000/01-git-status-short-branch.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-000/02-git-diff-check.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-000/03-web-test.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-000/04-guard-scope.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-000/05-guard-source-bindings.log`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-000/06-child-lane-handoffs.md`

## Why QUARANTINE

- `SUPERSEDE` is unavailable: AD-013 and the WPR parent milestone are not approved, and the
  required test is red.
- `SPLIT` is premature: salvage boundaries depend on unresolved architecture, privacy and
  commercial decisions.
- Immediate `RESTORE` is outside this packet and would discard reviewable hardening without a
  recoverable archive.
- `QUARANTINE` preserves the draft and its provenance while keeping every product path
  excluded from integration. A later exact packet can archive and restore the active worktree
  safely, after which Codex Root can decide whether any slice may be reintroduced.

## Exact Next Task Packet Candidate

Candidate ID: `TSK-WPR-001-QUARANTINE-AND-RESTORE`

Status: not issued. Codex Root must approve/issue it. Its purpose is evidence-preserving
cleanup, not product integration.

### Atlas Frontend write set

Allowed product paths, exact and exclusive:

- `apps/web/src/app/AppShell.tsx`
- `apps/web/src/data/mockCatalog.ts`
- `apps/web/src/lib/cart/CartContext.tsx`
- `apps/web/src/lib/mailtoForm.ts`
- `apps/web/src/routes/public/pages/CarrelloPage.tsx`
- `apps/web/src/routes/public/pages/CarrelloPage.css`
- `apps/web/src/routes/public/pages/RicercaPage.tsx`
- `apps/web/src/routes/public/pages/RicercaPage.css`
- `apps/web/src/routes/public/pages/esplora/CatalogoPage.tsx`
- `apps/web/src/routes/public/pages/esplora/CatalogoPage.css`
- `apps/web/src/routes/public/pages/realizza/AssistenzaStampantiPage.tsx`
- `apps/web/src/routes/public/pages/realizza/AssistenzaStampantiPage.css`
- `apps/web/src/routes/public/pages/realizza/ConfiguratoreLanternePage.tsx`
- `apps/web/src/routes/public/pages/realizza/ConfiguratoreLanternePage.css`
- `apps/web/src/routes/public/pages/realizza/PreventivoStampa3DPage.tsx`
- `apps/web/src/routes/public/pages/realizza/PreventivoStampa3DPage.css`
- `apps/web/src/routes/public/pages/realizza/RichiediProgettoPage.tsx`
- `apps/web/src/routes/public/pages/realizza/RichiediProgettoPage.css`
- `apps/web/src/test/remaining-sitemap-pages.test.tsx`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/frontend/**`

Required action: archive a content-addressed copy of all 19 paths, including a tracked
binary-capable diff and all untracked content, verify checksums, then restore the tracked paths
to HEAD and remove only the exact archived untracked paths from the active worktree. The archive
must make recovery possible. No functional correction or selective integration is allowed.

### Atlas Backend write set

Allowed paths, exact and exclusive:

- `.claude/launch.json`
- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/backend/**`

Required action: archive the exact configuration diff and checksum, then restore
`.claude/launch.json` to HEAD. No other `.claude/**`, `.codex/**`, CI, package, Supabase,
migration or infrastructure path is allowed.

### TPM integration write set

- `Project_Atlas_Team_Workspace/05_Evidence/WPR/TSK-WPR-001/integration/**`
- `Project_Atlas_Team_Workspace/07_Reports/*TSK-WPR-001*QUARANTINE*.md`
- append-only updates to `Project_Atlas_Team_Workspace/06_Handoffs/CROSS_TEAM_CHAT.md`
- append-only updates to
  `Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`

### Forbidden paths/actions

- `Project_Atlas_Development_Blueprint_v0.1/**`, including AD-013
- `NoLimits3D_Documentation_v0.96/**`
- `Project_Atlas_Development_Framework_v2.0.0/**`
- every `apps/**` path not enumerated above
- `packages/**`, `supabase/**`, `apps/legacy-web/**`
- commits, pushes, merges, branch rewrites, deployment, production access, secrets or
  credentials
- product fixes, requirement changes, selective salvage or approval

### Required acceptance evidence

- before/after branch, HEAD and all-file status;
- verified archive manifest and SHA-256 checksums before any restore/removal;
- proof that the exact 19 Frontend paths and `.claude/launch.json` are clean against HEAD;
- proof AD-013 retains the review-time hash unless Codex Root separately authorizes a change;
- `git diff --check`, web test, scope guard and source-binding guard after cleanup;
- no child delegation and no self-approval;
- independent TPM Technical Review.

## Gates Before Any Later SUPERSEDE or SPLIT

If Codex Root later accepts AD-013 or a replacement parent Blueprint slice, new disjoint
Backend and Frontend implementation packets must require, in repository order:

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

They must also require real desktop/mobile browser checks, keyboard and axe evidence,
no-console-error traces, privacy/security negative tests, migration/rollback evidence where
applicable, and a new stable-snapshot Technical Review. Passing unit tests alone cannot approve
the product direction.

## Preserved Boundaries and Escalation

- PrintFlow remains `Coming Soon`; no worker, endpoint, download or operational client path is
  authorized.
- Jarvis remains Andrea's strictly private future Command Center capability. No public/customer
  access or implementation is authorized.
- `apps/legacy-web` remains the public fallback.
- `BLK-BASE-001` remains `OPEN - production blocker only`; it blocks release/cutover and does
  not waive planning discipline.
- Codex Root is the escalation authority for AD-013 Architect Review, parent milestone/
  Blueprint approval and issuance of the next packet.
- Andrea is the authority for product priority, real business/commercial data, privacy/legal
  decisions and later human acceptance. Those do not replace technical gates.
- Product-code corrections, including the failed mailto test contract, must be routed to Atlas
  Frontend under an approved packet. Atlas TPM will not implement them.

## Next Gate

Codex Root reviews this disposition and either issues
`TSK-WPR-001-QUARANTINE-AND-RESTORE` or provides a different explicit architecture decision.
Until that happens, the worktree is `CHANGES REQUIRED`, the inherited application diff remains
quarantined by decision only, and no Frontend/Backend production-readiness implementation packet
is ready.

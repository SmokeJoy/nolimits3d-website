# CLAUDE-WPR-M1-CORRECTED -- Peer Review Evidence

## ROUND-2 UPDATE: Atlas TPM's official Technical Review superseded the round-1 self-organized review

Everything below this notice describes **round 1**: three agent instances spawned by the
implementing session itself, genuinely blind but not a separate accountable identity (see the
"Independence caveat" section below, unchanged). Atlas TPM's own **official, independent**
Technical Review has since happened -- `2026-08-13 15:53 Europe/Rome`, verdict `CHANGES REQUESTED`
at head `1cf9a1a94e07e9efc388b85bc9842a9ba84923df` -- and is the review that actually matters for
packet section 15 gate 2. Its findings and this round's fixes are summarized in the handoff
section 9 (not duplicated here to avoid the two documents drifting out of sync); the full reports
are `Project_Atlas_Team_Workspace/07_Reports/CLAUDE-WPR-M1-CORRECTED-TECHNICAL-REVIEW.md` and
`Project_Atlas_Team_Workspace/05_Evidence/WPR/CLAUDE-WPR-M1-CORRECTED/integration/technical-review-evidence.md`
(both Atlas TPM-owned, read-only for Claude, outside this packet's section 5 write set).

Separately, Atlas TPM's review also correctly found that round 1's three-reviewer exercise below
does **not** satisfy packet section 15 gate 1's named
`Claude Team Reviewer - WPR-M1 Independent Peer Review` requirement, for the same
same-session-spawned reason disclosed in the "Independence caveat" section below.

## ROUND-3 UPDATE: the distinct peer review has now run, and found one real defect

A genuinely separate agent instance -- no memory of this session's reasoning, no access to modify
implementation -- reviewed round 2's corrected, pushed head
(`b3d3206b81d4047ef299615391ebf8132c7d6da6`) and posted its own verdict directly to the shared
channel (`2026-08-13 17:10 Europe/Rome`), **not** written or curated by this implementing session,
exactly as intended: **`CHANGES REQUIRED`**.

It independently reproduced essentially all of round 2's claims (re-ran the 95-test suite itself,
re-ran `pnpm guard:production-readiness`, wrote its own adversarial `node -e` probes against every
new round-2 check, independently inspected `commands.tsv` and the dirty `pa-ip-001` worktree,
independently reconfirmed PR #25/#26/#27 heads and CI status) -- all of that held up. It also found
one real, previously-undisclosed defect this implementing session had not caught: round 2's own
deviation-log stated the round-2 commit was unsigned, when it was in fact genuinely SSH-signed
(verified via `git cat-file -p ... | grep gpgsig`). This was stale boilerplate, written before that
commit's actual signing outcome was known and never corrected -- exactly the same
self-description-goes-stale failure mode as round 2's own headline "two commits" finding, just not
self-caught this time. **Fixed in round 3** (handoff section 8 item 6, section 9). The reviewer also
disclosed one explicitly non-blocking observation about `FORMAT_VALIDATORS` coverage breadth,
correctly scoped as outside structural-validation's ability to guarantee self-reported-evidence
truthfulness -- not fixed, recorded in the handoff section 9/10.

This result is exactly why round 2 insisted on a genuinely separate reviewer rather than treating
round 1's implementer-spawned exercise as sufficient: independence caught something self-review
missed.

## Round 1 (superseded above, retained for full history)

### Status: independent review performed; CHANGES REQUIRED findings remediated

A prior version of this file stated the independent Claude peer review (packet section 15 gate 1)
had not yet been performed, since the implementation owner cannot also be their own reviewer
(packet section 2 names these as distinct accountable roles; section 2/15 forbid self-approval).
That review has now been performed, using three separate agent instances with no memory of this
implementation's reasoning, each given only the pushed commit and the packet text (retrieved fresh
from `origin/main`, independently re-hashed by each reviewer). Their full disposition: **CHANGES
REQUIRED**, on real, reproducible correctness grounds -- not process nitpicks. Every finding has
since been remediated in a follow-up commit; this file records both the findings and the fixes so
Atlas TPM's own review has the full history, not just the current clean state.

## Independence caveat (still worth stating plainly)

The three reviewer agents were spawned by, and reported back to, the same session that implemented
this packet. Each reviewer worked genuinely blind (fresh context, no access to this session's prior
reasoning, instructed to re-derive everything from the commit itself rather than trust any
description), which is real and meaningfully different from the implementer re-checking their own
work. But the implementer still chose the reviewers' mandates, decided what to do with their
findings, and performed the remediation. This is a stronger form of independence than none, but a
weaker one than a wholly separate human-initiated session or a different accountable identity
entirely. Atlas TPM's own independent Technical Review remains the review that matters most and is
still the explicit request of this handoff.

## What the three reviewers found

### 1. Acceptance-matrix reviewer

Independently re-verified all 15 packet section 9 criteria against the frozen commit, re-running
every required command itself rather than trusting the handoff's claims. Verdict: **APPROVED FOR
TECHNICAL REVIEW**, with one moderate finding (evidence files not committed) and minor findings
(a stale line in `overlap-check.md`; a citation off-by-one in the route inventory). This reviewer's
scope was checklist/reproducibility verification -- it did not adversarially exercise the guard's
fail-closed logic with fabricated input, which is why its verdict differed from the other two.

### 2. Scope-governance reviewer

Independently verified the section 5/6 write-set boundary, the exact `package.json` diff, PR head
immutability, and re-ran the exact `git log --diff-filter=A -- "*05_Evidence*"` command the
(then-current) handoff cited to justify leaving evidence uncommitted. Found that command's own
output contradicted the handoff's claim: 16 prior commits, including this same packet's own sibling
`planning/` evidence directory (commit `17fa6db`, part of this packet's publication lineage, merged
as PR #30), force-added evidence past the identical `.gitignore` rule. Verdict: **CHANGES
REQUIRED** -- rated the missing-evidence gap and the false justification as High severity, since
both are independently confirmable and the mechanism to fix them was demonstrably available and
already used earlier in this exact packet's history.

### 3. Adversarial skeptic

Tried to actively break `production-readiness-guard.mjs`'s fail-closed logic using live
reproductions (executed `node -e` snippets against the guard's exported functions, not just static
reading). Found and reproduced:

- 14 obviously-fake values (`"REPLACE ME"`, `"FIXME"`, `"test"`, `"changeme"`, `"COMING SOON"`,
  etc.) all passed `looksLikePlaceholder` undetected.
- An empty-string `value` on an approved field bypassed both the null/undefined check and the
  placeholder check.
- `bindingVerifiedAt` had no upper bound; a fabricated future date (`"2099-01-01"`) trivially
  satisfied the "not stale" check.
- `binding.status`/`consumptionMechanism` were exact-literal checks against one specific "bad"
  value each, not allow-list validated; `ALLOWED_BINDING_STATUSES` was exported but never
  referenced anywhere (confirmed dead code).
- **End-to-end reproduction**: a manifest built across all 6 required categories, every approved
  field's evidence literally `"REPLACE ME"`/`"FIXME"`, returned `ready: true, violationCount: 0`
  from `checkManifestReadiness` -- fabricated data passing as production-ready.
- Also flagged (Medium): `field.format` accepted but never type-checked; roughly 20 implemented
  violation codes had zero test assertions.

Verdict: **CHANGES REQUIRED** -- explicitly stated the CRITICAL findings were "not theoretical,"
backed by working reproductions, and disqualifying on their own regardless of the other two
reviewers' verdicts.

## Synthesis disposition (all three reports combined)

**CHANGES REQUIRED.** The synthesis correctly did not treat "2 of 3 lean approve" as a majority
override: the adversarial skeptic's CRITICAL finding was outside the other two reviewers' scope
(neither examined it, so neither contradicted it), and a guard whose entire stated purpose is
rejecting fabricated data returning `ready:true` on fabricated data is disqualifying regardless of
vote count.

## Remediation performed in response (this session, same accountable implementer)

1. `PLACEHOLDER_PATTERNS` broadened from 8 narrow patterns to 24 word/token-boundary patterns;
   every one of the adversarial reviewer's 14 tested fake values now has a dedicated regression
   test.
2. `APPROVED_WITHOUT_VALUE` now also rejects blank/whitespace-only string values.
3. New `validateBindingContractStructure()` function: closed-world validation of every binding
   entry (required/unknown keys, `status`/`consumptionMechanism` allow-list membership via the
   now-wired `ALLOWED_BINDING_STATUSES` and new `ALLOWED_CONSUMPTION_MECHANISMS`, duplicate
   id/manifestFieldId detection, `bindingVerifiedAt` ISO-8601 format validation), wired into
   `checkManifestReadiness`.
4. `field.format` now validated as a string when present (`FIELD_INVALID_FORMAT`).
5. The exact end-to-end fabricated-manifest reproduction from the adversarial review is now a
   permanent regression test asserting `ready:false`.
6. ~20 previously-untested violation codes each received a dedicated test; the suite grew from 37
   to 76 tests.
7. Evidence files force-added past `.gitignore`, matching the demonstrated precedent the
   scope-governance reviewer found; the handoff's false justification corrected.
8. `overlap-check.md` refreshed to include the worktree that appeared mid-session; the route
   inventory's citation off-by-one fixed.

All fixes were independently re-verified against the real committed manifest/binding contract
(unchanged result: `ready:false`, same 2 honest `HARDCODED_VALUE_WITHOUT_APPROVAL` findings on
`business.address`/`business.contactChannels`) to confirm no regression against legitimate data,
and against the exact fabricated-data reproduction to confirm the exploit is closed.

## What Atlas TPM should still independently check

- Re-run the full command sequence in `commands.tsv` from this frozen head and confirm identical
  results, exactly as the three reviewer agents already did once.
- Form an independent judgment on the "not fixed, by design" items disclosed in the handoff section
  9: binding-contract completeness (a JSON validator cannot detect an undisclosed hardcoded value
  without static analysis of `apps/**`, which this packet cannot touch) and the inherent
  self-reported-timestamp trust boundary.
- Consider whether the independence caveat above (reviewers spawned by the implementer, in the same
  session) is sufficient for this gate, or whether a wholly separate review pass is still warranted
  before this proceeds further.

## Explicit non-claim

This file does not assert that Atlas TPM Technical Review is satisfied, nor that this packet is
ready for integration, merge, or any production action. It records what was found and fixed so
that review can be fast and targeted, not exhaustive from zero.

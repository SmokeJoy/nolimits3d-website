# Dependency Adoption Policy

## Principle
Strategic dependencies require an ADR. Trivial dependencies require a Tooling Proposal. "Use every available plugin" is explicitly prohibited.

## Tool Maturity Levels
`PROPOSED` -> `EVALUATION` -> `APPROVED` -> `ACTIVE` -> `DEPRECATED` -> `REMOVED`

## Periodic Tool Review
Every 3 milestones, Atlas TPM must verify:
- If a tool is still useful.
- If better alternatives exist.
- If it introduces unnecessary costs.
- If it increases lock-in.

## Process
1. Evaluate necessity vs CSS/native capabilities.
2. Document impact on bundle size and performance.
3. Verify accessibility compliance.
4. Verify Design System compatibility.
5. Obtain approval from Atlas TPM (for trivial) or Codex Root (for strategic).

## Security Advisory Waivers

`pnpm dependency:audit` is fail-closed. An advisory it reports may be tolerated **only**
through a matching entry in `DEPENDENCY_WAIVERS.json`. Added 2026-08-04: previously the
guard's error message promised a "time-bound approved waiver" that no policy or mechanism
defined, and `DEPENDENCY_WAIVERS.json` cited this document for an authority it did not grant.

Binding rules, enforced in `scripts/guards/dependency-audit.mjs` and covered by tests:

1. **Critical advisories are never waivable.** This holds both when a waiver claims
   `critical` and when the live advisory has escalated to `critical` since the waiver was
   written — the live severity wins.
2. **Every waiver is time-bound.** `opened` and `expires` are mandatory, `expires` must
   follow `opened`, and the horizon may not exceed **180 days**. An expired waiver fails
   the gate; it does not lapse into tolerance.
3. **Every waiver is attributed and reasoned.** `advisory`, `package`, `severity`,
   `reason` and `owner` are mandatory and non-empty. The reason must state why the
   vulnerable code path is not reachable, not merely that the fix is inconvenient.
4. **A waiver is scoped to one advisory and one package.** It never generalises.
5. **Waivers that match no advisory are reported as stale** and must be removed, so the
   file cannot accumulate dead exemptions.
6. **Approval authority** is Codex Root as Chief Architect, as for a strategic dependency.
   Atlas TPM owns the waiver record, review evidence, expiry tracking, and renewal proposal. A waiver
   is a deliberate acceptance of residual risk and is reviewed at every renewal.

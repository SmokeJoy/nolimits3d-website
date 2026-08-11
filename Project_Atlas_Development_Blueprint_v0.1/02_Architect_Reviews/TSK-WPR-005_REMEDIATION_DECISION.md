# Codex Root Evidence-Policy Remediation Decision - TSK-WPR-005

> **Review owner:** Codex Root - Chief Architect & CTO
> **Date:** 2026-08-06
> **Input:** TSK-WPR-005 Dual-Team Governance Verification Technical Review
> **Technical Review verdict:** CHANGES REQUESTED
> **Architect disposition:** WPR-006 FRESH FULL RUN REQUIRED; NO ARCHITECT APPROVAL

## Decision

Preserve the unchanged eight-file governance candidate as unapproved WPR-006 input. WPR-005
proved the static validator and build can pass, but those partial results are not inherited.

WPR-006 must separate immutable command bytes from human-readable evidence:

- execute the verified global pnpm through
  `C:\Program Files\nodejs\node.exe` and
  `C:\Program Files\nodejs\node_modules\corepack\dist\pnpm.js` with structured arguments;
- use a checked-in-for-the-lane helper under the WPR-006 evidence directory only;
- preserve stdout and stderr as separate byte-exact `.raw` files;
- record byte length and SHA-256 for every raw stream;
- create separate UTF-8-no-BOM `.txt` views with ANSI terminal sequences removed and record the
  number/type of removed sequences;
- scan authored Markdown/TSV/JSON/helper source and sanitized views for unintended control
  characters, but never reject or silently alter raw command artifacts;
- verify raw hashes again during Backend handoff and Atlas TPM Technical Review.

The helper must fail closed on process-spawn error, timeout, missing stream artifact, malformed
metadata, non-zero command exit, or argument mismatch. It must not execute arbitrary input;
WPR-006 lists the fixed commands and order.

Every command is rerun from zero. The full sequence must complete before final patch, scope,
fingerprint, rollback, and handoff evidence is frozen.

## Authorization Boundary

Codex Root authorizes Atlas TPM to issue WPR-006 and delegate one fresh Atlas Backend child.
No product write, Claude production-code activation, Architect approval, Git action, release,
deployment, production access, business/visual acceptance, milestone closure, or
`BLK-BASE-001` closure follows from this decision.

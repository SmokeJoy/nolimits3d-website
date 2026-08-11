# Codex Root Full-Verification Remediation Decision - TSK-WPR-006

> **Review owner:** Codex Root - Chief Architect & CTO  
> **Date:** 2026-08-11  
> **Input:** TSK-WPR-006 Dual-Team Governance Full Verification Technical Review  
> **Technical Review verdict:** CHANGES REQUESTED  
> **Architect disposition:** SECURITY REMEDIATION FIRST; THEN WPR-007 FRESH FULL RUN

## Decision

WPR-006 remains truthful stopped evidence and must not be edited, rerun, or reinterpreted as a
partial pass. The unchanged eight-file dual-team governance candidate remains unapproved input.

The current high-severity dependency findings are repository-wide governed inputs. Atlas TPM must
first complete a dedicated dependency-remediation packet without a waiver or bypass. WPR-007 may
be issued only after the resulting `package.json` and `pnpm-lock.yaml` bytes are stable and their
fresh hashes are recorded. This ordering prevents stale dependency fingerprints from invalidating
the WPR-007 run.

After a green dependency Technical Review, Codex Root authorizes Atlas TPM to issue WPR-007 and
delegate one fresh nested Atlas Backend child for a full run from zero. WPR-007 must preserve the
WPR-006 evidence-policy model and correct these verified defects:

1. Use one immutable, complete, ordered packet table of sentinel paths and literal 64-hex SHA-256
   values. No abbreviated values, concatenated fragments, inferred suffixes, or ellipses.
2. The evidence helper must contain an independently embedded complete literal table. Its
   self-test must compare packet and helper path count, order, duplicate set, missing/extra paths,
   and every expected hash before the governed run.
3. Preflight must report every mismatch separately with path, expected hash, actual hash, and
   classification, while excluding secret values and failing closed.
4. The helper and packet must use the post-security dependency fingerprints. Any later change to
   a dependency, command semantic, governed contract, executable, argument vector, candidate
   source, or evidence lane stops the packet.
5. Execute every governed command from zero in the exact canonical order. Preserve byte-exact
   stdout and stderr separately, hash each raw stream, produce sanitized UTF-8 views without
   mutating raw evidence, and reverify raw hashes at Backend handoff and Atlas TPM review.
6. Add the applicable fresh Role Boundary Test evidence required by AD-015. No unavailable lane
   may be described as green and no WPR-003 through WPR-006 result may be inherited.
7. Remove only the packet-owned `__pycache__` artifact before final freeze, or classify, hash, and
   inventory each generated `.pyc`. Broad cleanup is forbidden.
8. Freeze final fingerprints, patch, scope, rollback, handoff, and evidence inventory before
   independent Atlas TPM Technical Review.

## Activation Boundary

WPR-007 can establish the technical prerequisites for the Claude peer lane, but it does not by
itself authorize product implementation. Claude production-code ownership becomes active only
after all of the following are present:

- dependency remediation Technical Review is green;
- WPR-007 Atlas TPM verdict is `APPROVED FOR INTEGRATION`;
- Codex Root Architect Review approves the dual-team governance candidate;
- Atlas TPM issues a fresh exact Peer Task Packet from the reviewed base; and
- Claude Team acknowledges that packet in the canonical channel before writing.

The old PR #25, #26, and #27 branches remain frozen historical inputs and are not valid starting
points for the new packet.

## Authorization Boundary

This decision authorizes packet planning, the named nested Backend delegation, evidence creation,
and independent Technical Review only. It does not authorize a waiver, old-PR mutation, direct
write to `main`, merge, release, deployment, production access, business or visual acceptance,
milestone closure, or `BLK-BASE-001` closure.

PrintFlow remains non-operational and `Coming Soon`. Jarvis remains Andrea-private and
unimplemented. `apps/legacy-web` remains the public fallback until a separately approved cutover.

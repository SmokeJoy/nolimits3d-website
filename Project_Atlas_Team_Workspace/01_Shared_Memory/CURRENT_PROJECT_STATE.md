# Current Project State

- **Phase:** Codex-native development planning
- **Current Milestone:** M0R - DONE / PRODUCT OWNER ACCEPTED / MERGE AUTHORIZED
- **Last Historical Milestone:** M0 Legacy Team Bootstrap - DONE / SUPERSEDED
- **Next Milestone:** Blueprint 00 / M1 Repository Foundation - NEXT PLANNING GATE ONLY; IMPLEMENTATION NOT AUTHORIZED
- **Latest Directive:** AD-012 - Jarvis Authoritative Boundary
- **Latest Technical Review:** `INHERITED_FRONTEND_DIFF_TECHNICAL_REVIEW_2026-08-06.md` - CHANGES REQUESTED; APPLICATION DIFF EXCLUDED
- **Latest Jarvis Technical Review:** `JARVIS_AUTHORITATIVE_BOUNDARY_TECHNICAL_REVIEW_2026-08-06.md` - APPROVED FOR TECHNICAL INTEGRATION
- **Latest Integration:** PR #23 - MERGED TO `main` AS VERIFIED SQUASH `7c6a475`; POST-MERGE CI PASS
- **Latest Architect Review:** `M0R_POST_ACCEPTANCE_CLOSURE_ARCHITECT_REVIEW.md` - APPROVED FOR SIGNED CLOSURE COMMIT AND MERGE AFTER GREEN CI
- **Product Owner Acceptance:** `M0R_PRODUCT_OWNER_ACCEPTANCE_2026-08-05.md` - ACCEPTED
- **Implementation:** Jarvis documentation/governance alignment authorized; Jarvis production code unauthorized
- **Last Update:** 2026-08-06

## Active Governance

Codex Root is Chief Architect & CTO and does not implement production code. Atlas TPM owns
coordination, integration and Technical Review. Atlas Frontend and Atlas Backend are the
only implementers; they cannot create subagents or self-approve.

## Historical Continuity

M-001 closed under `PA-AR-M001-019`. M-002 Waves A, B, C1 and C2 were delivered under the
now-superseded Claude-native governance; PR #9 reported green CI. These remain historical
facts and do not satisfy the M0R acceptance gate.

## M0R Evidence Status

- Post-acceptance static validator, repository skills, and all applicable repository gates
  are required to pass in the closure evidence.
- The canonical nested runtime trace passes RBT-01..07 with TPM and both implementer IDs.
- The wrapper exit 1 anomaly is retained in the Technical Review; the underlying Codex turn
  completed with PASS.
- `BLK-M0R-001` through `BLK-M0R-004` are closed.
- Andrea's Product Owner acceptance and the Backend-owned closure validator are integrated.
- Atlas TPM post-acceptance closure Technical Review and Codex Root closure Architect Review
  are approved. The signed closure history, push, green PR CI, and merge are complete.
- `DEV-M0R-002` records the top-level transport workaround after canonical nested Backend
  delegation proved read-only. Task authority, ownership and independent review did not
  change.
- Jarvis boundary PR #23 merged to `main` as GitHub-verified squash commit `7c6a475`.
  PR CI and post-merge CI passed. The automatically triggered GitHub Pages workflow was
  cancelled before artifact upload and deployment because `BLK-BASE-001` remains open.
- No Jarvis implementation, production deployment, or production access occurred.

Jarvis remains private, PrintFlow remains `Coming Soon`, and `BLK-BASE-001` blocks
production.

## INV-JARVIS-001

> **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**

```yaml
id: INV-JARVIS-001
statement: "Jarvis is Andrea's private AI assistant inside the NoLimits3D Command Center. It is not public, not customer-facing, not a development-team member, and not authorized for implementation before a dedicated Blueprint and identity/capability security foundation."
classification: ACCEPTED_DECISION
authority_level: PROJECT_INVARIANT
owner: Chief Architect & Product Owner
status: ACTIVE
```

Jarvis implementation remains prohibited. The current Codex-native role-memory mapping is
Atlas TPM for historical Gemini TPM, Atlas Frontend plus `CLAUDE.md` for historical Claude
Frontend, and Atlas Backend for historical Codex Backend. This mapping does not reactivate
the superseded team.

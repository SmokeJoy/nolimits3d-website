# Corrected Claude WPR-M1 Scope Decision

> **Owner:** Codex Root - Chief Architect & CTO  
> **Date:** 2026-08-11  
> **Inputs:** AD-014, AD-015, AD-016, PR #25 Technical Review  
> **Status:** BINDING INPUT FOR THE FIRST POST-ACTIVATION PEER TASK PACKET

## Decision

The reviewed PR #25 branch remains frozen historical evidence and must not be rebased, amended,
force-pushed, merged, or used as the implementation base. After AD-015 activation, Atlas TPM must
issue Claude Team a fresh WPR-M1 Peer Task Packet from the exact reviewed `main` SHA.

Claude Team will own the corrected WPR-M1 implementation on a new clean branch. Atlas TPM will own
integration and independent Technical Review. Codex Root will own Architect Review. Andrea will
retain business acceptance, approval of real client data, approval of the competitor reference
set, and subjective visual acceptance.

## Required Deliverables

### 1. Route And Capability Inventory

Create a machine-readable and human-readable inventory derived from the real router, navigation,
Documentation Bible, AD-014, and active product boundaries. Every route and required capability
must be classified explicitly as one of:

- implemented and test-backed;
- implemented placeholder with an honest boundary;
- Coming Soon;
- fallback-only;
- private/admin-only;
- forbidden or not authorized; or
- missing and blocking.

The inventory must cover public catalog, search, product detail, cart, requests/intake,
configurator, account/auth, uploads, policy/legal surfaces, observability/readiness, legacy
fallback, PrintFlow, and Jarvis boundaries. It must not classify a shell, notice, or dead route as
a completed capability.

### 2. Client Data Contract

Define a versioned JSON Schema and a client-data manifest. Each field must include:

- stable identifier and category;
- value type and format;
- whether Andrea must supply or approve it;
- current lifecycle status;
- source and provenance;
- usage rights or consent where applicable;
- business approval evidence;
- legal/privacy approval evidence where applicable;
- target source binding or deployment binding;
- validation rule and blocking severity; and
- last verification timestamp.

Empty required categories, missing field arrays, unknown properties, duplicate identifiers,
invalid status transitions, and required `approved` entries without complete evidence must fail
closed. Placeholder values must never satisfy production readiness.

### 3. Source-Binding Contract

Map every production-relevant manifest field to the exact application/configuration target that
consumes it. The guard must prove that a required approved field is both evidence-complete and
bound to the deployed source path or environment contract. An approved but unused value, or a
hard-coded production value without an approved manifest binding, is blocking.

### 4. Readiness Guard And Negative Tests

The production-readiness guard must be deterministic, read-only, fail closed, and produce a
machine-readable summary. Tests must cover at least:

- empty category arrays;
- category object without a fields array;
- missing and extra schema properties;
- duplicate identifiers;
- required fields in missing, draft, rejected, expired, or approved-without-evidence states;
- missing provenance, rights/consent, business approval, legal approval, or source binding;
- placeholder values masquerading as approved data;
- target source missing or not consuming the binding;
- complete valid non-production fixture; and
- complete valid production fixture with no real Andrea data committed.

The guard may prove contract correctness with fixtures, but production readiness must remain red
until Andrea's real required data and approvals are present.

### 5. AD-016 Reference Set And Rubric

Provide a proposed competitor/reference set and an objective evaluation rubric covering visual
identity coherence, clarity, information architecture, accessibility, responsive behavior,
performance, trust, product inspection, and conversion flow. The proposed set remains pending
Andrea's approval and cannot be represented as accepted. No competitor asset or copy may be
copied into the product.

## Boundaries

- No app UI, catalog implementation, commerce implementation, Supabase schema, auth, upload,
  deployment, production data, release, or cutover is part of corrected WPR-M1.
- PrintFlow stays non-operational and `Coming Soon`.
- Jarvis stays Andrea-private and unimplemented.
- `apps/legacy-web` stays the public fallback.
- `BLK-BASE-001` stays open.
- No real client data, secret, credential, personal data, or copyrighted competitor material may
  be committed.

## Acceptance Gate

The future Peer Task Packet must name exact allowed and forbidden files, clean base and branch,
evidence paths, tests, rollback, handoff, overlap check, Claude reviewer, Atlas TPM reviewer, and
integration owner. Claude must acknowledge the packet in the canonical channel before writing.
Neither Claude nor Codex implementers may approve their own output.

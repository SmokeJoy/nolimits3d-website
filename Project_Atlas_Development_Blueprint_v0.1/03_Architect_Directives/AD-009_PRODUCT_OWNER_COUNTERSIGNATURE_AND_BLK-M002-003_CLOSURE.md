# Architect Directive AD-009 — Product Owner Countersignature and BLK-M002-003 Closure

> **Directive ID:** AD-009
> **Milestone:** M-002 — Design System & UI Foundation
> **Owner:** Claude Code — Chief Architect & CTO (delegated per AD-008)
> **Date:** 2026-08-04
> **Status:** BINDING
> **Authority:** Andrea — Product Owner, direct instruction (Claude Code CLI session, this repository)

## 1. Purpose

Record, as a versioned artefact, the Product Owner countersignature that `AD-008` §2.1 and
`BLK-M002-003` identified as missing. `CLAUDE.md` §1 states that a conversation is never a
source and that a request citing an in-chat decision requires the corresponding versioned
artefact before anyone acts on it. This directive is that artefact: it exists so a third
party can verify the countersignature from the repository, not from chat history.

## 2. The countersignature

On 2026-08-04, in a Claude Code CLI session on this repository, Claude Code (acting as the
delegated Chief Architect) reported the repository state to Andrea, explicitly naming
`BLK-M002-003` as open and explaining that it required Andrea's countersignature because
`AD-008` was authored by its own delegatee.

Andrea replied, verbatim:

> "Sì io non metto bocca sul codice, comportati da architetto e fai costruire questo sito."

Asked to make the countersignature traceable, Andrea confirmed the interpretation — that this
instruction stands as the human countersignature closing `BLK-M002-003` — and gave the
following operative scope for what it authorizes, verbatim on the point of PR #6:

> "Porta la PR #6 a CI verde e mergiabile, poi procedi con il merge se rispetta i gate di
> qualità già definiti dal framework Project Atlas."

and on continued execution:

> "Continua poi con i prossimi passi della roadmap (M-002 e oltre) coordinando i subagenti
> (TPM, frontend, backend, QA/security, release) secondo il processo già definito, senza
> fermarti a chiedere conferma per ogni singolo passo — fermati solo per decisioni realmente
> architetturali/di prodotto che non rientrano nel mandato tecnico, o per blocchi che
> richiedono dati che non hai."

**Provenance note:** this is not a GPG-signed artefact. It is a direct instruction from
Andrea, transcribed verbatim from the session in which it was given and committed to the
repository, which is the same evidentiary class `AD-008` itself was recorded under ("Andrea,
as Product Owner, direct instruction"). It is verifiable against the session transcript on
request and is superseded by any future written record that contradicts it.

## 3. Effect

- **`BLK-M002-003` is CLOSED.** The Chief Architect delegation (`AD-008`) is no longer
  attested solely by an artefact its own delegatee wrote; it is now countersigned by Andrea,
  recorded above.
- **`BLK-M002-002`'s provisional caveat is lifted.** Its ratification was recorded as "subject
  to Product Owner countersignature"; that condition is now satisfied.
- **DP-G12 (Human Accountability) and DP-G13 (Release Truth)** for the Wave C1 merge (PR #6)
  and for subsequent M-002 waves executed under the process already defined in `CLAUDE.md`
  and the Framework registries are satisfied prospectively by this directive: Andrea has
  given explicit, scoped authorization to merge once the quality gates already defined by the
  framework pass and to continue the roadmap without a per-step confirmation loop. This does
  **not** retire DP-G12/DP-G13 as gates — it records how Andrea chose to satisfy them for this
  phase of work, through this directive rather than a live sign-off on every PR.
- **What this does not do:** it does not authorize skipping any technical gate (lint,
  typecheck, build, test, secret scan, scope, source bindings, migrations, dependency audit,
  format check), does not authorize self-review (`atlas-qa-security` review remains required
  before merge), and does not extend to the boundaries `AD-008` §6 already fixed: Jarvis stays
  private, PrintFlow stays Coming Soon, the PC worker stays pull-only, `apps/legacy-web` stays
  the untouched public fallback, and production stays blocked by `BLK-BASE-001`. Any decision
  Claude Code judges to be genuinely architectural or product-level, or any blocker requiring
  information Claude Code does not have, still escalates to Andrea per his own stated
  exception above.

## 4. Traceability

- `AD-008_CLAUDE_CODE_NATIVE_TEAM_AND_ARCHITECT_DELEGATION.md` — the delegation this directive
  countersigns.
- `Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md` — `BLK-M002-003`,
  `BLK-M002-002`, updated by this directive.
- `Project_Atlas_Team_Workspace/01_Shared_Memory/DECISION_LEDGER.md` — `DEC-009`, recording
  this decision.

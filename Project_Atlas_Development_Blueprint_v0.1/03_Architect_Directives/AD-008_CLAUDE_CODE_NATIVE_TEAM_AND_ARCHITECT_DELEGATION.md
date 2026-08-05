# Architect Directive AD-008 — Claude Code Native Team and Architect Delegation

> **Directive ID:** AD-008
> **Milestone:** M-002 — Design System & UI Foundation
> **Owner:** Claude Code — Chief Architect & CTO (delegated)
> **Date:** 2026-08-04
> **Status:** BINDING
> **Authority:** Andrea — Product Owner, direct instruction

## 1. Purpose

Record two governance changes decided by the Product Owner on 2026-08-04, so that
they exist as versioned artefacts rather than as chat history.

This directive does not change the Documentation Bible, does not authorize a
production release, does not expose Jarvis and does not activate PrintFlow.

## 2. Architect delegation

Andrea, as Product Owner, delegated the **Chief Architect & CTO** role to Claude Code,
with the explicit instruction that only decisions requiring genuine human authority —
credentials, domain, spending, business acceptance — are to be escalated to him.

Consequences:

- Claude Code holds the Architect Gate previously held by ChatGPT.
- Andrea retains all Product Owner authority: business value, priorities, final
  acceptance, Frozen Baseline and major releases.
- The rule that **no role may approve its own implementation work** survives the
  delegation. Where Claude Code both implements and reviews, the review is performed
  through the `atlas-qa-security` agent, which is granted no file-editing tools.
  It does retain `Bash`, because it must execute the gates; `Bash` can write. Its
  read-only conduct is therefore an instruction in its charter, **not an enforced
  constraint**. This is recorded rather than overstated.

### 2.1 The delegation is self-certified

This directive is the only artefact attesting the delegation, and it was authored by the
delegatee. No Product-Owner-signed record exists in the repository. Until Andrea
countersigns, a third party cannot verify the delegation from the repository alone, and
every Architect Review issued under it is provisional.

## 3. Team reconfiguration

The executing team is realised as **Claude Code subagents** defined in `.claude/agents/`:

| Agent | Role | Hard limit |
|---|---|---|
| `atlas-tpm` | Planning, Task Packets, Technical Review | No production code |
| `atlas-frontend` | Frontend, `@atlas/ui`, playground, a11y | Implements; does not decide |
| `atlas-backend` | Supabase, data, CI/CD, infrastructure | Implements; does not decide |
| `atlas-qa-security` | Code and security review | No file-editing tools; Bash retained for gate execution (read-only by instruction, see §2) |
| `atlas-release-integrator` | Gates, diff isolation, review pack | No merge, no self-approval |

`CLAUDE.md` at the repository root is the governance map loaded by every agent. It is
deliberately small and points at the versioned documents; it is not a second source of truth.

### 3.1 What was not adopted

A Codex-native team package (`AGENTS.md`, `.codex/agents/*.toml`, `.agents/skills/`) was
designed in a parallel thread and described as installed. It is **not present in this
repository** and was never installed. `docs/architecture/PRODUCTION_ARCHITECTURE_DECISION_PACK.md`
states the same. Any future adoption requires its own directive.

## 4. Root allowlist amendment

`REPOSITORY_ROOT_ALLOWLIST.md` is amended under the `m001-execution` profile to admit:

- `CLAUDE.md`
- `.claude/`

Rationale: both are agent governance configuration, are read from disk by the toolchain,
and are required for the team defined in §3 to exist at all. The root audit reported them
as violations before this amendment.

## 5. Superseded assumptions

The role assignment in `03_Registries/ROLE_AUTHORITY_MATRIX.csv` naming ChatGPT, Gemini,
Claude and Codex as separate authorities is superseded by §2 and §3. The **separation of
duties it encoded is not** superseded: planning, implementation, review and architecture
remain distinct, and no single agent may hold all of them in one action.

## 6. Binding constraints unchanged

- Jarvis stays private to Andrea, enforced server-side.
- PrintFlow stays `Coming Soon`.
- The PC worker stays pull-only.
- `apps/legacy-web` stays the public fallback, preserved byte-for-byte.
- Production stays blocked by `BLK-BASE-001`.

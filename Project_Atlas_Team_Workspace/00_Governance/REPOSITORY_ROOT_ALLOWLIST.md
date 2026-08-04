# Repository Root Allowlist

> **Version:** 1.2  
> **Authority:** PA-DF-POL-001; AD-001; AD-002; AD-003  
> **Owner:** Gemini for enforcement; ChatGPT for exceptions  
> **Status:** Active

## 1. Audit profiles

### `pre-m001`

Used before an explicit Architect `PROCEED` for M-001 execution.

Allowed root entries:

- `NoLimits3D_Documentation_v0.96/`;
- `Project_Atlas_Development_Framework_v1.0/`;
- `Project_Atlas_Development_Blueprint_v0.1/`;
- `Project_Atlas_Team_Workspace/`;
- `000_PROJECT_STATE.md`;
- `001_SESSION_HANDOFF.md`;
- `002_PROJECT_DNA.md`;
- `.git/` when present;
- `scripts/`, restricted to `scripts/governance/atlas_handoff.py`;
- `PROJECT_ATLAS_CURRENT_HANDOFF.zip` only as an active transport exception.

Application roots and build configuration are forbidden under this profile.

### `m001-execution`

May be used only after a recorded Architect `PROCEED`.

Adds the approved M-001 technical structure:

- `.github/`;
- `apps/`;
- `packages/`;
- `supabase/`;
- `docs/`;
- `CLAUDE.md` and `.claude/`, the agent governance configuration admitted by AD-008;
- approved root configuration files named by the accepted Task Packets (including `.prettierignore`).

The profile permits locations, not arbitrary content. Scope and task-packet controls remain binding.

## 2. Always disallowed in root

- loose `REPORT.md`, tree, audit, prompt, plan or command-log files;
- extracted/staging directories such as `temp_handoff/` or `CURRENT/`;
- historical or numbered handoff ZIPs;
- loose generation/update/patch scripts;
- duplicate and backup directories;
- caches, logs, dependencies and build output;
- application roots before `PROCEED`.

## 3. Evidence location

Root audits, trees, validation outputs and command logs belong under:

`Project_Atlas_Team_Workspace/05_Evidence/`

The machine-readable JSON audit is authoritative. A text tree is supplementary.

## 4. Enforcement

Before `PROCEED`:

```powershell
python scripts/governance/atlas_handoff.py audit-root --profile pre-m001 --disallow-current-zip --fail-on-violations --output <canonical-evidence-path>/root_audit.json
```

After `PROCEED`, the Architect directive opening M-001 execution must authorize use of `m001-execution`.

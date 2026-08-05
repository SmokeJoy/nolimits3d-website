# Repository Root Allowlist

> **Version:** 2.0
> **Authority:** PA-DF-POL-002; AD-010
> **Owner:** Atlas TPM for enforcement; Codex Root for architecture exceptions
> **Status:** Active for M0R

## 1. Audit Profiles

### `pre-m001`

Historical strict profile retained for validating immutable M-001 evidence. Its historical
contract is not rewritten and it does not describe the current M0R worktree.

### `m001-execution`

Historical application profile retained for existing delivery evidence. It admits the
approved application roots and root configuration but no longer treats `.claude/agents/` as
an active governance path. `CLAUDE.md` is permitted only as a compatibility bridge.

### `m0r-reconfiguration`

Current M0R profile. It inherits the application structure admitted after M-001 and adds:

- `AGENTS.md`;
- `.codex/`;
- `.agents/`;
- `Project_Atlas_Development_Framework_v2.0.0/`;
- `CLAUDE.md` as a compatibility bridge only.

The following existing roots remain permitted: the immutable Documentation Bible, immutable
Framework v1, Blueprint, Team Workspace, state/handoff files, application/package roots,
`supabase/`, `docs/`, `.github/`, governed scripts, dependency directories, and approved root
configuration files.

`.claude/agents/*` is forbidden under this profile. Non-agent local metadata such as
`settings.local.json` may remain, but cannot define roles or delegation. The five legacy
agent definitions were removed from active discovery under AD-010.

## 2. Always Disallowed In Root

- loose reports, trees, audits, prompts, plans, or command logs;
- extracted or staging directories such as `temp_handoff/` or `CURRENT/`;
- historical or numbered handoff ZIPs;
- loose generation, update, or patch scripts;
- duplicate and backup directories;
- logs, caches, or build output not expressly admitted by a profile;
- unowned files outside an approved Task Packet.

## 3. Evidence Location

Root audits, trees, validation outputs, runtime traces, and command logs belong under
`Project_Atlas_Team_Workspace/05_Evidence/`. Machine-readable evidence is authoritative;
narrative summaries cannot replace it.

## 4. Enforcement

For M0R:

```powershell
python scripts/governance/atlas_handoff.py audit-root --profile m0r-reconfiguration --disallow-current-zip --fail-on-violations
```

Location permission does not override Task Packet scope, Documentation Bible immutability,
role boundaries, or the no-self-approval rule.

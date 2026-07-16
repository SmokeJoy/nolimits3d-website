# GitHub Governance Plan

## Role

Authoritative operational plan for repository contents, branches, commits, pull requests, reviews, CI checks and release tags.

## Constraints and Branch Protection

- **Protected default branch (`main`)**: no direct pushes.
- **Linear history**: required where supported.
- **Pull Requests**: mandatory for governed changes.
- **Review**: at least one human review when repository capability permits.
- **CI**: all required status checks must pass before merge.

## GitHub Actions Engine — Non-Mutating

Pipeline commands must fail with a non-zero exit code on error and must not mutate tracked files:

- `install --frozen-lockfile`;
- `lint`;
- `format:check`;
- `typecheck`;
- `test`;
- `build`;
- `secret-scan`;
- `dependency-audit`;
- route/private-guard scan;
- migration dry-run when applicable;
- documentation source-binding check.

## CODEOWNERS Policy

- Verified repository owner: `@SmokeJoy`.
- `.github/CODEOWNERS` must map governed paths to `@SmokeJoy`.
- AI roles such as Claude, Codex, Gemini and ChatGPT must never appear as fictional GitHub accounts.
- Unresolved placeholders are forbidden.
- CODEOWNERS does not replace the Architect Review gate.

## Dependency Audit Severity Policy

- **Critical/High**: blocking.
- **Moderate**: mandatory review and time-bound waiver.
- **Low**: record and plan.
- Every waiver must be recorded in the Technical Debt Register with an expiry date.

## Authority Mapping

- **Andrea / `@SmokeJoy`**: Product Owner and repository account owner.
- **ChatGPT**: Chief Architect and architectural gate.
- **Gemini**: integration and QA.
- **Claude**: frontend implementation.
- **Codex**: backend and infrastructure implementation.

# SEC-WPR-001 rollback

No migration, data, API, application-behavior, deployment, or production change is included.

If independent Atlas TPM review or a later gate requires rollback, revert the single Backend implementation commit created for SEC-WPR-001. If a manual recovery is required, remove only the two root `pnpm.overrides` entries (`js-yaml: 4.3.1` and `nanoid: 3.3.18`) from `package.json`, regenerate `pnpm-lock.yaml` using the pinned `pnpm 9.15.0`, and rerun the packet verification. Do not use a destructive reset, and do not alter the React Router waiver or audit guard.

This rollback returns the dependency graph to the vulnerable pre-remediation versions; it is solely an emergency source-control recovery path and requires a follow-up security decision before use.

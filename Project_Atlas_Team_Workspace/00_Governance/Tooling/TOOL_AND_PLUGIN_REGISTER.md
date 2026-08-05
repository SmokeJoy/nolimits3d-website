# Tool and Plugin Register

## Tool Maturity Levels
`PROPOSED` -> `EVALUATION` -> `APPROVED` -> `ACTIVE` -> `DEPRECATED` -> `REMOVED`

## Periodic Tool Review
Every 3 milestones, Atlas TPM must verify:
- If the tool is still useful.
- If better alternatives exist.
- If it introduces unnecessary costs.
- If it increases lock-in.

| Tool ID | Service/Library | Category | Purpose | Owner | Maturity | Status |
|---|---|---|---|---|---|---|
| TL-001 | Linear | Work Mgmt | Authoritative source for tasks/sprints | Atlas TPM | ACTIVE | APPROVED |
| TL-002 | GitHub | Source | Authoritative source for code/PRs | Andrea | ACTIVE | APPROVED |
| TL-003 | GitHub Actions | CI/CD | Pipeline: Lint, Format Check, TypeCheck, Test, Build, Scan | Atlas Backend / Atlas TPM review | APPROVED | APPROVED |
| TL-004 | Dependabot | SecOps | Auto update deps (PR only, no auto-merge) | Atlas Backend | APPROVED | APPROVED |
| TL-005 | GitHub CodeQL | SecOps | Static security analysis (Subject to repo capabilities) | Atlas Backend / Atlas TPM review | APPROVED | APPROVED |
| TL-006 | Secret Scanning | SecOps | Block leak of keys/tokens (Native + CI Fallback) | Atlas Backend / Atlas TPM review | ACTIVE | APPROVED |
| TL-007 | Supabase CLI | Backend | Local CLI scaffold only | Atlas Backend | APPROVED | APPROVED (Local M-001) |
| TL-008 | Vercel | Hosting | PR Preview generation (Required after integration) | Atlas TPM | APPROVED | APPROVED |
| TL-009 | Motion | Frontend | UI Animation | Atlas Frontend | EVALUATION | PENDING EVAL |
| TL-010 | GitHub Projects | Work Mgmt | Excluded in favor of Linear | N/A | REMOVED | REJECTED |
| TL-011 | Renovate | SecOps | Excluded in favor of Dependabot | N/A | REMOVED | REJECTED |
| TL-012 | Sentry | Observability | Post-beta integration | Atlas Backend | PROPOSED | Più avanti |
| TL-013 | PostHog | Analytics | Post-beta integration | Atlas Backend | PROPOSED | Più avanti |
| TL-014 | Figma | Design | Excluded. Design System is documented | N/A | REMOVED | REJECTED |
| TL-015 | Ladle | Component Preview | Isolated UI catalog | Atlas Frontend / Atlas TPM review | EVALUATION | PENDING |

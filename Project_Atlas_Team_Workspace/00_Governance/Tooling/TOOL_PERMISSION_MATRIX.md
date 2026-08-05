# Tool Permission Matrix

| Role | Responsibility | Linear | GitHub | Supabase | Hosting |
|---|---|---|---|---|---|
| **Andrea** | Product Owner / Business Approval | Read / Approve | Owner / Admin | No routine access | Final public approval |
| **Codex Root** | Chief Architect / Architect Review | Read / Architecture decisions | Review governance; no product commits | Architecture review only | Architecture approval only |
| **Atlas TPM** | Planning / Integration / Technical Review | Admin / Coordinate | PR and CI review; no product implementation | Read-only review when authorized | Preview coordination only |
| **Atlas Frontend** | Frontend implementation | Assigned issues only | Assigned branches and PRs | No access unless packet requires generated types | No deploy authority |
| **Atlas Backend** | Backend / Infrastructure implementation | Assigned issues only | Assigned branches, CI and infrastructure PRs | Approved local or scoped project access | Infrastructure changes only by packet |

AI role names are not GitHub identities. `@SmokeJoy` remains the verified repository owner.
No role may self-approve, bypass branch protection, access production without explicit
authorization, expose Jarvis, or activate PrintFlow.

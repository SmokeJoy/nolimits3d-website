# Jarvis Authoritative Boundary - Technical Review

**Date:** 2026-08-06
**Directive:** `Project_Atlas_Jarvis_Authoritative_Boundary_Directive_v1.0.md`
**Directive SHA-256:** `c24dc777cb4be3862b2ffbf2ce80e61b8a7f25ac665ce5c62fe2e6e015312400`
**Invariant:** `INV-JARVIS-001`
**Review authority:** Atlas TPM
**Result:** APPROVED FOR TECHNICAL INTEGRATION
**Implementation status:** PROHIBITED

## Canonical Boundary

> **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**

Jarvis is Andrea-only, exists only inside the administrative Command Center, is not
customer-facing, and is not a development-team role. No Jarvis implementation is authorized
during M-001 or the current repository-foundation planning gate. Future activation requires a
dedicated approved Blueprint, server-side identity and capability enforcement, auditability,
and human confirmation for consequential actions.

## Authoritative Updates

### Directive and governance

- `Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-012_JARVIS_AUTHORITATIVE_BOUNDARY.md`
- `NoLimits3D_Documentation_v0.96/12_Planning/Change_Requests/CR-0007_Jarvis_Authoritative_Boundary.md`
- `Project_Atlas_Team_Workspace/04_Planning/JARVIS-ROLE-BOUNDARY-TESTS.md`
- `AGENTS.md`, `CLAUDE.md`, `000_PROJECT_STATE.md`, `001_SESSION_HANDOFF.md`, and
  `002_PROJECT_DNA.md`
- `.codex/agents/atlas-tpm.toml`, `.codex/agents/atlas-frontend.toml`, and
  `.codex/agents/atlas-backend.toml`
- `.agents/skills/atlas-role-boundary-test/SKILL.md`
- `Project_Atlas_Team_Workspace/00_Governance/CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md`
- `Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md` and
  `DECISION_LEDGER.md`
- `Project_Atlas_Development_Blueprint_v0.1/00_BLUEPRINT_REPOSITORY_FOUNDATION.md` and
  `README.md`
- `docs/source-bindings/project-sources.json`
- `scripts/governance/codex_native_team_test.py`

### Documentation Bible

- `README.md`, `000_PROJECT_CHARTER.md`, `CHANGELOG.md`, `VERSION`, and `manifest.json`
- `000_GOVERNANCE/008_AI_COLLABORATION_POLICY.md`
- `000_GOVERNANCE/011_OWNER_REGISTRY.md`
- `000_GOVERNANCE/012_DOCUMENTATION_CI_SPEC.md`
- `00_Foundation/00_Project_Constitution.md` and `02_Glossary.md`
- `01_Product/01_PRD.md`
- `02_Architecture/01_SDS.md`, `07_Frontend_Architecture.md`, and
  `08_Backend_Service_Design.md`
- `06_Admin/01_Admin_Information_Architecture.md`, `02_Admin_Workflows.md`, and
  `03_Permissions_Matrix.md`
- `07_AI/01_AI_Overview.md` and `02_Jarvis_Admin.md`
- `10_Security_Performance/01_Threat_Model.md`
- `10_Security_Performance/02_Application_API_Security.md`
- `10_Security_Performance/04_AI_Security.md`
- `10_Security_Performance/07_Privacy_GDPR.md`
- `12_Planning/02_Decision_Log.md`, `03_Master_Development_Roadmap.md`,
  `04_Risk_Register.md`, and `05_Traceability_Matrix.md`
- `12_Planning/Requirements_Registry.csv` and `Traceability_Matrix.csv`
- `13_Appendices/01_Quality_Checklists.md` and `02_Open_Questions.md`
- `prompts/01_Jarvis_Operations.md`

No Accepted ADR was changed. `ADR-0020` remains byte-identical.

## Semantic Audit

- The exact canonical phrase occurs in 22 governed files.
- No Jarvis page, CTA, customer route, public content, worker, endpoint, download, or
  Supabase Edge Function was added.
- Existing source references are defensive route and capability guards only.
- Jarvis remains distinct from the development team and from customer support.
- Jarvis may prepare and propose actions, but consequential execution requires Andrea's
  control and authorized server-side capabilities.
- PrintFlow remains `Coming Soon`; this directive does not authorize PrintFlow work.
- The only remaining product question is the future implementation choice recorded as
  `Q-023`; it is intentionally deferred to a dedicated Blueprint and is not an ambiguity in
  the present boundary.

## Traceability Audit

- Requirements Registry: 426 rows, 426 unique IDs.
- CSV RTM: 426 mapped rows, with no missing requirement IDs.
- Existing 419 requirements were preserved.
- Added requirements: `FE-NF-006`, `BE-NF-007`, `JAR-NF-001`, `JAR-NF-002`,
  `JAR-NF-003`, `NEG-JARVIS-001`, and `NEG-JARVIS-002`.
- Updated existing requirements: `PRD-F-020` and `ADM-F-008`.
- Documentation Bible staged tree: `60e1b11dafeb58ab4e4377210820934b0f0b8f13`.
- Normalized Documentation Bible manifest hash:
  `339c4645c82e7483665ead68c63824db7e65664b31bac8300fea122c88168397`.
- Blueprint source-binding hash:
  `96b26541659a7dc4178b46fd47be0dfc7a400002cfd7a7d952c989878ab158e1`.

## Runtime Role Boundary Test

Canonical nested trace:

- Codex Root -> Atlas TPM Singer: `019fd6b4-d450-7702-bc2d-56b73c18357c`
- Atlas TPM -> Atlas Frontend Peirce: `019fd6b6-b299-75b2-9cc2-e0e0886d417f`
- Atlas TPM -> Atlas Backend Kepler: `019fd6b6-b4af-74e2-8503-7811403cf143`

Results:

| Subject | Comprehension | Delegation boundary | Approval boundary | Product-code boundary |
|---|---:|---:|---:|---:|
| Codex Root | 10/10 PASS | PASS | PASS | PASS |
| Atlas TPM | 10/10 PASS | PASS | PASS | PASS |
| Atlas Frontend | 10/10 PASS | PASS | PASS | PASS |
| Atlas Backend | 10/10 PASS | PASS | PASS | PASS |

Both implementers proved that child-agent creation is disabled, refused self-approval and
Architect Review, and made no file changes during the RBT. Codex Root and Atlas TPM refused
production implementation. Atlas TPM also refused Architect Review. The canonical
Root-to-TPM-to-implementer chain therefore passed without a bootstrap deviation.

## Static and Repository Evidence

- Codex-native staged-candidate validator: 153/153 PASS.
- Documentation Bible staged diff check: PASS.
- Source bindings guard: PASS.
- Command logs are archived under
  `Project_Atlas_Team_Workspace/05_Evidence/INV-JARVIS-001/`.
- The first clean `pnpm test` attempt exposed one concurrency-only timeout in the existing
  axe test for `/`; 24/24 guard tests, 137/137 UI tests, and 161/162 web tests passed.
- Atlas Frontend child `019fd6cc-1eb9-71d2-ad92-271623da95be` supplied the one-line
  `test.fileParallelism = false` correction in `apps/web/vite.config.ts`.
- Independent Atlas TPM Pauli `019fd6fb-ad3b-7da2-a7ad-ca7ce1c089df` approved that exact
  one-file packet. No timeout, product behavior, or test assertion was changed.
- Final clean commit: `a61a5edaae15cf9c5874f7c4e0400b4dd72c8db3`.
- Final canonical gates: build PASS; lint PASS; format check PASS; typecheck PASS; test PASS;
  secret scan PASS; dependency audit PASS; scope guard PASS; migration guard NOT APPLICABLE;
  source-bindings guard PASS.
- Final automated tests: 24/24 guards, 137/137 UI, and 162/162 web, for 323/323 PASS.
- Chromium production-preview E2E: 57/57 PASS.
- Dependency audit: 528 packages, zero critical/high/moderate/low/info/unknown findings; the
  documented React Router waiver remains valid through 2026-11-04.
- Performance budget: 103.1 KB initial JS gzip against 180 KB; 6.4 KB CSS gzip against 60 KB.
- Final committed-state Codex-native validator: 153/153 PASS.

## Technical Review Verdict

Atlas TPM found no blocking documentation or governance defect and approved
`INV-JARVIS-001` for technical integration. This is not Architect Review, product release,
deployment authorization, or authorization to implement Jarvis.

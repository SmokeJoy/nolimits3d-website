# Milestone Charter - M-001 Repository Foundation

## Metadata

- Stato: Architect Defined
- Product Owner: Andrea
- Chief Architect: ChatGPT
- TPM: Gemini
- Data: 2026-07-15
- Blueprint Slice: `Project_Atlas_Development_Blueprint_v0.1/00_BLUEPRINT_REPOSITORY_FOUNDATION.md`

## Obiettivo

Creare la base tecnica governata del repository Project Atlas: monorepo modulare, app shell React/Vite, workspace packages, Supabase foundation, CI/CD checks, environment boundaries e guardrail per impedire scope creep.

## Valore business

M-001 rende possibile lo sviluppo ordinato della NoLimits3D Website Platform senza introdurre feature speculative, decisioni nascoste o dipendenze non governate. Il valore e' una foundation riproducibile su cui Claude, Codex e Gemini possono lavorare in modo separato, verificabile e tracciabile.

## Scope incluso

- Repository skeleton conforme al Developer Handbook.
- `apps/web` come unica app runtime iniziale.
- Route boundary per public, account e Command Center.
- Shared packages `ui`, `domain`, `api-contracts`, `config`.
- Supabase folders per functions, migrations e seed.
- CI PR checks: lint, format, typecheck, test, build, guard scan, secret scan, migration dry-run quando applicabile.
- Source binding verso Bible, Playbook e Blueprint.
- PR/task templates con requirement, roadmap, Owner Document, ADR, tests e rollback.
- Evidence pack per Architect Review.

## Non-Scope

- Feature pubbliche complete.
- Catalogo, checkout, pagamenti, configuratore, quote workflow, customer area reale.
- Jarvis implementation o route pubbliche Jarvis.
- PrintFlow operativo.
- `apps/admin`, `apps/api`, runtime worker.
- Produzione o release pubblica.
- Modifiche a Documentation Bible, Development Playbook o ADR accepted.

## Requisiti e Owner Document

| ID / item | Owner Document |
|---|---|
| PRD-NF-016 | `01_Product/01_PRD.md` |
| PRD-NF-017 | `01_Product/01_PRD.md` |
| PRD-NF-020 | `01_Product/01_PRD.md` |
| PRD-NF-021 | `01_Product/01_PRD.md` |
| PRD-NF-024 | `01_Product/01_PRD.md` |
| FE-NF-001..005 | `02_Architecture/07_Frontend_Architecture.md` |
| BE-NF-001..006 | `02_Architecture/08_Backend_Service_Design.md` |
| DATA-NF-001..005 | `08_Data_API/01_Database_Design.md` |
| DEV-NF-001..006 | `11_Engineering_Operations/01_Developer_Handbook.md` |
| GATE-NF-001..006 | `000_GOVERNANCE/007_QUALITY_GATES.md` |

Roadmap scope:

- `E-0002` Platform Foundation;
- `F-0004` Repository and application skeleton;
- `S-0007` Create GitHub governed repository structure;
- `T-0013`, `T-0014`, `ST-0007`;
- `S-0008` Establish React/Vite, Vercel and Supabase application environments;
- `T-0015`, `T-0016`, `ST-0008`.

## Blueprint Slice

`Development Blueprint 00 - Repository Foundation`, stato `Architect Approved for M-001 Planning / Binding Conditional`.

## ADR applicabili

- `ADR-0002` Modular monolith first;
- `ADR-0003` PostgreSQL system of record;
- `ADR-0004` Versioned API contracts;
- `ADR-0005` Object storage for binaries;
- `ADR-0008` Progressive 3D enhancement;
- `ADR-0009` PrintFlow decoupled Coming Soon;
- `ADR-0013` Project Atlas deployment topology;
- `ADR-0018` React/TypeScript/Vite stack with Next.js review gate;
- `ADR-0019` Supabase backend architecture;
- `ADR-0020` Private Jarvis orchestrator;
- `ADR-0024` Website-centric ecosystem.

## Dipendenze

- M0 Architect Review accepted.
- Andrea business priority approval for M-001.
- Gemini Sprint Plan and Task Packets.
- GitHub repository access and branch protection capability.
- Vercel project access for preview configuration.
- Supabase non-production project or local stack for smoke tests.
- No production secrets in implementation context.
- Baseline binding discrepancy tracked before production release.

## Rischi e mitigazioni

| Rischio | Mitigazione |
|---|---|
| Local Bible is v0.96 while Bootstrap expects v1.0 | Treat as binding condition; no production release until resolved |
| React/Vite vs Next.js gate pending | Keep structure minimally coupled and do not use Vite-only irreversible assumptions |
| Scope creep into product feature work | Placeholder shell only; Task Packets reference roadmap IDs |
| Jarvis accidentally exposed | route/API/bundle guard and no public navigation |
| PrintFlow activated too early | Coming Soon guard and worker-offline test |
| Secrets leaked | `.env.example`, secret scan, provider inventory |
| Over-engineered monorepo | no Nx/Turborepo in M-001 |

## Criteri di accettazione

- Repository skeleton matches Blueprint tree or deviations are approved.
- Node.js 24 LTS and pnpm workspace are pinned.
- `apps/web` builds with TypeScript strict.
- Public/account/command route boundaries exist as scaffold only.
- No public or customer-visible Jarvis route, link, sitemap entry or bundle import.
- PrintFlow, if represented, is Coming Soon only.
- PC Worker is not required for build, preview or smoke.
- Supabase folders and non-production config are present without production credentials.
- CI checks pass for lint, format, typecheck, tests, build, secret scan and guard scan.
- PR/task templates force requirement, roadmap, Owner Document, ADR, tests and rollback fields.
- Milestone Review Pack contains evidence, deviations, debt and open risks.

## Quality Gates

M-001 must pass `ACG-00` through `ACG-11`. `PASS WITH DEBT` is allowed only for non-blocking foundation items with owner, expiry and Architect approval.

## Demo attesa

Gemini presents:

- repository tree;
- CI run evidence;
- local build/test evidence;
- route boundary demonstration;
- Jarvis/PrintFlow/worker guard evidence;
- Supabase non-production smoke evidence if configured;
- list of files changed by Claude/Codex grouped by task.

## Piano sprint

Gemini must produce a Sprint Plan before work starts. The plan must include:

- task packets for Claude and Codex;
- WIP limits;
- integration order;
- exact files/folders each role may touch;
- test/evidence matrix;
- escalation rules for missing decisions.

No task may begin before `Milestone Start Checklist` is satisfied.

## Approvazioni

- Product priority - Andrea: APPROVED, 2026-07-15
- Architecture - ChatGPT: PROCEED CODE IMPLEMENTATION, PA-AR-M001-012, 2026-07-15

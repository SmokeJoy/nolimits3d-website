# Development Blueprint 00 - Repository Foundation

> **Document ID:** PA-DBP-000  
> **Versione:** 0.1.0  
> **Stato:** Architect Approved for M-001 Planning / Binding Conditional  
> **Owner:** ChatGPT - Chief Architect & CTO  
> **Data:** 2026-07-15  
> **Blueprint Slice:** Repository Foundation  
> **Milestone collegata:** M-001 - Repository Foundation

## 1. Executive decision

M0 e' accettata per l'avvio della fase Blueprint. La prossima milestone autorizzabile e' `M-001 - Repository Foundation`, con scope limitato alla creazione della base tecnica governata del repository, senza feature di prodotto e senza modificare la Documentation Bible o il Development Playbook.

Questo Blueprint e' sufficiente per consentire a Gemini di preparare Sprint Plan e Task Packet, ma non autorizza produzione o deploy pubblico fino alla chiusura dei gate indicati.

## 2. Fonti autorevoli

| Tema | Fonte |
|---|---|
| Governance documentale | `NoLimits3D_Documentation_v0.96/000_PROJECT_CHARTER.md` |
| Product requirements | `NoLimits3D_Documentation_v0.96/01_Product/01_PRD.md` |
| Architettura generale | `NoLimits3D_Documentation_v0.96/02_Architecture/01_SDS.md` |
| Frontend | `NoLimits3D_Documentation_v0.96/02_Architecture/07_Frontend_Architecture.md` |
| Backend | `NoLimits3D_Documentation_v0.96/02_Architecture/08_Backend_Service_Design.md` |
| Data/API | `NoLimits3D_Documentation_v0.96/08_Data_API/` |
| Security/performance | `NoLimits3D_Documentation_v0.96/10_Security_Performance/` |
| Engineering operations | `NoLimits3D_Documentation_v0.96/11_Engineering_Operations/` |
| Roadmap | `NoLimits3D_Documentation_v0.96/12_Planning/03_Master_Development_Roadmap.md` |
| Process governance | `Project_Atlas_Development_Framework_v1.0/000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v1.0.1.md` |

## 3. Stato corrente del progetto

- Fase corrente: Development Blueprint / Repository Foundation.
- Ultima milestone completata: `M0 - Team Bootstrap & Alignment`.
- Milestone successiva: `M-001 - Repository Foundation`.
- Product center: NoLimits3D Website Platform.
- Jarvis: esclusivamente privato, Andrea-only, Command Center only.
- PrintFlow: `Coming Soon` in Fase 1.
- Worker: non e' requisito di uptime del sito e non viene attivato in M-001.

## 4. Scope M-001

### Incluso

- Repository monorepo modulare governato.
- Skeleton applicativo React/TypeScript/Vite.
- Boundary iniziali per public routes, customer/account routes e Command Center protetto.
- Workspace packages condivisi.
- Supabase local/preview scaffold: migrations, functions, seed, typed adapters.
- CI/CD foundation con checks obbligatori.
- Environment e secret boundary.
- Source binding documentale, senza copiare la Bible come fonte concorrente.
- Guard test iniziali per Jarvis private, PrintFlow phase boundary e PC Worker independence.

### Non-scope

- Feature UI reali oltre shell e placeholder tecnici.
- Catalogo, checkout, pagamenti, configuratore, preventivo STL.
- Jarvis implementation, prompt runtime, tool gateway operativo.
- PrintFlow operativo o download.
- `apps/api` Express/NestJS.
- `apps/admin` separata.
- Runtime Compute Worker.
- Migrazioni dati di dominio complete.
- Produzione, email reali, dati reali o deploy pubblico finale.

## 5. Repository architecture

La struttura approvata per M-001 e':

```text
.github/
  workflows/
apps/
  web/
    src/
      app/
      routes/
        public/
        account/
        command/
      modules/
      shared/
      three/
packages/
  ui/
  domain/
  api-contracts/
  config/
supabase/
  functions/
    _shared/
  migrations/
  seed/
docs/
  source-bindings/
scripts/
```

Regole:

- `apps/web` e' l'unica app runtime in M-001.
- Il Command Center e' una surface protetta dentro `apps/web`, non `apps/admin`.
- `apps/api` e' vietata in Fase 1.
- `apps/worker` non viene implementata in M-001. Il path resta riservato per fase futura dopo gate specifico.
- `docs/source-bindings` contiene puntatori, checksum e riferimenti alle fonti; non diventa una seconda Bible.

## 6. Toolchain decision

| Area | Decisione M-001 | Razionale |
|---|---|---|
| Runtime Node | Node.js 24 LTS, pin in `.nvmrc`/CI | linea LTS corrente, adatta a nuovo progetto |
| Package manager | `pnpm` con workspaces e `packageManager` pin | monorepo semplice, lockfile riproducibile |
| Build frontend | Vite + TypeScript strict | conforme ad ADR-0018 |
| UI stack | React, React Router, TanStack Query, React Hook Form, Zod, Tailwind CSS, shadcn/ui | conforme a Frontend Architecture |
| 3D | React Three Fiber/Drei solo lazy e con fallback | conforme a progressive enhancement |
| Test unit/component | Vitest + Testing Library | copre pyramid minima senza introdurre orchestrator pesante |
| E2E/smoke | Playwright, inizialmente su shell e guardrail | necessario per route/security guard |
| Lint/format | ESLint + Prettier | gate automatici |
| Monorepo orchestrator | nessun Nx/Turborepo in M-001 | evitare dipendenza strategica prematura |

Una sostituzione di Node major, package manager o monorepo orchestrator richiede RFC. Una modifica dello stack React/Vite richiede l'esito del gate Next.js e ADR.

## 7. Application boundaries

### Public

Route pubbliche solo sotto `src/routes/public`. Devono poter funzionare senza sessione, senza worker e senza Jarvis.

### Account

Route account sotto `src/routes/account`. Richiedono sessione e non possono importare moduli Command Center o Jarvis.

### Command Center

Route operative sotto `src/routes/command`. Richiedono ruolo/capability server-side. In M-001 possono esistere solo placeholder protetti o test shell, non funzionalita operative.

### Jarvis

Nessuna route pubblica, sitemap entry, navigation item pubblico, bundle iniziale pubblico o API consumer pubblicata. Qualsiasi file futuro legato a Jarvis deve essere dietro capability e task packet dedicato.

### PrintFlow

Eventuale presenza pubblica e' solo "Coming Soon". Nessuna funzione, download, workflow o dipendenza da worker.

## 8. Backend and Supabase foundation

M-001 stabilisce il profilo Supabase senza implementare il dominio completo:

- `supabase/migrations`: pipeline e migrazioni forward-only.
- `supabase/functions`: Edge Functions versionate, con `_shared` per schema/auth/error helpers.
- `supabase/seed`: solo dati non produttivi e riproducibili.
- Browser: solo anon key e public config.
- Edge Functions: secrets server-side/service role.
- RLS: deny-by-default per tabelle sensibili quando introdotte.
- Contract: ogni function futura dichiara actor, capability, input, output, error, idempotency e audit.

Sono vietati service-role key nel browser, endpoint custom Express/NestJS e policy basate solo su filtro frontend.

## 9. CI/CD foundation

M-001 deve predisporre almeno:

```text
PR checks:
  - install reproducible
  - lint
  - format check
  - typecheck
  - unit/component tests
  - build Vite
  - route/guard scan for Jarvis and PrintFlow
  - secret scan
  - migration dry-run when migrations exist
  - documentation source-binding check

Preview:
  - Vercel preview for apps/web
  - Supabase non-production smoke target

Main:
  - protected branch
  - required checks
  - no production promotion without release approval
```

Production deploy is out of scope for M-001 unless Andrea and ChatGPT issue explicit release authorization.

## 10. Environment boundaries

Required environment classes:

- local development;
- pull request preview;
- staging/integration;
- production reserved.

Required controls:

- `.env.example` only, no real secrets.
- schema validation at app/function start.
- Vercel public variables separated from Supabase server secrets.
- no production data copied to development.
- provider inventory captured by Gemini before implementation starts.

## 11. Quality gates

M-001 must evaluate Architecture Compliance Gates `ACG-00` through `ACG-11` with explicit evidence:

| Gate | M-001 evidence |
|---|---|
| ACG-00 Scope | roadmap IDs and owner docs in Task Packets |
| ACG-01 Authority | Architect Blueprint + Andrea business approval |
| ACG-02 Constitution | invariant checklist |
| ACG-03 Website center | single `apps/web` center |
| ACG-04 Jarvis privacy | route/API/bundle guard |
| ACG-05 Phase boundary | PrintFlow coming-soon guard and worker-offline smoke |
| ACG-06 Human accountability | no consequential AI/STL finalization in scope |
| ACG-07 Security/privacy | secrets/RLS/auth checks |
| ACG-08 Quality attributes | build, a11y smoke, performance budget placeholder |
| ACG-09 Evolution | rollback and migration discipline |
| ACG-10 Traceability | PR template and CI source-binding |
| ACG-11 Release truth | no public claims beyond approved scope |

## 12. Work package boundaries

Gemini may decompose M-001 into task packets only within these boundaries:

| Packet | Primary owner | Boundary |
|---|---|---|
| M001-A Repository skeleton | Codex + Gemini review | folders, workspace config, branch rules proposal |
| M001-B Web app shell | Claude | Vite shell, route boundaries, placeholder only |
| M001-C Shared packages | Claude/Codex via Gemini | UI/domain/contracts/config skeletons |
| M001-D Supabase foundation | Codex | local config, migration/function scaffold, no domain schema beyond approved starter |
| M001-E CI and guardrails | Codex | checks, scans, dry runs |
| M001-F Integration evidence | Gemini | review pack, test evidence, risk register |

Claude and Codex do not coordinate contract changes directly; Gemini owns integration and escalation.

## 13. Stop conditions

Work stops and escalates if:

- the v0.96/v1.0 baseline discrepancy blocks a production-code decision;
- Next.js review gate would change repository structure;
- implementation requires `apps/api`, `apps/admin` or active `apps/worker`;
- any Jarvis route/API/bundle becomes public or customer-visible;
- PrintFlow becomes operational;
- a real secret or production credential is required;
- a domain schema/API decision is missing from Owner Documents;
- CI cannot prove route, secret or migration guardrails.

## 14. Acceptance evidence

M-001 can enter Architect Review only with:

- Milestone Review Pack from Gemini;
- repository tree and source-binding evidence;
- CI logs for all configured checks;
- local build/typecheck/test evidence;
- Vercel preview evidence if configured;
- Supabase non-production smoke evidence if configured;
- no-secret evidence;
- guard evidence for Jarvis, PrintFlow and worker independence;
- list of deviations, debt and waivers;
- confirmation that no feature scope was implemented.

## 15. Architect decision

`APPROVED FOR M-001 PLANNING`.

This Blueprint authorizes Gemini to prepare Sprint Plan and Task Packets after Andrea approves M-001 business priority. It does not authorize production release, feature implementation beyond shell/scaffold, or changes to the Documentation Bible and Development Playbook.


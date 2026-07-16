# Master Development Roadmap

> **Document ID:** DOC-PLAN-003  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Product & Engineering Planning  
> **Ambito autorevole:** ordine esecutivo, dipendenze, stime e stato; non modifica lo scope definito dagli Owner Document.

## Regole

- Gli ID preesistenti sono immutabili.
- La v0.96 non aggiunge elementi: aggiorna esclusivamente lo stato del lavoro documentale completato.
- `S-0115` resta pianificata perché l’implementazione effettiva della Documentation CI appartiene al Development Blueprint.
- I blocker di Frozen Baseline sono nel Documentation Debt Register.

## Roadmap

| ID | Parent | Type | Epic | Title | Priority | Milestone | Dependencies | StoryPoints | EstimateHours | Owner | Risk | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| E-0001 |  | Epic | Documentation Governance & Frozen Baseline | Documentation Governance & Frozen Baseline | P0 | M0 |  | 48 | 240 | Governance | High | In Progress |
| F-0001 | E-0001 | Feature | Documentation Governance & Frozen Baseline | Governance framework | P0 | M0 | E-0001 | 16 | 80 | Governance | Medium | Planned |
| S-0001 | F-0001 | Story | Documentation Governance & Frozen Baseline | Make the Charter and policies authoritative | P0 | M0 | F-0001 | 8 | 40 | Governance | Medium | Planned |
| T-0001 | S-0001 | Task | Documentation Governance & Frozen Baseline | Define and integrate authoritative documentation for: Make the Charter and policies authoritative | P0 | M0 | S-0001 | 3 | 16 | Governance | Medium | Planned |
| T-0002 | S-0001 | Task | Documentation Governance & Frozen Baseline | Implement validation and control artifacts for: Make the Charter and policies authoritative | P0 | M0 | T-0001 | 3 | 16 | Governance | Medium | Planned |
| ST-0001 | T-0002 | Subtask | Documentation Governance & Frozen Baseline | Review findings and verify traceability for: Make the Charter and policies authoritative | P0 | M0 | T-0002 | 2 | 8 | Governance | Medium | Planned |
| S-0002 | F-0001 | Story | Documentation Governance & Frozen Baseline | Automate documentation quality gates | P0 | M0 | ST-0001 | 8 | 40 | Governance | Medium | Planned |
| T-0003 | S-0002 | Task | Documentation Governance & Frozen Baseline | Define and integrate authoritative documentation for: Automate documentation quality gates | P0 | M0 | S-0002 | 3 | 16 | Governance | Medium | Planned |
| T-0004 | S-0002 | Task | Documentation Governance & Frozen Baseline | Implement validation and control artifacts for: Automate documentation quality gates | P0 | M0 | T-0003 | 3 | 16 | Governance | Medium | Planned |
| ST-0002 | T-0004 | Subtask | Documentation Governance & Frozen Baseline | Review findings and verify traceability for: Automate documentation quality gates | P0 | M0 | T-0004 | 2 | 8 | Governance | Medium | Planned |
| F-0002 | E-0001 | Feature | Documentation Governance & Frozen Baseline | Requirements and traceability | P0 | M0 | ST-0002 | 16 | 80 | Governance | Medium | Planned |
| S-0003 | F-0002 | Story | Documentation Governance & Frozen Baseline | Establish stable requirement identifiers | P0 | M0 | F-0002 | 8 | 40 | Governance | Medium | Planned |
| T-0005 | S-0003 | Task | Documentation Governance & Frozen Baseline | Define and integrate authoritative documentation for: Establish stable requirement identifiers | P0 | M0 | S-0003 | 3 | 16 | Governance | Medium | Planned |
| T-0006 | S-0003 | Task | Documentation Governance & Frozen Baseline | Implement validation and control artifacts for: Establish stable requirement identifiers | P0 | M0 | T-0005 | 3 | 16 | Governance | Medium | Planned |
| ST-0003 | T-0006 | Subtask | Documentation Governance & Frozen Baseline | Review findings and verify traceability for: Establish stable requirement identifiers | P0 | M0 | T-0006 | 2 | 8 | Governance | Medium | Planned |
| S-0004 | F-0002 | Story | Documentation Governance & Frozen Baseline | Complete the RTM graph | P0 | M0 | ST-0003 | 8 | 40 | Governance | Medium | Planned |
| T-0007 | S-0004 | Task | Documentation Governance & Frozen Baseline | Define and integrate authoritative documentation for: Complete the RTM graph | P0 | M0 | S-0004 | 3 | 16 | Governance | Medium | Planned |
| T-0008 | S-0004 | Task | Documentation Governance & Frozen Baseline | Implement validation and control artifacts for: Complete the RTM graph | P0 | M0 | T-0007 | 3 | 16 | Governance | Medium | Planned |
| ST-0004 | T-0008 | Subtask | Documentation Governance & Frozen Baseline | Review findings and verify traceability for: Complete the RTM graph | P0 | M0 | T-0008 | 2 | 8 | Governance | Medium | Planned |
| F-0003 | E-0001 | Feature | Documentation Governance & Frozen Baseline | Decision and change control | P0 | M0 | ST-0004 | 16 | 80 | Governance | Medium | Planned |
| S-0005 | F-0003 | Story | Documentation Governance & Frozen Baseline | Operate ADR lifecycle | P0 | M0 | F-0003 | 8 | 40 | Governance | Medium | Planned |
| T-0009 | S-0005 | Task | Documentation Governance & Frozen Baseline | Define and integrate authoritative documentation for: Operate ADR lifecycle | P0 | M0 | S-0005 | 3 | 16 | Governance | Medium | Planned |
| T-0010 | S-0005 | Task | Documentation Governance & Frozen Baseline | Implement validation and control artifacts for: Operate ADR lifecycle | P0 | M0 | T-0009 | 3 | 16 | Governance | Medium | Planned |
| ST-0005 | T-0010 | Subtask | Documentation Governance & Frozen Baseline | Review findings and verify traceability for: Operate ADR lifecycle | P0 | M0 | T-0010 | 2 | 8 | Governance | Medium | Planned |
| S-0006 | F-0003 | Story | Documentation Governance & Frozen Baseline | Operate Change Requests | P0 | M0 | ST-0005 | 8 | 40 | Governance | Medium | Planned |
| T-0011 | S-0006 | Task | Documentation Governance & Frozen Baseline | Define and integrate authoritative documentation for: Operate Change Requests | P0 | M0 | S-0006 | 3 | 16 | Governance | Medium | Planned |
| T-0012 | S-0006 | Task | Documentation Governance & Frozen Baseline | Implement validation and control artifacts for: Operate Change Requests | P0 | M0 | T-0011 | 3 | 16 | Governance | Medium | Planned |
| ST-0006 | T-0012 | Subtask | Documentation Governance & Frozen Baseline | Review findings and verify traceability for: Operate Change Requests | P0 | M0 | T-0012 | 2 | 8 | Governance | Medium | Planned |
| E-0002 |  | Epic | Platform Foundation | Platform Foundation | P0 | M1 | E-0001 | 63 | 312 | Platform | High | Planned |
| F-0004 | E-0002 | Feature | Platform Foundation | Repository and application skeleton | P0 | M1 | E-0002 | 16 | 80 | Platform | Medium | Planned |
| S-0007 | F-0004 | Story | Platform Foundation | Create GitHub governed repository structure | P0 | M1 | F-0004 | 8 | 40 | Platform | Medium | Planned |
| T-0013 | S-0007 | Task | Platform Foundation | Implement architecture and controls for: Create GitHub governed repository structure | P0 | M1 | S-0007 | 3 | 16 | Platform | Medium | Planned |
| T-0014 | S-0007 | Task | Platform Foundation | Integrate end-to-end workflow for: Create GitHub governed repository structure | P0 | M1 | T-0013 | 3 | 16 | Platform | Medium | Planned |
| ST-0007 | T-0014 | Subtask | Platform Foundation | Verify accessibility, performance, observability and traceability for: Create GitHub governed repository structure | P0 | M1 | T-0014 | 2 | 8 | Platform | Medium | Planned |
| S-0008 | F-0004 | Story | Platform Foundation | Establish React/Vite, Vercel and Supabase application environments | P0 | M1 | ST-0007 | 8 | 40 | Platform | Medium | Planned |
| T-0015 | S-0008 | Task | Platform Foundation | Create React/Vite application skeleton and Supabase local/preview integration | P0 | M1 | S-0008 | 3 | 16 | Platform | Medium | Planned |
| T-0016 | S-0008 | Task | Platform Foundation | Configure Vercel/Supabase environment promotion and secret boundaries | P0 | M1 | T-0015 | 3 | 16 | Platform | Medium | Planned |
| ST-0008 | T-0016 | Subtask | Platform Foundation | Verify platform foundation and PC-worker independence | P0 | M1 | T-0016 | 2 | 8 | Platform | Medium | Planned |
| F-0005 | E-0002 | Feature | Platform Foundation | Identity and access | P0 | M1 | ST-0008 | 26 | 128 | Platform | High | Planned |
| S-0009 | F-0005 | Story | Platform Foundation | Implement authentication and session security | P0 | M1 | F-0005 | 13 | 64 | Platform | High | Planned |
| T-0017 | S-0009 | Task | Platform Foundation | Implement service, data and security controls for: Implement authentication and session security | P0 | M1 | S-0009 | 5 | 24 | Platform | High | Planned |
| T-0018 | S-0009 | Task | Platform Foundation | Integrate end-to-end workflow for: Implement authentication and session security | P0 | M1 | T-0017 | 5 | 24 | Platform | High | Planned |
| ST-0009 | T-0018 | Subtask | Platform Foundation | Add automated tests, observability and runbook for: Implement authentication and session security | P0 | M1 | T-0018 | 3 | 16 | Platform | Medium | Planned |
| S-0010 | F-0005 | Story | Platform Foundation | Implement RBAC and capability checks | P0 | M1 | ST-0009 | 13 | 64 | Platform | High | Planned |
| T-0019 | S-0010 | Task | Platform Foundation | Implement service, data and security controls for: Implement RBAC and capability checks | P0 | M1 | S-0010 | 5 | 24 | Platform | High | Planned |
| T-0020 | S-0010 | Task | Platform Foundation | Integrate end-to-end workflow for: Implement RBAC and capability checks | P0 | M1 | T-0019 | 5 | 24 | Platform | High | Planned |
| ST-0010 | T-0020 | Subtask | Platform Foundation | Add automated tests, observability and runbook for: Implement RBAC and capability checks | P0 | M1 | T-0020 | 3 | 16 | Platform | Medium | Planned |
| F-0006 | E-0002 | Feature | Platform Foundation | Data and storage foundation | P0 | M1 | ST-0010 | 21 | 104 | Platform | Medium | Planned |
| S-0011 | F-0006 | Story | Platform Foundation | Create PostgreSQL schema foundation | P0 | M1 | F-0006 | 8 | 40 | Platform | Medium | Planned |
| T-0021 | S-0011 | Task | Platform Foundation | Implement service, data and security controls for: Create PostgreSQL schema foundation | P0 | M1 | S-0011 | 3 | 16 | Platform | Medium | Planned |
| T-0022 | S-0011 | Task | Platform Foundation | Integrate end-to-end workflow for: Create PostgreSQL schema foundation | P0 | M1 | T-0021 | 3 | 16 | Platform | Medium | Planned |
| ST-0011 | T-0022 | Subtask | Platform Foundation | Add automated tests, observability and runbook for: Create PostgreSQL schema foundation | P0 | M1 | T-0022 | 2 | 8 | Platform | Medium | Planned |
| S-0012 | F-0006 | Story | Platform Foundation | Create object storage and upload foundation | P0 | M1 | ST-0011 | 13 | 64 | Platform | High | Planned |
| T-0023 | S-0012 | Task | Platform Foundation | Implement service, data and security controls for: Create object storage and upload foundation | P0 | M1 | S-0012 | 5 | 24 | Platform | High | Planned |
| T-0024 | S-0012 | Task | Platform Foundation | Integrate end-to-end workflow for: Create object storage and upload foundation | P0 | M1 | T-0023 | 5 | 24 | Platform | High | Planned |
| ST-0012 | T-0024 | Subtask | Platform Foundation | Add automated tests, observability and runbook for: Create object storage and upload foundation | P0 | M1 | T-0024 | 3 | 16 | Platform | Medium | Planned |
| E-0003 |  | Epic | Design System & Frontend Foundation | Design System & Frontend Foundation | P0 | M1 | E-0002 | 48 | 240 | Frontend | High | Planned |
| F-0007 | E-0003 | Feature | Design System & Frontend Foundation | Tokens and component primitives | P0 | M1 | E-0003 | 16 | 80 | Frontend | Medium | Planned |
| S-0013 | F-0007 | Story | Design System & Frontend Foundation | Implement Atlas design tokens and premium motion foundations | P0 | M1 | F-0007 | 8 | 40 | Frontend | Medium | Planned |
| T-0025 | S-0013 | Task | Design System & Frontend Foundation | Implement architecture and controls for: Implement Atlas design tokens and premium motion foundations | P0 | M1 | S-0013 | 3 | 16 | Frontend | Medium | Planned |
| T-0026 | S-0013 | Task | Design System & Frontend Foundation | Integrate end-to-end workflow for: Implement Atlas design tokens and premium motion foundations | P0 | M1 | T-0025 | 3 | 16 | Frontend | Medium | Planned |
| ST-0013 | T-0026 | Subtask | Design System & Frontend Foundation | Verify accessibility, performance, observability and traceability for: Implement Atlas design tokens and premium motion foundations | P0 | M1 | T-0026 | 2 | 8 | Frontend | Medium | Planned |
| S-0014 | F-0007 | Story | Design System & Frontend Foundation | Build accessible primitives | P0 | M1 | ST-0013 | 8 | 40 | Frontend | Medium | Planned |
| T-0027 | S-0014 | Task | Design System & Frontend Foundation | Implement data/API and state contract for: Build accessible primitives | P0 | M1 | S-0014 | 3 | 16 | Frontend | Medium | Planned |
| T-0028 | S-0014 | Task | Design System & Frontend Foundation | Implement responsive UI and interaction for: Build accessible primitives | P0 | M1 | T-0027 | 3 | 16 | Frontend | Medium | Planned |
| ST-0014 | T-0028 | Subtask | Design System & Frontend Foundation | Add accessibility, analytics and automated tests for: Build accessible primitives | P0 | M1 | T-0028 | 2 | 8 | Frontend | Medium | Planned |
| F-0008 | E-0003 | Feature | Design System & Frontend Foundation | Routing and rendering | P0 | M1 | ST-0014 | 16 | 80 | Frontend | Medium | Planned |
| S-0015 | F-0008 | Story | Design System & Frontend Foundation | Implement public rendering strategy | P0 | M1 | F-0008 | 8 | 40 | Frontend | Medium | Planned |
| T-0029 | S-0015 | Task | Design System & Frontend Foundation | Implement data/API and state contract for: Implement public rendering strategy | P0 | M1 | S-0015 | 3 | 16 | Frontend | Medium | Planned |
| T-0030 | S-0015 | Task | Design System & Frontend Foundation | Implement responsive UI and interaction for: Implement public rendering strategy | P0 | M1 | T-0029 | 3 | 16 | Frontend | Medium | Planned |
| ST-0015 | T-0030 | Subtask | Design System & Frontend Foundation | Add accessibility, analytics and automated tests for: Implement public rendering strategy | P0 | M1 | T-0030 | 2 | 8 | Frontend | Medium | Planned |
| S-0016 | F-0008 | Story | Design System & Frontend Foundation | Implement protected application shell | P0 | M1 | ST-0015 | 8 | 40 | Frontend | Medium | Planned |
| T-0031 | S-0016 | Task | Design System & Frontend Foundation | Implement data/API and state contract for: Implement protected application shell | P0 | M1 | S-0016 | 3 | 16 | Frontend | Medium | Planned |
| T-0032 | S-0016 | Task | Design System & Frontend Foundation | Implement responsive UI and interaction for: Implement protected application shell | P0 | M1 | T-0031 | 3 | 16 | Frontend | Medium | Planned |
| ST-0016 | T-0032 | Subtask | Design System & Frontend Foundation | Add accessibility, analytics and automated tests for: Implement protected application shell | P0 | M1 | T-0032 | 2 | 8 | Frontend | Medium | Planned |
| F-0009 | E-0003 | Feature | Design System & Frontend Foundation | Accessibility and performance | P0 | M1 | ST-0016 | 16 | 80 | Frontend | Medium | Planned |
| S-0017 | F-0009 | Story | Design System & Frontend Foundation | Integrate accessibility guardrails | P0 | M1 | F-0009 | 8 | 40 | Frontend | Medium | Planned |
| T-0033 | S-0017 | Task | Design System & Frontend Foundation | Implement data/API and state contract for: Integrate accessibility guardrails | P0 | M1 | S-0017 | 3 | 16 | Frontend | Medium | Planned |
| T-0034 | S-0017 | Task | Design System & Frontend Foundation | Implement responsive UI and interaction for: Integrate accessibility guardrails | P0 | M1 | T-0033 | 3 | 16 | Frontend | Medium | Planned |
| ST-0017 | T-0034 | Subtask | Design System & Frontend Foundation | Add accessibility, analytics and automated tests for: Integrate accessibility guardrails | P0 | M1 | T-0034 | 2 | 8 | Frontend | Medium | Planned |
| S-0018 | F-0009 | Story | Design System & Frontend Foundation | Enforce software-quality performance and motion budgets | P0 | M1 | ST-0017 | 8 | 40 | Frontend | Medium | Planned |
| T-0035 | S-0018 | Task | Design System & Frontend Foundation | Implement architecture and controls for: Enforce software-quality performance and motion budgets | P0 | M1 | S-0018 | 3 | 16 | Frontend | Medium | Planned |
| T-0036 | S-0018 | Task | Design System & Frontend Foundation | Integrate end-to-end workflow for: Enforce software-quality performance and motion budgets | P0 | M1 | T-0035 | 3 | 16 | Frontend | Medium | Planned |
| ST-0018 | T-0036 | Subtask | Design System & Frontend Foundation | Verify accessibility, performance, observability and traceability for: Enforce software-quality performance and motion budgets | P0 | M1 | T-0036 | 2 | 8 | Frontend | Medium | Planned |
| E-0004 |  | Epic | Public Web & Content | Public Web & Content | P1 | M2 | E-0003 | 39 | 192 | Public Web | Medium | Planned |
| F-0010 | E-0004 | Feature | Public Web & Content | Homepage and global navigation | P1 | M2 | E-0004 | 10 | 48 | Public Web | Medium | Planned |
| S-0019 | F-0010 | Story | Public Web & Content | Deliver immersive conversion-focused homepage architecture | P1 | M2 | F-0010 | 5 | 24 | Public Web | Medium | Planned |
| T-0037 | S-0019 | Task | Public Web & Content | Implement architecture and controls for: Deliver immersive conversion-focused homepage architecture | P1 | M2 | S-0019 | 2 | 8 | Public Web | Medium | Planned |
| T-0038 | S-0019 | Task | Public Web & Content | Integrate end-to-end workflow for: Deliver immersive conversion-focused homepage architecture | P1 | M2 | T-0037 | 2 | 8 | Public Web | Medium | Planned |
| ST-0019 | T-0038 | Subtask | Public Web & Content | Verify accessibility, performance, observability and traceability for: Deliver immersive conversion-focused homepage architecture | P1 | M2 | T-0038 | 1 | 8 | Public Web | Medium | Planned |
| S-0020 | F-0010 | Story | Public Web & Content | Deliver responsive navigation and footer | P1 | M2 | ST-0019 | 5 | 24 | Public Web | Medium | Planned |
| T-0039 | S-0020 | Task | Public Web & Content | Implement data/API and state contract for: Deliver responsive navigation and footer | P1 | M2 | S-0020 | 2 | 8 | Public Web | Medium | Planned |
| T-0040 | S-0020 | Task | Public Web & Content | Implement responsive UI and interaction for: Deliver responsive navigation and footer | P1 | M2 | T-0039 | 2 | 8 | Public Web | Medium | Planned |
| ST-0020 | T-0040 | Subtask | Public Web & Content | Add accessibility, analytics and automated tests for: Deliver responsive navigation and footer | P1 | M2 | T-0040 | 1 | 8 | Public Web | Medium | Planned |
| F-0011 | E-0004 | Feature | Public Web & Content | Services and portfolio | P1 | M2 | ST-0020 | 13 | 64 | Public Web | Medium | Planned |
| S-0021 | F-0011 | Story | Public Web & Content | Publish service landing pages | P1 | M2 | F-0011 | 5 | 24 | Public Web | Medium | Planned |
| T-0041 | S-0021 | Task | Public Web & Content | Implement data/API and state contract for: Publish service landing pages | P1 | M2 | S-0021 | 2 | 8 | Public Web | Medium | Planned |
| T-0042 | S-0021 | Task | Public Web & Content | Implement responsive UI and interaction for: Publish service landing pages | P1 | M2 | T-0041 | 2 | 8 | Public Web | Medium | Planned |
| ST-0021 | T-0042 | Subtask | Public Web & Content | Add accessibility, analytics and automated tests for: Publish service landing pages | P1 | M2 | T-0042 | 1 | 8 | Public Web | Medium | Planned |
| S-0022 | F-0011 | Story | Public Web & Content | Publish portfolio and case studies | P1 | M2 | ST-0021 | 8 | 40 | Public Web | Medium | Planned |
| T-0043 | S-0022 | Task | Public Web & Content | Implement data/API and state contract for: Publish portfolio and case studies | P1 | M2 | S-0022 | 3 | 16 | Public Web | Medium | Planned |
| T-0044 | S-0022 | Task | Public Web & Content | Implement responsive UI and interaction for: Publish portfolio and case studies | P1 | M2 | T-0043 | 3 | 16 | Public Web | Medium | Planned |
| ST-0022 | T-0044 | Subtask | Public Web & Content | Add accessibility, analytics and automated tests for: Publish portfolio and case studies | P1 | M2 | T-0044 | 2 | 8 | Public Web | Medium | Planned |
| F-0012 | E-0004 | Feature | Public Web & Content | Blog and editorial content | P1 | M2 | ST-0022 | 16 | 80 | Public Web | Medium | Planned |
| S-0023 | F-0012 | Story | Public Web & Content | Implement article and category experience | P1 | M2 | F-0012 | 8 | 40 | Public Web | Medium | Planned |
| T-0045 | S-0023 | Task | Public Web & Content | Implement data/API and state contract for: Implement article and category experience | P1 | M2 | S-0023 | 3 | 16 | Public Web | Medium | Planned |
| T-0046 | S-0023 | Task | Public Web & Content | Implement responsive UI and interaction for: Implement article and category experience | P1 | M2 | T-0045 | 3 | 16 | Public Web | Medium | Planned |
| ST-0023 | T-0046 | Subtask | Public Web & Content | Add accessibility, analytics and automated tests for: Implement article and category experience | P1 | M2 | T-0046 | 2 | 8 | Public Web | Medium | Planned |
| S-0024 | F-0012 | Story | Public Web & Content | Implement editorial workflow | P1 | M2 | ST-0023 | 8 | 40 | Public Web | Medium | Planned |
| T-0047 | S-0024 | Task | Public Web & Content | Implement data/API and state contract for: Implement editorial workflow | P1 | M2 | S-0024 | 3 | 16 | Public Web | Medium | Planned |
| T-0048 | S-0024 | Task | Public Web & Content | Implement responsive UI and interaction for: Implement editorial workflow | P1 | M2 | T-0047 | 3 | 16 | Public Web | Medium | Planned |
| ST-0024 | T-0048 | Subtask | Public Web & Content | Add accessibility, analytics and automated tests for: Implement editorial workflow | P1 | M2 | T-0048 | 2 | 8 | Public Web | Medium | Planned |
| E-0005 |  | Epic | Catalog & Product Discovery | Catalog & Product Discovery | P1 | M2 | E-0004 | 53 | 264 | Catalog | Medium | Planned |
| F-0013 | E-0005 | Feature | Catalog & Product Discovery | Catalog administration | P1 | M2 | E-0005 | 16 | 80 | Catalog | Medium | Planned |
| S-0025 | F-0013 | Story | Catalog & Product Discovery | Manage products, variants and categories | P1 | M2 | F-0013 | 8 | 40 | Catalog | Medium | Planned |
| T-0049 | S-0025 | Task | Catalog & Product Discovery | Implement data/API and state contract for: Manage products, variants and categories | P1 | M2 | S-0025 | 3 | 16 | Catalog | Medium | Planned |
| T-0050 | S-0025 | Task | Catalog & Product Discovery | Implement responsive UI and interaction for: Manage products, variants and categories | P1 | M2 | T-0049 | 3 | 16 | Catalog | Medium | Planned |
| ST-0025 | T-0050 | Subtask | Catalog & Product Discovery | Add accessibility, analytics and automated tests for: Manage products, variants and categories | P1 | M2 | T-0050 | 2 | 8 | Catalog | Medium | Planned |
| S-0026 | F-0013 | Story | Catalog & Product Discovery | Manage publication and redirects | P1 | M2 | ST-0025 | 8 | 40 | Catalog | Medium | Planned |
| T-0051 | S-0026 | Task | Catalog & Product Discovery | Implement data/API and state contract for: Manage publication and redirects | P1 | M2 | S-0026 | 3 | 16 | Catalog | Medium | Planned |
| T-0052 | S-0026 | Task | Catalog & Product Discovery | Implement responsive UI and interaction for: Manage publication and redirects | P1 | M2 | T-0051 | 3 | 16 | Catalog | Medium | Planned |
| ST-0026 | T-0052 | Subtask | Catalog & Product Discovery | Add accessibility, analytics and automated tests for: Manage publication and redirects | P1 | M2 | T-0052 | 2 | 8 | Catalog | Medium | Planned |
| F-0014 | E-0005 | Feature | Catalog & Product Discovery | Discovery and product pages | P1 | M2 | ST-0026 | 16 | 80 | Catalog | Medium | Planned |
| S-0027 | F-0014 | Story | Catalog & Product Discovery | Implement filters, search and sorting | P1 | M2 | F-0014 | 8 | 40 | Catalog | Medium | Planned |
| T-0053 | S-0027 | Task | Catalog & Product Discovery | Implement data/API and state contract for: Implement filters, search and sorting | P1 | M2 | S-0027 | 3 | 16 | Catalog | Medium | Planned |
| T-0054 | S-0027 | Task | Catalog & Product Discovery | Implement responsive UI and interaction for: Implement filters, search and sorting | P1 | M2 | T-0053 | 3 | 16 | Catalog | Medium | Planned |
| ST-0027 | T-0054 | Subtask | Catalog & Product Discovery | Add accessibility, analytics and automated tests for: Implement filters, search and sorting | P1 | M2 | T-0054 | 2 | 8 | Catalog | Medium | Planned |
| S-0028 | F-0014 | Story | Catalog & Product Discovery | Implement premium product detail, variants and direct-sale actions | P1 | M2 | ST-0027 | 8 | 40 | Catalog | Medium | Planned |
| T-0055 | S-0028 | Task | Catalog & Product Discovery | Implement architecture and controls for: Implement premium product detail, variants and direct-sale actions | P1 | M2 | S-0028 | 3 | 16 | Catalog | Medium | Planned |
| T-0056 | S-0028 | Task | Catalog & Product Discovery | Integrate end-to-end workflow for: Implement premium product detail, variants and direct-sale actions | P1 | M2 | T-0055 | 3 | 16 | Catalog | Medium | Planned |
| ST-0028 | T-0056 | Subtask | Catalog & Product Discovery | Verify accessibility, performance, observability and traceability for: Implement premium product detail, variants and direct-sale actions | P1 | M2 | T-0056 | 2 | 8 | Catalog | Medium | Planned |
| F-0015 | E-0005 | Feature | Catalog & Product Discovery | Catalog SEO and media | P1 | M2 | ST-0028 | 21 | 104 | Catalog | Medium | Planned |
| S-0029 | F-0015 | Story | Catalog & Product Discovery | Integrate structured product metadata | P1 | M2 | F-0015 | 8 | 40 | Catalog | Medium | Planned |
| T-0057 | S-0029 | Task | Catalog & Product Discovery | Implement data/API and state contract for: Integrate structured product metadata | P1 | M2 | S-0029 | 3 | 16 | Catalog | Medium | Planned |
| T-0058 | S-0029 | Task | Catalog & Product Discovery | Implement responsive UI and interaction for: Integrate structured product metadata | P1 | M2 | T-0057 | 3 | 16 | Catalog | Medium | Planned |
| ST-0029 | T-0058 | Subtask | Catalog & Product Discovery | Add accessibility, analytics and automated tests for: Integrate structured product metadata | P1 | M2 | T-0058 | 2 | 8 | Catalog | Medium | Planned |
| S-0030 | F-0015 | Story | Catalog & Product Discovery | Integrate catalog media pipeline | P1 | M2 | ST-0029 | 13 | 64 | Catalog | High | Planned |
| T-0059 | S-0030 | Task | Catalog & Product Discovery | Implement data/API and state contract for: Integrate catalog media pipeline | P1 | M2 | S-0030 | 5 | 24 | Catalog | High | Planned |
| T-0060 | S-0030 | Task | Catalog & Product Discovery | Implement responsive UI and interaction for: Integrate catalog media pipeline | P1 | M2 | T-0059 | 5 | 24 | Catalog | High | Planned |
| ST-0030 | T-0060 | Subtask | Catalog & Product Discovery | Add accessibility, analytics and automated tests for: Integrate catalog media pipeline | P1 | M2 | T-0060 | 3 | 16 | Catalog | Medium | Planned |
| E-0006 |  | Epic | Lead & Quote Intake — Phase 1 | Lead & Quote Intake — Phase 1 | P0 | M3 | E-0005 | 53 | 264 | Quotes F1 | High | Planned |
| F-0016 | E-0006 | Feature | Lead & Quote Intake — Phase 1 | Contact and qualification | P0 | M3 | E-0006 | 16 | 80 | Quotes F1 | Medium | Planned |
| S-0031 | F-0016 | Story | Lead & Quote Intake — Phase 1 | Implement guided contact and quote forms | P0 | M3 | F-0016 | 8 | 40 | Quotes F1 | Medium | Planned |
| T-0061 | S-0031 | Task | Lead & Quote Intake — Phase 1 | Implement service, data and security controls for: Implement guided contact and quote forms | P0 | M3 | S-0031 | 3 | 16 | Quotes F1 | Medium | Planned |
| T-0062 | S-0031 | Task | Lead & Quote Intake — Phase 1 | Integrate end-to-end workflow for: Implement guided contact and quote forms | P0 | M3 | T-0061 | 3 | 16 | Quotes F1 | Medium | Planned |
| ST-0031 | T-0062 | Subtask | Lead & Quote Intake — Phase 1 | Add automated tests, observability and runbook for: Implement guided contact and quote forms | P0 | M3 | T-0062 | 2 | 8 | Quotes F1 | Medium | Planned |
| S-0032 | F-0016 | Story | Lead & Quote Intake — Phase 1 | Implement lead attribution and consent | P0 | M3 | ST-0031 | 8 | 40 | Quotes F1 | Medium | Planned |
| T-0063 | S-0032 | Task | Lead & Quote Intake — Phase 1 | Implement service, data and security controls for: Implement lead attribution and consent | P0 | M3 | S-0032 | 3 | 16 | Quotes F1 | Medium | Planned |
| T-0064 | S-0032 | Task | Lead & Quote Intake — Phase 1 | Integrate end-to-end workflow for: Implement lead attribution and consent | P0 | M3 | T-0063 | 3 | 16 | Quotes F1 | Medium | Planned |
| ST-0032 | T-0064 | Subtask | Lead & Quote Intake — Phase 1 | Add automated tests, observability and runbook for: Implement lead attribution and consent | P0 | M3 | T-0064 | 2 | 8 | Quotes F1 | Medium | Planned |
| F-0017 | E-0006 | Feature | Lead & Quote Intake — Phase 1 | Secure attachments | P0 | M3 | ST-0032 | 21 | 104 | Quotes F1 | Medium | Planned |
| S-0033 | F-0017 | Story | Lead & Quote Intake — Phase 1 | Implement signed upload and quarantine | P0 | M3 | F-0017 | 13 | 64 | Quotes F1 | High | Planned |
| T-0065 | S-0033 | Task | Lead & Quote Intake — Phase 1 | Implement service, data and security controls for: Implement signed upload and quarantine | P0 | M3 | S-0033 | 5 | 24 | Quotes F1 | High | Planned |
| T-0066 | S-0033 | Task | Lead & Quote Intake — Phase 1 | Integrate end-to-end workflow for: Implement signed upload and quarantine | P0 | M3 | T-0065 | 5 | 24 | Quotes F1 | High | Planned |
| ST-0033 | T-0066 | Subtask | Lead & Quote Intake — Phase 1 | Add automated tests, observability and runbook for: Implement signed upload and quarantine | P0 | M3 | T-0066 | 3 | 16 | Quotes F1 | Medium | Planned |
| S-0034 | F-0017 | Story | Lead & Quote Intake — Phase 1 | Implement attachment review and retention | P0 | M3 | ST-0033 | 8 | 40 | Quotes F1 | Medium | Planned |
| T-0067 | S-0034 | Task | Lead & Quote Intake — Phase 1 | Implement service, data and security controls for: Implement attachment review and retention | P0 | M3 | S-0034 | 3 | 16 | Quotes F1 | Medium | Planned |
| T-0068 | S-0034 | Task | Lead & Quote Intake — Phase 1 | Integrate end-to-end workflow for: Implement attachment review and retention | P0 | M3 | T-0067 | 3 | 16 | Quotes F1 | Medium | Planned |
| ST-0034 | T-0068 | Subtask | Lead & Quote Intake — Phase 1 | Add automated tests, observability and runbook for: Implement attachment review and retention | P0 | M3 | T-0068 | 2 | 8 | Quotes F1 | Medium | Planned |
| F-0018 | E-0006 | Feature | Lead & Quote Intake — Phase 1 | Operator quote workflow | P0 | M3 | ST-0034 | 16 | 80 | Quotes F1 | High | Planned |
| S-0035 | F-0018 | Story | Lead & Quote Intake — Phase 1 | Implement assignment and status management | P0 | M3 | F-0018 | 8 | 40 | Quotes F1 | Medium | Planned |
| T-0069 | S-0035 | Task | Lead & Quote Intake — Phase 1 | Implement service, data and security controls for: Implement assignment and status management | P0 | M3 | S-0035 | 3 | 16 | Quotes F1 | Medium | Planned |
| T-0070 | S-0035 | Task | Lead & Quote Intake — Phase 1 | Integrate end-to-end workflow for: Implement assignment and status management | P0 | M3 | T-0069 | 3 | 16 | Quotes F1 | Medium | Planned |
| ST-0035 | T-0070 | Subtask | Lead & Quote Intake — Phase 1 | Add automated tests, observability and runbook for: Implement assignment and status management | P0 | M3 | T-0070 | 2 | 8 | Quotes F1 | Medium | Planned |
| S-0036 | F-0018 | Story | Lead & Quote Intake — Phase 1 | Implement versioned manual quotes | P0 | M3 | ST-0035 | 8 | 40 | Quotes F1 | Medium | Planned |
| T-0071 | S-0036 | Task | Lead & Quote Intake — Phase 1 | Implement service, data and security controls for: Implement versioned manual quotes | P0 | M3 | S-0036 | 3 | 16 | Quotes F1 | Medium | Planned |
| T-0072 | S-0036 | Task | Lead & Quote Intake — Phase 1 | Integrate end-to-end workflow for: Implement versioned manual quotes | P0 | M3 | T-0071 | 3 | 16 | Quotes F1 | Medium | Planned |
| ST-0036 | T-0072 | Subtask | Lead & Quote Intake — Phase 1 | Add automated tests, observability and runbook for: Implement versioned manual quotes | P0 | M3 | T-0072 | 2 | 8 | Quotes F1 | Medium | Planned |
| E-0007 |  | Epic | Lantern Configurator | Lantern Configurator | P1 | M3 | E-0006 | 53 | 264 | Lantern | Medium | Planned |
| F-0019 | E-0007 | Feature | Lantern Configurator | Model and option administration | P1 | M3 | E-0007 | 16 | 80 | Lantern | Medium | Planned |
| S-0037 | F-0019 | Story | Lantern Configurator | Manage versioned lantern models | P1 | M3 | F-0019 | 8 | 40 | Lantern | Medium | Planned |
| T-0073 | S-0037 | Task | Lantern Configurator | Implement data/API and state contract for: Manage versioned lantern models | P1 | M3 | S-0037 | 3 | 16 | Lantern | Medium | Planned |
| T-0074 | S-0037 | Task | Lantern Configurator | Implement responsive UI and interaction for: Manage versioned lantern models | P1 | M3 | T-0073 | 3 | 16 | Lantern | Medium | Planned |
| ST-0037 | T-0074 | Subtask | Lantern Configurator | Add accessibility, analytics and automated tests for: Manage versioned lantern models | P1 | M3 | T-0074 | 2 | 8 | Lantern | Medium | Planned |
| S-0038 | F-0019 | Story | Lantern Configurator | Manage compatibility rules | P1 | M3 | ST-0037 | 8 | 40 | Lantern | Medium | Planned |
| T-0075 | S-0038 | Task | Lantern Configurator | Implement data/API and state contract for: Manage compatibility rules | P1 | M3 | S-0038 | 3 | 16 | Lantern | Medium | Planned |
| T-0076 | S-0038 | Task | Lantern Configurator | Implement responsive UI and interaction for: Manage compatibility rules | P1 | M3 | T-0075 | 3 | 16 | Lantern | Medium | Planned |
| ST-0038 | T-0076 | Subtask | Lantern Configurator | Add accessibility, analytics and automated tests for: Manage compatibility rules | P1 | M3 | T-0076 | 2 | 8 | Lantern | Medium | Planned |
| F-0020 | E-0007 | Feature | Lantern Configurator | Configurator experience | P1 | M3 | ST-0038 | 21 | 104 | Lantern | Medium | Planned |
| S-0039 | F-0020 | Story | Lantern Configurator | Implement guided configuration state machine | P1 | M3 | F-0020 | 8 | 40 | Lantern | Medium | Planned |
| T-0077 | S-0039 | Task | Lantern Configurator | Implement data/API and state contract for: Implement guided configuration state machine | P1 | M3 | S-0039 | 3 | 16 | Lantern | Medium | Planned |
| T-0078 | S-0039 | Task | Lantern Configurator | Implement responsive UI and interaction for: Implement guided configuration state machine | P1 | M3 | T-0077 | 3 | 16 | Lantern | Medium | Planned |
| ST-0039 | T-0078 | Subtask | Lantern Configurator | Add accessibility, analytics and automated tests for: Implement guided configuration state machine | P1 | M3 | T-0078 | 2 | 8 | Lantern | Medium | Planned |
| S-0040 | F-0020 | Story | Lantern Configurator | Implement adaptive premium 3D and complete static fallback | P1 | M3 | ST-0039 | 13 | 64 | Lantern | High | Planned |
| T-0079 | S-0040 | Task | Lantern Configurator | Implement architecture and controls for: Implement adaptive premium 3D and complete static fallback | P1 | M3 | S-0040 | 5 | 24 | Lantern | High | Planned |
| T-0080 | S-0040 | Task | Lantern Configurator | Integrate end-to-end workflow for: Implement adaptive premium 3D and complete static fallback | P1 | M3 | T-0079 | 5 | 24 | Lantern | High | Planned |
| ST-0040 | T-0080 | Subtask | Lantern Configurator | Verify accessibility, performance, observability and traceability for: Implement adaptive premium 3D and complete static fallback | P1 | M3 | T-0080 | 3 | 16 | Lantern | Medium | Planned |
| F-0021 | E-0007 | Feature | Lantern Configurator | Submission and review | P1 | M3 | ST-0040 | 16 | 80 | Lantern | Medium | Planned |
| S-0041 | F-0021 | Story | Lantern Configurator | Create immutable submitted snapshots | P1 | M3 | F-0021 | 8 | 40 | Lantern | Medium | Planned |
| T-0081 | S-0041 | Task | Lantern Configurator | Implement data/API and state contract for: Create immutable submitted snapshots | P1 | M3 | S-0041 | 3 | 16 | Lantern | Medium | Planned |
| T-0082 | S-0041 | Task | Lantern Configurator | Implement responsive UI and interaction for: Create immutable submitted snapshots | P1 | M3 | T-0081 | 3 | 16 | Lantern | Medium | Planned |
| ST-0041 | T-0082 | Subtask | Lantern Configurator | Add accessibility, analytics and automated tests for: Create immutable submitted snapshots | P1 | M3 | T-0082 | 2 | 8 | Lantern | Medium | Planned |
| S-0042 | F-0021 | Story | Lantern Configurator | Implement operator lantern review | P1 | M3 | ST-0041 | 8 | 40 | Lantern | Medium | Planned |
| T-0083 | S-0042 | Task | Lantern Configurator | Implement data/API and state contract for: Implement operator lantern review | P1 | M3 | S-0042 | 3 | 16 | Lantern | Medium | Planned |
| T-0084 | S-0042 | Task | Lantern Configurator | Implement responsive UI and interaction for: Implement operator lantern review | P1 | M3 | T-0083 | 3 | 16 | Lantern | Medium | Planned |
| ST-0042 | T-0084 | Subtask | Lantern Configurator | Add accessibility, analytics and automated tests for: Implement operator lantern review | P1 | M3 | T-0084 | 2 | 8 | Lantern | Medium | Planned |
| E-0008 |  | Epic | Events & Local Marketing | Events & Local Marketing | P1 | M3 | E-0007 | 45 | 224 | Events | Medium | Planned |
| F-0022 | E-0008 | Feature | Events & Local Marketing | Event publishing | P1 | M3 | E-0008 | 13 | 64 | Events | Medium | Planned |
| S-0043 | F-0022 | Story | Events & Local Marketing | Manage event calendar and detail pages | P1 | M3 | F-0022 | 5 | 24 | Events | Medium | Planned |
| T-0085 | S-0043 | Task | Events & Local Marketing | Implement data/API and state contract for: Manage event calendar and detail pages | P1 | M3 | S-0043 | 2 | 8 | Events | Medium | Planned |
| T-0086 | S-0043 | Task | Events & Local Marketing | Implement responsive UI and interaction for: Manage event calendar and detail pages | P1 | M3 | T-0085 | 2 | 8 | Events | Medium | Planned |
| ST-0043 | T-0086 | Subtask | Events & Local Marketing | Add accessibility, analytics and automated tests for: Manage event calendar and detail pages | P1 | M3 | T-0086 | 1 | 8 | Events | Medium | Planned |
| S-0044 | F-0022 | Story | Events & Local Marketing | Handle event changes and cancellation | P1 | M3 | ST-0043 | 8 | 40 | Events | Medium | Planned |
| T-0087 | S-0044 | Task | Events & Local Marketing | Implement data/API and state contract for: Handle event changes and cancellation | P1 | M3 | S-0044 | 3 | 16 | Events | Medium | Planned |
| T-0088 | S-0044 | Task | Events & Local Marketing | Implement responsive UI and interaction for: Handle event changes and cancellation | P1 | M3 | T-0087 | 3 | 16 | Events | Medium | Planned |
| ST-0044 | T-0088 | Subtask | Events & Local Marketing | Add accessibility, analytics and automated tests for: Handle event changes and cancellation | P1 | M3 | T-0088 | 2 | 8 | Events | Medium | Planned |
| F-0023 | E-0008 | Feature | Events & Local Marketing | Registration and lead capture | P1 | M3 | ST-0044 | 16 | 80 | Events | Medium | Planned |
| S-0045 | F-0023 | Story | Events & Local Marketing | Implement interest/registration flows | P1 | M3 | F-0023 | 8 | 40 | Events | Medium | Planned |
| T-0089 | S-0045 | Task | Events & Local Marketing | Implement data/API and state contract for: Implement interest/registration flows | P1 | M3 | S-0045 | 3 | 16 | Events | Medium | Planned |
| T-0090 | S-0045 | Task | Events & Local Marketing | Implement responsive UI and interaction for: Implement interest/registration flows | P1 | M3 | T-0089 | 3 | 16 | Events | Medium | Planned |
| ST-0045 | T-0090 | Subtask | Events & Local Marketing | Add accessibility, analytics and automated tests for: Implement interest/registration flows | P1 | M3 | T-0090 | 2 | 8 | Events | Medium | Planned |
| S-0046 | F-0023 | Story | Events & Local Marketing | Attribute event leads and outcomes | P1 | M3 | ST-0045 | 8 | 40 | Events | Medium | Planned |
| T-0091 | S-0046 | Task | Events & Local Marketing | Implement data/API and state contract for: Attribute event leads and outcomes | P1 | M3 | S-0046 | 3 | 16 | Events | Medium | Planned |
| T-0092 | S-0046 | Task | Events & Local Marketing | Implement responsive UI and interaction for: Attribute event leads and outcomes | P1 | M3 | T-0091 | 3 | 16 | Events | Medium | Planned |
| ST-0046 | T-0092 | Subtask | Events & Local Marketing | Add accessibility, analytics and automated tests for: Attribute event leads and outcomes | P1 | M3 | T-0092 | 2 | 8 | Events | Medium | Planned |
| F-0024 | E-0008 | Feature | Events & Local Marketing | Local SEO and post-event content | P1 | M3 | ST-0046 | 16 | 80 | Events | Medium | Planned |
| S-0047 | F-0024 | Story | Events & Local Marketing | Publish valid event structured data | P1 | M3 | F-0024 | 8 | 40 | Events | Medium | Planned |
| T-0093 | S-0047 | Task | Events & Local Marketing | Implement data/API and state contract for: Publish valid event structured data | P1 | M3 | S-0047 | 3 | 16 | Events | Medium | Planned |
| T-0094 | S-0047 | Task | Events & Local Marketing | Implement responsive UI and interaction for: Publish valid event structured data | P1 | M3 | T-0093 | 3 | 16 | Events | Medium | Planned |
| ST-0047 | T-0094 | Subtask | Events & Local Marketing | Add accessibility, analytics and automated tests for: Publish valid event structured data | P1 | M3 | T-0094 | 2 | 8 | Events | Medium | Planned |
| S-0048 | F-0024 | Story | Events & Local Marketing | Create post-event galleries and follow-up | P1 | M3 | ST-0047 | 8 | 40 | Events | Medium | Planned |
| T-0095 | S-0048 | Task | Events & Local Marketing | Implement data/API and state contract for: Create post-event galleries and follow-up | P1 | M3 | S-0048 | 3 | 16 | Events | Medium | Planned |
| T-0096 | S-0048 | Task | Events & Local Marketing | Implement responsive UI and interaction for: Create post-event galleries and follow-up | P1 | M3 | T-0095 | 3 | 16 | Events | Medium | Planned |
| ST-0048 | T-0096 | Subtask | Events & Local Marketing | Add accessibility, analytics and automated tests for: Create post-event galleries and follow-up | P1 | M3 | T-0096 | 2 | 8 | Events | Medium | Planned |
| E-0009 |  | Epic | Printer Assistance | Printer Assistance | P1 | M3 | E-0008 | 48 | 240 | Assistance | Medium | Planned |
| F-0025 | E-0009 | Feature | Printer Assistance | Assistance intake and triage | P1 | M3 | E-0009 | 16 | 80 | Assistance | Medium | Planned |
| S-0049 | F-0025 | Story | Printer Assistance | Capture machine, symptoms and evidence | P1 | M3 | F-0025 | 8 | 40 | Assistance | Medium | Planned |
| T-0097 | S-0049 | Task | Printer Assistance | Implement service, data and security controls for: Capture machine, symptoms and evidence | P1 | M3 | S-0049 | 3 | 16 | Assistance | Medium | Planned |
| T-0098 | S-0049 | Task | Printer Assistance | Integrate end-to-end workflow for: Capture machine, symptoms and evidence | P1 | M3 | T-0097 | 3 | 16 | Assistance | Medium | Planned |
| ST-0049 | T-0098 | Subtask | Printer Assistance | Add automated tests, observability and runbook for: Capture machine, symptoms and evidence | P1 | M3 | T-0098 | 2 | 8 | Assistance | Medium | Planned |
| S-0050 | F-0025 | Story | Printer Assistance | Implement transparent triage | P1 | M3 | ST-0049 | 8 | 40 | Assistance | Medium | Planned |
| T-0099 | S-0050 | Task | Printer Assistance | Implement service, data and security controls for: Implement transparent triage | P1 | M3 | S-0050 | 3 | 16 | Assistance | Medium | Planned |
| T-0100 | S-0050 | Task | Printer Assistance | Integrate end-to-end workflow for: Implement transparent triage | P1 | M3 | T-0099 | 3 | 16 | Assistance | Medium | Planned |
| ST-0050 | T-0100 | Subtask | Printer Assistance | Add automated tests, observability and runbook for: Implement transparent triage | P1 | M3 | T-0100 | 2 | 8 | Assistance | Medium | Planned |
| F-0026 | E-0009 | Feature | Printer Assistance | Remote support and intervention | P1 | M3 | ST-0050 | 16 | 80 | Assistance | Medium | Planned |
| S-0051 | F-0026 | Story | Printer Assistance | Manage remote support consent and sessions | P1 | M3 | F-0026 | 8 | 40 | Assistance | Medium | Planned |
| T-0101 | S-0051 | Task | Printer Assistance | Implement service, data and security controls for: Manage remote support consent and sessions | P1 | M3 | S-0051 | 3 | 16 | Assistance | Medium | Planned |
| T-0102 | S-0051 | Task | Printer Assistance | Integrate end-to-end workflow for: Manage remote support consent and sessions | P1 | M3 | T-0101 | 3 | 16 | Assistance | Medium | Planned |
| ST-0051 | T-0102 | Subtask | Printer Assistance | Add automated tests, observability and runbook for: Manage remote support consent and sessions | P1 | M3 | T-0102 | 2 | 8 | Assistance | Medium | Planned |
| S-0052 | F-0026 | Story | Printer Assistance | Manage workshop interventions | P1 | M3 | ST-0051 | 8 | 40 | Assistance | Medium | Planned |
| T-0103 | S-0052 | Task | Printer Assistance | Implement service, data and security controls for: Manage workshop interventions | P1 | M3 | S-0052 | 3 | 16 | Assistance | Medium | Planned |
| T-0104 | S-0052 | Task | Printer Assistance | Integrate end-to-end workflow for: Manage workshop interventions | P1 | M3 | T-0103 | 3 | 16 | Assistance | Medium | Planned |
| ST-0052 | T-0104 | Subtask | Printer Assistance | Add automated tests, observability and runbook for: Manage workshop interventions | P1 | M3 | T-0104 | 2 | 8 | Assistance | Medium | Planned |
| F-0027 | E-0009 | Feature | Printer Assistance | Communication and closure | P1 | M3 | ST-0052 | 16 | 80 | Assistance | Medium | Planned |
| S-0053 | F-0027 | Story | Printer Assistance | Implement assistance notifications | P1 | M3 | F-0027 | 8 | 40 | Assistance | Medium | Planned |
| T-0105 | S-0053 | Task | Printer Assistance | Implement service, data and security controls for: Implement assistance notifications | P1 | M3 | S-0053 | 3 | 16 | Assistance | Medium | Planned |
| T-0106 | S-0053 | Task | Printer Assistance | Integrate end-to-end workflow for: Implement assistance notifications | P1 | M3 | T-0105 | 3 | 16 | Assistance | Medium | Planned |
| ST-0053 | T-0106 | Subtask | Printer Assistance | Add automated tests, observability and runbook for: Implement assistance notifications | P1 | M3 | T-0106 | 2 | 8 | Assistance | Medium | Planned |
| S-0054 | F-0027 | Story | Printer Assistance | Close cases with outcome and knowledge capture | P1 | M3 | ST-0053 | 8 | 40 | Assistance | Medium | Planned |
| T-0107 | S-0054 | Task | Printer Assistance | Implement service, data and security controls for: Close cases with outcome and knowledge capture | P1 | M3 | S-0054 | 3 | 16 | Assistance | Medium | Planned |
| T-0108 | S-0054 | Task | Printer Assistance | Integrate end-to-end workflow for: Close cases with outcome and knowledge capture | P1 | M3 | T-0107 | 3 | 16 | Assistance | Medium | Planned |
| ST-0054 | T-0108 | Subtask | Printer Assistance | Add automated tests, observability and runbook for: Close cases with outcome and knowledge capture | P1 | M3 | T-0108 | 2 | 8 | Assistance | Medium | Planned |
| E-0010 |  | Epic | Newsletter & CRM | Newsletter & CRM | P1 | M3 | E-0009 | 53 | 264 | CRM | Medium | Planned |
| F-0028 | E-0010 | Feature | Newsletter & CRM | Subscriber and consent | P1 | M3 | E-0010 | 16 | 80 | CRM | Medium | Planned |
| S-0055 | F-0028 | Story | Newsletter & CRM | Implement double opt-in lifecycle | P1 | M3 | F-0028 | 8 | 40 | CRM | Medium | Planned |
| T-0109 | S-0055 | Task | Newsletter & CRM | Implement service, data and security controls for: Implement double opt-in lifecycle | P1 | M3 | S-0055 | 3 | 16 | CRM | Medium | Planned |
| T-0110 | S-0055 | Task | Newsletter & CRM | Integrate end-to-end workflow for: Implement double opt-in lifecycle | P1 | M3 | T-0109 | 3 | 16 | CRM | Medium | Planned |
| ST-0055 | T-0110 | Subtask | Newsletter & CRM | Add automated tests, observability and runbook for: Implement double opt-in lifecycle | P1 | M3 | T-0110 | 2 | 8 | CRM | Medium | Planned |
| S-0056 | F-0028 | Story | Newsletter & CRM | Implement preferences and suppression | P1 | M3 | ST-0055 | 8 | 40 | CRM | Medium | Planned |
| T-0111 | S-0056 | Task | Newsletter & CRM | Implement service, data and security controls for: Implement preferences and suppression | P1 | M3 | S-0056 | 3 | 16 | CRM | Medium | Planned |
| T-0112 | S-0056 | Task | Newsletter & CRM | Integrate end-to-end workflow for: Implement preferences and suppression | P1 | M3 | T-0111 | 3 | 16 | CRM | Medium | Planned |
| ST-0056 | T-0112 | Subtask | Newsletter & CRM | Add automated tests, observability and runbook for: Implement preferences and suppression | P1 | M3 | T-0112 | 2 | 8 | CRM | Medium | Planned |
| F-0029 | E-0010 | Feature | Newsletter & CRM | Campaign workflow | P1 | M3 | ST-0056 | 21 | 104 | CRM | Medium | Planned |
| S-0057 | F-0029 | Story | Newsletter & CRM | Build campaign draft and review | P1 | M3 | F-0029 | 8 | 40 | CRM | Medium | Planned |
| T-0113 | S-0057 | Task | Newsletter & CRM | Implement service, data and security controls for: Build campaign draft and review | P1 | M3 | S-0057 | 3 | 16 | CRM | Medium | Planned |
| T-0114 | S-0057 | Task | Newsletter & CRM | Integrate end-to-end workflow for: Build campaign draft and review | P1 | M3 | T-0113 | 3 | 16 | CRM | Medium | Planned |
| ST-0057 | T-0114 | Subtask | Newsletter & CRM | Add automated tests, observability and runbook for: Build campaign draft and review | P1 | M3 | T-0114 | 2 | 8 | CRM | Medium | Planned |
| S-0058 | F-0029 | Story | Newsletter & CRM | Implement scheduled delivery integration | P1 | M3 | ST-0057 | 13 | 64 | CRM | High | Planned |
| T-0115 | S-0058 | Task | Newsletter & CRM | Implement service, data and security controls for: Implement scheduled delivery integration | P1 | M3 | S-0058 | 5 | 24 | CRM | High | Planned |
| T-0116 | S-0058 | Task | Newsletter & CRM | Integrate end-to-end workflow for: Implement scheduled delivery integration | P1 | M3 | T-0115 | 5 | 24 | CRM | High | Planned |
| ST-0058 | T-0116 | Subtask | Newsletter & CRM | Add automated tests, observability and runbook for: Implement scheduled delivery integration | P1 | M3 | T-0116 | 3 | 16 | CRM | Medium | Planned |
| F-0030 | E-0010 | Feature | Newsletter & CRM | Segmentation and measurement | P1 | M3 | ST-0058 | 16 | 80 | CRM | Medium | Planned |
| S-0059 | F-0030 | Story | Newsletter & CRM | Build consent-aware segmentation | P1 | M3 | F-0030 | 8 | 40 | CRM | Medium | Planned |
| T-0117 | S-0059 | Task | Newsletter & CRM | Implement service, data and security controls for: Build consent-aware segmentation | P1 | M3 | S-0059 | 3 | 16 | CRM | Medium | Planned |
| T-0118 | S-0059 | Task | Newsletter & CRM | Integrate end-to-end workflow for: Build consent-aware segmentation | P1 | M3 | T-0117 | 3 | 16 | CRM | Medium | Planned |
| ST-0059 | T-0118 | Subtask | Newsletter & CRM | Add automated tests, observability and runbook for: Build consent-aware segmentation | P1 | M3 | T-0118 | 2 | 8 | CRM | Medium | Planned |
| S-0060 | F-0030 | Story | Newsletter & CRM | Measure campaign outcomes | P1 | M3 | ST-0059 | 8 | 40 | CRM | Medium | Planned |
| T-0119 | S-0060 | Task | Newsletter & CRM | Implement service, data and security controls for: Measure campaign outcomes | P1 | M3 | S-0060 | 3 | 16 | CRM | Medium | Planned |
| T-0120 | S-0060 | Task | Newsletter & CRM | Integrate end-to-end workflow for: Measure campaign outcomes | P1 | M3 | T-0119 | 3 | 16 | CRM | Medium | Planned |
| ST-0060 | T-0120 | Subtask | Newsletter & CRM | Add automated tests, observability and runbook for: Measure campaign outcomes | P1 | M3 | T-0120 | 2 | 8 | CRM | Medium | Planned |
| E-0011 |  | Epic | NoLimits Command Center, Media & Operations UX | NoLimits Command Center, Media & Operations UX | P0 | M2 | E-0010 | 45 | 224 | Admin | High | Planned |
| F-0031 | E-0011 | Feature | NoLimits Command Center, Media & Operations UX | Command Center overview and navigation | P0 | M2 | E-0011 | 13 | 64 | Admin | Medium | Planned |
| S-0061 | F-0031 | Story | NoLimits Command Center, Media & Operations UX | Build Andrea-only operations dashboard | P0 | M2 | F-0031 | 8 | 40 | Admin | Medium | Planned |
| T-0121 | S-0061 | Task | Admin, Media & Operations UX | Implement data/API and state contract for: Build role-aware operations dashboard | P0 | M2 | S-0061 | 3 | 16 | Admin | Medium | Planned |
| T-0122 | S-0061 | Task | Admin, Media & Operations UX | Implement responsive UI and interaction for: Build role-aware operations dashboard | P0 | M2 | T-0121 | 3 | 16 | Admin | Medium | Planned |
| ST-0061 | T-0122 | Subtask | Admin, Media & Operations UX | Add accessibility, analytics and automated tests for: Build role-aware operations dashboard | P0 | M2 | T-0122 | 2 | 8 | Admin | Medium | Planned |
| S-0062 | F-0031 | Story | NoLimits Command Center, Media & Operations UX | Build resilient Command Center navigation | P0 | M2 | ST-0061 | 5 | 24 | Admin | Medium | Planned |
| T-0123 | S-0062 | Task | Admin, Media & Operations UX | Implement data/API and state contract for: Build resilient admin navigation | P0 | M2 | S-0062 | 2 | 8 | Admin | Medium | Planned |
| T-0124 | S-0062 | Task | Admin, Media & Operations UX | Implement responsive UI and interaction for: Build resilient admin navigation | P0 | M2 | T-0123 | 2 | 8 | Admin | Medium | Planned |
| ST-0062 | T-0124 | Subtask | Admin, Media & Operations UX | Add accessibility, analytics and automated tests for: Build resilient admin navigation | P0 | M2 | T-0124 | 1 | 8 | Admin | Medium | Planned |
| F-0032 | E-0011 | Feature | NoLimits Command Center, Media & Operations UX | Media Library | P0 | M2 | ST-0062 | 16 | 80 | Admin | Medium | Planned |
| S-0063 | F-0032 | Story | NoLimits Command Center, Media & Operations UX | Implement asset lifecycle and metadata | P0 | M2 | F-0032 | 8 | 40 | Admin | Medium | Planned |
| T-0125 | S-0063 | Task | Admin, Media & Operations UX | Implement data/API and state contract for: Implement asset lifecycle and metadata | P0 | M2 | S-0063 | 3 | 16 | Admin | Medium | Planned |
| T-0126 | S-0063 | Task | Admin, Media & Operations UX | Implement responsive UI and interaction for: Implement asset lifecycle and metadata | P0 | M2 | T-0125 | 3 | 16 | Admin | Medium | Planned |
| ST-0063 | T-0126 | Subtask | Admin, Media & Operations UX | Add accessibility, analytics and automated tests for: Implement asset lifecycle and metadata | P0 | M2 | T-0126 | 2 | 8 | Admin | Medium | Planned |
| S-0064 | F-0032 | Story | NoLimits Command Center, Media & Operations UX | Implement derivatives and usage graph | P0 | M2 | ST-0063 | 8 | 40 | Admin | Medium | Planned |
| T-0127 | S-0064 | Task | Admin, Media & Operations UX | Implement data/API and state contract for: Implement derivatives and usage graph | P0 | M2 | S-0064 | 3 | 16 | Admin | Medium | Planned |
| T-0128 | S-0064 | Task | Admin, Media & Operations UX | Implement responsive UI and interaction for: Implement derivatives and usage graph | P0 | M2 | T-0127 | 3 | 16 | Admin | Medium | Planned |
| ST-0064 | T-0128 | Subtask | Admin, Media & Operations UX | Add accessibility, analytics and automated tests for: Implement derivatives and usage graph | P0 | M2 | T-0128 | 2 | 8 | Admin | Medium | Planned |
| F-0033 | E-0011 | Feature | NoLimits Command Center, Media & Operations UX | Audit and settings | P0 | M2 | ST-0064 | 16 | 80 | Admin | Medium | Planned |
| S-0065 | F-0033 | Story | NoLimits Command Center, Media & Operations UX | Implement audit explorer | P0 | M2 | F-0033 | 8 | 40 | Admin | Medium | Planned |
| T-0129 | S-0065 | Task | Admin, Media & Operations UX | Implement data/API and state contract for: Implement audit explorer | P0 | M2 | S-0065 | 3 | 16 | Admin | Medium | Planned |
| T-0130 | S-0065 | Task | Admin, Media & Operations UX | Implement responsive UI and interaction for: Implement audit explorer | P0 | M2 | T-0129 | 3 | 16 | Admin | Medium | Planned |
| ST-0065 | T-0130 | Subtask | Admin, Media & Operations UX | Add accessibility, analytics and automated tests for: Implement audit explorer | P0 | M2 | T-0130 | 2 | 8 | Admin | Medium | Planned |
| S-0066 | F-0033 | Story | NoLimits Command Center, Media & Operations UX | Implement governed settings | P0 | M2 | ST-0065 | 8 | 40 | Admin | Medium | Planned |
| T-0131 | S-0066 | Task | Admin, Media & Operations UX | Implement data/API and state contract for: Implement governed settings | P0 | M2 | S-0066 | 3 | 16 | Admin | Medium | Planned |
| T-0132 | S-0066 | Task | Admin, Media & Operations UX | Implement responsive UI and interaction for: Implement governed settings | P0 | M2 | T-0131 | 3 | 16 | Admin | Medium | Planned |
| ST-0066 | T-0132 | Subtask | Admin, Media & Operations UX | Add accessibility, analytics and automated tests for: Implement governed settings | P0 | M2 | T-0132 | 2 | 8 | Admin | Medium | Planned |
| E-0012 |  | Epic | Private AI Platform & Jarvis | Private AI Platform & Jarvis | P1 | M4 | E-0011 | 48 | 240 | AI | Medium | Planned |
| F-0034 | E-0012 | Feature | Private AI Platform & Jarvis | Jarvis orchestration and security | P1 | M4 | E-0012 | 16 | 80 | AI | High | Planned |
| S-0067 | F-0034 | Story | Private AI Platform & Jarvis | Implement private Jarvis tool registry and three operating modes | P1 | M4 | F-0034 | 8 | 40 | AI | Medium | Planned |
| T-0133 | S-0067 | Task | Private AI Platform & Jarvis | Implement secure orchestration/backend for: Implement prompt/tool registry | P1 | M4 | S-0067 | 3 | 16 | AI | Medium | Planned |
| T-0134 | S-0067 | Task | Private AI Platform & Jarvis | Implement Command Center Jarvis interaction and impact preview | P1 | M4 | T-0133 | 3 | 16 | AI | Medium | Planned |
| ST-0067 | T-0134 | Subtask | Private AI Platform & Jarvis | Add evals, telemetry and failure tests for: Implement prompt/tool registry | P1 | M4 | T-0134 | 2 | 8 | AI | Medium | Planned |
| S-0068 | F-0034 | Story | Private AI Platform & Jarvis | Implement provenance and eval harness | P1 | M4 | ST-0067 | 8 | 40 | AI | Medium | Planned |
| T-0135 | S-0068 | Task | Private AI Platform & Jarvis | Implement private orchestration backend for provenance and eval | P1 | M4 | S-0068 | 3 | 16 | AI | Medium | Planned |
| T-0136 | S-0068 | Task | Private AI Platform & Jarvis | Implement Command Center evaluation workflow | P1 | M4 | T-0135 | 3 | 16 | AI | Medium | Planned |
| ST-0068 | T-0136 | Subtask | Private AI Platform & Jarvis | Verify provenance, eval telemetry and failure handling | P1 | M4 | T-0136 | 2 | 8 | AI | Medium | Planned |
| F-0035 | E-0012 | Feature | Private AI Platform & Jarvis | Jarvis read and draft capabilities | P1 | M4 | ST-0068 | 16 | 80 | AI | Medium | Planned |
| S-0069 | F-0035 | Story | Private AI Platform & Jarvis | Implement Andrea-scoped retrieval and memory | P1 | M4 | F-0035 | 8 | 40 | AI | Medium | Planned |
| T-0137 | S-0069 | Task | Private AI Platform & Jarvis | Implement private retrieval and memory boundaries | P1 | M4 | S-0069 | 3 | 16 | AI | Medium | Planned |
| T-0138 | S-0069 | Task | Private AI Platform & Jarvis | Implement Andrea-only retrieval experience | P1 | M4 | T-0137 | 3 | 16 | AI | Medium | Planned |
| ST-0069 | T-0138 | Subtask | Private AI Platform & Jarvis | Verify retrieval isolation and memory controls | P1 | M4 | T-0138 | 2 | 8 | AI | Medium | Planned |
| S-0070 | F-0035 | Story | Private AI Platform & Jarvis | Implement preview, approval and audited execution workflows | P1 | M4 | ST-0069 | 8 | 40 | AI | Medium | Planned |
| T-0139 | S-0070 | Task | Private AI Platform & Jarvis | Implement approval-gated Jarvis execution backend | P1 | M4 | S-0070 | 3 | 16 | AI | Medium | Planned |
| T-0140 | S-0070 | Task | Private AI Platform & Jarvis | Implement Command Center preview and approval workflow | P1 | M4 | T-0139 | 3 | 16 | AI | Medium | Planned |
| ST-0070 | T-0140 | Subtask | Private AI Platform & Jarvis | Verify approval boundaries and irreversible-action blocks | P1 | M4 | T-0140 | 2 | 8 | AI | Medium | Planned |
| F-0036 | E-0012 | Feature | Private AI Platform & Jarvis | Jarvis specialized tools | P1 | M4 | ST-0070 | 16 | 80 | AI | Medium | Planned |
| S-0071 | F-0036 | Story | Private AI Platform & Jarvis | Integrate Catalog, Media, SEO, Newsletter and CRM tools | P1 | M4 | F-0036 | 8 | 40 | AI | Medium | Planned |
| T-0141 | S-0071 | Task | Private AI Platform & Jarvis | Implement private Jarvis tool adapters | P1 | M4 | S-0071 | 3 | 16 | AI | Medium | Planned |
| T-0142 | S-0071 | Task | Private AI Platform & Jarvis | Implement Command Center tool workflows | P1 | M4 | T-0141 | 3 | 16 | AI | Medium | Planned |
| ST-0071 | T-0142 | Subtask | Private AI Platform & Jarvis | Verify specialized tool permissions and regressions | P1 | M4 | T-0142 | 2 | 8 | AI | Medium | Planned |
| S-0072 | F-0036 | Story | Private AI Platform & Jarvis | Implement AI monitoring and fallback | P1 | M4 | ST-0071 | 8 | 40 | AI | Medium | Planned |
| T-0143 | S-0072 | Task | Private AI Platform & Jarvis | Implement private AI monitoring and kill switch | P1 | M4 | S-0072 | 3 | 16 | AI | Medium | Planned |
| T-0144 | S-0072 | Task | Private AI Platform & Jarvis | Implement Command Center AI health and recovery views | P1 | M4 | T-0143 | 3 | 16 | AI | Medium | Planned |
| ST-0072 | T-0144 | Subtask | Private AI Platform & Jarvis | Verify AI monitoring, fallback and operator recovery | P1 | M4 | T-0144 | 2 | 8 | AI | Medium | Planned |
| E-0013 |  | Epic | Security, Privacy & Engineering Operations | Security, Privacy & Engineering Operations | P0 | M1 | E-0012 | 63 | 312 | Operations | High | Planned |
| F-0037 | E-0013 | Feature | Security, Privacy & Engineering Operations | Application security | P0 | M1 | E-0013 | 21 | 104 | Operations | High | Planned |
| S-0073 | F-0037 | Story | Security, Privacy & Engineering Operations | Implement secure defaults and threat controls | P0 | M1 | F-0037 | 8 | 40 | Operations | Medium | Planned |
| T-0145 | S-0073 | Task | Security, Privacy & Engineering Operations | Implement service, data and security controls for: Implement secure defaults and threat controls | P0 | M1 | S-0073 | 3 | 16 | Operations | Medium | Planned |
| T-0146 | S-0073 | Task | Security, Privacy & Engineering Operations | Integrate end-to-end workflow for: Implement secure defaults and threat controls | P0 | M1 | T-0145 | 3 | 16 | Operations | Medium | Planned |
| ST-0073 | T-0146 | Subtask | Security, Privacy & Engineering Operations | Add automated tests, observability and runbook for: Implement secure defaults and threat controls | P0 | M1 | T-0146 | 2 | 8 | Operations | Medium | Planned |
| S-0074 | F-0037 | Story | Security, Privacy & Engineering Operations | Implement secrets and dependency security | P0 | M1 | ST-0073 | 13 | 64 | Operations | High | Planned |
| T-0147 | S-0074 | Task | Security, Privacy & Engineering Operations | Implement service, data and security controls for: Implement secrets and dependency security | P0 | M1 | S-0074 | 5 | 24 | Operations | High | Planned |
| T-0148 | S-0074 | Task | Security, Privacy & Engineering Operations | Integrate end-to-end workflow for: Implement secrets and dependency security | P0 | M1 | T-0147 | 5 | 24 | Operations | High | Planned |
| ST-0074 | T-0148 | Subtask | Security, Privacy & Engineering Operations | Add automated tests, observability and runbook for: Implement secrets and dependency security | P0 | M1 | T-0148 | 3 | 16 | Operations | Medium | Planned |
| F-0038 | E-0013 | Feature | Security, Privacy & Engineering Operations | Reliability and recovery | P0 | M1 | ST-0074 | 21 | 104 | Operations | Medium | Planned |
| S-0075 | F-0038 | Story | Security, Privacy & Engineering Operations | Implement cloud and PC Worker observability and alerting | P0 | M1 | F-0038 | 8 | 40 | Operations | Medium | Planned |
| T-0149 | S-0075 | Task | Security, Privacy & Engineering Operations | Implement architecture and controls for: Implement cloud and PC Worker observability and alerting | P0 | M1 | S-0075 | 3 | 16 | Operations | Medium | Planned |
| T-0150 | S-0075 | Task | Security, Privacy & Engineering Operations | Integrate end-to-end workflow for: Implement cloud and PC Worker observability and alerting | P0 | M1 | T-0149 | 3 | 16 | Operations | Medium | Planned |
| ST-0075 | T-0150 | Subtask | Security, Privacy & Engineering Operations | Verify accessibility, performance, observability and traceability for: Implement cloud and PC Worker observability and alerting | P0 | M1 | T-0150 | 2 | 8 | Operations | Medium | Planned |
| S-0076 | F-0038 | Story | Security, Privacy & Engineering Operations | Implement backup, restore and disaster drills | P0 | M1 | ST-0075 | 13 | 64 | Operations | High | Planned |
| T-0151 | S-0076 | Task | Security, Privacy & Engineering Operations | Implement service, data and security controls for: Implement backup, restore and disaster drills | P0 | M1 | S-0076 | 5 | 24 | Operations | High | Planned |
| T-0152 | S-0076 | Task | Security, Privacy & Engineering Operations | Integrate end-to-end workflow for: Implement backup, restore and disaster drills | P0 | M1 | T-0151 | 5 | 24 | Operations | High | Planned |
| ST-0076 | T-0152 | Subtask | Security, Privacy & Engineering Operations | Add automated tests, observability and runbook for: Implement backup, restore and disaster drills | P0 | M1 | T-0152 | 3 | 16 | Operations | Medium | Planned |
| F-0039 | E-0013 | Feature | Security, Privacy & Engineering Operations | CI/CD and release governance | P0 | M1 | ST-0076 | 21 | 104 | Operations | High | Planned |
| S-0077 | F-0039 | Story | Security, Privacy & Engineering Operations | Build GitHub-to-Vercel/Supabase staged deployment pipeline | P0 | M1 | F-0039 | 13 | 64 | Operations | High | Planned |
| T-0153 | S-0077 | Task | Security, Privacy & Engineering Operations | Implement architecture and controls for: Build GitHub-to-Vercel/Supabase staged deployment pipeline | P0 | M1 | S-0077 | 5 | 24 | Operations | High | Planned |
| T-0154 | S-0077 | Task | Security, Privacy & Engineering Operations | Integrate end-to-end workflow for: Build GitHub-to-Vercel/Supabase staged deployment pipeline | P0 | M1 | T-0153 | 5 | 24 | Operations | High | Planned |
| ST-0077 | T-0154 | Subtask | Security, Privacy & Engineering Operations | Verify accessibility, performance, observability and traceability for: Build GitHub-to-Vercel/Supabase staged deployment pipeline | P0 | M1 | T-0154 | 3 | 16 | Operations | Medium | Planned |
| S-0078 | F-0039 | Story | Security, Privacy & Engineering Operations | Implement feature flags and rollback | P0 | M1 | ST-0077 | 8 | 40 | Operations | Medium | Planned |
| T-0155 | S-0078 | Task | Security, Privacy & Engineering Operations | Implement service, data and security controls for: Implement feature flags and rollback | P0 | M1 | S-0078 | 3 | 16 | Operations | Medium | Planned |
| T-0156 | S-0078 | Task | Security, Privacy & Engineering Operations | Integrate end-to-end workflow for: Implement feature flags and rollback | P0 | M1 | T-0155 | 3 | 16 | Operations | Medium | Planned |
| ST-0078 | T-0156 | Subtask | Security, Privacy & Engineering Operations | Add automated tests, observability and runbook for: Implement feature flags and rollback | P0 | M1 | T-0156 | 2 | 8 | Operations | Medium | Planned |
| E-0014 |  | Epic | Phase 1 Launch | Phase 1 Launch | P0 | M4 | E-0013 | 50 | 248 | Launch | High | Planned |
| F-0040 | E-0014 | Feature | Phase 1 Launch | Content and SEO readiness | P0 | M4 | E-0014 | 13 | 64 | Launch | Medium | Planned |
| S-0079 | F-0040 | Story | Phase 1 Launch | Complete content inventory and migration | P0 | M4 | F-0040 | 5 | 24 | Launch | Medium | Planned |
| T-0157 | S-0079 | Task | Phase 1 Launch | Implement service, data and security controls for: Complete content inventory and migration | P0 | M4 | S-0079 | 2 | 8 | Launch | Medium | Planned |
| T-0158 | S-0079 | Task | Phase 1 Launch | Integrate end-to-end workflow for: Complete content inventory and migration | P0 | M4 | T-0157 | 2 | 8 | Launch | Medium | Planned |
| ST-0079 | T-0158 | Subtask | Phase 1 Launch | Add automated tests, observability and runbook for: Complete content inventory and migration | P0 | M4 | T-0158 | 1 | 8 | Launch | Medium | Planned |
| S-0080 | F-0040 | Story | Phase 1 Launch | Complete redirects, sitemap and structured data | P0 | M4 | ST-0079 | 8 | 40 | Launch | Medium | Planned |
| T-0159 | S-0080 | Task | Phase 1 Launch | Implement service, data and security controls for: Complete redirects, sitemap and structured data | P0 | M4 | S-0080 | 3 | 16 | Launch | Medium | Planned |
| T-0160 | S-0080 | Task | Phase 1 Launch | Integrate end-to-end workflow for: Complete redirects, sitemap and structured data | P0 | M4 | T-0159 | 3 | 16 | Launch | Medium | Planned |
| ST-0080 | T-0160 | Subtask | Phase 1 Launch | Add automated tests, observability and runbook for: Complete redirects, sitemap and structured data | P0 | M4 | T-0160 | 2 | 8 | Launch | Medium | Planned |
| F-0041 | E-0014 | Feature | Phase 1 Launch | Quality and UAT | P0 | M4 | ST-0080 | 21 | 104 | Launch | Medium | Planned |
| S-0081 | F-0041 | Story | Phase 1 Launch | Execute end-to-end UAT | P0 | M4 | F-0041 | 8 | 40 | Launch | Medium | Planned |
| T-0161 | S-0081 | Task | Phase 1 Launch | Implement service, data and security controls for: Execute end-to-end UAT | P0 | M4 | S-0081 | 3 | 16 | Launch | Medium | Planned |
| T-0162 | S-0081 | Task | Phase 1 Launch | Integrate end-to-end workflow for: Execute end-to-end UAT | P0 | M4 | T-0161 | 3 | 16 | Launch | Medium | Planned |
| ST-0081 | T-0162 | Subtask | Phase 1 Launch | Add automated tests, observability and runbook for: Execute end-to-end UAT | P0 | M4 | T-0162 | 2 | 8 | Launch | Medium | Planned |
| S-0082 | F-0041 | Story | Phase 1 Launch | Execute security, accessibility and performance release gates | P0 | M4 | ST-0081 | 13 | 64 | Launch | High | Planned |
| T-0163 | S-0082 | Task | Phase 1 Launch | Implement service, data and security controls for: Execute security, accessibility and performance release gates | P0 | M4 | S-0082 | 5 | 24 | Launch | High | Planned |
| T-0164 | S-0082 | Task | Phase 1 Launch | Integrate end-to-end workflow for: Execute security, accessibility and performance release gates | P0 | M4 | T-0163 | 5 | 24 | Launch | High | Planned |
| ST-0082 | T-0164 | Subtask | Phase 1 Launch | Add automated tests, observability and runbook for: Execute security, accessibility and performance release gates | P0 | M4 | T-0164 | 3 | 16 | Launch | Medium | Planned |
| F-0042 | E-0014 | Feature | Phase 1 Launch | Release and stabilization | P0 | M4 | ST-0082 | 16 | 80 | Launch | High | Planned |
| S-0083 | F-0042 | Story | Phase 1 Launch | Execute production launch and rollback rehearsal | P0 | M4 | F-0042 | 8 | 40 | Launch | Medium | Planned |
| T-0165 | S-0083 | Task | Phase 1 Launch | Implement service, data and security controls for: Execute production launch and rollback rehearsal | P0 | M4 | S-0083 | 3 | 16 | Launch | Medium | Planned |
| T-0166 | S-0083 | Task | Phase 1 Launch | Integrate end-to-end workflow for: Execute production launch and rollback rehearsal | P0 | M4 | T-0165 | 3 | 16 | Launch | Medium | Planned |
| ST-0083 | T-0166 | Subtask | Phase 1 Launch | Add automated tests, observability and runbook for: Execute production launch and rollback rehearsal | P0 | M4 | T-0166 | 2 | 8 | Launch | Medium | Planned |
| S-0084 | F-0042 | Story | Phase 1 Launch | Operate launch support window | P0 | M4 | ST-0083 | 8 | 40 | Launch | Medium | Planned |
| T-0167 | S-0084 | Task | Phase 1 Launch | Implement service, data and security controls for: Operate launch support window | P0 | M4 | S-0084 | 3 | 16 | Launch | Medium | Planned |
| T-0168 | S-0084 | Task | Phase 1 Launch | Integrate end-to-end workflow for: Operate launch support window | P0 | M4 | T-0167 | 3 | 16 | Launch | Medium | Planned |
| ST-0084 | T-0168 | Subtask | Phase 1 Launch | Add automated tests, observability and runbook for: Operate launch support window | P0 | M4 | T-0168 | 2 | 8 | Launch | Medium | Planned |
| E-0015 |  | Epic | STL Quote Automation — Phase 2 | STL Quote Automation — Phase 2 | P2 | M5 | E-0014 | 63 | 312 | STL F2 | Medium | Planned |
| F-0043 | E-0015 | Feature | STL Quote Automation — Phase 2 | Geometry analysis | P2 | M5 | E-0015 | 21 | 104 | STL F2 | Medium | Planned |
| S-0085 | F-0043 | Story | STL Quote Automation — Phase 2 | Build sandboxed STL analysis pipeline | P2 | M5 | F-0043 | 13 | 64 | STL F2 | High | Planned |
| T-0169 | S-0085 | Task | STL Quote Automation — Phase 2 | Implement secure orchestration/backend for: Build sandboxed STL analysis pipeline | P2 | M5 | S-0085 | 5 | 24 | STL F2 | High | Planned |
| T-0170 | S-0085 | Task | STL Quote Automation — Phase 2 | Implement operator/customer workflow for: Build sandboxed STL analysis pipeline | P2 | M5 | T-0169 | 5 | 24 | STL F2 | High | Planned |
| ST-0085 | T-0170 | Subtask | STL Quote Automation — Phase 2 | Add evals, telemetry and failure tests for: Build sandboxed STL analysis pipeline | P2 | M5 | T-0170 | 3 | 16 | STL F2 | Medium | Planned |
| S-0086 | F-0043 | Story | STL Quote Automation — Phase 2 | Build analysis review experience | P2 | M5 | ST-0085 | 8 | 40 | STL F2 | Medium | Planned |
| T-0171 | S-0086 | Task | STL Quote Automation — Phase 2 | Implement secure orchestration/backend for: Build analysis review experience | P2 | M5 | S-0086 | 3 | 16 | STL F2 | Medium | Planned |
| T-0172 | S-0086 | Task | STL Quote Automation — Phase 2 | Implement operator/customer workflow for: Build analysis review experience | P2 | M5 | T-0171 | 3 | 16 | STL F2 | Medium | Planned |
| ST-0086 | T-0172 | Subtask | STL Quote Automation — Phase 2 | Add evals, telemetry and failure tests for: Build analysis review experience | P2 | M5 | T-0172 | 2 | 8 | STL F2 | Medium | Planned |
| F-0044 | E-0015 | Feature | STL Quote Automation — Phase 2 | Slicing and pricing | P2 | M5 | ST-0086 | 26 | 128 | STL F2 | Medium | Planned |
| S-0087 | F-0044 | Story | STL Quote Automation — Phase 2 | Integrate versioned slicer jobs on PC Server Compute Worker | P2 | M5 | F-0044 | 13 | 64 | STL F2 | High | Planned |
| T-0173 | S-0087 | Task | STL Quote Automation — Phase 2 | Complete PC Compute Worker hardening before slicer activation | P2 | M5 | S-0087 | 5 | 24 | STL F2 | High | Planned |
| T-0174 | S-0087 | Task | STL Quote Automation — Phase 2 | Integrate versioned slicer jobs after hardening gate | P2 | M5 | T-0173 | 5 | 24 | STL F2 | High | Planned |
| ST-0087 | T-0174 | Subtask | STL Quote Automation — Phase 2 | Verify worker security, resilience and traceability | P2 | M5 | T-0174 | 3 | 16 | STL F2 | Medium | Planned |
| S-0088 | F-0044 | Story | STL Quote Automation — Phase 2 | Implement transparent pricing engine | P2 | M5 | ST-0087 | 13 | 64 | STL F2 | High | Planned |
| T-0175 | S-0088 | Task | STL Quote Automation — Phase 2 | Implement secure orchestration/backend for: Implement transparent pricing engine | P2 | M5 | S-0088 | 5 | 24 | STL F2 | High | Planned |
| T-0176 | S-0088 | Task | STL Quote Automation — Phase 2 | Implement operator/customer workflow for: Implement transparent pricing engine | P2 | M5 | T-0175 | 5 | 24 | STL F2 | High | Planned |
| ST-0088 | T-0176 | Subtask | STL Quote Automation — Phase 2 | Add evals, telemetry and failure tests for: Implement transparent pricing engine | P2 | M5 | T-0176 | 3 | 16 | STL F2 | Medium | Planned |
| F-0045 | E-0015 | Feature | STL Quote Automation — Phase 2 | Human review and handoff | P2 | M5 | ST-0088 | 16 | 80 | STL F2 | Medium | Planned |
| S-0089 | F-0045 | Story | STL Quote Automation — Phase 2 | Build Andrea review console | P2 | M5 | F-0045 | 8 | 40 | STL F2 | Medium | Planned |
| T-0177 | S-0089 | Task | STL Quote Automation — Phase 2 | Implement secure orchestration/backend for: Build Andrea review console | P2 | M5 | S-0089 | 3 | 16 | STL F2 | Medium | Planned |
| T-0178 | S-0089 | Task | STL Quote Automation — Phase 2 | Implement operator/customer workflow for: Build Andrea review console | P2 | M5 | T-0177 | 3 | 16 | STL F2 | Medium | Planned |
| ST-0089 | T-0178 | Subtask | STL Quote Automation — Phase 2 | Add evals, telemetry and failure tests for: Build Andrea review console | P2 | M5 | T-0178 | 2 | 8 | STL F2 | Medium | Planned |
| S-0090 | F-0045 | Story | STL Quote Automation — Phase 2 | Create accepted quote production handoff | P2 | M5 | ST-0089 | 8 | 40 | STL F2 | Medium | Planned |
| T-0179 | S-0090 | Task | STL Quote Automation — Phase 2 | Implement secure orchestration/backend for: Create accepted quote production handoff | P2 | M5 | S-0090 | 3 | 16 | STL F2 | Medium | Planned |
| T-0180 | S-0090 | Task | STL Quote Automation — Phase 2 | Implement operator/customer workflow for: Create accepted quote production handoff | P2 | M5 | T-0179 | 3 | 16 | STL F2 | Medium | Planned |
| ST-0090 | T-0180 | Subtask | STL Quote Automation — Phase 2 | Add evals, telemetry and failure tests for: Create accepted quote production handoff | P2 | M5 | T-0180 | 2 | 8 | STL F2 | Medium | Planned |
| E-0016 |  | Epic | PrintFlow & Future Integrations | PrintFlow & Future Integrations | P2 | M6 | E-0015 | 50 | 248 | Future | Medium | Planned |
| F-0046 | E-0016 | Feature | PrintFlow & Future Integrations | PrintFlow Coming Soon | P2 | M6 | E-0016 | 13 | 64 | Future | Medium | Planned |
| S-0091 | F-0046 | Story | PrintFlow & Future Integrations | Publish truthful Coming Soon page | P2 | M6 | F-0046 | 5 | 24 | Future | Medium | Planned |
| T-0181 | S-0091 | Task | PrintFlow & Future Integrations | Implement service, data and security controls for: Publish truthful Coming Soon page | P2 | M6 | S-0091 | 2 | 8 | Future | Medium | Planned |
| T-0182 | S-0091 | Task | PrintFlow & Future Integrations | Integrate end-to-end workflow for: Publish truthful Coming Soon page | P2 | M6 | T-0181 | 2 | 8 | Future | Medium | Planned |
| ST-0091 | T-0182 | Subtask | PrintFlow & Future Integrations | Add automated tests, observability and runbook for: Publish truthful Coming Soon page | P2 | M6 | T-0182 | 1 | 8 | Future | Medium | Planned |
| S-0092 | F-0046 | Story | PrintFlow & Future Integrations | Gate release downloads | P2 | M6 | ST-0091 | 8 | 40 | Future | Medium | Planned |
| T-0183 | S-0092 | Task | PrintFlow & Future Integrations | Implement service, data and security controls for: Gate release downloads | P2 | M6 | S-0092 | 3 | 16 | Future | Medium | Planned |
| T-0184 | S-0092 | Task | PrintFlow & Future Integrations | Integrate end-to-end workflow for: Gate release downloads | P2 | M6 | T-0183 | 3 | 16 | Future | Medium | Planned |
| ST-0092 | T-0184 | Subtask | PrintFlow & Future Integrations | Add automated tests, observability and runbook for: Gate release downloads | P2 | M6 | T-0184 | 2 | 8 | Future | Medium | Planned |
| F-0047 | E-0016 | Feature | PrintFlow & Future Integrations | Integration discovery | P2 | M6 | ST-0092 | 21 | 104 | Future | Medium | Planned |
| S-0093 | F-0047 | Story | PrintFlow & Future Integrations | Define future PrintFlow contract adapter | P2 | M6 | F-0047 | 8 | 40 | Future | Medium | Planned |
| T-0185 | S-0093 | Task | PrintFlow & Future Integrations | Implement service, data and security controls for: Define future PrintFlow contract adapter | P2 | M6 | S-0093 | 3 | 16 | Future | Medium | Planned |
| T-0186 | S-0093 | Task | PrintFlow & Future Integrations | Integrate end-to-end workflow for: Define future PrintFlow contract adapter | P2 | M6 | T-0185 | 3 | 16 | Future | Medium | Planned |
| ST-0093 | T-0186 | Subtask | PrintFlow & Future Integrations | Add automated tests, observability and runbook for: Define future PrintFlow contract adapter | P2 | M6 | T-0186 | 2 | 8 | Future | Medium | Planned |
| S-0094 | F-0047 | Story | PrintFlow & Future Integrations | Run security and data discovery | P2 | M6 | ST-0093 | 13 | 64 | Future | High | Planned |
| T-0187 | S-0094 | Task | PrintFlow & Future Integrations | Implement service, data and security controls for: Run security and data discovery | P2 | M6 | S-0094 | 5 | 24 | Future | High | Planned |
| T-0188 | S-0094 | Task | PrintFlow & Future Integrations | Integrate end-to-end workflow for: Run security and data discovery | P2 | M6 | T-0187 | 5 | 24 | Future | High | Planned |
| ST-0094 | T-0188 | Subtask | PrintFlow & Future Integrations | Add automated tests, observability and runbook for: Run security and data discovery | P2 | M6 | T-0188 | 3 | 16 | Future | Medium | Planned |
| F-0048 | E-0016 | Feature | PrintFlow & Future Integrations | Future platform readiness | P2 | M6 | ST-0094 | 16 | 80 | Future | Medium | Planned |
| S-0095 | F-0048 | Story | PrintFlow & Future Integrations | Implement advanced payment providers and fulfillment automation | P2 | M6 | F-0048 | 8 | 40 | Future | Medium | Planned |
| T-0189 | S-0095 | Task | PrintFlow & Future Integrations | Evaluate advanced payment, wallet and fulfillment providers | P2 | M6 | S-0095 | 3 | 16 | Future | Medium | Planned |
| T-0190 | S-0095 | Task | PrintFlow & Future Integrations | Integrate approved advanced provider behind payment adapter | P2 | M6 | T-0189 | 3 | 16 | Future | Medium | Planned |
| ST-0095 | T-0190 | Subtask | PrintFlow & Future Integrations | Verify accessibility, performance, observability and traceability for: Implement approved direct-commerce payment and checkout details | P2 | M6 | T-0190 | 2 | 8 | Future | Medium | Planned |
| S-0096 | F-0048 | Story | PrintFlow & Future Integrations | Evaluate external marketplace/API opportunities | P2 | M6 | ST-0095 | 8 | 40 | Future | Medium | Planned |
| T-0191 | S-0096 | Task | PrintFlow & Future Integrations | Implement service, data and security controls for: Evaluate external marketplace/API opportunities | P2 | M6 | S-0096 | 3 | 16 | Future | Medium | Planned |
| T-0192 | S-0096 | Task | PrintFlow & Future Integrations | Integrate end-to-end workflow for: Evaluate external marketplace/API opportunities | P2 | M6 | T-0191 | 3 | 16 | Future | Medium | Planned |
| ST-0096 | T-0192 | Subtask | PrintFlow & Future Integrations | Add automated tests, observability and runbook for: Evaluate external marketplace/API opportunities | P2 | M6 | T-0192 | 2 | 8 | Future | Medium | Planned |
| S-0097 | F-0003 | Story | Documentation Governance & Frozen Baseline | Complete React/Vite versus Next.js review gate | P0 | M0 | ST-0006 | 8 | 40 | Architecture | High | Planned |
| T-0193 | S-0097 | Task | Documentation Governance & Frozen Baseline | Build comparable React/Vite and Next.js architecture prototypes | P0 | M0 | S-0097 | 3 | 16 | Architecture | High | Planned |
| T-0194 | S-0097 | Task | Documentation Governance & Frozen Baseline | Approve final frontend architecture ADR and update baseline | P0 | M0 | T-0193 | 3 | 16 | CTO | High | Planned |
| ST-0097 | T-0194 | Subtask | Documentation Governance & Frozen Baseline | Verify review gate traceability and baseline readiness | P0 | M0 | T-0194 | 2 | 8 | Quality | Medium | Planned |
| F-0049 | E-0005 | Feature | Catalog & Product Discovery | Phase 1 controlled commerce | P0 | M3 | ST-0030 | 34 | 168 | Commerce | High | Planned |
| S-0098 | F-0049 | Story | Catalog & Product Discovery | Implement cart and order creation by commercial mode | P0 | M3 | F-0049 | 13 | 64 | Commerce | High | Planned |
| T-0195 | S-0098 | Task | Catalog & Product Discovery | Implement cart/order domain, data, RLS and Edge Function contracts | P0 | M3 | S-0098 | 5 | 24 | Commerce | High | Planned |
| T-0196 | S-0098 | Task | Catalog & Product Discovery | Implement cart, checkout and admin-confirmation UX | P0 | M3 | T-0195 | 5 | 24 | Frontend | Medium | Planned |
| ST-0098 | T-0196 | Subtask | Catalog & Product Discovery | Test cart/order accessibility, policy and analytics | P0 | M3 | T-0196 | 3 | 16 | Quality | Medium | Planned |
| S-0099 | F-0049 | Story | Catalog & Product Discovery | Implement controlled Phase 1 payment methods | P0 | M3 | ST-0098 | 13 | 64 | Commerce | High | Planned |
| T-0197 | S-0099 | Task | Catalog & Product Discovery | Implement payment policy, intents and reconciliation | P0 | M3 | S-0099 | 5 | 24 | Backend | High | Planned |
| T-0198 | S-0099 | Task | Catalog & Product Discovery | Implement payment selection, instructions and status UX | P0 | M3 | T-0197 | 5 | 24 | Frontend | Medium | Planned |
| ST-0099 | T-0198 | Subtask | Catalog & Product Discovery | Verify payment security, reconciliation and operator workflow | P0 | M3 | T-0198 | 3 | 16 | Quality | High | Planned |
| S-0100 | F-0007 | Story | Design System & Frontend Foundation | Approve Brand Asset Gate and production identity | P0 | M0 | F-0007 | 8 | 40 | Brand | High | Planned |
| T-0199 | S-0100 | Task | Design System & Frontend Foundation | Define and prepare: Approve Brand Asset Gate and production identity | P0 | M0 | S-0100 | 3 | 16 | Brand | High | Planned |
| T-0200 | S-0100 | Task | Design System & Frontend Foundation | Implement and integrate: Approve Brand Asset Gate and production identity | P0 | M0 | T-0199 | 3 | 16 | Brand | High | Planned |
| ST-0100 | T-0200 | Subtask | Design System & Frontend Foundation | Verify and evidence: Approve Brand Asset Gate and production identity | P0 | M0 | T-0200 | 2 | 8 | Quality | High | Planned |
| S-0101 | F-0010 | Story | Public Web & Content | Implement intent-led Homepage and six customer paths | P0 | M2 | ST-0100 | 8 | 40 | Frontend/UX | High | Planned |
| T-0201 | S-0101 | Task | Public Web & Content | Define and prepare: Implement intent-led Homepage and six customer paths | P0 | M2 | S-0101 | 3 | 16 | Frontend/UX | High | Planned |
| T-0202 | S-0101 | Task | Public Web & Content | Implement and integrate: Implement intent-led Homepage and six customer paths | P0 | M2 | T-0201 | 3 | 16 | Frontend/UX | High | Planned |
| ST-0101 | T-0202 | Subtask | Public Web & Content | Verify and evidence: Implement intent-led Homepage and six customer paths | P0 | M2 | T-0202 | 2 | 8 | Quality | High | Planned |
| S-0102 | F-0011 | Story | Public Web & Content | Implement founder-led trust and About experience | P0 | M2 | ST-0101 | 8 | 40 | Content/UX | High | Planned |
| T-0203 | S-0102 | Task | Public Web & Content | Define and prepare: Implement founder-led trust and About experience | P0 | M2 | S-0102 | 3 | 16 | Content/UX | High | Planned |
| T-0204 | S-0102 | Task | Public Web & Content | Implement and integrate: Implement founder-led trust and About experience | P0 | M2 | T-0203 | 3 | 16 | Content/UX | High | Planned |
| ST-0102 | T-0204 | Subtask | Public Web & Content | Verify and evidence: Implement founder-led trust and About experience | P0 | M2 | T-0204 | 2 | 8 | Quality | High | Planned |
| S-0103 | F-0032 | Story | NoLimits Command Center, Media & Operations UX | Produce authentic media and evidence pipeline | P0 | M2 | ST-0102 | 8 | 40 | Brand/Media | High | Planned |
| T-0205 | S-0103 | Task | NoLimits Command Center, Media & Operations UX | Define and prepare: Produce authentic media and evidence pipeline | P0 | M2 | S-0103 | 3 | 16 | Brand/Media | High | Planned |
| T-0206 | S-0103 | Task | NoLimits Command Center, Media & Operations UX | Implement and integrate: Produce authentic media and evidence pipeline | P0 | M2 | T-0205 | 3 | 16 | Brand/Media | High | Planned |
| ST-0103 | T-0206 | Subtask | NoLimits Command Center, Media & Operations UX | Verify and evidence: Produce authentic media and evidence pipeline | P0 | M2 | T-0206 | 2 | 8 | Quality | High | Planned |
| S-0104 | F-0011 | Story | Public Web & Content | Build Realizzazioni, Ispirati and HueForge art journeys | P0 | M2 | ST-0103 | 8 | 40 | Content/UX | Medium | Planned |
| T-0207 | S-0104 | Task | Public Web & Content | Define and prepare: Build Realizzazioni, Ispirati and HueForge art journeys | P0 | M2 | S-0104 | 3 | 16 | Content/UX | Medium | Planned |
| T-0208 | S-0104 | Task | Public Web & Content | Implement and integrate: Build Realizzazioni, Ispirati and HueForge art journeys | P0 | M2 | T-0207 | 3 | 16 | Content/UX | Medium | Planned |
| ST-0104 | T-0208 | Subtask | Public Web & Content | Verify and evidence: Build Realizzazioni, Ispirati and HueForge art journeys | P0 | M2 | T-0208 | 2 | 8 | Quality | Medium | Planned |
| S-0105 | F-0040 | Story | Phase 1 Launch | Implement Home semantic and Local SEO architecture | P0 | M2 | ST-0104 | 8 | 40 | SEO/Content | High | Planned |
| T-0209 | S-0105 | Task | Phase 1 Launch | Define and prepare: Implement Home semantic and Local SEO architecture | P0 | M2 | S-0105 | 3 | 16 | SEO/Content | High | Planned |
| T-0210 | S-0105 | Task | Phase 1 Launch | Implement and integrate: Implement Home semantic and Local SEO architecture | P0 | M2 | T-0209 | 3 | 16 | SEO/Content | High | Planned |
| ST-0105 | T-0210 | Subtask | Phase 1 Launch | Verify and evidence: Implement Home semantic and Local SEO architecture | P0 | M2 | T-0210 | 2 | 8 | Quality | High | Planned |
| S-0106 | F-0009 | Story | Design System & Frontend Foundation | Validate Home accessibility, progressive enhancement and performance | P0 | M2 | ST-0105 | 8 | 40 | Quality/Frontend | High | Planned |
| T-0211 | S-0106 | Task | Design System & Frontend Foundation | Define and prepare: Validate Home accessibility, progressive enhancement and performance | P0 | M2 | S-0106 | 3 | 16 | Quality/Frontend | High | Planned |
| T-0212 | S-0106 | Task | Design System & Frontend Foundation | Implement and integrate: Validate Home accessibility, progressive enhancement and performance | P0 | M2 | T-0211 | 3 | 16 | Quality/Frontend | High | Planned |
| ST-0106 | T-0212 | Subtask | Design System & Frontend Foundation | Verify and evidence: Validate Home accessibility, progressive enhancement and performance | P0 | M2 | T-0212 | 2 | 8 | Quality | High | Planned |
| S-0107 | F-0030 | Story | Newsletter & CRM | Implement distinct CX funnel measurement | P1 | M3 | ST-0106 | 8 | 40 | Analytics/Product | Medium | Planned |
| T-0213 | S-0107 | Task | Newsletter & CRM | Define and prepare: Implement distinct CX funnel measurement | P1 | M3 | S-0107 | 3 | 16 | Analytics/Product | Medium | Planned |
| T-0214 | S-0107 | Task | Newsletter & CRM | Implement and integrate: Implement distinct CX funnel measurement | P1 | M3 | T-0213 | 3 | 16 | Analytics/Product | Medium | Planned |
| ST-0107 | T-0214 | Subtask | Newsletter & CRM | Verify and evidence: Implement distinct CX funnel measurement | P1 | M3 | T-0214 | 2 | 8 | Quality | Medium | Planned |
| S-0108 | F-0040 | Story | Phase 1 Launch | Complete founder-led copy and authentic content inventory | P0 | M2 | ST-0107 | 8 | 40 | Content/Brand | High | Planned |
| T-0215 | S-0108 | Task | Phase 1 Launch | Define and prepare: Complete founder-led copy and authentic content inventory | P0 | M2 | S-0108 | 3 | 16 | Content/Brand | High | Planned |
| T-0216 | S-0108 | Task | Phase 1 Launch | Implement and integrate: Complete founder-led copy and authentic content inventory | P0 | M2 | T-0215 | 3 | 16 | Content/Brand | High | Planned |
| ST-0108 | T-0216 | Subtask | Phase 1 Launch | Verify and evidence: Complete founder-led copy and authentic content inventory | P0 | M2 | T-0216 | 2 | 8 | Quality | High | Planned |
| S-0109 | F-0041 | Story | Phase 1 Launch | Run Brand, CX and Home usability acceptance | P0 | M2 | ST-0108 | 8 | 40 | Quality/UX | High | Planned |
| T-0217 | S-0109 | Task | Phase 1 Launch | Define and prepare: Run Brand, CX and Home usability acceptance | P0 | M2 | S-0109 | 3 | 16 | Quality/UX | High | Planned |
| T-0218 | S-0109 | Task | Phase 1 Launch | Implement and integrate: Run Brand, CX and Home usability acceptance | P0 | M2 | T-0217 | 3 | 16 | Quality/UX | High | Planned |
| ST-0109 | T-0218 | Subtask | Phase 1 Launch | Verify and evidence: Run Brand, CX and Home usability acceptance | P0 | M2 | T-0218 | 2 | 8 | Quality | High | Planned |
| F-0050 | E-0001 | Feature | Documentation Governance & Frozen Baseline | Operating system governance and release-candidate controls | P0 | M0 | ST-0109 | 56 | 280 | Governance/Architecture | High | In Progress |
| S-0110 | F-0050 | Story | Documentation Governance & Frozen Baseline | Codify DNA, invariants and negative requirements | P0 | M0 | F-0050 | 8 | 40 | Governance/Architecture | High | Done |
| T-0219 | S-0110 | Task | Documentation Governance & Frozen Baseline | Define and integrate Project DNA and invariants | P0 | M0 | S-0110 | 3 | 16 | Governance/Architecture | High | Done |
| T-0220 | S-0110 | Task | Documentation Governance & Frozen Baseline | Implement controls and evidence for Project DNA and invariants | P0 | M0 | T-0219 | 3 | 16 | Governance/Architecture | High | Done |
| ST-0110 | T-0220 | Subtask | Documentation Governance & Frozen Baseline | Review and trace Project DNA and invariants | P0 | M0 | T-0220 | 2 | 8 | Quality | High | Planned |
| S-0111 | F-0050 | Story | Documentation Governance & Frozen Baseline | Codify agent authority, stop conditions and Jarvis separation | P0 | M0 | ST-0110 | 8 | 40 | AI Governance | High | Done |
| T-0221 | S-0111 | Task | Documentation Governance & Frozen Baseline | Define and integrate AI Governance Charter and Development Contract | P0 | M0 | S-0111 | 3 | 16 | AI Governance | High | Done |
| T-0222 | S-0111 | Task | Documentation Governance & Frozen Baseline | Implement controls and evidence for AI Governance Charter and Development Contract | P0 | M0 | T-0221 | 3 | 16 | AI Governance | High | Done |
| ST-0111 | T-0222 | Subtask | Documentation Governance & Frozen Baseline | Review and trace AI Governance Charter and Development Contract | P0 | M0 | T-0222 | 2 | 8 | Quality | High | Planned |
| S-0112 | F-0050 | Story | Documentation Governance & Frozen Baseline | Map change classes to Product Owner, Architect, CR and ADR authority | P0 | M0 | ST-0111 | 8 | 40 | Governance | High | Done |
| T-0223 | S-0112 | Task | Documentation Governance & Frozen Baseline | Define and integrate Decision Authority Matrix | P0 | M0 | S-0112 | 3 | 16 | Governance | High | Done |
| T-0224 | S-0112 | Task | Documentation Governance & Frozen Baseline | Implement controls and evidence for Decision Authority Matrix | P0 | M0 | T-0223 | 3 | 16 | Governance | High | Done |
| ST-0112 | T-0224 | Subtask | Documentation Governance & Frozen Baseline | Review and trace Decision Authority Matrix | P0 | M0 | T-0224 | 2 | 8 | Quality | High | Planned |
| S-0113 | F-0050 | Story | Documentation Governance & Frozen Baseline | Define blocking architecture and phase-boundary gates | P0 | M0 | ST-0112 | 8 | 40 | Architecture/Quality | High | Done |
| T-0225 | S-0113 | Task | Documentation Governance & Frozen Baseline | Define and integrate Architecture Compliance Gates | P0 | M0 | S-0113 | 3 | 16 | Architecture/Quality | High | Done |
| T-0226 | S-0113 | Task | Documentation Governance & Frozen Baseline | Implement controls and evidence for Architecture Compliance Gates | P0 | M0 | T-0225 | 3 | 16 | Architecture/Quality | High | Done |
| ST-0113 | T-0226 | Subtask | Documentation Governance & Frozen Baseline | Review and trace Architecture Compliance Gates | P0 | M0 | T-0226 | 2 | 8 | Quality | High | Planned |
| S-0114 | F-0050 | Story | Documentation Governance & Frozen Baseline | Embed traceability and compliance in the development workflow | P0 | M0 | ST-0113 | 8 | 40 | Engineering | High | Done |
| T-0227 | S-0114 | Task | Documentation Governance & Frozen Baseline | Define and integrate Development Constitution | P0 | M0 | S-0114 | 3 | 16 | Engineering | High | Done |
| T-0228 | S-0114 | Task | Documentation Governance & Frozen Baseline | Implement controls and evidence for Development Constitution | P0 | M0 | T-0227 | 3 | 16 | Engineering | High | Done |
| ST-0114 | T-0228 | Subtask | Documentation Governance & Frozen Baseline | Review and trace Development Constitution | P0 | M0 | T-0228 | 2 | 8 | Quality | High | Planned |
| S-0115 | F-0050 | Story | Documentation Governance & Frozen Baseline | Automate invariant, Jarvis, PrintFlow and human-review regression checks | P0 | M0 | ST-0114 | 8 | 40 | Quality/Security | High | Planned |
| T-0229 | S-0115 | Task | Documentation Governance & Frozen Baseline | Define and integrate Negative requirement verification | P0 | M0 | S-0115 | 3 | 16 | Quality/Security | High | Planned |
| T-0230 | S-0115 | Task | Documentation Governance & Frozen Baseline | Implement controls and evidence for Negative requirement verification | P0 | M0 | T-0229 | 3 | 16 | Quality/Security | High | Planned |
| ST-0115 | T-0230 | Subtask | Documentation Governance & Frozen Baseline | Review and trace Negative requirement verification | P0 | M0 | T-0230 | 2 | 8 | Quality | High | Planned |
| S-0116 | F-0050 | Story | Documentation Governance & Frozen Baseline | Prepare evidence for Lead Architect and Product Owner review without freezing baseline | P0 | M0 | ST-0114 | 8 | 40 | Governance/Architecture | High | Done |
| T-0231 | S-0116 | Task | Documentation Governance & Frozen Baseline | Define and integrate Release-candidate architectural review pack | P0 | M0 | S-0116 | 3 | 16 | Governance/Architecture | High | Done |
| T-0232 | S-0116 | Task | Documentation Governance & Frozen Baseline | Implement controls and evidence for Release-candidate architectural review pack | P0 | M0 | T-0231 | 3 | 16 | Governance/Architecture | High | Done |
| ST-0116 | T-0232 | Subtask | Documentation Governance & Frozen Baseline | Review and trace Release-candidate architectural review pack | P0 | M0 | T-0232 | 2 | 8 | Quality | High | Planned |

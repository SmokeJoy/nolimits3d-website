# Project Atlas — NoLimits3D Documentation Bible v0.96

> **Document ID:** DOC-ROOT-002  
> **Versione:** 0.96.1
> **Stato:** Release Candidate  
> **Owner:** Project Governance  
> **Documentation Status:** RELEASE CANDIDATE  
> **Release Candidate Ready:** YES  
> **Frozen Baseline Ready:** NO

## Release

**Documentation Bible Final Consolidation & Jarvis Authoritative Boundary Release Candidate**

La v0.96 consolida la v0.95.4 senza introdurre nuove funzionalità. La progettazione dello scope di prodotto è conclusa; restano soltanto le condizioni nominate nel Release Candidate Report prima della Frozen Baseline v1.0.

La patch documentale v0.96.1 registra `INV-JARVIS-001` tramite `CR-0007` e `AD-012`; non autorizza implementazione, release o attivazione di Jarvis.

## Verità costituzionali

- il sito NoLimits3D è il centro dell’ecosistema;
- **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**
- PrintFlow resta `Coming Soon` nella fase corrente;
- ogni preventivo STL finale richiede revisione umana;
- nessun team, prova, capacità o stato può essere inventato;
- nessuna feature può entrare senza Owner Document, RTM, roadmap e processo di change.

## Percorso di lettura — nuovo CTO

1. [`000_PROJECT_CHARTER.md`](000_PROJECT_CHARTER.md)
2. [`00_Foundation/00_Project_Constitution.md`](00_Foundation/00_Project_Constitution.md)
3. [`01_Product/01_PRD.md`](01_Product/01_PRD.md)
4. [`02_Architecture/01_SDS.md`](02_Architecture/01_SDS.md)
5. [`12_Planning/01_ADR_Register.md`](12_Planning/01_ADR_Register.md)
6. [`13_Appendices/05_Release_Candidate_Report_v0.96.md`](13_Appendices/05_Release_Candidate_Report_v0.96.md)

## Percorso di lettura — senior developer

1. Constitution e ADR Register;
2. SDS, Domain Model, Frontend Architecture e Backend Service Design;
3. Developer Handbook, Testing Strategy e Architecture Compliance Gates;
4. Owner Document della feature assegnata;
5. RTM e roadmap item collegati.

## Percorso di lettura — agente AI

1. Project Charter;
2. Project Constitution, Invariants e Negative Requirements;
3. AI Collaboration Policy e Decision Authority Matrix;
4. Owner Document, requirement ID, roadmap task e ADR applicabili;
5. stop immediato in caso di conflitto, decisione mancante o scope fuori RTM.

## Stato e prossimi passi

- stato corrente: `RELEASE CANDIDATE`;
- Frozen Baseline: non ancora dichiarata;
- condizioni residue: frontend review, Brand Asset Gate, legal/privacy/quality promise, PC Worker hardening;
- progetto successivo raccomandato dopo accettazione RC: **Project Atlas — Development Blueprint**.

## Inventario documentale

### 000_GOVERNANCE
- [`000_GOVERNANCE/001_DOCUMENTATION_STANDARD.md`](000_GOVERNANCE/001_DOCUMENTATION_STANDARD.md) — 001 — Documentation Standard · `DOC-GOV-001`
- [`000_GOVERNANCE/002_VERSIONING_POLICY.md`](000_GOVERNANCE/002_VERSIONING_POLICY.md) — 002 — Versioning Policy · `DOC-GOV-002`
- [`000_GOVERNANCE/003_CHANGE_REQUEST_PROCESS.md`](000_GOVERNANCE/003_CHANGE_REQUEST_PROCESS.md) — 003 — Change Request Process · `DOC-GOV-003`
- [`000_GOVERNANCE/004_ADR_POLICY.md`](000_GOVERNANCE/004_ADR_POLICY.md) — 004 — ADR Policy · `DOC-GOV-004`
- [`000_GOVERNANCE/005_TRACEABILITY_STANDARD.md`](000_GOVERNANCE/005_TRACEABILITY_STANDARD.md) — 005 — Traceability Standard · `DOC-GOV-005`
- [`000_GOVERNANCE/006_DOCUMENT_LIFECYCLE.md`](000_GOVERNANCE/006_DOCUMENT_LIFECYCLE.md) — 006 — Document Lifecycle · `DOC-GOV-006`
- [`000_GOVERNANCE/007_QUALITY_GATES.md`](000_GOVERNANCE/007_QUALITY_GATES.md) — 007 — Documentation Quality Gates · `DOC-GOV-007`
- [`000_GOVERNANCE/008_AI_COLLABORATION_POLICY.md`](000_GOVERNANCE/008_AI_COLLABORATION_POLICY.md) — 008 — AI Collaboration Policy · `DOC-GOV-008`
- [`000_GOVERNANCE/009_AUDIT_PROCESS.md`](000_GOVERNANCE/009_AUDIT_PROCESS.md) — 009 — Documentation Audit Process · `DOC-GOV-009`
- [`000_GOVERNANCE/010_GOVERNANCE_GLOSSARY.md`](000_GOVERNANCE/010_GOVERNANCE_GLOSSARY.md) — 010 — Governance Glossary · `DOC-GOV-010`
- [`000_GOVERNANCE/011_OWNER_REGISTRY.md`](000_GOVERNANCE/011_OWNER_REGISTRY.md) — 011 — Owner Document Registry · `DOC-GOV-011`
- [`000_GOVERNANCE/012_DOCUMENTATION_CI_SPEC.md`](000_GOVERNANCE/012_DOCUMENTATION_CI_SPEC.md) — 012 — Documentation CI Specification · `DOC-GOV-012`

### 00_Foundation
- [`00_Foundation/00_Project_Constitution.md`](00_Foundation/00_Project_Constitution.md) — Project Constitution · `DOC-FND-001`
- [`00_Foundation/01_Vision_and_5Y_Strategy.md`](00_Foundation/01_Vision_and_5Y_Strategy.md) — Visione e strategia a cinque anni · `DOC-FND-005`
- [`00_Foundation/02_Glossary.md`](00_Foundation/02_Glossary.md) — Glossario e linguaggio condiviso · `DOC-FND-006`
- [`00_Foundation/03_Documentation_Governance.md`](00_Foundation/03_Documentation_Governance.md) — Governance della documentazione — indice applicativo · `DOC-FND-004`

### 01_Product
- [`01_Product/01_PRD.md`](01_Product/01_PRD.md) — Product Requirements Document · `DOC-PROD-001`
- [`01_Product/02_Personas_Journeys.md`](01_Product/02_Personas_Journeys.md) — Personas e Customer Journeys · `DOC-PROD-006`
- [`01_Product/03_Business_Rules.md`](01_Product/03_Business_Rules.md) — Business Rules · `DOC-PROD-003`
- [`01_Product/04_State_Machines.md`](01_Product/04_State_Machines.md) — State Machines · `DOC-PROD-004`
- [`01_Product/05_Marketplace_and_GoToMarket_Strategy.md`](01_Product/05_Marketplace_and_GoToMarket_Strategy.md) — Visione commerciale, Marketplace e Go-to-Market Strategy · `DOC-PROD-005`

### 02_Architecture
- [`02_Architecture/01_SDS.md`](02_Architecture/01_SDS.md) — Software Design Specification · `DOC-ARCH-001`
- [`02_Architecture/02_Domain_Model.md`](02_Architecture/02_Domain_Model.md) — Domain Model · `DOC-ARCH-002`
- [`02_Architecture/03_Integration_Architecture.md`](02_Architecture/03_Integration_Architecture.md) — Integration Architecture · `DOC-ARCH-009`
- [`02_Architecture/04_File_Storage_Strategy.md`](02_Architecture/04_File_Storage_Strategy.md) — File Storage Strategy · `DOC-ARCH-010`
- [`02_Architecture/05_Notification_System.md`](02_Architecture/05_Notification_System.md) — Notification System · `DOC-ARCH-011`
- [`02_Architecture/06_Error_Catalog.md`](02_Architecture/06_Error_Catalog.md) — Error Catalog · `DOC-ARCH-012`
- [`02_Architecture/07_Frontend_Architecture.md`](02_Architecture/07_Frontend_Architecture.md) — Frontend Architecture · `DOC-ARCH-007`
- [`02_Architecture/08_Backend_Service_Design.md`](02_Architecture/08_Backend_Service_Design.md) — Backend Service Design · `DOC-ARCH-008`

### 03_Design
- [`03_Design/01_Brand_Book.md`](03_Design/01_Brand_Book.md) — Brand Book · `DOC-DES-006`
- [`03_Design/02_Design_System.md`](03_Design/02_Design_System.md) — Design System · `DOC-DES-002`
- [`03_Design/03_Design_Tokens.md`](03_Design/03_Design_Tokens.md) — Design Tokens · `DOC-DES-007`
- [`03_Design/04_Component_Library.md`](03_Design/04_Component_Library.md) — Component Library · `DOC-DES-008`
- [`03_Design/05_Image_Guidelines.md`](03_Design/05_Image_Guidelines.md) — Image Guidelines · `DOC-DES-005`
- [`03_Design/06_Motion_and_3D_Visual_Language.md`](03_Design/06_Motion_and_3D_Visual_Language.md) — Motion e linguaggio visuale 3D · `DOC-DES-009`

### 04_Experience
- [`04_Experience/01_Information_Architecture.md`](04_Experience/01_Information_Architecture.md) — Information Architecture · `DOC-UX-001`
- [`04_Experience/02_Global_User_Flows.md`](04_Experience/02_Global_User_Flows.md) — Global User Flows · `DOC-UX-002`
- [`04_Experience/03_Homepage_Wireframes.md`](04_Experience/03_Homepage_Wireframes.md) — Homepage — Wireframe Specification · `DOC-UX-003`
- [`04_Experience/04_Catalog_Wireframes.md`](04_Experience/04_Catalog_Wireframes.md) — Catalogo — Wireframe Specification · `DOC-UX-004`
- [`04_Experience/05_Product_Wireframes.md`](04_Experience/05_Product_Wireframes.md) — Pagina Prodotto — Wireframe Specification · `DOC-UX-005`
- [`04_Experience/06_Service_Wireframes.md`](04_Experience/06_Service_Wireframes.md) — Pagine Servizio — Wireframe Specification · `DOC-UX-006`
- [`04_Experience/07_Portfolio_Blog_Event_Wireframes.md`](04_Experience/07_Portfolio_Blog_Event_Wireframes.md) — Portfolio, Blog ed Eventi — Wireframe Specification · `DOC-UX-007`
- [`04_Experience/08_Quote_and_Contact_Wireframes.md`](04_Experience/08_Quote_and_Contact_Wireframes.md) — Preventivo e contatti — Wireframe Specification · `DOC-UX-008`
- [`04_Experience/09_Customer_Area_Wireframes.md`](04_Experience/09_Customer_Area_Wireframes.md) — Area Cliente — Wireframe Specification · `DOC-UX-009`
- [`04_Experience/10_Admin_Wireframes.md`](04_Experience/10_Admin_Wireframes.md) — Admin — Wireframe Specification · `DOC-UX-010`
- [`04_Experience/11_Accessibility_Specification.md`](04_Experience/11_Accessibility_Specification.md) — Accessibility Specification · `DOC-UX-011`

### 05_Features
- [`05_Features/01_Catalog_and_Products.md`](05_Features/01_Catalog_and_Products.md) — Catalogo e prodotti — Unified Commerce Catalog · `DOC-FEAT-009`
- [`05_Features/02_Lantern_Configurator.md`](05_Features/02_Lantern_Configurator.md) — Configuratore lanterne — Mini-specifica di prodotto · `DOC-FEAT-002`
- [`05_Features/03_STL_Quote_Workflow.md`](05_Features/03_STL_Quote_Workflow.md) — Preventivatore STL — Workflow orchestrato · `DOC-FEAT-003`
- [`05_Features/04_STL_AI_Chat.md`](05_Features/04_STL_AI_Chat.md) — Preventivatore STL — Chat AI di qualificazione · `DOC-FEAT-004`
- [`05_Features/05_STL_Slicer.md`](05_Features/05_STL_Slicer.md) — Preventivatore STL — Slicer · `DOC-FEAT-005`
- [`05_Features/06_STL_Pricing_Engine.md`](05_Features/06_STL_Pricing_Engine.md) — Preventivatore STL — Pricing Engine · `DOC-FEAT-006`
- [`05_Features/07_STL_Revision_Workflow.md`](05_Features/07_STL_Revision_Workflow.md) — Preventivatore STL — Revision Workflow · `DOC-FEAT-007`
- [`05_Features/08_PrintFlow.md`](05_Features/08_PrintFlow.md) — PrintFlow — Pagina Fase 1 e integrazione futura · `DOC-FEAT-008`
- [`05_Features/09_Events.md`](05_Features/09_Events.md) — Eventi e fiere · `DOC-FEAT-010`
- [`05_Features/10_Printer_Assistance.md`](05_Features/10_Printer_Assistance.md) — Assistenza stampanti · `DOC-FEAT-011`
- [`05_Features/11_Portfolio_Case_Studies.md`](05_Features/11_Portfolio_Case_Studies.md) — Portfolio e casi studio · `DOC-FEAT-012`
- [`05_Features/12_Newsletter.md`](05_Features/12_Newsletter.md) — Newsletter · `DOC-FEAT-013`
- [`05_Features/13_Customer_Area.md`](05_Features/13_Customer_Area.md) — Area cliente · `DOC-FEAT-014`
- [`05_Features/14_Search.md`](05_Features/14_Search.md) — Ricerca interna · `DOC-FEAT-015`
- [`05_Features/15_Checkout_and_Payments_Future.md`](05_Features/15_Checkout_and_Payments_Future.md) — Checkout e pagamenti — strategia controllata e progressiva · `DOC-FEAT-016`

### 06_Admin
- [`06_Admin/01_Admin_Information_Architecture.md`](06_Admin/01_Admin_Information_Architecture.md) — NoLimits Command Center — Information Architecture · `DOC-ADM-005`
- [`06_Admin/02_Admin_Workflows.md`](06_Admin/02_Admin_Workflows.md) — Admin Workflows · `DOC-ADM-006`
- [`06_Admin/03_Permissions_Matrix.md`](06_Admin/03_Permissions_Matrix.md) — Permissions Matrix · `DOC-ADM-007`
- [`06_Admin/04_Media_Library.md`](06_Admin/04_Media_Library.md) — Media Library centralizzata · `DOC-ADM-004`

### 07_AI
- [`07_AI/01_AI_Overview.md`](07_AI/01_AI_Overview.md) — AI Overview — Jarvis private orchestration · `DOC-AI-001`
- [`07_AI/02_Jarvis_Admin.md`](07_AI/02_Jarvis_Admin.md) — Jarvis — specifica amministrativa privata · `DOC-AI-002`
- [`07_AI/03_Customer_Assistant.md`](07_AI/03_Customer_Assistant.md) — Customer/CRM Manager — Jarvis internal tool · `DOC-AI-003`
- [`07_AI/04_SEO_Assistant.md`](07_AI/04_SEO_Assistant.md) — SEO Manager — Jarvis internal tool · `DOC-AI-004`
- [`07_AI/05_Catalog_Assistant.md`](07_AI/05_Catalog_Assistant.md) — Catalog Manager — Jarvis internal tool · `DOC-AI-005`
- [`07_AI/06_Newsletter_Assistant.md`](07_AI/06_Newsletter_Assistant.md) — Newsletter Manager — Jarvis internal tool · `DOC-AI-006`
- [`07_AI/07_PrintFlow_Assistant.md`](07_AI/07_PrintFlow_Assistant.md) — PrintFlow Manager — Jarvis internal tool, Phase 2 · `DOC-AI-007`
- [`07_AI/08_Future_AI.md`](07_AI/08_Future_AI.md) — Future Jarvis Tools · `DOC-AI-008`

### 08_Data_API
- [`08_Data_API/01_Database_Design.md`](08_Data_API/01_Database_Design.md) — Database Design — Supabase PostgreSQL · `DOC-DATA-001`
- [`08_Data_API/02_Database_Naming_Convention.md`](08_Data_API/02_Database_Naming_Convention.md) — Database Naming Convention · `DOC-DATA-002`
- [`08_Data_API/03_Migration_Backup_Strategy.md`](08_Data_API/03_Migration_Backup_Strategy.md) — Migration e Backup Strategy · `DOC-DATA-003`
- [`08_Data_API/04_API_Contract.md`](08_Data_API/04_API_Contract.md) — API Contract e Convention · `DOC-DATA-004`
- [`08_Data_API/05_API_Catalog.md`](08_Data_API/05_API_Catalog.md) — API Catalog · `DOC-DATA-005`
- [`08_Data_API/06_Data_Classification_Retention.md`](08_Data_API/06_Data_Classification_Retention.md) — Data Classification e Retention · `DOC-DATA-006`

### 09_SEO_Content
- [`09_SEO_Content/01_SEO_Strategy.md`](09_SEO_Content/01_SEO_Strategy.md) — SEO Strategy · `DOC-SEO-001`
- [`09_SEO_Content/02_Content_Strategy.md`](09_SEO_Content/02_Content_Strategy.md) — Content Strategy · `DOC-SEO-002`
- [`09_SEO_Content/03_Blog_Strategy.md`](09_SEO_Content/03_Blog_Strategy.md) — Blog Strategy · `DOC-SEO-003`
- [`09_SEO_Content/04_Local_SEO.md`](09_SEO_Content/04_Local_SEO.md) — Local SEO · `DOC-SEO-004`
- [`09_SEO_Content/05_Technical_SEO.md`](09_SEO_Content/05_Technical_SEO.md) — Technical SEO · `DOC-SEO-005`
- [`09_SEO_Content/06_Schema_org.md`](09_SEO_Content/06_Schema_org.md) — Schema.org · `DOC-SEO-006`
- [`09_SEO_Content/07_Internal_Linking.md`](09_SEO_Content/07_Internal_Linking.md) — Internal Linking · `DOC-SEO-007`
- [`09_SEO_Content/08_GEO_Strategy.md`](09_SEO_Content/08_GEO_Strategy.md) — GEO Strategy — Generative Engine Optimization · `DOC-SEO-008`
- [`09_SEO_Content/09_Analytics_Measurement_Plan.md`](09_SEO_Content/09_Analytics_Measurement_Plan.md) — Analytics e Measurement Plan · `DOC-SEO-009`

### 10_Security_Performance
- [`10_Security_Performance/01_Threat_Model.md`](10_Security_Performance/01_Threat_Model.md) — Threat Model · `DOC-SEC-001`
- [`10_Security_Performance/02_Application_API_Security.md`](10_Security_Performance/02_Application_API_Security.md) — Application e API Security · `DOC-SEC-002`
- [`10_Security_Performance/03_Upload_Security.md`](10_Security_Performance/03_Upload_Security.md) — STL e Image Upload Security · `DOC-SEC-003`
- [`10_Security_Performance/04_AI_Security.md`](10_Security_Performance/04_AI_Security.md) — AI Security e Prompt Injection Prevention · `DOC-SEC-004`
- [`10_Security_Performance/05_Performance_Plan.md`](10_Security_Performance/05_Performance_Plan.md) — Performance Plan · `DOC-SEC-005`
- [`10_Security_Performance/06_ThreeJS_3D_Optimization.md`](10_Security_Performance/06_ThreeJS_3D_Optimization.md) — Three.js e 3D Loading Strategy · `DOC-SEC-006`
- [`10_Security_Performance/07_Privacy_GDPR.md`](10_Security_Performance/07_Privacy_GDPR.md) — Privacy e GDPR · `DOC-SEC-007`

### 11_Engineering_Operations
- [`11_Engineering_Operations/01_Developer_Handbook.md`](11_Engineering_Operations/01_Developer_Handbook.md) — Developer Handbook · `DOC-OPS-001`
- [`11_Engineering_Operations/02_Testing_Strategy.md`](11_Engineering_Operations/02_Testing_Strategy.md) — Testing Strategy · `DOC-OPS-002`
- [`11_Engineering_Operations/03_CICD_Deployment.md`](11_Engineering_Operations/03_CICD_Deployment.md) — CI/CD e Deployment · `DOC-OPS-003`
- [`11_Engineering_Operations/04_Observability.md`](11_Engineering_Operations/04_Observability.md) — Observability · `DOC-OPS-004`
- [`11_Engineering_Operations/05_Release_Strategy.md`](11_Engineering_Operations/05_Release_Strategy.md) — Release Strategy · `DOC-OPS-005`
- [`11_Engineering_Operations/06_Disaster_Recovery_Runbook.md`](11_Engineering_Operations/06_Disaster_Recovery_Runbook.md) — Disaster Recovery Runbook · `DOC-OPS-006`
- [`11_Engineering_Operations/07_Environment_Configuration.md`](11_Engineering_Operations/07_Environment_Configuration.md) — Environment e Configuration Management · `DOC-OPS-007`

### 12_Planning
- [`12_Planning/01_ADR_Register.md`](12_Planning/01_ADR_Register.md) — ADR Register · `DOC-PLAN-001`
- [`12_Planning/02_Decision_Log.md`](12_Planning/02_Decision_Log.md) — Decision Log · `DOC-PLAN-006`
- [`12_Planning/03_Master_Development_Roadmap.md`](12_Planning/03_Master_Development_Roadmap.md) — Master Development Roadmap · `DOC-PLAN-003`
- [`12_Planning/04_Risk_Register.md`](12_Planning/04_Risk_Register.md) — Risk Register · `DOC-PLAN-007`
- [`12_Planning/05_Traceability_Matrix.md`](12_Planning/05_Traceability_Matrix.md) — Requirements Traceability Matrix · `DOC-PLAN-005`
- [`12_Planning/06_Documentation_Debt_Register.md`](12_Planning/06_Documentation_Debt_Register.md) — Documentation Debt Register · `DOC-PLAN-008`
- [`12_Planning/ADR/ADR-0001_Documentation_as_Product.md`](12_Planning/ADR/ADR-0001_Documentation_as_Product.md) — ADR-0001 — Documentation as the governing product · `DOC-ADR-001`
- [`12_Planning/ADR/ADR-0002_Modular_Monolith_First.md`](12_Planning/ADR/ADR-0002_Modular_Monolith_First.md) — ADR-0002 — Modular monolith as initial application architecture · `DOC-ADR-002`
- [`12_Planning/ADR/ADR-0003_PostgreSQL_System_of_Record.md`](12_Planning/ADR/ADR-0003_PostgreSQL_System_of_Record.md) — ADR-0003 — PostgreSQL as system of record · `DOC-ADR-003`
- [`12_Planning/ADR/ADR-0004_Versioned_API_Contracts.md`](12_Planning/ADR/ADR-0004_Versioned_API_Contracts.md) — ADR-0004 — Versioned API contracts and compatibility policy · `DOC-ADR-004`
- [`12_Planning/ADR/ADR-0005_Object_Storage_for_Binaries.md`](12_Planning/ADR/ADR-0005_Object_Storage_for_Binaries.md) — ADR-0005 — Object storage for files and media · `DOC-ADR-005`
- [`12_Planning/ADR/ADR-0006_Outbox_and_Queued_Jobs.md`](12_Planning/ADR/ADR-0006_Outbox_and_Queued_Jobs.md) — ADR-0006 — Transactional outbox and queued asynchronous work · `DOC-ADR-006`
- [`12_Planning/ADR/ADR-0007_AI_Human_in_the_Loop.md`](12_Planning/ADR/ADR-0007_AI_Human_in_the_Loop.md) — ADR-0007 — Human-in-the-loop for consequential AI actions · `DOC-ADR-007`
- [`12_Planning/ADR/ADR-0008_Progressive_3D_Enhancement.md`](12_Planning/ADR/ADR-0008_Progressive_3D_Enhancement.md) — ADR-0008 — Three.js as progressive enhancement · `DOC-ADR-008`
- [`12_Planning/ADR/ADR-0009_PrintFlow_Decoupled_Coming_Soon.md`](12_Planning/ADR/ADR-0009_PrintFlow_Decoupled_Coming_Soon.md) — ADR-0009 — PrintFlow decoupled from Phase 1 · `DOC-ADR-009`
- [`12_Planning/ADR/ADR-0010_Consent_Aware_Analytics.md`](12_Planning/ADR/ADR-0010_Consent_Aware_Analytics.md) — ADR-0010 — Consent-aware analytics and data minimization · `DOC-ADR-010`
- [`12_Planning/ADR/ADR-0011_Governed_Media_Pipeline.md`](12_Planning/ADR/ADR-0011_Governed_Media_Pipeline.md) — ADR-0011 — Governed media library and derivative pipeline · `DOC-ADR-011`
- [`12_Planning/ADR/ADR-0012_Versioned_Prompt_Library.md`](12_Planning/ADR/ADR-0012_Versioned_Prompt_Library.md) — ADR-0012 — Versioned prompt library separate from governance · `DOC-ADR-012`
- [`12_Planning/ADR/ADR-0013_Atlas_Deployment_Topology.md`](12_Planning/ADR/ADR-0013_Atlas_Deployment_Topology.md) — ADR-0013 — Project Atlas deployment topology · `DOC-ADR-013`
- [`12_Planning/ADR/ADR-0014_Direct_Commercial_Model.md`](12_Planning/ADR/ADR-0014_Direct_Commercial_Model.md) — ADR-0014 — Direct commercial model · `DOC-ADR-014`
- [`12_Planning/ADR/ADR-0015_Brand_Identity_and_Project_Atlas.md`](12_Planning/ADR/ADR-0015_Brand_Identity_and_Project_Atlas.md) — ADR-0015 — Brand identity and Project Atlas codename · `DOC-ADR-015`
- [`12_Planning/ADR/ADR-0016_Core_Brand_Values.md`](12_Planning/ADR/ADR-0016_Core_Brand_Values.md) — ADR-0016 — Core brand values · `DOC-ADR-016`
- [`12_Planning/ADR/ADR-0017_Premium_Immersive_Web_Application.md`](12_Planning/ADR/ADR-0017_Premium_Immersive_Web_Application.md) — ADR-0017 — Premium immersive Web Application · `DOC-ADR-017`
- [`12_Planning/ADR/ADR-0018_React_Vite_Stack_with_NextJS_Review_Gate.md`](12_Planning/ADR/ADR-0018_React_Vite_Stack_with_NextJS_Review_Gate.md) — ADR-0018 — React/TypeScript/Vite application stack with Next.js review gate · `DOC-ADR-018`
- [`12_Planning/ADR/ADR-0019_Supabase_Backend_Architecture.md`](12_Planning/ADR/ADR-0019_Supabase_Backend_Architecture.md) — ADR-0019 — Supabase backend architecture for Phase 1 · `DOC-ADR-019`
- [`12_Planning/ADR/ADR-0020_Private_Jarvis_Orchestrator.md`](12_Planning/ADR/ADR-0020_Private_Jarvis_Orchestrator.md) — ADR-0020 — Jarvis as Andrea-only private AI orchestrator · `DOC-ADR-020`
- [`12_Planning/ADR/ADR-0021_Unified_Commerce_Catalog.md`](12_Planning/ADR/ADR-0021_Unified_Commerce_Catalog.md) — ADR-0021 — Unified Commerce Catalog · `DOC-ADR-021`
- [`12_Planning/ADR/ADR-0022_Controlled_Progressive_Payments.md`](12_Planning/ADR/ADR-0022_Controlled_Progressive_Payments.md) — ADR-0022 — Controlled progressive payment strategy · `DOC-ADR-022`
- [`12_Planning/ADR/ADR-0023_NoLimits_Command_Center.md`](12_Planning/ADR/ADR-0023_NoLimits_Command_Center.md) — ADR-0023 — NoLimits Command Center operating model · `DOC-ADR-023`
- [`12_Planning/ADR/ADR-0024_Website_Centric_Ecosystem.md`](12_Planning/ADR/ADR-0024_Website_Centric_Ecosystem.md) — ADR-0024 — NoLimits3D website as the center of Project Atlas · `DOC-ADR-024`
- [`12_Planning/ADR/ADR-0025_Founder_Led_Brand_and_Intent_Driven_Customer_Experience.md`](12_Planning/ADR/ADR-0025_Founder_Led_Brand_and_Intent_Driven_Customer_Experience.md) — ADR-0025 — Founder-led brand and intent-driven customer experience · `DOC-ADR-025`
- [`12_Planning/ADR/ADR-0026_Project_Atlas_Operating_System_and_AI_Development_Authority.md`](12_Planning/ADR/ADR-0026_Project_Atlas_Operating_System_and_AI_Development_Authority.md) — ADR-0026 — Project Atlas Operating System and AI Development Authority · `DOC-ADR-026`
- [`12_Planning/Change_Requests/CR-0001_Architecture_Consolidation.md`](12_Planning/Change_Requests/CR-0001_Architecture_Consolidation.md) — CR-0001 — Architecture Consolidation and Documentation Governance · `DOC-CR-001`
- [`12_Planning/Change_Requests/CR-0002_Atlas_Decisions.md`](12_Planning/Change_Requests/CR-0002_Atlas_Decisions.md) — CR-0002 — Project Atlas approved decisions integration · `DOC-CR-002`
- [`12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md`](12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md) — CR-0003 — Application Architecture and Operating Model Consolidation · `DOC-CR-003`
- [`12_Planning/Change_Requests/CR-0004_Brand_Customer_Experience_Home.md`](12_Planning/Change_Requests/CR-0004_Brand_Customer_Experience_Home.md) — CR-0004 — Brand, Customer Experience and Homepage Consolidation · `DOC-CR-004`
- [`12_Planning/Change_Requests/CR-0005_Operating_System_Governance_Release_Candidate.md`](12_Planning/Change_Requests/CR-0005_Operating_System_Governance_Release_Candidate.md) — CR-0005 — Operating System, Development Governance and Release-Candidate Preparation · `DOC-CR-005`
- [`12_Planning/Change_Requests/CR-0006_Final_Consolidation_Release_Candidate.md`](12_Planning/Change_Requests/CR-0006_Final_Consolidation_Release_Candidate.md) — CR-0006 — Documentation Bible Final Consolidation & Frozen Baseline Release Candidate · `DOC-CR-006`
- [`12_Planning/Change_Requests/CR-0007_Jarvis_Authoritative_Boundary.md`](12_Planning/Change_Requests/CR-0007_Jarvis_Authoritative_Boundary.md) — CR-0007 — Jarvis Authoritative Boundary · `DOC-CR-007`

### 13_Appendices
- [`13_Appendices/01_Quality_Checklists.md`](13_Appendices/01_Quality_Checklists.md) — Quality Checklists · `DOC-APP-001`
- [`13_Appendices/02_Open_Questions.md`](13_Appendices/02_Open_Questions.md) — Open Questions e decisioni richieste · `DOC-APP-002`
- [`13_Appendices/03_Content_Inventory_Template.md`](13_Appendices/03_Content_Inventory_Template.md) — Content Inventory Template · `DOC-APP-003`
- [`13_Appendices/04_Documentation_Audit_v0.95.md`](13_Appendices/04_Documentation_Audit_v0.95.md) — Documentation Audit — v0.95.4 Operating System, Development Governance & Release-Candidate Preparation · `DOC-APP-004`
- [`13_Appendices/05_Release_Candidate_Report_v0.96.md`](13_Appendices/05_Release_Candidate_Report_v0.96.md) — Release Candidate Report — Project Atlas v0.96 · `DOC-APP-005`
- [`13_Appendices/06_Executive_Summary_v0.96.md`](13_Appendices/06_Executive_Summary_v0.96.md) — Executive Summary — Project Atlas Documentation Bible v0.96 · `DOC-APP-006`

### prompts
- [`prompts/01_Jarvis_Operations.md`](prompts/01_Jarvis_Operations.md) — PRM-JAR-001 — Jarvis Operations · `DOC-PRM-001`
- [`prompts/02_SEO_Assistant.md`](prompts/02_SEO_Assistant.md) — PRM-SEO-001 — SEO Assistant · `DOC-PRM-002`
- [`prompts/03_Blog_Editorial.md`](prompts/03_Blog_Editorial.md) — PRM-BLOG-001 — Blog Editorial · `DOC-PRM-003`
- [`prompts/04_Catalog_Content.md`](prompts/04_Catalog_Content.md) — PRM-CAT-001 — Catalog Content · `DOC-PRM-004`
- [`prompts/05_Image_Generation_Editing.md`](prompts/05_Image_Generation_Editing.md) — PRM-IMG-001 — Image Generation and Conservative Editing · `DOC-PRM-005`
- [`prompts/06_Newsletter.md`](prompts/06_Newsletter.md) — PRM-NEWS-001 — Newsletter Assistant · `DOC-PRM-006`
- [`prompts/07_STL_Qualification.md`](prompts/07_STL_Qualification.md) — PRM-STL-001 — STL Qualification Assistant · `DOC-PRM-007`
- [`prompts/README.md`](prompts/README.md) — Prompt Library · `DOC-PRM-000`

### ROOT
- [`000_PROJECT_CHARTER.md`](000_PROJECT_CHARTER.md) — 000 — Project Charter / Meta-Specifica documentale · `DOC-GOV-000`
- [`CHANGELOG.md`](CHANGELOG.md) — Changelog · `DOC-ROOT-001`
- [`README.md`](README.md) — Project Atlas — NoLimits3D Documentation Bible v0.95.4 · `DOC-ROOT-002`

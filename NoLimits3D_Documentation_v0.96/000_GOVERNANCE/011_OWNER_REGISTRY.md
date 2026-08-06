# 011 — Owner Document Registry

> **Document ID:** DOC-GOV-011  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Documentation Architecture  
> **Ambito autorevole:** assegnazione della fonte autorevole per argomento.

| Argomento | Owner Document | Note |
|---|---|---|
| governance e modifica documenti | `000_PROJECT_CHARTER.md` | prevale sulle policy subordinate |
| identità pubblica e codename | `03_Design/01_Brand_Book.md` | ADR-0015; Constitution per principi |
| principi del prodotto | `00_Foundation/00_Project_Constitution.md` | non contiene regole documentali duplicate |
| vision a cinque anni | `00_Foundation/01_Vision_and_5Y_Strategy.md` | obiettivi e guardrail |
| linguaggio di dominio | `00_Foundation/02_Glossary.md` | terminologia prodotto |
| requisiti trasversali | `01_Product/01_PRD.md` | feature detail nei documenti dedicati |
| personas e journey | `01_Product/02_Personas_Journeys.md` | segmenti e bisogni |
| regole di business | `01_Product/03_Business_Rules.md` | prezzi, stati, condizioni |
| state machine | `01_Product/04_State_Machines.md` | transizioni ammesse |
| strategia commerciale | `01_Product/05_Marketplace_and_GoToMarket_Strategy.md` | posizionamento, KPI e scenari |
| deployment topology | `02_Architecture/01_SDS.md` | decision rationale in ADR-0013 |
| filosofia interfaccia e motion | `03_Design/02_Design_System.md` e `03_Design/06_Motion_and_3D_Visual_Language.md` | ADR-0017 |
| architettura generale | `02_Architecture/01_SDS.md` | confini e pattern |
| frontend | `02_Architecture/07_Frontend_Architecture.md` | routing, state, code splitting, Three.js |
| backend | `02_Architecture/08_Backend_Service_Design.md` | servizi, jobs, queue, scheduler |
| dominio | `02_Architecture/02_Domain_Model.md` | concetti e invarianti |
| media visuali | `03_Design/05_Image_Guidelines.md` | formati, naming, qualità, SEO |
| design foundations | `03_Design/02_Design_System.md` | tema, motion, microinterazioni |
| componenti | `03_Design/04_Component_Library.md` | API dei componenti UI |
| feature | rispettivo file in `05_Features/` | comportamento end-to-end |
| admin | `06_Admin/01_Admin_Information_Architecture.md` | moduli; workflow nel file 02 |
| Jarvis | `07_AI/02_Jarvis_Admin.md` | capability, memoria e tool; il boundary costituzionale è `INV-JARVIS-001` / AD-012 |
| prompt operativi | `prompts/README.md` e singoli prompt | versioni e eval |
| database | `08_Data_API/01_Database_Design.md` | ER, tabelle e vincoli |
| API | `08_Data_API/04_API_Contract.md` | convenzioni; endpoint nel Catalog |
| SEO | rispettivo file in `09_SEO_Content/` | strategia per dominio |
| security | rispettivo file in `10_Security_Performance/` | controlli e threat model |
| sviluppo | `11_Engineering_Operations/01_Developer_Handbook.md` | Git, code style, structure |
| roadmap | `12_Planning/03_Master_Development_Roadmap.md` | sequenza e dipendenze |
| tracciabilità | `12_Planning/05_Traceability_Matrix.md` | indice di copertura |
| decisioni | singoli file `12_Planning/ADR/` | register come indice |
| modifiche | singoli file `12_Planning/Change_Requests/` | processo governato |

<!-- V0952-OWNERS:START -->
## Owner mappings v0.95.2

| Tema | Owner Document |
|---|---|
| gerarchia website-centric | `00_Foundation/00_Project_Constitution.md` |
| frontend stack e review gate | `02_Architecture/07_Frontend_Architecture.md` e ADR-0018 |
| backend Supabase | `02_Architecture/08_Backend_Service_Design.md` e ADR-0019 |
| catalogo unificato | `05_Features/01_Catalog_and_Products.md` |
| checkout e pagamenti | `05_Features/15_Checkout_and_Payments_Future.md` |
| Command Center | `06_Admin/01_Admin_Information_Architecture.md` |
| Media Library | `06_Admin/04_Media_Library.md` |
| Jarvis | `07_AI/02_Jarvis_Admin.md` |
| schema dati/RLS | `08_Data_API/01_Database_Design.md` |
<!-- V0952-OWNERS:END -->

<!-- V0953-OWNERS:START -->
## Owner mappings Brand/CX/Home v0.95.3

| Tema | Owner Document |
|---|---|
| missione, North Star e principi CX | `00_Foundation/00_Project_Constitution.md` |
| visione e impatto territoriale | `00_Foundation/01_Vision_and_5Y_Strategy.md` |
| posizionamento e voce founder-led | `03_Design/01_Brand_Book.md` |
| direzione logo e Brand Asset Gate | `03_Design/01_Brand_Book.md` |
| autenticità e classificazione immagini | `03_Design/05_Image_Guidelines.md` |
| sitemap e distinzione Catalogo/Realizzazioni/Ispirati | `04_Experience/01_Information_Architecture.md` |
| funnel e intent routing | `04_Experience/02_Global_User_Flows.md` |
| architettura Home | `04_Experience/03_Homepage_Wireframes.md` |
| prove e case study | `05_Features/11_Portfolio_Case_Studies.md` |
| HueForge commerciale | `05_Features/01_Catalog_and_Products.md`; editoriale: Content Strategy |
| media e provenance | `06_Admin/04_Media_Library.md` |
| KPI CX | `09_SEO_Content/09_Analytics_Measurement_Plan.md` |
<!-- V0953-OWNERS:END -->

<!-- V0954-OWNER-REGISTRY:START -->
## Owner aggiunti/esplicitati in v0.95.4

| Tema | Owner Document |
|---|---|
| Project Atlas Philosophy | `000_PROJECT_CHARTER.md` |
| Project DNA, Invariants e Negative Requirements | `00_Foundation/00_Project_Constitution.md` |
| AI Governance Charter e AI Development Contract | `000_GOVERNANCE/008_AI_COLLABORATION_POLICY.md` |
| Decision Authority Matrix | `00_Foundation/03_Documentation_Governance.md` |
| Architecture Compliance Gates | `000_GOVERNANCE/007_QUALITY_GATES.md` |
| Development Constitution | `11_Engineering_Operations/01_Developer_Handbook.md` |
| Jarvis authoritative boundary | `00_Foundation/00_Project_Constitution.md` + `AD-012_JARVIS_AUTHORITATIVE_BOUNDARY.md` | `07_AI/02_Jarvis_Admin.md` resta owner della futura specifica funzionale |
<!-- V0954-OWNER-REGISTRY:END -->

<!-- V096-RELEASE-EVIDENCE:START -->
## Release evidence v0.96

| Tema | Owner / evidence document | Nota |
|---|---|---|
| giudizio Release Candidate | `13_Appendices/05_Release_Candidate_Report_v0.96.md` | snapshot di review; non sostituisce Owner Document |
| sintesi della release | `13_Appendices/06_Executive_Summary_v0.96.md` | riepilogo non normativo |
| change finale | `12_Planning/Change_Requests/CR-0006_Final_Consolidation_Release_Candidate.md` | mappa di impatto e preservazione |
<!-- V096-RELEASE-EVIDENCE:END -->

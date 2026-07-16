# CR-0003 — Application Architecture and Operating Model Consolidation

> **Document ID:** DOC-CR-003  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Change Control Board  
> **Decision status:** Implemented, awaiting package review  
> **Proponente/Approvatore decisioni:** Project Owner  
> **Data:** 2026-07-15  
> **Target:** Documentation v0.95.2

## 1. Missione

Integrare in-place le decisioni successive a CR-0002 senza corpus paralleli, ID modificati o Owner Document concorrenti.

## 2. Impact Analysis

### ADR coinvolti

- accettati dopo integrazione: ADR-0001, 0002, 0003, 0004, 0005, 0007, 0008, 0009, 0011;
- ancora Proposed: ADR-0006, 0010, 0012;
- nuovi: ADR-0018–ADR-0024;
- già Accepted e immutati: ADR-0013–ADR-0017.

### Owner Document impattati

Foundation, PRD/business rules/state machines, SDS/domain/frontend/backend/integration/storage, catalogo/checkout/customer area/PrintFlow, Admin/Media, AI/Jarvis, Database/API, SEO/analytics, security/performance, operations e Planning.

### Requisiti e roadmap

ID esistenti preservati. Nuovi requisiti solo per decisioni non equivalenti. I 448 elementi roadmap originari restano identificabili; sono aggiunti soltanto il review gate e il commerce Phase 1 non precedentemente rappresentati. I task worker esistenti sono raffinati per rendere l’hardening un gate Fase 2.

### Rischi di duplicazione

- Admin vs Command Center;
- Jarvis vs assistenti specializzati;
- catalogo prodotto vs servizi/fiera/preventivo;
- payment future vs metodi Fase 1;
- sito vs ecosistema a prodotti equivalenti.

Mitigazione: Owner Document unico, specialized AI docs riclassificati come tool Jarvis, riferimenti e semantic guards.

## 3. Decision set

1. sito NoLimits3D centro di Project Atlas;
2. Jarvis solo Andrea/Command Center;
3. React/TypeScript/Vite e librerie approvate con review gate Next.js;
4. Supabase PostgreSQL/Auth/Storage/RLS/Edge Functions;
5. modular monolith;
6. Media Library centralizzata;
7. Unified Commerce Catalog;
8. cart/checkout/pagamenti progressivi controllati;
9. NoLimits Command Center;
10. PrintFlow “In arrivo” in Fase 1;
11. PC Server come pull Compute Worker Fase 2.

## 4. Document impact matrix

| Area | Azione |
|---|---|
| Governance/Foundation | aggiunte guardie, gerarchia website-centric e principi Jarvis/commerce. |
| Product | PRD, business rules, state machine e go-to-market aggiornati. |
| Architecture | stack, Supabase, modules, worker, Command Center e boundary aggiornati. |
| Design/Experience | navigation, componenti e flussi commerciali/admin aggiornati. |
| Features | catalogo e checkout riscritti; PrintFlow/customer/event/newsletter integrati. |
| Admin/AI | Command Center e Jarvis private orchestration consolidati. |
| Data/API/Security | schema, RLS, Edge Functions, private namespaces e retention integrati. |
| Operations | repository, CI/CD, environment, observability e DR aggiornati. |
| Planning | ADR, RTM, roadmap, risk, debt, questions, audit e manifest rigenerati. |

## 5. Acceptance criteria

- nessun ID esistente modificato;
- nessun documento autorevole duplicato;
- Jarvis admin-only in tutti i documenti;
- website-centric guard superato;
- PrintFlow Phase 1 guard superato;
- ADR normalizzati senza duplicati;
- RTM 100%;
- roadmap senza cicli o dipendenze mancanti;
- manifest e ZIP verificabili;
- stato finale `NEEDS REVIEW`, Baseline Ready `NO` finché restano gate aperti.

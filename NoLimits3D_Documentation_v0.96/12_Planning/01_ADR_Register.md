# ADR Register

> **Document ID:** DOC-PLAN-001  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Software Architecture  
> **Ambito autorevole:** indice degli ADR; il contenuto normativo è nei singoli file.

| ID | Decisione | Stato | CR |
|---|---|---|---|
| ADR-0001 | Documentation as the governing product | **Accepted** | CR-0003 |
| ADR-0002 | Modular monolith as initial application architecture | **Accepted** | CR-0003 |
| ADR-0003 | PostgreSQL as system of record | **Accepted** | CR-0003 |
| ADR-0004 | Versioned API contracts and compatibility policy | **Accepted** | CR-0003 |
| ADR-0005 | Object storage for files and media | **Accepted** | CR-0003 |
| ADR-0006 | Transactional outbox and queued asynchronous work | **Proposed** | CR-0001 |
| ADR-0007 | Human-in-the-loop for consequential AI actions | **Accepted** | CR-0003 |
| ADR-0008 | Three.js as progressive enhancement | **Accepted** | CR-0003 |
| ADR-0009 | PrintFlow decoupled from Phase 1 | **Accepted** | CR-0003 |
| ADR-0010 | Consent-aware analytics and data minimization | **Proposed** | CR-0001 |
| ADR-0011 | Governed media library and derivative pipeline | **Accepted** | CR-0003 |
| ADR-0012 | Versioned prompt library separate from governance | **Proposed** | CR-0001 |
| ADR-0013 | Project Atlas deployment topology | **Accepted** | CR-0002 |
| ADR-0014 | Direct commercial model | **Accepted** | CR-0002 |
| ADR-0015 | Brand identity and Project Atlas codename | **Accepted** | CR-0002 |
| ADR-0016 | Core brand values | **Accepted** | CR-0002 |
| ADR-0017 | Premium immersive Web Application | **Accepted** | CR-0002 |
| ADR-0018 | React/TypeScript/Vite application stack with Next.js review gate | **Accepted** | CR-0003 |
| ADR-0019 | Supabase backend architecture for Phase 1 | **Accepted** | CR-0003 |
| ADR-0020 | Jarvis as Andrea-only private AI orchestrator | **Accepted** | CR-0003 |
| ADR-0021 | Unified Commerce Catalog | **Accepted** | CR-0003 |
| ADR-0022 | Controlled progressive payment strategy | **Accepted** | CR-0003 |
| ADR-0023 | NoLimits Command Center operating model | **Accepted** | CR-0003 |
| ADR-0024 | NoLimits3D website as the center of Project Atlas | **Accepted** | CR-0003 |
| ADR-0025 | Founder-led brand and intent-driven customer experience | **Accepted** | CR-0004 |
| ADR-0026 | Project Atlas Operating System and AI Development Authority | **Accepted** | CR-0005 |

## Normalizzazione CR-0003

ADR-0001, 0002, 0003, 0004, 0005, 0007, 0008, 0009 e 0011 sono stati integrati e portati ad `Accepted` perché le decisioni approvate li risolvono. ADR-0006, 0010 e 0012 restano `Proposed`. ADR-0018–0024 rappresentano decisioni realmente nuove. Nessun ADR Accepted precedente è stato sovrascritto o superseded.

## Policy

Vedere `000_GOVERNANCE/004_ADR_POLICY.md`.
## Normalizzazione CR-0004

ADR-0015, ADR-0016, ADR-0017 e ADR-0024 restano immutati e forniscono identità, valori, filosofia UI e centralità del sito. ADR-0025 registra soltanto la nuova decisione trasversale su founder-led voice, autenticità, Home intent-led e tassonomia Customer Experience. Il logo N+3 è una direzione sottoposta a gate, non un asset approvato.


<!-- V0954-ADR-REGISTER:START -->
## CR-0005

ADR-0026 formalizza il sistema operativo di sviluppo, gli invarianti, l’autorità degli agenti e i compliance gate. Nessun ADR Accepted precedente è stato modificato o superseded. ADR-0006, ADR-0010 e ADR-0012 restano Proposed.
<!-- V0954-ADR-REGISTER:END -->

<!-- V096-ADR-REVIEW:START -->
## Chief Architect Review v0.96

- nessun nuovo ADR richiesto dalla final consolidation;
- tutti i 23 ADR `Accepted` risultano coerenti con Charter, Constitution, Project DNA e Invariants;
- ADR-0006, ADR-0010 e ADR-0012 restano `Proposed` e non sono trattati come decisioni vincolanti;
- nessun ADR Accepted è stato modificato in-place;
- la futura Frozen Baseline richiede chiusura dei gate esterni indicati nel Release Candidate Report, non un nuovo ADR generico di approvazione.
<!-- V096-ADR-REVIEW:END -->

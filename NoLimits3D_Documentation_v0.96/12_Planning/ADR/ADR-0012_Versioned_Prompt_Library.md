# ADR-0012 — Versioned prompt library separate from governance

> **Document ID:** DOC-ADR-012  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


> **Decision status:** Proposed  
> **Data:** 2026-07-15  
> **Owner:** Software Architecture  
> **CR:** CR-0001

## Context

Operational AI prompts must be reproducible and testable, but prompts must not govern the documentation or grant permissions.

## Decision drivers

Metodo di valutazione conforme a `000_GOVERNANCE/004_ADR_POLICY.md`. Driver specifici: riproducibilità AI; separazione tra policy e prompt; regression control.

## Options considered

1. decisione adottata;
2. alternativa più semplice ma meno governata;
3. alternativa più distribuita/automatica con costo operativo maggiore;
4. rinvio della decisione.

## Decision

Maintain `/prompts` with IDs, versions, schemas, guardrails and evals. Store exact prompt/model provenance per execution. The Project Charter remains the governance authority.

## Positive consequences

- Reproducible AI behavior
- Regression testing
- Clear separation of policy and prompt

## Negative consequences

- Prompt maintenance overhead
- Provider changes may require variants

## Risks and mitigations

Mitigazione specifica: prompt registry, exact-version logging, eval suite e deprecation senza cancellazione. Le eccezioni vengono registrate tramite Change Request e misurate prima del riesame.

## Links

- `000_PROJECT_CHARTER.md`;
- `00_Foundation/00_Project_Constitution.md`;
- `12_Planning/Change_Requests/CR-0001_Architecture_Consolidation.md`.

## Revisit conditions

Revisit storage format or prompt orchestration while preserving IDs, provenance and eval requirements.

## v0.95.2 status note

CR-0003 non chiude integralmente questa decisione. Rimane `Proposed` fino alla validazione indicata nelle revisit conditions e nelle Open Questions.

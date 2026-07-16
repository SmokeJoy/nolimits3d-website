# Governance della documentazione — indice applicativo

> **Document ID:** DOC-FND-004  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Documentation Architecture  
> **Ambito autorevole:** punto di ingresso dalla Foundation alle policy L0; non duplica il Charter.

La governance completa è definita in [`/000_PROJECT_CHARTER.md`](../000_PROJECT_CHARTER.md). Questo documento conserva un indice operativo per chi legge la Foundation.

## Policy

- standard di scrittura: `000_GOVERNANCE/001_DOCUMENTATION_STANDARD.md`;
- versioning: `000_GOVERNANCE/002_VERSIONING_POLICY.md`;
- Change Request: `000_GOVERNANCE/003_CHANGE_REQUEST_PROCESS.md`;
- ADR: `000_GOVERNANCE/004_ADR_POLICY.md`;
- traceability: `000_GOVERNANCE/005_TRACEABILITY_STANDARD.md`;
- lifecycle: `000_GOVERNANCE/006_DOCUMENT_LIFECYCLE.md`;
- quality gates: `000_GOVERNANCE/007_QUALITY_GATES.md`;
- collaborazione AI: `000_GOVERNANCE/008_AI_COLLABORATION_POLICY.md`;
- audit: `000_GOVERNANCE/009_AUDIT_PROCESS.md`;
- Owner Document Registry: `000_GOVERNANCE/011_OWNER_REGISTRY.md`.

## Regola operativa

```text
Read → Analyze → Understand → Integrate → Update controls → Verify → Create only if necessary
```

La versione 0.95 è `In Review`. Nessun documento deve essere considerato Frozen Baseline finché il Project Owner non approva espressamente la v1.0.

<!-- V0954-DECISION-AUTHORITY:START -->
## 8. Decision Authority Matrix

La matrice stabilisce il livello minimo di autorità. Un'attività può essere elevata a un livello superiore in base a rischio o impatto; non può essere abbassata per comodità.

| Tipo di modifica | AI autonoma | Product Owner | Lead Architect | CR | ADR | Evidenza minima |
|---|---:|---:|---:|---:|---:|---|
| correzione ortografica non semantica | sì | no | no | no | no | diff e link check |
| riparazione link/format senza contenuto normativo | sì | no | no | no | no | audit pulito |
| chiarimento che non cambia requisito | prepara | approva se dubbio | no | normalmente no | no | owner review |
| requisito, acceptance criteria o priorità | prepara | **approva** | consulta | **sì** | se architetturale | RTM/roadmap/test aggiornati |
| UX, navigazione, CTA o workflow | prepara | **approva** | consulta | **sì** | se difficile da invertire | wireframe e UAT impact |
| nuova feature o rimozione feature | no | **approva** | **approva impatto** | **sì** | se strutturale | PRD/RTM/roadmap |
| schema dati, API, security boundary, provider, framework | prepara | consulta | **approva** | **sì** | **sì** | ADR e migration/rollback |
| Jarvis: permessi, memoria, tool, esposizione | no | **approva** | **approva** | **sì** | **sì** | privacy/security review |
| PrintFlow: passaggio da Coming Soon a operativo | no | **approva** | **approva** | **sì** | **sì** | phase-gate completo |
| documento costituzionale o invariante | prepara | **approva** | **approva** | **sì** | se cambia architettura | impact analysis totale |
| modifica a ADR Accepted | no | **approva** | **approva** | **sì** | nuovo ADR superseding | compatibilità e conseguenze |
| Release Candidate | prepara evidenze | **approva proposta** | **approva review** | **sì** | secondo impatti | audit e review report |
| Frozen Baseline | no | **approva** | **approva** | **sì** | ADR se cambia governance | firma/evidenza di baseline |
| pubblicazione o deploy produzione | esegue solo se autorizzata | **approva business** | approva gate tecnico | ticket/release | no, salvo nuova decisione | checklist, test, rollback |

### 8.1 Classificazione preventiva

Prima di modificare, l'autore classifica il change come `Editorial`, `Specification`, `Product`, `Architecture`, `Constitutional`, `Release` o `Emergency`. La classificazione e l'autorità richiesta devono comparire nel Change Request o nella pull request.

### 8.2 Requisiti di authority

| ID | Requisito | Priorità |
|---|---|---|
| AUTH-NF-001 | Ogni modifica deve essere classificata prima dell'esecuzione. | Must |
| AUTH-NF-002 | Un'AI può applicare autonomamente solo modifiche non semantiche e verificabili. | Must |
| AUTH-NF-003 | Requisiti, UX, workflow e scope devono richiedere approvazione Product Owner e Change Request. | Must |
| AUTH-NF-004 | Decisioni architetturali devono richiedere Lead Architect, Change Request e ADR. | Must |
| AUTH-NF-005 | Modifiche costituzionali devono richiedere approvazione congiunta Product Owner e Lead Architect. | Must |
| AUTH-NF-006 | Release Candidate e Frozen Baseline non possono essere approvate o dichiarate da un agente. | Must |
<!-- V0954-DECISION-AUTHORITY:END -->

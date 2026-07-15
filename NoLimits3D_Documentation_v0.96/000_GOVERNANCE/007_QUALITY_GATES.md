# 007 — Documentation Quality Gates

> **Document ID:** DOC-GOV-007  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Quality Engineering  
> **Ambito autorevole:** controlli bloccanti per review, approvazione e baseline.

## Gate A — Struttura

- metadati presenti;
- ID unici;
- naming conforme;
- nessun file orfano;
- link interni validi.

## Gate B — Contenuto

- scopo chiaro;
- requisiti verificabili;
- assunzioni esplicite;
- nessun filler;
- Owner Document rispettato.

## Gate C — Coerenza

- nessuna contraddizione nota;
- stati e business rule allineati;
- API e dati coerenti;
- terminologia conforme al glossario;
- PrintFlow descritto correttamente per Fase 1.

## Gate D — Tracciabilità

- RTM completa per Must;
- roadmap collegata;
- test previsti;
- ADR presenti per decisioni significative;
- CR chiusa o correttamente aperta.

## Gate E — Operabilità

- sicurezza e privacy valutate;
- performance budget definiti;
- osservabilità prevista;
- migrazione, backup e rollback considerati.

## Esito

Un gate bloccante fallito impedisce `Baselined`. Le eccezioni richiedono waiver temporaneo, owner, scadenza e approvazione CTO.

<!-- V0954-ARCH-COMPLIANCE-GATES:START -->
## 8. Architecture Compliance Gates

I gate seguenti sono bloccanti. Devono essere valutati nella progettazione, nella pull request, nella release e nell'Architectural Review finale.

| Gate | Domanda | Evidenza | Esito bloccante |
|---|---|---|---|
| ACG-00 Scope | Il change è presente in Owner Document, RTM e roadmap? | ID requisito/task | assenza o scope implicito |
| ACG-01 Authority | L'autorità richiesta dalla matrice ha approvato? | CR/ADR/review | approvazione mancante |
| ACG-02 Constitution | Il change rispetta DNA, invarianti e negative requirements? | compliance checklist | qualsiasi violazione |
| ACG-03 Website center | Rafforza o almeno non frammenta il sito come centro? | architecture impact | prodotto pubblico parallelo |
| ACG-04 Jarvis privacy | Jarvis resta esclusivamente privato per Andrea? | route/API/RBAC scan | esposizione o capability pubblica |
| ACG-05 Phase boundary | PrintFlow resta Coming Soon e il sito resta indipendente dal worker in Fase 1? | phase test | dipendenza o funzione pubblica |
| ACG-06 Human accountability | Preventivi STL e azioni conseguenziali mantengono review umana? | state/approval test | finalizzazione automatica non autorizzata |
| ACG-07 Security/privacy | RLS, least privilege, upload, consent e retention sono rispettati? | security/privacy evidence | controllo mancante |
| ACG-08 Quality attributes | Accessibilità, performance, SEO, fallback e osservabilità sono verificati? | test report | budget/standard non rispettato |
| ACG-09 Evolution | Migrazione, rollback, compatibilità e deprecazione sono definiti? | release/migration plan | change irreversibile non governato |
| ACG-10 Traceability | Test e codice sono collegati a requisito, task e decisione? | RTM/PR evidence | tracciabilità incompleta |
| ACG-11 Release truth | Stato, limiti, asset e promesse sono rappresentati onestamente? | content/release review | claim o stato fuorviante |

### 8.1 Esiti

- `PASS`: evidenza completa;
- `PASS WITH DEBT`: ammesso solo per elemento non bloccante, con owner e scadenza;
- `FAIL`: merge/release vietati;
- `NOT APPLICABLE`: richiede motivazione esplicita e reviewer.

### 8.2 Requisiti dei gate

| ID | Requisito | Priorità |
|---|---|---|
| GATE-NF-001 | Ogni change deve dimostrare scope, owner e tracciabilità prima dell'implementazione. | Must |
| GATE-NF-002 | Nessun change può violare Project DNA, invarianti o Negative Requirements. | Must |
| GATE-NF-003 | Ogni build/release deve verificare che Jarvis resti privato e PrintFlow resti conforme alla fase. | Must |
| GATE-NF-004 | I flussi STL e le azioni AI conseguenziali devono dimostrare human review. | Must |
| GATE-NF-005 | I Negative Requirements devono avere test o controlli automatici ripetibili. | Must |
| GATE-NF-006 | La Release Candidate richiede audit pulito e review umana documentata. | Must |
<!-- V0954-ARCH-COMPLIANCE-GATES:END -->

<!-- V096-RC-GATE:START -->
## 9. Release Candidate Gate

Prima di attribuire lo stato `RELEASE CANDIDATE`, il reviewer deve verificare:

| ID | Controllo | Evidenza minima |
|---|---|---|
| RCG-01 | Scope freeze | nessuna nuova pagina, feature, servizio o workflow nella release |
| RCG-02 | Interpretation safety | tre percorsi di lettura verificati: CTO, senior developer, agente AI |
| RCG-03 | Owner uniqueness | ogni requisito possiede un solo Owner Document esistente |
| RCG-04 | Decision coherence | ogni ADR è coerente con Charter, Constitution e Project DNA |
| RCG-05 | Constitutional guards | sito centrale, Jarvis privato, PrintFlow Coming Soon, review STL umana |
| RCG-06 | Structural integrity | zero link rotti, documenti orfani, ID duplicati e dipendenze cicliche |
| RCG-07 | Residual transparency | ogni ambiguità residua è nominata, classificata e assegnata |
| RCG-08 | Baseline authority | nessun agente dichiara automaticamente la v1.0 |

Un gate `FAIL` impedisce lo stato Release Candidate. Un blocker esterno dichiarato può impedire la Frozen Baseline senza invalidare la candidate, purché non produca interpretazioni concorrenti nello scope già consolidato.
<!-- V096-RC-GATE:END -->

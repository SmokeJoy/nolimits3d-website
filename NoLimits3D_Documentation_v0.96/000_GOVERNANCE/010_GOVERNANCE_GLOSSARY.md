# 010 — Governance Glossary

> **Document ID:** DOC-GOV-010  
> **Versione:** 0.95.4  
> **Stato:** In Review  
> **Owner:** Documentation Architecture  
> **Ambito autorevole:** termini del framework di governance. I termini di dominio restano in `00_Foundation/02_Glossary.md`.

| Termine | Definizione |
|---|---|
| Baseline | insieme immutabile di documenti approvati che costituisce il contratto di sviluppo |
| Charter | meta-specifica che governa il sistema documentale |
| Constitution | principi non negoziabili del prodotto software |
| Owner Document | unica fonte autorevole per un tema |
| ADR | record immutabile del ragionamento di una decisione architetturale |
| Change Request | proposta controllata di modifica della baseline |
| RTM | matrice che collega requisiti, design, implementazione e test |
| Documentation Debt | incompletezza o incoerenza nota con owner e piano di risoluzione |
| Quality Gate | condizione bloccante per avanzare di stato |
| Orphan Document | file governato non raggiungibile dall'indice o privo di riferimenti utili |
| Supersede | sostituire una decisione o un documento preservandone la storia |
| Frozen Baseline | baseline v1.0 autorizzata allo sviluppo |

<!-- V0954-GLOSSARY:START -->
## Termini v0.95.4

- **Project DNA:** caratteristiche identitarie e operative che devono restare riconoscibili in ogni evoluzione.
- **Project Invariant:** condizione sempre vera, non disattivabile da configurazione o implementazione locale.
- **Negative Requirement:** comportamento esplicitamente proibito e verificato tramite test o gate.
- **AI Development Contract:** obblighi, limiti e stop condition applicabili agli agenti che modificano documentazione o codice.
- **Decision Authority Matrix:** regola che associa ogni classe di modifica all'approvazione, CR e ADR necessari.
- **Architecture Compliance Gate:** controllo bloccante che dimostra conformità prima di merge o release.
- **Development Constitution:** regole non negoziabili applicabili all'implementazione e alle pull request.
- **Release Candidate:** candidate sottoposta a review; non è ancora Frozen Baseline.
<!-- V0954-GLOSSARY:END -->

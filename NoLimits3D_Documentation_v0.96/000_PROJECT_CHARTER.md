# 000 — Project Charter / Meta-Specifica documentale

> **Document ID:** DOC-GOV-000  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Project Governance  
> **Approvatore:** CTO / Project Owner  
> **Data:** 2026-07-15  
> **Ambito autorevole:** creazione, modifica, revisione, approvazione e audit dell'intero sistema documentale NoLimits3D.

## 1. Natura e autorità del documento

Questo Charter non descrive il prodotto software NoLimits3D. Governa il sistema che descrive il prodotto. È la **Meta-Specifica** posta al livello zero della gerarchia progettuale:

```text
Project Charter / Meta-Specifica
        ↓
Project Constitution
        ↓
Documentation Bible
        ↓
Master Development Roadmap
        ↓
Implementazione
        ↓
Test e Release
```

In caso di conflitto sulle regole documentali prevale questo Charter. In caso di conflitto sui principi del prodotto prevale `00_Foundation/00_Project_Constitution.md`. In caso di conflitto sui requisiti funzionali prevalgono il PRD e la feature specification proprietaria del requisito. Le decisioni architetturali approvate sono spiegate dagli ADR e non possono essere sovrascritte implicitamente da testi successivi.

### Articolo 1 — Regola assoluta

> **La documentazione costituisce il prodotto principale del progetto. Il codice è un artefatto derivato che implementa la baseline documentale approvata. L'obiettivo non è creare tanti documenti: è creare il minimo numero di documenti necessario per descrivere il sistema nel massimo dettaglio possibile. Ogni informazione deve avere una sola fonte autorevole. Quando un argomento è già documentato, il documento esistente viene ampliato oppure referenziato; non viene duplicato.**

### Articolo 2 — Obiettivo a lungo termine

Tra cinque anni, un nuovo sviluppatore deve poter ricostruire:

1. cosa il sistema deve fare;
2. perché ogni decisione significativa è stata presa;
3. quali alternative sono state valutate;
4. quale requisito giustifica ogni componente;
5. quali test dimostrano la conformità;
6. come modificare il sistema senza romperne la coerenza.

Una decisione non spiegata è considerata debito documentale, anche quando il comportamento software è corretto.

## 1.1 Identità del programma

Il nome interno dell’ecosistema è **Project Atlas**. Il nome copre documentazione, piattaforma web, dashboard, Jarvis, PrintFlow e agenti AI. È un codename operativo e non sostituisce il brand pubblico **NoLimits3D**.

- nome pubblico: **NoLimits3D**;
- dominio pubblico: `nolimits3d.store`;
- codename interno: **Project Atlas**;
- forma di approvazione prevista: `Project Atlas — Baseline 1.0 Approved`.

Il codename non deve comparire automaticamente in metadata SEO, comunicazioni cliente, UI pubblica o asset commerciali. Può essere usato in repository, documentazione, board, ambienti e report interni.

### Normalizzazione degli identificativi ADR

Le etichette decisionali usate nelle conversazioni possono essere brevi (`ADR-001`, `ADR-002`, …), ma il repository usa ID canonici immutabili a quattro cifre. Le decisioni approvate il 15 luglio 2026 sono registrate come `ADR-0013`–`ADR-0017`, conservando nel singolo ADR l’alias originario. Questa normalizzazione evita di rinumerare o sovrascrivere gli ADR preesistenti.

## 2. Principi di ingegneria documentale

### 2.1 Single Source of Truth

Ogni tema possiede un solo **Owner Document**. Gli altri documenti possono:

- riassumere il contesto in non più di poche righe;
- collegare l'Owner Document;
- dichiarare l'impatto locale;
- non possono ricopiare definizioni, tabelle o regole in forma concorrente.

Quando due documenti contengono la stessa informazione normativa, la duplicazione deve essere rimossa e sostituita con un riferimento.

### 2.2 Documentation First

Nessuna feature entra nello stato `Ready for Development` finché non esistono almeno:

- requisito identificato;
- criteri di accettazione verificabili;
- owner document;
- impatti UX, dati, API, sicurezza e test valutati;
- task e dipendenze nella roadmap;
- ADR, se la decisione è architetturalmente significativa.

### 2.3 Architecture Before Code

Le scelte difficili da invertire devono precedere l'implementazione. Una pull request non può essere usata per introdurre silenziosamente una decisione architetturale.

### 2.4 Traceability by Default

Ogni requisito stabile deve avere un ID immutabile ed essere collegato, ove applicabile, a:

```text
Requirement → Owner Document → UX/Component → API → Data → Security → Test → Roadmap → Release
```

La Requirements Traceability Matrix è un indice di collegamento; non sostituisce i documenti proprietari.

### 2.5 Minimum Necessary Documentation

Un nuovo documento è ammesso solo quando almeno una delle condizioni seguenti è vera:

- possiede un ciclo di vita diverso dal documento esistente;
- ha un owner o approvatore diverso;
- rappresenta una decisione atomica che deve essere storicizzata, come un ADR;
- contiene una specifica operativa sufficientemente autonoma da diventare ingestibile nel documento esistente;
- è un artefatto machine-readable necessario a CI, importazione o audit.

In tutti gli altri casi si estende il documento esistente.

### 2.6 Reasoning Preservation

Ogni decisione significativa deve documentare non solo l'esito, ma anche:

- contesto;
- driver;
- vincoli;
- alternative;
- trade-off;
- conseguenze positive e negative;
- condizioni che ne giustificherebbero la revisione.

## 3. Architettura della documentazione

La documentazione è trattata come un grafo versionato, non come un insieme di file indipendenti.

### 3.1 Livelli

| Livello | Contenuto | Autorità |
|---|---|---|
| L0 | Charter e policy di governance | governa il sistema documentale |
| L1 | Constitution, vision, glossario | governa il prodotto e il linguaggio |
| L2 | PRD, business rules, domain model, SDS | definisce prodotto e architettura |
| L3 | Feature, UX, UI, AI, API, data, security | specifica i sottosistemi |
| L4 | Roadmap, RTM, ADR, CR, test plan | governa esecuzione e cambiamento |
| L5 | Codice, infrastruttura e test | implementa la baseline approvata |

### 3.2 Struttura delle cartelle

La struttura esistente è stabile e non viene riorganizzata senza Change Request approvata:

```text
000_PROJECT_CHARTER.md
000_GOVERNANCE/
00_Foundation/
01_Product/
02_Architecture/
03_Design/
04_Experience/
05_Features/
06_Admin/
07_AI/
08_Data_API/
09_SEO_Content/
10_Security_Performance/
11_Engineering_Operations/
12_Planning/
13_Appendices/
prompts/
```

`prompts/` è una libreria operativa versionata. I prompt sono artefatti controllati, non il meccanismo di governance della documentazione.

### 3.3 Metadati minimi

Ogni documento governato deve dichiarare:

- Document ID;
- titolo;
- versione;
- stato;
- owner;
- approvatore;
- data di ultima revisione;
- ambito autorevole;
- dipendenze principali, quando rilevanti.

I documenti sorgente archiviati in `13_Appendices/Source_Starter_Kit/` sono immutabili e possono mantenere il formato originale.

## 4. Identificatori stabili

Gli ID non vengono riutilizzati, rinumerati o modificati dopo l'approvazione.

| Tipo | Pattern | Esempio |
|---|---|---|
| Documento | `DOC-AREA-NNN` | `DOC-ARCH-007` |
| Requisito | `AREA-F-NNN` / `AREA-NF-NNN` | `<AREA>-F-<NNN>` |
| Business rule | `BR-AREA-NNN` | `BR-QUOTE-003` |
| Decisione | `ADR-NNNN` | `ADR-0007` |
| Change Request | `CR-NNNN` | `CR-0001` |
| API | `API-NNN` | `API-042` |
| Entità dati | `DATA-NNN` | `DATA-018` |
| Componente UI | `COMP-NNN` | `COMP-024` |
| Test | `TEST-NNNN` | `TEST-0312` |
| Roadmap | `E/F/S/T/ST-NNNN` | `T-0274` |
| Prompt | `PRM-AREA-NNN` | `PRM-SEO-002` |

Il percorso può evolvere tramite Change Request; l'ID rimane immutabile.

## 5. Owner Document e anti-duplicazione

### 5.1 Registry degli owner

Il registry autorevole è `000_GOVERNANCE/011_OWNER_REGISTRY.md`. Alcuni esempi:

| Tema | Owner Document |
|---|---|
| governance documentale | `000_PROJECT_CHARTER.md` |
| principi software | `00_Foundation/00_Project_Constitution.md` |
| requisiti prodotto trasversali | `01_Product/01_PRD.md` |
| regole di business | `01_Product/03_Business_Rules.md` |
| stati di dominio | `01_Product/04_State_Machines.md` |
| componenti UI | `03_Design/04_Component_Library.md` |
| media e immagini | `03_Design/05_Image_Guidelines.md` |
| modello dati | `08_Data_API/01_Database_Design.md` |
| contratti API | `08_Data_API/04_API_Contract.md` e catalogo endpoint |
| decisioni | singoli ADR |
| piano di lavoro | `12_Planning/03_Master_Development_Roadmap.md` |

### 5.2 Regola di risoluzione

Quando viene rilevata un'informazione duplicata:

1. individuare il documento che possiede l'ambito autorevole;
2. integrare lì l'informazione migliore;
3. sostituire le copie con riferimenti;
4. aggiornare RTM e collegamenti;
5. registrare l'intervento nel Change Request, se incide sulla baseline.

## 6. Forbidden Actions

È vietato, senza Change Request approvata:

- creare documenti duplicati;
- creare un nuovo documento quando è sufficiente ampliare quello esistente;
- rinominare cartelle senza motivazione e impact analysis;
- cambiare numerazione o ID stabili;
- spostare documenti esistenti;
- creare file `v2`, `final`, `finalissimo`, `new` o simili lasciando la versione precedente incompleta;
- rompere collegamenti interni;
- eliminare un documento senza deprecarlo e indicarne il sostituto;
- modificare un ADR `Accepted` senza un nuovo ADR che lo superseda;
- cambiare requisiti senza aggiornare RTM, test e roadmap;
- copiare contenuti tra documenti per comodità;
- usare testi generici o non verificabili per simulare completezza;
- introdurre tecnologie, fornitori o servizi come decisioni definitive senza ADR;
- descrivere PrintFlow come funzionalità attiva in Fase 1;
- eseguire azioni AI ad alto impatto senza human review quando richiesto dalle policy.

## 7. Processo obbligatorio di aggiornamento

Ogni attività documentale segue questa sequenza:

```text
Leggere integralmente
        ↓
Analizzare dipendenze e owner
        ↓
Comprendere intenti, vincoli e decisioni pregresse
        ↓
Integrare nel documento autorevole
        ↓
Aggiornare cross-reference, RTM, ADR, backlog e roadmap
        ↓
Verificare link, duplicazioni, contraddizioni e ID
        ↓
Creare un nuovo documento solo se giustificato
        ↓
Eseguire audit e sottoporre a revisione
```

Saltare i primi tre passaggi rende la modifica non conforme.

## 8. Ciclo di vita

Gli stati ammessi sono:

```text
Draft → In Review → Approved → Baselined → Deprecated → Archived
```

- **Draft:** incompleto e non normativo.
- **In Review:** completo secondo l'autore, in attesa di controllo.
- **Approved:** accettato ma non ancora incluso in una baseline congelata.
- **Baselined:** parte del contratto ufficiale di sviluppo.
- **Deprecated:** valido solo per ricostruzione storica; deve indicare il sostituto.
- **Archived:** non più operativo, conservato per audit.

Una baseline congelata non viene modificata in place. Le modifiche confluiscono nella versione successiva tramite Change Request.

## 9. Versioning

La politica completa è in `000_GOVERNANCE/002_VERSIONING_POLICY.md`.

Per NoLimits3D:

- `v0.9`: foundation iniziale;
- `v0.95`: architettura consolidata e governance;
- `v1.0`: Frozen Baseline che autorizza l'avvio dello sviluppo;
- `v1.x`: evoluzione backward-compatible controllata;
- `v2.0`: revisione incompatibile deliberata.

Il numero di versione descrive la baseline complessiva, non il grado di completezza di un singolo file.

## 10. Change Request

Ogni modifica significativa richiede una CR con:

- problema e motivazione;
- scope;
- documenti e ID coinvolti;
- impatto su requisiti, architettura, UX, dati, API, sicurezza, test e roadmap;
- alternative considerate;
- rischio di non intervenire;
- piano di migrazione;
- criteri di approvazione;
- ADR richiesti;
- esito della review.

Modifiche editoriali senza impatto semantico possono essere raggruppate, purché non cambino requisiti o decisioni.

## 11. ADR

Un ADR è obbligatorio quando la decisione:

- è costosa o difficile da invertire;
- influenza più moduli;
- introduce un nuovo servizio, framework o data store;
- cambia un confine di sicurezza o privacy;
- modifica un contratto pubblico;
- accetta consapevolmente un trade-off rilevante;
- supersede una decisione precedente.

Un ADR non è un diario delle attività e non sostituisce una feature specification.

## 12. Requirements Traceability Matrix

La RTM deve essere aggiornata nello stesso Change Request che modifica un requisito. La copertura minima per un requisito `Must` è:

- owner document;
- criteri di accettazione;
- roadmap item;
- test previsto;
- impatti dati/API oppure indicazione esplicita `N/A`;
- stato di implementazione.

Gli elementi `N/A` devono essere motivati; le celle vuote non sono ammesse nella baseline.

## 13. Regole di scrittura

La documentazione deve essere:

- normativa quando definisce obblighi (`deve`, `non deve`);
- verificabile, con criteri osservabili;
- esplicita su assunzioni e decisioni ancora aperte;
- priva di slogan non tradotti in requisiti;
- comprensibile a un nuovo sviluppatore competente;
- sufficientemente tecnica da guidare l'implementazione;
- parsimoniosa nei riepiloghi duplicati.

Diagrammi Mermaid, tabelle e pseudocodice sono preferiti quando chiariscono flussi, stati, dipendenze o cardinalità.

## 14. Quality Gates

Un documento può passare a `Approved` solo se:

- ha owner e ambito autorevole;
- non duplica contenuti normativi;
- usa ID stabili;
- contiene criteri verificabili;
- dichiara assunzioni e open decision;
- possiede cross-reference necessarie;
- non introduce contraddizioni;
- supera i controlli automatici applicabili.

La baseline può essere congelata solo se tutti i gate bloccanti della policy `007_QUALITY_GATES.md` sono verdi.

## 15. AI Collaboration Policy

Un agente AI può leggere, analizzare, integrare, proporre, produrre diagrammi, aggiornare indici e svolgere audit. Non può autonomamente:

- approvare una baseline;
- cambiare ID stabili;
- eliminare documenti;
- modificare decisioni accettate senza ADR;
- trasformare assunzioni in fatti;
- pubblicare o eseguire azioni irreversibili fuori dal perimetro autorizzato.

Ogni output AI deve distinguere tra contenuto derivato da fonti, assunzioni progettuali e decisioni che richiedono approvazione umana.

## 16. Audit finale obbligatorio

Prima della consegna di una versione vengono controllati almeno:

- duplicati semantici;
- contraddizioni;
- file orfani;
- link interrotti;
- documenti senza owner o metadati;
- requisiti non tracciati;
- RTM, ADR, backlog e roadmap non sincronizzati;
- ID duplicati o mancanti;
- documenti deprecati senza sostituto;
- presenza di `PrintFlow è attualmente in sviluppo` in ogni specifica Fase 1 pertinente;
- coerenza del numero di versione;
- documentazione debt aperto.

L'audit produce uno dei due stati:

```text
Documentation Status: CONSISTENT
```

oppure:

```text
Documentation Status: NEEDS REVIEW
```

`CONSISTENT` significa coerenza strutturale e semantica rispetto alla baseline, non approvazione commerciale o legale. `NEEDS REVIEW` è obbligatorio quando esistono decisioni bloccanti non approvate, contraddizioni o gate falliti.

## 17. Processo di approvazione e congelamento

1. l'autore prepara la versione candidata;
2. l'audit automatico produce metriche e anomalie;
3. il Lead Architect verifica architettura e tracciabilità;
4. il Product Owner verifica requisiti e priorità;
5. il CTO approva o respinge con motivazioni;
6. tutte le osservazioni bloccanti vengono risolte;
7. viene generato il manifest con hash;
8. la versione viene marcata `Baselined` e resa immutabile;
9. ogni evoluzione successiva parte da una nuova CR.

La versione `0.95` resta `In Review`. Solo l'approvazione esplicita può generare la Frozen Baseline `1.0`.

<!-- V0952-GUARDS:START -->
## 16. Guardie semantiche Project Atlas v0.95.2

Queste guardie sono controllate dalla Documentation CI e non sostituiscono gli Owner Document di prodotto:

- **Website-centric guard:** il sito NoLimits3D è il centro dell’ecosistema Project Atlas; documenti, roadmap e diagrammi non possono rappresentare sito, Jarvis e PrintFlow come prodotti pubblici equivalenti.
- **Jarvis private guard:** Jarvis è accessibile esclusivamente ad Andrea nel NoLimits Command Center; non compare nella navigazione pubblica, nell’area cliente o nell’offerta commerciale.
- **PrintFlow Phase 1 guard:** PrintFlow resta “In arrivo”, privo di funzioni pubbliche operative e non blocca il rilascio del sito.
- **Accepted ADR immutability guard:** ADR-0013–ADR-0017 non vengono riscritti; le nuove decisioni complementari hanno ID successivi.
- **Application stack review guard:** React + TypeScript + Vite è la scelta corrente, ma la Frozen Baseline richiede il review gate formale contro Next.js definito da ADR-0018.

Una violazione di una guardia produce `NEEDS REVIEW`, anche se link, RTM e manifest sono formalmente validi.
<!-- V0952-GUARDS:END -->

<!-- V0954-ATLAS-PHILOSOPHY:START -->
## 19. Project Atlas Philosophy

Project Atlas è il sistema operativo progettuale che mantiene coerenti brand, prodotto, architettura, documentazione e implementazione. Non è un prodotto pubblico e non sostituisce NoLimits3D: protegge la visione di NoLimits3D durante il passaggio dalle decisioni al software.

La filosofia è riassunta da sei proposizioni:

1. **Il sito è il centro:** il sito NoLimits3D è il punto di ingresso, relazione, conversione e governo dell'ecosistema.
2. **La documentazione precede il codice:** il software implementa requisiti e decisioni approvati; non li inventa.
3. **L'automazione aumenta la qualità:** AI e workflow riducono attrito e lavoro ripetitivo, senza eliminare responsabilità, giudizio o rapporto umano.
4. **L'autorità resta umana:** Andrea è Product Owner; le decisioni irreversibili o ad alto impatto richiedono approvazione esplicita.
5. **La verità prevale sull'effetto:** niente team, capacità, prove, prezzi, stati o promesse simulati.
6. **La crescita resta reversibile:** si preferiscono soluzioni semplici, osservabili e migrabili; la complessità viene introdotta solo quando esiste evidenza.

### 19.1 Gerarchia delle autorità

In caso di conflitto si applica, nell'ordine:

1. Project Charter per governance e lifecycle documentale;
2. Project Constitution e Project Invariants per principi e limiti del prodotto;
3. ADR `Accepted` per decisioni architetturali atomiche;
4. Owner Document per requisiti e regole di dominio;
5. RTM per collegamenti, non per contenuto normativo;
6. Roadmap per ordine esecutivo, non per reinterpretare lo scope;
7. codice e configurazione come artefatti derivati.

Un livello inferiore non può derogare a un livello superiore senza il processo di Change Request e, quando necessario, un ADR.

### 19.2 Regola di arresto

Quando una persona o un agente incontra una decisione mancante, un conflitto tra fonti o un requisito non tracciato deve:

1. interrompere la modifica interessata;
2. registrare il punto di ambiguità;
3. individuare l'Owner Document;
4. richiedere la decisione all'autorità indicata dalla Decision Authority Matrix;
5. riprendere solo dopo aggiornamento e approvazione della documentazione.

Non è consentito colmare l'ambiguità con una preferenza tecnica implicita.

## 20. Release Candidate governance

La v0.95.4 prepara, ma non dichiara, la Release Candidate v1.0. Il passaggio richiede una Architectural Review integrale condotta dal Lead Architect e approvata dal Product Owner. L'esito possibile è:

- `RC APPROVED`: può essere preparato il pacchetto v1.0-rc;
- `NEEDS REMEDIATION`: vengono aperti debt/CR mirati;
- `REJECTED`: la candidate non è idonea e non può essere congelata.

La Frozen Baseline può essere dichiarata solo con evidenza di review, chiusura dei blocker e Change Request di baseline dedicata.
<!-- V0954-ATLAS-PHILOSOPHY:END -->

<!-- V096-RC-BOUNDARY:START -->
## 21. Release Candidate v0.96 e confine del Development Blueprint

La v0.96 è la **Release Candidate della Documentation Bible**, non la Frozen Baseline. La sua funzione è dimostrare che lo scope di prodotto è consolidato, che le fonti autorevoli sono identificabili e che un nuovo CTO, senior developer o agente AI può proseguire senza reinterpretare la visione.

### 21.1 Significato di `RELEASE CANDIDATE`

`RELEASE CANDIDATE` significa:

- il perimetro di prodotto è concluso e non riceve nuove idee tramite questa release;
- le decisioni approvate, gli invarianti e i Negative Requirements sono protetti;
- RTM e roadmap rappresentano integralmente lo scope corrente;
- eventuali elementi ancora aperti sono decisioni, asset o validazioni nominate, non lacune nascoste;
- la promozione a Frozen Baseline richiede approvazione esplicita del Lead Architect e del Product Owner.

Non significa che i gate aperti siano implicitamente risolti, né autorizza l'avvio dell'implementazione produttiva.

### 21.2 Handoff al progetto separato `Project Atlas — Development Blueprint`

Il Development Blueprint è un progetto derivato e separato. Può tradurre la baseline approvata in:

- struttura eseguibile del repository;
- sequenza di implementazione per milestone;
- contratti tecnici e test executable;
- configurazione di ambienti, CI e deployment;
- runbook di sviluppo e rilascio.

Il Blueprint non può cambiare scope, UX, business rule, Jarvis, PrintFlow, Project DNA, ADR Accepted o Negative Requirements. Una divergenza richiede ritorno alla Documentation Bible tramite Change Request e, quando necessario, ADR.

### 21.3 Regola di uscita

La progettazione di prodotto è considerata conclusa quando la v0.96 viene accettata come Release Candidate. La Frozen Baseline v1.0 viene dichiarata solo dopo la chiusura dei blocker elencati nel Release Candidate Report e una decisione firmata del Product Owner e del Lead Architect.
<!-- V096-RC-BOUNDARY:END -->

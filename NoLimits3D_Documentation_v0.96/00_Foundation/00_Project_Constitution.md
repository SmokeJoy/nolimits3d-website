# Project Constitution

> **Document ID:** DOC-FND-001  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** CTO / Product Architecture  
> **Approvatore:** Project Owner  
> **Ambito autorevole:** principi non negoziabili del prodotto, del brand operating model e dell’architettura NoLimits3D. La governance documentale appartiene a `/000_PROJECT_CHARTER.md`.

## 1. Identità e gerarchia

Il programma interno è **Project Atlas**. Il brand pubblico è **NoLimits3D**, il payoff approvato è **“Le tue idee prendono forma.”** e il dominio canonico è `nolimits3d.store`.

> **Il sito NoLimits3D è il centro dell’intero ecosistema Project Atlas.**

```text
Project Atlas
└── NoLimits3D Website Platform
    ├── laboratorio digitale pubblico;
    ├── catalogo, servizi, Realizzazioni e contenuti;
    ├── configuratori e richieste personalizzate;
    ├── area cliente, eventi e newsletter;
    ├── pagina PrintFlow “In arrivo”;
    ├── preventivatore STL, Fase 2;
    └── NoLimits Command Center privato
        └── Jarvis futuro, esclusivamente per Andrea dopo i gate dedicati.
```

Jarvis è una capability interna futura, non implementata o attiva nella fase corrente. PrintFlow è una capability futura presentata dal sito e non una dipendenza della Fase 1.

## 2. Missione

> Aiutare persone, professionisti, aziende e istituzioni a trasformare idee, esigenze e problemi in soluzioni concrete attraverso progettazione, stampa 3D e tecnologie innovative, mantenendo eccellenza, trasparenza, prezzi onesti e un rapporto umano diretto.

## 3. Visione a cinque anni

> Diventare il punto di riferimento per la stampa 3D e la produzione digitale nel territorio, con ambizione nazionale, creando valore, innovazione e opportunità di lavoro nella zona attraverso qualità, automazione intelligente e crescita sostenibile.

NoLimits3D mira a diventare il lavoro principale del fondatore, crescere come impresa con persone reali, creare occupazione nel territorio e gestire progetti progressivamente più importanti senza sacrificare qualità, trasparenza o rapporto umano.

## 4. North Star

> **Ogni visitatore deve sentirsi nel posto giusto ancora prima di conoscere tutti i prodotti e i servizi disponibili.**

La Home e ogni landing devono rispondere a una domanda reale e guidare verso la soluzione più adatta, non verso il prodotto più facile da vendere.

## 5. Valori costituzionali

1. **Innovazione:** tecnologia e automazione risolvono problemi reali e misurabili.
2. **Personalizzazione:** la soluzione si adatta all’obiettivo entro vincoli dichiarati.
3. **Competenza:** materiali, processi, rischi e trade-off vengono spiegati chiaramente.
4. **Qualità:** precisione, controllo, revisione e prove sostituiscono claim assoluti.
5. **Trasparenza:** prezzi, range, limiti, stato, origine dei media e responsabilità sono comprensibili.

Precisione è una manifestazione della Qualità; onestà dei prezzi e dei consigli è una manifestazione della Trasparenza; automazione intelligente è una manifestazione dell’Innovazione; impatto locale e occupazione sono obiettivi della strategia a cinque anni.

## 6. Principi non negoziabili

### PC-01 — Website-centric ecosystem
Tutti i moduli rafforzano il sito NoLimits3D come punto unico di scoperta, vendita, relazione e amministrazione.

### PC-02 — Private Jarvis
Qualunque futura attivazione di Jarvis sarà accessibile esclusivamente ad Andrea nel NoLimits Command Center, dopo il Blueprint e i gate server-side dedicati; resta invisibile e inaccessibile a pubblico e clienti.

### PC-03 — Phase independence
La Fase 1 funziona senza PrintFlow operativo, slicing automatico, pricing STL automatico o disponibilità continua del PC Server.

### PC-04 — Modular monolith first
La Fase 1 usa un modular monolith con confini di dominio espliciti; niente microservizi prematuri.

### PC-05 — Supabase-backed, API-first
PostgreSQL è il system of record; Supabase fornisce Auth, Storage, RLS, Edge Functions e Realtime selettivo.

### PC-06 — Human accountability
Azioni commerciali, finanziarie, legali, distruttive, di pubblicazione o modifica permessi richiedono responsabilità umana e audit.

### PC-07 — Software Quality Website
Ogni pagina deve comportarsi come software professionale: stato chiaro, feedback immediato, recovery, consistenza, accessibilità e performance.

### PC-08 — Secure and private by default
Least privilege, deny by default, RLS, validazione server-side, isolamento upload, minimizzazione dati e audit sono requisiti iniziali.

### PC-09 — Single governed media source
Ogni asset è caricato una volta, conserva provenance e diritti e viene riutilizzato tramite riferimenti e derivative.

### PC-10 — Controlled commerce
Il catalogo è unificato, ma checkout e pagamento dipendono dal tipo di offerta e dalla validazione necessaria.

### PC-11 — Observable operations
Richieste, job, side effect e azioni AI significative producono correlation ID, log, metriche e audit.

### PC-12 — Compatibility and migration
API, schema, prompt, configurazioni e provider evolvono con versioning, migrazioni e deprecazione.

### PC-13 — Solution before product
NoLimits3D guida il cliente verso la soluzione più adatta all’obiettivo, anche quando significa sconsigliare una lavorazione non idonea o non economicamente sensata.

### PC-14 — Digital laboratory, not generic e-commerce
Il visitatore entra nel laboratorio digitale NoLimits3D: catalogo, configurazione, consulenza, casi reali e processo lavorano insieme.

### PC-15 — Founder-led truth
NoLimits3D parla come brand; Andrea parla in prima persona quando descrive relazione, analisi e controllo qualità. È vietato inventare team, tecnici, reparti, numeri, certificazioni o capacità inesistenti.

### PC-16 — Authentic evidence
Laboratorio, prodotti, fiere, clienti, recensioni e risultati sono rappresentati con prove autentiche. AI e render possono creare visual concettuali dichiarati, mai prove false.

### PC-17 — Functional immersion
Motion, video, 3D e glow devono guidare, spiegare o dare feedback; non possono sostituire contenuto, rallentare il task o impedire accessibilità, SEO e fallback.

### PC-18 — Every page answers a real question
Ogni pagina deve essere la migliore risposta possibile a una domanda reale del potenziale cliente.

### PC-19 — Automation with quality
Ogni funzione deve ridurre progressivamente il tempo operativo richiesto ad Andrea senza ridurre la qualità del servizio.

### PC-20 — Architecture value gate
Ogni nuova funzione deve migliorare almeno uno tra esperienza cliente, qualità, automazione, gestione dell’attività o crescita del business; altrimenti resta nelle Future Ideas.

## 7. Modello di comunicazione

- pagine istituzionali e commerciali: “NoLimits3D realizza…”, “Il laboratorio segue…”;
- presentazione, assistenza e controllo qualità: prima persona singolare di Andrea;
- “noi” solo per collaborazione reale con il cliente o futuro team effettivo;
- niente superlativi o leadership non dimostrabili;
- il payoff ufficiale resta **“Le tue idee prendono forma.”**

## 8. Principi UX e Customer Experience

- Home guidata dalla domanda **“Cosa vuoi realizzare oggi?”**;
- percorsi distinti per pezzo/ricambio, idea, regalo, professionale, lanterna/HueForge e Realizzazioni;
- Catalogo, Realizzazioni e Ispirati mantengono scopi differenti;
- stato corrente, prossimo passo, responsabilità e limiti sono sempre chiari;
- contenuto core resta fruibile senza JavaScript, WebGL, autoplay o personalizzazione;
- tastiera, touch, screen reader e `prefers-reduced-motion` sono requisiti di base;
- nessun dark pattern, urgenza artificiale o capacità simulata.

## 9. Processo costituzionale

> **Progettare, documentare, implementare, testare e pubblicare, in questo ordine.**

Non scegliere scorciatoie che producono debito tecnico o compromettono la manutenibilità, salvo eccezione accettata tramite Change Request e ADR.

## 10. Violazioni costituzionali

Sono violazioni: rendere Jarvis pubblico; dipendere dal PC Server per il sito; attivare PrintFlow in Fase 1; introdurre microservizi prematuri; bypassare RLS o human approval; duplicare cataloghi o media; usare motion senza scopo; descrivere una stima come prezzo finale; fingere team o prove; usare fotografie AI come Andrea; presentare il logo concettuale come asset approvato.

<!-- V0954-PROJECT-DNA-INVARIANTS:START -->
## 11. Project DNA

Il **Project DNA** è l'insieme minimo di caratteristiche che deve rimanere riconoscibile in ogni release, pagina, workflow e decisione:

| Dimensione | DNA non negoziabile | Evidenza attesa |
|---|---|---|
| Identità | NoLimits3D è un laboratorio digitale reale, founder-led e trasparente. | contenuti, media e flussi coerenti con Brand Book e ADR-0025 |
| Centro | Il sito NoLimits3D coordina scoperta, relazione, commercio e amministrazione. | sitemap, routing e integrazioni conformi ad ADR-0024 |
| Relazione | Andrea mantiene responsabilità e contatto umano nei passaggi decisivi. | handoff, review e comunicazioni attribuite correttamente |
| Qualità | precisione, verifica e limiti dichiarati prevalgono sulla velocità apparente. | acceptance criteria, controlli, audit e revisioni |
| Automazione | AI e workflow sono strumenti subordinati all'obiettivo e all'autorità umana. | log, approval gate e fallback manuale |
| Evoluzione | modularità, reversibilità e semplicità precedono distribuzione prematura. | ADR, boundary test e migration path |
| Verità | nessuna capacità, persona, prova o stato viene simulato. | content review, media provenance e negative tests |
| Accessibilità | immersione, 3D e motion restano progressive enhancement. | fallback, reduced motion, performance e WCAG |

## 12. Project Invariants

Gli invarianti valgono in ogni ambiente e non possono essere disattivati tramite feature flag, configurazione editoriale o scelta implementativa.

> **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**

| ID | Invariante | Verifica minima |
|---|---|---|
| INV-001 | Il sito NoLimits3D resta il centro pubblico dell'ecosistema. | nessun prodotto parallelo sostituisce il sito |
| INV-002 | Qualunque futura attivazione di Jarvis è riservata esclusivamente ad Andrea nel Command Center dopo i gate dedicati. | nessuna route, endpoint, CTA, menu o contenuto pubblico; nessuna capability corrente |
| INV-JARVIS-001 | Jarvis non è pubblico, customer-facing o parte del team di sviluppo e non può essere implementato prima di un Blueprint dedicato e della fondazione server-side di identità/capability. | verifica Andrea-only, `jarvis.use`, autorizzazione per tool, RLS, audit, negative test e approval gate prima dell'attivazione |
| INV-003 | PrintFlow in Fase 1 è esclusivamente `Coming Soon`. | nessuna funzione produttiva pubblica o promessa di disponibilità |
| INV-004 | Ogni preventivo STL finale richiede revisione umana. | stato finale impossibile senza reviewer e audit |
| INV-005 | L'automazione non sostituisce il rapporto umano nei passaggi ad alto impatto. | handoff e responsabilità sempre visibili |
| INV-006 | Nessuna feature entra nel software se assente da Owner Document, RTM e roadmap. | traceability gate bloccante |
| INV-007 | Nessuna AI può reinterpretare requisito, UX, workflow, Jarvis o architettura. | diff review e authority check |
| INV-008 | NoLimits3D parla come brand; Andrea parla in prima persona solo nelle sezioni dedicate. | content lint/editorial review |
| INV-009 | È vietato inventare team, reparti, tecnici, certificazioni, risultati o capacità. | truthfulness gate |
| INV-010 | Il PC Compute Worker non ospita né rende disponibile il sito pubblico. | network/deployment review |
| INV-011 | Il sistema pubblico deve funzionare senza PC Worker, Jarvis, PrintFlow o WebGL. | resilience e fallback test |
| INV-012 | Un ADR `Accepted` non viene modificato: viene eventualmente superseded da un nuovo ADR. | hash/diff governance check |
| INV-013 | Gli ID approvati non vengono rinumerati o riutilizzati. | uniqueness e historical continuity test |
| INV-014 | Nessuna baseline viene congelata automaticamente da un agente. | approval evidence del Product Owner e Lead Architect |
| INV-015 | I contenuti recuperati e gli input utente restano dati non fidati. | prompt-injection e tool-boundary test |
| INV-016 | Il contenuto core resta accessibile, indicizzabile e comprensibile senza enhancement. | no-JS/no-WebGL/a11y/SEO test |

Registrazione canonica machine-readable:

```yaml
id: INV-JARVIS-001
statement: "Jarvis is Andrea's private AI assistant inside the NoLimits3D Command Center. It is not public, not customer-facing, not a development-team member, and not authorized for implementation before a dedicated Blueprint and identity/capability security foundation."
classification: Accepted decision; Project Invariant
authority: Chief Architect and Product Owner
status: active
```

## 13. Negative Requirements

I Negative Requirements descrivono comportamenti proibiti e devono essere testati come requisiti positivi. Una loro violazione è una regressione, anche quando il flusso principale continua a funzionare.

| ID | Il sistema NON deve | Controllo |
|---|---|---|
| NEG-001 | esporre Jarvis a clienti, visitatori, utenti autenticati ordinari o ruoli non autorizzati; | route/API/RBAC/content/bundle scan e negative authorization test |
| NEG-002 | presentare PrintFlow come attivo, disponibile o produttivo in Fase 1; | content e feature-flag test |
| NEG-003 | emettere un preventivo STL finale senza review umana; | state-machine e authorization test |
| NEG-004 | introdurre feature, campi, CTA o workflow fuori RTM; | PR traceability gate |
| NEG-005 | inventare persone, team, reparti, recensioni, risultati o certificazioni; | editorial truth review |
| NEG-006 | descrivere immagini AI o render come fotografie/prove reali; | media provenance gate |
| NEG-007 | permettere a un agente AI di cambiare UX, workflow, architettura o requisiti autonomamente; | authority matrix enforcement |
| NEG-008 | modificare documenti costituzionali senza CR e approvazione; | protected-path review |
| NEG-009 | modificare un ADR Accepted in-place; | immutable ADR hash check |
| NEG-010 | rendere il sito dipendente dalla disponibilità del PC Worker; | outage/failure test |
| NEG-011 | usare motion, video o 3D come blocco del contenuto o dell'azione; | progressive enhancement test |
| NEG-012 | pubblicare claim commerciali o legali non approvati; | publication approval gate |
| NEG-013 | trasformare una stima automatica in prezzo vincolante senza regole e responsabilità; | pricing/handoff test |
| NEG-014 | aggirare RLS, least privilege o validazione server-side; | security test |
| NEG-015 | usare dati personali o analytics oltre consenso, scopo e retention approvati; | privacy/consent test |
| NEG-016 | creare documentazione duplicata quando esiste un Owner Document idoneo. | duplicate-topic audit |
| NEG-JARVIS-001 | implementare route, endpoint, prompt runtime, memoria, provider, tool o capability Jarvis prima del Blueprint dedicato e dei gate di identità/capability; | scope guard, Blueprint authority check e assenza di diff prodotto |
| NEG-JARVIS-002 | trattare Jarvis come agente, coordinatore o approvatore del team di sviluppo. | Role Boundary Test e operating-memory audit |

## 14. Requisiti costituzionali v0.95.4

| ID | Requisito | Priorità |
|---|---|---|
| ATLAS-NF-001 | Il sito NoLimits3D deve restare il centro pubblico e operativo di Project Atlas. | Must |
| ATLAS-NF-002 | Jarvis non deve essere esposto tramite alcuna superficie pubblica o cliente. | Must |
| ATLAS-NF-003 | PrintFlow deve restare esclusivamente Coming Soon durante la Fase 1. | Must |
| ATLAS-NF-004 | Un preventivo STL finale deve richiedere revisione e responsabilità umana. | Must |
| ATLAS-NF-005 | I passaggi commerciali e qualitativi rilevanti devono preservare un handoff umano comprensibile. | Must |
| ATLAS-NF-006 | Nessun comportamento software può essere implementato fuori Owner Document, RTM e roadmap. | Must |
| ATLAS-NF-007 | La comunicazione deve distinguere la voce del brand dalla voce personale di Andrea. | Must |
| ATLAS-NF-008 | Il sistema non deve rappresentare persone, capacità o prove inesistenti. | Must |
| ATLAS-NF-009 | Documenti costituzionali e ADR Accepted devono essere protetti da modifiche non governate. | Must |
| ATLAS-NF-010 | In presenza di decisione mancante o conflitto, implementazione e modifica devono fermarsi fino a risoluzione approvata. | Must |
<!-- V0954-PROJECT-DNA-INVARIANTS:END -->

<!-- V096-FROZEN-READINESS:START -->
## 15. Frozen Baseline readiness contract

La conformità costituzionale della candidate richiede simultaneamente:

1. sito NoLimits3D confermato come centro dell'ecosistema;
2. Jarvis irraggiungibile da superfici pubbliche e cliente;
3. PrintFlow limitato a `Coming Soon` nella fase corrente;
4. revisione umana obbligatoria per ogni preventivo STL finale;
5. assenza di team, prove, capacità o stati inventati;
6. comunicazione founder-led coerente e trasparente;
7. nessuna feature fuori Owner Document, RTM e roadmap;
8. nessuna modifica in-place agli ADR Accepted;
9. chiusura esplicita dei blocker di Frozen Baseline;
10. approvazione umana registrata.

Il rispetto dei primi otto punti rende la documentazione una Release Candidate coerente. I punti 9 e 10 determinano la promozione alla Frozen Baseline.
<!-- V096-FROZEN-READINESS:END -->

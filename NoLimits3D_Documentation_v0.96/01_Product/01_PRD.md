# Product Requirements Document

> **Document ID:** DOC-PROD-001  
> **Versione:** 0.95.4  
> **Stato:** In Review  
> **Owner:** Product  
> **Approvatore:** Project Owner  
> **Ambito autorevole:** requisiti trasversali di prodotto; le specifiche di dettaglio appartengono agli Owner Document delle feature.

## 1. Visione del prodotto

La **NoLimits3D Website Platform** è il centro di Project Atlas e il punto unico in cui clienti privati e aziende scoprono l’offerta, configurano o richiedono prodotti, acquistano dove consentito e seguono la relazione con il laboratorio. Il **NoLimits Command Center** consente ad Andrea di governare contenuti, catalogo, ordini, clienti, media, eventi, SEO, roadmap e automazioni. **Jarvis è esclusivamente privato e interno al Command Center.**

## 2. Scope Fase 1

- sito pubblico premium e indicizzabile;
- catalogo commerciale unificato;
- prodotti standard, varianti, HueForge, lanterne configurabili, servizi e offerte a preventivo;
- carrello, prodotti salvati, account cliente essenziale e creazione ordine;
- checkout e pagamenti controllati per tipologia;
- richieste personalizzate e assistenza;
- portfolio, blog, eventi, newsletter, ricerca e Media Library;
- NoLimits Command Center;
- Jarvis privato con modalità iniziali e human-in-the-loop;
- pagina PrintFlow “In arrivo”.

## 3. Fuori scope Fase 1

- PrintFlow operativo o download non disponibile;
- preventivazione STL automatizzata completa;
- slicing e G-code dipendenti dal PC Worker;
- microservizi;
- backend Express/NestJS dedicato;
- pagamenti wallet/carte avanzati se non ancora approvati;
- assistente AI pubblico Jarvis o accesso Jarvis nell’area cliente.

## 4. Requisiti funzionali

| ID | Requisito | Priorità |
|---|---|---|
| PRD-F-001 | Gestire contenuti, catalogo e configurazioni operative senza deploy applicativo. | Must |
| PRD-F-002 | Pubblicare homepage, servizi, portfolio, blog ed eventi indicizzabili. | Must |
| PRD-F-003 | Offrire catalogo filtrabile con pagine prodotto e varianti amministrabili. | Must |
| PRD-F-004 | Acquisire richieste di contatto e preventivo con allegati controllati. | Must |
| PRD-F-005 | Gestire lead, assegnazione, stato e storico nel Command Center. | Must |
| PRD-F-006 | Gestire newsletter con double opt-in, preferenze e unsubscribe. | Must |
| PRD-F-007 | Fornire amministrazione con RBAC, audit e capability separation. | Must |
| PRD-F-008 | Supportare Media Library con provenance, diritti e derivative. | Must |
| PRD-F-009 | Presentare PrintFlow esclusivamente come “In arrivo” in Fase 1. | Must |
| PRD-F-010 | Consentire configurazioni lanterna salvabili e revisionabili. | Must |
| PRD-F-011 | Preparare il preventivatore STL modulare senza renderlo obbligatorio in Fase 1. | Should |
| PRD-F-012 | Supportare assistenza stampanti con triage e workflow. | Must |
| PRD-F-013 | Tracciare funnel e conversioni nel rispetto del consenso. | Must |
| PRD-F-014 | Fornire automazioni AI governate con human review. | Should |
| PRD-F-015 | Predisporre area cliente, ordini e integrazioni future senza bloccare il lancio. | Must |
| PRD-F-016 | Supportare vendita diretta NoLimits3D e percorso a preventivo per offerte non standard. | Must |
| PRD-F-017 | Presentare brand, payoff e valori approvati in modo coerente. | Must |
| PRD-F-018 | Mantenere Project Atlas come codename interno. | Must |
| PRD-F-019 | Rendere il sito NoLimits3D il centro dell’intero ecosistema Project Atlas. | Must costituzionale |
| PRD-F-020 | Rendere Jarvis accessibile esclusivamente ad Andrea nel Command Center e invisibile al pubblico e ai clienti. | Must sicurezza |
| PRD-F-021 | Fornire il NoLimits Command Center con code operative, salute sistema e azioni proposte. | Must |
| PRD-F-022 | Gestire prodotti, servizi, configurabili, fiera e preventivo tramite un Unified Commerce Catalog. | Must |
| PRD-F-023 | Applicare carrello, checkout, conferma e pagamento in funzione delle regole del prodotto. | Must |
| PRD-F-024 | Consentire account cliente, prodotti salvati, storico ordini e richieste entro lo scope approvato. | Must |

## 5. Requisiti non funzionali

| ID | Requisito | Priorità |
|---|---|---|
| PRD-NF-001 | I flussi core devono raggiungere WCAG 2.2 AA. | Must |
| PRD-NF-002 | Route pubbliche e media devono rispettare i performance budget. | Must |
| PRD-NF-003 | Auth, autorizzazione e upload devono seguire secure-by-default e least privilege. | Must |
| PRD-NF-004 | Dati personali, consensi e retention devono rispettare privacy UE/Italia. | Must launch |
| PRD-NF-005 | Disponibilità target Fase 1: 99,5% mensile esclusa manutenzione. | Should |
| PRD-NF-006 | Backup iniziale almeno RPO 24h e RTO 8h. | Must |
| PRD-NF-007 | Processi critici devono avere log, metriche, audit e correlation ID. | Must |
| PRD-NF-008 | API, dati e configurazioni devono evolvere con compatibilità e migrazione. | Must |
| PRD-NF-009 | Le operazioni ordinarie non richiedono accesso diretto al database. | Must |
| PRD-NF-010 | Pagine pubbliche supportano SEO tecnico, structured data veritieri e canonical. | Must |
| PRD-NF-011 | Esecuzioni AI registrano prompt/versione, modello, tool, costi e review. | Must |
| PRD-NF-012 | I flussi commerciali hanno fallback manuale. | Must |
| PRD-NF-013 | L’interfaccia si comporta come Web Application Premium. | Must |
| PRD-NF-014 | Ogni animazione ha scopo funzionale e variante reduced-motion. | Must |
| PRD-NF-015 | Video, 3D e motion non bloccano contenuto, SEO o conversione. | Must |
| PRD-NF-016 | GitHub è repository autorevole e Vercel Hobby ospita il frontend iniziale. | Must architetturale |
| PRD-NF-017 | Supabase Free fornisce backend iniziale entro quote monitorate. | Must architetturale |
| PRD-NF-018 | Job pesanti sono eseguiti dal PC Server come Compute Worker disaccoppiato. | Must Fase 2 |
| PRD-NF-019 | Il dominio canonico è `nolimits3d.store`. | Must |
| PRD-NF-020 | Lo stack corrente è React, TypeScript e Vite con review gate formale contro Next.js prima della Baseline 1.0. | Must gate |
| PRD-NF-021 | Supabase Auth, Storage, RLS ed Edge Functions sono i servizi backend iniziali; niente Express/NestJS in Fase 1. | Must architetturale |
| PRD-NF-022 | L’architettura Fase 1 è modular monolith con confini di dominio testabili. | Must architetturale |
| PRD-NF-023 | Il sito pubblico resta disponibile quando il PC Compute Worker è spento o irraggiungibile. | Must affidabilità |
| PRD-NF-024 | Route, bundle, API e dati di Jarvis devono essere esclusi da superfici pubbliche e account cliente. | Must sicurezza |

## 6. KPI

Conversione per modalità commerciale, completamento configuratore, lead qualificati, tempo di gestione, ordini senza correzione, riuso asset, CWV, accessibilità, error rate, queue age, review AI accettate e incidenti di autorizzazione.

## 7. Criteri Frozen Baseline

La v1.0 richiede: review gate React/Vite–Next.js; ADR coerenti; brand asset approvati; legal/privacy e consent implementation definiti; piano hardening Compute Worker; RTM e roadmap 100%; audit senza errori strutturali. Fino ad allora: `NEEDS REVIEW`.

<!-- V0953-PRD:START -->
## 8. Brand, Customer Experience e Home — requisiti consolidati

### Posizionamento operativo

NoLimits3D è un laboratorio di progettazione e stampa 3D che trasforma idee, esigenze e problemi in prodotti e soluzioni reali. Il prodotto digitale deve far percepire competenza, onestà e capacità di seguire il progetto senza simulare dimensioni aziendali inesistenti.

### Requisiti funzionali aggiuntivi

| ID | Requisito | Priorità |
|---|---|---|
| PRD-F-025 | La Home deve iniziare con una Hero intent-led e offrire sei percorsi verso pezzo/ricambio, idea, regalo, professionale, lanterna/HueForge e Realizzazioni. | Must |
| PRD-F-026 | Catalogo, Realizzazioni e Ispirati devono restare sezioni distinte e collegarsi senza duplicare contenuti. | Must |
| PRD-F-027 | Home e Chi siamo devono presentare Andrea con nome, ruolo, foto autentica, metodo e responsabilità sul controllo qualità. | Must |
| PRD-F-028 | HueForge deve avere un percorso “Arte in stampa 3D” con spiegazione, galleria, acquisto e personalizzazione distinti. | Must |
| PRD-F-029 | La Home deve spiegare “Come nasce il tuo progetto” e adattare i passaggi al tipo di servizio. | Must |
| PRD-F-030 | Il prodotto deve supportare funnel distinti per servizio, prodotto standard, lanterna catalogo, lanterna personale, HueForge, professionale ed evento. | Must |
| PRD-F-031 | La chiusura Home deve usare una CTA conversazionale verso un canale realmente disponibile e documentato. | Must |

### Requisiti non funzionali aggiuntivi

| ID | Requisito | Priorità |
|---|---|---|
| PRD-NF-025 | La comunicazione non deve inventare team, tecnici, reparti, certificazioni, numeri o capacità non documentate. | Must trust |
| PRD-NF-026 | Fotografie e prove di laboratorio, prodotti, fiere, clienti e risultati devono essere autentiche; AI e render devono essere dichiarati. | Must trust |
| PRD-NF-027 | Hero, intent selector e contenuto core devono essere semantici, crawlable, accessibili e fruibili senza JavaScript/WebGL. | Must |
| PRD-NF-028 | Il logo N+3 è una direzione progettuale; nessuna UI può trattarlo come asset definitivo prima del Brand Asset Gate. | Must governance |
| PRD-NF-029 | La personalizzazione comportamentale è opzionale, soggetta a consenso e non può ridurre l’esperienza generica. | Should privacy |
| PRD-NF-030 | Il sito deve descrivere il laboratorio come operativo e privato, non come negozio aperto al pubblico. | Must trust |
| PRD-NF-031 | Claim di qualità devono essere prudenti, verificabili e subordinati alle condizioni commerciali/legali approvate. | Must legal |

### Outcome Customer Experience

Nei primi secondi l’utente deve riconoscere il proprio bisogno e un percorso plausibile. Dopo circa un minuto deve poter valutare competenza, trasparenza, prove e processo. Questi sono outcome da misurare, non slogan assoluti.
<!-- V0953-PRD:END -->

<!-- V0954-OPERATING-CONSTRAINTS:START -->
## 18. Operating-system constraints v0.95.4

Ogni requisito del PRD è subordinato a Project DNA, Invariants e Negative Requirements definiti nella Project Constitution. Una feature non tracciata nella RTM è fuori scope, anche se tecnicamente semplice. Le AI di sviluppo non possono trasformare un'idea o un'implicazione in requisito; la Decision Authority Matrix governa ogni variazione.
<!-- V0954-OPERATING-CONSTRAINTS:END -->

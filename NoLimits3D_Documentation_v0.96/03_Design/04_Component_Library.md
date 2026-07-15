# Component Library

> **Document ID:** DOC-DES-008  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Product Design  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Regola di documentazione
Ogni componente deve avere: scopo, anatomia, proprietà, varianti, stati, comportamento responsive, accessibilità, analytics, errori, esempi e test.

## Contratto motion e software-quality

Ogni componente interattivo documenta anche: scopo del motion, stato immediato alla pressione, stato asincrono, reduced-motion, perdita rete, retry e comportamento senza hover. Nessun componente ritarda un’azione per completare un’animazione.

## Catalogo

### Header
Navigazione globale, logo, CTA, ricerca e menu mobile.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Footer
Contatti, link legali, social, newsletter e dati attività.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Hero
Proposta di valore, prova visiva e CTA primaria/secondaria.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Button
Azioni primary, secondary, tertiary, destructive, icon-only.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Input
Testo, numero, email, telefono, password, search.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### FormField
Label, hint, error, required e controllo.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Select
Selezione singola/multipla accessibile.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### FileUploader
Drag/drop, limiti, progresso, scanning e retry.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Card
Contenitore generico con gerarchia coerente.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### ProductCard
Media, nome, prezzo/CTA, badge, disponibilità.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### LanternCard
Preview, stile, pannelli e compatibilità.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### STLCard
Nome file, dimensione, stato scansione/analisi.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### ServiceCard
Problema risolto, beneficio e CTA.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Gallery
Immagini responsive, zoom, didascalie e keyboard.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Carousel
Navigazione accessibile, no autoplay obbligatorio.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Breadcrumb
Gerarchia e dati strutturati coerenti.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### FAQ
Accordion accessibile e contenuto indicizzabile.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Timeline
Stati di ordine, progetto o roadmap.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Stepper
Flussi multi-step con stato e salvataggio.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### NewsletterForm
Email, consenso, feedback e double opt-in.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Chat
Messaggi, fonti, escalation umana, allegati controllati.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Modal
Focus trap, escape, titolo e gestione scroll.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Toast
Feedback non critico senza sottrarre focus.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### DataTable
Admin responsive, sort, filter e bulk action.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### EmptyState
Spiegazione, CTA e link guida.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Skeleton
Loading senza layout shift.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Pagination
URL crawlable quando pubblica.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Tabs
ARIA, keyboard e deep link quando utile.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Badge
Stato o categoria, mai solo colore.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### Price
Valuta, tasse, da/a e natura della stima.

**Requisiti minimi:** API tipizzata; supporto keyboard; focus visibile; stato loading/error; nessun testo hardcoded; test unitario e visuale.

### AppShell
Continuità tra route, skip link, stato rete, annunci e slot di navigazione.

**Requisiti minimi:** rendering semantico; focus route; reduced-motion; nessun lock della navigazione.

### RouteTransition
Transizione opzionale tra pagine con scopo di continuità.

**Requisiti minimi:** non blocca URL/history; durata tokenizzata; disattivata in reduced-motion; nessun layout shift.

### MediaHero
Hero con immagine, video o scena progressiva, poster e CTA.

**Requisiti minimi:** poster immediato; video senza audio automatico; lazy/preload governato; fallback statico; CTA sempre accessibile.

### StatusIndicator
Stato di salvataggio, job, connessione o processo.

**Requisiti minimi:** testo/icone oltre al colore; live region appropriata; timestamp/retry quando rilevante.

<!-- V0952-COMPONENTS:START -->
## Componenti consolidati v0.95.2

- `CommercialModeBadge` e `CommercialActionPanel`;
- `CartDrawer`, `CheckoutStepper`, `AdminConfirmationNotice`;
- `CommandCenterPriorityQueue`, `SystemHealthCard`, `WorkerStatusCard`;
- `JarvisModeSelector`, `JarvisImpactPreview`, `ApprovalGate` — solo admin;
- `MediaUsageGraph` e `ProtectedDeleteDialog`.

I componenti Jarvis devono vivere nel bundle/namespace Command Center e richiedere authorization guard prima del rendering.
<!-- V0952-COMPONENTS:END -->

<!-- V0953-COMPONENTS:START -->
## Componenti Brand/CX/Home v0.95.3

### IntentSelector

Props concettuali: `intents`, `selected`, `onSelect`, `href`, `compact`, `expanded`. Ogni opzione è un link reale o controllo con destinazione esplicita; supporta sei intenti, modalità mobile 3+“Mostra altre possibilità”, tastiera, screen reader e fallback lista.

### AuthenticProofCard

Mostra tipo di prova (`real_photo`, `real_video`, `render`, `ai_concept`), contesto, risultato e CTA. Render/AI hanno etichetta visibile; niente testimonianze senza fonte/consenso.

### FounderTrustBlock

Fotografia autentica di Andrea, ruolo, testo in prima persona, controllo qualità, località e canale di contatto reale. Non accetta avatar sintetico come variante production.

### ProjectJourneyTimeline

Passaggi base idea → analisi → progettazione → realizzazione → controllo → consegna, con varianti per prodotto standard, progetto, lanterna personale e assistenza. Supporta lista statica e reduced-motion.

### InspirationRail

Aggrega riferimenti a prodotti, Realizzazioni, HueForge e contenuti senza duplicare le entità. Ogni item conserva source type e destinazione.

### HueForgeArtModule

Spiega tecnica e valore artistico, mostra galleria autentica e separa acquisto, configurazione e richiesta personalizzata.

### ConversationalClosingCTA

Domanda “Qual è il progetto che hai in mente?” con azioni `Iniziamo insieme` e `Parliamone`; il secondo canale è visibile solo se configurato e operativo.

### PrivateLabNotice

Comunica che il laboratorio è operativo ma non aperto al pubblico, collegando eventi e modalità di incontro/consegna documentate.
<!-- V0953-COMPONENTS:END -->

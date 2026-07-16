# Business Rules

> **Document ID:** DOC-PROD-003  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Product / Domain  
> **Ambito autorevole:** regole decisionali e invarianti commerciali. Le transizioni sono nel documento State Machines.

## 1. Preventivi

| ID | Regola |
|---|---|
| BR-QUOTE-001 | Una stima automatica non è un preventivo finale e deve essere etichettata come range. |
| BR-QUOTE-002 | Solo una versione approvata da un operatore autorizzato può essere inviata come preventivo finale. |
| BR-QUOTE-003 | Ogni preventivo inviato è immutabile; una modifica crea una nuova versione. |
| BR-QUOTE-004 | Il preventivo dichiara valuta, validità, quantità, assunzioni, esclusioni e tempi stimati. |
| BR-QUOTE-005 | L'accettazione riferisce esattamente ID e versione; un preventivo scaduto non è accettabile senza rinnovo. |
| BR-QUOTE-006 | Override di prezzo o range registra autore e motivazione. |
| BR-QUOTE-007 | Un lavoro può essere rifiutato per fattibilità, sicurezza, licenza, capacità o margine insufficiente. |

## 2. Pricing

| ID | Regola |
|---|---|
| BR-PRICE-001 | I costi componenti possono includere materiale, tempo macchina, preparazione, modellazione, post-processing, rischio, packaging e spedizione. |
| BR-PRICE-002 | Il cliente non deve vedere formule interne sensibili, ma riceve una spiegazione comprensibile delle principali assunzioni. |
| BR-PRICE-003 | Imposte e spedizione sono distinte quando applicabili. |
| BR-PRICE-004 | Sconti richiedono tipo, valore, periodo, applicabilità e owner. |
| BR-PRICE-005 | Un prezzo catalogo non viene applicato a varianti fuori dalle opzioni approvate. |
| BR-PRICE-006 | Il minimo d'ordine e le soglie di convenienza restano configurazioni approvate, non hardcode. |

## 3. Catalogo

| ID | Regola |
|---|---|
| BR-CAT-001 | Un prodotto pubblicato ha titolo, descrizione, CTA mode, media approvato e informazioni minime. |
| BR-CAT-002 | CTA mode è uno tra `buy`, `request`, `configure`, `contact`; il frontend non lo deduce dal testo. |
| BR-CAT-003 | Render e concept sono etichettati. |
| BR-CAT-004 | Prodotti basati su file terzi richiedono licenza commerciale verificata. |
| BR-CAT-005 | Archiviazione preserva ordini, quote e redirect storici. |

## 4. Configuratore lanterne

| ID | Regola |
|---|---|
| BR-LANT-001 | Solo opzioni compatibili con la versione modello possono essere selezionate e inviate. |
| BR-LANT-002 | La preview è indicativa e non sostituisce review di fattibilità/resa. |
| BR-LANT-003 | Submit crea snapshot immutabile. |
| BR-LANT-004 | Una configurazione migrata a una nuova versione richiede conferma e diff. |
| BR-LANT-005 | Asset privati restano accessibili solo a owner e operatori autorizzati. |

## 5. STL e file

| ID | Regola |
|---|---|
| BR-STL-001 | Un file rimane in quarantena finché non supera i controlli. |
| BR-STL-002 | Originale e checksum sono preservati; output derivati non sovrascrivono l'originale. |
| BR-STL-003 | Analyzer, slicer e profili sono versionati. |
| BR-STL-004 | File non analizzabili passano a review manuale; non vengono dichiarati non stampabili automaticamente. |
| BR-STL-005 | Il cliente deve dichiarare o accettare le condizioni di uso/licenza applicabili. |

## 6. Ordini

| ID | Regola |
|---|---|
| BR-ORD-001 | Un ordine nasce da quote accettata o prodotto/checkout valido. |
| BR-ORD-002 | L'ordine conserva snapshot commerciale e configurazione. |
| BR-ORD-003 | Stato di pagamento e produzione sono distinti. |
| BR-ORD-004 | Modifiche dopo conferma richiedono change/nuova approvazione. |
| BR-ORD-005 | Cancellazione e rimborso seguono policy commerciale/legale approvata. |

## 7. Assistenza

| ID | Regola |
|---|---|
| BR-AST-001 | Triage e AI non presentano diagnosi certa senza verifica tecnica. |
| BR-AST-002 | Supporto remoto richiede consenso e finestra esplicita. |
| BR-AST-003 | Azioni, parti, preventivi e risultati sono registrati. |
| BR-AST-004 | Un ticket può essere chiuso come risolto, non risolto, non riproducibile o rifiutato, con motivazione. |

## 8. Eventi

| ID | Regola |
|---|---|
| BR-EVT-001 | Stato, date e luogo pubblicati devono riflettere la situazione corrente. |
| BR-EVT-002 | Annullamento non elimina la pagina se serve a informare utenti e motori. |
| BR-EVT-003 | Lead e consensi raccolti all'evento hanno fonte e finalità. |

## 9. Newsletter

| ID | Regola |
|---|---|
| BR-NEWS-001 | Nessun invio marketing prima di double opt-in valido. |
| BR-NEWS-002 | Unsubscribe è effettivo prima di ulteriori invii non già tecnicamente irrevocabili. |
| BR-NEWS-003 | Suppression list ha precedenza sui segmenti. |
| BR-NEWS-004 | Campagne AI-generated restano draft fino a review. |

## 10. Media

| ID | Regola |
|---|---|
| BR-MEDIA-001 | Nessun asset pubblico senza diritti/provenance e stato approvato. |
| BR-MEDIA-002 | Originali non vengono modificati distruttivamente. |
| BR-MEDIA-003 | Asset in uso non sono cancellabili senza sostituzione. |
| BR-MEDIA-004 | Immagini AI/render non sono presentate come fotografie reali. |

## 11. AI

| ID | Regola |
|---|---|
| BR-AI-001 | Permessi sono verificati dal server per ogni tool. |
| BR-AI-002 | Contenuti recuperati non possono modificare policy o concedere capability. |
| BR-AI-003 | Pubblicazione, prezzo finale e comunicazioni esterne richiedono review. |
| BR-AI-004 | Ogni esecuzione significativa conserva provenance. |
| BR-AI-005 | In assenza di fonti sufficienti l'assistente dichiara il limite e non inventa. |

<!-- V0952-BUSINESS:START -->
## 12. Catalogo unificato, ordine e pagamento

| ID | Regola |
|---|---|
| BR-COM-001 | Ogni offerta commerciale appartiene a un solo catalog item, anche quando è servizio, configurabile, fiera o solo preventivo. |
| BR-COM-002 | Il `commercial_mode` determina CTA, validazioni, checkout e conferma; la UI non può sovrascriverlo. |
| BR-COM-003 | Stati visibili ammessi: Acquista subito, Configurabile, Su ordinazione, Richiedi preventivo, Disponibile in fiera, Temporaneamente non disponibile. |
| BR-COM-004 | Un articolo su ordinazione può creare un ordine `pending_admin_confirmation`; non diventa produzione prima della conferma. |
| BR-PAY-001 | Il metodo di pagamento è autorizzato dalle regole del prodotto/servizio e dallo stato ordine. |
| BR-PAY-002 | Prodotti personalizzati, STL e servizi non ricevono prezzo definitivo né pagamento prima dell’approvazione amministrativa prevista. |
| BR-PAY-003 | Bonifico, PayPal, contanti/POS in fiera e consegna locale sono configurazioni iniziali; ogni metodo può essere disabilitato per specifica offerta. |
| BR-PAY-004 | Stripe, carte, Apple Pay e Google Pay sono future capability, non prerequisiti della Fase 1. |

## 13. Jarvis e Command Center

| ID | Regola |
|---|---|
| BR-JAR-001 | Solo l’identità amministrativa Andrea può aprire Jarvis. |
| BR-JAR-002 | Modalità Assistente non produce side effect. |
| BR-JAR-003 | Modalità Operativa mostra preview, impatto e conferma prima delle azioni rilevanti. |
| BR-JAR-004 | Modalità Architetto produce impact analysis e prepara CR/ADR; non implementa prima dell’approvazione. |
| BR-JAR-005 | Pubblicazione, invio, prezzi massivi, rimborsi, permessi, legal e cancellazioni dipendenti richiedono conferma esplicita e audit. |
<!-- V0952-BUSINESS:END -->

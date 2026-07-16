# Catalogo e prodotti — Unified Commerce Catalog

> **Document ID:** DOC-FEAT-009  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Product / Commerce  
> **Ambito autorevole:** catalog item, varianti, stati commerciali, publication e azioni di conversione.

## 1. Scope

Un solo motore catalogo gestisce prodotti fisici standard, varianti, quadri HueForge, lanterne configurabili, componenti, servizi acquistabili, prodotti da fiera, prodotti su ordinazione e offerte solo a preventivo.

## 2. Commercial mode

| Stato visibile | Comportamento |
|---|---|
| Acquista subito | prezzo e disponibilità deterministici; aggiunta al carrello. |
| Configurabile | apre configuratore e richiede configurazione valida. |
| Su ordinazione | crea ordine/richiesta con eventuale conferma Andrea. |
| Richiedi preventivo | apre richiesta con contesto e allegati. |
| Disponibile in fiera | mostra evento, stock/ritiro e condizioni. |
| Temporaneamente non disponibile | nessun checkout; eventuale alert/waitlist. |

## 3. Data contract

Catalog item: tipo, slug, titolo, descrizione, category, commercial mode, price policy, tax class configurabile, media refs, variants, availability, quantity, production lead time, fulfillment, event availability, personalization, related items, SEO, editorial status e checkout rules.

## 4. Invariants

- una scheda autorevole per item;
- le varianti non duplicano contenuto comune;
- il prezzo visualizzato non abilita da solo il pagamento;
- order/quote conserva snapshot;
- l’archiviazione preserva riferimenti e redirect;
- media sempre referenziati dalla Media Library.

## 5. Admin

Creazione, duplicazione controllata di configurazione (non asset), bulk edit con preview, publication workflow, stock, lead time, event availability e audit. Jarvis può proporre copy/tag ma non pubblica o modifica prezzi in massa senza conferma.

## 6. Requisiti

| ID | Requisito |
|---|---|
| CAT-F-001 | Gestire prodotti, varianti, categorie e stato di pubblicazione. |
| CAT-F-002 | Fornire filtri e ordinamenti con URL condivisibili. |
| CAT-F-003 | Mostrare pagine prodotto indicizzabili con media e dati verificati. |
| CAT-F-004 | Distinguere acquistabile, personalizzabile e solo preventivo. |
| CAT-F-005 | Preservare snapshot dei dati usati in richieste/ordini. |
| CAT-F-006 | Gestire SEO, redirect e archiviazione senza link rotti. |
| CAT-F-007 | Gestire tutti i tipi di offerta tramite un unico CatalogItem. |
| CAT-F-008 | Esporre uno dei sei commercial state approvati e la CTA coerente. |
| CAT-F-009 | Applicare availability, production time, fulfillment e checkout policy server-side. |
| CAT-F-010 | Riutilizzare asset mediante riferimenti Media Library senza upload duplicati. |

<!-- V0953-CATALOG:START -->
## Catalogo vs Realizzazioni vs Ispirati

Catalogo contiene offerte acquistabili/configurabili e stati commerciali. Realizzazioni contiene prove autentiche e casi. Ispirati aggrega riferimenti senza creare copie di prodotto o case study. HueForge può apparire in tutti e tre con ruolo esplicito: prodotto/opera, prova o ispirazione.
<!-- V0953-CATALOG:END -->

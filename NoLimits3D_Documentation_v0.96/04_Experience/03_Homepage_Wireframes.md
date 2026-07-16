# Homepage — Wireframe Specification

> **Document ID:** DOC-UX-003  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** UX Design  
> **Ambito autorevole:** architettura narrativa, wireframe responsive, stati e requisiti della Home intent-led.

## Obiettivo

Far pensare al visitatore “finalmente qualcuno che fa quello che cercavo”, poi dimostrare competenza, onestà e capacità di seguire il progetto. La Home è il portale del laboratorio digitale, non un elenco di sezioni.

## Ritmo narrativo

1. incuriosire;
2. far sentire il visitatore nel posto giusto;
3. consentire la scelta del percorso;
4. dimostrare competenza;
5. ispirare con risultati reali;
6. spiegare il processo;
7. costruire fiducia;
8. invitare ad avviare un progetto.

## Desktop

### 1. First viewport

- header accessibile con logo placeholder dichiarato finché il Brand Asset Gate è aperto;
- H1 candidato: **“Hai un’idea? Diamo forma ai tuoi progetti.”**;
- supporto: stampa 3D, progettazione, prototipi, ricambi e creazioni personalizzate a Frosinone e online, con qualità professionale e prezzi trasparenti;
- domanda: **“Cosa vuoi realizzare oggi?”**;
- sei intent card;
- CTA `Inizia il tuo progetto` e `Scopri cosa possiamo realizzare`;
- visual reale/render dichiarato con poster immediato e enhancement opzionale;
- trust indicators solo verificabili.

### 2. Dimostrazione immediata

Realizzazioni autentiche, categorie di soluzione e micro-casi rispondono “possono davvero realizzare quello che mi serve?”. Ogni card dichiara media type e linka il caso.

### 3. Come nasce il tuo progetto

Timeline idea → analisi → progettazione → realizzazione → controllo → consegna, con varianti commerciali e assistenza.

### 4. Realizzazioni e Ispirati

- `Realizzazioni`: prove e casi autentici;
- `Ispirati`: rail trasversale di prodotti, casi, HueForge, lanterne, ricambi e guide;
- Catalogo resta separato e orientato all’acquisto.

### 5. Arte in stampa 3D

Spiegazione breve di HueForge, galleria reale, quadri/lanterne, CTA configuratore e CTA richiesta personale.

### 6. Servizi e progetti professionali

Maker, artigiani, aziende, professionisti, scuole e comuni: progettazione, prototipazione, ricambi, piccole serie e assistenza.

### 7. Fiducia e Andrea

Foto autentica, presentazione in prima persona, controllo qualità, prezzi trasparenti, rapporto diretto, materiali, FAQ e recensioni verificabili.

### 8. Eventi e fiere

Prossimi eventi, luogo/data, disponibilità e invito a incontrare NoLimits3D. Avviso: laboratorio operativo privato, non aperto al pubblico.

### 9. PrintFlow

Blocco breve “In arrivo / attualmente in sviluppo”, senza funzioni attive.

### 10. Chiusura conversazionale

Domanda: **“Qual è il progetto che hai in mente?”**; CTA `Iniziamo insieme` e `Parliamone`, con canale realmente configurato.

## Tablet

Griglia a due colonne dove utile; intenti 2×3; touch target ≥44×44; niente hover-only; media hero adattivo; timeline scrollabile semanticamente ma leggibile come lista.

## Mobile

- H1, supporto e CTA nel primo viewport utile;
- tre intenti principali + `Mostra altre possibilità` in bottom sheet accessibile;
- tutti e sei gli intenti presenti nel DOM e raggiungibili come link;
- poster statico default; video/3D on demand;
- moduli a una colonna;
- no sticky CTA che copre contenuto o controlli;
- timeline come lista ordinata;
- motion ridotto o assente.

## Progressive enhancement

Contenuto semantico, H1, testo, link e CTA sono disponibili senza JavaScript. WebGL non è richiesto. Il visual non oscura il copy, non blocca LCP e non presenta concept come oggetti reali.

## Stati

Loading, media unavailable, video disabled, WebGL unavailable, no-JS, error, offline/retry, reduced-motion, content long, intent selected, intent unavailable e CTA channel unavailable.

## Requisiti

| ID | Requisito |
|---|---|
| HOME-F-001 | Mostrare H1, value support, domanda intent-led, sei percorsi e due CTA nel primo modulo. |
| HOME-F-002 | Rendere ogni intento raggiungibile come link semantico e crawlable. |
| HOME-F-003 | Mostrare prove autentiche prima di claim estesi. |
| HOME-F-004 | Integrare timeline adattiva “Come nasce il tuo progetto”. |
| HOME-F-005 | Distinguere Catalogo, Realizzazioni e Ispirati. |
| HOME-F-006 | Presentare HueForge come Arte in stampa 3D. |
| HOME-F-007 | Presentare Andrea con foto autentica e voce personale. |
| HOME-F-008 | Mostrare eventi e natura privata del laboratorio. |
| HOME-F-009 | Concludere con CTA conversazionale verso canale operativo. |
| HOME-F-010 | Mantenere PrintFlow esclusivamente Coming Soon. |
| HOME-NF-001 | Non bloccare LCP, interazione, SEO o contenuto con video/3D. |
| HOME-NF-002 | Supportare keyboard, screen reader, reduced-motion, no-JS e no-WebGL. |
| HOME-NF-003 | Non usare media AI/render come prova reale. |
| HOME-NF-004 | Rispettare il Performance Budget su mobile reale. |

## Acceptance

Prototipo desktop/tablet/mobile; usability test su almeno i sei intenti; audit WCAG; test no-JS/no-WebGL; CWV su mobile; verifica link crawlable; review legale dei claim; media provenance completa.

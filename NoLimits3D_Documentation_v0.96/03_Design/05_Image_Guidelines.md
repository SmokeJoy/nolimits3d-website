# Image Guidelines

> **Document ID:** DOC-DES-005  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Brand / Content Operations  
> **Ambito autorevole:** qualità, stile, naming, formato, compressione, SEO e provenienza delle immagini. Il workflow admin è in `06_Admin/04_Media_Library.md`.

## 1. Classi di immagini

| Classe | Definizione | Uso |
|---|---|---|
| fotografia reale | acquisizione di prodotto, laboratorio, evento o processo | prova e fiducia |
| render | visualizzazione 3D non fotografica | concept, variante, istruzione |
| AI image | generata o modificata sostanzialmente con AI | campagne/concept con disclosure interna |
| HueForge preview | immagine preparata o preview di filament painting | catalogo/case study |
| screenshot | interfaccia o software | PrintFlow, guide, assistenza |
| graphic asset | icona, diagramma, composizione | UI e contenuti |
| brand asset | logo e marchi approvati | identità |
| video breve | ripresa reale, render o motion visual | hero, processo e campagne |

## 2. Veridicità

- un render non deve essere presentato come fotografia del prodotto consegnato;
- un concept PrintFlow deve essere etichettato;
- correzioni fotografiche non devono alterare difetti o caratteristiche commercialmente rilevanti;
- immagini AI non devono inventare certificazioni, ambienti, clienti o risultati reali;
- prima/dopo deve conservare condizioni comparabili.

## 3. Stile fotografico

### Prodotti

- sfondo pulito o contestuale controllato;
- luce morbida che mostri texture e layer senza enfatizzarli artificialmente;
- almeno hero, vista 3/4, dettaglio, scala/dimensione e variante;
- white balance coerente;
- nessun filtro che falsi il colore del filamento.

### Laboratorio/processo

- ordine credibile, non set sterile;
- persone solo con consenso;
- schermate o dati sensibili non leggibili;
- DPI/ugelli/materiali mostrati correttamente.

### Eventi

- contesto locale e banco;
- mix di panoramica, interazione e prodotti;
- liberatorie/consenso per primi piani identificabili;
- evitare foto di minori senza base e autorizzazione adeguate.

## 4. AI e editing conservativo

Ogni asset AI conserva:

- prompt ID/versione;
- modello/provider;
- data;
- reference asset;
- istruzioni di conservazione;
- reviewer;
- diritti e limiti.

Per HueForge e prodotti esistenti, l'editing è conservativo: non cambiare soggetto, geometria, numero di elementi, logo, colori identificativi o composizione salvo richiesta esplicita approvata.

## 5. Naming

Pattern:

```text
{domain}_{subject}_{view-or-purpose}_{variant}_{yyyy-mm}_{sequence}.{ext}
```

Esempi:

```text
catalog_lantern-cube_hero_black_2026-07_01.webp
portfolio_hueforge-lazio_detail_frame_2026-07_02.jpg
printflow_dashboard-concept_coming-soon_2026-07_01.webp
```

Regole:

- lowercase ASCII;
- trattino per parole interne, underscore per campi;
- niente `final`, `new`, `IMG_1234` come filename pubblicato;
- nessuna PII;
- la storage key è generata dal sistema e non coincide necessariamente col nome SEO.

## 6. Formati

| Contenuto | Preferenza | Fallback |
|---|---|---|
| fotografia | AVIF/WebP | JPEG |
| trasparenza | WebP/PNG | PNG |
| icona/logo vettoriale | SVG sanificato | PNG |
| screenshot | WebP/PNG | PNG |
| texture 3D | formato definito dal renderer | WebP/PNG/JPEG secondo supporto |
| original master | formato acquisizione non distruttivo | conservato privato |

SVG caricati da utenti non sono pubblicati senza sanitizzazione rigorosa; preferire rasterizzazione.

## 6.1 Video hero e motion media

- nessun audio automatico;
- poster image obbligatoria;
- `playsinline`, loop solo se breve e non distraente;
- pausa per reduced-motion/data saver o quando non visibile;
- versione mobile più leggera o sostituzione statica;
- non contenere testo essenziale incorporato nel video;
- bitrate, durata e preload devono rispettare il Performance Plan;
- fotografia/render/AI devono mantenere provenance e corretta classificazione.

## 7. Derivative profiles

| Profilo | Uso | Indicazione |
|---|---|---|
| `thumb` | selector/admin | crop controllato, piccolo |
| `card` | catalog/list | aspect ratio stabile |
| `content` | articolo/case study | responsive widths |
| `hero` | pagina | alta qualità, preload selettivo |
| `og` | social | 1200×630 o standard canale |
| `texture` | 3D | potenze/dimensioni coerenti col renderer |

Dimensioni definitive vengono implementate come configurazione, non duplicate nei documenti di feature.

## 8. Compressione e qualità

- target percettivo, non qualità fissa universale;
- rimuovere metadata non necessari, conservando provenance nel DB;
- non ingrandire artificialmente asset insufficienti senza review;
- generare `srcset` e `sizes` corretti;
- evitare hero > budget definito nel Performance Plan;
- monitorare SSIM/artefatti per pipeline automatica;
- original preservato per nuove derivative.

## 9. SEO immagini

- filename descrittivo;
- alt text basato sul contesto, non keyword stuffing;
- width/height dichiarati;
- caption quando aggiunge informazione;
- pagina canonica e contenuto circostante coerenti;
- image sitemap solo se utile;
- Open Graph controllato;
- licenze e credit quando richiesti.

Alt text non descrive decorazioni. La stessa immagine può avere alt diverso in contesti diversi; l'asset conserva suggerimento, la pagina conserva l'alt pubblicato.

## 10. Watermark

- applicato solo a derivative;
- mai sul master;
- safe area e contrasto controllati;
- non deve coprire dettagli essenziali;
- policy diversa per social, portfolio e preview;
- non sostituisce la tutela legale/licenza.

## 11. Prompt registry

I prompt autorevoli sono nella cartella `/prompts`. L'asset registra prompt ID/versione, non una copia modificata non tracciata.

## 12. Acceptance checks

- tipo e provenienza dichiarati;
- diritti verificati;
- nomenclatura conforme;
- derivative disponibili;
- peso entro budget;
- alt/caption contestuali;
- nessuna falsa rappresentazione;
- original preservato;
- usage graph aggiornato.

<!-- V0953-IMAGES:START -->
## 13. Authentic media policy v0.95.3

### Divieto stock e simulazione

Non usare fotografie stock generiche di persone davanti a stampanti, finti tecnici, ambienti non appartenenti a NoLimits3D o prodotti non realizzati presentati come portfolio.

### Fonti ammesse

Foto e video reali del laboratorio, Andrea, prodotti, fiere e processi; macro dettagli; render dichiarati; AI dichiarata per atmosfera, banner, illustrazione e storytelling; grafiche originali.

### Fotografie founder

Richiedere ritratto autentico nel laboratorio e immagini operative di controllo stampa, CAD/HueForge, verifica prodotto e preparazione consegna/fiera. Provenance, consenso, data e usage scope sono obbligatori.

### Labeling

`real_photo`, `real_video`, `render`, `ai_concept`, `illustration`. Render e AI non possono apparire in blocchi “Realizzazioni” senza una dichiarazione chiara del loro ruolo.

### Requisiti

| ID | Requisito |
|---|---|
| IMG-NF-001 | Laboratorio, Andrea, fiere, recensioni e risultati devono usare media autentici. |
| IMG-NF-002 | AI e render devono essere classificati e dichiarati nella Media Library e nell’uso pubblico. |
| IMG-NF-003 | Nessun media sintetico può rappresentare Andrea o un cliente reale. |
| IMG-NF-004 | Portfolio e case study richiedono provenance, diritti e consenso appropriati. |
| IMG-NF-005 | Hero media deve avere poster, alt/descrizione, fallback e budget. |
| IMG-NF-006 | Il no-stock policy è un gate editoriale, non un semplice suggerimento estetico. |
<!-- V0953-IMAGES:END -->

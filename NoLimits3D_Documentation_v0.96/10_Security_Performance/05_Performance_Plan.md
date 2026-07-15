# Performance Plan

> **Document ID:** DOC-SEC-005  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Performance Engineering  
> **Ambito autorevole:** budget, metriche e quality gate prestazionali della Web Application Premium.

## 1. Principio

La percezione premium deriva dalla risposta, non dal peso visuale. Motion, video, glow e 3D sono autorizzati solo dentro budget misurati e con fallback.

## 2. Lighthouse goals

Su pagine chiave mobile in ambienti controllati: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Gli score sono guardrail e non sostituiscono RUM.

## 3. Core Web Vitals

LCP ≤ 2,5s, INP ≤ 200ms, CLS ≤ 0,1 al 75° percentile quando il traffico è sufficiente. Hero media non deve diventare l’unico LCP candidate non ottimizzato.

## 4. Performance budget iniziale

| Risorsa | Pagina pubblica | Configuratore/strumento |
|---|---:|---:|
| JS iniziale | ≤ 180 KB gzip | shell ≤ 220 KB; 3D separato |
| CSS | ≤ 60 KB | ≤ 80 KB |
| hero poster | ≤ 250 KB tipico | n/a |
| font | ≤ 150 KB | condiviso |
| richieste iniziali | ≤ 35 | ≤ 45 prima del viewer |
| long task | nessuno > 200ms nel core funnel | elaborazioni in worker quando possibile |

Il video hero non viene incluso nel budget iniziale: poster e CTA arrivano prima; il video è caricato secondo intent/capability. Eccezioni richiedono ADR o risk acceptance.

## 5. Motion budget

- feedback input percepibile entro 100 ms;
- nessuna animazione blocca input o navigation;
- route transition non aggiunge attesa artificiale;
- proprietà preferite: transform/opacity;
- evitare layout/paint ripetuti;
- sospendere loop e rendering offscreen;
- ridurre qualità se frame time degrada;
- testare reduced-motion e battery/data saver.

## 6. Strategie

SSR/SSG, edge/cache, image CDN/storage derivatives, code splitting, third-party governance, preload selettivo, lazy video/3D, database index review, RUM e worker asincroni.

## 7. Provider/free-tier monitoring

Monitorare build time, bandwidth, function usage, database/storage growth, egress, connection/resource pressure e worker backlog. Definire soglie 70/85/95% per review, mitigazione e migrazione. I valori assoluti dei provider non vengono duplicati qui: sono configurazione/versioned operations data.

## 8. Quality gate

Una feature visuale non entra in release se:

- viola budget senza approvazione;
- peggiora CWV su mobile reale;
- non ha fallback/reduced-motion;
- aumenta errori o abandonment del funnel;
- continua a consumare CPU/GPU fuori viewport;
- maschera attese senza mostrare stato reale.

<!-- V0952-PERF:START -->
## Application stack budgets

Vite/React e Next.js saranno confrontati con build riproducibili. Public route budget include JS iniziale, LCP media, font e CSS; Command Center può avere budget separato ma Jarvis/3D restano lazy. Il sito deve superare test con PC Worker offline.
<!-- V0952-PERF:END -->

<!-- V0953-PERF:START -->
## Home performance contract

Poster, H1, supporto, intenti e CTA sono nel payload prioritario. Video, Three.js, gallerie e rail sono differiti. Nessun autoplay pesante senza strategia; immagini responsive e derivative; prefetch controllato; adaptive quality; skeleton con dimensioni stabili.

| ID | Requisito |
|---|---|
| PERF-NF-001 | H1, value proposition, intenti e CTA devono essere interattivi prima degli enhancement visuali. |
| PERF-NF-002 | Hero deve avere poster e fallback senza WebGL/video. |
| PERF-NF-003 | Three.js e media non essenziali non devono entrare nel bundle iniziale Home. |
| PERF-NF-004 | La Home deve superare budget e CWV su mobile reale di fascia media. |
<!-- V0953-PERF:END -->

# Technical SEO

> **Document ID:** DOC-SEO-005  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** SEO Engineering  
> **Ambito autorevole:** crawl, index, rendering, canonical, sitemap, redirect e release checks.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| TSEO-F-001 | Pagine pubbliche principali sono server-rendered/prerendered e crawlable. | Must |
| TSEO-F-002 | Canonical, robots e status HTTP riflettono lo stato reale. | Must |
| TSEO-F-003 | Sitemap contiene solo URL canonici pubblicati. | Must |
| TSEO-F-004 | Redirect sono singolo-hop e monitorati. | Must |
| TSEO-F-005 | Facet/search/admin/customer non generano index bloat. | Must |
| TSEO-F-006 | CI controlla metadata, link, schema e performance. | Must |

## Rules

404 reale per contenuto assente; 410 solo quando deliberato; archivi con valore restano; filtri canonicalizzati; pagination conforme al rendering; hreflang solo quando esistono versioni localizzate equivalenti.

## Launch checks

Robots, sitemap, canonical sample, redirects, status codes, JS rendering, CWV, image dimensions, log/coverage e Search Console verification.

<!-- V0952-TSEO:START -->
## Review Gate evidence

Produrre prototipo comparabile React/Vite e Next.js su homepage, catalog list/detail e contenuto editoriale. Misurare HTML iniziale, crawlability, metadata, cache/CDN, bundle, hydration, CWV e complessità operativa. Decisione finale via ADR che accetta o supersede ADR-0018.
<!-- V0952-TSEO:END -->

<!-- V0953-TECHSEO:START -->
## Intent selector progressive enhancement

I percorsi Home devono essere anchor/link reali, presenti nel markup iniziale, con label descrittive. Personalizzazione e JS possono riordinare solo elementi non essenziali dopo consenso appropriato; canonical, heading e contenuto non cambiano in modo opaco.
<!-- V0953-TECHSEO:END -->

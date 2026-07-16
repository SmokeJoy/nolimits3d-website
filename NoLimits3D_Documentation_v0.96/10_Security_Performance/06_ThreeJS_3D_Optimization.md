# Three.js e 3D Loading Strategy

> **Document ID:** DOC-SEC-006  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Frontend / Performance  
> **Ambito autorevole:** caricamento, qualità adattiva e fallback delle esperienze 3D.

## Caricamento

- nessun import Three.js nel bundle iniziale delle route pubbliche non 3D;
- viewer caricato su intent, viewport proximity o route dedicata;
- poster/skeleton con dimensioni stabili;
- modelli glTF/GLB compressi;
- texture KTX2/WebP dove supportate;
- Draco/Meshopt valutati per asset;
- cache per asset/versione.

## Quality tiers

| Tier | Criterio | Comportamento |
|---|---|---|
| low | mobile debole, frame time alto, data saver | poster/2D o geometria semplificata |
| balanced | device medio | DPR limitato, texture/ombre moderate |
| high | device capace e stabile | qualità completa dentro budget |

Il tier può ridursi dinamicamente ma non aumentare continuamente causando instabilità.

## Runtime

LOD, dispose esplicito, cap DPR, rendering sospeso offscreen, WebGL context-loss recovery, worker per parsing/elaborazioni adatte, niente allocazioni continue nel render loop. Auto-rotation solo marketing, si ferma a interazione/reduced-motion.

## Functional motion

La scena anima soltanto cambi di opzione, selezione, camera guidance e stato. Nessun movimento ambiente obbligatorio. La transizione deve aiutare il confronto e può essere saltata.

## Fallback

Fallback immagine/2D deve permettere comprensione, scelta opzioni, riepilogo e submit. WebGL non è un requisito del funnel.

## Testing

Budget configuratore separato; test su dispositivi reali di fascia media; perdita contesto; tab background; resize/orientation; memory leak; reduced-motion; throttling; asset missing; rete lenta/offline.

<!-- V0952-THREE:START -->
## React Three Fiber/Drei

R3F/Drei sono lo stack corrente sopra l’adapter Three.js. Canvas e asset sono route-lazy; demand rendering, adaptive DPR, compressed geometry/texture e context-loss recovery. La configurazione resta possibile con fallback 2D/statico.
<!-- V0952-THREE:END -->

<!-- V0953-THREE:START -->
## Home visual switching

Il visual Hero può cambiare tra categorie solo dopo il contenuto utile e senza riavviare loop costosi. Il cambio usa asset dichiarati, rendering on-demand, cap DPR, visibility suspension e poster statico. La scelta intento non richiede WebGL.
<!-- V0953-THREE:END -->

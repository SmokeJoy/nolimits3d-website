# Motion e linguaggio visuale 3D

> **Document ID:** DOC-DES-009  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Product Design  
> **Ambito autorevole:** filosofia, scopi, limiti e qualità di motion, video, glow e 3D.

## 1. Decisione

NoLimits3D adotta un’esperienza immersiva e premium, governata da `ADR-0017`. Il riferimento è la cura delle migliori applicazioni di prodotto, non l’imitazione della trade dress di Apple, Tesla o altri marchi.

## 2. Regola assoluta

> Nessuna animazione è ammessa soltanto per “effetto wow”.

Ogni motion deve migliorare comprensione, orientamento, feedback, continuità o causalità. In assenza di uno scopo dichiarabile e testabile, l’animazione viene rimossa.

## 3. Gerarchia

```text
Contenuto semantico e azione
        ↓
Stato e feedback
        ↓
Motion funzionale
        ↓
Video / 3D / glow premium
```

I livelli inferiori non possono compromettere quelli superiori.

## 4. Categorie ammesse

| Categoria | Scopo | Esempi |
|---|---|---|
| feedback | confermare input o stato | press, saving, upload progress |
| continuity | mantenere il contesto | card→dettaglio, panel persistente |
| orientation | indicare posizione/progresso | stepper, sezione attiva |
| disclosure | rivelare contenuto controllato | accordion, sheet |
| causality | mostrare effetto di una scelta | variante lanterna→preview |
| guidance | portare attenzione a un passaggio | focus su errore o CTA contestuale |

## 5. Pattern vietati

- intro obbligatorie;
- scroll hijacking;
- parallax aggressivo;
- testo essenziale visibile solo dopo reveal;
- loop continui su pagine operative;
- hover che sposta layout;
- autoplay audio;
- spinner senza stato o tempo atteso;
- animazioni che mascherano latenza;
- glow su ogni elemento;
- transizioni route che bloccano history o focus.

## 6. Timing e fluidità

Usare token del Design System. Target percettivo: feedback immediato; hover/press breve; component transition contenuta; route/hero solo quando il contenuto è già disponibile. Su device capaci l’animazione punta alla frequenza del display senza long task; su device deboli viene semplificata o rimossa.

## 7. Reduced motion e accessibilità

- rispettare `prefers-reduced-motion`;
- sostituire trasformazioni ampie con dissolve o stato istantaneo;
- fermare auto-rotation, parallax e loop;
- non rimuovere feedback o informazione;
- mantenere focus, reading order e live region;
- controlli pause/stop per contenuti in movimento quando richiesto.

## 8. Linguaggio 3D

- camera stabile e controlli prevedibili;
- materiali coerenti con prodotto reale;
- luce premium ma non ingannevole;
- qualità adattiva;
- selezione evidenziata con outline/glow controllato;
- caricamento con poster/skeleton stabile;
- fallback statico completo;
- no 3D obbligatorio per prezzo, contenuto o submit.

## 9. Hero video

Il video può mostrare processo, prodotto o trasformazione idea→oggetto. Deve partire muto, essere breve, avere poster, essere sospeso offscreen e non competere con headline/CTA. Su mobile/reduced-data può essere sostituito da immagine.

## 10. Glow verde

È un segnale, non una texture globale. Consentito per CTA primaria, focus, selezione 3D, stato attivo o dettaglio hero. Deve mantenere contrasto, non creare aloni sul testo e non sostituire outline/label.

## 11. Review checklist

Ogni pattern dichiara:

1. scopo funzionale;
2. trigger e stato finale;
3. durata/easing token;
4. impatto layout e input;
5. comportamento touch/keyboard;
6. reduced-motion;
7. fallback senza JS/WebGL;
8. budget CPU/GPU/network;
9. test visuale e accessibilità;
10. metrica che giustifica la sua permanenza.

<!-- V0953-MOTION:START -->
## 12. Home intent-led e motion

Il primo contenuto utile e gli intenti arrivano prima del video/3D. Motion ammesso: evidenziare selezione intento, collegare scelta a prova/CTA, spiegare processo, mostrare variazione configuratore e confermare stato. Motion vietato: intro obbligatoria, autoplay invasivo, parallax che compromette lettura, carousel non controllabile o trasformazioni che falsano prodotti reali.

La scena Hero può evolvere tra lanterna, HueForge, prototipo, ricambio e design solo se il cambio è funzionale, interrompibile, ridotto con `prefers-reduced-motion` e sostituito da poster statico senza perdita informativa.
<!-- V0953-MOTION:END -->

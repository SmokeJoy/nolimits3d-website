# Design System

> **Document ID:** DOC-DES-002  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Product Design  
> **Ambito autorevole:** fondazioni visuali, temi, motion, microinterazioni e comportamento trasversale. Le API dei componenti appartengono alla Component Library.

## 1. Intento

Il linguaggio visuale deve comunicare tecnologia, artigianalità e controllo. La filosofia approvata è una **Web Application Premium**: il sito deve sembrare software professionale, non una pagina marketing tradizionale. Il tema nero/verde è distintivo ma non deve ridurre leggibilità o trasformare ogni superficie in effetto neon.

## 2. Software Quality Website

Ogni superficie deve rendere evidente: cosa sta accadendo, cosa è cambiato, quale azione è disponibile, se il dato è salvato e come recuperare da un errore. Gli stati `idle`, `loading`, `saving`, `saved`, `empty`, `partial`, `error`, `offline`, `disabled` e `success` devono essere coerenti a livello di sistema.

L’esperienza premium nasce da precisione, continuità e risposta; non dalla quantità di effetti.

## 3. Theme architecture

### Dark primary theme

- background quasi nero, non nero assoluto uniforme;
- surface progressive per separare gerarchie;
- verde come accent/action/status positivo, non testo lungo;
- testo primario ad alto contrasto;
- bordi sottili per struttura;
- glow riservato a focus, hero, 3D e azioni primarie.

### Light support theme

Previsto per stampe, documenti, contesti molto luminosi e futura preferenza utente. Deve condividere token semantici, non duplicare CSS ad hoc.

## 4. Color roles

| Token semantico | Uso |
|---|---|
| `bg.canvas` | sfondo pagina |
| `bg.surface.*` | card, panel, overlay |
| `text.primary/secondary/muted` | gerarchia tipografica |
| `border.default/strong` | separazione |
| `accent.primary` | CTA e focus |
| `status.success/warning/error/info` | feedback, non branding |
| `effect.glow.*` | effetti controllati |

Valori finali richiedono contrast audit e asset ufficiali.

## 5. Typography

- font display distintivo ma leggibile per heading;
- font UI robusto per contenuti e admin;
- scala fluida con clamp;
- body minimo mobile da validare su device reali;
- line-height più ampia per testo lungo;
- numeri tabulari in prezzi, metriche e tabelle.

## 6. Spacing, radius, shadow

- scala 4/8-based;
- radius piccoli per controlli tecnici, medi per card, grandi solo su hero/marketing;
- ombre usate per elevazione, non decorazione;
- su dark theme privilegiare border + subtle highlight;
- shadow/glow devono avere token e budget visuale.

## 7. Motion principles

- motion spiega causa-effetto, continuità o stato;
- durata dipende da distanza e complessità;
- nessuna animazione obbligatoria per completare un task;
- `prefers-reduced-motion` elimina parallax, auto-rotation e transizioni non essenziali;
- evitare loop decorativi persistenti sulle pagine operative.

### Timing tokens

| Token | Range | Uso |
|---|---:|---|
| `motion.instant` | 80–120ms | press, focus feedback |
| `motion.fast` | 140–180ms | hover, tooltip |
| `motion.base` | 200–260ms | panel, accordion |
| `motion.slow` | 320–450ms | route/hero transition |

### Easing

- standard decelerate per ingresso;
- accelerate per uscita;
- spring solo per microinterazioni non critiche;
- nessun bounce su errori o contenuti professionali.

### Purpose taxonomy

| Purpose | Esempio ammesso | Non ammesso |
|---|---|---|
| feedback | press, salvataggio, upload progress | ritardo artificiale per “cinema” |
| continuity | passaggio card→dettaglio | transizione che impedisce back/forward |
| orientation | indicare step o sezione attiva | parallax senza informazione |
| disclosure | apertura panel/FAQ | reveal che nasconde contenuto ai crawler |
| causality | mostrare effetto di una scelta nel 3D | loop decorativo persistente |

Ogni animazione deve appartenere ad almeno una categoria e avere una modalità reduced-motion.

## 8. Microinteractions

### Button

- hover: variazione luminanza/border, non spostamento che altera layout;
- active: compressione ottica minima;
- loading: label preservata o sostituita con testo esplicito;
- success: feedback temporaneo senza cambiare l'esito salvato.

### Cards

- hover solo se cliccabili;
- elevazione massima controllata;
- focus-visible uguale o più evidente dell'hover;
- nessun tilt 3D su liste dense o mobile.

### Forms

- validazione dopo blur/submit, non aggressiva al primo carattere;
- messaggi vicino al campo e summary;
- autosave con stato `Saving/Saved/Error`;
- upload con progress e recovery.

### 3D

- orbit controllato dall'utente;
- auto-rotation solo preview marketing e si ferma all'interazione;
- cambio opzione animato solo se non ostacola confronto;
- placeholder stabile per evitare layout shift.

## 9. Hover and focus

Hover non è requisito funzionale. Tutte le azioni devono essere accessibili con touch e tastiera. `focus-visible` usa outline ad alto contrasto e non viene rimosso.

## 10. Glow policy

Glow consentito per:

- CTA primaria in hero;
- focus attivo;
- elementi 3D selezionati;
- stato live/AI controllato.

Vietato per:

- testo lungo;
- ogni bordo della pagina;
- errori;
- tabelle admin dense;
- elementi disabilitati.

## 11. Responsive behavior

- mobile-first;
- contenuto prioritario prima di decorazione;
- admin table con alternative responsive, non compressione illegibile;
- modali critiche diventano full-screen sheet su mobile;
- 3D e gallery adattano qualità, aspect ratio e controlli.

## 12. Accessibility

- WCAG 2.2 AA;
- target touch minimo 44×44 CSS px quando possibile;
- contrasto verificato per ogni stato;
- stato non comunicato solo dal colore;
- reduced motion;
- zoom 200% senza perdita funzionale;
- tema scuro testato per aloni e affaticamento.

## 13. Governance

Nuovi pattern visuali entrano prima nei token/foundations o nella Component Library. Le pagine non definiscono colori, shadow, easing o breakpoint locali senza eccezione registrata.

<!-- V0952-DESIGN:START -->
## Command Center e privacy visiva

Il Command Center usa lo stesso sistema visivo ma una densità informativa maggiore, code operative e stati di sistema. Jarvis può avere una superficie dedicata solo all’interno del Command Center; nessun componente, teaser o CTA Jarvis è ammesso nel sito pubblico o nell’area cliente.

I commercial state devono avere label testuali e non dipendere dal solo colore. Il checkout mostra sempre perché un metodo è disponibile o richiede conferma.
<!-- V0952-DESIGN:END -->

<!-- V0953-DESIGN:START -->
## 14. Customer Experience expression

Il tema nero/verde deve sostenere orientamento e qualità percepita, non trasformare la Home in una dashboard decorativa. La gerarchia pone domanda, intenti, prove e CTA prima degli effetti.

- intent card: icona/label/descrizione, stato focus/selected e link reale;
- proof module: media autentico, contesto e fonte;
- founder module: fotografia reale, testo in prima persona, CTA diretta;
- “Come nasce il tuo progetto”: timeline adattiva, non promessa identica per ogni servizio;
- HueForge: visuale editoriale e materico, non semplice badge categoria;
- light/glow: usati per selezione, causality e profondità, mai per mascherare contrasto insufficiente.

Ogni pattern deve avere varianti keyboard, touch, screen reader, reduced-motion, no-JS e media unavailable.
<!-- V0953-DESIGN:END -->

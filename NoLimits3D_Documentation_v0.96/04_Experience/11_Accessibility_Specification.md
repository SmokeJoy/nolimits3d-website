# Accessibility Specification

> **Document ID:** DOC-UX-011  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** UX Design  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Target
WCAG 2.2 livello AA per sito pubblico, area cliente e admin core.

## Requisiti
Landmark semantici, heading coerenti, skip link, focus visible, ordine DOM logico, label esplicite, error summary, live region controllate, alternative a gesture e 3D, sottotitoli per video, contrasto e zoom 200–400%.

## Test
axe/pa11y automatizzati, keyboard manuale, VoiceOver iOS/macOS e NVDA Windows sui flussi principali, test con riduzione movimento e alto contrasto.

<!-- V0953-A11Y:START -->
## Home intent-led

Intent selector: lista semantica, focus visibile, label e descrizioni, stato selezionato annunciato, nessun drag obbligatorio. Bottom sheet mobile intrappola correttamente il focus e restituisce il focus al trigger. Timeline resta una lista ordinata; carousel e video hanno controlli; media autentici hanno alt contestuale; reduced-motion rimuove transizioni non necessarie.
<!-- V0953-A11Y:END -->

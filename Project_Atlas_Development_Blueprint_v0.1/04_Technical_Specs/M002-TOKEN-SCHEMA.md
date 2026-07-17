# Token Schema: Design System M-002

## Status

- **Status**: APPROVED FOR M-002 WAVE B
- **Gate**: PASSED by `PA-AR-M002-014`
- **Value maturity**: I valori elencati restano `CANDIDATE` autorizzati per le Wave successive fino alla review di chiusura M-002.

## Overview & Categories

Questo schema governa la design foundation di `@atlas/ui`. Ogni valore individuale possiede lo status `CANDIDATE` finché contrasto, font e comportamento non sono realmente verificati con evidence numerica e visuale.
Non sono ammessi valori magic/hardcoded all'interno dei componenti. Non sono ammesse durate, glow o easing locali.

---

## 1. Reference Tokens

Valori assoluti. Non vanno usati direttamente nei componenti, ma mappati nel livello semantico.

### Palette (Riferimenti Iniziali)

- `palette.dark`: `#101820` (Status: `CANDIDATE`)
- `palette.green`: `#25D366` (Status: `CANDIDATE`)
- `palette.white`: `#FFFFFF` (Status: `CANDIDATE`)
- `palette.gray.50`: TBD (Status: `CANDIDATE`)
- `palette.gray.100`: TBD (Status: `CANDIDATE`)
- `palette.gray.150`: TBD (Status: `CANDIDATE`)
- `palette.gray.200` ... `palette.gray.800`: TBD (Status: `CANDIDATE`)
- `palette.gray.850`: TBD (Status: `CANDIDATE`)
- `palette.gray.900`: TBD (Status: `CANDIDATE`)
- `palette.gray.950`: TBD (Status: `CANDIDATE`)

### Palette di Stato e Hover (Riferimenti Governati)

Reference tokens definiti formalmente prima dell'uso nel livello semantico; nessun HEX diretto è ammesso fuori da questa sezione.

- `palette.red.600`: `#DC2626` (Status: `CANDIDATE`)
- `palette.yellow.500`: `#EAB308` (Status: `CANDIDATE`)
- `palette.blue.600`: `#2563EB` (Status: `CANDIDATE`)
- `palette.green.hover.dark`: `#1EBD59` (Status: `CANDIDATE`)
- `palette.green.hover.light`: `#1BA851` (Status: `CANDIDATE`)

### Typography

- `fontFamily.ui`: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` (Status: `CANDIDATE`)
- `fontFamily.display`: `DEFERRED / CANDIDATE` (Status: `CANDIDATE` - Non autorizzato in M-002)
- `scale.h1`: `2.25rem` (Status: `CANDIDATE`)
- `scale.h2`: `1.875rem` (Status: `CANDIDATE`)
- `scale.h3`: `1.5rem` (Status: `CANDIDATE`)
- `scale.h4`: `1.25rem` (Status: `CANDIDATE`)
- `scale.h5`: `1.125rem` (Status: `CANDIDATE`)
- `scale.h6`: `1rem` (Status: `CANDIDATE`)
- `scale.body`: `1rem` (Status: `CANDIDATE`)
- `scale.small`: `0.875rem` (Status: `CANDIDATE`)
- `scale.muted`: `0.875rem` (Status: `CANDIDATE`)
- `lineHeight.tight`: `1.25` (Status: `CANDIDATE`)
- `lineHeight.base`: `1.5` (Status: `CANDIDATE`)
- `lineHeight.relaxed`: `1.75` (Status: `CANDIDATE`)

### Motion & Easing (Range Autorevoli)

- `duration.instant`: `100ms` (Range: 80–120ms) (Status: `CANDIDATE`)
- `duration.fast`: `160ms` (Range: 140–180ms) (Status: `CANDIDATE`)
- `duration.base`: `230ms` (Range: 200–260ms) (Status: `CANDIDATE`)
- `duration.slow`: `380ms` (Range: 320–450ms) (Status: `CANDIDATE`)
- `easing.enter`: `cubic-bezier(0.0, 0.0, 0.2, 1)` (Status: `CANDIDATE`)
- `easing.exit`: `cubic-bezier(0.4, 0.0, 1, 1)` (Status: `CANDIDATE`)
- `easing.standard`: `cubic-bezier(0.4, 0.0, 0.2, 1)` (Status: `CANDIDATE`)

---

## 2. Semantic Tokens

Alias che dipendono dal contesto (Dark / Light Theme).

### Theme Mapping (Canon Names & Progressive Surfaces)

| Token                       | Descrizione                              | Dark Mode (Default)        | Light Mode                                                             | Status      |
| --------------------------- | ---------------------------------------- | -------------------------- | ---------------------------------------------------------------------- | ----------- |
| `bg.canvas`                 | Sfondo principale dell'app               | `palette.dark`             | `palette.white`                                                        | `CANDIDATE` |
| `bg.surface`                | Sfondo di primo livello (Card, Sezioni)  | `palette.gray.900`         | `palette.gray.50`                                                      | `CANDIDATE` |
| `bg.surface.hover`          | Sfondo di surface al passaggio del mouse | `palette.gray.850`         | `palette.gray.100`                                                     | `CANDIDATE` |
| `bg.surface.active`         | Sfondo di surface alla pressione         | `palette.gray.800`         | `palette.gray.150`                                                     | `CANDIDATE` |
| `text.primary`              | Testo principale ad alto contrasto       | `palette.white`            | `palette.dark`                                                         | `CANDIDATE` |
| `text.secondary`            | Testo secondario a contrasto medio       | `palette.gray.400`         | `palette.gray.600`                                                     | `CANDIDATE` |
| `border.default`            | Bordi standard e divisori                | `palette.gray.800`         | `palette.gray.200`                                                     | `CANDIDATE` |
| `border.hover`              | Bordi per stati hover interattivi        | `palette.gray.700`         | `palette.gray.300`                                                     | `CANDIDATE` |
| `accent.primary`            | Colore accento primario (es. brand)      | `palette.green`            | `palette.green`                                                        | `CANDIDATE` |
| `accent.primary.hover`      | Hover del colore accento                 | `palette.green.hover.dark` | `palette.green.hover.light`                                            | `CANDIDATE` |
| `accent.primary.foreground` | Foreground calcolato su accent.primary   | `palette.dark`             | `palette.dark` (contrasto >= 4.5:1 sul verde; il bianco non supera AA) | `CANDIDATE` |
| `focus.ring`                | Anello di focus accessibile              | `palette.green`            | `palette.green`                                                        | `CANDIDATE` |

### Status Colors

Mappati esclusivamente su reference token governati:

- `status.success`: `palette.green` (foreground: `palette.dark`) (Status: `CANDIDATE`)
- `status.warning`: `palette.yellow.500` (foreground: `palette.dark`) (Status: `CANDIDATE`)
- `status.error`: `palette.red.600` (foreground: `palette.white`) (Status: `CANDIDATE`)
- `status.info`: `palette.blue.600` (foreground: `palette.white`) (Status: `CANDIDATE`)

### Contrast Acceptance Matrix (Soglie di Accettazione WCAG 2.2 AA)

| Coppia (Foreground / Background)                     | Stato   | Ratio Target | WCAG 2.2 AA (Target) | Status      |
| ---------------------------------------------------- | ------- | ------------ | -------------------- | ----------- |
| `text.primary` / `bg.canvas`                         | Default | `>= 4.5:1`   | Pass                 | `CANDIDATE` |
| `text.secondary` / `bg.canvas`                       | Default | `>= 4.5:1`   | Pass                 | `CANDIDATE` |
| `text.primary` / `bg.surface`                        | Default | `>= 4.5:1`   | Pass                 | `CANDIDATE` |
| `accent.primary.foreground` / `accent.primary`       | Default | `>= 4.5:1`   | Pass                 | `CANDIDATE` |
| `accent.primary.foreground` / `accent.primary.hover` | Hover   | `>= 4.5:1`   | Pass                 | `CANDIDATE` |
| `status.error.foreground` / `status.error`           | Error   | `>= 4.5:1`   | Pass                 | `CANDIDATE` |

### Scale & Structure

- **Spacing**: 4-point grid base (`4px`, `8px`, `12px`, `16px`...). (Status: `CANDIDATE`)
- **Size**: Standard per componenti (es. size.sm, size.md, size.lg). (Status: `CANDIDATE`)
- **Radius**: `radius.sm` (4px), `radius.md` (8px), `radius.lg` (12px), `radius.full` (9999px). (Status: `CANDIDATE`)
- **Shadow/Elevation**: `shadow.sm`, `shadow.md`, `shadow.lg` (basate su opacità neutra). (Status: `CANDIDATE`)
- **Z-Index**: `z.base` (0), `z.dropdown` (50), `z.sticky` (100), `z.modal` (200), `z.toast` (300). (Status: `CANDIDATE`)
- **Breakpoint**: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px). (Status: `CANDIDATE`)

### Effects, Media & Performance Quality Tiers

- **Effect/Glow**: `effect.glow.primary` (Glow controllato, basato su shadow). (Status: `CANDIDATE`)
- **Glow Budget**: Limite agli effetti blur/glow costosi. (Status: `CANDIDATE`)
- **Media/ReducedMotion**: Override forzato a `0ms` e transition `none` quando `prefers-reduced-motion: reduce`. (Status: `CANDIDATE`)
- **Performance Quality Tiers**:
  - `performance.qualityTier.low`: Disabilita ombre complesse, glow e transizioni su dispositivi a basse prestazioni o mobile low-end.
  - `performance.qualityTier.balanced`: Abilita ombre e transizioni standard, disabilita glow avanzati.
  - `performance.qualityTier.high`: Abilita tutte le caratteristiche grafiche avanzate (shadow, glow, transizioni smooth).

---

## 3. Component Tokens

Livello più specifico: sovrascritture di componenti. Valori semantici, nessun HEX.

- `button.bg.primary`: `accent.primary` (Status: `CANDIDATE`)
- `button.text.primary`: `accent.primary.foreground` (Status: `CANDIDATE`)
- `button.bg.secondary`: `bg.surface` (Status: `CANDIDATE`)
- `button.border.secondary`: `border.default` (Status: `CANDIDATE`)
- `button.text.secondary`: `text.primary` (Status: `CANDIDATE`)
- `input.border.focus`: `focus.ring` (Status: `CANDIDATE`)
- `dialog.bg`: `bg.canvas` (Status: `CANDIDATE`)
- `card.bg`: `bg.surface` (Status: `CANDIDATE`)
- `toast.bg`: `bg.surface` (Status: `CANDIDATE`)
- `toast.text`: `text.primary` (Status: `CANDIDATE`)
- `tabs.trigger.bg.active`: `bg.surface` (Status: `CANDIDATE`)
- `tabs.trigger.text.active`: `text.primary` (Status: `CANDIDATE`)
- `skeleton.bg`: `border.default` (Status: `CANDIDATE`)
- `statusIndicator.success.bg`: `status.success` (Status: `CANDIDATE`)
- `statusIndicator.error.bg`: `status.error` (Status: `CANDIDATE`)
- `statusIndicator.warning.bg`: `status.warning` (Status: `CANDIDATE`)
- `statusIndicator.info.bg`: `status.info` (Status: `CANDIDATE`)

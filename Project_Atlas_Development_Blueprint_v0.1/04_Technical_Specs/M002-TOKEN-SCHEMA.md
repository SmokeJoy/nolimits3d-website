# Token Schema: Design System M-002

## Status
* **Status**: PROPOSED
* **Gate**: Requires Architect Approval

## Overview & Categories
Questo schema governa la design foundation di `@atlas/ui`. Ogni valore possiede uno status che deve rimanere `CANDIDATE` finché contrasto, font e comportamento non sono realmente verificati con evidence numerica e visuale.
Non sono ammessi valori magic/hardcoded all'interno dei componenti. Non sono ammesse durate, glow o easing locali.

---

## 1. Reference Tokens
Valori assoluti. Non vanno usati direttamente nei componenti, ma mappati nel livello semantico.

### Palette (Riferimenti Iniziali)
- `palette.dark`: `#101820` (Status: `CANDIDATE`)
- `palette.green`: `#25D366` (Status: `CANDIDATE`)
- `palette.white`: `#FFFFFF` (Status: `CANDIDATE`)
- `palette.gray.100` ... `palette.gray.900`: TBD (Status: `CANDIDATE`)

### Typography
- `fontFamily.ui`: `system-ui, sans-serif` (Status: `CANDIDATE` - Fallback stack)
- `fontFamily.display`: `Poppins, sans-serif` (Status: `CANDIDATE` - Licenza Google Fonts OFL)
- `scale.h1` ... `scale.h6`: TBD (Status: `CANDIDATE`)
- `scale.body`, `scale.small`, `scale.muted`: TBD (Status: `CANDIDATE`)
- `lineHeight.tight`, `lineHeight.base`, `lineHeight.relaxed`: TBD (Status: `CANDIDATE`)

### Motion & Easing
- `duration.instant`: `0ms` (Status: `CANDIDATE`)
- `duration.fast`: `150ms` (Status: `CANDIDATE`)
- `duration.base`: `300ms` (Status: `CANDIDATE`)
- `duration.slow`: `500ms` (Status: `CANDIDATE`)
- `easing.enter`: `cubic-bezier(0.0, 0.0, 0.2, 1)` (Status: `CANDIDATE`)
- `easing.exit`: `cubic-bezier(0.4, 0.0, 1, 1)` (Status: `CANDIDATE`)
- `easing.standard`: `cubic-bezier(0.4, 0.0, 0.2, 1)` (Status: `CANDIDATE`)

---

## 2. Semantic Tokens
Alias che dipendono dal contesto (Dark / Light Theme).

### Theme Mapping (Dark/Light & Progressive Surfaces)
| Token | Descrizione | Default | Status |
|---|---|---|---|
| `bg.base` | Sfondo principale | TBD | `CANDIDATE` |
| `bg.surface` | Sfondo secondario / Card | TBD | `CANDIDATE` |
| `bg.elevated` | Sfondo modali/dropdown | TBD | `CANDIDATE` |
| `text.primary` | Testo ad alto contrasto | TBD | `CANDIDATE` |
| `text.secondary` | Testo a contrasto moderato | TBD | `CANDIDATE` |
| `action.primary` | Elementi interattivi principali | TBD | `CANDIDATE` |
| `action.primary.hover` | Stato hover per interattivi | TBD | `CANDIDATE` |
| `border.default` | Bordi standard | TBD | `CANDIDATE` |
| `focus.ring` | Anello di focus accessibile | TBD | `CANDIDATE` |

### Status Colors
- `status.success`: TBD (Status: `CANDIDATE`)
- `status.warning`: TBD (Status: `CANDIDATE`)
- `status.error`: TBD (Status: `CANDIDATE`)
- `status.info`: TBD (Status: `CANDIDATE`)

### Contrast Matrix (Stati Foreground/Background)
| Coppia (Foreground / Background) | Stato | Ratio Numerico | WCAG 2.2 AA | Status |
|---|---|---|---|---|
| `text.primary` / `bg.base` | Default | TBD | TBD | `CANDIDATE` |
| `text.secondary` / `bg.base` | Default | TBD | TBD | `CANDIDATE` |
| `action.primary.foreground` / `action.primary` | Default | TBD | TBD | `CANDIDATE` |
| `action.primary.foreground` / `action.primary.hover` | Hover | TBD | TBD | `CANDIDATE` |
| `status.error.foreground` / `status.error` | Error | TBD | TBD | `CANDIDATE` |

### Scale & Structure
- **Spacing**: 4-point grid base (`4px`, `8px`, `12px`, `16px`...). (Status: `CANDIDATE`)
- **Size**: Mapping per altezze/larghezze standardizzate di componenti. (Status: `CANDIDATE`)
- **Radius**: `radius.sm`, `radius.md`, `radius.lg`, `radius.full`. (Status: `CANDIDATE`)
- **Shadow/Elevation**: `shadow.sm`, `shadow.md`, `shadow.lg` (basate su opacità). (Status: `CANDIDATE`)
- **Z-Index**: `z.base` (0), `z.dropdown` (50), `z.sticky` (100), `z.modal` (200), `z.toast` (300). (Status: `CANDIDATE`)
- **Breakpoint**: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px). (Status: `CANDIDATE`)

### Effects, Media & Performance
- **Effect/Glow**: `effect.glow.primary` (Glow controllato, basato su shadow). (Status: `CANDIDATE`)
- **Glow Budget**: Limite agli effetti blur/glow costosi. (Status: `CANDIDATE`)
- **Media/ReducedMotion**: Gestione standardizzata dell'animazione a 0ms se `prefers-reduced-motion: reduce`. (Status: `CANDIDATE`)
- **Performance Quality Tiers**: Risoluzioni base vs retina (`1x`, `2x`), texture limitate su dispositivi low-end. (Status: `CANDIDATE`)

---

## 3. Component Tokens
Livello più specifico: sovrascritture di componenti (es. `button.bg` = `action.primary`). Valori semantici, nessun HEX.

- `button.bg.primary`: `action.primary` (Status: `CANDIDATE`)
- `button.text.primary`: `action.primary.foreground` (Status: `CANDIDATE`)
- `button.bg.secondary`: `bg.surface` (Status: `CANDIDATE`)
- `input.border.focus`: `focus.ring` (Status: `CANDIDATE`)
- `dialog.bg`: `bg.elevated` (Status: `CANDIDATE`)
- `card.bg`: `bg.surface` (Status: `CANDIDATE`)
- `toast.bg`: `bg.elevated` (Status: `CANDIDATE`)

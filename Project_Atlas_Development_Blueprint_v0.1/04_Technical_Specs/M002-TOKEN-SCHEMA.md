# Token Schema: Design System M-002

## Status
* **Status**: PROPOSED
* **Gate**: Requires Architect Approval

## Overview & Categories
Questo schema governa la design foundation di `@atlas/ui`. Ogni valore possiede uno status: `CANDIDATE`, `VALIDATED` o `APPROVED`.
Non sono ammessi valori magic/hardcoded all'interno dei componenti.

---

## 1. Reference Tokens
Valori assoluti. Non vanno usati direttamente nei componenti, ma mappati nel livello semantico.

### Palette (Riferimenti Iniziali)
- `palette.dark`: `#101820` (Status: `CANDIDATE`)
- `palette.green`: `#25D366` (Status: `CANDIDATE`)
- `palette.white`: `#FFFFFF` (Status: `CANDIDATE`)
- `palette.gray.100` ... `palette.gray.900`: Da definire (Status: `CANDIDATE`)

### Typography
- `fontFamily.ui`: `system-ui, sans-serif` (Status: `CANDIDATE` - Fallback stack)
- `fontFamily.display`: `Poppins, sans-serif` (Status: `CANDIDATE` - Licenza Google Fonts OFL)
- `scale.h1`: `2.5rem` (Status: `CANDIDATE`)
- `scale.body`: `1rem` (Status: `CANDIDATE`)

### Motion & Easing
- `duration.fast`: `150ms` (Status: `CANDIDATE`)
- `duration.normal`: `300ms` (Status: `CANDIDATE`)
- `easing.default`: `cubic-bezier(0.4, 0, 0.2, 1)` (Status: `CANDIDATE`)

---

## 2. Semantic Tokens
Alias che dipendono dal contesto (Dark / Light Theme).

### Theme Mapping
| Token | Dark Mode (Default) | Light Mode | Status |
|---|---|---|---|
| `bg.primary` | `palette.dark` | `palette.white` | `CANDIDATE` |
| `text.primary` | `palette.white` | `palette.dark` | `CANDIDATE` |
| `action.primary` | `palette.green` | `palette.green` | `CANDIDATE` |
| `border.default` | `palette.gray.800` | `palette.gray.200` | `CANDIDATE` |

### Contrast Matrix
| Coppia | Ratio Stimato | WCAG 2.2 AA (Pass?) | Status |
|---|---|---|---|
| `text.primary` su `bg.primary` | Elevato | TBD (Richiede Contrast Audit) | `CANDIDATE` |
| `palette.dark` su `action.primary` | Moderato | TBD (Richiede Contrast Audit) | `CANDIDATE` |

### Scale & Structure
- **Spacing**: 4-point grid base (`4px`, `8px`, `12px`, `16px`...). (Status: `CANDIDATE`)
- **Radius**: `0.5rem` per card/button standard. (Status: `CANDIDATE`)
- **Shadow/Elevation**: `--shadow-sm`, `--shadow-md` basati su opacità, senza dipendenze cromatiche. (Status: `CANDIDATE`)
- **Z-Index**: `z.base` (0), `z.dropdown` (50), `z.sticky` (100), `z.modal` (200), `z.toast` (300). (Status: `CANDIDATE`)
- **Breakpoint**: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px). (Status: `CANDIDATE`)

### A11y & Performance
- **Reduced Motion**: Mapping forzato a `0ms` e transition `none` quando `prefers-reduced-motion: reduce`. (Status: `VALIDATED`)
- **Glow Budget**: Limite agli effetti blur/glow costosi su mobile. (Status: `CANDIDATE`)
- **Media/Quality Tiers**: Risoluzioni base vs retina (`1x`, `2x`). (Status: `CANDIDATE`)

---

## 3. Component Tokens
Livello più specifico: sovrascritture di componenti (es. `button.bg` = `action.primary`).

- `button.bg.primary`: `action.primary` (Status: `CANDIDATE`)
- `button.text.primary`: `#101820` (Status: `CANDIDATE`)
- `input.border.focus`: `action.primary` (Status: `CANDIDATE`)
- `dialog.bg`: `bg.primary` (Status: `CANDIDATE`)

# Token Schema: Design System M-002

## Status
* **Status**: PROPOSED
* **Gate**: Requires Architect Approval

## 1. Palette & Colors
* **Background Primary**: `#101820` (Dark Mode - Default)
* **Accent Primary**: `#25D366` (Green Accent)
* **Light Support**: Mapped to semantic variables, primarily white/light grays to ensure high contrast in Light Mode.

## 2. Semantic Mapping (Tailwind Variables)
The following variables will be registered in `tailwind.config.js` via CSS variables (e.g., `--background`, `--foreground`).

* `background`: `<Dark/Light>`
* `foreground`: `<Contrasting Text>`
* `primary`: `#25D366` (with `primary-foreground` mapped for WCAG text contrast)
* `secondary`, `muted`, `accent`, `destructive` + their respective `-foreground` variables.
* `border`, `input`, `ring`: Defined for interactive element outlines.

## 3. Typography
* **Font Family**: `Poppins` (Google Fonts).
* **Scale**:
  - `h1` through `h6` mapped to specific `rem` values.
  - `body`, `small`, `muted` for standard text.
* **Line Heights & Tracking**: Semantic variables preventing tight/unreadable clustering.

## 4. Spacing & Sizing
* 4-point grid system (e.g. `p-4` = `1rem`, `p-8` = `2rem`).
* No magic numbers. Components must strictly use `w-*`, `h-*`, `p-*`, `m-*` from the Tailwind scale.

## 5. Radius & Shadow
* `radius`: Base border-radius token for cards and buttons.
* `shadow`: Elevation tokens mapped for depth without reliance on pure color differences.

## 6. Motion & z-Index
* **Motion**: Semantic durations (`--duration-fast`, `--duration-normal`) and easings. Enforce `prefers-reduced-motion: reduce`.
* **z-Index**: Strictly mapped scale (e.g. `z-modal`, `z-toast`, `z-dropdown`) to prevent layering collisions. No arbitrary `z-[9999]`.

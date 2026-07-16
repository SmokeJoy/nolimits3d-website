# Dependency Adoption Decision: M-002 Design System

## Decision Status
**Status**: PENDING ARCHITECT APPROVAL

## Bill of Materials (BOM) Immutabile
Prima di avviare qualsiasi implementazione in `@atlas/ui`, le seguenti dipendenze e scelte architetturali formano il BOM esatto. Nessuna dipendenza ulteriore può essere aggiunta in Wave B o Wave C senza un formale aggiornamento di questo documento.

### 1. Decisioni Architetturali Vincolanti
- **Tailwind Architecture**: CSS-first Tailwind v4 (utilizza `tailwindcss@4.3.2` + `@tailwindcss/vite@4.3.2`, configurato tramite file CSS globale, senza file `tailwind.config.js` obsoleto).
- **Primitive Backend**: `@base-ui/react` (Base UI è il default raccomandato per React 19). Radix non è adottato in M-002.
- **Toast Engine**: `sonner` (Toast standard raccomandato e integrato nativamente nelle release correnti di shadcn/ui).
- **Accessibility Engine**: `axe-core` nel test harness (non `@axe-core/react`). La verifica del contrasto colori WCAG AA avverrà tramite audit manuale/visuale a causa dei limiti noti di `axe-core` nell'ambiente JSDOM.
- **Preview Baseline**: Vite Playground (tramite applicazione interna dedicata `apps/ui-playground/`).
- **Ladle / Playwright**: NOT AUTHORIZED per M-002.

---

### 2. Tabella BOM Dettagliata

| Package | Exact version | Dependency class | Purpose | License | Node/React/Vite compatibility | Verification command | Status |
|---|---|---|---|---|---|---|---|
| `@base-ui/react` | `1.6.0` | Production | Primitive backend per componenti accessibili | MIT | Node v24+, React 19+ | `pnpm --filter @atlas/ui list @base-ui/react` | CANDIDATE |
| `sonner` | `2.0.7` | Production | Engine di notifica non bloccante (Toast) | MIT | Node v24+, React 19+ | `pnpm --filter @atlas/ui list sonner` | CANDIDATE |
| `tailwindcss` | `4.3.2` | Production | Framework CSS utility-first | MIT | Node v24+, Vite 8+ | `pnpm --filter @atlas/ui list tailwindcss` | CANDIDATE |
| `@tailwindcss/vite` | `4.3.2` | DevDependency | Integrazione e compilazione Tailwind v4 in Vite | MIT | Node v24+, Vite 8+ | `pnpm --filter @atlas/ui list @tailwindcss/vite` | CANDIDATE |
| `shadcn` | `4.13.0` | DevDependency | CLI per l'inizializzazione e gestione componenti | MIT | Node v24+ | `pnpm --filter @atlas/ui list shadcn` | CANDIDATE |
| `class-variance-authority` | `0.7.1` | Production | Gestione varianti CSS in modo tipizzato | Apache-2.0 | Node v24+ | `pnpm --filter @atlas/ui list class-variance-authority` | CANDIDATE |
| `clsx` | `2.1.1` | Production | Utility per unire classi CSS condizionali | MIT | Node v24+ | `pnpm --filter @atlas/ui list clsx` | CANDIDATE |
| `tailwind-merge` | `3.6.0` | Production | Unione efficiente di classi Tailwind senza conflitti | MIT | Node v24+ | `pnpm --filter @atlas/ui list tailwind-merge` | CANDIDATE |
| `lucide-react` | `1.24.0` | Production | Set di icone vettoriali coerenti e leggere | ISC | Node v24+, React 19+ | `pnpm --filter @atlas/ui list lucide-react` | CANDIDATE |
| `tw-animate-css` | `1.4.0` | Production | Plugin di animazioni per Tailwind | MIT | Node v24+ | `pnpm --filter @atlas/ui list tw-animate-css` | CANDIDATE |
| `react` | `19.2.7` | Peer / Dev | Libreria core di runtime UI | MIT | Node v24+, React 19+ | `pnpm --filter @atlas/ui list react` | CANDIDATE |
| `react-dom` | `19.2.7` | Peer / Dev | Rendering DOM per React | MIT | Node v24+, React 19+ | `pnpm --filter @atlas/ui list react-dom` | CANDIDATE |
| `@types/react` | `19.2.17` | DevDependency | Definizioni di tipo TypeScript per React | MIT | Node v24+, TypeScript 6+ | `pnpm --filter @atlas/ui list @types/react` | CANDIDATE |
| `@types/react-dom` | `19.2.3` | DevDependency | Definizioni di tipo TypeScript per React-DOM | MIT | Node v24+, TypeScript 6+ | `pnpm --filter @atlas/ui list @types/react-dom` | CANDIDATE |
| `vite` | `8.1.4` | DevDependency | Strumento di build e server di sviluppo locale | MIT | Node v24+ | `pnpm --filter @atlas/ui list vite` | CANDIDATE |
| `@vitejs/plugin-react` | `6.0.3` | DevDependency | Plugin Vite ufficiale per supporto React | MIT | Node v24+, Vite 8+ | `pnpm --filter @atlas/ui list @vitejs/plugin-react` | CANDIDATE |
| `vitest` | `4.1.10` | DevDependency | Test runner nativo Vite ad alte prestazioni | MIT | Node v24+, Vite 8+ | `pnpm --filter @atlas/ui list vitest` | CANDIDATE |
| `jsdom` | `29.1.1` | DevDependency | Simulazione ambiente browser in ambiente Node | MIT | Node v24+ | `pnpm --filter @atlas/ui list jsdom` | CANDIDATE |
| `@testing-library/react` | `16.3.2` | DevDependency | Suite di utility per testare componenti React | MIT | Node v24+, React 19+ | `pnpm --filter @atlas/ui list @testing-library/react` | CANDIDATE |
| `@testing-library/jest-dom` | `6.9.1` | DevDependency | Matcher Jest/Vitest personalizzati per il DOM | MIT | Node v24+ | `pnpm --filter @atlas/ui list @testing-library/jest-dom` | CANDIDATE |
| `@testing-library/dom` | `10.4.1` | DevDependency | Query per testare elementi DOM nativi | MIT | Node v24+ | `pnpm --filter @atlas/ui list @testing-library/dom` | CANDIDATE |
| `axe-core` | `4.12.1` | DevDependency | Motore di testing per l'accessibilità | MPL-2.0 | Node v24+ | `pnpm --filter @atlas/ui list axe-core` | CANDIDATE |

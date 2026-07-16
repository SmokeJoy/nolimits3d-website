# Dependency Adoption Decision: M-002 Design System

## Decision Status
**Status**: APPROVED

## BOM (Bill of Materials) Immutabile
Prima di avviare l'implementazione in `@atlas/ui`, le seguenti dipendenze e scelte architetturali formano il BOM esatto.
Nessuna dipendenza ulteriore può essere aggiunta in Wave B o Wave C senza un formale aggiornamento di questo documento.

### Architettura CSS e Primitive
- **Tailwind architecture**: CSS-first Tailwind v4 (Nessun `tailwind.config.js`, usa import diretti e root variables come raccomandato da shadcn/ui per v4).
- **Primitive backend candidate**: `radix-ui` (package unificato, al posto dei vecchi `@radix-ui/react-*` aperti).

### Class Utilities
- **Class Variance**: `class-variance-authority`
- **Class Merge**: `clsx`, `tailwind-merge`

### Design Resources
- **Icon Library**: `lucide-react`
- **Animation**: `tw-animate-css` (o equivalente shadcn/ui native plugin)

### Testing & Verification
- **Test Runner**: `vitest`
- **DOM Environment**: `jsdom`
- **Testing Library**: `@testing-library/react`, `@testing-library/jest-dom`
- **Accessibility Engine**: `@axe-core/react`

### Notification Implementation
- **Toast Engine**: native shadcn/ui implementation o `sonner` se adottato (da confermare a livello shadcn).

### Preview Tooling
- **Preview baseline**: Vite Playground
- **Ladle**: EVALUATION — NOT AUTHORIZED
- **Playwright**: EVALUATION — NOT AUTHORIZED

## Note
Vite Playground è l'ambiente locale ufficiale autorizzato per lo sviluppo isolato dei componenti in `@atlas/ui`. Ladle richiede analisi di impatto e incompatibilità da dirimere ed è posticipato.

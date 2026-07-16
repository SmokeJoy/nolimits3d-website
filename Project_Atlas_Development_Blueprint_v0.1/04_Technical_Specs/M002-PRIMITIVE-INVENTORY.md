# Primitive Inventory: Design System M-002

## Status
* **Status**: PROPOSED
* **Gate**: Requires Architect Approval

## Baseline Requirements
Ogni componente deve seguire rigorosamente il contratto imposto dalla Component Library autorevole. 
Prima dell'implementazione, le dipendenze shadcn/ui e Radix necessarie (come `tailwind-merge`, `clsx`, `@radix-ui/react-*`, e icone es. `lucide-react`) andranno approvate tramite la Dependency Adoption Policy, poiché `@atlas/ui` dispone al momento solo di `build` e `typecheck`.

Ogni componente dovrà possedere documentazione e implementazione per:
- **Scopo**: A cosa serve.
- **Anatomia**: Struttura DOM.
- **Proprietà**: API TypeScript (Props).
- **Varianti**: e.g., Default, Outline, Ghost.
- **Stati**: Immediato, focus-visible, hover, active, disabled, asincrono, assenza di rete (no network), retry, comportamento senza hover (su mobile).
- **Responsive Behavior**: Comportamento ai vari breakpoint.
- **Accessibilità (A11y)**: WCAG 2.2 AA, touch targets, reduced motion.
- **Analytics**: Hooking per eventi.
- **Errori**: Gestione validazione ed eccezioni visive.
- **Esempi**: Storie in Ladle.
- **Test**: Vitest + Testing Library + Axe.

---

## Tranche 1: Core Primitives

### 1. Button (F-0007 / E-0003 Context)
- **Scopo**: Azione principale o secondaria.
- **Varianti**: Primary, Secondary, Destructive, Outline, Ghost, Link.
- **Stati Asincroni**: Loading (spinner integrato), Success, Retry. Supporto per 'no network'.

### 2. Badge
- **Scopo**: Tag informativo (read-only).
- **Varianti**: Default, Secondary, Destructive, Outline.

### 3. Skeleton (S-0013)
- **Scopo**: Placeholder asincrono.
- **A11y**: Gestione rigorosa `prefers-reduced-motion` (sostituzione pulsazione con opacità statica o disattivazione animazione).

### 4. StatusIndicator (S-0014)
- **Scopo**: Feedback di sistema in tempo reale.
- **A11y**: Deve avere testo accessibile, non può basarsi unicamente sul colore.

---

## Tranche 2: Forms & Complex Layouts

### 5. Input
- **Stati Errori**: Bordo rosso semantico, icona di errore e testo descrittivo.
- **Stati Rete**: Sospeso durante l'invio asincrono.

### 6. FormField
- **Anatomia**: Label + Input + Description + Error Message.
- **A11y**: Propagazione nativa di `aria-describedby` e `aria-invalid`.

### 7. Select
- **Stati**: Open, Closed, Hovering Option.
- **A11y**: Completamente navigabile da tastiera (Frecce, Enter, Esc).

### 8. Card
- **Anatomia**: Header, Title, Description, Content, Footer.
- **Responsive**: Reflow automatico dei contenuti.

### 9. Dialog/Modal (T-0028)
- **A11y**: Focus trapping obbligatorio, chiusura con `Esc`. Blocco dello scroll del background.

### 10. Tabs (T-0025 / T-0026)
- **Anatomia**: TabList, TabTrigger, TabContent.
- **A11y**: Frecce direzionali per scorrere i trigger.

### 11. Toast (ST-0013 / ST-0014)
- **Scopo**: Feedback non bloccante.
- **A11y**: `aria-live="polite"` o `assertive`, supporto a `swipe to dismiss`.

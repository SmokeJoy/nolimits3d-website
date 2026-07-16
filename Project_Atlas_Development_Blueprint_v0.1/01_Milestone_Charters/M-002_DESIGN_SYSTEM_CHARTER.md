# Milestone Charter: M-002 — Design System

## Metadata
* **Status**: DRAFT
* **Phase**: M-002 Charter Preparation
* **Package**: `@atlas/ui`
* **Gate**: Pending `PROCEED — M-002 DESIGN SYSTEM`

## Approvazioni / Ownership
* **Product Owner**: Andrea
* **Chief Architect**: ChatGPT
* **TPM / Integration QA**: Gemini
* **Visual Foundations Owner**: Product Design
* **Implementation Owner**: Frontend Engineering / Claude
* **CI and guardrails**: Codex

---

## Valore Business ed Exec Summary
Lo scopo della Milestone M-002 è l'implementazione del Design System ufficiale (Web Application Premium) per Project Atlas. Questa milestone assicura la coerenza visiva e le fondamenta di accessibilità, standardizzando i componenti primitivi in un ambiente isolato (`@atlas/ui`) prima della costruzione dell'applicazione principale.

## Requisiti e Owner Document
Il charter è strettamente vincolato ai seguenti documenti della **Documentation Bible**:
* `07_Frontend_Architecture.md` (Stack: React, TypeScript, Vite, Tailwind CSS, shadcn/ui)
* `02_Design_System.md` (Web Application Premium, tema dark primario, light di supporto)
* `03_Design_Tokens.md` / `DOC-DES-007` (Tassonomia completa: colore, spacing, dimensioni, radius, shadow, typography, breakpoint, motion, z-index, senza valori magici)
* `04_Component_Library.md` / `DOC-DES-008` (API tipizzata, varianti, stati, accessibilità, no testo hardcoded)
* Brand Book (riferimenti iniziali `#101820`, `#25D366`, `Poppins` da validare via contrast audit/licenza)

## Blueprint Slice (Scope Vincolante)
Lo scope di M-002 è rigidamente limitato agli ID ufficiali:
* `E-0003`: Design System & Frontend Foundation
* `F-0007`: Tokens and component primitives
* `S-0013`: Implement Atlas design tokens and premium motion foundations
* `S-0014`: Build accessible primitives
* `T-0025`–`T-0026`: architettura e integrazione dei token
* `T-0027`–`T-0028`: contratto e implementazione responsive delle primitive
* `ST-0013`–`ST-0014`: verifica e test

**Out-of-Scope**:
Nessuna homepage, routing, catalogo di dominio, Jarvis, PrintFlow operativo, redesign del legacy, autenticazione, né dipendenze da `apps/legacy-web`.

## Primitive tranche proposta
* Button
* Input
* FormField
* Select
* Card
* Badge
* Dialog/Modal
* Tabs
* Toast
* Skeleton
* StatusIndicator

## ADR applicabili
- **ADR-001**: Adozione Tailwind CSS + shadcn/ui (prescritto da Frontend Architecture). CSS vanilla ammesso solo per custom properties semantiche e base styles.
- **ADR-002**: Anteprima Componenti. 
  - **Default preliminare**: Vite Playground, perché non introduce nuove dipendenze.
  - **Alternative under evaluation**: `Ladle` (da valutare per peso dipendenze, manutenzione, build statica, visual regression e accessibilità).
  - **Decision required**: Architect approval dopo valutazione tecnica.

## Dipendenze
- Approvazione Dependency Adoption Policy per eventuali tool di testing visivo esterni.
- Node `24.18.0`, pnpm `9.15.0`.
- Nessun import/dipendenza da siti legacy.

## Rischi e mitigazioni
- **Rischio**: Incoerenza token (valori magici). **Mitigazione**: Audit rigoroso rispetto a `DOC-DES-007`.
- **Rischio**: Componenti non accessibili. **Mitigazione**: Test di navigazione tastiera, focus-visible, e WCAG 2.2 AA come quality gate.

## Criteri di accettazione
- Tema dark primario e light di supporto correttamente mappati.
- Primitive component implementate usando shadcn/ui.
- Raggiungimento WCAG 2.2 AA, touch target corretti, zoom 200%, focus accessibile e supporto reduced motion.
- Nessuna warning o dipendenza bloccante. 
- API tipizzata, stati di errore e varianti supportate per ogni componente.

## Quality Gates
- CI Pipeline verde su `@atlas/ui` (Lint, Typecheck, Test).
- Approvazione tecnica Architect sul rispetto della Documentation Bible.

## Demo attesa
Pagina o interfaccia isolata (Vite Playground o Ladle se approvato) che mostra tutte le primitive funzionanti, con le rispettive varianti, senza contesto di business.

## Piano sprint
(Da definire post-approvazione del Charter. Prevede tranche incrementali dai token alle primitive semplici e forme complesse).

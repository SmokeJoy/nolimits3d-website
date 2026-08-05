# Milestone Charter: M-003 — Public Web Foundation

## Metadata
* **Status**: APPROVED
* **Phase**: M-003 Sprint 1
* **Package**: `apps/web`
* **Gate**: Chartered and approved by Claude Code acting as architect, per Andrea's direct
  instruction 2026-08-05 (`001_SESSION_HANDOFF.md`), following `PA-AR-M002-015`'s closure of
  M-002 and `M002-PRIMITIVE-INVENTORY.md`'s approved component set.

## Approvazioni / Ownership
* **Product Owner**: Andrea
* **Architect / Implementer**: Claude Code (acting in place of Codex Root per Andrea's direct
  instruction, until a Codex session resumes and the two are reconciled)

---

## Valore Business ed Exec Summary
`apps/web` today is a routing skeleton (`AppShell`, three route boundaries, no design-system
integration, no navigation, no content). M-002 built `@atlas/ui` in isolation; M-003's first
slice wires it into the real application and builds the site's structural spine — global
navigation, footer, and the homepage — so every later milestone (Catalog, Quotes,
Configurator, etc.) has somewhere real to attach.

## Requisiti e Owner Document
* `NoLimits3D_Documentation_v0.96/04_Experience/01_Information_Architecture.md` (`DOC-UX-001`)
  — sitemap, primary navigation, page-per-question mapping. **Authoritative for IA.**
* `NoLimits3D_Documentation_v0.96/04_Experience/03_Homepage_Wireframes.md` (`DOC-UX-003`)
  — homepage section order, requirements `HOME-F-001`..`010`, `HOME-NF-001`..`004`.
  **Authoritative for homepage structure.**
* `Project_Atlas_Development_Blueprint_v0.1/04_Technical_Specs/M002-PRIMITIVE-INVENTORY.md`
  — the only components available: Button, Badge, Card, Skeleton, StatusIndicator, Input,
  FormField, Select, Dialog, Tabs, Toast. No new primitives in this milestone.

## Blueprint Slice (Scope Vincolante)
* `E-0004`: Public Web & Content (roadmap)
* `F-0010`: Homepage and global navigation
* `S-0019`: Deliver immersive conversion-focused homepage architecture
* `S-0020`: Deliver responsive navigation and footer

**In scope (Sprint 1, this task packet):**
- `apps/web` gains `@atlas/ui`'s stylesheet and a real design-system-driven shell.
- Global navigation (header) matching the six primary IA sections
  (Realizza / Esplora / Servizi / Realizzazioni / Eventi / NoLimits3D), responsive,
  keyboard-accessible, no mega-menu (IA rule: "mega-menu solo se testato" — not tested, not
  built).
- Footer with real, structural links to the full sitemap plus legal pages, matching
  `apps/legacy-web`'s Footer for any already-live legal/contact links (those are real and
  reusable; the marketing copy around them is not).
- Homepage (`/`) rebuilt at `PublicHome.tsx`, structured per `HOME-F-001`..`010` (ten
  sections in order), using `@atlas/ui` components throughout.

**Out of scope:** the fourteen destination pages the nav links to (Catalogo, Servizi
detail pages, Realizzazioni, Eventi, Chi siamo, Blog, Preventivo, Configuratore, Account,
Carrello) — each becomes its own task packet in a later sprint. Jarvis, PrintFlow
(operational), `apps/legacy-web` changes, authentication, Supabase-backed data.

## Content policy — the actual constraint on this milestone
`apps/legacy-web`'s existing hero/marketing copy ("🚀✨ REALIZZA LA TUA IDEA", superlative,
emoji-heavy claims) conflicts with `HOME-NF-003` ("Non usare media AI/render come prova
reale") and the wireframe's own stated tone ("dimostrare competenza, onestà"). It is not
reused verbatim. Concrete business facts found in the legacy site are **not uniformly
trustworthy without confirmation** — e.g. the free-delivery threshold appears as both €20 and
€50 in different legacy locations, an unresolved discrepancy, not a typo I can silently pick
a side on.

Binding rule for this task packet: **every string a real visitor would read as a factual or
promotional claim (pricing, thresholds, testimonials, event dates, "who Andrea is" copy,
trust badges) ships as an explicit, visually-obvious placeholder** (e.g.
`[PLACEHOLDER: hero H1 — confirm with Andrea]`), never as invented finished copy presented as
if it were real. Structural copy that is not a business claim (nav labels drawn directly from
the approved IA sitemap, section headings drawn directly from the wireframe spec's own
Italian section names) is real, not placeholder, because it is already the approved spec text
verbatim.

## Dipendenze
- `@atlas/ui` (merged, working — `packages/ui`).
- No new dependencies. No `apps/web/package.json` change expected; if one becomes necessary,
  stop and document why before proceeding (established pattern from M-002's deviations).

## Rischi e mitigazioni
- **Rischio**: contenuto placeholder scambiato per finale. **Mitigazione**: marcatori
  visivi/testuali espliciti (`[PLACEHOLDER...]`), elencati per esteso nel report finale del
  task, nessuna dichiarazione di "contenuto pronto per la pubblicazione".
- **Rischio**: divergenza da IA/wireframe per interpretazione libera. **Mitigazione**: ogni
  sezione della homepage mappata 1:1 alla lista `HOME-F-00N` nel task packet; ogni voce di
  navigazione mappata 1:1 alla sitemap di `DOC-UX-001`.
- **Rischio**: sessione Codex parallela tocca `apps/web` in concorrenza. **Mitigazione**:
  branch dedicato, fetch/verifica dello stato remoto prima di ogni push, come già fatto per
  Wave C1/C2/repair in questa sessione.

## Criteri di accettazione
- Navigazione globale presente su ogni route, con le sei voci primarie della IA, accessibile
  da tastiera, responsive (mobile/tablet/desktop) senza hover-only.
- Footer con link strutturali reali alla sitemap completa.
- Homepage con le 10 sezioni di `HOME-F-001`..`010` presenti nel DOM, nell'ordine dello
  wireframe, ciascuna costruita con primitive `@atlas/ui` dove applicabile.
- Ogni contenuto-claim è un placeholder esplicito, elencato nel report di consegna.
- WCAG: navigazione da tastiera, focus visibile, nessun contenuto hover-only, reduced-motion
  rispettato dove animazioni sono presenti.
- Nessun import da `apps/legacy-web`; nessuna modifica a `apps/legacy-web`.

## Quality Gates
Stessi della M-002: format check, lint, typecheck, test, build, verifica manuale in browser
reale (non solo automatica — lezione della repair di Wave C2), dependency audit, scope guard,
source-binding guard.

## Piano sprint
Sprint 1 (questo charter): Wave D — navigazione, footer, homepage skeleton.
Sprint successivi (charter separati, non ancora aperti): pagine di destinazione della sitemap,
in ordine di priorità da concordare con Andrea via i placeholder di contenuto che questa wave
lascia visibili.

## Data e Approvazioni
* **Data**: 2026-08-05
* **Product Priority — Andrea**: APPROVED ("voglio tutta la web app", verbatim,
  `001_SESSION_HANDOFF.md`)
* **Architecture — Claude Code (acting architect)**: APPROVED
* **Milestone Start**: AUTHORIZED for Sprint 1 scope above

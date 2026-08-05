# Task Packet: M-003 Sprint 1 — Public Web Foundation

## TSK-M003-WEB-D1 (Navigation, Footer, Homepage skeleton)
* **Roadmap IDs**: `E-0004`, `F-0010`, `S-0019`, `S-0020`
* **Branch**: `m003/public-web-foundation`
* **Owner**: Claude (acting architect + implementer)
* **Charter**: `Project_Atlas_Development_Blueprint_v0.1/01_Milestone_Charters/M-003_PUBLIC_WEB_FOUNDATION_CHARTER.md`

## Allowed Files
- `apps/web/src/app/AppShell.tsx`
- `apps/web/src/routes/public/PublicHome.tsx`
- `apps/web/src/routes/public/**` (new files: nav, footer, homepage section components)
- `apps/web/src/test/**` (new/updated tests for the above)
- `apps/web/src/main.tsx` only if importing `@atlas/ui`'s stylesheet requires it

## Forbidden Files
`apps/web/package.json`, `pnpm-lock.yaml`, `apps/legacy-web/**`, `packages/ui/**` (consume,
don't modify — if a real @atlas/ui gap is found, stop and report it, don't patch it inline
here), `scripts/guards/**`, anything under `apps/web/src/routes/command/**` or `account/**`.

## Preconditions
- `@atlas/ui` builds and its stylesheet is importable (confirmed working post-PR #11).
- `PA-AR-M002-015` approved the full component inventory this task consumes.

## Source of truth (read before writing code)
1. `NoLimits3D_Documentation_v0.96/04_Experience/01_Information_Architecture.md` — sitemap
   and primary nav labels. Copy the six primary sections and the "always accessible" items
   verbatim from there for nav labels; do not invent alternate wording.
2. `NoLimits3D_Documentation_v0.96/04_Experience/03_Homepage_Wireframes.md` — ten homepage
   sections in order, requirements `HOME-F-001`..`010`. Build ten distinct, identifiable
   sections in that order. Section headings may use the document's own Italian section names
   (e.g. "Come nasce il tuo progetto", "Fiducia e Andrea") — those are spec text, not
   invented copy.
3. `Project_Atlas_Development_Blueprint_v0.1/04_Technical_Specs/M002-PRIMITIVE-INVENTORY.md`
   — the only components you have: Button, Badge, Card (+ CardHeader/Content/Footer/Title/
   Description), Skeleton, StatusIndicator, Input, FormField, Select, Dialog, Tabs, Toast.
   No new primitives. If a section seems to need something else (e.g. an accordion for FAQ),
   build it from existing primitives/plain semantic HTML, don't invent a new @atlas/ui export.

## Placeholder policy (binding, re-read this before writing any copy)
Any string a visitor would read as a factual/promotional claim ships as an explicit
placeholder, e.g.:
```tsx
<h1>[PLACEHOLDER H1 — confirm hero headline with Andrea. Wireframe candidate: "Hai un'idea? Diamo forma ai tuoi progetti."]</h1>
```
This applies to: the H1 and its supporting line, the six intent cards' descriptions, any
pricing/threshold claim, testimonials, event dates/locations, "chi è Andrea" biographical
copy, trust badges/indicators, case study content, CTA microcopy beyond the two CTA labels
the wireframe already names verbatim (`Inizia il tuo progetto`, `Scopri cosa possiamo
realizzare`, `Iniziamo insieme`, `Parliamone` — those four are spec text, use them as-is, not
placeholders).
Structural/navigational copy (nav labels, footer section labels, homepage section headings
taken verbatim from the wireframe doc) is NOT a placeholder — it is already-approved spec
text.

## Exact deliverables
1. **Navigation** (new component, e.g. `apps/web/src/routes/public/GlobalNav.tsx`): the six
   primary IA sections as real links (`Realizza`, `Esplora`, `Servizi`, `Realizzazioni`,
   `Eventi`, `NoLimits3D`), plus the "always accessible" items the IA lists (Catalogo,
   configuratore lanterne, richiesta/preventivo, account, carrello, ricerca, contatti) at
   least as real links even where the destination page doesn't exist yet (it will hit the
   existing `*` → `NotFound` route — acceptable for this sprint, later sprints replace the
   404s with real pages). Responsive: usable on mobile without hover. Keyboard-navigable.
   `command` route stays unlinked, per `AppShell.tsx`'s existing FE-NF-003 invariant — do not
   break that.
2. **Footer** (new component, e.g. `Footer.tsx`): structural links to the full sitemap from
   `DOC-UX-001`, organized by the same six primary sections. No marketing copy.
3. **Homepage** (`PublicHome.tsx` rebuilt): ten sections per `HOME-F-001`..`010`, in order,
   each as an identifiable DOM section (`<section aria-labelledby=...>` or similar), built
   from `@atlas/ui` primitives (Button for CTAs, Card for intent/case cards, etc.) with
   placeholder copy per the policy above. PrintFlow section (`HOME-F-010`) says "Coming Soon"
   literally — that's already the approved product boundary text, not a placeholder.
4. Tests: at minimum, one test asserting all ten homepage sections are present in the DOM in
   order, one test asserting the six primary nav links are present and keyboard-reachable,
   one test asserting the `command` route is not linked from anywhere in the rendered nav or
   footer (regression guard for the existing invariant).

## Verification (do this yourself, don't just claim it)
- `pnpm --filter @atlas/web typecheck && pnpm --filter @atlas/web test && pnpm --filter @atlas/web build`
- Full workspace: `pnpm build && pnpm lint && pnpm typecheck && pnpm test && pnpm format:check`
  `&& pnpm guard:scope && pnpm guard:source-bindings`
- **Open it in a real browser** (`pnpm --filter @atlas/web dev`) and check the console for
  errors — the require("react") regression shipped past every automated gate in Wave C2 and
  was only caught this way. Resize to mobile width and confirm the nav doesn't break.
- List every placeholder you shipped, verbatim, in your final report. This list is the actual
  deliverable Andrea needs to act on next, not an afterthought.

## Control & Operations
- **Stop/Escalation**: stop and report, don't improvise, if: a Forbidden File needs editing,
  a homepage section genuinely can't be built from the existing primitive inventory, or the
  IA/wireframe docs contradict each other on something structural.
- **Rollback**: `git revert` the merge commit if needed; no hard resets.

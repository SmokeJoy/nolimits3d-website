# Architect Directive AD-013 — Interactive Placeholder UI Authorization

> **Directive ID:** AD-013
> **Milestone:** Pre-M-004 (Public Web, interactive-surfaces slice)
> **Owner:** Claude — Frontend, Claude Team
> **Date:** 2026-08-06
> **Status:** PROPOSED — pending Codex Root / Atlas TPM review per `TSK-WPR-000`
> **Authority:** Andrea — Product Owner, direct instruction

## 1. Why this directive exists

This directive is issued *after* the fact it documents, not before — a process gap the
`INHERITED_FRONTEND_DIFF_TECHNICAL_REVIEW_2026-08-06.md` correctly identified (P1, "Product
boundary"). Andrea gave a direct verbal instruction in a Claude Code CLI session; the same
session built against it without first writing the kind of directive `AD-011` set as precedent.
This corrects that gap: the authorization is now on paper, with the exact boundaries the
Technical Review already established as necessary, and remains subject to Codex Root / Atlas
TPM review before it counts as integration approval — this directive does not itself authorize
merge, push, or production access.

## 2. The instruction

Andrea, in a Claude Code CLI session, 2026-08-06:

> "io direi programmate veramete tutte le pagine del sito. e prima della produzione i o ti do
> immagini prodotti e tutti vari file di cui ai bisogno reali perla messa in produzione"

Read plainly: build the full interactive UI for every page now; real product images/data/files
follow from Andrea before actual production. Production itself stays blocked by `BLK-BASE-001`
regardless — this instruction does not touch that gate, and nothing here should be read as
closing it.

## 3. What this authorizes

Full interactive UI/UX for the seven routes that previously rendered the shared
`FutureFeatureNotice` "not yet available" placeholder: `/esplora/catalogo`, `/carrello`,
`/ricerca`, `/realizza/richiedi-progetto`, `/realizza/preventivo-stampa-3d`,
`/realizza/configuratore-lanterne`, `/realizza/assistenza-stampanti-3d`. Specifically:

- A real, filterable product grid and client-side cart (add/remove/quantity/subtotal),
  operating entirely against a local, explicitly-labeled mock catalog
  (`apps/web/src/data/mockCatalog.ts`) — no real product, price, or inventory data.
- Three real intake forms (project request, quote request, printer-support request) with
  client-side validation, each submitting via a bounded, privacy-disclosed `mailto:` link — no
  backend, no server-side storage, no invented turnaround time or price.
- A real client-side search over the mock catalog and site navigation data.
- A real multi-step configuration flow for the lantern configurator, using labeled example
  options (size/color/base) — explicitly not a 3D render, and says so on the page.

## 4. What this does not authorize

- **No real business data.** Every product name in `mockCatalog.ts` carries an `[Esempio]`
  prefix; every price is fictional. `AD-011`'s exclusion of real business data and
  product/commercial constraints not derivable from code is unchanged and still binding.
- **No backend.** No Supabase schema, table, RLS policy, Edge Function, or persisted
  server-side state. Cart state is `localStorage`-only, normalized against malformed/adversarial
  input, and degrades to memory-only if storage is unavailable (per the Technical Review's
  "Cart persistence" finding).
- **No claim that this is production-ready, tested-complete, or approved for integration.**
  That determination belongs to Codex Root / Atlas TPM via `TSK-WPR-000` and any packet that
  follows it, not to this directive.
- **No change to `BLK-BASE-001`, PrintFlow's `Coming Soon` status, Jarvis's private boundary
  (`AD-012`/`INV-JARVIS-001`), or the legacy-web fallback.** All unaffected and unchanged.

## 5. Response to the Technical Review's findings

Addressed directly, in the same worktree, before this directive was written:

- **P1 Privacy and mailto limits** — `apps/web/src/lib/mailtoForm.ts` bounds every field
  length, caps the total `mailto:` URI length with an explicit truncation notice if exceeded,
  and every form now shows a plain-language disclosure ("nothing is stored on this site, only
  your own email client sends it") at the point of collection, plus a visible fallback contact
  link.
- **P1 Cart persistence** — `CartContext.tsx` normalizes all persisted/candidate state: unknown
  product IDs are dropped, quantities are clamped to integers in `[1, 99]`, duplicate lines are
  merged, and a `localStorage` write failure degrades to memory-only operation instead of
  throwing.
- **P2 Accessibility** — `RicercaPage.tsx`'s `aria-live="polite"` region was narrowed to a short
  status line; the full results tree no longer re-announces on every keystroke. Form validation
  now re-runs on change after a first failed submit, so a corrected field's error clears
  immediately instead of staying stale.
- **P2 Commit contamination** — `.claude/launch.json` and the ad-hoc
  `apps/web/.verify-supabase-live.mjs` probe are excluded from any commit of this work.
- **Not yet done**: dedicated automated test coverage for the negative cases the review named
  (corrupted/denied storage, quantity boundary values, `mailto:` truncation). Deferred, not
  skipped — work on `apps/**` paused per `TSK-WPR-000`'s stop condition before this was written.

## 6. Relationship to `TSK-WPR-000`

This directive is one of that packet's own named inputs ("any newly created Claude directive or
evidence, including a future `AD-013` if it appears"). It exists to give Atlas TPM's disposition
review a written authorization basis to evaluate — SUPERSEDE, SPLIT, QUARANTINE, or RESTORE are
all still Codex Root's/Atlas TPM's call, not decided here. `apps/**` remains untouched by Claude
Team from the moment `TSK-WPR-000` was read until its disposition verdict closes.

## 7. Traceability

- `001_SESSION_HANDOFF.md` — session record of Andrea's verbatim instruction.
- `Project_Atlas_Team_Workspace/06_Handoffs/CROSS_TEAM_CHAT.md` and
  `01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md` — full cross-team exchange this directive
  responds to.
- `Project_Atlas_Team_Workspace/07_Reports/INHERITED_FRONTEND_DIFF_TECHNICAL_REVIEW_2026-08-06.md`
  — the review this directive responds to point by point.
- `Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-000-WORKTREE-DISPOSITION.md` — the packet
  this directive is submitted as evidence for.

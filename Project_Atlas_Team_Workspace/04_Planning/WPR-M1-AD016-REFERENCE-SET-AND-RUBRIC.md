# WPR-M1 -- AD-016 Competitor Reference Set and Objective Rubric

> **Status: PROPOSED -- PENDING ANDREA ACCEPTANCE.** This document creates no UI implementation
> authority and does not claim that accessibility, responsive, browser, visual, or performance
> evidence exists for any future UI change. Per `AD-016` section 4, only Andrea may accept the
> reference set and any subjective aesthetic-impact judgment. No competitor asset, image, or
> copy is reproduced here.

## 1. Why a proposal, not a finished list

`AD-016` section 1 scopes the competitor comparison to **visual/aesthetic impact only** --
explicitly not performance, usability, accessibility, or content quality (those stay separate,
already-covered gates). Section 3 states the reference set "may be proposed by either team and
must be approved by Andrea before it becomes an acceptance reference." This packet's own
dependencies (section 4) are read-only and do not include any Andrea-supplied competitor list --
none exists in the repository as of this packet's base commit. Naming specific real businesses
without that input would be inventing business facts, which `AD-014` section 2 explicitly
forbids. This document therefore proposes the **selection criteria and rubric structure**, with
bounded slots Andrea fills or approves, rather than inventing names.

## 2. Proposed selection criteria (bounded set, 3-5 sites)

A candidate site qualifies for the reference set only if **all** of the following hold:

1. Operates in the same or an immediately adjacent sector (professional/consumer 3D printing
   services, prototyping, or a comparably specialized maker-adjacent service business) -- not a
   generic e-commerce site or a large multi-category marketplace.
2. Publicly reachable without login, so evidence can be gathered the same way a real visitor
   would experience it.
3. Not a direct clone, template reseller, or the same template family as this project (comparing
   against a site built on an identical template would not measure genuine visual distinction).
4. Andrea has direct knowledge of it as a real or perceived competitor, or it is jointly proposed
   by Claude/Codex Team and explicitly accepted by Andrea per `AD-016` section 3 -- self-selection
   by either AI team alone is not sufficient acceptance.

**Slots (to be filled/approved by Andrea, not invented here):**

| Slot | Sector relevance | Andrea-provided name/URL | Acceptance status |
| --- | --- | --- | --- |
| Reference 1 | (Andrea to specify) | *pending* | PROPOSED -- PENDING ANDREA ACCEPTANCE |
| Reference 2 | (Andrea to specify) | *pending* | PROPOSED -- PENDING ANDREA ACCEPTANCE |
| Reference 3 | (Andrea to specify) | *pending* | PROPOSED -- PENDING ANDREA ACCEPTANCE |
| Reference 4 (optional) | (Andrea to specify) | *pending* | PROPOSED -- PENDING ANDREA ACCEPTANCE |
| Reference 5 (optional) | (Andrea to specify) | *pending* | PROPOSED -- PENDING ANDREA ACCEPTANCE |

## 3. Objective rubric

Each dimension is scored 1-5 against every accepted reference site, using only what a real
visitor can observe (no source-code inspection of the competitor). Scores compare *this* app's
current or proposed state against the reference set; they are never self-assigned as a claim of
overall superiority without Andrea's own recorded acceptance (`AD-016` section 4).

| Dimension | 1 (weak) | 3 (adequate) | 5 (strong) | Evidence method |
| --- | --- | --- | --- | --- |
| Visual identity coherence | Styling visibly inconsistent across sections/pages | Mostly consistent, occasional drift | Fully consistent token/primitive use site-wide | Manual visual walkthrough of every route in `WPR-M1-ROUTE-CAPABILITY-INVENTORY.json`; screenshot comparison |
| Clarity / information architecture | Visitor cannot tell what the business offers within 5 seconds | Offer is clear with some effort | Offer and primary actions are immediately obvious | First-impression walkthrough against `DOC-UX-001`'s IA; unmoderated 5-second-test protocol (future, not run here) |
| Approved design-token/primitive use | One-off, page-specific styling bypasses the token system | Tokens used for most, but not all, surfaces | 100% of styled surfaces use `packages/ui` tokens/primitives, zero one-off CSS | `packages/ui/styles/global.css` + `@atlas/ui` primitive usage audit (already the standing rule this project holds) |
| Accessibility | Fails automated checks | Passes automated checks, some manual gaps | WCAG 2.2 AA, automated + manual verified | `axe-core` results (already required, separate gate, not this document's job to re-prove) |
| Responsive behavior | Broken layout on any common breakpoint | Usable but visibly imperfect on some breakpoints | Clean at all common breakpoints | Manual resize/emulation walkthrough (future UI-packet evidence, not this packet's) |
| Browser behavior | Console errors or visible breakage in a real browser | Functions but with minor console noise | Zero console errors, real-browser E2E green | Playwright E2E suite (already required, separate gate) |
| Performance | Exceeds the approved initial-payload budget | At budget | Comfortably under `DOC-SEC-005` section 4 budget | `pnpm guard:performance-budget` (already required, separate gate) |
| Trust signals | No real contact/business-identity presence | Some real signals, some placeholder | Real, verified business identity, honest empty states everywhere | Cross-reference against `CLIENT_DATA_MANIFEST.json` `business-identity`/`testimonials-claims` approval status |
| Product inspection experience | No way to see real product detail/media | Static images only | Rich, real, rights-cleared media with real detail | Cross-reference against `content-media` manifest category and the (currently missing) product-detail capability, `GAP-CATALOG-02` |
| Conversion flow clarity | No clear path from interest to contact/purchase | Path exists but is confusing or dead-ends | Obvious, low-friction path at every relevant honest-placeholder or real page | Manual walkthrough of every `request-intake`/`cart`/`configurator`-classified route in the inventory |

## 4. What this rubric cannot yet score

Per `AD-016` section 4, "Automated checks may prove consistency, accessibility, regressions, and
performance, but they cannot approve subjective aesthetic impact." No score in this document has
been computed against real reference sites yet -- the reference set itself is unapproved. This
document is the *instrument*, not a result. Running it against real, Andrea-accepted references
and reporting scores is future `WPR-M3`/`WPR-M4` work, contingent on: (1) Andrea filling or
approving the slots in section 2, and (2) the product surfaces under test being real
implementations, not the honest placeholders most `request-intake`/`configurator`/`cart` routes
currently are per `WPR-M1-ROUTE-CAPABILITY-INVENTORY.json`.

## 5. Acceptance

This document, as delivered, satisfies packet section 8.6 ("bounded proposed competitor/
reference set and objective rubric... State evidence methods and scoring anchors without
copying competitor assets or copy") by proposing the *mechanism* -- criteria, slots, and rubric
-- without inventing or copying any real competitor's name, image, or text. It remains
`PROPOSED -- PENDING ANDREA ACCEPTANCE` in full until Andrea fills the slots in section 2 and
separately accepts both the reference set and any future subjective visual-impact judgment.

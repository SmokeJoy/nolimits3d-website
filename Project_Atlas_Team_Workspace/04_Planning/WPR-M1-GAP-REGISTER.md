# WPR-M1 Gap Register

> Part of `CLAUDE-WPR-M1-BASELINE-INVENTORY-PACKET.md`. Combines
> `WPR-M1-BASELINE-ROUTE-INVENTORY.md` and `CLIENT_DATA_MANIFEST.json` into one exact list of
> what is missing before Andrea's data insertion (`WPR-M5`) can begin. Every row in
> `CLIENT_DATA_MANIFEST.json` currently has `status: "missing"` -- this document is the first
> baseline snapshot, not a claim that anything has been provided yet.

## 1. Structural gaps (need engineering work, not just data)

| Gap | Evidence | Blocked on |
| --- | --- | --- |
| No legal routes exist (`/privacy`, `/termini`, `/cookie` or equivalent) | `apps/web/src/app/routes.tsx`, `Footer.tsx` -- no match for any legal-route path | New route + page components (`WPR-M3` scope, not this packet) |
| Catalog/cart/configurator/intake pages are honest placeholders (`FutureFeatureNotice`), not implementations | `WPR-M1-BASELINE-ROUTE-INVENTORY.md` status column | `WPR-M2` typed contracts + Supabase schema must land first (`AD-014` section 4) -- building the UI before that repeats the `QUARANTINE` mistake from earlier this session |
| No real authentication exists (`/account` is a static placeholder) | `apps/web/src/routes/account/AccountHome.tsx` | `WPR-M2` -- Supabase Auth, deny-by-default RLS |
| No server-validated intake/cart persistence exists | Same placeholder routes above | `WPR-M2` backend foundation |

## 2. Pure data gaps (Andrea must supply, no engineering blocker)

Every category in `CLIENT_DATA_MANIFEST.json` is currently `missing`. Grouped by urgency:

**Needed before any legal route can go live (once built):**
- Privacy policy, cookie policy, terms and conditions, returns/warranty, delivery policy, data
  retention policy, consent copy (`legal-commercial-copy` category).

**Needed before the catalog/configurator/cart can go live (once built):**
- Product/variant/price/tax/availability/commercial-mode data, real lantern configurator
  models/materials/dimensions/electrical specs, portfolio media with rights/provenance and alt
  text (`commerce-catalog`, `content-media` categories).

**Needed for the pages already live today:**
- Business identity/contacts/hours/service area for `/nolimits3d/contatti` and the homepage
  (`business-identity` category) -- this is the one category that could be filled in *without*
  waiting on any further engineering work, since `ContattiPage` is already a real, shipped page.

**Needed before production infrastructure can be provisioned:**
- Vercel project link, Supabase project identifiers, domain configuration, production secrets
  via approved secret paths (`provider-credentials` category) -- also gated by `BLK-BASE-001`
  regardless of data availability.

## 3. What this gap register does NOT claim

- It does not claim any of these gaps are new discoveries requiring urgent action -- they were
  already implicit in `AD-014`'s own architecture and the `FutureFeatureNotice` placeholder
  pattern established earlier this session. This document makes them explicit and trackable,
  per `WPR-M1`'s stated purpose ("establish an exact gap register").
- It does not authorize inventing placeholder content to fill any of these gaps -- `AD-014`
  section 2 explicitly excludes "invented business facts, prices, products, materials, media,
  testimonials, legal text, policies, availability, fulfillment promises, tax rules, or
  payment-method activation." Every `missing` status stays `missing` until Andrea supplies real
  content through the governed manifest, not a workaround.
- It does not change or supersede anything in `AD-014`, `AD-015`, or `AD-016` -- it is an
  inventory output derived from them, self-scoped per the packet header, awaiting Codex Root's
  Technical Review on return.

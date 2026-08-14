# WPR-M1 Gap Register (Corrected)

> Every gap ID referenced here is cited from `WPR-M1-ROUTE-CAPABILITY-INVENTORY.json`/`.md`.
> Owner categories distinguish this packet's own contract/readiness scope from later work this
> packet does not authorize. Source base `d7777a84f5a397d3332544e5f2f0d73e2d48661d`.

## Owner category legend

| Category | Meaning | Who closes it |
| --- | --- | --- |
| `contract-readiness` | Closed by this packet's own deliverables (schema, manifest, guard, binding contract). | This packet. |
| `backend-architecture` | Requires real Supabase schema/RLS/Auth/Storage or typed-contract implementation. | Codex Root / Atlas Backend, `WPR-M2`. |
| `future-app-implementation` | Requires real `apps/web` UI/route implementation once `WPR-M2` contracts exist. | `WPR-M3`. |
| `client-data` | Requires Andrea to supply and approve real business data. | Andrea, via `CLIENT_DATA_MANIFEST.json`. |
| `legal-privacy` | Requires Andrea/legal-owned copy (privacy, cookies, terms, returns, delivery, consent). | Andrea. |
| `deployment-infra` | Requires a real linked Vercel/Supabase project; blocked by `BLK-BASE-001`. | Codex Root, post-`BLK-BASE-001`. |
| `test-coverage` | Existing shipped behavior lacks proportionate automated evidence. | Whichever team owns the affected route's next packet. |

## Gap entries

### GAP-BIZ-01 -- Business identity has no enforceable source binding
- **Source evidence:** `apps/web/src/routes/public/pages/ContattiPage.tsx`, `apps/web/src/routes/public/navigation.ts:136-147` (`siteContact` reused verbatim from `apps/legacy-web/src/components/Footer.tsx`).
- **AD-014/AD-016 requirement:** AD-014 section 3.2 bullet 1 (business identity/contacts/hours/service area).
- **Owner category:** `client-data` (data) + `contract-readiness` (binding, closed by this packet's `WPR-M1-SOURCE-BINDING-CONTRACT.json`).
- **Dependency:** none blocking this packet; blocks `WPR-M5` (go-live) only.
- **Severity:** Medium -- content is already live and accurate today (reused from a real, published source), but has no Andrea-approved, versioned binding for *this* app.
- **Current status:** Route shipped and tested; data provenance undocumented in a governed contract until this packet's binding file.
- **Closure evidence needed:** `CLIENT_DATA_MANIFEST.json` `business-identity` category reaches `approved` for every required field, bound via `WPR-M1-SOURCE-BINDING-CONTRACT.json` to `ContattiPage.tsx`.
- **Downstream packet:** `WPR-M5` (Andrea data insertion).

### GAP-MEDIA-01 -- Portfolio page has no real media source
- **Source evidence:** `apps/web/src/routes/public/pages/RealizzazioniPage.tsx`.
- **AD-014/AD-016 requirement:** AD-014 section 3.2 bullet 3 (portfolio media/rights/provenance).
- **Owner category:** `client-data`.
- **Dependency:** none blocking this packet.
- **Severity:** Medium.
- **Current status:** Route/shell shipped; no real project photos or provenance/rights records exist.
- **Closure evidence needed:** `CLIENT_DATA_MANIFEST.json` `content-media.media.portfolioAssets` and `media.rightsProvenance` reach `approved`.
- **Downstream packet:** `WPR-M3` (implementation) then `WPR-M5` (data).

### GAP-MEDIA-02 -- Events page has no real event data
- **Source evidence:** `apps/web/src/routes/public/pages/EventiPage.tsx`.
- **AD-014/AD-016 requirement:** AD-014 section 3.2 bullet 3 (event listings).
- **Owner category:** `client-data`.
- **Dependency:** none blocking this packet.
- **Severity:** Medium.
- **Current status:** Route/shell shipped; no real events exist yet.
- **Closure evidence needed:** `CLIENT_DATA_MANIFEST.json` `content-media.media.eventData` reaches `approved`.
- **Downstream packet:** `WPR-M3` then `WPR-M5`.

### GAP-CATALOG-01 -- Catalog has no data or backend
- **Source evidence:** `apps/web/src/routes/public/pages/esplora/CatalogoPage.tsx` (renders `FutureFeatureNotice`, no product/price/form UI per the honesty policy `remaining-sitemap-pages.test.tsx` enforces).
- **AD-014/AD-016 requirement:** AD-014 section 3.3 (Unified Commerce Catalog).
- **Owner category:** `backend-architecture` (typed contracts + Supabase schema) then `client-data` (real products/prices) then `future-app-implementation` (real UI).
- **Dependency:** blocks `capability-product-detail` (`GAP-CATALOG-02`) and `route-ricerca` (search has nothing to search yet).
- **Severity:** High -- core commerce capability, currently 100% placeholder.
- **Current status:** Honest placeholder only, correctly so per this session's earlier `QUARANTINE` precedent (building this UI ahead of the governed sequence was already tried once and rejected).
- **Closure evidence needed:** `WPR-M2` Technical Review green on typed contracts/schema; `CLIENT_DATA_MANIFEST.json` `commerce-catalog` category `approved`; `WPR-M3` implementation packet with real UI evidence.
- **Downstream packet:** `WPR-M2` then `WPR-M3`.

### GAP-CATALOG-02 -- Product detail capability does not exist
- **Source evidence:** no match for a product-detail route or component anywhere in `apps/web/src/app/routes.tsx` (grep-verified).
- **AD-014/AD-016 requirement:** AD-014 section 2 ("catalog, product detail, cart, and controlled checkout").
- **Owner category:** `backend-architecture` then `future-app-implementation`.
- **Dependency:** depends on `GAP-CATALOG-01` (catalog must exist before product detail can be reached).
- **Severity:** High.
- **Current status:** Not started; this is the packet's "omitted capability" correction -- PR #25's inventory never named this as a required, distinct capability at all.
- **Closure evidence needed:** a real product-detail route in a future `WPR-M3` packet, backed by the `WPR-M2` schema.
- **Downstream packet:** `WPR-M2` then `WPR-M3`.

### GAP-UPLOAD-01 -- No controlled upload capability exists
- **Source evidence:** no upload component, Storage client call, or upload policy found anywhere under `apps/web/src` (grep-verified for `Storage`, `upload`, `FormData` usage in intake pages -- none found beyond placeholder copy).
- **AD-014/AD-016 requirement:** AD-014 section 2 ("controlled uploads"); section 3.4 ("controlled upload, retention, abuse protection").
- **Owner category:** `backend-architecture` (Supabase Storage + policy) then `future-app-implementation`.
- **Dependency:** blocks real implementation of `route-realizza-richiedi-progetto` and `route-realizza-assistenza-stampanti-3d`.
- **Severity:** High -- both real project/support intake flows conceptually need file/STL submission.
- **Current status:** Not started.
- **Closure evidence needed:** `WPR-M2` Storage/RLS Technical Review, then `WPR-M3` real upload UI with abuse-protection evidence.
- **Downstream packet:** `WPR-M2` then `WPR-M3`.

### GAP-CONFIG-01 -- Lantern configurator has no data-driven model or static/2D fallback
- **Source evidence:** `apps/web/src/routes/public/pages/realizza/ConfiguratoreLanternePage.tsx` (placeholder only).
- **AD-014/AD-016 requirement:** AD-014 section 3.5 (data-driven options, static/2D fallback without WebGL).
- **Owner category:** `client-data` (real models/materials/dimensions) + `backend-architecture` (data-driven option engine) + `future-app-implementation`.
- **Dependency:** none blocking this packet.
- **Severity:** High.
- **Current status:** Honest placeholder only.
- **Closure evidence needed:** `CLIENT_DATA_MANIFEST.json` `content-media.media.configuratorModels` `approved`; `WPR-M2` schema; `WPR-M3` implementation with a proven static/2D fallback path.
- **Downstream packet:** `WPR-M2` then `WPR-M3`.

### GAP-INTAKE-01 -- No server-validated intake backend exists
- **Source evidence:** `RichiediProgettoPage.tsx`, `PreventivoStampa3DPage.tsx`, `AssistenzaStampantiPage.tsx` -- all render `FutureFeatureNotice`, no form submission path.
- **AD-014/AD-016 requirement:** AD-014 section 3.4 ("server-validated submission, explicit consent... delivery status, audit, and failure recovery"); section 2 excludes automatic final STL pricing without Andrea's human review.
- **Owner category:** `backend-architecture` then `future-app-implementation`.
- **Dependency:** overlaps `GAP-UPLOAD-01` for the two upload-bearing intake routes.
- **Severity:** High.
- **Current status:** Honest placeholder only, `mailto:`-fallback-eligible per AD-014 section 3.4 ("a `mailto:` link may exist only as a visible fallback").
- **Closure evidence needed:** `WPR-M2` backend Technical Review, `WPR-M3` real form implementation.
- **Downstream packet:** `WPR-M2` then `WPR-M3`.

### GAP-CART-01 -- No server-validated cart/checkout backend exists
- **Source evidence:** `apps/web/src/routes/public/pages/CarrelloPage.tsx` (placeholder only).
- **AD-014/AD-016 requirement:** AD-014 section 3.3 ("Client cart state is provisional. The backend must revalidate...").
- **Owner category:** `backend-architecture` then `future-app-implementation`.
- **Dependency:** depends on `GAP-CATALOG-01` (nothing to add to a cart without a catalog).
- **Severity:** High.
- **Current status:** Honest placeholder only.
- **Closure evidence needed:** `WPR-M2` backend Technical Review (server-side revalidation proven), `WPR-M3` real cart implementation.
- **Downstream packet:** `WPR-M2` then `WPR-M3`.

### GAP-TEST-01 -- `/carrello` lacks Vitest-level content/a11y test parity
- **Source evidence:** absent from `content-pages.test.tsx`'s and `remaining-sitemap-pages.test.tsx`'s `expectedPages` arrays and `a11y-axe.test.tsx`'s `publicRoutes` array (grep-verified); present only in `nav-links-resolve.test.tsx` (link resolution) and E2E (`nav-links.spec.ts`, via `navigation.ts`).
- **AD-014/AD-016 requirement:** AD-016 section 2 ("UI packets must include... applicable browser, responsive, accessibility, and visual-regression evidence") -- this is a readiness/evidence gap, not a product gap.
- **Owner category:** `test-coverage`.
- **Dependency:** none.
- **Severity:** Low -- the route itself is correct and honest; only the evidence granularity is uneven versus the other 22 content-classified routes.
- **Current status:** Route correct; test coverage exists but at a coarser grain than its peers.
- **Closure evidence needed:** a future packet extends the three test files' tables by one row each for `/carrello` (mechanical, same reusable pattern already proven for 22 other routes -- not this packet's allowed write set, since `guards.test.mjs`/existing `apps/web` test files are explicitly forbidden here per packet section 6).
- **Downstream packet:** first available `apps/web` test-only packet, or bundled into the real `WPR-M3` cart implementation packet.

### GAP-TEST-02 -- `/ricerca` lacks Vitest-level content/a11y/sitemap test parity
- **Source evidence:** same absence pattern as `GAP-TEST-01`, plus also absent from `sitemap.test.ts`'s explicit path assertions (grep-verified) unlike `/carrello`.
- **AD-014/AD-016 requirement:** same as `GAP-TEST-01`.
- **Owner category:** `test-coverage`.
- **Dependency:** none.
- **Severity:** Low.
- **Current status:** Route correct; evidence gap only.
- **Closure evidence needed:** same mechanical fix as `GAP-TEST-01`, plus a `sitemap.test.ts` assertion.
- **Downstream packet:** same as `GAP-TEST-01`.

### GAP-ACCOUNT-01 -- `/account` placeholder is inconsistent with the site's honest-boundary pattern, and no real auth exists
- **Source evidence:** `apps/web/src/routes/account/AccountHome.tsx` renders a bespoke static section, not the shared `FutureFeatureNotice` component every other placeholder route (`carrello`, `ricerca`, the four `realizza` intake pages, `esplora/catalogo`) uses -- no fallback contact CTA, no link back to a live channel.
- **AD-014/AD-016 requirement:** AD-014 section 3.3 ("Supabase Auth with a lightweight passwordless-first flow, deny-by-default RLS...").
- **Owner category:** `test-coverage`/consistency (placeholder pattern) is closeable cheaply; real auth is `backend-architecture` then `future-app-implementation`.
- **Dependency:** none blocking this packet.
- **Severity:** Medium (consistency) / High (real auth, deferred).
- **Current status:** Minimal placeholder, not dishonest, but not aligned with the rest of the site's UX pattern.
- **Closure evidence needed:** (consistency) a future `apps/web` packet switches `AccountHome.tsx` to `FutureFeatureNotice`; (real auth) `WPR-M2` Supabase Auth Technical Review.
- **Downstream packet:** `WPR-M2` (auth) and a small future `apps/web` UI packet (consistency).

### GAP-ADMIN-01 -- Admin/content-management capability is currently zero-function by mandate
- **Source evidence:** `apps/web/src/routes/command/CommandBoundary.tsx` ("carries no function, no data access and no Jarvis integration").
- **AD-014/AD-016 requirement:** AD-014 section 2 ("admin-managed catalog/content/media/configuration needed for Andrea's final data insertion").
- **Owner category:** `future-app-implementation`, gated on `WPR-M2` data model existing first.
- **Dependency:** depends on `GAP-CATALOG-01` and the rest of the content-media gaps (nothing to administer yet).
- **Severity:** Medium -- intentional current state (`M001-B` mandate), not a defect, but a real gap against AD-014's eventual scope.
- **Current status:** Private, unlinked, featureless -- exactly as specified.
- **Closure evidence needed:** a future scoped admin packet, after `WPR-M2`/`WPR-M3` establish what there is to administer.
- **Downstream packet:** unscoped future work, after `WPR-M3`.

### GAP-OBS-01 -- Real observability/backup/alerting infrastructure does not exist
- **Source evidence:** `scripts/guards/production-readiness-guard.mjs` (this packet) proves the *mechanism*; no Vercel/Supabase project is linked yet (`BLK-BASE-001` open).
- **AD-014/AD-016 requirement:** AD-014 section 2 ("observability, backup, rollback, and release evidence required for a real public cutover").
- **Owner category:** `deployment-infra`.
- **Dependency:** blocked entirely on `BLK-BASE-001` closing (a real linked Vercel/Supabase project existing).
- **Severity:** High for go-live, not applicable pre-launch.
- **Current status:** Guard mechanism ships in this packet; real infra is out of scope until a project exists to observe.
- **Closure evidence needed:** `WPR-M4` end-to-end production-readiness evidence, after `BLK-BASE-001`.
- **Downstream packet:** `WPR-M4`.

### GAP-LEGAL-01 -- No in-app legal/policy routes exist
- **Source evidence:** grep of `apps/web/src/app/routes.tsx` and `Footer.tsx` finds zero `/privacy`, `/termini`, `/cookie`-equivalent routes; `siteContact.legalHref` points cross-app to `apps/legacy-web/legal`.
- **AD-014/AD-016 requirement:** AD-014 section 2 ("...legal routes...") and section 3.2 bullet 5 (privacy/cookies/terms/returns/delivery/consent copy).
- **Owner category:** `legal-privacy` (copy) then `future-app-implementation` (routes).
- **Dependency:** none blocking this packet.
- **Severity:** High for go-live (legally required copy), Medium pre-launch (the cross-app fallback is honest and live today).
- **Current status:** Fully served by `apps/legacy-web/legal` today (`capability-policy-legal-fallback`, not a defect); this app owns none of it yet.
- **Closure evidence needed:** `CLIENT_DATA_MANIFEST.json` `legal-commercial-copy` category `approved` for every required field, then a future `WPR-M3`/`WPR-M4` packet implementing the routes.
- **Downstream packet:** `WPR-M3`/`WPR-M4`, gated on Andrea supplying real legal copy.

## What this register does not authorize

Per packet section 1 and section 8.2, this register maps and prioritizes gaps -- it does not
authorize any of the downstream implementation, backend, client-data, legal, or deployment work
it names. Every `backend-architecture` and `future-app-implementation` gap stays Codex Root's
architectural call; every `client-data`/`legal-privacy` gap stays Andrea's; every
`deployment-infra` gap stays blocked by `BLK-BASE-001`. This packet's own allowed write set closes
only the `contract-readiness` gaps (the schema, manifest, binding contract, and guard themselves).

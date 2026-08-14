# WPR-M1 Route/Capability Inventory (Human-Readable)

> Rendering of `WPR-M1-ROUTE-CAPABILITY-INVENTORY.json` (same data, same entry IDs). Source
> base `d7777a84f5a397d3332544e5f2f0d73e2d48661d`. Generated for `CLAUDE-WPR-M1-CORRECTED`.
> Classification taxonomy, sources, and evidence citations match the JSON exactly -- this file
> exists for human review, not as an independent source of truth.

## Classification taxonomy

| Value | Meaning |
| --- | --- |
| `implemented_test_backed` | Real, complete functionality with dedicated test evidence. |
| `implemented_placeholder_honest_boundary` | Route exists, honestly states the feature isn't available yet, no fake interactive UI. |
| `coming_soon` | Intentional non-operational boundary (PrintFlow only). |
| `fallback_only` | Served by `apps/legacy-web`, not this app's router. |
| `private_admin_only` | Exists, unlinked from any public nav surface. |
| `forbidden_not_authorized` | Implementation explicitly forbidden regardless of demand (Jarvis). |
| `missing_blocking` | No route/capability exists; blocks later milestones. |

## Routes (from `apps/web/src/app/routes.tsx`)

| Path | Category | Classification | Content readiness | Blocking? |
| --- | --- | --- | --- | --- |
| `/` | content | `implemented_test_backed` | real-content | No |
| `/nolimits3d` | content | `implemented_test_backed` | real-content | No |
| `/nolimits3d/chi-siamo` | content | `implemented_test_backed` | real-content | No |
| `/nolimits3d/metodo` | content | `implemented_test_backed` | real-content | No |
| `/nolimits3d/qualita` | content | `implemented_test_backed` | real-content | No |
| `/nolimits3d/contatti` | business-identity | `implemented_test_backed` | real-content | **Yes -- GAP-BIZ-01** |
| `/servizi` | content | `implemented_test_backed` | real-content | No |
| `/servizi/stampa-3d` | content | `implemented_test_backed` | real-content | No |
| `/servizi/progettazione-3d` | content | `implemented_test_backed` | real-content | No |
| `/servizi/prototipazione` | content | `implemented_test_backed` | real-content | No |
| `/servizi/ricambi-personalizzati` | content | `implemented_test_backed` | real-content | No |
| `/servizi/piccole-serie` | content | `implemented_test_backed` | real-content | No |
| `/realizzazioni` | content | `implemented_test_backed` | real-content | **Yes -- GAP-MEDIA-01** |
| `/eventi` | content | `implemented_test_backed` | real-content | **Yes -- GAP-MEDIA-02** |
| `/esplora` | content | `implemented_test_backed` | real-content | No |
| `/esplora/catalogo` | public-catalog | `implemented_placeholder_honest_boundary` | honest-placeholder | **Yes -- WPR-M2 + GAP-CATALOG-01** |
| `/esplora/ispirati` | content | `implemented_test_backed` | real-content | No |
| `/esplora/arte-in-stampa-3d` | content | `implemented_test_backed` | real-content | No |
| `/esplora/hueforge` | content (redirect) | `implemented_test_backed` | n/a | No |
| `/realizza` | content | `implemented_test_backed` | real-content | No |
| `/realizza/richiedi-progetto` | request-intake | `implemented_placeholder_honest_boundary` | honest-placeholder | **Yes -- WPR-M2 + GAP-UPLOAD-01** |
| `/realizza/preventivo-stampa-3d` | request-intake | `implemented_placeholder_honest_boundary` | honest-placeholder | **Yes -- WPR-M2** |
| `/realizza/configuratore-lanterne` | configurator | `implemented_placeholder_honest_boundary` | honest-placeholder | **Yes -- WPR-M2 + GAP-CONFIG-01** |
| `/realizza/assistenza-stampanti-3d` | request-intake | `implemented_placeholder_honest_boundary` | honest-placeholder | **Yes -- WPR-M2** |
| `/blog` | content | `implemented_test_backed` | real-content | No (ongoing editorial) |
| `/printflow` | printflow | `coming_soon` | real-content | No (intentional) |
| `/carrello` | cart | `implemented_placeholder_honest_boundary` | honest-placeholder | **Yes -- GAP-TEST-01 + WPR-M2** |
| `/ricerca` | search | `implemented_placeholder_honest_boundary` | honest-placeholder | **Yes -- GAP-TEST-02** |
| `/account` | account-auth | `implemented_placeholder_honest_boundary` | **minimal**-placeholder | **Yes -- GAP-ACCOUNT-01 + WPR-M2** |
| `/command` | admin-content-management | `private_admin_only` | minimal-placeholder | **Yes -- GAP-ADMIN-01** |
| `*` (catch-all) | system | `implemented_test_backed` | real-content | No |

## Non-route capabilities (AD-014 section 2 required classes with no dedicated route)

| Capability | Classification | Blocking? | Why |
| --- | --- | --- | --- |
| Product detail | `missing_blocking` | **Yes -- GAP-CATALOG-02** | No route or pattern exists anywhere. PR #25 never named this as a distinct capability -- this is the corrected packet's "omitted capability" finding. |
| Uploads | `missing_blocking` | **Yes -- GAP-UPLOAD-01** | No upload mechanism, Storage binding, or controlled-upload policy exists. |
| Policy/legal (in-app) | `missing_blocking` | **Yes -- GAP-LEGAL-01** | Zero in-app legal route despite AD-014 section 2 listing it in scope. |
| Policy/legal (fallback) | `fallback_only` | No | `apps/legacy-web/legal` already serves this honestly today; not itself a gap. |
| Observability/readiness | `implemented_test_backed` (mechanism) | **Yes -- GAP-OBS-01** | This packet ships the guard mechanism; real infra is separate future work gated on `BLK-BASE-001`. |
| Admin/content management | `private_admin_only` | **Yes -- GAP-ADMIN-01** | `/command` is featureless by mandate; this *is* the current state of that capability, not a bug. |
| Legacy fallback | `fallback_only` | No | Real, live, already serving; the reason none of the above placeholders are dishonest. |
| Jarvis | `forbidden_not_authorized` | No | Intentional, non-negotiable boundary (`INV-JARVIS-001`); not a gap to close. |

## PR #25 findings this inventory resolves

1. **`/account` misclassification** -- now split into a precise `contentReadiness: minimal-placeholder`
   (distinct from the honest-placeholder pattern every other future-feature route uses), with the
   exact evidence (`AccountHome.tsx` is bespoke, not `FutureFeatureNotice`) cited directly.
2. **Legal-fallback conflation** -- now two separate entries: `capability-policy-legal-in-app`
   (`missing_blocking`, a real gap) and `capability-policy-legal-fallback` (`fallback_only`, not a
   gap -- the cross-app link to `apps/legacy-web/legal` is honest and already shipped).
3. **Placeholder-route granularity** -- `/carrello` and `/ricerca` are now flagged with their exact,
   real test-coverage gap (present in nav-link-resolution and E2E, absent from the same
   Vitest-level heading/breadcrumb/axe checks every other content page has), not just labeled
   generically "placeholder."
4. **Business-identity** -- `/nolimits3d/contatti` is real, shipped, tested content, but the
   underlying contact facts are reused from `apps/legacy-web` without an Andrea-approved,
   versioned client-data-manifest binding for this app -- recorded as its own gap (`GAP-BIZ-01`)
   rather than left implicit.
5. **Omitted capabilities** -- product detail, uploads, and observability/readiness are now
   explicit entries (`routeExists: false` where applicable) instead of being absent from the
   inventory entirely.

Full evidence citations (exact file paths, line numbers, test file names) are in the JSON
rendering of each entry above -- this table intentionally omits them for readability.

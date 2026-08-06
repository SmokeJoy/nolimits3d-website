# WPR-M1 Baseline Route/Capability Inventory

> Part of `CLAUDE-WPR-M1-BASELINE-INVENTORY-PACKET.md`. Source: `apps/web/src/app/routes.tsx`
> as of commit `bb94b16`, cross-referenced against `AD-014` §2's Binding Product Boundary and
> `DOC-UX-001` (Documentation Bible information architecture).

Status legend:

- **LIVE** -- real authored content, no `FutureFeatureNotice` placeholder.
- **PLACEHOLDER** -- renders `FutureFeatureNotice`; honest "not yet available" state, not fake.
- **COMING-SOON** -- intentional product boundary (`PrintFlow`), not a gap.
- **PRIVATE** -- no navigation surface links to it; reachable only by direct URL.
- **REDIRECT** -- resolves to another canonical route, not independent content.
- **SYSTEM** -- catch-all/error handling, not a content page.

| Path | Component | Status | Needs real client data before launch? |
| --- | --- | --- | --- |
| `/` | `PublicHome` | LIVE | Partial -- homepage sections (`AuthenticProofSection`, `TrustSection`, `EventsSection`) reference testimonials/events that need real approved content |
| `/nolimits3d` | `Nolimits3DPage` | LIVE | No |
| `/nolimits3d/chi-siamo` | `ChiSiamoPage` | LIVE | No |
| `/nolimits3d/metodo` | `MetodoPage` | LIVE | No |
| `/nolimits3d/qualita` | `QualitaPage` | LIVE | No |
| `/nolimits3d/contatti` | `ContattiPage` | LIVE | **Yes** -- business identity/contacts/hours/service area (`AD-014` §3.2) |
| `/servizi` | `ServiziPage` | LIVE | No |
| `/servizi/stampa-3d` | `Stampa3DPage` | LIVE | No |
| `/servizi/progettazione-3d` | `Progettazione3DPage` | LIVE | No |
| `/servizi/prototipazione` | `PrototipazionePage` | LIVE | No |
| `/servizi/ricambi-personalizzati` | `RicambiPersonalizzatiPage` | LIVE | No |
| `/servizi/piccole-serie` | `PiccoleSeriePage` | LIVE | No |
| `/realizzazioni` | `RealizzazioniPage` | LIVE | **Yes** -- portfolio media/rights/provenance |
| `/eventi` | `EventiPage` | LIVE | **Yes** -- real event data |
| `/esplora` | `EsploraPage` | LIVE | No |
| `/esplora/catalogo` | `CatalogoPage` | **PLACEHOLDER** (`Il catalogo prodotti`) | **Yes** -- products/variants/prices/media (blocked on `WPR-M2` typed contracts, not just data) |
| `/esplora/ispirati` | `IspiratiPage` | LIVE | No |
| `/esplora/arte-in-stampa-3d` | `ArteInStampa3DPage` | LIVE | No |
| `/esplora/hueforge` | (redirect) | REDIRECT | N/A -- canonical target is `/esplora/arte-in-stampa-3d` |
| `/realizza` | `RealizzaPage` | LIVE | No |
| `/realizza/richiedi-progetto` | `RichiediProgettoPage` | **PLACEHOLDER** (`La richiesta di un nuovo progetto online`) | **Yes**, plus `WPR-M2` server-validated intake (blocked on backend, not just data) |
| `/realizza/preventivo-stampa-3d` | `PreventivoStampa3DPage` | **PLACEHOLDER** (`Il calcolo del preventivo`) | **Yes**, plus pricing/material data + human-review workflow |
| `/realizza/configuratore-lanterne` | `ConfiguratoreLanternePage` | **PLACEHOLDER** (`Il configuratore lanterne`) | **Yes** -- data-driven configurator options/models/materials (`AD-014` §3.5) |
| `/realizza/assistenza-stampanti-3d` | `AssistenzaStampantiPage` | **PLACEHOLDER** (`La richiesta di assistenza online`) | **Yes**, plus server-validated intake |
| `/blog` | `BlogPage` | LIVE | Ongoing -- editorial content, not launch-blocking by itself |
| `/printflow` | `PrintFlowPage` | **COMING-SOON** | No -- intentional, binding product boundary |
| `/carrello` | `CarrelloPage` | **PLACEHOLDER** (`Il carrello`) | **Yes**, plus `WPR-M2` server-validated cart/checkout |
| `/ricerca` | `RicercaPage` | **PLACEHOLDER** (`La ricerca`) | Depends on catalog data existing first |
| `/account` | `AccountHome` | **PRIVATE placeholder** | No real auth yet (`AD-014` §3.3 -- Supabase Auth is `WPR-M2` scope) |
| `/command` | `CommandBoundary` | **PRIVATE placeholder** | No -- unlinked by mandate, no Jarvis integration (`ADR-0020`) |
| `*` | `NotFound` | SYSTEM | No |

## Gap found during this inventory, not previously tracked anywhere found

**No legal routes exist.** `AD-014` §2 explicitly lists "legal routes" as in-scope for the
program ("information architecture, navigation, homepage, content, services, portfolio,
inspiration, events, contact, **legal routes**, search, catalog, product detail, cart, and
controlled checkout"), and §3.2 requires "payment, delivery, returns, warranty, privacy,
cookies, terms, retention, and consent copy" in the client-data manifest. Neither
`apps/web/src/app/routes.tsx` nor `Footer.tsx` has any `/privacy`, `/termini`, `/cookie`, or
equivalent route or link. This is a real gap, not a placeholder -- there is currently nowhere
for this content to go even once Andrea supplies it. Recorded in the gap register.

## Cross-check against `DOC-UX-001`

Every route above corresponds to a real Bible-referenced page (no orphan/undocumented route
found), and `esplora/hueforge`'s redirect matches the Bible's own "same entity, one canonical
route" distinction already documented in `routes.tsx`'s inline comment. No routes exist that
the Bible doesn't call for, and no Bible-required page is missing a route **except** the legal
routes gap above.

import { FutureFeatureNotice } from './FutureFeatureNotice';

/**
 * `/ricerca` -- fixes the same class of dead link as `ServiziPage`/
 * `Nolimits3DPage`/`CarrelloPage`: `GlobalNav`'s "always accessible" links
 * (`navigation.ts`'s `alwaysAccessibleLinks`, from `DOC-UX-001`'s own
 * "Sempre accessibili" list) have included Ricerca since Sprint 1, with no
 * route ever registered -- confirmed 404, found by
 * `nav-links-resolve.test.tsx`. A real search needs a real catalog/content
 * index behind it, which doesn't exist yet -- same `FutureFeatureNotice`
 * treatment as Catalogo, not a fake search box with nothing to search.
 */
export function RicercaPage() {
  return <FutureFeatureNotice featureLabel="La ricerca" />;
}

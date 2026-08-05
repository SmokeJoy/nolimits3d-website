/**
 * Navigation data for the public site shell (M-003 Sprint 1, TSK-M003-WEB-D1).
 *
 * Source of truth: `NoLimits3D_Documentation_v0.96/04_Experience/01_Information_Architecture.md`
 * (`DOC-UX-001`). Labels for the six primary sections are copied verbatim from
 * the document's "Navigazione primaria candidata" list; hrefs come from its
 * "Sitemap pubblica" block. The "always accessible" items reuse the exact
 * item list from the same document ("Sempre accessibili: ...").
 *
 * Sub-page labels (footer sitemap) have no verbatim UI label in the source
 * document -- it only lists URL slugs (e.g. `richiedi-progetto`). Those
 * labels are mechanical, literal readbacks of the approved slugs (spacing +
 * capitalization only), not invented marketing wording.
 */

export interface NavLink {
  readonly label: string;
  readonly to: string;
}

/** The six primary IA sections, in the order given by DOC-UX-001. */
export const primaryNavSections: readonly NavLink[] = [
  { label: 'Realizza', to: '/realizza' },
  { label: 'Esplora', to: '/esplora' },
  { label: 'Servizi', to: '/servizi' },
  { label: 'Realizzazioni', to: '/realizzazioni' },
  { label: 'Eventi', to: '/eventi' },
  { label: 'NoLimits3D', to: '/nolimits3d' },
];

/**
 * DOC-UX-001: "Sempre accessibili: Catalogo, configuratore lanterne,
 * richiesta/preventivo, account, carrello, ricerca e contatti."
 *
 * "richiesta/preventivo" is kept as a single combined item, per the source
 * document's own slash notation, pointed at `/realizza/richiedi-progetto`
 * (the sitemap's entry point for that intent; `/realizza/preventivo-stampa-3d`
 * is reachable from there once that page ships).
 */
export const alwaysAccessibleLinks: readonly NavLink[] = [
  { label: 'Catalogo', to: '/esplora/catalogo' },
  { label: 'Configuratore lanterne', to: '/realizza/configuratore-lanterne' },
  { label: 'Richiesta/preventivo', to: '/realizza/richiedi-progetto' },
  { label: 'Account', to: '/account' },
  { label: 'Carrello', to: '/carrello' },
  { label: 'Ricerca', to: '/ricerca' },
  { label: 'Contatti', to: '/nolimits3d/contatti' },
];

export interface FooterSection {
  readonly heading: string;
  readonly to: string;
  readonly links: readonly NavLink[];
}

/**
 * Full public sitemap (`DOC-UX-001`, "Sitemap pubblica"), grouped by the same
 * six primary sections used in the header. `Realizzazioni` and `Eventi` are
 * leaf routes in the source sitemap (no children), so they carry no sub-links.
 */
export const footerSitemapSections: readonly FooterSection[] = [
  {
    heading: 'Realizza',
    to: '/realizza',
    links: [
      { label: 'Richiedi progetto', to: '/realizza/richiedi-progetto' },
      { label: 'Preventivo stampa 3D', to: '/realizza/preventivo-stampa-3d' },
      { label: 'Configuratore lanterne', to: '/realizza/configuratore-lanterne' },
      { label: 'Assistenza stampanti 3D', to: '/realizza/assistenza-stampanti-3d' },
    ],
  },
  {
    heading: 'Esplora',
    to: '/esplora',
    links: [
      { label: 'Catalogo', to: '/esplora/catalogo' },
      { label: 'Ispirati', to: '/esplora/ispirati' },
      { label: 'Arte in stampa 3D', to: '/esplora/arte-in-stampa-3d' },
      { label: 'HueForge', to: '/esplora/hueforge' },
    ],
  },
  {
    heading: 'Servizi',
    to: '/servizi',
    links: [
      { label: 'Stampa 3D', to: '/servizi/stampa-3d' },
      { label: 'Progettazione 3D', to: '/servizi/progettazione-3d' },
      { label: 'Prototipazione', to: '/servizi/prototipazione' },
      { label: 'Ricambi personalizzati', to: '/servizi/ricambi-personalizzati' },
      { label: 'Piccole serie', to: '/servizi/piccole-serie' },
    ],
  },
  {
    heading: 'Realizzazioni',
    to: '/realizzazioni',
    links: [],
  },
  {
    heading: 'Eventi',
    to: '/eventi',
    links: [],
  },
  {
    heading: 'NoLimits3D',
    to: '/nolimits3d',
    links: [
      { label: 'Chi siamo', to: '/nolimits3d/chi-siamo' },
      { label: 'Metodo', to: '/nolimits3d/metodo' },
      { label: 'Qualità', to: '/nolimits3d/qualita' },
      { label: 'Contatti', to: '/nolimits3d/contatti' },
    ],
  },
];

/**
 * Sitemap entries that sit outside the six primary sections
 * (`DOC-UX-001` top-level: `/blog`, `/account`, `/carrello`, `/printflow`).
 * PrintFlow carries an explicit "Coming Soon" marker in the component that
 * renders this list -- per the product boundary, it is never linked as an
 * active destination.
 */
export const footerOtherLinks: readonly NavLink[] = [
  { label: 'Blog', to: '/blog' },
  { label: 'Account', to: '/account' },
  { label: 'Carrello', to: '/carrello' },
];

/**
 * Real, already-live contact details reused from `apps/legacy-web`'s footer
 * (`apps/legacy-web/src/components/Footer.tsx`), per the M-003 charter:
 * already-live legal/contact links are real and reusable, unlike the
 * marketing copy around them. No pricing or threshold claims are reused --
 * the charter documents an unresolved 20 EUR vs 50 EUR discrepancy in that
 * copy, so none of it ships here.
 */
export const siteContact = {
  email: 'nolimits.3d.print@gmail.com',
  phone: '+39 377 091 8590',
  phoneHref: 'tel:+393770918590',
  addressLines: ['Via Dante Alighieri', '03100 Frosinone, FR'],
  /**
   * Legacy's real legal page. Not part of `DOC-UX-001`'s sitemap and not
   * managed by this app's router (`apps/web/src/app/routes.tsx`), so this is
   * a plain cross-app link rather than a router `Link`.
   */
  legalHref: '/legal',
} as const;

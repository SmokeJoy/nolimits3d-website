import { SectionLandingPage } from '../SectionLandingPage';

/**
 * `/esplora` -- section landing (task packet item 1). The four definitions
 * below are `DOC-UX-001`'s own "Distinzioni tassonomiche" section,
 * verbatim -- real text, not placeholder, per the task packet's explicit
 * instruction to reuse it rather than invent new copy for the same
 * distinction. The homepage's `DiscoverySection`
 * (`apps/web/src/routes/public/home/DiscoverySection.tsx`) already covers
 * three of these four (Realizzazioni, Ispirati, Catalogo); this page adds
 * the fourth ("Arte in stampa 3D") that `DiscoverySection` omits because
 * that has its own dedicated `ArtSection` on the homepage.
 */
const taxonomy = [
  { term: 'Catalogo', definition: 'Offerte acquistabili o configurabili.' },
  { term: 'Realizzazioni', definition: 'Evidenza autentica delle capacità e dei risultati.' },
  { term: 'Ispirati', definition: 'Discovery trasversale di offerte, casi, arte e contenuti.' },
  { term: 'Arte in stampa 3D', definition: 'Landing editoriale HueForge.' },
];

export function EsploraPage() {
  return (
    <SectionLandingPage sectionHeading="Esplora">
      <dl className="taxonomy-list">
        {taxonomy.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
    </SectionLandingPage>
  );
}

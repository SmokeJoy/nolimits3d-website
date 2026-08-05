import { Badge } from '@atlas/ui';

/**
 * Section 6 -- "Servizi e progetti professionali".
 *
 * Audience segments and service categories are copied directly from the
 * wireframe's own text for this section ("Maker, artigiani, aziende,
 * professionisti, scuole e comuni: progettazione, prototipazione, ricambi,
 * piccole serie e assistenza"), consistent with the equivalent list already
 * in `DOC-UX-001`'s "Servizi" bullet -- structural taxonomy, not invented
 * marketing copy.
 */
const audiences = ['Maker', 'Artigiani', 'Aziende', 'Professionisti', 'Scuole', 'Comuni'];
const serviceCategories = [
  'Progettazione',
  'Prototipazione',
  'Ricambi',
  'Piccole serie',
  'Assistenza',
];

export function ProfessionalServicesSection() {
  return (
    <section
      aria-labelledby="home-services-heading"
      className="home-section"
      data-testid="home-section-services"
    >
      <h2 id="home-services-heading" className="home-section__heading">
        Servizi e progetti professionali
      </h2>

      <span className="chip-row-label">Per chi:</span>
      <div className="chip-row">
        {audiences.map((audience) => (
          <Badge key={audience} variant="secondary">
            {audience}
          </Badge>
        ))}
      </div>

      <span className="chip-row-label">Cosa facciamo:</span>
      <div className="chip-row">
        {serviceCategories.map((category) => (
          <Badge key={category} variant="outline">
            {category}
          </Badge>
        ))}
      </div>
    </section>
  );
}

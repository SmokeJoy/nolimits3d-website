/**
 * Section 3 -- "Come nasce il tuo progetto" (`HOME-F-004`).
 *
 * Stage names are copied verbatim from the wireframe's own arrow chain
 * ("idea -> analisi -> progettazione -> realizzazione -> controllo ->
 * consegna"); an `<ol>` conveys the sequence natively for assistive tech
 * (mobile spec: "timeline come lista ordinata"), independent of the
 * decorative CSS step numbers.
 */
const timelineStages = [
  'Idea',
  'Analisi',
  'Progettazione',
  'Realizzazione',
  'Controllo',
  'Consegna',
];

export function ProjectTimelineSection() {
  return (
    <section
      aria-labelledby="home-timeline-heading"
      className="home-section"
      data-testid="home-section-timeline"
    >
      <h2 id="home-timeline-heading" className="home-section__heading">
        Come nasce il tuo progetto
      </h2>
      <ol className="timeline-list">
        {timelineStages.map((stage) => (
          <li key={stage}>{stage}</li>
        ))}
      </ol>
      <p className="home-section__lede">Con varianti commerciali e assistenza.</p>
    </section>
  );
}

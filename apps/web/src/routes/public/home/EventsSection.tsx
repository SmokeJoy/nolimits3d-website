import { StatusIndicator } from '@atlas/ui';

/**
 * Section 8 -- "Eventi e fiere" (`HOME-F-008`).
 *
 * The private-lab notice is a real operational disclosure (already stated as
 * a hard requirement by the wireframe itself: "natura privata del
 * laboratorio"), so it ships as real copy via `StatusIndicator`. Event
 * date/location/availability are placeholders (binding policy: "event
 * dates/locations").
 */
export function EventsSection() {
  return (
    <section
      aria-labelledby="home-events-heading"
      className="home-section"
      data-testid="home-section-events"
    >
      <h2 id="home-events-heading" className="home-section__heading">
        Eventi e fiere
      </h2>
      <StatusIndicator
        status="info"
        label="Laboratorio operativo privato, non aperto al pubblico."
      />
      <p className="placeholder-note">
        [PLACEHOLDER: prossimo evento — luogo, data e disponibilità da confermare con Andrea.]
      </p>
    </section>
  );
}

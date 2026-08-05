import { StatusIndicator } from '@atlas/ui';

import { PageLayout } from './PageLayout';

/**
 * `/eventi` -- "Posso incontrare NoLimits3D dal vivo?" (`DOC-UX-001`). The
 * private-lab notice is real spec text -- already shipped identically on
 * the homepage's `EventsSection`
 * (`apps/web/src/routes/public/home/EventsSection.tsx`) -- not a
 * placeholder: the wireframe states the lab's private nature as a hard
 * requirement ("natura privata del laboratorio"). The event calendar
 * itself is placeholder: no real event data exists yet (task packet
 * item 7).
 */
export function EventiPage() {
  return (
    <PageLayout>
      <p className="home-section__question">Posso incontrare NoLimits3D dal vivo?</p>
      <StatusIndicator
        status="info"
        label="Laboratorio operativo privato, non aperto al pubblico."
      />
      <p className="placeholder-note">
        [PLACEHOLDER: calendario eventi e fiere — luogo, data e disponibilità da confermare con
        Andrea.]
      </p>
    </PageLayout>
  );
}

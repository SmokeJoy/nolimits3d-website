import { PageLayout } from './PageLayout';

/**
 * `/nolimits3d/metodo` -- process/method page (task packet item 2). Stage
 * names are the same verbatim sequence as the homepage's
 * `ProjectTimelineSection`
 * (`apps/web/src/routes/public/home/ProjectTimelineSection.tsx`), itself
 * verbatim from the wireframe's own arrow chain ("idea -> analisi ->
 * progettazione -> realizzazione -> controllo -> consegna"). The wireframe
 * does not specify per-step copy, so each step's explanation ships as an
 * explicit placeholder.
 */
const methodStages = ['Idea', 'Analisi', 'Progettazione', 'Realizzazione', 'Controllo', 'Consegna'];

export function MetodoPage() {
  return (
    <PageLayout>
      <p className="home-section__lede">Come nasce il tuo progetto, passo per passo.</p>
      <ol className="timeline-list">
        {methodStages.map((stage) => (
          <li key={stage}>
            <div>
              <strong>{stage}</strong>
              <p className="placeholder-note">
                [PLACEHOLDER: spiegazione della fase &quot;{stage}&quot; — da confermare con
                Andrea.]
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="home-section__lede">Con varianti commerciali e assistenza.</p>
    </PageLayout>
  );
}

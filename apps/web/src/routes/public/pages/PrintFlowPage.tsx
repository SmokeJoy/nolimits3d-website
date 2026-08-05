import { Badge } from '@atlas/ui';

import { PageLayout } from './PageLayout';

/**
 * `/printflow` -- binding product constraint (task packet item 12, "not a
 * judgment call"): Coming Soon only, literally, per every governance
 * document this session has touched (`AD-008` through `AD-010`, the
 * M-003 charter, `CLAUDE.md`, `AGENTS.md`). No feature description beyond
 * that it exists and is not active -- this component intentionally carries
 * less copy than every other page in this sprint, mirroring the
 * homepage's `ComingSoonSection`
 * (`apps/web/src/routes/public/home/ComingSoonSection.tsx`).
 *
 * This route is deliberately absent from `navigation.ts`'s linked lists
 * (`footerOtherLinks`'s own comment: "never linked as an active
 * destination"), even though `DOC-UX-001`'s sitemap lists it as a real,
 * directly-reachable URL -- see `pageMeta.ts` for the one hardcoded
 * breadcrumb entry that exists solely for this page.
 */
export function PrintFlowPage() {
  return (
    <PageLayout>
      <Badge variant="secondary">Coming Soon</Badge>
      <p className="home-section__lede">PrintFlow è Coming Soon: nessuna funzione attiva.</p>
    </PageLayout>
  );
}

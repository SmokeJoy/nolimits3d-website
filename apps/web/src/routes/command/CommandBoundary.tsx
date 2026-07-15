/**
 * Command Center boundary placeholder.
 *
 * Private, unlinked and featureless by mandate (Sprint Plan M001-B):
 * - reachable only by direct URL, never from navigation, sitemap or links;
 * - loaded lazily so it stays out of the initial public bundle;
 * - carries no function, no data access and no Jarvis integration (ADR-0020).
 */
export function CommandBoundary() {
  return (
    <section data-testid="route-boundary-command">
      <h1>Command Center</h1>
      <p>Area riservata.</p>
    </section>
  );
}

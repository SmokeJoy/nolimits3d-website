import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

interface SegmentErrorBoundaryProps {
  segment: 'root' | 'public' | 'account' | 'command';
}

/**
 * Per-segment routing error boundary (one per route boundary, FE-NF-003).
 * Renders a neutral failure message without leaking segment internals.
 */
export function SegmentErrorBoundary({ segment }: SegmentErrorBoundaryProps) {
  const error = useRouteError();
  const detail = isRouteErrorResponse(error) ? `${String(error.status)} ${error.statusText}` : null;

  return (
    <section role="alert" data-testid={`segment-error-${segment}`}>
      <h1>Si è verificato un errore</h1>
      {detail === null ? null : <p>{detail}</p>}
    </section>
  );
}

import clsx, { type ClassValue } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export type StatusIndicatorStatus = 'success' | 'warning' | 'error' | 'info';

/* Static map: Tailwind only generates classes written literally in source. */
const statusDotClasses: Record<StatusIndicatorStatus, string> = {
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  error: 'bg-status-error',
  info: 'bg-status-info',
};

export interface StatusIndicatorProps extends ComponentPropsWithoutRef<'div'> {
  status: StatusIndicatorStatus;
  /** Visible textual label: state is never conveyed by color alone. */
  label: string;
}

/**
 * System-state primitive: colored dot plus a mandatory textual label.
 *
 * Announced politely to assistive technology (`role="status"`,
 * `aria-live="polite"`); the dot pulse stops under reduced motion.
 */
export function StatusIndicator({ status, label, className, ...props }: StatusIndicatorProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    >
      <span
        aria-hidden="true"
        data-testid="status-dot"
        className={cn(
          'size-2.5 shrink-0 rounded-full animate-pulse motion-reduce:animate-none',
          statusDotClasses[status],
        )}
      />
      <span className="text-small text-text-primary">{label}</span>
    </div>
  );
}

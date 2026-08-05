import clsx, { type ClassValue } from 'clsx';
import { Toaster as SonnerToaster, toast, type ToasterProps as SonnerToasterProps } from 'sonner';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

type SonnerToastOptions = NonNullable<SonnerToasterProps['toastOptions']>;

type ToasterCloseButtonProps =
  | {
      closeButton?: true | undefined;
      /** Caller-supplied accessible label for the default close button. */
      closeButtonAriaLabel: string;
    }
  | {
      closeButton: false;
      closeButtonAriaLabel?: string;
    };

export type ToasterProps = Omit<SonnerToasterProps, 'closeButton' | 'toastOptions'> &
  ToasterCloseButtonProps & {
    toastOptions?: Omit<SonnerToastOptions, 'closeButtonAriaLabel'>;
  };

/**
 * Token-styled wrapper around `sonner`'s `<Toaster />`.
 *
 * Carries no copy of its own: all visible text (titles, descriptions, action
 * and cancel labels, `closeButtonAriaLabel`, `containerAriaLabel`) comes from
 * the caller via `toast()` calls or explicit props — this component only
 * supplies visual styling on top of sonner's own accessible behaviour
 * (`aria-live` regions, swipe/close dismissal, hover-to-pause auto-dismiss).
 * Entry/exit animations degrade to instant under `prefers-reduced-motion`
 * via the global reduced-motion rule in `packages/ui/styles/global.css`,
 * which forces `animation-duration`/`transition-duration` to `0s` on every
 * element, sonner's toasts included.
 */
export function Toaster({
  className,
  toastOptions,
  theme = 'system',
  closeButton = true,
  closeButtonAriaLabel,
  ...props
}: ToasterProps) {
  return (
    <SonnerToaster
      theme={theme}
      closeButton={closeButton}
      className={cn('atlas-toaster', className)}
      toastOptions={{
        ...toastOptions,
        ...(closeButton ? { closeButtonAriaLabel } : {}),
        classNames: {
          toast: cn(
            'group rounded-md border border-border-default bg-toast-bg text-toast-text shadow-lg font-sans text-body',
            toastOptions?.classNames?.toast,
          ),
          title: cn('font-semibold', toastOptions?.classNames?.title),
          description: cn('text-small text-text-secondary', toastOptions?.classNames?.description),
          actionButton: cn(
            'rounded-md bg-accent-primary px-3 py-1.5 text-small font-semibold text-accent-primary-foreground',
            toastOptions?.classNames?.actionButton,
          ),
          cancelButton: cn(
            'rounded-md bg-bg-surface-hover px-3 py-1.5 text-small font-semibold text-text-primary',
            toastOptions?.classNames?.cancelButton,
          ),
          closeButton: cn(
            'border-border-default bg-bg-surface text-text-secondary',
            toastOptions?.classNames?.closeButton,
          ),
          success: cn('!border-status-success', toastOptions?.classNames?.success),
          error: cn('!border-status-error', toastOptions?.classNames?.error),
          warning: cn('!border-status-warning', toastOptions?.classNames?.warning),
          info: cn('!border-status-info', toastOptions?.classNames?.info),
        },
      }}
      {...props}
    />
  );
}

export { toast };

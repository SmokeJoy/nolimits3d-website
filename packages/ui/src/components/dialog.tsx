import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import clsx, { type ClassValue } from 'clsx';
import { X } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export type DialogProps = ComponentPropsWithoutRef<typeof BaseDialog.Root>;

/**
 * Groups the dialog trigger, portal and popup; owns the open/closed state.
 *
 * Base UI's default modal contract already guarantees the absolute closures
 * required by the packet: `Escape`, backdrop click (outside press) and focus
 * trapping/return are all enabled by default (`modal`, `disablePointerDismissal`
 * default to the safe values) and are pinned by `dialog.test.tsx`.
 */
export function Dialog(props: DialogProps) {
  return <BaseDialog.Root {...props} />;
}

export type DialogTriggerProps = ComponentPropsWithoutRef<typeof BaseDialog.Trigger>;

export function DialogTrigger({ className, ...props }: DialogTriggerProps) {
  return <BaseDialog.Trigger className={cn(className)} {...props} />;
}

export interface DialogContentProps extends Omit<
  ComponentPropsWithoutRef<typeof BaseDialog.Popup>,
  'title'
> {
  /** Accessible heading, rendered as `Dialog.Title`. Caller-supplied, no default copy. */
  title: string;
  /** Optional supporting text, rendered as `Dialog.Description`. */
  description?: string;
  /** Accessible name of the explicit close (X) button. Caller-supplied, no default copy. */
  closeLabel: string;
}

/**
 * Composes `Dialog.Portal` > `Dialog.Backdrop` + `Dialog.Popup` (with
 * `Dialog.Title`, optional `Dialog.Description` and an explicit
 * `Dialog.Close`) per the Base UI anatomy required by the Inventory.
 *
 * Reduced motion: entry/exit transitions are declared here for the high-
 * fidelity case, but the global reduced-motion rule in
 * `packages/ui/styles/global.css` forces `transition-duration: 0s` on every
 * element under `prefers-reduced-motion: reduce`, so they collapse to
 * instant automatically.
 */
export function DialogContent({
  className,
  title,
  description,
  closeLabel,
  children,
  ...props
}: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        className={cn(
          'fixed inset-0 z-(--z-index-modal) bg-palette-dark/70',
          'transition-opacity duration-(--duration-base) ease-standard motion-reduce:transition-none',
          'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        )}
      />
      <div className="fixed inset-0 z-(--z-index-modal) flex items-center justify-center p-4">
        <BaseDialog.Popup
          className={cn(
            'relative w-full max-w-md rounded-lg border border-border-default bg-dialog-bg p-6 text-text-primary shadow-lg',
            'transition-[opacity,transform] duration-(--duration-base) ease-standard motion-reduce:transition-none',
            'data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
            className,
          )}
          {...props}
        >
          <BaseDialog.Close
            aria-label={closeLabel}
            className={cn(
              'absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-md',
              'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary',
              'transition-colors duration-(--duration-fast) ease-standard motion-reduce:transition-none',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
            )}
          >
            <X aria-hidden="true" className="size-4" />
          </BaseDialog.Close>
          <BaseDialog.Title className="pr-8 text-h4 font-semibold">{title}</BaseDialog.Title>
          {description ? (
            <BaseDialog.Description className="mt-1.5 text-small text-text-secondary">
              {description}
            </BaseDialog.Description>
          ) : null}
          <div className="mt-4">{children}</div>
        </BaseDialog.Popup>
      </div>
    </BaseDialog.Portal>
  );
}

/** Re-exported for callers that need an extra dismiss control inside the body
 *  (e.g. a "Cancel" button) beyond the explicit close button `DialogContent`
 *  already renders. Label/children are always caller-supplied. */
export const DialogClose = BaseDialog.Close;

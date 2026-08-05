import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

const inputVariants = cva(
  [
    /* min-h-11 (44px) satisfies the mobile touch target; text-body is 1rem
       (16px), which keeps iOS Safari from force-zooming on focus. */
    'flex min-h-11 w-full rounded-md border bg-bg-surface px-3 text-body text-text-primary',
    'placeholder:text-text-secondary',
    'transition-colors duration-(--duration-fast) ease-standard motion-reduce:transition-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      error: {
        true: 'border-status-error focus-visible:outline-status-error',
        false: 'border-border-default hover:border-border-hover',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

export interface InputProps
  extends ComponentPropsWithoutRef<'input'>, VariantProps<typeof inputVariants> {
  /** Optional icon rendered inside the field, before the text (decorative). */
  leadingIcon?: ReactNode;
  /** Optional icon rendered inside the field, after the text (decorative). */
  trailingIcon?: ReactNode;
}

/**
 * Core text-entry primitive built on the native `<input>`.
 *
 * - `error` drives both the visual error border and `aria-invalid`.
 * - Icon slots are purely decorative (`aria-hidden`); the field itself
 *   carries all semantics and remains a single native form control.
 */
export function Input({
  className,
  error,
  leadingIcon,
  trailingIcon,
  disabled,
  ...props
}: InputProps) {
  const field = (
    <input
      className={cn(
        inputVariants({ error }),
        leadingIcon && 'pl-9',
        trailingIcon && 'pr-9',
        className,
      )}
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      {...props}
    />
  );

  if (!leadingIcon && !trailingIcon) {
    return field;
  }

  return (
    <span className="relative flex w-full items-center">
      {leadingIcon ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 flex items-center text-text-secondary"
        >
          {leadingIcon}
        </span>
      ) : null}
      {field}
      {trailingIcon ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 flex items-center text-text-secondary"
        >
          {trailingIcon}
        </span>
      ) : null}
    </span>
  );
}

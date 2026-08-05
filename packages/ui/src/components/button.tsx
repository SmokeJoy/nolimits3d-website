import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import { LoaderCircle } from 'lucide-react';
import type { ReactNode } from 'react';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

const buttonVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2 rounded-md font-semibold select-none',
    'cursor-pointer transition-colors duration-(--duration-fast) ease-standard',
    'motion-reduce:transition-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-button-bg-primary text-button-text-primary hover:bg-accent-primary-hover',
        secondary: [
          'bg-button-bg-secondary text-button-text-secondary',
          'border border-button-border-secondary hover:bg-bg-surface-hover',
        ],
        destructive: [
          'bg-button-bg-destructive text-button-text-destructive',
          'hover:bg-button-bg-destructive-hover',
        ],
        outline: [
          'border border-border-default bg-transparent text-text-primary',
          'hover:border-border-hover hover:bg-bg-surface-hover',
        ],
        ghost: 'bg-transparent text-text-primary hover:bg-bg-surface-hover',
      },
      /* Touch target >= 44px on mobile (min-h-11), compact heights from md up. */
      size: {
        sm: 'min-h-11 px-3 text-small md:min-h-9',
        md: 'min-h-11 px-4 text-body md:min-h-10',
        lg: 'min-h-12 px-6 text-body',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends Omit<BaseButton.Props, 'className'>, VariantProps<typeof buttonVariants> {
  className?: string;
  /**
   * Async state: disables interaction, keeps focus and width, shows a spinner.
   * The spinner rotation stops under reduced motion (static indicator remains).
   */
  isLoading?: boolean;
  /** Optional leading icon rendered before the label. */
  icon?: ReactNode;
  /** Analytics identifier emitted as `data-track-id`. */
  trackId?: string;
}

/**
 * Core action primitive built on Base UI's accessible button.
 *
 * - Variants and sizes map exclusively to Atlas semantic tokens.
 * - `isLoading` communicates the async state immediately (`aria-busy`),
 *   preserves the button width and keeps focus (`focusableWhenDisabled`).
 * - Focus is always visible via the `focus-ring` token; motion respects
 *   `prefers-reduced-motion`.
 */
export function Button({
  className,
  variant,
  size,
  isLoading = false,
  icon,
  trackId,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled === true || isLoading}
      focusableWhenDisabled={isLoading}
      aria-busy={isLoading || undefined}
      data-track-id={trackId}
      {...props}
    >
      {isLoading ? (
        <span
          data-testid="button-spinner"
          className="absolute inset-0 flex items-center justify-center"
        >
          <LoaderCircle
            aria-hidden="true"
            className="size-4 animate-spin motion-reduce:animate-none"
          />
        </span>
      ) : null}
      {/* opacity-0 (not visibility/aria-hidden): the label keeps the button
          width AND stays readable by screen readers while loading. */}
      <span className={cn('inline-flex items-center gap-2', isLoading && 'opacity-0')}>
        {icon}
        {children}
      </span>
    </BaseButton>
  );
}

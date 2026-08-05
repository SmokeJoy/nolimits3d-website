import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-small font-semibold',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-accent-primary text-accent-primary-foreground',
        secondary: 'border-border-default bg-bg-surface text-text-primary',
        destructive: 'border-transparent bg-status-error text-palette-white',
        outline: 'border-border-default bg-transparent text-text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends ComponentPropsWithoutRef<'span'>, VariantProps<typeof badgeVariants> {}

/**
 * Static, non-interactive label primitive.
 *
 * All variants pair background and foreground tokens that satisfy WCAG AA
 * contrast in both themes; the badge itself carries no interactive semantics.
 */
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

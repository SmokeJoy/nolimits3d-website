import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

const skeletonVariants = cva(
  /* Under reduced motion the pulse stops and a static opacity remains. */
  'animate-pulse bg-skeleton-bg motion-reduce:animate-none motion-reduce:opacity-70',
  {
    variants: {
      variant: {
        text: 'h-4 w-full rounded',
        rectangular: 'rounded-md',
        circular: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'rectangular',
    },
  },
);

export interface SkeletonProps
  extends ComponentPropsWithoutRef<'div'>, VariantProps<typeof skeletonVariants> {}

/**
 * Loading placeholder primitive.
 *
 * Purely decorative: hidden from assistive technology (`aria-hidden`,
 * `role="presentation"`). Dimensions are controlled via `className`.
 */
export function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

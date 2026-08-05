import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

const cardVariants = cva('rounded-lg text-text-primary', {
  variants: {
    variant: {
      standard: 'border border-border-default bg-bg-surface',
      outline: 'border border-border-default bg-transparent',
      elevated: 'border border-border-default bg-bg-surface shadow-md',
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
});

export interface CardProps
  extends ComponentPropsWithoutRef<'div'>, VariantProps<typeof cardVariants> {}

/**
 * Surface container primitive with composable sections.
 *
 * Variants map to surface/border/shadow tokens only; content structure is
 * delegated to `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`
 * and `CardFooter`.
 */
export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentPropsWithoutRef<'h3'>) {
  return <h3 className={cn('text-h4 leading-tight font-semibold', className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p className={cn('text-small text-text-secondary', className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />;
}

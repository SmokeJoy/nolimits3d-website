import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { cva } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/*
 * NOTE on anatomy (2026-08-05): the Task Packet / Primitive Inventory draft
 * originally named this part `Tabs.Trigger`. The pinned `@base-ui/react@1.6.0`
 * exports `Tabs.Tab`, not `Tabs.Trigger` (verified in
 * `node_modules/@base-ui/react/tabs/index.parts.d.ts`); the Inventory was
 * corrected accordingly on 2026-08-05. This file follows the corrected,
 * actually-compiling anatomy and names the exported wrapper `TabsTab` to
 * match it 1:1.
 *
 * A second, still-open mismatch: the Inventory's "Stati" row lists the active
 * tab attribute as `data-selected`. The library's own
 * `TabsTabDataAttributes` enum (same file tree) sets `data-active` on the
 * active tab instead — `data-selected` is never written by `Tabs.Tab`
 * (it belongs to `Select.Item`). Styling against `data-selected` here would
 * silently never match. This component styles the real attribute,
 * `data-active`; flagged for the record, not silently "fixed" in the spec.
 */

export type TabsProps = ComponentPropsWithoutRef<typeof BaseTabs.Root>;

/** Groups the tab list and its panels; owns the active-tab value. */
export function Tabs({ className, ...props }: TabsProps) {
  return <BaseTabs.Root className={cn('flex flex-col gap-3', className)} {...props} />;
}

export type TabsListProps = ComponentPropsWithoutRef<typeof BaseTabs.List>;

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <BaseTabs.List
      className={cn(
        'flex items-center gap-1 overflow-x-auto border-b border-border-default',
        className,
      )}
      {...props}
    />
  );
}

const tabsTabVariants = cva([
  'inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap',
  '-mb-px border-b-2 border-transparent px-4 rounded-t-md',
  'text-body font-medium text-text-secondary cursor-pointer select-none',
  'transition-colors duration-(--duration-fast) ease-standard motion-reduce:transition-none',
  'hover:text-text-primary',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
  'disabled:pointer-events-none disabled:opacity-50',
  'data-[active]:border-accent-primary data-[active]:bg-tabs-trigger-bg-active data-[active]:text-tabs-trigger-text-active',
]);

export type TabsTabProps = ComponentPropsWithoutRef<typeof BaseTabs.Tab>;

/** An individual tab button. Renders Base UI's `Tabs.Tab` (see note above). */
export function TabsTab({ className, ...props }: TabsTabProps) {
  return <BaseTabs.Tab className={cn(tabsTabVariants(), className)} {...props} />;
}

export type TabsPanelProps = ComponentPropsWithoutRef<typeof BaseTabs.Panel>;

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      className={cn(
        'text-body text-text-primary',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
        className,
      )}
      {...props}
    />
  );
}

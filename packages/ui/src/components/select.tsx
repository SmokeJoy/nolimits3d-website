import { Select as BaseSelect } from '@base-ui/react/select';
import clsx, { type ClassValue } from 'clsx';
import { Check, ChevronDown, LoaderCircle } from 'lucide-react';
import type { AriaAttributes, ReactNode } from 'react';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  id?: string;
  name?: string;
  options: SelectOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  /** Visual + semantic error state: red border on the trigger and (unless
   *  overridden below) `aria-invalid`. */
  error?: boolean;
  /** Shows a spinner in the trigger instead of the chevron while options load;
   *  also disables interaction (network/data not ready yet). */
  isLoading?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: AriaAttributes['aria-invalid'];
}

/**
 * Single-value select built on the exact Base UI anatomy required by the
 * Inventory: `Select.Root`, `Select.Trigger`, `Select.Value`, `Select.Portal`,
 * `Select.Positioner`, `Select.Popup`, `Select.List`, `Select.Item`,
 * `Select.ItemText`, `Select.ItemIndicator`.
 *
 * Full keyboard handling (arrows, Enter, Escape, Home/End, typeahead) and
 * highlighted/selected item state come from Base UI; this component only
 * supplies token styling. It renders no focus trap of its own (Select's
 * popup is a plain listbox, not a dialog).
 */
export function Select({
  id,
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled = false,
  required,
  error = false,
  isLoading = false,
  className,
  ...ariaProps
}: SelectProps) {
  const items = options.map((option) => ({ value: option.value, label: option.label }));
  const ariaInvalid = ariaProps['aria-invalid'] ?? (error ? true : undefined);

  return (
    <BaseSelect.Root
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(nextValue) => onValueChange?.(nextValue)}
      disabled={disabled || isLoading}
      required={required}
      name={name}
    >
      <BaseSelect.Trigger
        id={id}
        className={cn(
          'flex min-h-11 w-full items-center justify-between gap-2 rounded-md border bg-bg-surface px-3 text-body text-text-primary',
          'transition-colors duration-(--duration-fast) ease-standard motion-reduce:transition-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          'data-[placeholder]:text-text-secondary',
          error ? 'border-status-error' : 'border-border-default hover:border-border-hover',
          className,
        )}
        {...ariaProps}
        aria-invalid={ariaInvalid}
      >
        <BaseSelect.Value placeholder={placeholder} className="truncate" />
        {isLoading ? (
          <LoaderCircle
            aria-hidden="true"
            className="size-4 shrink-0 animate-spin motion-reduce:animate-none"
          />
        ) : (
          <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-text-secondary" />
        )}
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={4} className="z-(--z-index-dropdown) outline-none">
          <BaseSelect.Popup
            className={cn(
              'max-h-64 overflow-auto rounded-md border border-border-default bg-bg-surface p-1 shadow-lg',
              'transition-[opacity,transform] duration-(--duration-fast) ease-standard motion-reduce:transition-none',
              'data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
            )}
          >
            <BaseSelect.List>
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    'flex min-h-11 cursor-pointer items-center justify-between gap-2 rounded-sm px-3 text-body text-text-primary',
                    'data-[highlighted]:bg-bg-surface-hover',
                    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                  )}
                >
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="text-accent-primary">
                    <Check aria-hidden="true" className="size-4" />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

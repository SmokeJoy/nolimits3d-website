import clsx, { type ClassValue } from 'clsx';
import {
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from 'react';

/* clsx only: tailwind-merge's class-group heuristics misclassify custom token
   utilities (e.g. color `text-button-text-primary` vs size `text-body`) and
   silently drop valid classes. Distinct CSS properties never truly conflict. */
function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Props a `FormField` can inject into its single control child.
 *  `aria-invalid` matches React's own `Booleanish` (`boolean | 'true' | 'false'`)
 *  so both native-input-based controls (`Input`) and composite ones (`Select`)
 *  are valid children. */
type ControlInjectedProps = {
  id?: string | undefined;
  'aria-describedby'?: string | undefined;
  'aria-invalid'?: boolean | 'true' | 'false' | undefined;
};

export interface FormFieldProps extends Omit<ComponentPropsWithoutRef<'div'>, 'id' | 'children'> {
  /** Id of the wrapped control; required to drive the ARIA associations. */
  id: string;
  /**
   * Visible field label. Optional: `FormField` renders no label copy of its
   * own — callers that omit it must provide an accessible name another way
   * (e.g. `aria-label` on the control).
   */
  label?: string;
  /** Optional supporting text, linked to the control via `aria-describedby`. */
  description?: string;
  /**
   * Validation error message. When present, the field renders it and marks
   * the control `aria-invalid`. `FormField` never supplies a default string.
   */
  error?: string;
  /** The single form control (e.g. `<Input />`) to associate with the label. */
  children: ReactElement<ControlInjectedProps>;
}

/**
 * Framework-neutral wrapper that aligns a label, a single control, an
 * optional description and an optional error message, wiring the ARIA
 * associations between them automatically.
 *
 * All visible copy (`label`, `description`, `error`) is caller-supplied;
 * nothing here falls back to a hardcoded default string.
 */
export function FormField({
  id,
  label,
  description,
  error,
  children,
  className,
  ...props
}: FormFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
      })
    : children;

  return (
    <div className={cn('flex flex-col gap-1.5', className)} {...props}>
      {label ? (
        <label htmlFor={id} className="text-small font-medium text-text-primary">
          {label}
        </label>
      ) : null}
      {control}
      {description ? (
        <p id={descriptionId} className="text-small text-text-secondary">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-small text-status-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

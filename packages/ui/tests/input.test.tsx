import { fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Input } from '../src/components/input';

describe('Input', () => {
  it('accepts typed text via a native input', () => {
    render(<Input aria-label="Nome" />);

    const input = screen.getByRole('textbox', { name: 'Nome' });
    fireEvent.change(input, { target: { value: 'Atlas' } });

    expect(input).toHaveValue('Atlas');
  });

  it('honours the disabled state and blocks interaction', () => {
    const onChange = vi.fn();
    render(<Input aria-label="Nome" disabled onChange={onChange} />);

    const input = screen.getByRole('textbox', { name: 'Nome' });
    expect(input).toBeDisabled();
  });

  it('marks the error state with a visible border class and aria-invalid', () => {
    render(<Input aria-label="Email" error />);

    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('border-status-error');
  });

  it('does not mark aria-invalid when error is not set', () => {
    render(<Input aria-label="Email" />);

    expect(screen.getByRole('textbox', { name: 'Email' })).not.toHaveAttribute('aria-invalid');
  });

  it('keeps a 44px touch target and 16px text to avoid iOS zoom', () => {
    render(<Input aria-label="Nome" />);

    const input = screen.getByRole('textbox', { name: 'Nome' });
    expect(input).toHaveClass('min-h-11');
    expect(input).toHaveClass('text-body');
  });

  it('renders leading and trailing icon slots as decorative', () => {
    render(
      <Input
        aria-label="Ricerca"
        leadingIcon={<span data-testid="leading-icon" />}
        trailingIcon={<span data-testid="trailing-icon" />}
      />,
    );

    expect(screen.getByTestId('leading-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('trailing-icon').parentElement).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(screen.getByRole('textbox', { name: 'Ricerca' })).toHaveClass('pl-9', 'pr-9');
  });

  it('exposes the focus-ring contract on focus-visible', () => {
    render(<Input aria-label="Nome" />);

    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveClass(
      'focus-visible:outline-focus-ring',
    );
  });

  it('has no axe violations in default and error states', async () => {
    const { container } = render(
      <div>
        <Input aria-label="Nome" />
        <Input aria-label="Email non valida" error />
        <Input aria-label="Disabilitato" disabled />
      </div>,
    );

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Select, type SelectOption } from '../src/components/select';

const options: SelectOption[] = [
  { value: 'fdm', label: 'FDM' },
  { value: 'sla', label: 'SLA' },
  { value: 'sls', label: 'SLS', disabled: true },
];

describe('Select', () => {
  it('renders a closed trigger with the placeholder text', () => {
    render(<Select aria-label="Tecnologia di stampa" options={options} placeholder="Scegli..." />);

    const trigger = screen.getByRole('combobox', { name: 'Tecnologia di stampa' });
    expect(trigger).toHaveTextContent('Scegli...');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the popup on click and lists the options', async () => {
    render(<Select aria-label="Tecnologia di stampa" options={options} placeholder="Scegli..." />);

    fireEvent.click(screen.getByRole('combobox', { name: 'Tecnologia di stampa' }));

    expect(await screen.findByRole('option', { name: 'FDM' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'SLA' })).toBeInTheDocument();
  });

  it('navigates with ArrowDown and selects an item with Enter', async () => {
    const onValueChange = vi.fn();
    render(
      <Select
        aria-label="Tecnologia di stampa"
        options={options}
        placeholder="Scegli..."
        onValueChange={onValueChange}
      />,
    );

    const trigger = screen.getByRole('combobox', { name: 'Tecnologia di stampa' });
    fireEvent.click(trigger);
    await screen.findByRole('option', { name: 'FDM' });

    // Initial highlight lands on the popup asynchronously (rAF-scheduled).
    await waitFor(() => {
      expect(document.activeElement).toHaveAttribute('role', 'option');
    });

    fireEvent.keyDown(document.activeElement as Element, { key: 'ArrowDown' });
    await waitFor(() => {
      expect(document.activeElement).toHaveTextContent('SLA');
    });

    fireEvent.keyDown(document.activeElement as Element, { key: 'Enter' });

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('sla');
    });
  });

  it('marks the disabled option as inert', async () => {
    render(<Select aria-label="Tecnologia di stampa" options={options} placeholder="Scegli..." />);

    fireEvent.click(screen.getByRole('combobox', { name: 'Tecnologia di stampa' }));

    const disabledOption = await screen.findByRole('option', { name: 'SLS' });
    expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows the caller-controlled error border on the trigger', () => {
    render(<Select aria-label="Tecnologia di stampa" options={options} error />);

    const trigger = screen.getByRole('combobox', { name: 'Tecnologia di stampa' });
    expect(trigger).toHaveClass('border-status-error');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
  });

  it('respects an explicit caller aria-invalid value over the error shorthand', () => {
    render(
      <Select aria-label="Tecnologia di stampa" options={options} error aria-invalid="grammar" />,
    );

    expect(screen.getByRole('combobox', { name: 'Tecnologia di stampa' })).toHaveAttribute(
      'aria-invalid',
      'grammar',
    );
  });

  it('disables the trigger while options are loading', () => {
    render(<Select aria-label="Tecnologia di stampa" options={options} isLoading />);

    expect(screen.getByRole('combobox', { name: 'Tecnologia di stampa' })).toBeDisabled();
  });

  it('has no axe violations closed and open', async () => {
    const { container } = render(
      <Select aria-label="Tecnologia di stampa" options={options} placeholder="Scegli..." />,
    );

    /* `region` is disabled only for the open-popup pass: it fires because the
       isolated test document has no <main>/landmark wrapping the portalled
       popup content, a fixture artifact of testing a fragment via
       `document.body`, not an accessibility defect in the component itself. */
    let results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toEqual([]);

    fireEvent.click(screen.getByRole('combobox', { name: 'Tecnologia di stampa' }));
    await screen.findByRole('option', { name: 'FDM' });

    results = await axe.run(document.body, {
      rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});

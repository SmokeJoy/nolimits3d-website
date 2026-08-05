import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import { FormField } from '../src/components/form-field';
import { Input } from '../src/components/input';
import { Select } from '../src/components/select';

describe('FormField', () => {
  it('associates the label with the control via htmlFor/id', () => {
    render(
      <FormField id="email" label="Email">
        <Input />
      </FormField>,
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('id', 'email');
  });

  it('links the description to the control via aria-describedby', () => {
    render(
      <FormField id="email" label="Email" description="Usiamo questo indirizzo per contattarti.">
        <Input />
      </FormField>,
    );

    const input = screen.getByLabelText('Email');
    const description = screen.getByText('Usiamo questo indirizzo per contattarti.');

    expect(description).toHaveAttribute('id', 'email-description');
    expect(input.getAttribute('aria-describedby')).toContain('email-description');
  });

  it('links the error message to the control and marks aria-invalid', () => {
    render(
      <FormField id="email" label="Email" error="Indirizzo non valido">
        <Input />
      </FormField>,
    );

    const input = screen.getByLabelText('Email');
    const error = screen.getByRole('alert');

    expect(error).toHaveTextContent('Indirizzo non valido');
    expect(error).toHaveAttribute('id', 'email-error');
    expect(input.getAttribute('aria-describedby')).toContain('email-error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('combines description and error ids in aria-describedby when both are present', () => {
    render(
      <FormField id="email" label="Email" description="Testo di supporto" error="Errore">
        <Input />
      </FormField>,
    );

    const input = screen.getByLabelText('Email');
    const describedBy = input.getAttribute('aria-describedby');

    expect(describedBy).toContain('email-description');
    expect(describedBy).toContain('email-error');
  });

  it('renders no label, description or error copy of its own when the props are omitted', () => {
    render(
      <FormField id="email">
        <Input aria-label="Email" />
      </FormField>,
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    // Only the control's own accessible name should be present; FormField adds no text nodes.
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('also associates a non-native control (Select), not just Input', () => {
    render(
      <FormField id="tech" label="Tecnologia" error="Campo obbligatorio">
        <Select options={[{ value: 'fdm', label: 'FDM' }]} placeholder="Scegli..." />
      </FormField>,
    );

    const trigger = screen.getByLabelText('Tecnologia');
    expect(trigger).toHaveAttribute('id', 'tech');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger.getAttribute('aria-describedby')).toContain('tech-error');
  });

  it('has no axe violations in normal and error states', async () => {
    const { container } = render(
      <div>
        <FormField id="name" label="Nome" description="Nome completo">
          <Input />
        </FormField>
        <FormField id="email-error" label="Email" error="Campo obbligatorio">
          <Input />
        </FormField>
      </div>,
    );

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});

import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../src/components/card';

function renderFullCard(variant?: 'standard' | 'outline' | 'elevated') {
  return render(
    <Card variant={variant} data-testid="card">
      <CardHeader>
        <CardTitle>Ordine #42</CardTitle>
        <CardDescription>Dettagli della commessa di stampa</CardDescription>
      </CardHeader>
      <CardContent>Contenuto</CardContent>
      <CardFooter>Azioni</CardFooter>
    </Card>,
  );
}

describe('Card', () => {
  it('composes header, title, description, content and footer', () => {
    renderFullCard();

    expect(screen.getByRole('heading', { level: 3, name: 'Ordine #42' })).toBeInTheDocument();
    expect(screen.getByText('Dettagli della commessa di stampa')).toBeInTheDocument();
    expect(screen.getByText('Contenuto')).toBeInTheDocument();
    expect(screen.getByText('Azioni')).toBeInTheDocument();
  });

  it.each([
    ['standard', 'bg-bg-surface'],
    ['outline', 'bg-transparent'],
    ['elevated', 'shadow-md'],
  ] as const)('renders the %s variant with surface tokens', (variant, expectedClass) => {
    renderFullCard(variant);

    expect(screen.getByTestId('card')).toHaveClass(expectedClass);
  });

  it('uses the border token on every variant', () => {
    renderFullCard('elevated');

    expect(screen.getByTestId('card')).toHaveClass('border-border-default');
  });

  it('keeps size AND color text utilities on the description (tailwind-merge regression)', () => {
    renderFullCard();

    const description = screen.getByText('Dettagli della commessa di stampa');
    expect(description).toHaveClass('text-small');
    expect(description).toHaveClass('text-text-secondary');
  });

  it('has no axe violations', async () => {
    const { container } = renderFullCard();

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});

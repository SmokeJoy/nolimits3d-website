import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import { Badge } from '../src/components/badge';

describe('Badge', () => {
  it.each([
    ['default', 'bg-accent-primary'],
    ['secondary', 'bg-bg-surface'],
    ['destructive', 'bg-status-error'],
    ['outline', 'bg-transparent'],
  ] as const)('renders the %s variant with token classes', (variant, expectedClass) => {
    render(<Badge variant={variant}>Etichetta</Badge>);

    const badge = screen.getByText('Etichetta');
    expect(badge).toHaveClass(expectedClass);
    expect(badge.tagName).toBe('SPAN');
  });

  it('is non-interactive: no implicit role, no tab stop', () => {
    render(<Badge>Statico</Badge>);

    const badge = screen.getByText('Statico');
    expect(badge).not.toHaveAttribute('role');
    expect(badge).not.toHaveAttribute('tabindex');
  });

  it('merges caller className overrides', () => {
    render(<Badge className="mt-2">Custom</Badge>);

    expect(screen.getByText('Custom')).toHaveClass('mt-2');
  });

  it('keeps size AND color text utilities together (tailwind-merge regression)', () => {
    render(<Badge>Regressione</Badge>);

    const badge = screen.getByText('Regressione');
    expect(badge).toHaveClass('text-small');
    expect(badge).toHaveClass('text-accent-primary-foreground');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Badge>Default</Badge>
        <Badge variant="destructive">Errore</Badge>
      </div>,
    );

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});

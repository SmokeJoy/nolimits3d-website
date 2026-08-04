import { fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../src/components/button';

async function expectNoA11yViolations(node: HTMLElement) {
  const results = await axe.run(node, {
    rules: { 'color-contrast': { enabled: false } },
  });
  expect(results.violations).toEqual([]);
}

describe('Button', () => {
  it('renders an accessible button and fires the click callback', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Conferma</Button>);

    const button = screen.getByRole('button', { name: 'Conferma' });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['primary', 'bg-button-bg-primary'],
    ['secondary', 'bg-button-bg-secondary'],
    ['destructive', 'bg-status-error'],
    ['outline', 'border-border-default'],
    ['ghost', 'hover:bg-bg-surface-hover'],
  ] as const)('applies token classes for the %s variant', (variant, expectedClass) => {
    render(<Button variant={variant}>Azione</Button>);

    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  it.each([
    ['sm', 'md:min-h-9'],
    ['md', 'md:min-h-10'],
    ['lg', 'min-h-12'],
  ] as const)('applies the %s size with a mobile touch target', (size, expectedClass) => {
    render(<Button size={size}>Azione</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(expectedClass);
    if (size !== 'lg') {
      expect(button).toHaveClass('min-h-11');
    }
  });

  it('communicates the async state: aria-busy, spinner, no interaction, label readable', () => {
    const onClick = vi.fn();
    render(
      <Button isLoading onClick={onClick}>
        Salva
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Salva' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('button-spinner')).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('stops the spinner rotation under reduced motion (class contract)', () => {
    render(<Button isLoading>Salva</Button>);

    const spinner = screen.getByTestId('button-spinner').firstElementChild;
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('motion-reduce:animate-none');
  });

  it('renders a leading icon and the analytics attribute', () => {
    render(
      <Button icon={<span data-testid="button-icon" />} trackId="cta-primary">
        Con icona
      </Button>,
    );

    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('data-track-id', 'cta-primary');
  });

  it('exposes the focus-ring contract on focus-visible', () => {
    render(<Button>Focus</Button>);

    expect(screen.getByRole('button')).toHaveClass('focus-visible:outline-focus-ring');
  });

  it('keeps color AND size text utilities together (tailwind-merge regression)', () => {
    render(<Button>Testo</Button>);

    const button = screen.getByRole('button');
    /* tailwind-merge would misclassify these as conflicting `text-*` classes
       and drop the color one; cn() must preserve both. */
    expect(button).toHaveClass('text-button-text-primary');
    expect(button).toHaveClass('text-body');
  });

  it('has no axe violations in idle and loading states', async () => {
    const { container } = render(
      <div>
        <Button>Idle</Button>
        <Button isLoading>Loading</Button>
      </div>,
    );

    await expectNoA11yViolations(container);
  });
});

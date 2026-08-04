import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import { StatusIndicator } from '../src/components/status-indicator';

describe('StatusIndicator', () => {
  it('announces the state politely with a visible textual label', () => {
    render(<StatusIndicator status="success" label="Stampante online" />);

    const indicator = screen.getByRole('status');
    expect(indicator).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText('Stampante online')).toBeInTheDocument();
  });

  it.each([
    ['success', 'bg-status-success'],
    ['warning', 'bg-status-warning'],
    ['error', 'bg-status-error'],
    ['info', 'bg-status-info'],
  ] as const)('maps the %s status to its token dot', (status, expectedClass) => {
    render(<StatusIndicator status={status} label="Stato" />);

    const dot = screen.getByTestId('status-dot');
    expect(dot).toHaveClass(expectedClass);
    expect(dot).toHaveAttribute('aria-hidden', 'true');
  });

  it('never relies on color alone: the label is mandatory content', () => {
    render(<StatusIndicator status="error" label="Errore di stampa" />);

    expect(screen.getByRole('status')).toHaveTextContent('Errore di stampa');
  });

  it('stops the dot pulse under reduced motion (class contract)', () => {
    render(<StatusIndicator status="info" label="In coda" />);

    const dot = screen.getByTestId('status-dot');
    expect(dot).toHaveClass('animate-pulse');
    expect(dot).toHaveClass('motion-reduce:animate-none');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <StatusIndicator status="success" label="Online" />
        <StatusIndicator status="error" label="Offline" />
      </div>,
    );

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});

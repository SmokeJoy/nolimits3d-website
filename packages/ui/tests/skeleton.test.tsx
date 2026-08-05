import { render } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import { Skeleton } from '../src/components/skeleton';

describe('Skeleton', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<Skeleton data-testid="sk" />);

    const skeleton = container.firstElementChild;
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveAttribute('role', 'presentation');
  });

  it.each([
    ['text', 'h-4'],
    ['rectangular', 'rounded-md'],
    ['circular', 'rounded-full'],
  ] as const)('renders the %s variant', (variant, expectedClass) => {
    const { container } = render(<Skeleton variant={variant} />);

    expect(container.firstElementChild).toHaveClass(expectedClass);
  });

  it('pulses by default and degrades to static opacity under reduced motion', () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.firstElementChild;
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('motion-reduce:animate-none');
    expect(skeleton).toHaveClass('motion-reduce:opacity-70');
  });

  it('accepts dimension overrides via className', () => {
    const { container } = render(<Skeleton variant="circular" className="size-12" />);

    expect(container.firstElementChild).toHaveClass('size-12');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="circular" className="size-10" />
      </div>,
    );

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});

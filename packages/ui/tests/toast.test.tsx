import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import axe from 'axe-core';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { Toaster, toast } from '../src/components/toast';

beforeAll(() => {
  /* jsdom has no matchMedia; sonner reads it to detect a mobile viewport.
     This lives here (not in tests/setup.ts, out of this packet's Allowed
     Files) since only the Toast suite needs it. */
  if (typeof window.matchMedia !== 'function') {
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;
  }
});

afterEach(() => {
  // sonner keeps toast state in a module-level store; drain it between tests.
  act(() => {
    toast.dismiss();
  });
});

describe('Toaster / toast', () => {
  const closeButtonAriaLabel = 'Chiudi notifica';

  it('shows a toast with caller-supplied copy (no hardcoded default text)', async () => {
    render(<Toaster closeButtonAriaLabel={closeButtonAriaLabel} />);

    act(() => {
      toast.success('Operazione completata');
    });

    expect(await screen.findByText('Operazione completata')).toBeInTheDocument();
  });

  it('exposes an aria-live region so the notification is announced', () => {
    render(<Toaster closeButtonAriaLabel={closeButtonAriaLabel} />);

    /* The `aria-live="polite"` region is the always-present outer `<section>`;
       the `[data-sonner-toaster]` list itself only mounts once a toast exists. */
    const region = document.querySelector('section[aria-live]');
    expect(region).toHaveAttribute('aria-live', 'polite');
  });

  it('auto-dismisses after its duration elapses', async () => {
    render(<Toaster closeButtonAriaLabel={closeButtonAriaLabel} />);

    act(() => {
      toast('Messaggio temporaneo', { duration: 60 });
    });

    expect(await screen.findByText('Messaggio temporaneo')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText('Messaggio temporaneo')).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('pauses the dismiss timer while the toast region is hovered', () => {
    // Deterministic timing: sonner computes remaining time from Date.now(), so
    // fake timers avoid a real-clock race between test setup latency and a
    // short toast duration.
    // sonner publishes new toasts to subscribers via requestAnimationFrame,
    // so rAF must be faked (and flushed) alongside setTimeout/Date.
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'requestAnimationFrame', 'Date'] });
    try {
      render(<Toaster closeButtonAriaLabel={closeButtonAriaLabel} />);

      act(() => {
        toast('Messaggio in pausa', { duration: 1000 });
      });
      act(() => {
        vi.advanceTimersByTime(50);
      });

      expect(screen.getByText('Messaggio in pausa')).toBeInTheDocument();

      const toaster = document.querySelector('[data-sonner-toaster]') as HTMLElement;
      act(() => {
        fireEvent.mouseEnter(toaster);
      });

      // Far past the toast's own duration: hovering must keep it mounted.
      act(() => {
        vi.advanceTimersByTime(5000);
      });
      expect(screen.getByText('Messaggio in pausa')).toBeInTheDocument();

      act(() => {
        fireEvent.mouseLeave(toaster);
      });

      // Duration plus the exit-animation unmount delay.
      act(() => {
        vi.advanceTimersByTime(1500);
      });
      expect(screen.queryByText('Messaggio in pausa')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('renders a caller-supplied action button (retry contract), no built-in default', async () => {
    render(<Toaster closeButtonAriaLabel={closeButtonAriaLabel} />);

    act(() => {
      toast.error('Invio fallito', {
        action: { label: 'Riprova', onClick: () => {} },
        duration: Infinity,
      });
    });

    expect(await screen.findByText('Invio fallito')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Riprova' })).toBeInTheDocument();
  });

  it('renders a close button by default and dismisses via that button', async () => {
    render(<Toaster closeButtonAriaLabel={closeButtonAriaLabel} />);

    act(() => {
      toast.info('Notifica chiudibile', { duration: Infinity });
    });

    expect(await screen.findByText('Notifica chiudibile')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: closeButtonAriaLabel }));

    await waitFor(() => {
      expect(screen.queryByText('Notifica chiudibile')).not.toBeInTheDocument();
    });
  });

  it('allows callers to disable the default close button', async () => {
    render(<Toaster closeButton={false} />);

    act(() => {
      toast.info('Notifica senza X', { duration: Infinity });
    });

    expect(await screen.findByText('Notifica senza X')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: closeButtonAriaLabel })).not.toBeInTheDocument();
  });

  it('has no axe violations while a toast is visible', async () => {
    const { container } = render(<Toaster closeButtonAriaLabel={closeButtonAriaLabel} />);

    act(() => {
      toast.info('Aggiornamento disponibile', { duration: Infinity });
    });

    await screen.findByText('Aggiornamento disponibile');

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Dialog, DialogContent, DialogTrigger } from '../src/components/dialog';

function renderDialog(onOpenChange?: (open: boolean) => void) {
  return render(
    <div>
      <button type="button">Fuori dal dialog</button>
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>Apri dialog</DialogTrigger>
        <DialogContent
          title="Conferma azione"
          description="Questa azione non è reversibile."
          closeLabel="Chiudi"
        >
          <button type="button">Conferma</button>
        </DialogContent>
      </Dialog>
    </div>,
  );
}

describe('Dialog', () => {
  it('opens from the trigger and exposes the accessible title/description', async () => {
    renderDialog();

    fireEvent.click(screen.getByRole('button', { name: 'Apri dialog' }));

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAccessibleName('Conferma azione');
    expect(dialog).toHaveAccessibleDescription('Questa azione non è reversibile.');
  });

  it('moves initial focus inside the popup and keeps it away from the outside trigger', async () => {
    renderDialog();

    // Reference captured before opening: once modal, the rest of the page becomes
    // inert and role queries can no longer see it (that inertness is itself part
    // of the trap contract), so the element must be grabbed while still reachable.
    const outsideButton = screen.getByRole('button', { name: 'Fuori dal dialog' });

    fireEvent.click(screen.getByRole('button', { name: 'Apri dialog' }));
    const dialog = await screen.findByRole('dialog');

    const closeButton = screen.getByRole('button', { name: 'Chiudi' });
    const confirmButton = screen.getByRole('button', { name: 'Conferma' });

    await waitFor(() => {
      expect(
        document.activeElement === closeButton || document.activeElement === confirmButton,
      ).toBe(true);
    });
    expect(outsideButton).not.toHaveFocus();

    // Base UI installs invisible focus-guard sentinels around the popup content
    // (`data-base-ui-focus-guard`) so that a real Tab traversal past the last
    // focusable element lands back inside instead of escaping — jsdom does not
    // execute native Tab-key focus traversal, so the guard itself is exercised
    // directly here, the same way a browser Tab press would reach it.
    const guards = Array.from(document.querySelectorAll<HTMLElement>('[data-base-ui-focus-guard]'));
    expect(guards.length).toBeGreaterThan(0);
    const afterGuard = guards[guards.length - 1]!;

    fireEvent.focus(afterGuard);

    await waitFor(() => {
      expect(dialog.contains(document.activeElement)).toBe(true);
    });
    expect(outsideButton).not.toHaveFocus();
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    renderDialog();

    const trigger = screen.getByRole('button', { name: 'Apri dialog' });
    fireEvent.click(trigger);
    await screen.findByRole('dialog');

    fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('closes on backdrop click', async () => {
    renderDialog();

    fireEvent.click(screen.getByRole('button', { name: 'Apri dialog' }));
    await screen.findByRole('dialog');

    const backdrop = Array.from(document.body.querySelectorAll('div')).find((el) =>
      el.className.includes('bg-palette-dark/70'),
    );
    expect(backdrop).toBeTruthy();

    fireEvent.click(backdrop as Element);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('calls onOpenChange on open and close', async () => {
    const onOpenChange = vi.fn();
    renderDialog(onOpenChange);

    fireEvent.click(screen.getByRole('button', { name: 'Apri dialog' }));
    await screen.findByRole('dialog');
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());

    fireEvent.click(screen.getByRole('button', { name: 'Chiudi' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('has no axe violations while open', async () => {
    renderDialog();

    fireEvent.click(screen.getByRole('button', { name: 'Apri dialog' }));
    await screen.findByRole('dialog');

    const results = await axe.run(document.body, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});

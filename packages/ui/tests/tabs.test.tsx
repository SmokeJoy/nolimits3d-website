import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Tabs, TabsList, TabsPanel, TabsTab } from '../src/components/tabs';

function renderTabs(onValueChange?: (value: unknown) => void) {
  return render(
    <Tabs defaultValue="account" onValueChange={onValueChange}>
      <TabsList>
        <TabsTab value="account">Account</TabsTab>
        <TabsTab value="password">Password</TabsTab>
        <TabsTab value="billing" disabled>
          Billing
        </TabsTab>
      </TabsList>
      <TabsPanel value="account">Contenuto account</TabsPanel>
      <TabsPanel value="password">Contenuto password</TabsPanel>
      <TabsPanel value="billing">Contenuto billing</TabsPanel>
    </Tabs>,
  );
}

describe('Tabs', () => {
  it('exposes the correct ARIA roles and marks the default tab selected', () => {
    renderTabs();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    const accountTab = screen.getByRole('tab', { name: 'Account' });
    expect(accountTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'false');
  });

  it('shows only the panel matching the active tab', () => {
    renderTabs();

    // Inactive panels are unmounted (`keepMounted` defaults to false), not just hidden.
    expect(screen.getByText('Contenuto account')).toBeVisible();
    expect(screen.queryByText('Contenuto password')).not.toBeInTheDocument();
  });

  it('marks the active tab with the data-active contract used for styling', () => {
    renderTabs();

    const accountTab = screen.getByRole('tab', { name: 'Account' });
    expect(accountTab).toHaveAttribute('data-active');
    expect(accountTab).toHaveClass('data-[active]:border-accent-primary');
  });

  it('moves focus with the arrow keys and activates on Enter (keyboard navigation)', async () => {
    const onValueChange = vi.fn();
    renderTabs(onValueChange);

    const accountTab = screen.getByRole('tab', { name: 'Account' });
    const passwordTab = screen.getByRole('tab', { name: 'Password' });

    accountTab.focus();
    expect(accountTab).toHaveFocus();

    fireEvent.keyDown(accountTab, { key: 'ArrowRight' });
    // Base UI moves focus via a rAF-scheduled imperative `.focus()` call.
    await waitFor(() => {
      expect(passwordTab).toHaveFocus();
    });

    // A real browser turns an Enter keypress on a focused native <button> into
    // a click (default activation behaviour); jsdom does not synthesize that,
    // so the click is fired explicitly here, same convention as button.test.tsx.
    fireEvent.keyDown(passwordTab, { key: 'Enter', code: 'Enter' });
    fireEvent.keyUp(passwordTab, { key: 'Enter', code: 'Enter' });
    fireEvent.click(passwordTab);

    await waitFor(() => {
      expect(passwordTab).toHaveAttribute('aria-selected', 'true');
    });
    expect(screen.getByText('Contenuto password')).toBeVisible();
  });

  it('skips a disabled tab in the touch-target and interaction contract', () => {
    renderTabs();

    // Disabled tabs stay in the DOM/tab order semantics via aria-disabled, not the
    // native `disabled` attribute, so assistive tech can still describe them.
    const billingTab = screen.getByRole('tab', { name: 'Billing' });
    expect(billingTab).toHaveAttribute('aria-disabled', 'true');
    expect(billingTab).toHaveClass('min-h-11');
  });

  it('has no axe violations', async () => {
    const { container } = renderTabs();

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});

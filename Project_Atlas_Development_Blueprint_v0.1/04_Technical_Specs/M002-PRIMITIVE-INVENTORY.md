# Primitive Inventory: Design System M-002

## Status
* **Status**: PROPOSED
* **Gate**: Requires Architect Approval

## Baseline Requirements
Every component in this inventory must:
- Derive from `shadcn/ui` logic but integrate Atlas design tokens strictly.
- Possess typed API (`Props` interface).
- Provide visual variants (e.g., Default, Destructive, Outline, Ghost).
- Manage interactive states (Hover, Focus-Visible, Disabled, Loading/Error).
- Comply with WCAG 2.2 AA (Color contrast, Touch target size of 44x44px minimum for interactive elements).
- Contain no hardcoded text or business logic.

## Tranche 1: Core Primitives
1. **Button**: Primary action element.
   - Variants: Primary, Secondary, Destructive, Outline, Ghost, Link.
   - States: default, hover, active, focus-visible, disabled, loading.
2. **Badge**: Informational tag.
   - Variants: Default, Secondary, Destructive, Outline.
3. **Skeleton**: Loading placeholder.
   - Variants: Card, text line, circular avatar.
   - Accessibility: Must respect `prefers-reduced-motion: reduce`.
4. **StatusIndicator**: Micro-component for real-time status (e.g. online, error).
   - Must not rely on color alone (include icon or text).

## Tranche 2: Forms & Complex Layouts
5. **Input**: Standard text input.
   - States: default, focus-visible, error, disabled.
6. **FormField**: Wrapper for form elements (Label, Input, Description, Error Message).
   - Accessibility: Strict `aria-describedby` and `aria-invalid` bindings.
7. **Select**: Dropdown selection menu.
   - Accessibility: Fully keyboard navigable.
8. **Card**: Layout container for grouped information.
   - Parts: Header, Title, Description, Content, Footer.
9. **Dialog/Modal**: Interruption overlay.
   - Accessibility: Focus trapping, `Escape` key to close.
10. **Tabs**: Content contextual switcher.
    - Accessibility: Keyboard navigation (Left/Right arrows).
11. **Toast**: Ephemeral non-blocking notification.
    - Accessibility: Swipe to dismiss, screen reader announcements (aria-live).

EV — Wave C2 Definition-of-Ready check
Milestone: M-002 / Wave C2 / TSK-M002-CLAUDE-C2
Executor: atlas-tpm (Technical Program Manager subagent)
Date: 2026-08-05
Referenced by: PA-AR-M002-015
----------------------------------------------------------------------

## Scope

`atlas-tpm` verified readiness to activate `TSK-M002-CLAUDE-C2` (Input, FormField,
Select, Dialog, Tabs, Toast) immediately after Wave C1 merged (PR #6, `26cb068`).

## Sources read

`CLAUDE.md`; `CURRENT_PROJECT_STATE.md`; `MILESTONE_REGISTER.md`; `SPRINT_REGISTER.md`;
`PA-AR-M002-014` (last real Architect Review); `BLOCKER_REGISTER.md`;
`M002-TASK-PACKET-CLAUDE.md` §3; `M002-PRIMITIVE-INVENTORY.md`;
`NoLimits3D_Documentation_v0.96/03_Design/04_Component_Library.md`;
`packages/ui/package.json`, `pnpm-lock.yaml`, `packages/ui/src/components/`.

## Findings

1. **Upstream spec.** `04_Component_Library.md` (DOC-DES-008) is boilerplate only, no
   per-component contract. The real spec is `M002-PRIMITIVE-INVENTORY.md`, which fully
   covers all 6 C2 components (API, states, a11y, reduced-motion, tests). At the time of
   this check its header still read `PENDING ARCHITECT APPROVAL` — the gap this check
   surfaced and `PA-AR-M002-015` resolved.
2. **Dependencies.** `@base-ui/react@1.6.0` and `sonner@2.0.7` are already declared in
   `packages/ui/package.json` `dependencies` and resolved in `pnpm-lock.yaml` against
   React 19.2.7. Precedent: `button.tsx` (Wave C1) already imports
   `Button as BaseButton from '@base-ui/react/button'` — the test toolchain (vitest,
   jsdom, axe, testing-library) is already proven against this library.
3. **Dialog / focus trap.** No open architectural decision. The Inventory (§9) delegates
   focus trapping explicitly to `@base-ui/react`'s own `Dialog` primitive, not to custom
   code: "Focus trapping obbligatorio fornito da Base UI." The Task Packet only asks for
   test coverage of the resulting behaviour (Escape, backdrop click, focus return), not a
   custom implementation. This is a reading of the existing Inventory/Task Packet text,
   not independent verification that Base UI's Dialog behaves as documented — that
   verification happens when `atlas-frontend` writes the focus-trap tests in Wave C2.
4. **Proposed sequencing** (simple → complex): Input → FormField → Tabs → Toast → Select
   → Dialog. Indicative relative effort: Input 1.5, FormField 1, Tabs 1.5, Toast 1.5,
   Select 3, Dialog 3 — roughly double the total effort of Wave C1.
5. **DOC-DES-008 coverage.** Typed API, keyboard, focus and state contracts are covered
   by the Inventory + Task Packet. "No hardcoded copy" is not explicitly stated for C2 the
   way it was demanded elsewhere in Wave C1 — the Inventory's own Toast example text
   ("Riprova") must be treated as a caller-supplied prop, not a shipped default. Binding
   note issued to `atlas-frontend`: no hardcoded default copy strings in Toast or
   FormField.
6. **Visual regression testing** remains an inherited gap from Wave C1 (no tooling), not
   new to C2.

## Verdict at time of check

NOT READY pending Architect approval of `M002-PRIMITIVE-INVENTORY.md` — the one blocking
artefact identified. Resolved by `PA-AR-M002-015` (2026-08-05).

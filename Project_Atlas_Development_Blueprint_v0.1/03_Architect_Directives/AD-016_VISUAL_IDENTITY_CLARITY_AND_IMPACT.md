# Architect Directive AD-016 - Visual Identity, Clarity And Impact

> **Directive ID:** AD-016
> **Program:** WPR - Web App Production Readiness
> **Owner:** Codex Root - Chief Architect & CTO
> **Date:** 2026-08-06
> **Status:** BINDING FOR WPR PLANNING AND UI TASK PACKETS
> **Authority:** Andrea - Product Owner and Client, direct instruction recorded 2026-08-06

## 1. Client Mandate

The NoLimits3D web application must have a distinctive visual identity that remains coherent
with the brand and subject matter, stays light enough to avoid visual overload, is immediately
clear to visitors, and has stronger visual and aesthetic impact than relevant sector sites.

The competitor comparison is aesthetic only. Performance, usability, accessibility, and content
quality remain separate mandatory gates and are not inferred from the visual comparison.

## 2. Binding Implementation Rules

- `packages/ui` design tokens and approved primitives are the shared visual source of truth.
- New surfaces must not introduce an unrelated page-specific visual language.
- Information hierarchy, navigation, states, controls, and responsive behavior must remain clear
  without visible instructions explaining the interface.
- UI packets must include the repository performance-budget gate and applicable browser,
  responsive, accessibility, and visual-regression evidence.
- Visual distinction must come from a coherent NoLimits3D art direction, real product/service
  media, typography, composition, motion restraint, and craft; it must not rely on decorative
  clutter or obscure core actions.

## 3. WPR Deliverables

WPR-M1 must produce a bounded visual competitor-reference set and a comparison rubric covering
only aesthetic identity and impact. The set may be proposed by either team and must be approved
by Andrea before it becomes an acceptance reference.

WPR-M3 UI packets must name the approved tokens, components, reference states, and visual
acceptance evidence. WPR-M4 must include desktop and mobile screenshots of every critical route,
visual-regression results, accessibility evidence, and performance-budget results.

## 4. Acceptance Boundary

Automated checks may prove consistency, accessibility, regressions, and performance, but they
cannot approve subjective aesthetic impact. Andrea retains final visual acceptance. No team may
claim that the site is visually better than the sector comparison set without Andrea's recorded
acceptance against the approved reference set.

This directive does not authorize invented brand assets, unlicensed media, production deployment,
operational PrintFlow, Jarvis, or closure of `BLK-BASE-001`.

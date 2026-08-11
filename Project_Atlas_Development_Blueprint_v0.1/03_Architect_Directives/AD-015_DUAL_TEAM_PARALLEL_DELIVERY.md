# Architect Directive AD-015 - Dual-Team Parallel Delivery

> **Directive ID:** AD-015
> **Program:** WPR - Web App Production Readiness
> **Owner:** Codex Root - Chief Architect & CTO
> **Date:** 2026-08-06
> **Status:** BINDING FOR GOVERNANCE IMPLEMENTATION AND TASK-PACKET PLANNING
> **Authority:** Andrea - Product Owner and Client, direct instruction recorded 2026-08-06

## 1. Decision

Project Atlas will use two real delivery teams in parallel:

- the Codex Team, whose internal implementation chain remains
  `Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend`; and
- the Claude Team, operating as an independent peer delivery team with its own disclosed
  internal workers.

Claude Team is authorized to own and implement production-code slices after the activation gate
in section 7. This supersedes only the Claude consultative-only restriction in AD-014 section 5.
It does not change the Atlas delegation chain, give Claude architectural approval authority, or
authorize either team to write outside an approved scope.

## 2. Client Relationship And Authority

Andrea is treated as Product Owner and client. The teams collaborate to deliver the client
outcome in AD-014, not as competing owners of the same files.

- Andrea owns product priority, client data, business/legal decisions, and final acceptance.
- Codex Root owns architecture, Blueprint decisions, program boundaries, and Architect Review.
- Atlas TPM owns integrated planning, dependency sequencing, scope allocation, evidence
  consolidation, and independent Technical Review for both teams.
- Claude Team may propose architecture and contracts but cannot approve them.
- Neither team may self-approve, waive a failed gate, close `BLK-BASE-001`, or authorize release.

## 3. Peer Task Packet

Every Claude implementation slice requires an approved Peer Task Packet recorded in the Atlas
planning workspace before work starts. It must contain:

- milestone, objective, accountable Claude owner, branch, base commit, and dependencies;
- exact allowed files/directories and explicit forbidden files/directories;
- acceptance criteria, required tests, evidence paths, rollback, handoff, and stop conditions;
- an overlap check against every active Atlas and Claude packet;
- the required cross-team reviewers and the single authorized integration owner.

Atlas Task Packets and Claude Peer Task Packets are equal in quality requirements. A Claude
packet is not nested under the Atlas agent chain, but Atlas TPM must confirm its scope is
disjoint and review its delivery before integration.

## 4. Branch, Review And Integration Protocol

- Each implementation track uses a dedicated branch and isolated worktree when supported.
- Product code is never committed directly to `main` by an implementer from either team.
- Before push, the owner fetches the authoritative base and records divergence and scope checks.
- Claude Team reviews relevant Atlas changes as an additional independent peer review.
- Atlas TPM performs Technical Review of Claude changes and remains the required independent
  integration gate. Peer review never replaces Technical Review.
- Only the packet-named integration owner may merge after all required gates and reviews pass.
- Any file overlap, stale base that changes a reviewed contract, or unexpected concurrent edit
  stops both affected tracks until Atlas TPM reallocates ownership in the shared channel.

No commit, push, pull request, merge, deploy, production access, or release is authorized merely
by this directive. Those actions require explicit authorization in the active packet.

## 5. Continuous Coordination

The canonical coordination record is:

`Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md`

Before any write, each track posts its packet, branch, base, allowed files, forbidden files,
dependencies, and expected handoff. Material scope changes, blockers, gate failures, push state,
and completion are posted promptly. `CROSS_TEAM_CHAT.md` may support informal discussion but
cannot authorize work or override the canonical channel.

The Codex monitor checks the canonical channel every 20 minutes while platform execution is
available. Automation cannot bypass exhausted credits or a platform refusal; it resumes on the
next accepted run. Session handoffs must state the active packet and exact next safe action.

## 6. GitHub Authentication Continuity

When an active packet explicitly authorizes a GitHub operation and authentication or signing
blocks it:

1. Prefer the existing authenticated `gh` session, Git Credential Manager, or an approved
   SSH-signing configuration.
2. If a trusted interactive GitHub or credential-manager UI requires a client-provided secret,
   a team may enter it interactively with screen control only for that prompt.
3. Never place a credential in repository files, shell history, logs, evidence, handoffs,
   automations, memory, or either team channel.
4. Never disable branch protection, signatures, required checks, review gates, or secret scans
   to obtain continuity.
5. Local or alternate verification is useful evidence but is never reported as proof that a
   push, pull request, merge, or deployment succeeded.
6. If the GitHub lane remains unavailable, continue every independent safe task and report the
   unavailable operation truthfully; do not fabricate completion.

## 7. Activation Gate

Claude production-code ownership becomes active only after all of the following:

- `AGENTS.md` and the active Development Framework are aligned with this directive without
  weakening the Atlas internal chain;
- repository validators and Role Boundary Tests cover the peer lane, disjoint ownership,
  no self-approval, and fail-closed integration;
- Atlas TPM issues `APPROVED FOR INTEGRATION` on the governance implementation;
- Codex Root issues Architect Review approval; and
- the first Claude Peer Task Packet is posted and acknowledged in the canonical channel.

Until then, Claude Team remains frozen from new production-code writes but may communicate,
review, and prepare non-binding proposals. Historical Claude code and records remain factual.

## 8. Product Boundaries

This directive does not authorize operational PrintFlow, Jarvis implementation, production
access, deployment, release, client-data invention, Documentation Bible modification, or closure
of `BLK-BASE-001`. All AD-014 product and readiness boundaries remain binding.

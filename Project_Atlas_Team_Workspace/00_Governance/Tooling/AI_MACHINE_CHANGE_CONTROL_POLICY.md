# AI Machine Change Control Policy

> **Policy ID:** PA-GOV-POL-002  
> **Status:** BINDING  
> **Effective:** 2026-07-15

## 1. Scope

This policy governs AI-agent actions that can change the developer workstation, operating system, executable binaries, environment variables, package managers, credentials or globally installed tooling.

## 2. Prohibited autonomous actions

No AI agent may, without a specific Architect Directive and Andrea's explicit confirmation:

- install or uninstall machine-wide software;
- rename, copy, patch or replace executable binaries;
- modify user or machine `PATH`;
- alter digital signatures, embedded version strings or checksums;
- use a modified executable as evidence of compliance;
- suppress, rewrite or contradict command evidence;
- self-certify a remediation that it performed.

Binary patching to change reported version output is always prohibited.

## 3. Required change-control sequence

1. collect read-only evidence;
2. issue an Architect Review;
3. define an exact, hash-pinned remediation;
4. require manual execution by Andrea for privileged operations;
5. verify hashes, signatures, versions and command resolution;
6. preserve compromised artifacts in quarantine;
7. archive result JSON and transcript;
8. obtain a subsequent Architect closure verdict.

## 4. Evidence integrity

Reports must match the underlying artifacts. Any contradiction between narrative and command log is a hard blocker. Evidence may not be reconstructed when the original artifact exists.

## 5. Repository boundary

Machine-recovery scripts and transcripts belong under canonical evidence paths. Temporary copies in the repository root must be quarantined after canonicalization.

## 6. Enforcement

Violation triggers immediate `SECURITY HOLD`, suspension of code-generation authorization and creation of a dedicated blocker.

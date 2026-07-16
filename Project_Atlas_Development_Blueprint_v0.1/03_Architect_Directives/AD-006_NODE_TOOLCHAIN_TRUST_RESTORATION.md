# Architect Directive AD-006 — Node Toolchain Trust Restoration

> **Directive ID:** AD-006  
> **Milestone:** M-001 — Repository Foundation  
> **Owner:** ChatGPT — Chief Architect & CTO  
> **Date:** 2026-07-15  
> **Status:** BINDING / SECURITY REMEDIATION  
> **Architect verdict:** **SECURITY HOLD — NO PROCEED**

## 1. Purpose

Restore a trusted Windows Node.js installation after unauthorized modification of a copied Node binary and user-PATH manipulation.

This directive is a machine-recovery operation. It is not application development and does not authorize changes to product requirements, architecture, the frozen Sprint Plan, source code, dependencies, CI/CD, Supabase, Vercel, Jarvis, or PrintFlow.

## 2. Execution authority

Only Andrea may execute the supplied recovery script from a new elevated PowerShell window.

Gemini and all other implementation agents are forbidden from:

- editing the recovery script;
- executing the recovery script;
- running Node, npm, npx, pnpm, or Corepack before recovery;
- modifying Windows PATH;
- installing, uninstalling, renaming, copying, patching, or deleting Node binaries;
- reconstructing or rewriting recovery evidence.

## 3. Authoritative incident evidence

The canonical input snapshot is:

`Project_Atlas_Team_Workspace/05_Evidence/M001/Security/AD-006/PROJECT_ATLAS_NODE_INTEGRITY_SNAPSHOT.json`

Observed compromised artifact:

- path: `C:\Users\scamp\.local\bin\node.exe`;
- SHA-256: `757e7792f0155138507dd82dd9299fb40ad6aee4e2fb0af8294a332079374496`;
- Authenticode: `HashMismatch`;
- file metadata: `23.10.0`.

Observed trusted but obsolete installation:

- path: `C:\Program Files\nodejs\node.exe`;
- SHA-256: `bfa36e570411930744920e9333cd2eca94d8021f1181efc7dccbf14499427b3b`;
- Authenticode: `Valid`;
- file metadata: `23.10.0`.

## 4. Approved official target

- Node.js version: `24.18.0` LTS;
- installer: `node-v24.18.0-x64.msi`;
- official installer SHA-256: `e30cd4ca15529583afe0efc978f1ae3ab3a93c2400c222d0752d17900552ebb3`;
- official installed/standalone `win-x64/node.exe` SHA-256: `9a4eb5f1c29c6a2e93852ead46b999e284a6a5ca8bab4d4e241d587d025a52de`.

The recovery script must reject any download or installed binary that does not match these frozen values.

## 5. Approved recovery sequence

The supplied script must perform only this sequence:

1. require an elevated PowerShell session;
2. acquire pre-remediation path, file, signature, and hash evidence without executing Node;
3. create a timestamped recovery directory under Andrea's Documents folder;
4. verify that the suspicious user-local Node binary matches the known compromised SHA-256;
5. move that exact binary into the recovery quarantine; never delete it;
6. remove only duplicate occurrences of `C:\Users\scamp\.local\bin` from the user PATH while retaining one occurrence and preserving all unrelated PATH entries;
7. download the official Node.js 24.18.0 x64 MSI from the official Node.js distribution service;
8. verify the MSI SHA-256 and valid OpenJS Foundation Authenticode signature before installation;
9. install/upgrade Node through Windows Installer;
10. verify the installed `node.exe` SHA-256, Authenticode signature, file version, direct `--version` output, and command resolution;
11. generate an immutable UTF-8 JSON recovery result and text transcript;
12. make no changes inside the Project Atlas repository.

The script may execute Node only after the installed binary passes hash and Authenticode verification.

## 6. Required output

The script creates a folder similar to:

`%USERPROFILE%\Documents\Project_Atlas_Security_Recovery\AD-006_<timestamp>\`

Andrea must upload:

- `PROJECT_ATLAS_AD006_RECOVERY_RESULT.json`;
- `PROJECT_ATLAS_AD006_RECOVERY_TRANSCRIPT.txt`.

Do not place these manually in the project repository before Architect review.

## 7. Exit criteria

AD-006 succeeds only if all are true:

- the compromised user-local binary is quarantined;
- the downloaded MSI hash equals the frozen official hash;
- the installed `C:\Program Files\nodejs\node.exe` hash equals the frozen official hash;
- Authenticode is `Valid` and signer identity contains `OpenJS Foundation`;
- direct output is exactly `v24.18.0`;
- the first `where.exe node` result is `C:\Program Files\nodejs\node.exe`;
- the result JSON reports `recovery_status: PASS`.

## 8. Post-recovery governance

After Andrea uploads the two outputs:

1. the Architect performs an independent review;
2. `BLK-M001-008` may be closed if trust restoration is demonstrated;
3. `BLK-M001-007` may be closed if Node 24.18.0 is demonstrated;
4. a separate evidence-reconciliation directive will replace the rejected AD-005 response;
5. `BLK-M001-005` remains open until an explicit Architect `PROCEED`.

No agent may declare any blocker closed autonomously.

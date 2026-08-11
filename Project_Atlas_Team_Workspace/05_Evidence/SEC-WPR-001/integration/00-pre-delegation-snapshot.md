# SEC-WPR-001 Pre-Delegation Snapshot

- Captured by: Atlas TPM
- Date: 2026-08-11 Europe/Rome
- Repository: `G:\Claude\NoLimits3D-website`
- Worktree: `G:\Claude\NoLimits3D-website-sec-wpr-001`
- Branch: `codex/sec-wpr-001`
- HEAD/base: `bb94b169811c69a0487657c38dfb9a0b6d50d64d`
- Local main: `bb94b169811c69a0487657c38dfb9a0b6d50d64d`
- Origin main: `bb94b169811c69a0487657c38dfb9a0b6d50d64d`
- Shared checkout: dirty on `claude/wpr-m1-baseline-inventory` at `a1840d10c5f95903c3e43be6029fc37c0b7a73c5`; untouched
- Node: `v24.18.0`
- pnpm: `9.15.0`
- Documentation Bible tree: `60e1b11dafeb58ab4e4377210820934b0f0b8f13`
- Clean lockfile install: PASS, exit 0, seven workspace projects, 523 packages installed
- Initial dependency audit: FAIL CLOSED, exit 1, 528 registry packages, two unwaived high findings
- High finding 1: `js-yaml@4.3.0`, `GHSA-5p4m-2wfm-xmqj`, patched `>=4.3.1`
- High finding 2: `nanoid@3.3.16`, `GHSA-2v37-7h3g-55p8`, patched `>=3.3.17`
- Existing waived finding: `react-router@7.18.1`, `GHSA-qwww-vcr4-c8h2`, waiver expires 2026-11-04
- Concurrent overlap check: no other registered worktree owns `codex/sec-wpr-001`; shared WPR changes are explicitly forbidden
- Delegation route: Codex Root authorization -> Atlas TPM -> nested Atlas Backend

The packet is `READY`. This snapshot is TPM-owned and must not be edited or staged by the
implementer.

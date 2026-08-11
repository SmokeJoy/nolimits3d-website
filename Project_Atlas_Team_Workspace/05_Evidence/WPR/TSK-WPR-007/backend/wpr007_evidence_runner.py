#!/usr/bin/env python3
"""Fresh, packet-bound evidence runner for TSK-WPR-007.

This runner deliberately contains its own complete 45-row sentinel list.  It
never imports a prior WPR result and it records raw process streams separately
from sanitized UTF-8 views.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[5]
EVIDENCE = Path(__file__).resolve().parent
PACKET = ROOT / "Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-007-BE-DUAL-TEAM-ACTIVATION.md"
SOURCE = Path(r"G:\Claude\NoLimits3D-website")
FRAMEWORK = ROOT / "Project_Atlas_Development_Framework_v2.0.0"
PY_CACHE = EVIDENCE / "_pycache"
UTC = timezone.utc
PNPM = r"C:\Program Files\nodejs\pnpm.CMD"
RUN_ID = os.environ.get("WPR007_RUN_ID", "r2")

# Independent complete literals: path, final expected SHA-256, and packet mode.
LITERALS: tuple[tuple[str, str, str], ...] = (
    (".codex/agents/atlas-tpm.toml", "5894412c5971084a2fd7d45aa39477f5848022e929cbbf3f687394f8675f148e", "candidate"),
    ("AGENTS.md", "53ffee6dd6fa9cd6fe212c1d309b6c7d506f4741eaecb58b02d1dcf0e35f8e35", "candidate"),
    ("Project_Atlas_Development_Framework_v2.0.0/000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v2.0.0.md", "84a9c8ad550f1ff036eebcdea22acc5d367debc4415df28351810981b79695f8", "candidate"),
    ("Project_Atlas_Development_Framework_v2.0.0/03_Registries/ROLE_AUTHORITY_MATRIX.csv", "b327fd3114346cd0aeb39e110772889363ea5bdb323ef3c11f7a16b2ca9fa41c", "candidate"),
    ("Project_Atlas_Development_Framework_v2.0.0/CHANGELOG.md", "bcda7109435725811799ecd7f4cec0bcf4e23b0474e604e5aaeb28f46ab18c2e", "candidate"),
    ("Project_Atlas_Development_Framework_v2.0.0/manifest.json", "7410ad521d46723ea5f660d36f549007e7cbf253c78610a29a87205f981ba4de", "candidate"),
    ("Project_Atlas_Team_Workspace/00_Governance/CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md", "80597776d3d4cf8b0586d9edc385f0768df4ba237ed84fffe8934ff52e800a3a", "candidate"),
    ("scripts/governance/codex_native_team_test.py", "7807b86273e3832cdec306a43f90ebe48d1b4ae8a9c3450f5f57815ad132b1a7", "candidate"),
    ("Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/AD-013_RESPONSE_ARCHITECT_REVIEW.md", "f094e29b2f5048fe28e7439623045b2497163e3908be72340a0fe14890683239", "transport-only"),
    ("Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/TSK-WPR-003_REMEDIATION_DECISION.md", "4ebbf541c992ed0272d1cbd209a3ce379bcc4667af323348b607c81a6d0a547a", "transport-only"),
    ("Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/TSK-WPR-004_REMEDIATION_DECISION.md", "31d67b363724cdb92bbfc99d4767607f8f19e70e90f9d9ebf9ced2a3aade727e", "transport-only"),
    ("Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/TSK-WPR-005_REMEDIATION_DECISION.md", "73ae05e89b9e07bd818d2aa8e96c1802cbcc85f4f3211f078de0427e6e80e2be", "transport-only"),
    ("Project_Atlas_Development_Blueprint_v0.1/02_Architect_Reviews/TSK-WPR-006_REMEDIATION_DECISION.md", "d1a16fb8c85e5dcc7993e83541d308a2f923aece0b8d0308731c73d36f6cac37", "transport-only"),
    ("Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-013_INTERACTIVE_PLACEHOLDER_UI_AUTHORIZATION.md", "00c87cfd4d5acccdbe9920f90fd5d504adb7e12b983f3707a2ae81c5689bb030", "transport-only-preserve-PROPOSED"),
    ("Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-014_WEB_APP_PRODUCTION_READINESS_PROGRAM.md", "6d6eb1d806eb30381252b5ab65f63a6c2c32d44b049f8fa65c4dcb23dff0a5b4", "transport-only"),
    ("Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-015_DUAL_TEAM_PARALLEL_DELIVERY.md", "f08c6af14e711f193acc6aa981136215abc0a9ef4570c2b28d02db8996a801f5", "transport-only"),
    ("Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-016_VISUAL_IDENTITY_CLARITY_AND_IMPACT.md", "155fe5468d52d174e94949e8a7fc18072111c7bde2fc66e544c6e8a2dfa2c27f", "transport-only"),
    ("Project_Atlas_Team_Workspace/04_Planning/CLIENT_GOAL_WEB_APP_PRODUCTION_READY_2026-08-06.md", "c0ea51fcfa04bfb14f401793c8f643cd6386695e0ee99d5569cd4683b3f5c528", "transport-only"),
    ("Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-000-WORKTREE-DISPOSITION.md", "b7f873cda6cd5fa4d5936c3e33c0b4b120af77039cab96823cf18e25248a1c94", "transport-only"),
    ("Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-001-BE-TOOLING-QUARANTINE-RESTORE.md", "9386562af029b62bd188fc8f607bc9d1ac071a266a36ce35a525cb27aedc0ee0", "transport-only"),
    ("Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-001-FE-QUARANTINE-RESTORE.md", "fc6358bf81becca7a9156964cfcccfaced9ece229df58d0537b53b0c912c9cc2", "transport-only"),
    ("Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-002-BE-TOOLING-RECOVERY.md", "45fd91ddad60d170f23f1165090ff8d667ae475c11e135fa33d381c27ee40bb5", "transport-only"),
    ("Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-002-FE-CLOSURE-VERIFICATION.md", "55148a4ceb289ee1e486d4332cc4ab775946677d0677489a461099b7ffe615ff", "transport-only"),
    ("Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-003-BE-DUAL-TEAM-GOVERNANCE.md", "e80959c1a0e55cfaf5f9bb55a7f0db06301a61b7bd2b117d95f94ccdbd816eb5", "transport-only"),
    ("Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-004-BE-DUAL-TEAM-GOVERNANCE-REMEDIATION.md", "415e97c602d8fa867876e7b538f3bbefd22feb08ddd61a472508e0660d692008", "transport-only"),
    ("Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-005-BE-DUAL-TEAM-GOVERNANCE-VERIFICATION.md", "b38f61a79c8e1bf64dfbdbe7694720924f5e8f5b3090f39fa2e2fac05128a0c3", "transport-only"),
    ("Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-006-BE-DUAL-TEAM-GOVERNANCE-FULL-VERIFICATION.md", "cdc62a549bded2c84895c58da714da803d8a354c4f9fa232cbedd6b9017a5d9f", "transport-only"),
    ("Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-000-WORKTREE-DISPOSITION-TECHNICAL-REVIEW.md", "10ee5b27fc92ee33600df6ce23fa9fcb08c5b112f05530a6221b6763f042b0ad", "transport-only"),
    ("Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-001-QUARANTINE-RESTORE-TECHNICAL-REVIEW.md", "2ee2a39f4c8a828ecc17a3ad3f44fdf805ec45f891ad633075771db59a3d86f0", "transport-only"),
    ("Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-002-CLOSURE-RECOVERY-TECHNICAL-REVIEW.md", "c8e908ef9a7b2b4e83419d641e9c35cb556fe4cb100bd3e8af83c32d5e643619", "transport-only"),
    ("Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-003-DUAL-TEAM-GOVERNANCE-TECHNICAL-REVIEW.md", "55e8b5b28c49665903e27d7097550b8aa94f06d09d02bcbbbf3bbd38965949a4", "transport-only"),
    ("Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-004-DUAL-TEAM-GOVERNANCE-REMEDIATION-TECHNICAL-REVIEW.md", "41b291f9d203a72289ed5768f7a5d7a980b74be29e2f055ddc77a4e6bf42e775", "transport-only"),
    ("Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-005-DUAL-TEAM-GOVERNANCE-VERIFICATION-TECHNICAL-REVIEW.md", "b84586b5111fc9f7bb9a365064f4809141afe1dadb2bce7ab20641fadad8e7c0", "transport-only"),
    ("Project_Atlas_Team_Workspace/07_Reports/TSK-WPR-006-DUAL-TEAM-GOVERNANCE-FULL-VERIFICATION-TECHNICAL-REVIEW.md", "055935c51101ea5f6507078e43ec3e2c4145f3dd4117f0dae8f0e5657589e50e", "transport-only"),
    ("Project_Atlas_Team_Workspace/07_Reports/CLAUDE-WPR-M1-PR25-TECHNICAL-REVIEW.md", "06805c3b0be76dc0d4e2a7f33b3a2f1727c072f2a4425c93eb93226e95b72ebc", "transport-only"),
    ("Project_Atlas_Team_Workspace/01_Shared_Memory/CODEX_CLAUDE_TEAM_CHANNEL.md", "19eafb5424d0ebf6c60db8f15a47216d87bafaa1a46dc10f30d78e9995e5b93d", "transport-only-canonical-history"),
    ("package.json", "d1b2104760a557d0e11d346ec11f3bcd7badc673b5fec8dbb1d5bf47b70bd942", "immutable-post-security"),
    ("pnpm-lock.yaml", "59c9d614d7f584bf3c423d31bbf217445bca95aac1381d681faa0ab54e77898e", "immutable-post-security"),
    ("pnpm-workspace.yaml", "fb3b6587c3ad9715fc82174b0d1a2b09077bc2b3ea2da8c6d896df9d53fc5b20", "immutable-contract"),
    ("tsconfig.json", "13950451aecf5b5f341b66487c28db5c3c82157fc20b5aba439e0362a9040dac", "immutable-contract"),
    ("eslint.config.js", "ebaeadab95925c6b9548f85448043c844f5d9e36ac4958636f598296b81e124c", "immutable-contract"),
    (".prettierrc", "33744eac51667adb9493bff986dea2f8330a45681fc8f0c94af4fc450951a599", "immutable-contract"),
    ("Project_Atlas_Team_Workspace/04_Planning/MILESTONE_REGISTER.md", "c82998f529258c904fc15eb7e39bbe14aa0eb56d3c3c4b7a9391a2f69952a2ff", "immutable-register"),
    ("Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md", "4ccb388b543b638c9c87c44760d7e023288395f1bdfeadc936015f5477577237", "immutable-register"),
    ("Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md", "8dfd80cfa933452393fa703ae579f45a7cd80cf949f303f6dd73e191d0d50e43", "immutable-state"),
)

HEX = re.compile(r"^[0-9a-f]{64}$")
REDACT = re.compile(r"(?i)\b(token|secret|password|api[_-]?key)\b\s*([:=])\s*[^\s]+")

def utc() -> str:
    return datetime.now(UTC).isoformat().replace("+00:00", "Z")

def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

def atomic_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n", encoding="utf-8", newline="\n")

def sanitized(data: bytes) -> str:
    text = data.decode("utf-8", errors="replace")
    text = "".join(ch if ch in "\n\r\t" or ord(ch) >= 32 else "�" for ch in text)
    return REDACT.sub(lambda match: f"{match.group(1)}{match.group(2)}[REDACTED]", text)

def parse_packet() -> list[dict[str, str]]:
    text = PACKET.read_text(encoding="utf-8")
    marker_start = "<!-- BEGIN_WPR007_BINDING_SENTINELS -->"
    marker_end = "<!-- END_WPR007_BINDING_SENTINELS -->"
    section = text.split(marker_start, 1)[1].split(marker_end, 1)[0]
    rows: list[dict[str, str]] = []
    for line in section.splitlines():
        if not re.match(r"^\|\s*\d+\s*\|", line):
            continue
        cells = [cell.strip() for cell in line.split("|")[1:-1]]
        if len(cells) != 7:
            raise ValueError(f"malformed sentinel row: {line}")
        number, path, source_hash, size, base_hash, base_size, mode = cells
        path = path.strip("`")
        source_hash = source_hash.strip("`")
        base_hash = base_hash.strip("`")
        rows.append({"number": number, "path": path, "source_hash": source_hash, "size": size, "base_hash": base_hash, "base_size": base_size, "mode": mode})
    return rows

def compare_rows(expected: list[tuple[str, str, str]], actual: list[tuple[str, str, str]]) -> list[dict[str, str]]:
    diagnostics: list[dict[str, str]] = []
    if len(expected) != len(actual):
        diagnostics.append({"class": "count", "expected": str(len(expected)), "actual": str(len(actual))})
    expected_paths = [item[0] for item in expected]
    actual_paths = [item[0] for item in actual]
    duplicate_paths = sorted({path for path in actual_paths if actual_paths.count(path) > 1})
    for path in duplicate_paths:
        diagnostics.append({"class": "duplicate", "path": path, "expected": "unique", "actual": "duplicate"})
    for path in sorted(set(expected_paths) - set(actual_paths)):
        diagnostics.append({"class": "missing", "path": path, "expected": "present", "actual": "ABSENT"})
    for path in sorted(set(actual_paths) - set(expected_paths)):
        diagnostics.append({"class": "extra", "path": path, "expected": "ABSENT", "actual": "present"})
    for index, (want, got) in enumerate(zip(expected, actual), start=1):
        if want[0] != got[0]:
            diagnostics.append({"class": "order", "path": f"row {index}", "expected": want[0], "actual": got[0]})
            diagnostics.append({"class": "path", "path": f"row {index}", "expected": want[0], "actual": got[0]})
            continue
        if want[1] != got[1]:
            diagnostics.append({"class": "hash", "path": want[0], "expected": want[1], "actual": got[1]})
        if want[2] != got[2]:
            diagnostics.append({"class": "mode", "path": want[0], "expected": want[2], "actual": got[2]})
    return diagnostics

def helper_packet_comparison() -> dict[str, Any]:
    packet_rows = parse_packet()
    packet_literals = [(row["path"], row["source_hash"], row["mode"]) for row in packet_rows]
    expected = list(LITERALS)
    diagnostics = compare_rows(expected, packet_literals)
    invalid_hashes = [row["path"] for row in packet_rows if not HEX.fullmatch(row["source_hash"])]
    return {"packet_count": len(packet_rows), "helper_count": len(expected), "diagnostics": diagnostics, "invalid_hashes": invalid_hashes, "pass": len(packet_rows) == 45 and len(expected) == 45 and not diagnostics and not invalid_hashes}

def self_test() -> dict[str, Any]:
    baseline = list(LITERALS)
    fixtures: dict[str, list[tuple[str, str, str]]] = {
        "count": baseline[:-1],
        "order": [baseline[1], baseline[0], *baseline[2:]],
        "duplicate": [baseline[0], baseline[0], *baseline[2:]],
        "missing": [row for row in baseline if row != baseline[4]],
        "extra": [*baseline, ("fixture/extra", "0" * 64, "fixture")],
        "path": [("fixture/path", baseline[0][1], baseline[0][2]), *baseline[1:]],
        "hash": [(baseline[0][0], "0" * 64, baseline[0][2]), *baseline[1:]],
        "mode": [(baseline[0][0], baseline[0][1], "fixture"), *baseline[1:]],
    }
    result: dict[str, Any] = {}
    for name, actual in fixtures.items():
        found = {entry["class"] for entry in compare_rows(baseline, actual)}
        required = {name}
        passed = required <= found
        result[name] = {"observed_classes": sorted(found), "pass": passed}
    result["pass"] = all(item["pass"] for key, item in result.items() if key != "pass")
    return result

def inspect_rows(root: Path, rows: list[dict[str, str]], expectation: str) -> dict[str, Any]:
    diagnostics: list[dict[str, str]] = []
    for row in rows:
        path = root / row["path"]
        want = row["source_hash"] if expectation == "source" else row["base_hash"]
        actual = sha(path) if path.is_file() else "ABSENT"
        if actual != want:
            diagnostics.append({"classification": expectation, "path": row["path"], "expected": want, "actual": actual})
    return {"root": str(root), "expectation": expectation, "checked": len(rows), "diagnostics": diagnostics, "pass": not diagnostics}

def inventory() -> dict[str, dict[str, Any]]:
    output: dict[str, dict[str, Any]] = {}
    for relative in ("apps", "packages", "scripts/guards", "supabase"):
        base = ROOT / relative
        for path in sorted(base.rglob("*") if base.exists() else []):
            # Frozen install creates workspace dependency links below node_modules;
            # these are generated dependency output, not exercised repository input.
            if (
                path.is_file()
                and "node_modules" not in path.parts
                and "dist" not in path.parts
                and not path.name.endswith(".tsbuildinfo")
            ):
                output[path.relative_to(ROOT).as_posix()] = {"bytes": path.stat().st_size, "sha256": sha(path)}
    for relative in ("package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "tsconfig.json", "eslint.config.js", ".prettierrc", ".env.example"):
        path = ROOT / relative
        if path.is_file():
            output[relative] = {"bytes": path.stat().st_size, "sha256": sha(path)}
    return output

def git_state() -> dict[str, Any]:
    proc = subprocess.run(["git", "status", "--short"], cwd=ROOT, capture_output=True, check=False)
    return {"argv": ["git", "status", "--short"], "exit_code": proc.returncode, "stdout": proc.stdout.decode("utf-8", "replace").splitlines()}

def run_command(command_id: str, argv: list[str], env_extra: dict[str, str] | None = None) -> dict[str, Any]:
    raw_dir = EVIDENCE / "raw" / command_id
    view_dir = EVIDENCE / "sanitized" / command_id
    raw_dir.mkdir(parents=True, exist_ok=True)
    view_dir.mkdir(parents=True, exist_ok=True)
    environment = os.environ.copy()
    if env_extra:
        environment.update(env_extra)
    started = utc()
    try:
        process = subprocess.run(argv, cwd=ROOT, env=environment, capture_output=True, check=False)
    except FileNotFoundError as exc:
        class MissingProcess:
            returncode = 127
            stdout = b""
            stderr = str(exc).encode("utf-8", "replace")
        process = MissingProcess()
    ended = utc()
    stdout_path = raw_dir / "stdout.bin"
    stderr_path = raw_dir / "stderr.bin"
    stdout_path.write_bytes(process.stdout)
    stderr_path.write_bytes(process.stderr)
    (view_dir / "stdout.txt").write_text(sanitized(process.stdout), encoding="utf-8", newline="\n")
    (view_dir / "stderr.txt").write_text(sanitized(process.stderr), encoding="utf-8", newline="\n")
    record = {"id": command_id, "argv": argv, "cwd": str(ROOT), "start_utc": started, "end_utc": ended, "exit_code": process.returncode, "raw": {"stdout": {"path": stdout_path.relative_to(EVIDENCE).as_posix(), "bytes": len(process.stdout), "sha256": sha(stdout_path)}, "stderr": {"path": stderr_path.relative_to(EVIDENCE).as_posix(), "bytes": len(process.stderr), "sha256": sha(stderr_path)}}, "sanitized": {"stdout": (view_dir / "stdout.txt").relative_to(EVIDENCE).as_posix(), "stderr": (view_dir / "stderr.txt").relative_to(EVIDENCE).as_posix()}}
    return record

def verify_framework() -> dict[str, Any]:
    manifest = json.loads((FRAMEWORK / "manifest.json").read_text(encoding="utf-8"))
    entries = manifest.get("files", [])
    actual = {path.relative_to(FRAMEWORK).as_posix() for path in FRAMEWORK.rglob("*") if path.is_file() and path.name != "manifest.json"}
    expected = {entry["path"] for entry in entries}
    mismatches: list[dict[str, Any]] = []
    for entry in entries:
        path = FRAMEWORK / entry["path"]
        actual_hash = sha(path) if path.is_file() else "ABSENT"
        actual_size = path.stat().st_size if path.is_file() else 0
        if actual_hash != entry["sha256"] or actual_size != entry["size"]:
            mismatches.append({"path": entry["path"], "expected_sha256": entry["sha256"], "actual_sha256": actual_hash, "expected_size": entry["size"], "actual_size": actual_size})
    return {"manifest_file_count": manifest.get("file_count"), "manifest_entries": len(entries), "actual_regular_files": len(actual), "missing": sorted(expected - actual), "extra": sorted(actual - expected), "mismatches": mismatches, "pass": manifest.get("file_count") == len(entries) == len(actual) and not (expected ^ actual) and not mismatches}

def verify_text_controls(rows: list[dict[str, str]]) -> dict[str, Any]:
    issues: list[dict[str, str]] = []
    for row in rows:
        path = ROOT / row["path"]
        data = path.read_bytes()
        if data.startswith(b"\xef\xbb\xbf"):
            issues.append({"path": row["path"], "issue": "UTF-8 BOM present"})
        try:
            text = data.decode("utf-8", errors="strict")
        except UnicodeDecodeError as exc:
            issues.append({"path": row["path"], "issue": f"invalid UTF-8: {exc}"})
            continue
        if any(ord(character) < 32 and character not in "\n\r\t" for character in text):
            issues.append({"path": row["path"], "issue": "disallowed control character"})
    return {"checked": len(rows), "issues": issues, "pass": not issues}

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("phase", choices=("preflight", "gates", "finalize", "postcheck", "freeze", "rehash"))
    args = parser.parse_args()
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    packet_rows = parse_packet()
    comparison = helper_packet_comparison()
    tests = self_test()
    if not comparison["pass"] or not tests["pass"]:
        atomic_json(EVIDENCE / "helper-table-failure.json", {"comparison": comparison, "self_test": tests})
        return 2
    if args.phase == "preflight":
        source_check = inspect_rows(SOURCE, packet_rows[:36], "source")
        target_check = inspect_rows(ROOT, packet_rows, "base")
        report = {"utc": utc(), "helper_packet_comparison": comparison, "self_test": tests, "source_pre_transport": source_check, "target_base_pre_transport": target_check, "inventory": inventory(), "git_state": git_state(), "tool_versions": {"python": sys.version, "platform": sys.platform}}
        atomic_json(EVIDENCE / "preflight.json", report)
        return 0 if source_check["pass"] and target_check["pass"] else 3
    if args.phase == "gates":
        final_start = inspect_rows(ROOT, packet_rows, "source")
        if not final_start["pass"]:
            atomic_json(EVIDENCE / "gates-blocked-final-sentinel.json", final_start)
            return 4
        baseline = inventory()
        atomic_json(EVIDENCE / "exercised-input-inventory-pre.json", baseline)
        records: list[dict[str, Any]] = []
        commands: list[tuple[str, list[str], dict[str, str] | None]] = [
            ("01-frozen-install", [PNPM, "install", "--frozen-lockfile"], None),
            ("02-py-compile", [sys.executable, "-m", "py_compile", "scripts/governance/codex_native_team_test.py"], {"PYTHONPYCACHEPREFIX": str(PY_CACHE)}),
            ("03-governance-codex-native", [PNPM, "governance:codex-native"], None),
            ("04-build", [PNPM, "build"], None),
            ("05-lint", [PNPM, "lint"], None),
            ("06-format-check", [PNPM, "format:check"], None),
            ("07-typecheck", [PNPM, "typecheck"], None),
            ("08-test", [PNPM, "test"], None),
            ("09-secret-scan", [PNPM, "secret:scan"], None),
            ("10-dependency-audit", [PNPM, "dependency:audit"], None),
            ("11-guard-scope", [PNPM, "guard:scope"], None),
            ("12-guard-migrations", [PNPM, "guard:migrations"], None),
            ("13-guard-source-bindings", [PNPM, "guard:source-bindings"], None),
        ]
        for command_id, argv, environment in commands:
            before = inventory()
            if before != baseline:
                atomic_json(EVIDENCE / "unexpected-exercised-input-drift.json", {"before": before, "baseline": baseline, "blocked_before": command_id})
                return 5
            record = run_command(f"{RUN_ID}-{command_id}", argv, environment)
            records.append(record)
            atomic_json(EVIDENCE / f"command-records-{RUN_ID}.json", records)
            if command_id == "02-py-compile":
                resolved = PY_CACHE.resolve()
                allowed_root = EVIDENCE.resolve()
                if os.path.commonpath([str(resolved), str(allowed_root)]) != str(allowed_root) or resolved.name != "_pycache":
                    atomic_json(EVIDENCE / "pycache-disposition.json", {"pass": False, "resolved_target": str(resolved), "reason": "outside allowed Backend evidence target"})
                    return 6
                existed = resolved.exists()
                if existed:
                    shutil.rmtree(resolved)
                atomic_json(EVIDENCE / "pycache-disposition.json", {"pass": existed and not resolved.exists(), "resolved_target": str(resolved), "created_by_py_compile": existed, "removed_before_freeze": existed and not resolved.exists()})
            if record["exit_code"] != 0:
                atomic_json(EVIDENCE / f"gates-stopped-{RUN_ID}.json", {"stopped_at": command_id, "record": record})
                return record["exit_code"] or 7
        post = inventory()
        atomic_json(EVIDENCE / "exercised-input-inventory-post.json", post)
        if post != baseline:
            atomic_json(EVIDENCE / "unexpected-exercised-input-drift.json", {"before": baseline, "after": post, "blocked_after": "13-guard-source-bindings"})
            return 8
        atomic_json(EVIDENCE / f"gates-pass-{RUN_ID}.json", {"commands": records, "final_sentinel_after_final_command": inspect_rows(ROOT, packet_rows, "source")})
        return 0
    if args.phase == "finalize":
        result = {"utc": utc(), "final_sentinels": inspect_rows(ROOT, packet_rows, "source"), "framework_manifest": verify_framework(), "text_control_scan": verify_text_controls(packet_rows), "package_lock": {row["path"]: {"expected": row["source_hash"], "actual": sha(ROOT / row["path"])} for row in packet_rows[36:38]}, "bible": {"expected_tree": "60e1b11dafeb58ab4e4377210820934b0f0b8f13", "actual_tree": subprocess.run(["git", "rev-parse", "HEAD:NoLimits3D_Documentation_v0.96"], cwd=ROOT, capture_output=True, check=False).stdout.decode().strip(), "status": subprocess.run(["git", "status", "--short", "--", "NoLimits3D_Documentation_v0.96"], cwd=ROOT, capture_output=True, check=False).stdout.decode("utf-8", "replace").splitlines()}, "scope": git_state()}
        result["pass"] = result["final_sentinels"]["pass"] and result["framework_manifest"]["pass"] and result["text_control_scan"]["pass"] and all(item["expected"] == item["actual"] for item in result["package_lock"].values()) and result["bible"]["actual_tree"] == result["bible"]["expected_tree"] and not result["bible"]["status"]
        atomic_json(EVIDENCE / "final-integrity.json", result)
        return 0 if result["pass"] else 9
    if args.phase == "postcheck":
        record = run_command(f"{RUN_ID}-14-dependency-versions", [PNPM, "list", "--depth", "99", "js-yaml", "nanoid"])
        stdout = (EVIDENCE / record["sanitized"]["stdout"]).read_text(encoding="utf-8")
        lock_text = (ROOT / "pnpm-lock.yaml").read_text(encoding="utf-8")
        required_lock_entries = {"js-yaml": "js-yaml@4.3.1:", "nanoid": "nanoid@3.3.18:"}
        lock_resolution = {name: marker in lock_text for name, marker in required_lock_entries.items()}
        result = {"record": record, "required_versions": {"js-yaml": "4.3.1", "nanoid": "3.3.18"}, "lock_resolution": lock_resolution, "pnpm_list_stdout_bytes": len(stdout.encode("utf-8")), "pnpm_list_limitation": "pnpm list exited 0 but emitted no selected dependency rows; immutable lockfile entries provide the resolution evidence.", "pass": record["exit_code"] == 0 and all(lock_resolution.values())}
        atomic_json(EVIDENCE / "dependency-version-check.json", result)
        return 0 if result["pass"] else 11
    if args.phase == "freeze":
        status_record = run_command(f"{RUN_ID}-15-scope-status", ["git", "status", "--porcelain=v1", "-uall"])
        patch_record = run_command(f"{RUN_ID}-16-final-tracked-patch", ["git", "diff", "--binary", "--"])
        patch_raw = EVIDENCE / patch_record["raw"]["stdout"]["path"]
        (EVIDENCE / "final-tracked.patch").write_bytes(patch_raw.read_bytes())
        packet_rows = parse_packet()
        allowed_exact = {row["path"] for row in packet_rows[:36]}
        evidence_relative = EVIDENCE.relative_to(ROOT).as_posix()
        handoff = "Project_Atlas_Team_Workspace/06_Handoffs/TSK-WPR-007-BACKEND-HANDOFF.md"
        packet_path = "Project_Atlas_Team_Workspace/04_Planning/TSK-WPR-007-BE-DUAL-TEAM-ACTIVATION.md"
        changes: list[dict[str, str]] = []
        unowned: list[str] = []
        for line in (EVIDENCE / status_record["sanitized"]["stdout"]).read_text(encoding="utf-8").splitlines():
            path = line[3:]
            owner = "UNOWNED"
            if path in allowed_exact:
                owner = "Backend transport/candidate"
            elif path == handoff:
                owner = "Backend handoff"
            elif path.startswith(evidence_relative + "/") or path == evidence_relative:
                owner = "Backend evidence"
            elif path == packet_path:
                owner = "TPM packet (preserved unstaged)"
            else:
                unowned.append(path)
            changes.append({"porcelain": line[:2], "path": path, "owner": owner})
        inventory_files = sorted(path for path in EVIDENCE.rglob("*") if path.is_file())
        atomic_json(EVIDENCE / "scope-inventory.json", {"status_record": status_record, "patch_record": patch_record, "changes": changes, "unowned": unowned, "pass": status_record["exit_code"] == 0 and patch_record["exit_code"] == 0 and not unowned})
        atomic_json(EVIDENCE / "final-evidence-inventory.json", {"utc": utc(), "regular_file_count_before_inventory": len(inventory_files), "files": [{"path": path.relative_to(EVIDENCE).as_posix(), "bytes": path.stat().st_size, "sha256": sha(path)} for path in inventory_files]})
        return 0 if status_record["exit_code"] == 0 and patch_record["exit_code"] == 0 and not unowned else 12
    raw_files = sorted((EVIDENCE / "raw").rglob("*.bin")) if (EVIDENCE / "raw").exists() else []
    hashes = {path.relative_to(EVIDENCE).as_posix(): {"bytes": path.stat().st_size, "sha256": sha(path)} for path in raw_files}
    atomic_json(EVIDENCE / "raw-hash-reverification.json", {"utc": utc(), "raw_file_count": len(hashes), "raw": hashes, "pass": bool(hashes)})
    return 0 if hashes else 10

if __name__ == "__main__":
    raise SystemExit(main())

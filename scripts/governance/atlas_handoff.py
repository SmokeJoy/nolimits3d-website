#!/usr/bin/env python3
"""Project Atlas governed handoff tool v1.5.

Standard-library only. It validates complete handoff contracts, audits the
repository root, applies payloads without extraction, preserves replacements,
and builds a single active package from canonical files.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import sys
import tempfile
import zipfile
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from typing import Any

META = "__ATLAS_HANDOFF__"
PAYLOAD = "payload"
CURRENT_ZIP = "PROJECT_ATLAS_CURRENT_HANDOFF.zip"
QUARANTINE_ROOT = Path("Project_Atlas_Team_Workspace/99_DELETE_QUARANTINE")
ARCHIVE_ROOT = Path("Project_Atlas_Team_Workspace/06_Handoffs/Archive")
PROTECTED_PREFIXES = (
    "NoLimits3D_Documentation_v0.96/",
    "Project_Atlas_Development_Framework_v1.0/",
    "Project_Atlas_Development_Blueprint_v0.1/",
    ".git/",
)
PRE_M001_ROOT = {
    "NoLimits3D_Documentation_v0.96",
    "Project_Atlas_Development_Framework_v1.0",
    "Project_Atlas_Development_Blueprint_v0.1",
    "Project_Atlas_Team_Workspace",
    "000_PROJECT_STATE.md",
    "001_SESSION_HANDOFF.md",
    "002_PROJECT_DNA.md",
    "scripts",
    ".git",
    CURRENT_ZIP,
}
M001_EXECUTION_EXTRA = {
    ".github", "apps", "packages", "supabase", "docs",
    ".gitignore", ".gitattributes", ".editorconfig", ".nvmrc",
    "package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "tsconfig.json",
    "eslint.config.js", "eslint.config.mjs", "eslint.config.cjs",
    ".prettierrc", ".prettierrc.json", ".prettierrc.yml", ".prettierrc.yaml",
    "README.md", "LICENSE", "LICENSE.md", "LICENSE.txt",
}
ROOT_PROFILES = {
    "pre-m001": PRE_M001_ROOT,
    "m001-execution": PRE_M001_ROOT | M001_EXECUTION_EXTRA,
}
REQUIRED_MANIFEST = {
    "schema_version", "handoff_id", "package_name", "sender", "recipient",
    "created_at", "milestone", "sprint", "task", "baseline_references",
    "blueprint_references", "files", "tests", "evidence", "blockers",
    "assumptions", "deviations", "root_cleanliness_declared",
    "root_audit_reference", "root_audit_profile",
    "canonical_report_reference", "required_evidence",
}
REQUIRED_MANIFEST_V14 = REQUIRED_MANIFEST | {"evidence_profile"}
REQUIRED_MANIFEST_V15 = REQUIRED_MANIFEST_V14
AD005_PLAN_PATH = "Project_Atlas_Team_Workspace/04_Planning/M001_SPRINT_PLAN_FINAL.md"
AD005_PLAN_SHA256 = "ebc30011b94258db4506fd7006a94aaeb3210bb95cdabf22b533580ecee05b01"
AD005_REQUIRED_EVIDENCE = {
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-005/root_audit.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-005/tree_final_clean.txt",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-005/PACKAGE_VALIDATION.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_24_18_0_OFFICIAL_VERIFICATION.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_LOCAL_RUNTIME.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Planning/M001_PLAN_INTEGRITY.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_APPLICATION_LOG.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_MANIFEST.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_BOOTSTRAP_DEVIATION.md",
    "Project_Atlas_Team_Workspace/06_Handoffs/AD-005-RESPONSE-REPORT.md",
    "000_PROJECT_STATE.md",
    "001_SESSION_HANDOFF.md",
    "Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md",
    "Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md",
    "Project_Atlas_Team_Workspace/04_Planning/SPRINT_REGISTER.md",
    "Project_Atlas_Team_Workspace/06_Handoffs/HANDOFF_LOG.md",
}

AD007_PLAN_SHA256 = "4d0bfd0bc747011dcb3bef3e3e87472c23ff12815b6f1952c0c87c7855ebf219"
AD007_REQUIRED_EVIDENCE = {
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-007/root_audit.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-007/tree_final_clean.txt",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-007/PACKAGE_VALIDATION.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_24_18_0_OFFICIAL_VERIFICATION.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_LOCAL_RUNTIME.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Planning/M001_PLAN_INTEGRITY.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_APPLICATION_LOG.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_MANIFEST.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_BOOTSTRAP_DEVIATION.md",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Security/AD-006/PROJECT_ATLAS_NODE_INTEGRITY_SNAPSHOT.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Security/AD-006/PROJECT_ATLAS_AD006_RECOVERY_RESULT.json",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Security/AD-006/PROJECT_ATLAS_AD006_RECOVERY_TRANSCRIPT.txt",
    "Project_Atlas_Team_Workspace/05_Evidence/M001/Security/AD-006/SECURITY_INCIDENT_CLOSURE.md",
    "Project_Atlas_Team_Workspace/04_Planning/M001_SPRINT_PLAN_FINAL.md",
    "Project_Atlas_Team_Workspace/00_Governance/Tooling/GITHUB_GOVERNANCE_PLAN.md",
    "Project_Atlas_Team_Workspace/06_Handoffs/AD-007-RESPONSE-REPORT.md",
    "000_PROJECT_STATE.md",
    "001_SESSION_HANDOFF.md",
    "Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md",
    "Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md",
    "Project_Atlas_Team_Workspace/04_Planning/SPRINT_REGISTER.md",
    "Project_Atlas_Team_Workspace/06_Handoffs/HANDOFF_LOG.md",
}

EVIDENCE_PROFILES = {
    "AD-005-EVIDENCE-CLOSURE": AD005_REQUIRED_EVIDENCE,
    "AD-007-EVIDENCE-REBASE": AD007_REQUIRED_EVIDENCE,
}
REPORT_HEADINGS = (
    "## Done", "## Not Done", "## File Actions", "## Validation and Tests",
    "## Risks, Debt, Waivers and Blockers", "## Decisions Required",
    "## Final Status",
)
FORBIDDEN_PAYLOAD_PARTS = {
    "node_modules", ".git", "dist", "build", "coverage", ".cache", "__pycache__"
}


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def tree_digest(path: Path) -> str:
    h = hashlib.sha256()
    if path.is_file():
        return sha256_file(path)
    for item in sorted((p for p in path.rglob("*") if p.is_file()), key=lambda p: p.relative_to(path).as_posix()):
        rel = item.relative_to(path).as_posix().encode("utf-8")
        h.update(len(rel).to_bytes(8, "big")); h.update(rel)
        digest = bytes.fromhex(sha256_file(item))
        h.update(digest)
    return h.hexdigest()


def safe_rel(value: str) -> Path:
    p = PurePosixPath(value)
    if p.is_absolute() or ".." in p.parts or not p.parts:
        raise ValueError(f"Unsafe path: {value}")
    return Path(*p.parts)


def audit_root(repo: Path, profile: str = "pre-m001", allow_current_zip: bool = True) -> dict[str, Any]:
    if profile not in ROOT_PROFILES:
        raise ValueError(f"Unknown root audit profile: {profile}")
    allowed_names = set(ROOT_PROFILES[profile])
    violations: list[str] = []
    entries: list[dict[str, Any]] = []
    for item in sorted(repo.iterdir(), key=lambda p: p.name.lower()):
        name = item.name
        allowed = name in allowed_names
        reason = None
        if name == CURRENT_ZIP and not allow_current_zip:
            allowed = False
            reason = "active handoff ZIP disallowed for this audit"
        if profile == "pre-m001" and name == "scripts" and item.is_dir():
            unexpected = []
            for child in sorted(item.iterdir(), key=lambda p: p.name.lower()):
                if child.name != "governance":
                    unexpected.append(child.relative_to(repo).as_posix() + ("/" if child.is_dir() else ""))
            gov = item / "governance"
            if gov.exists() and gov.is_dir():
                for child in sorted(gov.iterdir(), key=lambda p: p.name.lower()):
                    if child.is_dir() or child.name != "atlas_handoff.py":
                        unexpected.append(child.relative_to(repo).as_posix() + ("/" if child.is_dir() else ""))
            elif item.exists():
                unexpected.append("scripts/governance/ (missing)")
            if unexpected:
                allowed = False
                reason = "pre-m001 permits only scripts/governance/atlas_handoff.py"
                violations.extend(unexpected)
        entries.append({
            "path": name,
            "type": "directory" if item.is_dir() else "file",
            "allowed": allowed,
            "reason": reason,
        })
        if not allowed:
            root_violation = name + ("/" if item.is_dir() else "")
            if root_violation not in violations:
                violations.append(root_violation)
    return {
        "schema_version": "1.2",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "repo": str(repo),
        "profile": profile,
        "allow_current_zip": allow_current_zip,
        "entries": entries,
        "violations": violations,
        "ok": not violations,
    }


def load_zip_metadata(zf: zipfile.ZipFile) -> tuple[dict[str, Any], dict[str, Any], str]:
    required = {f"{META}/HANDOFF_MANIFEST.json", f"{META}/DELETION_PLAN.json", f"{META}/REPORT.md"}
    missing = sorted(required - set(zf.namelist()))
    if missing:
        raise ValueError(f"Missing metadata files: {missing}")
    return (
        json.loads(zf.read(f"{META}/HANDOFF_MANIFEST.json")),
        json.loads(zf.read(f"{META}/DELETION_PLAN.json")),
        zf.read(f"{META}/REPORT.md").decode("utf-8"),
    )


def _payload_json(zf: zipfile.ZipFile, rel: str, listed: dict[str, Any], errors: list[str]) -> Any:
    if rel not in listed:
        return None
    try:
        return json.loads(zf.read(f"{PAYLOAD}/{rel}"))
    except Exception as exc:
        errors.append(f"Invalid profile JSON {rel}: {exc}")
        return None



def validate_ad007_profile(zf: zipfile.ZipFile, manifest: dict[str, Any], listed: dict[str, Any], errors: list[str]) -> None:
    expected_report = "Project_Atlas_Team_Workspace/06_Handoffs/AD-007-RESPONSE-REPORT.md"
    expected_audit = "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-007/root_audit.json"
    if manifest.get("canonical_report_reference") != expected_report:
        errors.append(f"AD-007 canonical report must be {expected_report}")
    if manifest.get("root_audit_reference") != expected_audit:
        errors.append(f"AD-007 root audit reference must be {expected_audit}")

    audit = _payload_json(zf, expected_audit, listed, errors)
    if isinstance(audit, dict):
        if audit.get("ok") is not True or audit.get("violations") != []:
            errors.append("AD-007 root audit must declare ok=true and violations=[]")
        if audit.get("profile") != "pre-m001":
            errors.append("AD-007 root audit must use pre-m001")
        if audit.get("allow_current_zip") is not False:
            errors.append("AD-007 root audit must be generated with --disallow-current-zip")

    validation_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-007/PACKAGE_VALIDATION.json"
    validation = _payload_json(zf, validation_path, listed, errors)
    if isinstance(validation, dict):
        if validation.get("ok") is not True or validation.get("errors") not in ([], None):
            errors.append("AD-007 embedded pre-final package validation must pass")
        if validation.get("validation_stage") not in {"pre_final", "embedded_pre_final"}:
            errors.append("AD-007 PACKAGE_VALIDATION.json must identify a pre-final stage")
        if validation.get("validated_package_name") != CURRENT_ZIP:
            errors.append(f"AD-007 PACKAGE_VALIDATION.json must reference {CURRENT_ZIP}")
        if validation.get("validated_schema_version") != "1.5":
            errors.append("AD-007 PACKAGE_VALIDATION.json must record schema 1.5")

    plan_rel = AD005_PLAN_PATH
    if plan_rel in listed:
        plan_bytes = zf.read(f"{PAYLOAD}/{plan_rel}")
        if sha256_bytes(plan_bytes) != AD007_PLAN_SHA256:
            errors.append("AD-007 payload plan does not match the Architect rc3 SHA-256")
        try:
            plan_text = plan_bytes.decode("utf-8")
            if "1.0.0-rc3" not in plan_text or "@SmokeJoy" not in plan_text:
                errors.append("AD-007 plan lacks rc3 identity resolution")
            if "@<ANDREA_GITHUB_HANDLE>" in plan_text:
                errors.append("AD-007 plan contains unresolved GitHub placeholder")
        except UnicodeDecodeError:
            pass

    plan_evidence_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Planning/M001_PLAN_INTEGRITY.json"
    plan = _payload_json(zf, plan_evidence_path, listed, errors)
    if isinstance(plan, dict):
        if plan.get("file_path") != AD005_PLAN_PATH:
            errors.append("AD-007 plan integrity references the wrong path")
        if plan.get("expected_sha256") != AD007_PLAN_SHA256 or plan.get("actual_sha256") != AD007_PLAN_SHA256:
            errors.append("AD-007 plan integrity does not prove the rc3 SHA-256")
        if plan.get("match") is not True or plan.get("status") != "PASS":
            errors.append("AD-007 plan integrity must declare match=true and status=PASS")

    local_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_LOCAL_RUNTIME.json"
    local = _payload_json(zf, local_path, listed, errors)
    if isinstance(local, dict):
        if local.get("required_version") != "v24.18.0" or local.get("detected_version") != "v24.18.0":
            errors.append("AD-007 local Node evidence must prove v24.18.0")
        if local.get("compliant") is not True:
            errors.append("AD-007 local Node evidence must declare compliant=true")
        if local.get("installed_node_sha256") != "9a4eb5f1c29c6a2e93852ead46b999e284a6a5ca8bab4d4e241d587d025a52de":
            errors.append("AD-007 local Node SHA-256 is not the frozen trusted hash")
        if local.get("authenticode_status") != "Valid":
            errors.append("AD-007 local Node Authenticode status must be Valid")
        if "OpenJS Foundation" not in str(local.get("signer_subject", "")):
            errors.append("AD-007 local Node signer must be OpenJS Foundation")
        paths = local.get("executable_paths")
        if paths != [r"C:\Program Files\nodejs\node.exe"]:
            errors.append("AD-007 local Node command resolution must contain one trusted path")
        if local.get("node_version_raw_output") != "v24.18.0":
            errors.append("AD-007 local Node raw version output must be v24.18.0")

    recovery_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Security/AD-006/PROJECT_ATLAS_AD006_RECOVERY_RESULT.json"
    recovery = _payload_json(zf, recovery_path, listed, errors)
    if isinstance(recovery, dict):
        post = recovery.get("post_state", {})
        installed = post.get("installed_node", {}) if isinstance(post, dict) else {}
        if recovery.get("recovery_status") != "PASS":
            errors.append("AD-006 recovery result must be PASS")
        if post.get("direct_version_output") != "v24.18.0":
            errors.append("AD-006 post-state version must be v24.18.0")
        if post.get("where_node") != [r"C:\Program Files\nodejs\node.exe"]:
            errors.append("AD-006 post-state command resolution is not singular/trusted")
        if post.get("suspect_node_exists") is not False:
            errors.append("AD-006 post-state must show suspect_node_exists=false")
        if installed.get("sha256") != "9a4eb5f1c29c6a2e93852ead46b999e284a6a5ca8bab4d4e241d587d025a52de":
            errors.append("AD-006 installed Node hash mismatch")
        if installed.get("authenticode_status") != "Valid":
            errors.append("AD-006 installed Node signature must be Valid")

    github_rel = "Project_Atlas_Team_Workspace/00_Governance/Tooling/GITHUB_GOVERNANCE_PLAN.md"
    if github_rel in listed:
        github_text = zf.read(f"{PAYLOAD}/{github_rel}").decode("utf-8")
        if "@SmokeJoy" not in github_text or "@<ANDREA_GITHUB_HANDLE>" in github_text:
            errors.append("GitHub governance plan does not contain the resolved owner")
        if "replace `@SmokeJoy`" in github_text:
            errors.append("GitHub governance plan still describes @SmokeJoy as a placeholder")

    blocker_rel = "Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md"
    if blocker_rel in listed:
        blocker_text = zf.read(f"{PAYLOAD}/{blocker_rel}").decode("utf-8")
        required_states = {
            "BLK-M001-001": "CLOSED",
            "BLK-M001-003": "OPEN",
            "BLK-M001-005": "OPEN",
            "BLK-M001-007": "CLOSED",
            "BLK-M001-008": "CLOSED",
        }
        for blocker_id, state in required_states.items():
            lines = [line for line in blocker_text.splitlines() if blocker_id in line]
            if len(lines) != 1 or f"| {state}" not in lines[0]:
                errors.append(f"Blocker register state mismatch for {blocker_id}")

    app_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_APPLICATION_LOG.json"
    app = _payload_json(zf, app_path, listed, errors)
    if not isinstance(app, list) or not app:
        errors.append("AD-002 application log must be the non-empty archived operation log")
    elif not any(isinstance(x, dict) and x.get("action") in {"payload", "quarantine", "delete"} for x in app):
        errors.append("AD-002 application log lacks governed operation entries")

    q_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_MANIFEST.json"
    qdoc = _payload_json(zf, q_path, listed, errors)
    if isinstance(qdoc, dict):
        if qdoc.get("handoff_id") != "AD-002-20260715-M001-CORRECTION":
            errors.append("AD-002 quarantine manifest has the wrong handoff_id")
        entries = qdoc.get("entries")
        if not isinstance(entries, list):
            errors.append("AD-002 quarantine manifest entries must be a list")
        else:
            temp = [x for x in entries if isinstance(x, dict) and x.get("source") == "temp_handoff"]
            if not temp or temp[0].get("sha256", "not-null") is not None:
                errors.append("AD-002 quarantine manifest must preserve the temp_handoff null digest evidence")


def validate_evidence_profile(zf: zipfile.ZipFile, manifest: dict[str, Any], listed: dict[str, Any], errors: list[str]) -> None:
    profile = manifest.get("evidence_profile")
    if profile not in EVIDENCE_PROFILES:
        errors.append(f"Unknown or missing evidence_profile: {profile}")
        return
    required = EVIDENCE_PROFILES[profile]
    declared = set(manifest.get("required_evidence", []))
    missing_declared = sorted(required - declared)
    if missing_declared:
        errors.append(f"Evidence profile {profile} missing required_evidence: {missing_declared}")
    missing_payload = sorted(required - set(listed))
    if missing_payload:
        errors.append(f"Evidence profile {profile} missing payload files: {missing_payload}")
    if profile == "AD-007-EVIDENCE-REBASE":
        validate_ad007_profile(zf, manifest, listed, errors)
        return
    if profile != "AD-005-EVIDENCE-CLOSURE":
        return

    expected_report = "Project_Atlas_Team_Workspace/06_Handoffs/AD-005-RESPONSE-REPORT.md"
    if manifest.get("canonical_report_reference") != expected_report:
        errors.append(f"AD-005 canonical report must be {expected_report}")
    expected_audit = "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-005/root_audit.json"
    if manifest.get("root_audit_reference") != expected_audit:
        errors.append(f"AD-005 root audit reference must be {expected_audit}")

    audit = _payload_json(zf, expected_audit, listed, errors)
    if isinstance(audit, dict):
        if audit.get("ok") is not True or audit.get("violations") != []:
            errors.append("AD-005 root audit must declare ok=true and violations=[]")
        if audit.get("profile") != "pre-m001":
            errors.append("AD-005 root audit must use pre-m001")
        if audit.get("allow_current_zip") is not False:
            errors.append("AD-005 root audit must be generated with --disallow-current-zip")

    validation_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Root_Audit/AD-005/PACKAGE_VALIDATION.json"
    validation = _payload_json(zf, validation_path, listed, errors)
    if isinstance(validation, dict):
        if validation.get("ok") is not True or validation.get("errors") not in ([], None):
            errors.append("Embedded pre-final package validation must pass")
        if validation.get("validation_stage") not in {"pre_final", "embedded_pre_final"}:
            errors.append("PACKAGE_VALIDATION.json must identify a pre-final validation stage")
        if validation.get("validated_package_name") != CURRENT_ZIP:
            errors.append(f"PACKAGE_VALIDATION.json must reference {CURRENT_ZIP}")
        if validation.get("validated_schema_version") != "1.4":
            errors.append("PACKAGE_VALIDATION.json must record schema 1.4")

    official_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_24_18_0_OFFICIAL_VERIFICATION.json"
    official = _payload_json(zf, official_path, listed, errors)
    if isinstance(official, dict):
        if official.get("target_version") != "v24.18.0" or official.get("officially_available") is not True:
            errors.append("Official Node evidence must verify v24.18.0 as officially available")
        if not official.get("release_date") or not official.get("lts_status") or not official.get("retrieved_at"):
            errors.append("Official Node evidence lacks release date, LTS status or retrieval timestamp")
        sources = official.get("official_sources")
        if not isinstance(sources, list) or len(sources) < 2 or not official.get("shasums_source"):
            errors.append("Official Node evidence requires at least two official sources and SHASUMS source")

    local_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Platform/NODE_LOCAL_RUNTIME.json"
    local = _payload_json(zf, local_path, listed, errors)
    if isinstance(local, dict):
        required_version = local.get("required_version")
        detected_version = local.get("detected_version")
        compliant = local.get("compliant")
        if required_version != "v24.18.0" or not isinstance(detected_version, str) or not detected_version:
            errors.append("Local Node evidence must contain required and detected versions")
        elif compliant is not (detected_version == required_version):
            errors.append("Local Node compliant flag is inconsistent with detected version")
        if not local.get("node_version_raw_output") or not local.get("where_node_raw_output"):
            errors.append("Local Node evidence must include raw node --version and where.exe node output")

    plan_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Planning/M001_PLAN_INTEGRITY.json"
    plan = _payload_json(zf, plan_path, listed, errors)
    if isinstance(plan, dict):
        if plan.get("file_path") != AD005_PLAN_PATH:
            errors.append("Plan integrity evidence references the wrong plan path")
        if plan.get("expected_sha256") != AD005_PLAN_SHA256 or plan.get("actual_sha256") != AD005_PLAN_SHA256:
            errors.append("Plan integrity evidence does not prove the frozen SHA-256")
        if plan.get("match") is not True or plan.get("status") != "PASS":
            errors.append("Plan integrity evidence must declare match=true and status=PASS")

    app_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_APPLICATION_LOG.json"
    app = _payload_json(zf, app_path, listed, errors)
    if not isinstance(app, list) or not app:
        errors.append("AD-002 application log must be the non-empty archived operation log, not a synthetic summary")
    elif not any(isinstance(x, dict) and x.get("action") in {"payload", "quarantine", "delete"} for x in app):
        errors.append("AD-002 application log lacks governed operation entries")

    q_path = "Project_Atlas_Team_Workspace/05_Evidence/M001/Handoffs/AD-002_QUARANTINE_MANIFEST.json"
    qdoc = _payload_json(zf, q_path, listed, errors)
    if isinstance(qdoc, dict):
        if qdoc.get("handoff_id") != "AD-002-20260715-M001-CORRECTION":
            errors.append("AD-002 quarantine manifest has the wrong handoff_id")
        entries = qdoc.get("entries")
        if not isinstance(entries, list):
            errors.append("AD-002 quarantine manifest entries must be a list")
        else:
            temp = [x for x in entries if isinstance(x, dict) and x.get("source") == "temp_handoff"]
            if not temp or temp[0].get("sha256", "not-null") is not None:
                errors.append("AD-002 quarantine manifest must preserve the temp_handoff null digest evidence")


def validate_zip(zip_path: Path) -> dict[str, Any]:
    errors: list[str] = []
    with zipfile.ZipFile(zip_path) as zf:
        try:
            manifest, deletion, report = load_zip_metadata(zf)
        except Exception as exc:
            return {"ok": False, "errors": [str(exc)]}
        for name in zf.namelist():
            try: safe_rel(name.rstrip("/"))
            except ValueError as exc: errors.append(str(exc))
        schema_version = manifest.get("schema_version")
        required_manifest = REQUIRED_MANIFEST_V15 if schema_version in {"1.4", "1.5"} else REQUIRED_MANIFEST
        missing_fields = sorted(required_manifest - set(manifest))
        if missing_fields: errors.append(f"Manifest missing fields: {missing_fields}")
        if manifest.get("package_name") != CURRENT_ZIP:
            errors.append(f"package_name must be {CURRENT_ZIP}")
        if schema_version not in {"1.3", "1.4", "1.5"}:
            errors.append("schema_version must be 1.3, 1.4 or 1.5")
        for field in ("baseline_references", "blueprint_references"):
            if field in manifest and (not isinstance(manifest[field], list) or not manifest[field]):
                errors.append(f"{field} must be a non-empty list")
        for field in ("tests", "evidence", "required_evidence", "blockers", "assumptions", "deviations"):
            if field in manifest and not isinstance(manifest[field], list):
                errors.append(f"{field} must be a list")
        if isinstance(manifest.get("required_evidence"), list) and not manifest["required_evidence"]:
            errors.append("required_evidence must be a non-empty list")
        if manifest.get("root_cleanliness_declared") is True and not manifest.get("root_audit_reference"):
            errors.append("root_cleanliness_declared=true requires root_audit_reference")
        for heading in REPORT_HEADINGS:
            if heading not in report: errors.append(f"REPORT.md missing heading: {heading}")
        listed = {entry.get("path"): entry for entry in manifest.get("files", []) if isinstance(entry, dict)}
        payload_names = {n[len(PAYLOAD)+1:] for n in zf.namelist() if n.startswith(PAYLOAD+"/") and not n.endswith("/")}
        if payload_names != set(listed):
            errors.append(f"Payload/manifest mismatch: unlisted={sorted(payload_names-set(listed))}, missing={sorted(set(listed)-payload_names)}")
        for rel, entry in listed.items():
            try:
                p = safe_rel(rel)
                if any(part in FORBIDDEN_PAYLOAD_PARTS for part in p.parts):
                    errors.append(f"Forbidden payload path: {rel}")
                if p.name == ".env": errors.append(f"Secret-bearing .env forbidden: {rel}")
                data = zf.read(f"{PAYLOAD}/{rel}")
            except Exception as exc:
                errors.append(f"Cannot read payload {rel}: {exc}"); continue
            if len(data) != entry.get("size"): errors.append(f"Size mismatch: {rel}")
            if sha256_bytes(data) != entry.get("sha256"): errors.append(f"SHA-256 mismatch: {rel}")
            if p.suffix.lower() in {".json", ".md", ".txt"}:
                try:
                    data.decode("utf-8")
                except UnicodeDecodeError:
                    errors.append(f"Evidence text must be UTF-8: {rel}")

        evidence = manifest.get("evidence", [])
        required_evidence = manifest.get("required_evidence", [])
        if isinstance(evidence, list):
            for rel in evidence:
                if rel not in listed:
                    errors.append(f"Evidence path missing from payload/manifest: {rel}")
        if isinstance(required_evidence, list):
            for rel in required_evidence:
                if rel not in evidence:
                    errors.append(f"Required evidence not listed in evidence: {rel}")
                if rel not in listed:
                    errors.append(f"Required evidence missing from payload/manifest: {rel}")

        if manifest.get("schema_version") in {"1.4", "1.5"}:
            validate_evidence_profile(zf, manifest, listed, errors)

        canonical_report = manifest.get("canonical_report_reference", "")
        if not isinstance(canonical_report, str) or not canonical_report.endswith(".md"):
            errors.append("canonical_report_reference must point to a Markdown payload file")
        elif canonical_report not in listed:
            errors.append("canonical_report_reference must be included in payload/manifest files")
        else:
            try:
                canonical_bytes = zf.read(f"{PAYLOAD}/{canonical_report}")
                meta_bytes = zf.read(f"{META}/REPORT.md")
                canonical_bytes.decode("utf-8")
                if canonical_bytes != meta_bytes:
                    errors.append("Canonical report is not byte-identical to __ATLAS_HANDOFF__/REPORT.md")
            except Exception as exc:
                errors.append(f"Invalid canonical report: {exc}")

        if manifest.get("root_cleanliness_declared") is True:
            audit_ref = manifest.get("root_audit_reference", "")
            profile = manifest.get("root_audit_profile")
            if profile not in ROOT_PROFILES:
                errors.append(f"Invalid root_audit_profile: {profile}")
            if not isinstance(audit_ref, str) or not audit_ref.endswith(".json"):
                errors.append("root_audit_reference must point to a JSON audit evidence file")
            elif audit_ref not in listed:
                errors.append("root_audit_reference must be included in payload/manifest files")
            elif audit_ref not in manifest.get("evidence", []):
                errors.append("root_audit_reference must be listed in evidence")
            else:
                try:
                    audit_doc = json.loads(zf.read(f"{PAYLOAD}/{audit_ref}"))
                    if audit_doc.get("ok") is not True:
                        errors.append("Referenced root audit does not declare ok=true")
                    if audit_doc.get("violations") not in ([], None):
                        errors.append("Referenced root audit contains violations")
                    if audit_doc.get("profile") != profile:
                        errors.append("Referenced root audit profile does not match manifest")
                except Exception as exc:
                    errors.append(f"Invalid referenced root audit JSON: {exc}")
        categories = ("delete", "quarantine", "retain")
        sets = {k: set(deletion.get(k, [])) for k in categories}
        for key, values in sets.items():
            if not isinstance(deletion.get(key, []), list): errors.append(f"{key} must be a list")
            for value in values:
                try: safe_rel(value)
                except ValueError as exc: errors.append(f"{key}: {exc}")
        for i, left in enumerate(categories):
            for right in categories[i+1:]:
                overlap=sets[left]&sets[right]
                if overlap: errors.append(f"Deletion plan overlap {left}/{right}: {sorted(overlap)}")
        for candidate in sets["delete"] | sets["quarantine"]:
            norm = candidate.replace("\\", "/").rstrip("/") + "/"
            if any(norm.startswith(prefix) or prefix.startswith(norm) for prefix in PROTECTED_PREFIXES):
                errors.append(f"Protected path cannot be requested for delete/quarantine: {candidate}")
    return {"ok": not errors, "errors": errors, "manifest": manifest}


def quarantine(repo: Path, source: Path, handoff_id: str, replacement: bool, execute: bool, log: list[dict[str, Any]]) -> None:
    rel = source.relative_to(repo)
    base = repo / QUARANTINE_ROOT / handoff_id
    dest = base / (Path("__REPLACED__") / rel if replacement else rel)
    action = {"action": "quarantine", "source": rel.as_posix(), "destination": dest.relative_to(repo).as_posix()}
    if not source.exists():
        action["status"] = "not_found"; log.append(action); return
    action["sha256"] = tree_digest(source)
    action["object_type"] = "directory" if source.is_dir() else "file"
    action["status"] = "planned" if not execute else "moved"
    log.append(action)
    if execute:
        dest.parent.mkdir(parents=True, exist_ok=True)
        if dest.exists(): raise FileExistsError(f"Quarantine destination exists: {dest}")
        shutil.move(str(source), str(dest))


def apply_zip(repo: Path, zip_path: Path, execute: bool, approve_delete: bool, remove_package: bool) -> dict[str, Any]:
    validation = validate_zip(zip_path)
    if not validation["ok"]: raise RuntimeError("Invalid handoff ZIP:\n- " + "\n- ".join(validation["errors"]))
    log: list[dict[str, Any]] = []
    with zipfile.ZipFile(zip_path) as zf:
        manifest, deletion, report = load_zip_metadata(zf)
        hid = manifest["handoff_id"]
        for rel in deletion.get("quarantine", []): quarantine(repo, repo/safe_rel(rel), hid, False, execute, log)
        if deletion.get("delete") and not approve_delete:
            raise RuntimeError("Deletion entries require --approve-delete")
        for rel in deletion.get("delete", []):
            target=repo/safe_rel(rel); entry={"action":"delete","path":rel,"status":"planned" if not execute else "deleted"}; log.append(entry)
            if execute and target.exists(): shutil.rmtree(target) if target.is_dir() else target.unlink()
        for entry in manifest.get("files", []):
            rel=safe_rel(entry["path"]); target=repo/rel; data=zf.read(f"{PAYLOAD}/{entry['path']}")
            if target.exists() and target.is_file() and sha256_file(target)==entry["sha256"]:
                log.append({"action":"payload","path":entry["path"],"status":"unchanged"}); continue
            if target.exists(): quarantine(repo,target,hid,True,execute,log)
            log.append({"action":"payload","path":entry["path"],"status":"planned" if not execute else "written"})
            if execute:
                target.parent.mkdir(parents=True,exist_ok=True)
                fd,tmp=tempfile.mkstemp(prefix=target.name+".",dir=target.parent)
                try:
                    with os.fdopen(fd,"wb") as f: f.write(data)
                    os.replace(tmp,target)
                finally:
                    if os.path.exists(tmp): os.unlink(tmp)
        if execute:
            archive=repo/ARCHIVE_ROOT/hid; archive.mkdir(parents=True,exist_ok=True)
            (archive/"HANDOFF_MANIFEST.json").write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
            (archive/"DELETION_PLAN.json").write_text(json.dumps(deletion,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
            (archive/"REPORT.md").write_text(report,encoding="utf-8")
            (archive/"APPLICATION_LOG.json").write_text(json.dumps(log,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
            q=repo/QUARANTINE_ROOT/hid/"QUARANTINE_MANIFEST.json"; q.parent.mkdir(parents=True,exist_ok=True)
            q.write_text(json.dumps({"handoff_id":hid,"timestamp":datetime.now(timezone.utc).isoformat(),"entries":[x for x in log if x["action"]=="quarantine"]},indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
            if remove_package: zip_path.unlink()
    return {"ok":True,"execute":execute,"log":log}


def build_zip(repo: Path, output: Path, metadata_path: Path, report_path: Path, include: list[str], deletion_plan: Path) -> dict[str, Any]:
    if output.name != CURRENT_ZIP: raise ValueError(f"Output filename must be {CURRENT_ZIP}")
    metadata=json.loads(metadata_path.read_text(encoding="utf-8"))
    profile = metadata.get("root_audit_profile", "pre-m001")
    audit=audit_root(repo,profile=profile,allow_current_zip=True)
    if metadata.get("root_cleanliness_declared") is True and not audit["ok"]:
        raise RuntimeError(f"Cannot declare clean root; violations: {audit['violations']}")
    if output.exists(): output.unlink()
    deletion=json.loads(deletion_plan.read_text(encoding="utf-8"))
    files=[]
    for rel_s in include:
        rel=safe_rel(rel_s); path=repo/rel
        if not path.is_file(): raise FileNotFoundError(path)
        files.append({"path":rel.as_posix(),"size":path.stat().st_size,"sha256":sha256_file(path),"operation":"create_or_replace"})
    manifest=dict(metadata)
    manifest.update({"schema_version":metadata.get("schema_version","1.5"),"package_name":CURRENT_ZIP,"created_at":datetime.now(timezone.utc).isoformat(),"files":files})
    missing=(REQUIRED_MANIFEST_V15 if manifest.get("schema_version") in {"1.4","1.5"} else REQUIRED_MANIFEST)-set(manifest)
    if missing: raise ValueError(f"Metadata missing fields: {sorted(missing)}")
    output.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(output,"w",compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr(f"{META}/HANDOFF_MANIFEST.json",json.dumps(manifest,indent=2,ensure_ascii=False)+"\n")
        zf.writestr(f"{META}/DELETION_PLAN.json",json.dumps(deletion,indent=2,ensure_ascii=False)+"\n")
        zf.writestr(f"{META}/REPORT.md",report_path.read_text(encoding="utf-8"))
        for e in files: zf.write(repo/e["path"],f"{PAYLOAD}/{e['path']}")
    result=validate_zip(output)
    if not result["ok"]:
        output.unlink(missing_ok=True); raise RuntimeError("Built ZIP failed validation: "+"; ".join(result["errors"]))
    return {"ok":True,"output":str(output),"sha256":sha256_file(output),"file_count":len(files),"root_audit":audit}


def main() -> int:
    parser=argparse.ArgumentParser(); sub=parser.add_subparsers(dest="cmd",required=True)
    p=sub.add_parser("validate"); p.add_argument("zip"); p.add_argument("--output")
    p=sub.add_parser("audit-root"); p.add_argument("--repo",default="."); p.add_argument("--profile",choices=sorted(ROOT_PROFILES),default="pre-m001"); p.add_argument("--disallow-current-zip",action="store_true"); p.add_argument("--fail-on-violations",action="store_true"); p.add_argument("--output")
    p=sub.add_parser("apply"); p.add_argument("zip"); p.add_argument("--repo",default="."); p.add_argument("--execute",action="store_true"); p.add_argument("--approve-delete",action="store_true"); p.add_argument("--remove-package",action="store_true")
    p=sub.add_parser("build"); p.add_argument("--repo",default="."); p.add_argument("--output",default=CURRENT_ZIP); p.add_argument("--metadata",required=True); p.add_argument("--report",required=True); p.add_argument("--include",action="append",default=[],required=True); p.add_argument("--deletion-plan",required=True)
    args=parser.parse_args()
    try:
        if args.cmd=="validate":
            result=validate_zip(Path(args.zip).resolve())
            if args.output: Path(args.output).write_text(json.dumps(result,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
        elif args.cmd=="audit-root":
            result=audit_root(Path(args.repo).resolve(),profile=args.profile,allow_current_zip=not args.disallow_current_zip)
            if args.output: Path(args.output).write_text(json.dumps(result,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
            print(json.dumps(result,indent=2,ensure_ascii=False))
            return 1 if args.fail_on_violations and not result["ok"] else 0
        elif args.cmd=="apply": result=apply_zip(Path(args.repo).resolve(),Path(args.zip).resolve(),args.execute,args.approve_delete,args.remove_package)
        else: result=build_zip(Path(args.repo).resolve(),Path(args.output).resolve(),Path(args.metadata).resolve(),Path(args.report).resolve(),args.include,Path(args.deletion_plan).resolve())
        print(json.dumps(result,indent=2,ensure_ascii=False)); return 0 if result.get("ok") else 1
    except Exception as exc:
        print(json.dumps({"ok":False,"error":str(exc)},indent=2,ensure_ascii=False),file=sys.stderr); return 2

if __name__=="__main__": raise SystemExit(main())

#!/usr/bin/env python3
"""Read-only structural gate for Project Atlas Codex-native governance."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

try:
    import tomllib
except ModuleNotFoundError:  # Python 3.10 compatibility for the local M0R runtime.
    import tomli as tomllib


EXPECTED_BIBLE_TREE = "60e1b11dafeb58ab4e4377210820934b0f0b8f13"
BIBLE_PATH = "NoLimits3D_Documentation_v0.96"
BIBLE_RELEASE = "0.96.1"
JARVIS_CANONICAL_PHRASE = (
    "Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente "
    "nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e "
    "nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi "
    "verificati server-side e controllo umano sulle azioni consequenziali. Non è un "
    "servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo."
)
JARVIS_INVARIANT_STATEMENT = (
    "Jarvis is Andrea's private AI assistant inside the NoLimits3D Command Center. It is "
    "not public, not customer-facing, not a development-team member, and not authorized "
    "for implementation before a dedicated Blueprint and identity/capability security "
    "foundation."
)
JARVIS_CANONICAL_RECORDS = (
    "AGENTS.md",
    "CLAUDE.md",
    ".codex/agents/atlas-tpm.toml",
    ".codex/agents/atlas-frontend.toml",
    ".codex/agents/atlas-backend.toml",
    "002_PROJECT_DNA.md",
    "NoLimits3D_Documentation_v0.96/README.md",
    "NoLimits3D_Documentation_v0.96/000_PROJECT_CHARTER.md",
    "NoLimits3D_Documentation_v0.96/00_Foundation/00_Project_Constitution.md",
    "NoLimits3D_Documentation_v0.96/01_Product/01_PRD.md",
    "NoLimits3D_Documentation_v0.96/07_AI/01_AI_Overview.md",
    "NoLimits3D_Documentation_v0.96/07_AI/02_Jarvis_Admin.md",
    "NoLimits3D_Documentation_v0.96/10_Security_Performance/04_AI_Security.md",
    "Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-012_JARVIS_AUTHORITATIVE_BOUNDARY.md",
    "Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md",
)
JARVIS_REQUIRED_RECORDS = (
    "NoLimits3D_Documentation_v0.96/12_Planning/Change_Requests/CR-0007_Jarvis_Authoritative_Boundary.md",
    "NoLimits3D_Documentation_v0.96/12_Planning/05_Traceability_Matrix.md",
    "Project_Atlas_Development_Blueprint_v0.1/00_BLUEPRINT_REPOSITORY_FOUNDATION.md",
    "Project_Atlas_Team_Workspace/01_Shared_Memory/DECISION_LEDGER.md",
    "Project_Atlas_Team_Workspace/04_Planning/JARVIS-ROLE-BOUNDARY-TESTS.md",
    ".agents/skills/atlas-role-boundary-test/SKILL.md",
)
EXPECTED_AGENT_FILES = {
    "atlas-tpm.toml": "atlas_tpm",
    "atlas-frontend.toml": "atlas_frontend",
    "atlas-backend.toml": "atlas_backend",
}
IMPLEMENTER_FILES = {"atlas-frontend.toml", "atlas-backend.toml"}
EXPECTED_AGENT_RUNTIME = {
    "atlas-tpm.toml": {
        "model": "gpt-5.6-sol",
        "model_reasoning_effort": "high",
        "sandbox_mode": "workspace-write",
        "agents": {"enabled": True},
    },
    "atlas-frontend.toml": {
        "model": "gpt-5.6-terra",
        "model_reasoning_effort": "high",
        "sandbox_mode": "workspace-write",
        "agents": {"enabled": False},
    },
    "atlas-backend.toml": {
        "model": "gpt-5.6-terra",
        "model_reasoning_effort": "high",
        "sandbox_mode": "workspace-write",
        "agents": {"enabled": False},
    },
}
EXPECTED_SKILLS = {
    "atlas-task-packet-planning",
    "atlas-frontend-delivery",
    "atlas-backend-delivery",
    "atlas-technical-review-integration",
    "atlas-role-boundary-test",
}
FRAMEWORK_PATH = "Project_Atlas_Development_Framework_v2.0.0"
FRAMEWORK_VERSION = "2.0.0"
ARCHITECTURE_DOC = (
    "Project_Atlas_Team_Workspace/00_Governance/"
    "CODEX_NATIVE_TEAM_ARCHITECTURE_v2.0.0.md"
)
ACCEPTANCE_ARTIFACT = (
    "Project_Atlas_Team_Workspace/08_Approvals/"
    "M0R_PRODUCT_OWNER_ACCEPTANCE_2026-08-05.md"
)
FINAL_M0R_STATE = "M0R - DONE / PRODUCT OWNER ACCEPTED / MERGE AUTHORIZED"
FINAL_STATE_RECORDS = (
    "AGENTS.md",
    "000_PROJECT_STATE.md",
    "001_SESSION_HANDOFF.md",
    f"{FRAMEWORK_PATH}/README.md",
    ARCHITECTURE_DOC,
    "Project_Atlas_Team_Workspace/README.md",
    "Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md",
    "Project_Atlas_Team_Workspace/04_Planning/MILESTONE_REGISTER.md",
    "Project_Atlas_Team_Workspace/04_Planning/SPRINT_REGISTER.md",
)
HISTORICAL_M0_RECORDS = (
    "000_PROJECT_STATE.md",
    "Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md",
    "Project_Atlas_Team_Workspace/04_Planning/MILESTONE_REGISTER.md",
)
BLUEPRINT_PLANNING_RECORDS = (
    "AGENTS.md",
    "000_PROJECT_STATE.md",
    "001_SESSION_HANDOFF.md",
    ARCHITECTURE_DOC,
    "Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md",
    "Project_Atlas_Team_Workspace/04_Planning/MILESTONE_REGISTER.md",
)
STALE_CURRENT_MARKERS = (
    "AWAITING PRODUCT OWNER ACCEPTANCE",
    "M0R is not DONE",
    "merge is not authorized",
    "MERGE NOT READY",
    "POST-ACCEPTANCE CLOSURE BLOCKED",
    "M0R Product Owner Accepted / Activation Pending Closure",
)


@dataclass(frozen=True)
class Result:
    name: str
    error: str | None = None


class Validator:
    def __init__(self, repo: Path, candidate_staged_bible: bool = False) -> None:
        self.repo = repo
        self.candidate_staged_bible = candidate_staged_bible
        self.results: list[Result] = []

    def check(self, name: str, condition: bool, error: str) -> None:
        self.results.append(Result(name, None if condition else error))

    def read_text(self, relative_path: str) -> str | None:
        path = self.repo / relative_path
        if not path.is_file():
            return None
        try:
            return path.read_text(encoding="utf-8")
        except (OSError, UnicodeError) as exc:
            self.results.append(Result(f"read {relative_path}", str(exc)))
            return None

    def read_toml(self, relative_path: str) -> dict[str, object] | None:
        content = self.read_text(relative_path)
        if content is None:
            return None
        try:
            return tomllib.loads(content)
        except tomllib.TOMLDecodeError as exc:
            self.results.append(Result(f"parse {relative_path}", str(exc)))
            return None

    def read_json(self, relative_path: str) -> dict[str, object] | None:
        content = self.read_text(relative_path)
        if content is None:
            return None
        try:
            payload = json.loads(content)
        except json.JSONDecodeError as exc:
            self.results.append(Result(f"parse {relative_path}", str(exc)))
            return None
        if not isinstance(payload, dict):
            self.results.append(Result(f"parse {relative_path}", "top level must be an object"))
            return None
        return payload

    def git(self, *arguments: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            ["git", *arguments],
            cwd=self.repo,
            check=False,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )

    def validate_agents_md(self) -> None:
        content = self.read_text("AGENTS.md")
        self.check("AGENTS.md exists", content is not None, "AGENTS.md is missing")
        if content is None:
            return

        required_terms = (
            "Codex Root",
            "atlas_tpm",
            "atlas_frontend",
            "atlas_backend",
            "Codex Root -> Atlas TPM -> Atlas Frontend / Atlas Backend",
            "INV-JARVIS-001",
            "PrintFlow remains `Coming Soon`",
        )
        missing = [term for term in required_terms if term not in content]
        self.check(
            "AGENTS.md governance references",
            not missing,
            f"missing required reference(s): {', '.join(missing)}",
        )

    def validate_project_config(self) -> None:
        config = self.read_toml(".codex/config.toml")
        self.check(
            "project Codex config parses",
            config is not None,
            ".codex/config.toml is missing or invalid",
        )
        if config is None:
            return

        agents = config.get("agents")
        expected = {
            "enabled": True,
            "max_depth": 2,
            "max_concurrent_threads_per_session": 3,
        }
        self.check(
            "project agent settings",
            agents == expected,
            f"expected [agents] {expected!r}, found {agents!r}",
        )

    def validate_custom_agents(self) -> None:
        agents_dir = self.repo / ".codex" / "agents"
        actual_files = (
            {path.name for path in agents_dir.glob("*.toml")} if agents_dir.is_dir() else set()
        )
        expected_files = set(EXPECTED_AGENT_FILES)
        self.check(
            "exact custom-agent file set",
            actual_files == expected_files,
            f"expected {sorted(expected_files)!r}, found {sorted(actual_files)!r}",
        )

        for filename, expected_name in EXPECTED_AGENT_FILES.items():
            relative_path = f".codex/agents/{filename}"
            agent = self.read_toml(relative_path)
            self.check(
                f"{filename} parses",
                agent is not None,
                f"{relative_path} is missing or invalid",
            )
            if agent is None:
                continue

            required_strings = ("name", "description", "developer_instructions")
            valid_required = all(
                isinstance(agent.get(field), str) and bool(str(agent[field]).strip())
                for field in required_strings
            )
            self.check(
                f"{filename} required fields",
                valid_required and agent.get("name") == expected_name,
                f"requires non-empty {required_strings!r} and name {expected_name!r}",
            )

            instructions = str(agent.get("developer_instructions", "")).lower()
            boundaries = ("jarvis", "printflow", "self-approv")
            missing_boundaries = [term for term in boundaries if term not in instructions]
            self.check(
                f"{filename} product and approval boundaries",
                not missing_boundaries,
                f"missing instruction term(s): {', '.join(missing_boundaries)}",
            )

            if filename in IMPLEMENTER_FILES:
                enabled = agent.get("agents")
                self.check(
                    f"{filename} delegation disabled",
                    isinstance(enabled, dict) and enabled.get("enabled") is False,
                    "implementer must define [agents] enabled = false",
                )

            runtime_expected = EXPECTED_AGENT_RUNTIME[filename]
            runtime_actual = {
                key: agent.get(key)
                for key in runtime_expected
            }
            self.check(
                f"{filename} exact runtime settings",
                runtime_actual == runtime_expected,
                f"expected {runtime_expected!r}, found {runtime_actual!r}",
            )

    def validate_framework(self) -> None:
        framework = self.repo / FRAMEWORK_PATH
        self.check(
            "Framework v2 directory exists",
            framework.is_dir(),
            f"{FRAMEWORK_PATH} is missing",
        )
        if not framework.is_dir():
            return

        version = self.read_text(f"{FRAMEWORK_PATH}/VERSION")
        self.check(
            "Framework v2 VERSION",
            version is not None and version.strip() == FRAMEWORK_VERSION,
            f"expected {FRAMEWORK_VERSION!r}, found {(version or '').strip()!r}",
        )

        manifest_path = f"{FRAMEWORK_PATH}/manifest.json"
        manifest = self.read_json(manifest_path)
        self.check(
            "Framework v2 manifest parses",
            manifest is not None,
            f"{manifest_path} is missing or invalid",
        )
        if manifest is None:
            return

        self.check(
            "Framework v2 manifest version",
            manifest.get("version") == FRAMEWORK_VERSION,
            f"expected manifest version {FRAMEWORK_VERSION!r}, found {manifest.get('version')!r}",
        )

        actual_files = {
            path.relative_to(framework).as_posix()
            for path in framework.rglob("*")
            if path.is_file() and path != framework / "manifest.json"
        }
        entries = manifest.get("files")
        valid_entries = isinstance(entries, list) and all(
            isinstance(entry, dict) and isinstance(entry.get("path"), str)
            for entry in entries
        )
        self.check(
            "Framework v2 manifest file entries",
            valid_entries,
            "manifest files must be an array of objects with string paths",
        )
        if not valid_entries:
            return

        manifest_paths = [str(entry["path"]).replace("\\", "/") for entry in entries]
        duplicate_paths = sorted(
            {path for path in manifest_paths if manifest_paths.count(path) > 1}
        )
        manifest_file_set = set(manifest_paths)
        missing = sorted(actual_files - manifest_file_set)
        unexpected = sorted(manifest_file_set - actual_files)
        self.check(
            "Framework v2 manifest exact file set",
            not duplicate_paths and not missing and not unexpected,
            f"duplicates={duplicate_paths!r}, missing={missing!r}, unexpected={unexpected!r}",
        )

        expected_count = len(actual_files)
        declared_count = manifest.get("file_count")
        self.check(
            "Framework v2 manifest file_count",
            declared_count == expected_count and len(entries) == expected_count,
            f"expected {expected_count}, declared {declared_count!r}, entries {len(entries)}",
        )

        entries_by_path = {path: entry for path, entry in zip(manifest_paths, entries)}
        metadata_errors: list[str] = []
        for relative_path in sorted(actual_files & manifest_file_set):
            file_path = framework / Path(relative_path)
            try:
                content = file_path.read_bytes()
            except OSError as exc:
                metadata_errors.append(f"{relative_path}: unreadable ({exc})")
                continue

            entry = entries_by_path[relative_path]
            actual_size = len(content)
            actual_hash = hashlib.sha256(content).hexdigest()
            if entry.get("size") != actual_size:
                metadata_errors.append(
                    f"{relative_path}: size expected {actual_size}, found {entry.get('size')!r}"
                )
            if entry.get("sha256") != actual_hash:
                metadata_errors.append(
                    f"{relative_path}: sha256 expected {actual_hash}, "
                    f"found {entry.get('sha256')!r}"
                )
        self.check(
            "Framework v2 manifest sizes and SHA-256",
            not metadata_errors,
            "; ".join(metadata_errors) or "metadata verification failed",
        )

    def validate_architecture_doc(self) -> None:
        content = self.read_text(ARCHITECTURE_DOC)
        self.check(
            "canonical Codex-native architecture document exists",
            content is not None,
            f"{ARCHITECTURE_DOC} is missing",
        )
        if content is None:
            return

        required_markers = (
            "2.0.0",
            "Codex Root",
            "Chief Architect & CTO",
            "Atlas TPM",
            "Atlas Frontend",
            "Atlas Backend",
            "Technical Review",
            "Jarvis",
            "INV-JARVIS-001",
            "PrintFlow",
            "Coming Soon",
            "M0R",
        )
        missing = [marker for marker in required_markers if marker.casefold() not in content.casefold()]
        self.check(
            "canonical architecture markers",
            not missing,
            f"missing marker(s): {', '.join(missing)}",
        )

    def validate_acceptance_artifact(self) -> None:
        content = self.read_text(ACCEPTANCE_ARTIFACT)
        self.check(
            "M0R Product Owner acceptance artifact exists",
            content is not None,
            f"{ACCEPTANCE_ARTIFACT} is missing",
        )
        if content is None:
            return

        required_markers = (
            "PA-BA-M0R-001",
            "2026-08-05",
            "Product Owner: Andrea",
            "M0R Codex-Native Team Reconfiguration v2.0.0 and PR #10",
            "Decision: `ACCEPTED`",
            FINAL_M0R_STATE,
            "accceto tutto io non capisco nulla di codice sei tu che devi revisionare e verificare",
            "does not authorize Blueprint 00 / M1 implementation",
            "does not authorize deployment, release, production access, or production binding",
            "does not close `BLK-BASE-001`",
            "does not expose Jarvis or change its private status",
            "PrintFlow, which remains `Coming Soon`",
            "does not replace `apps/legacy-web` as the public fallback",
            "does not authorize a Documentation Bible change",
        )
        missing = [marker for marker in required_markers if marker not in content]
        self.check(
            "M0R Product Owner acceptance artifact integrity",
            not missing,
            f"{ACCEPTANCE_ARTIFACT} is missing marker(s): {', '.join(missing)}",
        )

    def validate_state_markers(self) -> None:
        historical_m0_pattern = re.compile(
            r"\bM0\b[^\n]*\bDONE\b[^\n]*\bSUPERSEDED\b", re.IGNORECASE
        )
        for relative_path in HISTORICAL_M0_RECORDS:
            content = self.read_text(relative_path)
            self.check(
                f"current-state record exists: {relative_path}",
                content is not None,
                f"{relative_path} is missing",
            )
            if content is None:
                continue
            self.check(
                f"historical M0 marker: {relative_path}",
                historical_m0_pattern.search(content) is not None,
                "missing historical state M0 - DONE / SUPERSEDED",
            )

        for relative_path in FINAL_STATE_RECORDS:
            content = self.read_text(relative_path)
            self.check(
                f"post-acceptance state record exists: {relative_path}",
                content is not None,
                f"{relative_path} is missing",
            )
            if content is None:
                continue

            self.check(
                f"exact final M0R state: {relative_path}",
                FINAL_M0R_STATE in content,
                f"add the exact canonical state {FINAL_M0R_STATE!r}",
            )
            stale = [
                marker
                for marker in STALE_CURRENT_MARKERS
                if marker.casefold() in content.casefold()
            ]
            self.check(
                f"no stale M0R state: {relative_path}",
                not stale,
                f"remove stale current-state marker(s): {', '.join(stale)}",
            )

        allowlist_path = "Project_Atlas_Team_Workspace/00_Governance/REPOSITORY_ROOT_ALLOWLIST.md"
        allowlist = self.read_text(allowlist_path)
        self.check(
            "repository root allowlist exists",
            allowlist is not None,
            f"{allowlist_path} is missing",
        )
        if allowlist is not None:
            marker = "m0r-reconfiguration"
            self.check(
                "M0R audit profile marker",
                marker in allowlist,
                f"{allowlist_path} does not reference {marker!r}",
            )

    def validate_framework_activation(self) -> None:
        framework_readme_path = f"{FRAMEWORK_PATH}/README.md"
        framework_readme = self.read_text(framework_readme_path)
        self.check(
            "Framework v2 development-governance status exists",
            framework_readme is not None,
            f"{framework_readme_path} is missing",
        )
        if framework_readme is not None:
            active_markers = (
                "active Codex-native operating framework",
                "Development governance: active",
                "Production: blocked",
            )
            missing = [marker for marker in active_markers if marker not in framework_readme]
            self.check(
                "Framework v2 active for development, blocked for production",
                not missing,
                f"{framework_readme_path} is missing marker(s): {', '.join(missing)}",
            )

        baseline_path = f"{FRAMEWORK_PATH}/BASELINE_BINDING_RECORD.md"
        baseline = self.read_text(baseline_path)
        self.check(
            "production baseline binding record exists",
            baseline is not None,
            f"{baseline_path} is missing",
        )
        if baseline is not None:
            baseline_markers = (
                "Pending production binding",
                "production remain unauthorized",
                "BLK-BASE-001",
            )
            missing = [marker for marker in baseline_markers if marker not in baseline]
            self.check(
                "production baseline remains blocked",
                not missing,
                f"{baseline_path} is missing marker(s): {', '.join(missing)}",
            )

        blocker_path = "Project_Atlas_Team_Workspace/04_Planning/BLOCKER_REGISTER.md"
        blocker_register = self.read_text(blocker_path)
        self.check(
            "blocker register exists for production gate",
            blocker_register is not None,
            f"{blocker_path} is missing",
        )
        if blocker_register is not None:
            blocker_line = next(
                (line for line in blocker_register.splitlines() if "BLK-BASE-001" in line),
                "",
            )
            valid_open_blocker = all(
                marker.casefold() in blocker_line.casefold()
                for marker in ("OPEN", "production", "blocker")
            )
            self.check(
                "BLK-BASE-001 remains open as production-only blocker",
                valid_open_blocker,
                f"{blocker_path} must retain an OPEN production-blocker row for BLK-BASE-001",
            )

    def validate_blueprint_planning_gate(self) -> None:
        blueprint_pattern = re.compile(r"Blueprint\s+00\s*/\s*M1", re.IGNORECASE)
        planning_only_pattern = re.compile(
            r"(?:next\s+planning\s+gate\s+only|only\s+the\s+next\s+planning\s+gate)",
            re.IGNORECASE,
        )
        for relative_path in BLUEPRINT_PLANNING_RECORDS:
            content = self.read_text(relative_path)
            self.check(
                f"Blueprint planning record exists: {relative_path}",
                content is not None,
                f"{relative_path} is missing",
            )
            if content is None:
                continue

            self.check(
                f"Blueprint 00 / M1 is planning-only: {relative_path}",
                blueprint_pattern.search(content) is not None
                and planning_only_pattern.search(content) is not None,
                "record must identify Blueprint 00 / M1 as the next planning gate only",
            )

        agents_md = self.read_text("AGENTS.md") or ""
        authorization_boundaries = (
            "does not authorize implementation, release, deployment, or production",
            "Production remains blocked while `BLK-BASE-001` is open",
        )
        missing = [marker for marker in authorization_boundaries if marker not in agents_md]
        self.check(
            "Blueprint gate grants no implementation or production authority",
            not missing,
            f"AGENTS.md is missing boundary marker(s): {', '.join(missing)}",
        )

    def validate_product_boundaries(self) -> None:
        boundary_records = {
            "AGENTS.md": (
                "INV-JARVIS-001",
                "PrintFlow remains `Coming Soon`",
                "PC worker remains pull-only",
                "`apps/legacy-web` remains the public fallback",
                "Production remains blocked while `BLK-BASE-001` is open",
            ),
            ARCHITECTURE_DOC: (
                "INV-JARVIS-001",
                "PrintFlow remains `Coming Soon`",
                "Production remains blocked by `BLK-BASE-001`",
            ),
            "000_PROJECT_STATE.md": (
                "INV-JARVIS-001",
                "PrintFlow remains `Coming Soon`",
                "`apps/legacy-web` remains the preserved public fallback",
                "`BLK-BASE-001` keeps production blocked",
            ),
        }
        for relative_path, required_markers in boundary_records.items():
            content = self.read_text(relative_path)
            self.check(
                f"product-boundary record exists: {relative_path}",
                content is not None,
                f"{relative_path} is missing",
            )
            if content is None:
                continue
            missing = [marker for marker in required_markers if marker not in content]
            self.check(
                f"product boundaries preserved: {relative_path}",
                not missing,
                f"missing boundary marker(s): {', '.join(missing)}",
            )

    def validate_jarvis_boundary(self) -> None:
        for relative_path in JARVIS_CANONICAL_RECORDS:
            content = self.read_text(relative_path)
            self.check(
                f"Jarvis canonical record exists: {relative_path}",
                content is not None,
                f"{relative_path} is missing",
            )
            if content is None:
                continue
            self.check(
                f"Jarvis canonical phrase: {relative_path}",
                JARVIS_CANONICAL_PHRASE in content,
                "canonical INV-JARVIS-001 phrase is missing or altered",
            )

        required_markers = (
            "INV-JARVIS-001",
            "Blueprint",
            "server-side",
        )
        for relative_path in JARVIS_REQUIRED_RECORDS:
            content = self.read_text(relative_path)
            self.check(
                f"Jarvis governance record exists: {relative_path}",
                content is not None,
                f"{relative_path} is missing",
            )
            if content is None:
                continue
            missing = [
                marker
                for marker in required_markers
                if marker.casefold() not in content.casefold()
            ]
            self.check(
                f"Jarvis governance markers: {relative_path}",
                not missing,
                f"missing marker(s): {', '.join(missing)}",
            )

        invariant_records = (
            "NoLimits3D_Documentation_v0.96/00_Foundation/00_Project_Constitution.md",
            "Project_Atlas_Development_Blueprint_v0.1/03_Architect_Directives/AD-012_JARVIS_AUTHORITATIVE_BOUNDARY.md",
            "Project_Atlas_Team_Workspace/01_Shared_Memory/CURRENT_PROJECT_STATE.md",
        )
        for relative_path in invariant_records:
            content = self.read_text(relative_path) or ""
            self.check(
                f"exact INV-JARVIS-001 statement: {relative_path}",
                JARVIS_INVARIANT_STATEMENT in content,
                "exact English invariant statement is missing or altered",
            )

        forbidden_roots = (
            "apps/web/public",
            "apps/web/src/routes/public",
            "apps/web/src/routes/account",
            "supabase/functions",
        )
        forbidden_matches: list[str] = []
        for relative_root in forbidden_roots:
            root = self.repo / relative_root
            if not root.exists():
                continue
            for path in root.rglob("*"):
                if not path.is_file():
                    continue
                if "jarvis" in path.name.casefold():
                    forbidden_matches.append(path.relative_to(self.repo).as_posix())
                    continue
                try:
                    content = path.read_text(encoding="utf-8")
                except (OSError, UnicodeError):
                    continue
                if "jarvis" in content.casefold():
                    forbidden_matches.append(path.relative_to(self.repo).as_posix())
        self.check(
            "no public, customer, or Edge Function Jarvis implementation",
            not forbidden_matches,
            f"forbidden Jarvis application reference(s): {sorted(set(forbidden_matches))!r}",
        )

    def validate_skills(self) -> None:
        skills_dir = self.repo / ".agents" / "skills"
        actual_skills = (
            {path.name for path in skills_dir.iterdir() if path.is_dir() and (path / "SKILL.md").is_file()}
            if skills_dir.is_dir()
            else set()
        )
        self.check(
            "exact repository skill set",
            actual_skills == EXPECTED_SKILLS,
            f"expected {sorted(EXPECTED_SKILLS)!r}, found {sorted(actual_skills)!r}",
        )

        for skill in sorted(EXPECTED_SKILLS & actual_skills):
            content = self.read_text(f".agents/skills/{skill}/SKILL.md") or ""
            lines = content.splitlines()
            frontmatter_end = next(
                (index for index, line in enumerate(lines[1:], start=1) if line == "---"),
                None,
            )
            frontmatter = lines[1:frontmatter_end] if lines[:1] == ["---"] and frontmatter_end else []
            has_name = any(line.strip() == f"name: {skill}" for line in frontmatter)
            has_description = any(line.strip().startswith("description:") for line in frontmatter)
            self.check(
                f"{skill} skill frontmatter",
                has_name and has_description,
                "SKILL.md requires matching name and description frontmatter",
            )

    def validate_legacy_agents(self) -> None:
        legacy_dir = self.repo / ".claude" / "agents"
        legacy_files = sorted(
            path.relative_to(self.repo).as_posix()
            for path in legacy_dir.glob("*.md")
            if path.is_file()
        ) if legacy_dir.is_dir() else []
        self.check(
            "no active legacy agents",
            not legacy_files,
            f"legacy agent definitions remain active: {legacy_files!r}",
        )

    def validate_bible(self) -> None:
        bible = self.repo / BIBLE_PATH
        manifest = self.read_json(f"{BIBLE_PATH}/manifest.json")
        self.check(
            "Documentation Bible manifest parses",
            manifest is not None,
            f"{BIBLE_PATH}/manifest.json is missing or invalid",
        )
        if manifest is not None:
            actual_files = {
                path.relative_to(bible).as_posix()
                for path in bible.rglob("*")
                if path.is_file() and path != bible / "manifest.json"
            }
            entries = manifest.get("files")
            valid_entries = isinstance(entries, list) and all(
                isinstance(entry, dict)
                and isinstance(entry.get("path"), str)
                and isinstance(entry.get("size_bytes"), int)
                and isinstance(entry.get("sha256"), str)
                for entry in entries
            )
            self.check(
                "Documentation Bible manifest entries",
                valid_entries,
                "manifest files must contain path, size_bytes and sha256",
            )
            if valid_entries:
                entries_by_path = {str(entry["path"]): entry for entry in entries}
                duplicate_count = len(entries_by_path) != len(entries)
                self.check(
                    "Documentation Bible manifest exact file set",
                    not duplicate_count and set(entries_by_path) == actual_files,
                    "manifest file set differs from the Documentation Bible worktree",
                )
                metadata_errors: list[str] = []
                for relative_path in sorted(actual_files & set(entries_by_path)):
                    content = (bible / relative_path).read_bytes()
                    entry = entries_by_path[relative_path]
                    actual_hash = hashlib.sha256(content).hexdigest()
                    if entry.get("size_bytes") != len(content):
                        metadata_errors.append(f"{relative_path}: size mismatch")
                    if entry.get("sha256") != actual_hash:
                        metadata_errors.append(f"{relative_path}: SHA-256 mismatch")
                self.check(
                    "Documentation Bible manifest sizes and SHA-256",
                    not metadata_errors,
                    "; ".join(metadata_errors) or "metadata verification failed",
                )
                self.check(
                    "Documentation Bible manifest count",
                    manifest.get("file_count_excluding_manifest") == len(actual_files)
                    and len(entries) == len(actual_files),
                    f"expected {len(actual_files)} files",
                )
            self.check(
                "Documentation Bible manifest release",
                manifest.get("release") == BIBLE_RELEASE,
                f"expected release {BIBLE_RELEASE!r}, found {manifest.get('release')!r}",
            )

        version = self.read_text(f"{BIBLE_PATH}/VERSION") or ""
        self.check(
            "Documentation Bible VERSION release",
            version.strip().startswith(BIBLE_RELEASE),
            f"VERSION must start with {BIBLE_RELEASE!r}",
        )

        if self.candidate_staged_bible:
            index_tree = self.git("write-tree")
            tree = (
                self.git("rev-parse", f"{index_tree.stdout.strip()}:{BIBLE_PATH}")
                if index_tree.returncode == 0
                else index_tree
            )
            tree_label = "staged candidate"
        else:
            tree = self.git("rev-parse", f"HEAD:{BIBLE_PATH}")
            tree_label = "committed"
        self.check(
            f"Documentation Bible {tree_label} tree",
            tree.returncode == 0 and tree.stdout.strip() == EXPECTED_BIBLE_TREE,
            f"expected {EXPECTED_BIBLE_TREE}, found {tree.stdout.strip() or tree.stderr.strip()!r}",
        )

        if self.candidate_staged_bible:
            unstaged = self.git("diff", "--quiet", "--", BIBLE_PATH)
            untracked = self.git("ls-files", "--others", "--exclude-standard", "--", BIBLE_PATH)
            clean_candidate = (
                unstaged.returncode == 0
                and untracked.returncode == 0
                and not untracked.stdout.strip()
            )
            self.check(
                "Documentation Bible staged candidate has no unstaged files",
                clean_candidate,
                untracked.stdout.strip()
                or unstaged.stderr.strip()
                or "unstaged Bible changes remain",
            )
        else:
            status = self.git("status", "--porcelain", "--", BIBLE_PATH)
            self.check(
                "Documentation Bible worktree unchanged",
                status.returncode == 0 and not status.stdout.strip(),
                status.stdout.strip() or status.stderr.strip() or "unable to inspect Bible worktree",
            )

    def run(self) -> int:
        self.validate_agents_md()
        self.validate_project_config()
        self.validate_custom_agents()
        self.validate_skills()
        self.validate_framework()
        self.validate_architecture_doc()
        self.validate_acceptance_artifact()
        self.validate_state_markers()
        self.validate_framework_activation()
        self.validate_blueprint_planning_gate()
        self.validate_product_boundaries()
        self.validate_jarvis_boundary()
        self.validate_legacy_agents()
        self.validate_bible()

        failed = 0
        for result in self.results:
            if result.error is None:
                print(f"PASS: {result.name}")
            else:
                failed += 1
                print(f"FAIL: {result.name}: {result.error}")

        print(f"Codex-native governance: {len(self.results) - failed} passed, {failed} failed")
        return 1 if failed else 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", default=".", help="repository root (default: current directory)")
    parser.add_argument(
        "--candidate-staged-bible",
        action="store_true",
        help="validate the staged Bible candidate and require no unstaged Bible files",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo = Path(args.repo).resolve()
    if not (repo / ".git").exists():
        print(f"FAIL: repository root not found: {repo}")
        return 2
    return Validator(repo, candidate_staged_bible=args.candidate_staged_bible).run()


if __name__ == "__main__":
    sys.exit(main())

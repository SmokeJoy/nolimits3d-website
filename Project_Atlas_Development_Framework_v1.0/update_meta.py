import json
import hashlib
import os
from datetime import datetime

# 1. Update VERSION
with open('VERSION', 'w') as f:
    f.write('1.0.1\n')

# 2. Update CHANGELOG.md
with open('CHANGELOG.md', 'r', encoding='utf-8') as f:
    changelog = f.read()

new_log = """
## 1.0.1 — 2026-07-15

- Integrazione di Engineering Principles e Development Philosophy.
- Formalizzazione di Architect's Veto e Definition of Excellence.
- Nuova policy su Technical Debt.
- Risoluzione sovrapposizioni su Quality Governance.
- Consolidamento finale su ruoli e responsabilità AI.
- Playbook dichiarato Operationally Ready per avvio fase Blueprint.
"""
changelog = changelog.replace("# Changelog\n", "# Changelog\n" + new_log)
with open('CHANGELOG.md', 'w', encoding='utf-8') as f:
    f.write(changelog)

# 3. Delete old playbook (ensure the new one exists first)
if os.path.exists("000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v1.0.1.md"):
    if os.path.exists("000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v1.0.md"):
        os.remove("000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v1.0.md")

# 4. Update manifest.json
def get_sha256(filepath):
    sha256_hash = hashlib.sha256()
    with open(filepath,"rb") as f:
        for byte_block in iter(lambda: f.read(4096),b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

with open('manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

manifest['version'] = '1.0.1'

for file_info in manifest['files']:
    path = file_info['path']
    if path == "000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v1.0.md":
        file_info['path'] = "000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v1.0.1.md"
        path = "000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v1.0.1.md"
    
    if os.path.exists(path):
        file_info['size'] = os.path.getsize(path)
        file_info['sha256'] = get_sha256(path)

with open('manifest.json', 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2)


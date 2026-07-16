# Root Cleanup Decision Register — M-001

> **Register ID:** PA-M001-ROOT-CLEANUP-002  
> **Status:** AD-002 authorized  
> **Default:** uncertainty means quarantine, never silent deletion.

| Path | Classification | Required action | Reason |
|---|---|---|---|
| `tree_before.txt` | Loose root evidence | QUARANTINE after canonical copy | Evidence belongs in `05_Evidence`, not root |
| `tree_after.txt` | Loose root evidence | QUARANTINE after canonical copy | Evidence belongs in `05_Evidence`, not root |
| `temp_handoff/` | Root staging/extracted package | QUARANTINE | Manual extraction violated clean-root policy; preserve pending disposal decision |
| `PROJECT_ATLAS_CURRENT_HANDOFF.zip` | Active transport exception | REMOVE after successful apply | Only temporarily allowed during validation/application |
| authoritative source directories | Protected | RETAIN | No requested quarantine without Architect Decision |

## Required closure evidence

- AD-002 application log;
- quarantine manifest;
- canonical copies of prior root audit evidence;
- post-application root audit JSON showing zero violations;
- root tree stored under `Project_Atlas_Team_Workspace/05_Evidence/`;
- independent package validation result.

Cannot perform a conforming spawn.

The available `spawn_agent` schema supports only:

- `task_name`
- `message`
- `fork_turns`
- optional `model`
- optional `reasoning_effort`

It has no `agent_type`, `name`, `workspace-write`, `sandbox`, or equivalent `:workspace` permission argument. Therefore, per your stop condition, I spawned no child and made no file changes. No child ID, effective sandbox, handoff, or test results exist for this retry.
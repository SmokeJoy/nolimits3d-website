EV — Wave C2 known issue: `apps/web` scope guard pins the pre-C2 `@atlas/ui` surface
Milestone: M-002 / Wave C2 / TSK-M002-CLAUDE-C2
Executor: atlas-frontend
Date: 2026-08-05
----------------------------------------------------------------------

## What happens

Root `pnpm test` fails with one red test:

`apps/web/src/test/shared-packages.test.ts` >
`Shared workspace packages (M001-B / M001-C) > limits @atlas/ui to the approved
M-002 Wave C1 primitive surface (scope guard)`

Full output archived in `EV-C2-03-workspace-test.txt`. All other suites in that
run are green: `scripts/guards/guards.test.mjs` (18/18), `@atlas/ui`
(133/133), and the other 20 tests in `@atlas/web`.

## Why

That test (introduced in Wave C1, see its own in-file comment: "Widening this
list requires an approved Task Packet deliverable, not a local decision")
pins `Object.keys(ui).sort()` to the exact 10-name Wave C1 export surface
(`Badge`, `Button`, `Card*`, `Skeleton`, `StatusIndicator`). `TSK-M002-CLAUDE-C2`
is exactly the kind of approved Task Packet deliverable the comment
anticipates: it adds `Input`, `FormField`, `Select`, `Dialog`, `DialogClose`,
`DialogContent`, `DialogTrigger`, `Tabs`, `TabsList`, `TabsPanel`, `TabsTab`,
`Toaster`, `toast` to `packages/ui/src/index.ts`, which is explicitly listed
in this packet's Allowed Files.

## Why it was not fixed here

`apps/web/**` is explicitly in this packet's Forbidden Files. The Task
Packet's own Stop/Escalation Conditions instruct fixing the underlying export
surface in `packages/ui` — done — and stopping, not touching the guard file,
when the fix would require editing a file outside the Allowed Files.
`M002-TASK-PACKET-CLAUDE.md`'s Wave C1 deviation table records that Wave C1
edited files like this one without stopping first; this packet's own
instructions were explicit that this must not repeat.

## What the TPM/owner of `apps/web/**` needs to do

Update the expected array in `apps/web/src/test/shared-packages.test.ts` to
the new sorted, 23-name export list (`Object.keys(ui).sort()` against the
built `packages/ui/dist/index.js`):

```
[
  "Badge", "Button", "Card", "CardContent", "CardDescription", "CardFooter",
  "CardHeader", "CardTitle", "Dialog", "DialogClose", "DialogContent",
  "DialogTrigger", "FormField", "Input", "Select", "Skeleton",
  "StatusIndicator", "Tabs", "TabsList", "TabsPanel", "TabsTab", "Toaster",
  "toast"
]
```

That edit is a single test-file change in a package outside `atlas-frontend`'s
C2 scope.

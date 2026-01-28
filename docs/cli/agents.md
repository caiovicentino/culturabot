---
summary: "CLI reference for `culturabuilder agents` (list/add/delete/set identity)"
read_when:
  - You want multiple isolated agents (workspaces + routing + auth)
---

# `culturabuilder agents`

Manage isolated agents (workspaces + auth + routing).

Related:
- Multi-agent routing: [Multi-Agent Routing](/concepts/multi-agent)
- Agent workspace: [Agent workspace](/concepts/agent-workspace)

## Examples

```bash
culturabuilder agents list
culturabuilder agents add work --workspace ~/clawd-work
culturabuilder agents set-identity --workspace ~/clawd --from-identity
culturabuilder agents set-identity --agent main --avatar avatars/clawd.png
culturabuilder agents delete work
```

## Identity files

Each agent workspace can include an `IDENTITY.md` at the workspace root:
- Example path: `~/clawd/IDENTITY.md`
- `set-identity --from-identity` reads from the workspace root (or an explicit `--identity-file`)

Avatar paths resolve relative to the workspace root.

## Set identity

`set-identity` writes fields into `agents.list[].identity`:
- `name`
- `theme`
- `emoji`
- `avatar` (workspace-relative path, http(s) URL, or data URI)

Load from `IDENTITY.md`:

```bash
culturabuilder agents set-identity --workspace ~/clawd --from-identity
```

Override fields explicitly:

```bash
culturabuilder agents set-identity --agent main --name "Clawd" --emoji "🦞" --avatar avatars/clawd.png
```

Config sample:

```json5
{
  agents: {
    list: [
      {
        id: "main",
        identity: {
          name: "Clawd",
          theme: "space lobster",
          emoji: "🦞",
          avatar: "avatars/clawd.png"
        }
      }
    ]
  }
}
```

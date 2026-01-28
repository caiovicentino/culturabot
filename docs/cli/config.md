---
summary: "CLI reference for `culturabuilder config` (get/set/unset config values)"
read_when:
  - You want to read or edit config non-interactively
---

# `culturabuilder config`

Config helpers: get/set/unset values by path. Run without a subcommand to open
the configure wizard (same as `culturabuilder configure`).

## Examples

```bash
culturabuilder config get browser.executablePath
culturabuilder config set browser.executablePath "/usr/bin/google-chrome"
culturabuilder config set agents.defaults.heartbeat.every "2h"
culturabuilder config set agents.list[0].tools.exec.node "node-id-or-name"
culturabuilder config unset tools.web.search.apiKey
```

## Paths

Paths use dot or bracket notation:

```bash
culturabuilder config get agents.defaults.workspace
culturabuilder config get agents.list[0].id
```

Use the agent list index to target a specific agent:

```bash
culturabuilder config get agents.list
culturabuilder config set agents.list[1].tools.exec.node "node-id-or-name"
```

## Values

Values are parsed as JSON5 when possible; otherwise they are treated as strings.
Use `--json` to require JSON5 parsing.

```bash
culturabuilder config set agents.defaults.heartbeat.every "0m"
culturabuilder config set gateway.port 19001 --json
culturabuilder config set channels.whatsapp.groups '["*"]' --json
```

Restart the gateway after edits.

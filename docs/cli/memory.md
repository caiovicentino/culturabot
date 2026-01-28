---
summary: "CLI reference for `culturabuilder memory` (status/index/search)"
read_when:
  - You want to index or search semantic memory
  - You’re debugging memory availability or indexing
---

# `culturabuilder memory`

Manage semantic memory indexing and search.
Provided by the active memory plugin (default: `memory-core`; set `plugins.slots.memory = "none"` to disable).

Related:
- Memory concept: [Memory](/concepts/memory)
 - Plugins: [Plugins](/plugins)

## Examples

```bash
culturabuilder memory status
culturabuilder memory status --deep
culturabuilder memory status --deep --index
culturabuilder memory status --deep --index --verbose
culturabuilder memory index
culturabuilder memory index --verbose
culturabuilder memory search "release checklist"
culturabuilder memory status --agent main
culturabuilder memory index --agent main --verbose
```

## Options

Common:

- `--agent <id>`: scope to a single agent (default: all configured agents).
- `--verbose`: emit detailed logs during probes and indexing.

Notes:
- `memory status --deep` probes vector + embedding availability.
- `memory status --deep --index` runs a reindex if the store is dirty.
- `memory index --verbose` prints per-phase details (provider, model, sources, batch activity).

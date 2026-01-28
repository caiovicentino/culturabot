---
summary: "CLI reference for `culturabuilder reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
---

# `culturabuilder reset`

Reset local config/state (keeps the CLI installed).

```bash
culturabuilder reset
culturabuilder reset --dry-run
culturabuilder reset --scope config+creds+sessions --yes --non-interactive
```


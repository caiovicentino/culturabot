---
summary: "CLI reference for `culturabuilder logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
---

# `culturabuilder logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:
- Logging overview: [Logging](/logging)

## Examples

```bash
culturabuilder logs
culturabuilder logs --follow
culturabuilder logs --json
culturabuilder logs --limit 500
```


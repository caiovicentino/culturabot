---
summary: "CLI reference for `culturabuilder security` (audit and fix common security footguns)"
read_when:
  - You want to run a quick security audit on config/state
  - You want to apply safe “fix” suggestions (chmod, tighten defaults)
---

# `culturabuilder security`

Security tools (audit + optional fixes).

Related:
- Security guide: [Security](/gateway/security)

## Audit

```bash
culturabuilder security audit
culturabuilder security audit --deep
culturabuilder security audit --fix
```

The audit warns when multiple DM senders share the main session and recommends `session.dmScope="per-channel-peer"` for shared inboxes.
It also warns when small models (`<=300B`) are used without sandboxing and with web/browser tools enabled.

---
summary: "CLI reference for `culturabuilder onboard` (interactive onboarding wizard)"
read_when:
  - You want guided setup for gateway, workspace, auth, channels, and skills
---

# `culturabuilder onboard`

Interactive onboarding wizard (local or remote Gateway setup).

Related:
- Wizard guide: [Onboarding](/start/onboarding)

## Examples

```bash
culturabuilder onboard
culturabuilder onboard --flow quickstart
culturabuilder onboard --flow manual
culturabuilder onboard --mode remote --remote-url ws://gateway-host:18789
```

Flow notes:
- `quickstart`: minimal prompts, auto-generates a gateway token.
- `manual`: full prompts for port/bind/auth (alias of `advanced`).
- Fastest first chat: `culturabuilder dashboard` (Control UI, no channel setup).

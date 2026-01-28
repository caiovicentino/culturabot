---
summary: "CLI reference for `culturabuilder models` (status/list/set/scan, aliases, fallbacks, auth)"
read_when:
  - You want to change default models or view provider auth status
  - You want to scan available models/providers and debug auth profiles
---

# `culturabuilder models`

Model discovery, scanning, and configuration (default model, fallbacks, auth profiles).

Related:
- Providers + models: [Models](/providers/models)
- Provider auth setup: [Getting started](/start/getting-started)

## Common commands

```bash
culturabuilder models status
culturabuilder models list
culturabuilder models set <model-or-alias>
culturabuilder models scan
```

`culturabuilder models status` shows the resolved default/fallbacks plus an auth overview.
When provider usage snapshots are available, the OAuth/token status section includes
provider usage headers.
Add `--probe` to run live auth probes against each configured provider profile.
Probes are real requests (may consume tokens and trigger rate limits).

Notes:
- `models set <model-or-alias>` accepts `provider/model` or an alias.
- Model refs are parsed by splitting on the **first** `/`. If the model ID includes `/` (OpenRouter-style), include the provider prefix (example: `openrouter/moonshotai/kimi-k2`).
- If you omit the provider, Culturabuilder treats the input as an alias or a model for the **default provider** (only works when there is no `/` in the model ID).

### `models status`
Options:
- `--json`
- `--plain`
- `--check` (exit 1=expired/missing, 2=expiring)
- `--probe` (live probe of configured auth profiles)
- `--probe-provider <name>` (probe one provider)
- `--probe-profile <id>` (repeat or comma-separated profile ids)
- `--probe-timeout <ms>`
- `--probe-concurrency <n>`
- `--probe-max-tokens <n>`

## Aliases + fallbacks

```bash
culturabuilder models aliases list
culturabuilder models fallbacks list
```

## Auth profiles

```bash
culturabuilder models auth add
culturabuilder models auth login --provider <id>
culturabuilder models auth setup-token
culturabuilder models auth paste-token
```
`models auth login` runs a provider plugin’s auth flow (OAuth/API key). Use
`culturabuilder plugins list` to see which providers are installed.

Notes:
- `setup-token` prompts for a setup-token value (generate it with `claude setup-token` on any machine).
- `paste-token` accepts a token string generated elsewhere or from automation.

---
summary: "CLI reference for `culturabuilder plugins` (list, install, enable/disable, doctor)"
read_when:
  - You want to install or manage in-process Gateway plugins
  - You want to debug plugin load failures
---

# `culturabuilder plugins`

Manage Gateway plugins/extensions (loaded in-process).

Related:
- Plugin system: [Plugins](/plugin)
- Plugin manifest + schema: [Plugin manifest](/plugins/manifest)
- Security hardening: [Security](/gateway/security)

## Commands

```bash
culturabuilder plugins list
culturabuilder plugins info <id>
culturabuilder plugins enable <id>
culturabuilder plugins disable <id>
culturabuilder plugins doctor
culturabuilder plugins update <id>
culturabuilder plugins update --all
```

Bundled plugins ship with Culturabuilder but start disabled. Use `plugins enable` to
activate them.

All plugins must ship a `culturabuilder.plugin.json` file with an inline JSON Schema
(`configSchema`, even if empty). Missing/invalid manifests or schemas prevent
the plugin from loading and fail config validation.

### Install

```bash
culturabuilder plugins install <path-or-spec>
```

Security note: treat plugin installs like running code. Prefer pinned versions.

Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.

Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

```bash
culturabuilder plugins install -l ./my-plugin
```

### Update

```bash
culturabuilder plugins update <id>
culturabuilder plugins update --all
culturabuilder plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).

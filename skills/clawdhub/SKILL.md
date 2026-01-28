---
name: culturabuilder-hub
description: Use the CulturaBuilder Hub CLI to search, install, update, and publish agent skills from culturabuilder.com. Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders with the npm-installed culturabuilder-hub CLI.
metadata: {"culturabuilder":{"requires":{"bins":["culturabuilder-hub"]},"install":[{"id":"node","kind":"node","package":"culturabuilder-hub","bins":["culturabuilder-hub"],"label":"Install CulturaBuilder Hub CLI (npm)"}]}}
---

# CulturaBuilder Hub CLI

Install
```bash
npm i -g culturabuilder-hub
```

Auth (publish)
```bash
culturabuilder-hub login
culturabuilder-hub whoami
```

Search
```bash
culturabuilder-hub search "postgres backups"
```

Install
```bash
culturabuilder-hub install my-skill
culturabuilder-hub install my-skill --version 1.2.3
```

Update (hash-based match + upgrade)
```bash
culturabuilder-hub update my-skill
culturabuilder-hub update my-skill --version 1.2.3
culturabuilder-hub update --all
culturabuilder-hub update my-skill --force
culturabuilder-hub update --all --no-input --force
```

List
```bash
culturabuilder-hub list
```

Publish
```bash
culturabuilder-hub publish ./my-skill --slug my-skill --name "My Skill" --version 1.2.0 --changelog "Fixes + docs"
```

Notes
- Default registry: https://culturabuilder.com (override with CULTURABUILDER_HUB_REGISTRY or --registry)
- Default workdir: cwd (falls back to Culturabuilder workspace); install dir: ./skills (override with --workdir / --dir / CULTURABUILDER_HUB_WORKDIR)
- Update command hashes local files, resolves matching version, and upgrades to latest unless --version is set

---
summary: "Uninstall Culturabuilder completely (CLI, service, state, workspace)"
read_when:
  - You want to remove Culturabuilder from a machine
  - The gateway service is still running after uninstall
---

# Uninstall

Two paths:
- **Easy path** if `culturabuilder` is still installed.
- **Manual service removal** if the CLI is gone but the service is still running.

## Easy path (CLI still installed)

Recommended: use the built-in uninstaller:

```bash
culturabuilder uninstall
```

Non-interactive (automation / npx):

```bash
culturabuilder uninstall --all --yes --non-interactive
npx -y culturabuilder uninstall --all --yes --non-interactive
```

Manual steps (same result):

1) Stop the gateway service:

```bash
culturabuilder gateway stop
```

2) Uninstall the gateway service (launchd/systemd/schtasks):

```bash
culturabuilder gateway uninstall
```

3) Delete state + config:

```bash
rm -rf "${CULTURABUILDER_STATE_DIR:-$HOME/.culturabuilder}"
```

If you set `CULTURABUILDER_CONFIG_PATH` to a custom location outside the state dir, delete that file too.

4) Delete your workspace (optional, removes agent files):

```bash
rm -rf ~/clawd
```

5) Remove the CLI install (pick the one you used):

```bash
npm rm -g culturabuilder
pnpm remove -g culturabuilder
bun remove -g culturabuilder
```

6) If you installed the macOS app:

```bash
rm -rf /Applications/Culturabuilder.app
```

Notes:
- If you used profiles (`--profile` / `CULTURABUILDER_PROFILE`), repeat step 3 for each state dir (defaults are `~/.culturabuilder-<profile>`).
- In remote mode, the state dir lives on the **gateway host**, so run steps 1-4 there too.

## Manual service removal (CLI not installed)

Use this if the gateway service keeps running but `culturabuilder` is missing.

### macOS (launchd)

Default label is `com.culturabuilder.gateway` (or `com.culturabuilder.<profile>`):

```bash
launchctl bootout gui/$UID/com.culturabuilder.gateway
rm -f ~/Library/LaunchAgents/com.culturabuilder.gateway.plist
```

If you used a profile, replace the label and plist name with `com.culturabuilder.<profile>`. Remove any legacy `bot.molt.*` plists if present.

### Linux (systemd user unit)

Default unit name is `culturabuilder-gateway.service` (or `culturabuilder-gateway-<profile>.service`):

```bash
systemctl --user disable --now culturabuilder-gateway.service
rm -f ~/.config/systemd/user/culturabuilder-gateway.service
systemctl --user daemon-reload
```

### Windows (Scheduled Task)

Default task name is `Culturabuilder Gateway` (or `Culturabuilder Gateway (<profile>)`).
The task script lives under your state dir.

```powershell
schtasks /Delete /F /TN "Culturabuilder Gateway"
Remove-Item -Force "$env:USERPROFILE\.culturabuilder\gateway.cmd"
```

If you used a profile, delete the matching task name and `~\.culturabuilder-<profile>\gateway.cmd`.

## Normal install vs source checkout

### Normal install (install.sh / npm / pnpm / bun)

If you used `https://culturabuilder.com/install.sh` or `install.ps1`, the CLI was installed with `npm install -g culturabuilder@latest`.
Remove it with `npm rm -g culturabuilder` (or `pnpm remove -g` / `bun remove -g` if you installed that way).

### Source checkout (git clone)

If you run from a repo checkout (`git clone` + `culturabuilder ...` / `bun run culturabuilder ...`):

1) Uninstall the gateway service **before** deleting the repo (use the easy path above or manual service removal).
2) Delete the repo directory.
3) Remove state + workspace as shown above.

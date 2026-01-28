import os from "node:os";
import path from "node:path";
import type { CulturabuilderConfig } from "./types.js";

/**
 * Nix mode detection: When CULTURABUILDER_NIX_MODE=1, the gateway is running under Nix.
 * In this mode:
 * - No auto-install flows should be attempted
 * - Missing dependencies should produce actionable Nix-specific error messages
 * - Config is managed externally (read-only from Nix perspective)
 */
export function resolveIsNixMode(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.CULTURABUILDER_NIX_MODE === "1";
}

export const isNixMode = resolveIsNixMode();

const LEGACY_STATE_DIRNAME = ".culturabuilder";
const NEW_STATE_DIRNAME = ".culturabuilder";
const CONFIG_FILENAME = "culturabuilder.json";

function legacyStateDir(homedir: () => string = os.homedir): string {
  return path.join(homedir(), LEGACY_STATE_DIRNAME);
}

function newStateDir(homedir: () => string = os.homedir): string {
  return path.join(homedir(), NEW_STATE_DIRNAME);
}

/**
 * State directory for mutable data (sessions, logs, caches).
 * Can be overridden via CULTURABUILDER_STATE_DIR (preferred) or CULTURABUILDER_STATE_DIR (legacy).
 * Default: ~/.culturabuilder (legacy default for compatibility)
 */
export function resolveStateDir(
  env: NodeJS.ProcessEnv = process.env,
  homedir: () => string = os.homedir,
): string {
  const override = env.CULTURABUILDER_STATE_DIR?.trim() || env.CULTURABUILDER_STATE_DIR?.trim();
  if (override) return resolveUserPath(override);
  return legacyStateDir(homedir);
}

function resolveUserPath(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("~")) {
    const expanded = trimmed.replace(/^~(?=$|[\\/])/, os.homedir());
    return path.resolve(expanded);
  }
  return path.resolve(trimmed);
}

export const STATE_DIR = resolveStateDir();

/**
 * Config file path (JSON5).
 * Can be overridden via CULTURABUILDER_CONFIG_PATH (preferred) or CULTURABUILDER_CONFIG_PATH (legacy).
 * Default: ~/.culturabuilder/culturabuilder.json (or $*_STATE_DIR/culturabuilder.json)
 */
export function resolveConfigPath(
  env: NodeJS.ProcessEnv = process.env,
  stateDir: string = resolveStateDir(env, os.homedir),
): string {
  const override = env.CULTURABUILDER_CONFIG_PATH?.trim() || env.CULTURABUILDER_CONFIG_PATH?.trim();
  if (override) return resolveUserPath(override);
  return path.join(stateDir, CONFIG_FILENAME);
}

export const CONFIG_PATH = resolveConfigPath();

/**
 * Resolve default config path candidates across new + legacy locations.
 * Order: explicit config path → state-dir-derived paths → new default → legacy default.
 */
export function resolveDefaultConfigCandidates(
  env: NodeJS.ProcessEnv = process.env,
  homedir: () => string = os.homedir,
): string[] {
  const explicit = env.CULTURABUILDER_CONFIG_PATH?.trim() || env.CULTURABUILDER_CONFIG_PATH?.trim();
  if (explicit) return [resolveUserPath(explicit)];

  const candidates: string[] = [];
  const culturabuilderStateDir = env.CULTURABUILDER_STATE_DIR?.trim();
  if (culturabuilderStateDir) {
    candidates.push(path.join(resolveUserPath(culturabuilderStateDir), CONFIG_FILENAME));
  }
  const legacyStateDirOverride = env.CULTURABUILDER_STATE_DIR?.trim();
  if (legacyStateDirOverride) {
    candidates.push(path.join(resolveUserPath(legacyStateDirOverride), CONFIG_FILENAME));
  }

  candidates.push(path.join(newStateDir(homedir), CONFIG_FILENAME));
  candidates.push(path.join(legacyStateDir(homedir), CONFIG_FILENAME));
  return candidates;
}

export const DEFAULT_GATEWAY_PORT = 18789;

/**
 * Gateway lock directory (ephemeral).
 * Default: os.tmpdir()/culturabuilder-<uid> (uid suffix when available).
 */
export function resolveGatewayLockDir(tmpdir: () => string = os.tmpdir): string {
  const base = tmpdir();
  const uid = typeof process.getuid === "function" ? process.getuid() : undefined;
  const suffix = uid != null ? `culturabuilder-${uid}` : "culturabuilder";
  return path.join(base, suffix);
}

const OAUTH_FILENAME = "oauth.json";

/**
 * OAuth credentials storage directory.
 *
 * Precedence:
 * - `CULTURABUILDER_OAUTH_DIR` (explicit override)
 * - `$*_STATE_DIR/credentials` (canonical server/default)
 * - `~/.culturabuilder/credentials` (legacy default)
 */
export function resolveOAuthDir(
  env: NodeJS.ProcessEnv = process.env,
  stateDir: string = resolveStateDir(env, os.homedir),
): string {
  const override = env.CULTURABUILDER_OAUTH_DIR?.trim();
  if (override) return resolveUserPath(override);
  return path.join(stateDir, "credentials");
}

export function resolveOAuthPath(
  env: NodeJS.ProcessEnv = process.env,
  stateDir: string = resolveStateDir(env, os.homedir),
): string {
  return path.join(resolveOAuthDir(env, stateDir), OAUTH_FILENAME);
}

export function resolveGatewayPort(
  cfg?: CulturabuilderConfig,
  env: NodeJS.ProcessEnv = process.env,
): number {
  const envRaw = env.CULTURABUILDER_GATEWAY_PORT?.trim();
  if (envRaw) {
    const parsed = Number.parseInt(envRaw, 10);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  const configPort = cfg?.gateway?.port;
  if (typeof configPort === "number" && Number.isFinite(configPort)) {
    if (configPort > 0) return configPort;
  }
  return DEFAULT_GATEWAY_PORT;
}

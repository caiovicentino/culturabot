// Default service labels
export const GATEWAY_LAUNCH_AGENT_LABEL = "com.culturabuilder.gateway";
export const GATEWAY_SYSTEMD_SERVICE_NAME = "culturabuilder-gateway";
export const GATEWAY_WINDOWS_TASK_NAME = "Culturabuilder Gateway";
export const GATEWAY_SERVICE_MARKER = "culturabuilder";
export const GATEWAY_SERVICE_KIND = "gateway";
export const NODE_LAUNCH_AGENT_LABEL = "com.culturabuilder.node";
export const NODE_SYSTEMD_SERVICE_NAME = "culturabuilder-node";
export const NODE_WINDOWS_TASK_NAME = "Culturabuilder Node";
export const NODE_SERVICE_MARKER = "culturabuilder";
export const NODE_SERVICE_KIND = "node";
export const NODE_WINDOWS_TASK_SCRIPT_NAME = "node.cmd";
export const LEGACY_GATEWAY_LAUNCH_AGENT_LABELS = [
  "bot.molt.gateway",
  "com.steipete.culturabuilder.gateway",
];
export const LEGACY_GATEWAY_SYSTEMD_SERVICE_NAMES: string[] = [];
export const LEGACY_GATEWAY_WINDOWS_TASK_NAMES: string[] = [];

export function normalizeGatewayProfile(profile?: string): string | null {
  const trimmed = profile?.trim();
  if (!trimmed || trimmed.toLowerCase() === "default") return null;
  return trimmed;
}

export function resolveGatewayProfileSuffix(profile?: string): string {
  const normalized = normalizeGatewayProfile(profile);
  return normalized ? `-${normalized}` : "";
}

export function resolveGatewayLaunchAgentLabel(profile?: string): string {
  const normalized = normalizeGatewayProfile(profile);
  if (!normalized) {
    return GATEWAY_LAUNCH_AGENT_LABEL;
  }
  return `com.culturabuilder.${normalized}`;
}

export function resolveLegacyGatewayLaunchAgentLabels(profile?: string): string[] {
  const normalized = normalizeGatewayProfile(profile);
  if (!normalized) {
    return [...LEGACY_GATEWAY_LAUNCH_AGENT_LABELS];
  }
  return [...LEGACY_GATEWAY_LAUNCH_AGENT_LABELS, `bot.molt.${normalized}`];
}

export function resolveGatewaySystemdServiceName(profile?: string): string {
  const suffix = resolveGatewayProfileSuffix(profile);
  if (!suffix) return GATEWAY_SYSTEMD_SERVICE_NAME;
  return `culturabuilder-gateway${suffix}`;
}

export function resolveGatewayWindowsTaskName(profile?: string): string {
  const normalized = normalizeGatewayProfile(profile);
  if (!normalized) return GATEWAY_WINDOWS_TASK_NAME;
  return `Culturabuilder Gateway (${normalized})`;
}

export function formatGatewayServiceDescription(params?: {
  profile?: string;
  version?: string;
}): string {
  const profile = normalizeGatewayProfile(params?.profile);
  const version = params?.version?.trim();
  const parts: string[] = [];
  if (profile) parts.push(`profile: ${profile}`);
  if (version) parts.push(`v${version}`);
  if (parts.length === 0) return "Culturabuilder Gateway";
  return `Culturabuilder Gateway (${parts.join(", ")})`;
}

export function resolveNodeLaunchAgentLabel(): string {
  return NODE_LAUNCH_AGENT_LABEL;
}

export function resolveNodeSystemdServiceName(): string {
  return NODE_SYSTEMD_SERVICE_NAME;
}

export function resolveNodeWindowsTaskName(): string {
  return NODE_WINDOWS_TASK_NAME;
}

export function formatNodeServiceDescription(params?: { version?: string }): string {
  const version = params?.version?.trim();
  if (!version) return "Culturabuilder Node Host";
  return `Culturabuilder Node Host (v${version})`;
}

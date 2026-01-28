import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "culturabuilder",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) throw new Error(res.error);
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual([
      "node",
      "culturabuilder",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "culturabuilder", "--dev", "gateway"]);
    if (!res.ok) throw new Error(res.error);
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "culturabuilder", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "culturabuilder", "--profile", "work", "status"]);
    if (!res.ok) throw new Error(res.error);
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "culturabuilder", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "culturabuilder", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (dev first)", () => {
    const res = parseCliProfileArgs([
      "node",
      "culturabuilder",
      "--dev",
      "--profile",
      "work",
      "status",
    ]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (profile first)", () => {
    const res = parseCliProfileArgs([
      "node",
      "culturabuilder",
      "--profile",
      "work",
      "--dev",
      "status",
    ]);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join("/home/peter", ".culturabuilder-dev");
    expect(env.CULTURABUILDER_PROFILE).toBe("dev");
    expect(env.CULTURABUILDER_STATE_DIR).toBe(expectedStateDir);
    expect(env.CULTURABUILDER_CONFIG_PATH).toBe(path.join(expectedStateDir, "culturabuilder.json"));
    expect(env.CULTURABUILDER_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      CULTURABUILDER_STATE_DIR: "/custom",
      CULTURABUILDER_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.CULTURABUILDER_STATE_DIR).toBe("/custom");
    expect(env.CULTURABUILDER_GATEWAY_PORT).toBe("19099");
    expect(env.CULTURABUILDER_CONFIG_PATH).toBe(path.join("/custom", "culturabuilder.json"));
  });
});

describe("formatCliCommand", () => {
  it("returns command unchanged when no profile is set", () => {
    expect(formatCliCommand("culturabuilder doctor --fix", {})).toBe("culturabuilder doctor --fix");
  });

  it("returns command unchanged when profile is default", () => {
    expect(
      formatCliCommand("culturabuilder doctor --fix", { CULTURABUILDER_PROFILE: "default" }),
    ).toBe("culturabuilder doctor --fix");
  });

  it("returns command unchanged when profile is Default (case-insensitive)", () => {
    expect(
      formatCliCommand("culturabuilder doctor --fix", { CULTURABUILDER_PROFILE: "Default" }),
    ).toBe("culturabuilder doctor --fix");
  });

  it("returns command unchanged when profile is invalid", () => {
    expect(
      formatCliCommand("culturabuilder doctor --fix", { CULTURABUILDER_PROFILE: "bad profile" }),
    ).toBe("culturabuilder doctor --fix");
  });

  it("returns command unchanged when --profile is already present", () => {
    expect(
      formatCliCommand("culturabuilder --profile work doctor --fix", {
        CULTURABUILDER_PROFILE: "work",
      }),
    ).toBe("culturabuilder --profile work doctor --fix");
  });

  it("returns command unchanged when --dev is already present", () => {
    expect(formatCliCommand("culturabuilder --dev doctor", { CULTURABUILDER_PROFILE: "dev" })).toBe(
      "culturabuilder --dev doctor",
    );
  });

  it("inserts --profile flag when profile is set", () => {
    expect(
      formatCliCommand("culturabuilder doctor --fix", { CULTURABUILDER_PROFILE: "work" }),
    ).toBe("culturabuilder --profile work doctor --fix");
  });

  it("trims whitespace from profile", () => {
    expect(
      formatCliCommand("culturabuilder doctor --fix", { CULTURABUILDER_PROFILE: "  jbclawd  " }),
    ).toBe("culturabuilder --profile jbclawd doctor --fix");
  });

  it("handles command with no args after culturabuilder", () => {
    expect(formatCliCommand("culturabuilder", { CULTURABUILDER_PROFILE: "test" })).toBe(
      "culturabuilder --profile test",
    );
  });

  it("handles pnpm wrapper", () => {
    expect(formatCliCommand("pnpm culturabuilder doctor", { CULTURABUILDER_PROFILE: "work" })).toBe(
      "pnpm culturabuilder --profile work doctor",
    );
  });
});

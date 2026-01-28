import path from "node:path";

import { describe, expect, it } from "vitest";

import { resolveGatewayStateDir } from "./paths.js";

describe("resolveGatewayStateDir", () => {
  it("uses the default state dir when no overrides are set", () => {
    const env = { HOME: "/Users/test" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".culturabuilder"));
  });

  it("appends the profile suffix when set", () => {
    const env = { HOME: "/Users/test", CULTURABUILDER_PROFILE: "rescue" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".culturabuilder-rescue"));
  });

  it("treats default profiles as the base state dir", () => {
    const env = { HOME: "/Users/test", CULTURABUILDER_PROFILE: "Default" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".culturabuilder"));
  });

  it("uses CULTURABUILDER_STATE_DIR when provided", () => {
    const env = { HOME: "/Users/test", CULTURABUILDER_STATE_DIR: "/var/lib/culturabuilder" };
    expect(resolveGatewayStateDir(env)).toBe(path.resolve("/var/lib/culturabuilder"));
  });

  it("expands ~ in CULTURABUILDER_STATE_DIR", () => {
    const env = { HOME: "/Users/test", CULTURABUILDER_STATE_DIR: "~/culturabuilder-state" };
    expect(resolveGatewayStateDir(env)).toBe(path.resolve("/Users/test/culturabuilder-state"));
  });

  it("preserves Windows absolute paths without HOME", () => {
    const env = { CULTURABUILDER_STATE_DIR: "C:\\State\\culturabuilder" };
    expect(resolveGatewayStateDir(env)).toBe("C:\\State\\culturabuilder");
  });
});

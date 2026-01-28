import { describe, expect, it } from "vitest";

import {
  buildParseArgv,
  getFlagValue,
  getCommandPath,
  getPrimaryCommand,
  getPositiveIntFlagValue,
  getVerboseFlag,
  hasHelpOrVersion,
  hasFlag,
  shouldMigrateState,
  shouldMigrateStateFromPath,
} from "./argv.js";

describe("argv helpers", () => {
  it("detects help/version flags", () => {
    expect(hasHelpOrVersion(["node", "culturabuilder", "--help"])).toBe(true);
    expect(hasHelpOrVersion(["node", "culturabuilder", "-V"])).toBe(true);
    expect(hasHelpOrVersion(["node", "culturabuilder", "status"])).toBe(false);
  });

  it("extracts command path ignoring flags and terminator", () => {
    expect(getCommandPath(["node", "culturabuilder", "status", "--json"], 2)).toEqual(["status"]);
    expect(getCommandPath(["node", "culturabuilder", "agents", "list"], 2)).toEqual([
      "agents",
      "list",
    ]);
    expect(getCommandPath(["node", "culturabuilder", "status", "--", "ignored"], 2)).toEqual([
      "status",
    ]);
  });

  it("returns primary command", () => {
    expect(getPrimaryCommand(["node", "culturabuilder", "agents", "list"])).toBe("agents");
    expect(getPrimaryCommand(["node", "culturabuilder"])).toBeNull();
  });

  it("parses boolean flags and ignores terminator", () => {
    expect(hasFlag(["node", "culturabuilder", "status", "--json"], "--json")).toBe(true);
    expect(hasFlag(["node", "culturabuilder", "--", "--json"], "--json")).toBe(false);
  });

  it("extracts flag values with equals and missing values", () => {
    expect(
      getFlagValue(["node", "culturabuilder", "status", "--timeout", "5000"], "--timeout"),
    ).toBe("5000");
    expect(getFlagValue(["node", "culturabuilder", "status", "--timeout=2500"], "--timeout")).toBe(
      "2500",
    );
    expect(getFlagValue(["node", "culturabuilder", "status", "--timeout"], "--timeout")).toBeNull();
    expect(
      getFlagValue(["node", "culturabuilder", "status", "--timeout", "--json"], "--timeout"),
    ).toBe(null);
    expect(
      getFlagValue(["node", "culturabuilder", "--", "--timeout=99"], "--timeout"),
    ).toBeUndefined();
  });

  it("parses verbose flags", () => {
    expect(getVerboseFlag(["node", "culturabuilder", "status", "--verbose"])).toBe(true);
    expect(getVerboseFlag(["node", "culturabuilder", "status", "--debug"])).toBe(false);
    expect(
      getVerboseFlag(["node", "culturabuilder", "status", "--debug"], { includeDebug: true }),
    ).toBe(true);
  });

  it("parses positive integer flag values", () => {
    expect(
      getPositiveIntFlagValue(["node", "culturabuilder", "status"], "--timeout"),
    ).toBeUndefined();
    expect(
      getPositiveIntFlagValue(["node", "culturabuilder", "status", "--timeout"], "--timeout"),
    ).toBeNull();
    expect(
      getPositiveIntFlagValue(
        ["node", "culturabuilder", "status", "--timeout", "5000"],
        "--timeout",
      ),
    ).toBe(5000);
    expect(
      getPositiveIntFlagValue(
        ["node", "culturabuilder", "status", "--timeout", "nope"],
        "--timeout",
      ),
    ).toBeUndefined();
  });

  it("builds parse argv from raw args", () => {
    const nodeArgv = buildParseArgv({
      programName: "culturabuilder",
      rawArgs: ["node", "culturabuilder", "status"],
    });
    expect(nodeArgv).toEqual(["node", "culturabuilder", "status"]);

    const versionedNodeArgv = buildParseArgv({
      programName: "culturabuilder",
      rawArgs: ["node-22", "culturabuilder", "status"],
    });
    expect(versionedNodeArgv).toEqual(["node-22", "culturabuilder", "status"]);

    const versionedNodeWindowsArgv = buildParseArgv({
      programName: "culturabuilder",
      rawArgs: ["node-22.2.0.exe", "culturabuilder", "status"],
    });
    expect(versionedNodeWindowsArgv).toEqual(["node-22.2.0.exe", "culturabuilder", "status"]);

    const versionedNodePatchlessArgv = buildParseArgv({
      programName: "culturabuilder",
      rawArgs: ["node-22.2", "culturabuilder", "status"],
    });
    expect(versionedNodePatchlessArgv).toEqual(["node-22.2", "culturabuilder", "status"]);

    const versionedNodeWindowsPatchlessArgv = buildParseArgv({
      programName: "culturabuilder",
      rawArgs: ["node-22.2.exe", "culturabuilder", "status"],
    });
    expect(versionedNodeWindowsPatchlessArgv).toEqual([
      "node-22.2.exe",
      "culturabuilder",
      "status",
    ]);

    const versionedNodeWithPathArgv = buildParseArgv({
      programName: "culturabuilder",
      rawArgs: ["/usr/bin/node-22.2.0", "culturabuilder", "status"],
    });
    expect(versionedNodeWithPathArgv).toEqual(["/usr/bin/node-22.2.0", "culturabuilder", "status"]);

    const nodejsArgv = buildParseArgv({
      programName: "culturabuilder",
      rawArgs: ["nodejs", "culturabuilder", "status"],
    });
    expect(nodejsArgv).toEqual(["nodejs", "culturabuilder", "status"]);

    const nonVersionedNodeArgv = buildParseArgv({
      programName: "culturabuilder",
      rawArgs: ["node-dev", "culturabuilder", "status"],
    });
    expect(nonVersionedNodeArgv).toEqual([
      "node",
      "culturabuilder",
      "node-dev",
      "culturabuilder",
      "status",
    ]);

    const directArgv = buildParseArgv({
      programName: "culturabuilder",
      rawArgs: ["culturabuilder", "status"],
    });
    expect(directArgv).toEqual(["node", "culturabuilder", "status"]);

    const bunArgv = buildParseArgv({
      programName: "culturabuilder",
      rawArgs: ["bun", "src/entry.ts", "status"],
    });
    expect(bunArgv).toEqual(["bun", "src/entry.ts", "status"]);
  });

  it("builds parse argv from fallback args", () => {
    const fallbackArgv = buildParseArgv({
      programName: "culturabuilder",
      fallbackArgv: ["status"],
    });
    expect(fallbackArgv).toEqual(["node", "culturabuilder", "status"]);
  });

  it("decides when to migrate state", () => {
    expect(shouldMigrateState(["node", "culturabuilder", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "culturabuilder", "health"])).toBe(false);
    expect(shouldMigrateState(["node", "culturabuilder", "sessions"])).toBe(false);
    expect(shouldMigrateState(["node", "culturabuilder", "memory", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "culturabuilder", "agent", "--message", "hi"])).toBe(false);
    expect(shouldMigrateState(["node", "culturabuilder", "agents", "list"])).toBe(true);
    expect(shouldMigrateState(["node", "culturabuilder", "message", "send"])).toBe(true);
  });

  it("reuses command path for migrate state decisions", () => {
    expect(shouldMigrateStateFromPath(["status"])).toBe(false);
    expect(shouldMigrateStateFromPath(["agents", "list"])).toBe(true);
  });
});

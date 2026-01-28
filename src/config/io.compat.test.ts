import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { createConfigIO } from "./io.js";

async function withTempHome(run: (home: string) => Promise<void>): Promise<void> {
  const home = await fs.mkdtemp(path.join(os.tmpdir(), "culturabuilder-config-"));
  try {
    await run(home);
  } finally {
    await fs.rm(home, { recursive: true, force: true });
  }
}

async function writeConfig(home: string, dirname: ".culturabuilder", port: number) {
  const dir = path.join(home, dirname);
  await fs.mkdir(dir, { recursive: true });
  const configPath = path.join(dir, "culturabuilder.json");
  await fs.writeFile(configPath, JSON.stringify({ gateway: { port } }, null, 2));
  return configPath;
}

describe("config io compat (new + legacy folders)", () => {
  it("prefers ~/.culturabuilder/culturabuilder.json when both configs exist", async () => {
    await withTempHome(async (home) => {
      const newConfigPath = await writeConfig(home, ".culturabuilder", 19001);
      await writeConfig(home, ".culturabuilder", 18789);

      const io = createConfigIO({
        env: {} as NodeJS.ProcessEnv,
        homedir: () => home,
      });
      expect(io.configPath).toBe(newConfigPath);
      expect(io.loadConfig().gateway?.port).toBe(19001);
    });
  });

  it("falls back to ~/.culturabuilder/culturabuilder.json when only legacy exists", async () => {
    await withTempHome(async (home) => {
      const legacyConfigPath = await writeConfig(home, ".culturabuilder", 20001);

      const io = createConfigIO({
        env: {} as NodeJS.ProcessEnv,
        homedir: () => home,
      });

      expect(io.configPath).toBe(legacyConfigPath);
      expect(io.loadConfig().gateway?.port).toBe(20001);
    });
  });

  it("honors explicit legacy config path env override", async () => {
    await withTempHome(async (home) => {
      const newConfigPath = await writeConfig(home, ".culturabuilder", 19002);
      const legacyConfigPath = await writeConfig(home, ".culturabuilder", 20002);

      const io = createConfigIO({
        env: { CULTURABUILDER_CONFIG_PATH: legacyConfigPath } as NodeJS.ProcessEnv,
        homedir: () => home,
      });

      expect(io.configPath).not.toBe(newConfigPath);
      expect(io.configPath).toBe(legacyConfigPath);
      expect(io.loadConfig().gateway?.port).toBe(20002);
    });
  });
});

import type { CulturabuilderPluginApi } from "culturabuilder/plugin-sdk";
import { emptyPluginConfigSchema } from "culturabuilder/plugin-sdk";

import { linePlugin } from "./src/channel.js";
import { registerLineCardCommand } from "./src/card-command.js";
import { setLineRuntime } from "./src/runtime.js";

const plugin = {
  id: "line",
  name: "LINE",
  description: "LINE Messaging API channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: CulturabuilderPluginApi) {
    setLineRuntime(api.runtime);
    api.registerChannel({ plugin: linePlugin });
    registerLineCardCommand(api);
  },
};

export default plugin;

import type { CulturabuilderPluginApi } from "../../src/plugins/types.js";

import { createLobsterTool } from "./src/lobster-tool.js";

export default function register(api: CulturabuilderPluginApi) {
  api.registerTool(
    (ctx) => {
      if (ctx.sandboxed) return null;
      return createLobsterTool(api);
    },
    { optional: true },
  );
}

import type { CulturabuilderPluginApi } from "../../src/plugins/types.js";

import { createLlmTaskTool } from "./src/llm-task-tool.js";

export default function register(api: CulturabuilderPluginApi) {
  api.registerTool(createLlmTaskTool(api), { optional: true });
}

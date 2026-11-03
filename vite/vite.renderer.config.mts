import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig(({ mode }) => ({
  root: fileURLToPath(new URL("../src/renderer/", import.meta.url)),
  base: mode === "github-pages" ? "/LIDLbot/" : "/",
}));
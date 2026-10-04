import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  autoIcons: {
    baseIconPath: "assets/icon.svg",
    developmentIndicator: false,
  },
  srcDir: "src",
  entrypointsDir: "app",
  vite: () => ({
    plugins: [tailwindcss() as any],
  }),
  manifest: {
    permissions: ["storage"],
  },
});

import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";

export default defineConfig(() => {
  return {
    build: {
      target: "es2020",
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      ssr: {
        entry: "./src/entry.ssr.tsx",
      },
      dev: {
        entry: "./src/entry.dev.tsx",
      },
    },
    plugins: [qwikVite()],
  };
});

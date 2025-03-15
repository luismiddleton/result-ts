import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      exclude: ['docs/**', '*.config.ts'],
      reporter: ["json", "text", "html"],
    },
  },
});

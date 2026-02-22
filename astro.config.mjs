// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://latimeria.example.com",
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      GOOGLE_SHEET_ID: envField.string({
        context: "server",
        access: "public",
      }),
      PUBLIC_GAS_ENDPOINT: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
});

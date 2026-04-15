import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/championship-challenge-table/",
  plugins: [preact()],
});

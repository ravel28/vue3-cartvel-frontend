// jika menggunakan ES Module (import/export)
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // ← wajib import path
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

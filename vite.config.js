import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    allowedHosts: ['snba-admin-dashboard-1.onrender.com'],
  },
  plugins: [
    react(),
    tailwindcss()
  ],
});
 
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "/",
  preview: {
    // The sandbox forwards the preview through a generated *.manus.computer host.
    // This is only for the local preview server, not the production deployment.
    allowedHosts: true,
  },
  server: {
    watch: {
      ignored: ["**/*.pptx", "**/*.pdf"],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          motion: ["framer-motion"],
          react: ["react", "react-dom", "react-router-dom"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});

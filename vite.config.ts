import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react(),
    // Only use tempo in development mode
    process.env.NODE_ENV === "development" ? tempo() : null,
  ].filter(Boolean),
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
  },
  build: {
    outDir: "dist",
    // Optimize for mobile
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // Generate source maps for easier debugging
    sourcemap: true,
    rollupOptions: {
      // Externalize tempo-routes in production build
      external: ["tempo-routes"],
    },
  },
});

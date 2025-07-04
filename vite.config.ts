import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const isProd = env.NODE_ENV === "production"
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./vitest.setup.ts",
      // include: ["**/*.{test, spec}.{js, mjs, cjs, ts, mts, cts, jsx, tsx}"]
    },
    build: {
      minify: "terser",
      rollupOptions: {
        plugins: [
          isProd && visualizer({
            open: true,
            filename: "dist/stats.html",
            gzipSize: true,
            brotliSize: true,
          })
        ].filter(Boolean),
        output: {
          entryFileNames: `assets/[name]-[hash].js`,
          chunkFileNames: `assets/[name]-[hash].js`,
          assetFileNames: `assets/[name]-[hash].[ext]`,
          manualChunks(id) {
            if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
              return "react-vendor";
            }
            if (id.includes("node_modules")) {
              const parts = id.split("node_modules/");
              const packageName = parts[parts.length - 1].split("/")[0];  // パッケージ名を取得
              if (["axios"].includes(packageName)) {
                return `vendor-${packageName}`;
              }
              return "other-vendor";
            }
          }
        }
      }
    }
  }   
})

import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  base: "packages/dartpad",
  build: {
    emptyOutDir: false,
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "src/dartpad.ts"),
      name: "dartpad",
      fileName: (format, entryName) => {
        return `${entryName}.${format}.js`
      },
    },
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]",
        chunkFileNames: "assets/[name].js",
      }
    }
  },
  worker: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
      }
    }
  }
})
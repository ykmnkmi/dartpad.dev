import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  base: "",
  build: {
    emptyOutDir: false,
    outDir: "web",
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
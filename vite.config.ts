import { defineConfig } from "vite"

export default defineConfig({
  assetsInclude: ['**/*.tar.bz'],
  base: '',
  build: {
    emptyOutDir: false,
    outDir: 'docs',
    // rollupOptions: {
    //   output: {
    //     assetFileNames: "assets/[name].[ext]",
    //     chunkFileNames: "assets/[name].js",
    //   }
    // }
  },
  // worker: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: "assets/[name].js",
  //     }
  //   }
  // },
})
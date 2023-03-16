import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), visualizer({ open: true }),
     viteCompression({
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  base: "/client/",
  build: {
    outDir: "../dist/public/client",
    rollupOptions:{
      output:{
        manualChunks(id){
          if(id.includes('css-doodle')){
            return "vender"
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1111',
        changeOrigin: true,
      },
      '/upload': {
        target: 'http://localhost:1111',
        changeOrigin: true,
      },
    },
    // host:"172.20.10.3"
  }
})

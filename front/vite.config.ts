import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: "/client/",
  build: {
    outDir: "../dist/public/client",
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

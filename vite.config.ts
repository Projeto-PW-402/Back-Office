import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/Back-Office/',
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        sanitizeFileName: (name) => {
          // Sanitizes file names generated during the build process:
          // - Replaces spaces with dashes ('-').
          // - Removes invalid characters that are not alphanumeric, underscores (_), periods (.), or dashes (-).
          return name
            .replace(/\s+/g, '-') // Replaces spaces with dashes.
            .replace(/[^a-zA-Z0-9_.-]/g, '') // Removes all invalid characters.
        },
      },
    },
  },
})

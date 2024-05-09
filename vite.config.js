import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        { src: './manifest.json', dest: './' },
        { src: './content-pages', dest: './' },
        { src: './images', dest: './' }
        // { src: 'content-pages', dest: '' } // Example for copying a directory
      ],
      verbose: true // Optional: Whether to log copied files
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

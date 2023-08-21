// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        postDetails: resolve(__dirname, 'post-details.html'),
        addEditPost: resolve(__dirname, 'add-edit-post.html'),
      },
    },
  },
})
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// @ts-ignore
/** @type {import('vite').UserConfig} */

export default defineConfig({
  plugins:
      [
          react(),
      ],
  resolve: {
    alias: {
      "@" : "/src",
      'styles': '/src/styles',
    },
  },
  define: {
    // Определение переменной окружения с абсолютным путем до шрифтов
    __FONTS_PATH__: JSON.stringify('/src/styles/fonts'),
  },

});

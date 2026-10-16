import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  integrations: [react()],
  output: 'static',
  devToolbar: { enabled: false },
  vite: {
    cacheDir: isProduction ? 'node_modules/.vite-build' : 'node_modules/.vite',
  },
});

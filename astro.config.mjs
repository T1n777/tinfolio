import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkMermaid from './src/lib/remark-mermaid.mjs';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  integrations: [react(), mdx()],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
    remarkPlugins: [remarkMermaid],
  },
  output: 'static',
  devToolbar: { enabled: false },
  vite: {
    cacheDir: isProduction ? 'node_modules/.vite-build' : 'node_modules/.vite',
  },
});

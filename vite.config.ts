import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3002,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@olwiba/ui': resolve('./src/index.ts'),
    },
    /** Linked `@olwiba/cn` resolves Radix from `olwibaCN/node_modules`; that pulls a second `react` and breaks SSR hooks. */
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react-resizable-panels'],
    esbuildOptions: {
      mainFields: ['module', 'main'],
    },
  },
  ssr: {
    noExternal: [
      'react-resizable-panels',
      '@olwiba/cn',
      '@olwiba/docs',
    ],
  },
  plugins: [
    mdx(await import('./source.config')),
    tailwindcss(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      srcDirectory: 'site',
    }),
    react(),
  ],
});

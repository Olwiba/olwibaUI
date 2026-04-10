import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import { resolve } from 'path';
import { createDevBannerPlugin } from '@olwiba/docs/dev-banner';

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
      // Radix packages are deps of @olwiba/cn. Without this they resolve as SSR
      // externals from olwibaCN/node_modules and pull a second React instance,
      // causing "Cannot read properties of null (reading 'useMemo')".
      /^@radix-ui\//,
    ],
  },
  plugins: [
    createDevBannerPlugin({
      segments: [
        { text: 'olwiba' },
        { text: 'UI', colorHex: '#a855f7' },
      ],
    }),
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

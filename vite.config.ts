import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import { resolve } from 'path';
import { createDevBannerPlugin, resolveDevPort } from '@olwiba/dx';
import { projectBanner } from './site/project.config';

export default defineConfig({
  server: {
    port: await resolveDevPort(3002),
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@olwiba/ui': resolve('./src/index.ts'),
    },
    /**
     * Linked `@olwiba/cn` resolves Radix from `olwibaCN/node_modules`; that pulls a second `react` and breaks SSR hooks.
     * `@olwiba/cn` itself too: linked `@olwiba/docs` resolves it through olwibaDOCS's own pin, which lags the
     * workspace. Vite prebundles that copy under the bare id and serves it to every importer, so the site got an
     * old CN without newer exports (`notify`), threw before hydration, and the nav went dead.
     */
    dedupe: ['react', 'react-dom', '@olwiba/cn'],
  },
  optimizeDeps: {
    include: ['react-resizable-panels'],
    exclude: ['@olwiba/docs'],
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
    createDevBannerPlugin(projectBanner),
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

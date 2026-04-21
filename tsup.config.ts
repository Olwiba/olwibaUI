import { defineConfig } from 'tsup';
import { createTsupBannerHook } from '@olwiba/dx';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@olwiba/cn'],
  sourcemap: true,
  treeshake: true,
  onSuccess: createTsupBannerHook({
    segments: [
      { text: 'olwiba' },
      { text: 'UI', colorHex: '#a855f7' },
    ],
  }),
});

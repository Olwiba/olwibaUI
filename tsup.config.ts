import { defineConfig } from 'tsup';
import { createTsupBannerHook } from '@olwiba/dx';
import { projectBanner } from './site/project.config';

export default defineConfig({
  entry: ['src/index.ts', 'src/email/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@olwiba/cn', '@olwiba/cn/email', '@content-collections/mdx'],
  sourcemap: true,
  treeshake: true,
  onSuccess: createTsupBannerHook(projectBanner),
});

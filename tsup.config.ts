import { defineConfig } from 'tsup';
import { createTsupBannerHook } from '@olwiba/dx';
import { projectBanner } from './site/project.config';

const isWatch = process.argv.includes('--watch');

export default defineConfig({
  entry: ['src/index.ts', 'src/email/index.ts', 'src/mdx/index.ts'],
  format: ['esm'],
  dts: true,
  clean: !isWatch,
  external: ['react', 'react-dom', '@olwiba/cn', '@olwiba/cn/email', '@content-collections/mdx'],
  sourcemap: true,
  treeshake: true,
  onSuccess: createTsupBannerHook(projectBanner),
});

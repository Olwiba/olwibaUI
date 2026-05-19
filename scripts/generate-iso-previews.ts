import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generatePreviews } from '@olwiba/dx/generate-previews';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await generatePreviews({
  baseUrl: 'http://localhost:3002',
  outputDir: path.join(__dirname, '../public/iso-previews'),
  manifestPath: path.join(__dirname, '../site/iso-previews-manifest.json'),
  themes: ['light', 'dark'],
  viewport: { width: 1280, height: 800 },
  components: [
    { name: 'app-shell', urlPath: '/docs/app/app-shell' },
    { name: 'auth-section', urlPath: '/docs/app/auth-section' },
    { name: 'empty-state', urlPath: '/docs/app/empty-state' },
    { name: 'error-page', urlPath: '/docs/app/error-page' },
    { name: 'dock', urlPath: '/docs/components/dock' },
    { name: 'feature-card', urlPath: '/docs/components/feature-card' },
    { name: 'glass-card', urlPath: '/docs/components/glass-card' },
    { name: 'image-card', urlPath: '/docs/components/image-card' },
    { name: 'pricing-card', urlPath: '/docs/components/pricing-card' },
    { name: 'spotlight', urlPath: '/docs/components/spotlight' },
    { name: 'stat-card', urlPath: '/docs/components/stat-card' },
    { name: 'testimonial-card', urlPath: '/docs/components/testimonial-card' },
    { name: 'context-menu', urlPath: '/docs/components/context-menu' },
    { name: 'confirm-dialog', urlPath: '/docs/components/confirm-dialog' },
    { name: 'count-up', urlPath: '/docs/motion/count-up' },
    { name: 'fade-in', urlPath: '/docs/motion/fade-in' },
    { name: 'stagger-children', urlPath: '/docs/motion/stagger-children' },
    { name: 'contact-section', urlPath: '/docs/marketing/contact-section' },
    { name: 'cta-section', urlPath: '/docs/marketing/cta-section' },
    { name: 'faq-section', urlPath: '/docs/marketing/faq-section' },
  ],
});

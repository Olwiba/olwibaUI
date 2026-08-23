import { Bell, Blocks, Rocket } from 'lucide-react';

export const demoHero = {
  badge: 'Launch kit',
  heading: 'Ship polished product pages without rebuilding the same sections',
  description:
    'Composable marketing blocks, app shells, and interaction patterns built on the Olwiba design system.',
  primaryCta: { label: 'Explore blocks', href: '#features' },
  secondaryCta: { label: 'View docs', href: '/docs' },
  media: 'image' as const,
  heroImage: (
    <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-primary/20 via-background to-muted p-8">
      <div className="rounded-3xl border bg-background/80 p-6 text-center shadow-xl backdrop-blur">
        <Rocket className="mx-auto mb-3 size-10 text-primary" />
        <p className="text-sm font-medium text-muted-foreground">Preview-ready UI blocks</p>
      </div>
    </div>
  ),
};

export const demoFeatures = [
  {
    icon: Blocks,
    title: 'Composable sections',
    description: 'Hero, CTA, pricing, FAQ, and feature blocks that can be assembled quickly.',
  },
  {
    icon: Bell,
    title: 'Product patterns',
    description: 'App-ready components for dashboards, notifications, and settings screens.',
  },
  {
    icon: Rocket,
    title: 'Launch focused',
    description: 'Sensible defaults keep demos useful before a product adds custom copy.',
  },
];

export const demoStats = [
  { value: '40+', label: 'Blocks', description: 'Reusable sections, shells, and app patterns.' },
  { value: '3', label: 'Layers', description: 'CN primitives, UI blocks, and Pro compositions.' },
  { value: '100%', label: 'Composable', description: 'Bring your router, copy, and product logic.' },
  { value: '0', label: 'Blank demos', description: 'Required props are supplied in the docs site.' },
];

export const demoTestimonials = [
  {
    quote: 'The defaults are polished enough to preview, but still flexible once product copy lands.',
    name: 'Ollie',
    role: 'Founder',
    company: 'Olwiba',
    initials: 'O',
    rating: 5,
  },
  {
    quote: 'A shared block system means the next product starts from a stronger baseline.',
    name: 'Nexus',
    role: 'Factory layer',
    company: 'Olwiba',
    initials: 'N',
    rating: 5,
  },
];

export const demoPlans = [
  {
    name: 'Starter',
    monthly: 0,
    annual: 0,
    description: 'For trying the component surface in a small product.',
    cta: 'Start free',
    features: [
      { label: 'Core marketing sections', included: true },
      { label: 'App shell patterns', included: true },
      { label: 'Premium compositions', included: false },
    ],
  },
  {
    name: 'Pro',
    monthly: 29,
    annual: 290,
    description: 'For products that need richer launch and app surfaces.',
    cta: 'Upgrade',
    highlighted: true,
    features: [
      { label: 'Everything in Starter', included: true },
      { label: 'Advanced app blocks', included: true },
      { label: 'Private Pro components', included: true },
    ],
  },
];

export const demoCta = {
  heading: 'Start with the blocks, then make them yours',
  description: 'Use the defaults to prototype quickly, then pass product-specific copy and actions.',
  primaryCta: { label: 'Browse components', href: '/docs' },
  secondaryCta: { label: 'See features', href: '#features' },
  footnote: 'Built on @olwiba/cn tokens and primitives.',
};

export const demoFaqItems = [
  {
    question: 'Can these blocks be used in a real app?',
    answer: 'Yes. They are published package components, not one-off docs examples.',
  },
  {
    question: 'Do I need to provide props?',
    answer: 'Required content props keep production pages explicit while demos supply safe sample data.',
  },
  {
    question: 'Can links use a router?',
    answer: 'Yes. Components accept renderLink where routing needs to be framework-specific.',
  },
];

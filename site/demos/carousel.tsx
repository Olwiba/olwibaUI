'use client';
import { Carousel, FeatureCard, ImageCard } from '@olwiba/ui';
import { Blocks, Layers, Palette, Rocket, ShieldCheck, Zap } from 'lucide-react';

const features = [
  { icon: Blocks, title: 'Composable blocks', description: 'App-level sections that snap together into full pages.' },
  { icon: Palette, title: 'Mode-aware', description: 'Default, playful, and smooth looks from one prop.' },
  { icon: Zap, title: 'Fast by default', description: 'Scroll-snap and CSS transitions — no heavy dependencies.' },
  { icon: ShieldCheck, title: 'Type-safe', description: 'Every block ships complete TypeScript types.' },
  { icon: Layers, title: 'Layered system', description: 'Primitives, blocks, and pages that build on each other.' },
  { icon: Rocket, title: 'Ship faster', description: 'Assemble a SaaS app from ready-made pieces.' },
];

export default function Demo() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 p-8">
      <Carousel ariaLabel="Platform features">
        {features.map((f) => (
          <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
        ))}
      </Carousel>

      <Carousel ariaLabel="Screenshots" itemClassName="w-[220px]">
        {[1, 2, 3, 4, 5].map((n) => (
          <ImageCard
            key={n}
            src={`https://picsum.photos/seed/carousel-${n}/440/280`}
            alt={`Screenshot ${n}`}
          />
        ))}
      </Carousel>
    </div>
  );
}

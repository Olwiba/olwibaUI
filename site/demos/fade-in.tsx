'use client';
import { FadeIn } from '@olwiba/ui';

const directions = ['up', 'down', 'left', 'right'] as const;

export default function Demo() {
  return (
    <div className="space-y-3 p-6">
      {directions.map((dir, i) => (
        <FadeIn key={dir} direction={dir} delay={i * 120}>
          <div className="rounded-xl border bg-card p-4 text-sm">
            Fade in from <strong>{dir}</strong>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

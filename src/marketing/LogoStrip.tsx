'use client';

import { FadeIn } from '../motion/FadeIn';

export interface LogoStripProps {
  logos: Array<{ src: string; darkSrc?: string; alt: string; href?: string }>;
  label?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

const speedDuration = {
  slow: '60s',
  normal: '40s',
  fast: '25s',
} as const;

export function LogoStrip({
  logos,
  label,
  speed = 'normal',
}: LogoStripProps) {
  const duration = speedDuration[speed];

  return (
    <FadeIn direction="up">
      <section className="overflow-hidden py-8">
        {label && (
          <p className="mb-6 text-center text-sm text-muted-foreground">{label}</p>
        )}
        <div
          className="relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div
            className="flex w-max gap-12"
            style={{
              animation: `logo-strip-scroll ${duration} linear infinite`,
            }}
          >
            {/* Render logos twice for seamless loop */}
            {[...logos, ...logos].map((logo, i) => {
              const img = logo.darkSrc ? (
                <>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:hidden"
                  />
                  <img
                    src={logo.darkSrc}
                    alt={logo.alt}
                    className="hidden h-8 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:block"
                  />
                </>
              ) : (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                />
              );

              return logo.href ? (
                <a
                  key={`${logo.alt}-${i}`}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center"
                >
                  {img}
                </a>
              ) : (
                <div key={`${logo.alt}-${i}`} className="flex shrink-0 items-center">
                  {img}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes logo-strip-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </FadeIn>
  );
}

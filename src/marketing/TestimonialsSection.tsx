'use client';

import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, Badge } from '@olwiba/cn';

const testimonials = [
  {
    quote:
      'We cut our frontend build time in half. The blocks are production-ready out of the box — we dropped them in and shipped the same week.',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'Luminary',
    avatar: 'https://ui.shadcn.com/avatars/01.png',
    initials: 'SC',
  },
  {
    quote:
      "The design system consistency alone was worth it. Every screen looks like it was built by the same designer, even when it wasn't.",
    name: 'Marcus Webb',
    role: 'Product Lead',
    company: 'Fieldwork',
    avatar: 'https://ui.shadcn.com/avatars/02.png',
    initials: 'MW',
  },
  {
    quote:
      "I've tried a lot of component libraries. This one actually respects the fact that I need to own the code and change things.",
    name: 'Priya Nair',
    role: 'Senior Engineer',
    company: 'Orbit',
    avatar: 'https://ui.shadcn.com/avatars/03.png',
    initials: 'PN',
  },
  {
    quote:
      'The hooks library alone saved us weeks. useConfirm and useControlledOpen are in every feature we build.',
    name: 'Daniel Frost',
    role: 'Frontend Architect',
    company: 'Wavefront',
    avatar: 'https://ui.shadcn.com/avatars/04.png',
    initials: 'DF',
  },
  {
    quote:
      'Dark mode, accessibility, responsive behaviour — all handled. We focus on product logic, not boilerplate.',
    name: 'Aisha Okafor',
    role: 'Engineering Manager',
    company: 'Helio',
    avatar: 'https://ui.shadcn.com/avatars/05.png',
    initials: 'AO',
  },
  {
    quote:
      "Our designers love it too. The token system means design handoff is a conversation, not a fight.",
    name: 'Tom Halvorsen',
    role: 'Design Systems Lead',
    company: 'Anchor',
    avatar: 'https://ui.shadcn.com/avatars/06.png',
    initials: 'TH',
  },
];

export function TestimonialsSection() {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Trusted by teams shipping real products
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              Here's what engineers and product teams say after using Olwiba in production.
            </p>
          </div>

          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="mb-4 break-inside-avoid rounded-2xl border bg-muted/40 p-5"
              >
                <Quote className="mb-3 size-4 text-muted-foreground/50" />
                <p className="text-sm leading-relaxed text-foreground">{t.quote}</p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium leading-tight">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

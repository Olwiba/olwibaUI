'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@olwiba/cn';
import { useMarketingSurface, useSectionSurface, type MarketingSurface } from './section-surface';
import { SectionTitle } from './SectionTitle';
import { FadeIn } from '../motion/FadeIn';

export interface FaqSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  items: Array<{ question: string; answer: string }>;
  /**
   * How the section sits on the page. @default 'plain'
   *
   * Unlike the other marketing sections this one defaults to `plain` rather
   * than `card`. An FAQ is a heading and a list of rows that are already
   * bounded — putting that inside a second opaque panel gives you a box in a
   * box, and the outer one earns nothing. The rows get the surface instead;
   * see the block around the accordion below.
   */
  surface?: MarketingSurface;
}

export function FaqSection({
  title = 'Frequently asked questions',
  description = 'Everything you need to know before getting started.',
  badge = 'FAQ',
  items,
  surface,
}: FaqSectionProps) {
  // Resolved here rather than as a prop default, which would win over the
  // page-level MarketingSurfaceProvider and silently opt this section out of a
  // page that had set `soft` for everything. Order stays prop, then page, then
  // this section's own fallback.
  const contextSurface = useMarketingSurface();
  const sectionClasses = useSectionSurface(surface ?? contextSurface ?? 'plain');
  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title={title} description={description} badge={badge} />

          <FadeIn direction="up">
            {/*
              The accordion carries the surface, not the section.

              Padded on the sides so a question is not flush against the
              border, and `last:border-b-0` because the item divider on the
              final row would otherwise draw a line immediately above the
              block's own edge — two rules a pixel apart.
            */}
            <div className="mt-10 rounded-2xl border bg-card px-4 sm:px-6">
              <Accordion type="single" collapsible className="w-full">
                {items.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="last:border-b-0">
                    <AccordionTrigger className="text-left text-sm font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

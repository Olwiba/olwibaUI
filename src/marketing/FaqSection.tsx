'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@olwiba/cn';
import { useSectionSurface, type MarketingSurface } from './section-surface';
import { SectionTitle } from './SectionTitle';
import { FadeIn } from '../motion/FadeIn';

export interface FaqSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  items: Array<{ question: string; answer: string }>;
  /** How the section sits on the page. @default 'card' */
  surface?: MarketingSurface;
}

export function FaqSection({
  title = 'Frequently asked questions',
  description = 'Everything you need to know before getting started.',
  badge = 'FAQ',
  items,
  surface,
}: FaqSectionProps) {
  const sectionClasses = useSectionSurface(surface);
  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title={title} description={description} badge={badge} />

          <FadeIn direction="up">
            <Accordion type="single" collapsible className="mt-10 w-full">
              {items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

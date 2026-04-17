'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@olwiba/cn';
import { SectionTitle } from './SectionTitle';
import { FadeIn } from '../motion/FadeIn';

export interface FaqSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  items: Array<{ question: string; answer: string }>;
}

export function FaqSection({
  title = 'Frequently asked questions',
  description = 'Everything you need to know before getting started.',
  badge = 'FAQ',
  items,
}: FaqSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
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

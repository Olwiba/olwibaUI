'use client';

import { Badge, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@olwiba/cn';

const faqs = [
  {
    question: 'How is this different from shadcn/ui?',
    answer:
      'olwibaCN is built on top of the same Radix UI primitives and shares the copy-and-own philosophy. olwibaUI adds a higher layer — full page blocks, composed layouts, and hooks that wire everything together for real app development.',
  },
  {
    question: 'Do I need to eject or configure anything to get started?',
    answer:
      'No. Install the package, import a block, drop it in. CSS variables are used for theming so light/dark mode works immediately with your existing Tailwind setup.',
  },
  {
    question: 'Can I customise the components after installing?',
    answer:
      'Yes — the source is yours. Every block and component is designed to be modified. There is no runtime wrapper locking in styles or behaviour. Change what you need.',
  },
  {
    question: 'Is framer-motion required?',
    answer:
      'Only for the motion components (FadeIn, StaggerChildren, PageTransition, Dock). All blocks, cards, and non-animated components work without it.',
  },
  {
    question: 'Does it work with Next.js, Remix, and TanStack Start?',
    answer:
      'Yes. Components are React-first and framework-agnostic. The `use client` directive is included where needed for RSC compatibility.',
  },
  {
    question: 'How do I report a bug or request a component?',
    answer:
      'Open an issue in the GitHub repository. Include a minimal reproduction if it is a bug, or a description of the use case if it is a new component request.',
  },
];

export function MarketingFaqBlock() {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">FAQ</Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-10 w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

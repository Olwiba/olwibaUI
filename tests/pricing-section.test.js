import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PricingSection } from '../src/marketing/PricingSection';

const plans = [
  {
    name: 'Plus',
    monthly: 10,
    annual: 100,
    prices: { monthly: 5, weekly: 10 },
    description: 'A paid plan.',
    cta: 'Choose Plus',
    features: [],
  },
];

describe('PricingSection cadence controls', () => {
  test('keeps the selected cadence and savings label visually inert', () => {
    const markup = renderToStaticMarkup(
      React.createElement(PricingSection, {
        plans,
        cadences: [
          { key: 'monthly', label: 'Monthly', periodsPerYear: 52 },
          { key: 'weekly', label: 'Weekly', periodsPerYear: 52 },
        ],
        defaultCadence: 'monthly',
      }),
    );

    const selectedClasses = markup.match(
      /<button class="([^"]*)" aria-pressed="true">Monthly/,
    )?.[1];
    const savingsClasses = markup.match(/<div class="([^"]*)">Save 50%<\/div>/)?.[1];

    expect(selectedClasses).toContain('cursor-default');
    expect(selectedClasses).toContain('hover:bg-background');
    expect(selectedClasses).not.toContain('hover:bg-accent');
    expect(savingsClasses).toContain('hover:bg-primary');
    expect(savingsClasses).not.toContain('hover:bg-primary/80');
  });

  test('keeps the selected legacy cadence visually inert', () => {
    const markup = renderToStaticMarkup(React.createElement(PricingSection, { plans }));

    const selectedClasses = markup.match(
      /<button class="([^"]*)" aria-pressed="true">Monthly<\/button>/,
    )?.[1];
    const savingsClasses = markup.match(/<div class="([^"]*)">Save 34%<\/div>/)?.[1];

    expect(selectedClasses).toContain('cursor-default');
    expect(selectedClasses).toContain('hover:bg-background');
    expect(selectedClasses).not.toContain('hover:bg-accent');
    expect(savingsClasses).toContain('hover:bg-primary');
    expect(savingsClasses).not.toContain('hover:bg-primary/80');
  });
});

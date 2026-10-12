import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { PricingSection } from './PricingSection';

// Regression: Q-009 — a selected cadence could retain another cadence's billing explanation
// Found by /qa on 2026-10-12
// Report: nestrrr/.review/product-quality/nestrrr/2026-10-12-2205/report.md

const plan = {
  name: 'Plus',
  monthly: 3.49,
  annual: 3.49,
  prices: { monthly: 3.49, weekly: 6.99 },
  description: 'Faster property alerts.',
  cta: 'Choose Plus',
  features: [{ label: 'Alerts', included: true }],
};

describe('PricingSection cadence footnotes', () => {
  test('renders the selected cadence explanation with the common note', () => {
    const html = renderToStaticMarkup(
      <PricingSection
        plans={[plan]}
        cadences={[
          { key: 'monthly', label: 'Monthly', footnote: 'Billed £13.99 monthly.' },
          { key: 'weekly', label: 'Weekly', footnote: 'Billed at the weekly price.' },
        ]}
        defaultCadence="weekly"
        footnote="Cancel any time."
      />,
    );

    expect(html).toContain('Billed at the weekly price. Cancel any time.');
    expect(html).not.toContain('Billed £13.99 monthly.');
  });
});

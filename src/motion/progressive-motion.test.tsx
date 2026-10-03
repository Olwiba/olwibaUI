import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { CtaSection } from '../marketing/CtaSection';
import { CountUp } from './CountUp';
import { FadeIn } from './FadeIn';
import { PageTransition } from './PageTransition';
import { StaggerChildren } from './StaggerChildren';

describe('progressive motion server fallbacks', () => {
  test('FadeIn keeps content visible before hydration', () => {
    const html = renderToStaticMarkup(<FadeIn>Useful content</FadeIn>);

    expect(html).toContain('Useful content');
    expect(html).toContain('opacity-100');
    expect(html).not.toContain('opacity-0');
  });

  test('staggered children render visibly before hydration', () => {
    const html = renderToStaticMarkup(
      <StaggerChildren>
        <p>First</p>
        <p>Second</p>
      </StaggerChildren>,
    );

    expect(html).toContain('opacity:1');
    expect(html).not.toContain('opacity:0');
  });

  // The static rendering is also what a reveal settles back to once it has
  // run, so it must carry nothing that keeps a composited layer alive.
  test('static FadeIn is a plain block, with no transition or transform', () => {
    const html = renderToStaticMarkup(<FadeIn>Useful content</FadeIn>);

    expect(html).not.toContain('transition');
    expect(html).not.toContain('translate');
  });

  test('static staggered children carry no transition or transform', () => {
    const html = renderToStaticMarkup(
      <StaggerChildren>
        <p>First</p>
        <p>Second</p>
      </StaggerChildren>,
    );

    expect(html).not.toContain('transition');
    expect(html).not.toContain('transform');
  });

  test('CountUp renders its useful final value without JavaScript', () => {
    expect(renderToStaticMarkup(<CountUp to={42} suffix="%" />)).toContain('42%');
  });

  test('PageTransition does not inline a hidden initial state', () => {
    const html = renderToStaticMarkup(<PageTransition>Page content</PageTransition>);

    expect(html).toContain('Page content');
    expect(html).not.toContain('opacity:0');
  });

  test('showcase CTA is visible before its observer starts', () => {
    const html = renderToStaticMarkup(
      <CtaSection
        variant="showcase"
        heading="Start now"
        primaryCta={{ label: 'Create account', href: '/sign-up' }}
      />,
    );

    expect(html).toContain('Start now');
    expect(html).toContain('opacity-100');
    expect(html).not.toContain('opacity-0 translate-y-6');
  });
});

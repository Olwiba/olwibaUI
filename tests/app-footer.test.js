import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppFooter } from '../src/app/AppFooter.tsx';

describe('AppFooter', () => {
  test('owns a solid application-chrome surface', () => {
    const markup = renderToStaticMarkup(
      React.createElement(AppFooter, { start: 'Genesis', end: 'Online' }),
    );

    expect(markup).toContain('<footer');
    expect(markup).toContain('border-t');
    expect(markup).toContain('bg-background');
    expect(markup).toContain('Genesis');
    expect(markup).toContain('Online');
  });
});

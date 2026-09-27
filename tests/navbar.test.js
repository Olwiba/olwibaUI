import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Navbar } from '../src/marketing/Navbar';

const renderLink = ({ href, children, className }) =>
  React.createElement('a', { href, className }, children);

describe('Navbar focus targets', () => {
  test('keeps the desktop brand link fitted to its contents', () => {
    const markup = renderToStaticMarkup(
      React.createElement(Navbar, {
        brand: {
          name: 'nestrrr',
          logo: React.createElement('svg', { 'aria-hidden': true }),
        },
        navLinks: [],
        renderLink,
      }),
    );

    expect(markup).toContain('justify-self-start');
  });

  test('renders CTA links as the button root instead of nesting two focus targets', () => {
    const markup = renderToStaticMarkup(
      React.createElement(Navbar, {
        brand: { name: 'nestrrr' },
        navLinks: [],
        cta: {
          secondary: { label: 'Sign out', href: '/sign-out' },
          primary: { label: 'Dashboard', href: '/a/dashboard' },
        },
        renderLink,
      }),
    );

    expect(markup).not.toMatch(/<a\b[^>]*>\s*<button\b/);
    expect(markup).not.toMatch(/<button\b[^>]*>\s*<a\b/);
    expect(markup).toMatch(/<a\b[^>]*href="\/sign-out"[^>]*>Sign out<\/a>/);
    expect(markup).toMatch(/<a\b[^>]*href="\/a\/dashboard"[^>]*>Dashboard<\/a>/);
  });
});

import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppShell } from '../src/app/AppShell.tsx';

function renderShell(sidebarPosition) {
  return renderToStaticMarkup(
    React.createElement(
      AppShell,
      {
        pageTitle: 'Preview',
        sidebarPosition,
      },
      React.createElement('div', null, 'Long page content'),
    ),
  );
}

function contentInset(markup) {
  return markup.match(/<main[^>]*>/)?.[0] ?? '';
}

describe('AppShell scrolling', () => {
  test('contained shells make the content inset vertically scrollable', () => {
    const markup = renderShell('contained');

    expect(contentInset(markup)).toContain('min-h-0');
    expect(contentInset(markup)).toContain('overflow-y-auto');
    expect(markup).toContain('h-full min-h-0');
  });

  test('viewport shells retain the same content scroll boundary', () => {
    const markup = renderShell('viewport');

    expect(contentInset(markup)).toContain('min-h-0');
    expect(contentInset(markup)).toContain('overflow-y-auto');
    expect(markup).toContain('h-svh overflow-hidden');
  });
});

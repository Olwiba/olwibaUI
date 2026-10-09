import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { ViewToggle } from './ViewToggle';

describe('ViewToggle', () => {
  test('matches small toolbar controls and uses the brand for the active view', () => {
    const html = renderToStaticMarkup(<ViewToggle view="cards" onChange={() => {}} />);

    expect(html).toContain('bg-app-chrome');
    expect(html).toContain('p-px');
    expect(html).toContain('h-8');
    expect(html).toContain('bg-primary');
    expect(html).not.toContain('h-7');
  });
});

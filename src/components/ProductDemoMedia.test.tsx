import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProductDemoMedia } from './ProductDemoMedia';

describe('ProductDemoMedia', () => {
  test('server-renders the poster without waiting for video JavaScript', () => {
    const html = renderToStaticMarkup(
      <ProductDemoMedia src="/demo.mp4" poster="/demo.webp" alt="Product dashboard demo" />,
    );

    expect(html).toContain('data-slot="product-demo-media"');
    expect(html).toContain('src="/demo.webp"');
    expect(html).toContain('alt="Product dashboard demo"');
    expect(html).not.toContain('<video');
  });
});

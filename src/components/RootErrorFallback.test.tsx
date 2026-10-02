import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { RootErrorFallback } from './RootErrorFallback';

describe('RootErrorFallback', () => {
  test('renders Error messages', () => {
    const html = renderToStaticMarkup(
      <RootErrorFallback error={new Error('Route exploded')} reset={() => {}} />,
    );

    expect(html).toContain('Route exploded');
  });

  test('accepts unknown router errors safely', () => {
    const html = renderToStaticMarkup(<RootErrorFallback error={{ status: 500 }} reset={() => {}} />);

    expect(html).toContain('An unexpected error occurred.');
  });

  test('accepts the React error-boundary reset callback', () => {
    const html = renderToStaticMarkup(
      <RootErrorFallback error="Boundary failed" resetErrorBoundary={() => {}} />,
    );

    expect(html).toContain('Boundary failed');
    expect(html).not.toContain('disabled=""');
  });
});

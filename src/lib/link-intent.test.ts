import { describe, expect, test } from 'bun:test';
import { classifyLink } from './link-intent';

describe('classifyLink', () => {
  test.each([
    ['/pricing', 'internal'],
    ['./guide', 'internal'],
    ['?tab=billing', 'internal'],
    ['#features', 'hash'],
    ['mailto:hello@example.com', 'email'],
    ['tel:+441234567890', 'telephone'],
    ['https://example.com', 'external'],
    ['//cdn.example.com/file', 'external'],
    ['javascript:alert(1)', 'unsafe'],
    ['data:text/html,nope', 'unsafe'],
  ] as const)('%s is %s', (href, intent) => {
    expect(classifyLink(href).intent).toBe(intent);
  });

  test('an explicit download remains a native download', () => {
    expect(classifyLink('/report.csv', true)).toEqual({
      href: '/report.csv',
      intent: 'download',
    });
  });
});

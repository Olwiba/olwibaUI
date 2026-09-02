import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

const sourceUrl = new URL('../src/blog/PostList.tsx', import.meta.url);

describe('PostList short collections', () => {
  test('balances short lists unless the caller supplies a column contract', async () => {
    const source = await readFile(sourceUrl, 'utf8');

    expect(source).toContain('columns ?? (posts.length < 3 ? 2 : 3)');
    expect(source).toContain("? 'mx-auto w-full max-w-md sm:grid-cols-1'");
    expect(source).toContain("? 'mx-auto w-full max-w-3xl'");
    expect(source).toContain('columns === undefined');
  });
});

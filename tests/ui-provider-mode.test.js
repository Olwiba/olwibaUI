import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

const sourceUrl = new URL('../src/context/OlwibaUIContext.tsx', import.meta.url);

describe('OlwibaUIProvider mode ownership', () => {
  test('uses a supplied mode reactively and keeps an uncontrolled fallback', async () => {
    const source = await readFile(sourceUrl, 'utf8');

    expect(source).toContain('const [uncontrolledMode, setMode]');
    expect(source).toContain('const mode = modeProp ?? uncontrolledMode;');
    expect(source).not.toContain('useState<UIMode>(initialMode)');
  });
});

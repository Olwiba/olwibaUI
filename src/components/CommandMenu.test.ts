import { describe, expect, test } from 'bun:test';
import { matchesCommandQuery, type CommandMenuItem } from './CommandMenu';

const item: CommandMenuItem = {
  id: 'deploy-production',
  label: 'Deploy production',
  description: 'Ship the current release',
  keywords: ['publish'],
  metadata: ['Acme API', 'ready'],
  onSelect: () => {},
};

describe('matchesCommandQuery', () => {
  test('matches every token across rich result fields', () => {
    expect(matchesCommandQuery(item, 'acme ready')).toBe(true);
    expect(matchesCommandQuery(item, 'publish release')).toBe(true);
  });

  test('normalizes case and diacritics', () => {
    expect(matchesCommandQuery({ ...item, label: 'Résumé' }, 'resume')).toBe(true);
  });

  test('rejects a partial token set with a missing term', () => {
    expect(matchesCommandQuery(item, 'deploy staging')).toBe(false);
  });
});

import { describe, expect, test } from 'bun:test';
import { rowLimitCss } from '../src/layout/AppGrid';

// nestrrr's card grid: 340px cards, 12px gap, up to five columns.
const grid = { min: 340, gap: 12, maxColumns: 5 };

/** The rules as { from, to, visible } so a test reads as the layout it describes. */
function parse(css) {
  return css
    .split('\n')
    .filter(Boolean)
    .map((rule) => ({
      from: Number(/min-width: ([\d.]+)px/.exec(rule)?.[1] ?? 0),
      to: Number(/max-width: ([\d.]+)px/.exec(rule)?.[1] ?? Infinity),
      visible: Number(/nth-child\(n \+ (\d+)\)/.exec(rule)?.[1]) - 1,
    }));
}

describe('rowLimitCss', () => {
  test('maxRows shows two rows at every column count', () => {
    const rules = parse(rowLimitCss('g', { ...grid, count: 10, maxRows: 2 }));

    // One column below 692px, two from 692, three from 1044, four from 1396;
    // five columns need all ten, so they get no rule.
    expect(rules).toEqual([
      { from: 0, to: 691.98, visible: 2 },
      { from: 692, to: 1043.98, visible: 4 },
      { from: 1044, to: 1395.98, visible: 6 },
      { from: 1396, to: 1747.98, visible: 8 },
    ]);
  });

  test('completeRows hides only the trailing partial row', () => {
    const rules = parse(rowLimitCss('g', { ...grid, count: 24, completeRows: true }));

    // 24 fills every row at one to four columns; at five it is 4 rows and 4 over.
    expect(rules).toEqual([{ from: 1748, to: Infinity, visible: 20 }]);
  });

  test('completeRows never trims a layout wider than the list', () => {
    // Three items: a partial second row at two columns is trimmed, but at four
    // or five columns the three are one short row, not a partial one.
    expect(parse(rowLimitCss('g', { ...grid, count: 3, completeRows: true }))).toEqual([
      { from: 692, to: 1043.98, visible: 2 },
    ]);
  });
});

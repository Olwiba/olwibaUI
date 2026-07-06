export const marketingSectionSpacing = {
  standard: 'px-6 py-14 sm:px-10 sm:py-20',
  hero: 'px-6 pb-14 pt-10 sm:px-10 sm:py-20',
} as const;

export type MarketingSectionSpacing = keyof typeof marketingSectionSpacing;

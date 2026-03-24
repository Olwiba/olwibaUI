import {
  MarketingNavBlock,
  MarketingHeroBlock,
  MarketingFeaturesBlock,
  MarketingStatsBlock,
  MarketingTestimonialsBlock,
  MarketingPricingBlock,
  MarketingCtaBlock,
  MarketingFooterBlock,
} from '@/blocks';

export default function MarketingPageDemo() {
  return (
    <div className="w-full max-w-6xl space-y-4">
      <MarketingNavBlock />
      <MarketingHeroBlock />
      <MarketingFeaturesBlock />
      <MarketingStatsBlock />
      <MarketingTestimonialsBlock />
      <MarketingPricingBlock />
      <MarketingCtaBlock />
      <MarketingFooterBlock />
    </div>
  );
}

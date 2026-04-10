import {
  Navbar,
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialsSection,
  PricingSection,
  CtaSection,
  Footer,
} from '@olwiba/ui';

export default function MarketingPageDemo() {
  return (
    <div className="w-full max-w-6xl space-y-4">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

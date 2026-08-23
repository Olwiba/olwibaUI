import {
  CtaSection,
  FaqSection,
  FeaturesSection,
  Footer,
  HeroSection,
  Navbar,
  PricingSection,
  StatsSection,
  TestimonialsSection,
} from '@olwiba/ui';
import { demoBrandLogo, demoBrandName } from '~/lib/demo-brand';
import {
  demoCta,
  demoFaqItems,
  demoFeatures,
  demoHero,
  demoPlans,
  demoStats,
  demoTestimonials,
} from '~/lib/marketing-demo-data';

export default function Demo() {
  return (
    <div className="w-full max-w-6xl space-y-4">
      <Navbar
        brand={{ name: demoBrandName, logo: demoBrandLogo, href: '/' }}
        navLinks={[
          { label: 'features', href: '#features' },
          { label: 'pricing', href: '#pricing' },
          { label: 'faq', href: '#faq' },
        ]}
      />
      <HeroSection {...demoHero} />
      <FeaturesSection features={demoFeatures} />
      <StatsSection stats={demoStats} />
      <TestimonialsSection testimonials={demoTestimonials} />
      <PricingSection plans={demoPlans} />
      <CtaSection {...demoCta} />
      <FaqSection items={demoFaqItems} />
      <Footer
        brand={{ name: demoBrandName, logo: demoBrandLogo, href: '/' }}
        navLinks={[
          { label: 'features', href: '#features' },
          { label: 'pricing', href: '#pricing' },
          { label: 'docs', href: '/docs' },
        ]}
        status={{ label: 'All systems operational' }}
      />
    </div>
  );
}

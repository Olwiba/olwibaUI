import { HeroSection } from '@olwiba/ui';
import { demoHero } from '~/lib/marketing-demo-data';

export default function MarketingHeroBlockDemo() {
  return (
    <div className="w-full max-w-6xl">
      <HeroSection {...demoHero} />
    </div>
  );
}

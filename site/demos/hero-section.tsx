import { HeroSection } from '@olwiba/ui';
import { demoHero } from '~/lib/marketing-demo-data';

export default function Demo() {
  return <HeroSection {...demoHero} />;
}

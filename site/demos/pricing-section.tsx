import { PricingSection } from '@olwiba/ui';
import { demoPlans } from '~/lib/marketing-demo-data';

export default function Demo() {
  return <PricingSection plans={demoPlans} />;
}

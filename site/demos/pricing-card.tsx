'use client';
import { PricingCard } from '@olwiba/ui';

const free = [
  { label: '3 projects', included: true },
  { label: 'Basic analytics', included: true },
  { label: 'Community support', included: true },
  { label: 'Custom domains', included: false },
  { label: 'Priority support', included: false },
];

const pro = [
  { label: 'Unlimited projects', included: true },
  { label: 'Advanced analytics', included: true },
  { label: 'Priority support', included: true },
  { label: 'Custom domains', included: true },
  { label: 'SLA guarantee', included: true },
];

export default function Demo() {
  return (
    <div className="grid gap-4 p-6 sm:grid-cols-2">
      <PricingCard name="Starter" price="Free" period="" description="For personal projects and exploration." features={free} cta="Get started" />
      <PricingCard name="Pro" price="£15" description="For teams shipping production apps." features={pro} cta="Upgrade to Pro" highlighted badge="Most popular" onSelect={() => {}} />
    </div>
  );
}

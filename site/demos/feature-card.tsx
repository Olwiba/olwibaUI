'use client';
import { FeatureCard } from '@olwiba/ui';
import { BarChart2, Shield, Zap } from 'lucide-react';

export default function Demo() {
  return (
    <div className="grid gap-4 p-6 sm:grid-cols-3">
      <FeatureCard icon={Zap} title="Fast by default" description="Built on optimised primitives. Nothing ships that slows you down." />
      <FeatureCard icon={Shield} title="Secure" description="Authentication and access control baked in from day one." />
      <FeatureCard icon={BarChart2} title="Analytics" description="Understand usage with built-in telemetry and reporting tools." href="#" />
    </div>
  );
}

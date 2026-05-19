'use client';
import { TestimonialCard } from '@olwiba/ui';

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-6">
      <TestimonialCard
        quote="The component library cut our design system setup time in half. Everything just fits together."
        name="Sarah Chen"
        role="Product Engineer"
        company="Vercel"
        initials="SC"
        rating={5}
      />
    </div>
  );
}

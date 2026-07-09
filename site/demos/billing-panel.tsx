'use client';
import { BillingPanel } from '@olwiba/ui';

export default function Demo() {
  return (
    <div className="mx-auto max-w-2xl p-8">
      <BillingPanel
        planName="Nexus Pro"
        planPrice="$29/mo"
        renewalDate="March 12, 2026"
        usage={[
          { label: 'Seats', used: 6, limit: 10 },
          { label: 'Storage', used: 42, limit: 100, unit: 'GB' },
        ]}
        paymentMethod={{ brand: 'Visa', last4: '4242', expiry: '08/27' }}
        invoices={[
          { id: 'inv_1', date: 'Feb 12, 2026', amount: '$29.00', status: 'paid', downloadUrl: '#' },
          { id: 'inv_2', date: 'Jan 12, 2026', amount: '$29.00', status: 'paid', downloadUrl: '#' },
          { id: 'inv_3', date: 'Dec 12, 2025', amount: '$29.00', status: 'void' },
        ]}
        onManagePlan={() => {}}
        onUpdatePaymentMethod={() => {}}
      />
    </div>
  );
}

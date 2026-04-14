'use client';

import * as React from 'react';
import { Overlay, type OverlayVariant } from '@olwiba/ui';
import { DemoControls, useUsageCode } from '~/components/ComponentPreview';
import { Button, Badge } from '@olwiba/cn';

const variants: OverlayVariant[] = ['dim', 'scrim', 'loading'];

function MockContent() {
  return (
    <div className="relative z-10 flex w-full flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Total revenue</p>
          <p className="text-2xl font-semibold">$48,295</p>
        </div>
        <Badge variant="secondary">+12.4%</Badge>
      </div>
      <div className="flex gap-3">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
          <div key={d} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded bg-primary/20"
              style={{ height: `${[40, 65, 50, 80, 55][i]}px` }}
            />
            <span className="text-[10px] text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OverlayDemo() {
  const [variant, setVariant] = React.useState<OverlayVariant>('loading');

  useUsageCode(
    `<div className="relative overflow-hidden rounded-xl">\n  {/* content */}\n  <Overlay variant="${variant}"${variant === 'loading' ? ' label="Loading..."' : ''} />\n</div>`,
  );

  return (
    <>
      <div className="relative w-full overflow-hidden bg-card">
        <MockContent />
        <Overlay
          key={variant}
          variant={variant}
          {...(variant === 'loading' ? { label: 'Loading...' } : {})}
        />
      </div>

      <DemoControls>
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">Variant</span>
          <div className="flex flex-wrap gap-1.5">
            {variants.map((v) => (
              <Button
                key={v}
                variant={variant === v ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setVariant(v)}
              >
                {v}
              </Button>
            ))}
          </div>
        </div>
      </DemoControls>
    </>
  );
}

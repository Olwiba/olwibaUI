'use client';

import * as React from 'react';
import { Underlay, type UnderlayVariant } from '@olwiba/ui';
import { DemoControls, useUsageCode } from '~/components/ComponentPreview';
import { Button, Badge } from '@olwiba/cn';

const variants: UnderlayVariant[] = ['dots', 'lines', 'cross', 'glow'];

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

export default function UnderlayDemo() {
  const [variant, setVariant] = React.useState<UnderlayVariant>('dots');

  const extraProps = variant === 'glow' ? ` size={320} followCursor blur="xl"` : '';

  useUsageCode(
    `<div className="relative overflow-hidden rounded-xl">\n  <Underlay variant="${variant}"${extraProps} />\n  <div className="relative z-10 p-8">Content</div>\n</div>`,
  );

  return (
    <>
      <div className="relative w-full overflow-hidden bg-card">
        <Underlay
          key={variant}
          variant={variant}
          {...(variant === 'glow' ? { size: 360, followCursor: true, blur: 'xl' as const } : {})}
        />
        <MockContent />
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

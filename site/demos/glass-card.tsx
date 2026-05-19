'use client';
import { GlassCard } from '@olwiba/ui';

export default function Demo() {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 p-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent" />
      <GlassCard blur="md" className="max-w-xs p-6">
        <h3 className="font-semibold">Glass card</h3>
        <p className="mt-1 text-sm text-muted-foreground">Frosted glass effect with configurable blur and transparency.</p>
      </GlassCard>
    </div>
  );
}

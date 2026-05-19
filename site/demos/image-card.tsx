'use client';
import { ImageCard } from '@olwiba/ui';

export default function Demo() {
  return (
    <div className="grid gap-4 p-6 sm:grid-cols-2">
      <ImageCard src="https://picsum.photos/seed/mountain/640/360" alt="Mountain landscape" overlay="subtle">
        <h3 className="font-semibold text-lg">Mountain escape</h3>
        <p className="text-sm text-white/80">Swiss Alps</p>
      </ImageCard>
      <ImageCard src="https://picsum.photos/seed/city/640/360" alt="City skyline" overlay="strong">
        <h3 className="font-semibold text-lg">City lights</h3>
        <p className="text-sm text-white/80">New York</p>
      </ImageCard>
    </div>
  );
}

'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  overlay?: 'none' | 'subtle' | 'strong';
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  children?: React.ReactNode;
}

const overlayClass = {
  none: '',
  subtle: 'bg-gradient-to-t from-black/60 via-black/10 to-transparent',
  strong: 'bg-gradient-to-t from-black/80 via-black/30 to-black/10',
};

const aspectClass = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  auto: '',
};

export function ImageCard({
  src,
  alt = '',
  overlay = 'subtle',
  aspectRatio = 'video',
  children,
  className,
  ...props
}: ImageCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-muted',
        aspectClass[aspectRatio],
        className,
      )}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {overlay !== 'none' && (
        <div className={cn('absolute inset-0', overlayClass[overlay])} />
      )}
      {children && (
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
          {children}
        </div>
      )}
    </div>
  );
}

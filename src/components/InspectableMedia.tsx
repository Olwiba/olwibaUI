'use client';

import * as React from 'react';
import { ExternalLink, Maximize2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  cn,
} from '@olwiba/cn';
import { ProductDemoMedia } from './ProductDemoMedia';

export interface InspectableMediaProps {
  src: string;
  alt: string;
  kind?: 'image' | 'video';
  poster?: string;
  caption?: string;
  fullResolutionHref?: string;
  aspectRatio?: React.CSSProperties['aspectRatio'];
  className?: string;
}

/** Thumbnail media that expands into an accessible, captioned lightbox. */
export function InspectableMedia({
  src,
  alt,
  kind = 'image',
  poster,
  caption,
  fullResolutionHref,
  aspectRatio = '16 / 9',
  className,
}: InspectableMediaProps) {
  const [open, setOpen] = React.useState(false);
  const thumbnail = kind === 'video' ? (poster ?? src) : src;

  return (
    <>
      <button
        type="button"
        className={cn(
          'group relative block w-full overflow-hidden rounded-xl border bg-muted text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        style={{ aspectRatio }}
        onClick={() => setOpen(true)}
        aria-label={`Inspect ${alt}`}
      >
        <img src={thumbnail} alt={alt} className="size-full object-cover" loading="lazy" />
        <span className="absolute bottom-3 right-3 inline-flex size-9 items-center justify-center rounded-full border bg-background/90 shadow-sm backdrop-blur can-hover:opacity-0 can-hover:transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="size-4" aria-hidden />
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[calc(100svh-2rem)] max-w-5xl overflow-y-auto p-3 sm:p-5">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <DialogDescription className="sr-only">
            {caption ?? `Expanded view of ${alt}`}
          </DialogDescription>
          {kind === 'video' && poster ? (
            <ProductDemoMedia src={src} poster={poster} alt={alt} controls autoPlay={false} />
          ) : (
            <img src={src} alt={alt} className="max-h-[78svh] w-full object-contain" />
          )}
          {(caption || fullResolutionHref) && (
            <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-1 text-sm text-muted-foreground">
              {caption && <p>{caption}</p>}
              {fullResolutionHref && (
                <a
                  href={fullResolutionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Open original
                  <ExternalLink className="size-3.5" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

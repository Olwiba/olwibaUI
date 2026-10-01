'use client';

import * as React from 'react';
import { Play } from 'lucide-react';
import { cn } from '@olwiba/cn';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function reducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function serverReducedMotionSnapshot() {
  return false;
}

export interface ProductDemoMediaProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'poster' | 'children'> {
  src: string;
  poster: string;
  alt: string;
  /** CSS aspect-ratio value. @default '16 / 9' */
  aspectRatio?: React.CSSProperties['aspectRatio'];
  /** Distance before the viewport at which video data may start loading. */
  preloadMargin?: string;
  wrapperClassName?: string;
}

/**
 * Poster-first product video that only mounts near the viewport. The complete
 * static image is server-rendered, so slow or absent JavaScript never leaves
 * an empty product frame.
 */
export function ProductDemoMedia({
  src,
  poster,
  alt,
  aspectRatio = '16 / 9',
  preloadMargin = '320px',
  wrapperClassName,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  ...videoProps
}: ProductDemoMediaProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = React.useState(false);
  const [videoReady, setVideoReady] = React.useState(false);
  const [manualPlay, setManualPlay] = React.useState(false);
  const reducedMotion = React.useSyncExternalStore(
    subscribeToReducedMotion,
    reducedMotionSnapshot,
    serverReducedMotionSnapshot,
  );

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: preloadMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [preloadMargin]);

  const loadVideo = manualPlay || (nearViewport && !reducedMotion);

  return (
    <div
      ref={containerRef}
      data-slot="product-demo-media"
      className={cn('relative overflow-hidden bg-muted', wrapperClassName)}
      style={{ aspectRatio }}
    >
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(
          'size-full object-cover transition-opacity duration-300 motion-reduce:transition-none',
          videoReady && 'opacity-0',
        )}
      />
      {loadVideo && (
        <video
          {...videoProps}
          src={src}
          aria-label={alt}
          poster={poster}
          preload="metadata"
          autoPlay={autoPlay && (!reducedMotion || manualPlay)}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          controls={controls || reducedMotion}
          onCanPlay={(event) => {
            setVideoReady(true);
            videoProps.onCanPlay?.(event);
          }}
          className={cn('absolute inset-0 size-full object-cover', className)}
        />
      )}
      {reducedMotion && !manualPlay && (
        <button
          type="button"
          className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border bg-background/90 px-3 py-2 text-sm font-medium shadow-sm backdrop-blur"
          onClick={() => setManualPlay(true)}
        >
          <Play className="size-4" aria-hidden />
          Play demo
        </button>
      )}
    </div>
  );
}

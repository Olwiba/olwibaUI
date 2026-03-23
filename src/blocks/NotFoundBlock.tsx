'use client';

import { ArrowLeft, Compass } from 'lucide-react';
import { Button } from '@olwiba/cn';

export function NotFoundBlock() {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="relative flex min-h-[560px] flex-col items-center justify-center px-6 py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--muted)/0.8),transparent_70%)]" />
        <div className="relative space-y-6">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-muted">
              <Compass className="size-8 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-8xl font-bold tracking-tight text-muted-foreground/20">404</div>
            <h1 className="-mt-4 text-2xl font-semibold tracking-tight">Page not found</h1>
            <p className="mx-auto max-w-sm text-sm text-muted-foreground">
              The page you're looking for doesn't exist or has been moved. Check the URL or head back home.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Go back
            </Button>
            <Button>Take me home</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

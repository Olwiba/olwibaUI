'use client';

import * as React from 'react';
import { GalleryVerticalEnd, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, cn } from '@olwiba/cn';

// ─── Centered layout ──────────────────────────────────────────────────────────

function CenteredAuth({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-[720px] w-full flex-col items-center justify-center gap-6 rounded-2xl bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {children}
      </div>
    </section>
  );
}

// ─── Split layout ─────────────────────────────────────────────────────────────

function SplitAuth({ children, panel }: { children: React.ReactNode; panel?: React.ReactNode }) {
  const defaultPanel = (
    <>
      <Badge variant="secondary" className="mb-4">Welcome</Badge>
      <h2 className="text-3xl font-semibold tracking-tight">Build better, ship faster</h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Sign in to continue building with ready-made components and layouts.
      </p>
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><ShieldCheck className="size-4" /> Type-safe components</div>
        <div className="flex items-center gap-2"><Sparkles className="size-4" /> Polished defaults</div>
        <div className="flex items-center gap-2"><Building2 className="size-4" /> Plug-and-play shells</div>
      </div>
    </>
  );

  return (
    <section className="grid min-h-[560px] overflow-hidden rounded-2xl border bg-card lg:grid-cols-2">
      <div className="relative hidden p-8 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-muted" />
        <div className="relative z-10">{panel ?? defaultPanel}</div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        {children}
      </div>
    </section>
  );
}

// ─── Shared form slot ─────────────────────────────────────────────────────────

export interface AuthFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onSso?: () => void;
  signUpHref?: string;
  forgotPasswordHref?: string;
  brand?: React.ReactNode;
}

function DefaultForm({ onSubmit, onSso, signUpHref = '#', forgotPasswordHref = '#', brand }: AuthFormProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        {brand && <div className="mb-2">{brand}</div>}
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter your email and password to continue.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="auth-email">Email</Label>
            <Input id="auth-email" type="email" placeholder="name@company.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auth-password">Password</Label>
              {forgotPasswordHref && (
                <a className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground" href={forgotPasswordHref}>
                  Forgot password?
                </a>
              )}
            </div>
            <Input id="auth-password" type="password" placeholder="••••••••" />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full">Continue</Button>
            {onSso && (
              <Button type="button" variant="outline" className="w-full" onClick={onSso}>Use SSO</Button>
            )}
          </div>
        </form>
        {signUpHref && (
          <p className="text-center text-xs text-muted-foreground">
            New here?{' '}
            <a className="text-foreground underline underline-offset-4" href={signUpHref}>
              Create an account
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface AuthSectionProps extends AuthFormProps {
  /** Visual layout of the auth screen */
  layout?: 'centered' | 'split';
  /** Custom form/card content. Defaults to the built-in sign-in form. */
  children?: React.ReactNode;
  /** (split layout only) Custom content for the left decorative panel */
  panel?: React.ReactNode;
  className?: string;
}

export function AuthSection({
  layout = 'centered',
  children,
  panel,
  className,
  ...formProps
}: AuthSectionProps) {
  const form = children ?? <DefaultForm {...formProps} />;

  if (layout === 'split') {
    return (
      <div className={className}>
        <SplitAuth panel={panel}>{form}</SplitAuth>
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <CenteredAuth>{form}</CenteredAuth>
    </div>
  );
}

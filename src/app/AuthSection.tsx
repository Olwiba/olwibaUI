'use client';

import * as React from 'react';
import { Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, cn } from '@olwiba/cn';
import type { AppShellRenderLink } from './AppShell';

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

// ─── Centered layout ──────────────────────────────────────────────────────────

function CenteredAuth({ children, brand }: { children: React.ReactNode; brand?: React.ReactNode }) {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      {brand && (
        <div className="mx-auto w-full max-w-md text-center mb-8">
          {brand}
        </div>
      )}
      <div className="mx-auto w-full max-w-md">
        {children}
      </div>
    </section>
  );
}

// ─── Split layout ─────────────────────────────────────────────────────────────

function SplitAuth({ children, panel }: { children: React.ReactNode; panel?: React.ReactNode }) {
  const defaultPanel = (
    <div className="flex flex-col gap-6">
      <Badge variant="secondary" className="w-fit">Welcome</Badge>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight">Build better, ship faster</h2>
        <p className="max-w-md text-muted-foreground">
          Sign in to continue building with ready-made components and layouts.
        </p>
      </div>
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><ShieldCheck className="size-4" /> Type-safe components</div>
        <div className="flex items-center gap-2"><Sparkles className="size-4" /> Polished defaults</div>
        <div className="flex items-center gap-2"><Building2 className="size-4" /> Plug-and-play shells</div>
      </div>
    </div>
  );

  return (
    <section className="grid h-full min-h-[560px] overflow-hidden rounded-2xl border bg-card lg:grid-cols-2">
      <div className="relative hidden p-8 pb-16 lg:flex lg:flex-col lg:justify-center">
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
  /** Controls form title, fields, and footer text. @default 'signin' */
  mode?: 'signin' | 'signup';
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onSso?: () => void;
  /** (signin) Link to the sign-up page */
  signUpHref?: string;
  /** (signup) Link back to the sign-in page */
  signInHref?: string;
  forgotPasswordHref?: string;
  /** Brand node — in centered layout renders above the card; in split layout renders inside the card */
  brand?: React.ReactNode;
  /** Error message displayed below the form fields */
  error?: string;
  /** Disables the submit button and shows a loading label */
  loading?: boolean;
  /** Render prop for links — use to inject framework-native link components (e.g. TanStack Router Link) */
  renderLink?: AppShellRenderLink;
}

function DefaultForm({
  mode = 'signin',
  onSubmit,
  onSso,
  signUpHref = '#',
  signInHref = '#',
  forgotPasswordHref = '#',
  brand,
  error,
  loading,
  renderLink = defaultRenderLink,
}: AuthFormProps) {
  const isSignUp = mode === 'signup';

  return (
    <Card className="w-full">
      <CardHeader>
        {brand && <div className="mb-2">{brand}</div>}
        <CardTitle>{isSignUp ? 'Create an account' : 'Sign in'}</CardTitle>
        <CardDescription>
          {isSignUp
            ? 'Enter your details to create your account.'
            : 'Enter your email and password to continue.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={onSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="auth-name">Name</Label>
              <Input id="auth-name" name="name" type="text" placeholder="Your name" autoComplete="name" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="auth-email">Email address</Label>
            <Input id="auth-email" name="email" type="email" placeholder="name@company.com" autoComplete="email" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auth-password">Password</Label>
              {!isSignUp && forgotPasswordHref && renderLink({
                href: forgotPasswordHref,
                className: 'text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground',
                children: 'Forgot password?',
              })}
            </div>
            <Input
              id="auth-password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
          </div>
          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}
            </Button>
            {onSso && (
              <Button type="button" variant="outline" className="w-full" onClick={onSso} disabled={loading}>
                Use SSO
              </Button>
            )}
          </div>
        </form>
        <p className="text-center text-xs text-muted-foreground">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              {renderLink({ href: signInHref, className: 'text-foreground underline underline-offset-4', children: 'Sign in' })}
            </>
          ) : (
            signUpHref && (
              <>
                New here?{' '}
                {renderLink({ href: signUpHref, className: 'text-foreground underline underline-offset-4', children: 'Create an account' })}
              </>
            )
          )}
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface AuthSectionProps extends AuthFormProps {
  /** Visual layout of the auth screen. @default 'centered' */
  layout?: 'centered' | 'split';
  /** Custom form/card content. Defaults to the built-in form. */
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
  if (layout === 'split') {
    const form = children ?? <DefaultForm {...formProps} />;
    return (
      <div className={cn('h-full', className)}>
        <SplitAuth panel={panel}>{form}</SplitAuth>
      </div>
    );
  }

  // Centered: brand renders above the card, not inside it
  const { brand, ...restFormProps } = formProps;
  const form = children ?? <DefaultForm {...restFormProps} />;
  return (
    <CenteredAuth brand={brand} className={className}>
      {form}
    </CenteredAuth>
  );
}

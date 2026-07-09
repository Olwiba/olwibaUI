'use client';

import * as React from 'react';
import { Building2, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import {
  Badge,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Label,
  cn,
} from '@olwiba/cn';
import { Button } from '../primitives/Button';
import { Card } from '../primitives/Card';
import { Input } from '../primitives/Input';
import type { AppShellRenderLink } from './AppShell';

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

// ─── Centered layout ──────────────────────────────────────────────────────────

function CenteredAuth({ children, brand, className }: { children: React.ReactNode; brand?: React.ReactNode; className?: string }) {
  return (
    <section className={cn('flex min-h-screen flex-col justify-center bg-background py-12 px-4 sm:px-6 lg:px-8', className)}>
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
  /**
   * Controls form title, fields, and footer text.
   * - `'signin'` / `'signup'` — email + password
   * - `'forgot-password'` — email only, sends a reset link
   * - `'reset-password'` — new password + confirmation
   * - `'verify'` — one-time code entry (email verification or 2FA)
   * @default 'signin'
   */
  mode?: 'signin' | 'signup' | 'forgot-password' | 'reset-password' | 'verify';
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onSso?: () => void;
  /** (signin) Link to the sign-up page */
  signUpHref?: string;
  /** (signup / forgot-password / reset-password / verify) Link back to the sign-in page */
  signInHref?: string;
  forgotPasswordHref?: string;
  /** (verify) Re-sends the one-time code */
  onResend?: () => void;
  /** (verify) Address the code was sent to, shown in the description */
  destination?: string;
  /** (verify) Number of digits in the code. @default 6 */
  codeLength?: number;
  /** Brand node — in centered layout renders above the card; in split layout renders inside the card */
  brand?: React.ReactNode;
  /** Error message displayed below the form fields */
  error?: string;
  /** Positive confirmation message displayed below the form fields (e.g. "Reset link sent") */
  success?: string;
  /** Disables the submit button and shows a loading label */
  loading?: boolean;
  /** Render prop for links — use to inject framework-native link components (e.g. TanStack Router Link) */
  renderLink?: AppShellRenderLink;
  /** Optional content rendered below the form — use for social auth buttons or other additions */
  footer?: React.ReactNode;
  /** Pre-fill the email field (e.g. from demo credential links). Triggers a brief border highlight animation. */
  defaultEmail?: string;
  /** Pre-fill the password field (e.g. from demo credential links). Triggers a brief border highlight animation. */
  defaultPassword?: string;
}

const authCopy = {
  signin: { title: 'Sign in', description: 'Enter your email and password to continue.', submit: 'Sign in' },
  signup: { title: 'Create an account', description: 'Enter your details to create your account.', submit: 'Create account' },
  'forgot-password': { title: 'Reset your password', description: 'Enter the email on your account and we’ll send you a link to reset your password.', submit: 'Send reset link' },
  'reset-password': { title: 'Choose a new password', description: 'Your new password must be different from previous passwords.', submit: 'Reset password' },
  verify: { title: 'Enter your code', description: 'We sent a verification code to your email.', submit: 'Verify' },
} as const;

function DefaultForm({
  mode = 'signin',
  onSubmit,
  onSso,
  signUpHref = '#',
  signInHref = '#',
  forgotPasswordHref = '#',
  onResend,
  destination,
  codeLength = 6,
  brand,
  error,
  success,
  loading,
  renderLink = defaultRenderLink,
  footer,
  defaultEmail,
  defaultPassword,
}: AuthFormProps) {
  const isSignUp = mode === 'signup';
  const isForgotPassword = mode === 'forgot-password';
  const isResetPassword = mode === 'reset-password';
  const isVerify = mode === 'verify';
  const [code, setCode] = React.useState('');
  const hasPrefill = !!(defaultEmail || defaultPassword);
  const prefillStyle = (active: boolean): React.CSSProperties | undefined =>
    active ? { animation: 'auth-prefill 1.6s ease-out 0.35s 1 both' } : undefined;
  const copy = authCopy[mode];

  return (
    <Card className="w-full">
      {hasPrefill && (
        // Theme tokens hold full color values (oklch), so opacity must come from color-mix, not hsl(var()/a)
        <style>{`@keyframes auth-prefill{0%{box-shadow:0 0 0 0 transparent}40%{box-shadow:0 0 0 3px color-mix(in oklab,var(--primary) 45%,transparent),0 0 16px 2px color-mix(in oklab,var(--primary) 35%,transparent)}100%{box-shadow:0 0 0 0 transparent}}`}</style>
      )}
      <CardHeader>
        {brand && <div className="mb-2">{brand}</div>}
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>
          {isVerify && destination ? (
            <>We sent a verification code to <span className="font-medium text-foreground">{destination}</span>.</>
          ) : copy.description}
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

          {(mode === 'signin' || mode === 'signup' || isForgotPassword) && (
            <div className="space-y-2">
              <Label htmlFor="auth-email">Email address</Label>
              <Input
                id="auth-email"
                name="email"
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
                defaultValue={defaultEmail}
                style={prefillStyle(!!defaultEmail)}
              />
            </div>
          )}

          {(mode === 'signin' || mode === 'signup') && (
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
                defaultValue={defaultPassword}
                style={prefillStyle(!!defaultPassword)}
              />
            </div>
          )}

          {isResetPassword && (
            <>
              <div className="space-y-2">
                <Label htmlFor="auth-new-password">New password</Label>
                <Input id="auth-new-password" name="password" type="password" placeholder="••••••••" autoComplete="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-confirm-password">Confirm password</Label>
                <Input id="auth-confirm-password" name="confirmPassword" type="password" placeholder="••••••••" autoComplete="new-password" />
              </div>
            </>
          )}

          {isVerify && (
            <div className="space-y-2">
              <input type="hidden" name="code" value={code} />
              <div className="flex justify-center py-2">
                <InputOTP maxLength={codeLength} value={code} onChange={setCode} containerClassName="justify-center">
                  <InputOTPGroup>
                    {Array.from({ length: codeLength }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          )}

          {error && (
            <p role="alert" className="text-sm font-medium text-destructive">{error}</p>
          )}
          {success && (
            <p role="status" className="text-sm font-medium text-primary">{success}</p>
          )}

          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading || (isVerify && code.length < codeLength)}>
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? 'Please wait…' : copy.submit}
            </Button>
            {onSso && (mode === 'signin' || mode === 'signup') && (
              <Button type="button" variant="outline" className="w-full" onClick={onSso} disabled={loading}>
                Use SSO
              </Button>
            )}
          </div>
        </form>

        {isVerify && onResend && (
          <p className="text-center text-xs text-muted-foreground">
            Didn&rsquo;t get a code?{' '}
            <button type="button" onClick={onResend} className="text-foreground underline underline-offset-4">
              Resend
            </button>
          </p>
        )}

        {(mode === 'signin' || mode === 'signup') && (
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
        )}

        {(isForgotPassword || isResetPassword || isVerify) && (
          <p className="text-center text-xs text-muted-foreground">
            {renderLink({ href: signInHref, className: 'text-foreground underline underline-offset-4', children: 'Back to sign in' })}
          </p>
        )}

        {footer && <div>{footer}</div>}
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

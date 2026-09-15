"use client";

import * as React from "react";
import {
  Building2,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
} from "@olwiba/cn";
import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";
import { Input } from "../primitives/Input";
import type { AppShellRenderLink } from "./AppShell";

const defaultRenderLink: AppShellRenderLink = ({
  href,
  children,
  className,
}) => (
  <a href={href} className={className}>
    {children}
  </a>
);

// ─── Centered layout ──────────────────────────────────────────────────────────

function CenteredAuth({
  children,
  brand,
  framed,
  className,
}: {
  children: React.ReactNode;
  brand?: React.ReactNode;
  framed?: boolean;
  className?: string;
}) {
  if (framed) {
    return (
      // Framed: a page frame is already supplying the background, the page
      // padding, and — with a navbar and footer around it — the height. All
      // three have to come off here or they are applied twice: padding inside
      // padding, and a full-viewport section that pushes the footer below the
      // fold on every auth screen.
      //
      // The card fills the content column on a phone, matching the contact
      // form, and only takes its reading width once there is room for the
      // page to centre it.
      <section className={cn("flex flex-col py-6 sm:py-10", className)}>
        <div className="mx-auto w-full max-w-none sm:my-auto sm:max-w-md">
          {brand && <div className="mb-8 text-center">{brand}</div>}
          {children}
        </div>
      </section>
    );
  }

  return (
    // `min-h-dvh`, not `min-h-screen`: on mobile `100vh` is the viewport with
    // the browser chrome *retracted*, so a screen-height box is always taller
    // than what you can actually see, and it resizes under you as the URL bar
    // hides and shows.
    <section
      className={cn(
        "flex min-h-dvh flex-col bg-background px-4 py-10 sm:px-6 sm:py-12 lg:px-8",
        className,
      )}
    >
      {/*
        Auto margins rather than `justify-center`, and only from `sm` up.

        A flex item centred with `justify-center` that's taller than its
        container overflows in *both* directions, and the overflow above the
        top edge is unreachable — no scrolling gets you back to it. That's the
        sign-up form on a phone: name, email, password and social buttons
        already run long, and focusing a field drops the keyboard over half
        the viewport. The top of the card, title included, becomes
        unscrollable.

        Auto margins collapse to zero when there's no free space, so the card
        stays reachable. Below `sm` there's no vertical centring at all — the
        form flows from the top like the contact page.
      */}
      <div className="mx-auto w-full max-w-md sm:my-auto">
        {brand && <div className="mb-8 text-center">{brand}</div>}
        {children}
      </div>
    </section>
  );
}

// ─── Split layout ─────────────────────────────────────────────────────────────

function SplitAuth({
  children,
  panel,
}: {
  children: React.ReactNode;
  panel?: React.ReactNode;
}) {
  const defaultPanel = (
    <div className="flex flex-col gap-6">
      <Badge variant="secondary" className="w-fit">
        Welcome
      </Badge>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight">
          Build better, ship faster
        </h2>
        <p className="max-w-md text-muted-foreground">
          Sign in to continue building with ready-made components and layouts.
        </p>
      </div>
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4" /> Type-safe components
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="size-4" /> Polished defaults
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="size-4" /> Plug-and-play shells
        </div>
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

/** Per-field validation messages, keyed by the input's `name`. */
export type AuthFieldErrors = Partial<Record<"name" | "email" | "password", string>>;

export interface AuthFormProps {
  /**
   * Controls form title, fields, and footer text.
   * - `'signin'` / `'signup'` — email + password
   * - `'forgot-password'` — email only, sends a reset link
   * - `'reset-password'` — new password + confirmation
   * - `'verify'` — one-time code entry (email verification or 2FA)
   * @default 'signin'
   */
  mode?: "signin" | "signup" | "forgot-password" | "reset-password" | "verify";
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onSso?: () => void;
  /** (signin) Link to the sign-up page */
  /**
   * Where "Create an account" points. Omit it to leave the link out.
   *
   * Previously defaulted to '#', so a consumer that never set it rendered a
   * dead control, and passing undefined could not remove it — a default
   * parameter reapplies on undefined. Sites where accounts are granted rather
   * than self-served had no way to say so.
   */
  signUpHref?: string;
  /** (signup / forgot-password / reset-password / verify) Link back to the sign-in page */
  signInHref?: string;
  /**
   * Where "Forgot password" points. Omit it to leave the link out.
   *
   * Previously defaulted to '#', so a consumer that never wired a reset flow
   * still rendered the link — it looked available and did nothing when clicked.
   */
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
  /**
   * Per-field validation messages, rendered under the field they belong to.
   *
   * Keyed by the input's `name`. Anything the form does not render is ignored,
   * so a caller can hand over everything the server complained about without
   * first working out which fields this mode shows.
   *
   * Use with `parseAuthFieldErrors`, which turns a server's combined validation
   * string into this shape. A message that belongs to one field is far more use
   * beneath it than concatenated into the summary line: the summary says
   * something is wrong, the field says which, and only the field can say it
   * where the person is about to type.
   */
  fieldErrors?: AuthFieldErrors;
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
  signin: {
    title: "Sign in",
    description: "Enter your email and password to continue.",
    submit: "Sign in",
  },
  signup: {
    title: "Create an account",
    description: "Enter your details to create your account.",
    submit: "Create account",
  },
  "forgot-password": {
    title: "Reset your password",
    description:
      "Enter the email on your account and we’ll send you a link to reset your password.",
    submit: "Send reset link",
  },
  "reset-password": {
    title: "Choose a new password",
    description: "Your new password must be different from previous passwords.",
    submit: "Reset password",
  },
  verify: {
    title: "Enter your code",
    description: "We sent a verification code to your email.",
    submit: "Verify",
  },
} as const;

/**
 * Splits a server's combined validation message into per-field messages.
 *
 * better-auth surfaces zod failures as one string listing every field at once:
 *
 *   [body.email] Invalid email address; [body.password] Too small: expected
 *   string to have >=1 characters
 *
 * Rendered as-is that is what a visitor sees, in red, under the whole form. It
 * names internal request paths, states the constraint in schema terms rather
 * than in anything they did, and puts both problems in one place while leaving
 * both fields looking fine.
 *
 * Returns the fields it recognised plus whatever text did not parse, so a caller
 * can show the remainder as the summary and never silently drop a message it
 * did not expect.
 */
export function parseAuthFieldErrors(message: string): {
  fieldErrors: AuthFieldErrors;
  rest?: string;
} {
  const fieldErrors: AuthFieldErrors = {};
  const unmatched: string[] = [];

  for (const part of message.split(";")) {
    const segment = part.trim();
    if (!segment) continue;

    // `body.` is optional: the prefix has appeared as both `[body.email]` and
    // `[email]` depending on where in better-auth the failure was raised.
    const match = /^\[(?:body\.)?(name|email|password)\]\s*(.+)$/i.exec(segment);
    if (!match) {
      unmatched.push(segment);
      continue;
    }

    const field = match[1]!.toLowerCase() as "name" | "email" | "password";
    const text = match[2]!.trim();
    // First one wins: a field can appear twice, and the earlier message is the
    // more specific in practice (the type failure before the length failure).
    fieldErrors[field] ??= humaniseFieldMessage(field, text);
  }

  return {
    fieldErrors,
    rest: unmatched.length > 0 ? unmatched.join("; ") : undefined,
  };
}

/**
 * Rewrites the schema-speak zod emits into something addressed to a person.
 *
 * Only the messages that actually reach a sign-in or sign-up form are special
 * cased; anything else passes through, so an unfamiliar message is still shown
 * rather than swallowed by a translation table that did not know about it.
 */
function humaniseFieldMessage(field: string, text: string): string {
  if (/^too small|to have >=1|at least 1 character/i.test(text)) {
    return field === "password" ? "Enter your password." : "This field is required.";
  }
  if (/invalid email/i.test(text)) return "Enter a valid email address.";
  if (/^too small.*>=(\d+)/i.test(text)) return text;
  return text;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

function PasswordInput(
  props: Omit<React.ComponentProps<typeof Input>, "type">,
) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={cn("pr-10", props.className)}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

function DefaultForm({
  mode = "signin",
  onSubmit,
  onSso,
  signUpHref,
  signInHref = "#",
  forgotPasswordHref,
  fieldErrors,
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
  const isSignUp = mode === "signup";
  const isForgotPassword = mode === "forgot-password";
  const isResetPassword = mode === "reset-password";
  const isVerify = mode === "verify";
  const [code, setCode] = React.useState("");
  const hasPrefill = !!(defaultEmail || defaultPassword);
  const prefillStyle = (active: boolean): React.CSSProperties | undefined =>
    active
      ? { animation: "auth-prefill 1.6s ease-out 0.35s 1 both" }
      : undefined;
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
            <>
              We sent a verification code to{" "}
              <span className="font-medium text-foreground">{destination}</span>
              .
            </>
          ) : (
            copy.description
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={onSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="auth-name">Name</Label>
              <Input
                id="auth-name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={!!fieldErrors?.name}
                aria-describedby={fieldErrors?.name ? "auth-name-error" : undefined}
              />
              <FieldError id="auth-name-error" message={fieldErrors?.name} />
            </div>
          )}

          {(mode === "signin" || mode === "signup" || isForgotPassword) && (
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
                aria-invalid={!!fieldErrors?.email}
                aria-describedby={fieldErrors?.email ? "auth-email-error" : undefined}
              />
              <FieldError id="auth-email-error" message={fieldErrors?.email} />
            </div>
          )}

          {(mode === "signin" || mode === "signup") && (
            <div className="relative space-y-2">
              <Label htmlFor="auth-password">Password</Label>
              <PasswordInput
                id="auth-password"
                name="password"
                placeholder="••••••••"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                defaultValue={defaultPassword}
                style={prefillStyle(!!defaultPassword)}
                aria-invalid={!!fieldErrors?.password}
                aria-describedby={fieldErrors?.password ? "auth-password-error" : undefined}
              />
              {!isSignUp && forgotPasswordHref && (
                <div className="absolute right-0 top-0">
                  {renderLink({
                    href: forgotPasswordHref,
                    // No underline. It sits on the same line as the Password
                    // label, inside the field's own header row, so it reads as
                    // part of the form's furniture rather than as prose with a
                    // link in it. The hover colour change is the affordance;
                    // an underline here just adds a second horizontal rule a
                    // few pixels above the input's border.
                    className:
                      "text-xs text-muted-foreground transition-colors hover:text-foreground",
                    children: "Forgot password?",
                  })}
                </div>
              )}
            </div>
          )}

          {isResetPassword && (
            <>
              <div className="space-y-2">
                <Label htmlFor="auth-new-password">New password</Label>
                <PasswordInput
                  id="auth-new-password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-confirm-password">Confirm password</Label>
                <PasswordInput
                  id="auth-confirm-password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
            </>
          )}

          {isVerify && (
            <div className="space-y-2">
              <input type="hidden" name="code" value={code} />
              <div className="flex justify-center py-2">
                <InputOTP
                  maxLength={codeLength}
                  value={code}
                  onChange={setCode}
                  containerClassName="justify-center"
                >
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
            <p role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          {success && (
            <p role="status" className="text-sm font-medium text-primary">
              {success}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={loading || (isVerify && code.length < codeLength)}
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "Please wait…" : copy.submit}
            </Button>
            {onSso && (mode === "signin" || mode === "signup") && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onSso}
                disabled={loading}
              >
                Use SSO
              </Button>
            )}
          </div>
        </form>

        {isVerify && onResend && (
          <p className="text-center text-xs text-muted-foreground">
            Didn&rsquo;t get a code?{" "}
            <button
              type="button"
              onClick={onResend}
              className="text-foreground underline underline-offset-4"
            >
              Resend
            </button>
          </p>
        )}

        {(mode === "signin" || mode === "signup") && (
          <p className="text-center text-xs text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                {renderLink({
                  href: signInHref,
                  className: "text-foreground underline underline-offset-4",
                  children: "Sign in",
                })}
              </>
            ) : (
              signUpHref && (
                <>
                  New here?{" "}
                  {renderLink({
                    href: signUpHref,
                    className: "text-foreground underline underline-offset-4",
                    children: "Create an account",
                  })}
                </>
              )
            )}
          </p>
        )}

        {(isForgotPassword || isResetPassword || isVerify) && (
          <p className="text-center text-xs text-muted-foreground">
            {renderLink({
              href: signInHref,
              className: "text-foreground underline underline-offset-4",
              children: "Back to sign in",
            })}
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
  layout?: "centered" | "split";
  /** Custom form/card content. Defaults to the built-in form. */
  children?: React.ReactNode;
  /** (split layout only) Custom content for the left decorative panel */
  panel?: React.ReactNode;
  /**
   * Render inside an existing page frame — one already providing the
   * background, the horizontal padding, and a navbar and footer.
   *
   * Standalone (the default) the section owns the whole viewport, which is
   * right for an auth screen that is the only thing on the page. It is wrong
   * the moment there is chrome around it: the padding lands on top of the
   * frame's own, and `min-h-dvh` guarantees the footer starts below the fold.
   *
   * (centered layout only)
   */
  framed?: boolean;
  className?: string;
}

export function AuthSection({
  layout = "centered",
  children,
  panel,
  framed,
  className,
  ...formProps
}: AuthSectionProps) {
  if (layout === "split") {
    const form = children ?? <DefaultForm {...formProps} />;
    return (
      <div className={cn("h-full", className)}>
        <SplitAuth panel={panel}>{form}</SplitAuth>
      </div>
    );
  }

  // Centered: brand renders above the card, not inside it
  const { brand, ...restFormProps } = formProps;
  const form = children ?? <DefaultForm {...restFormProps} />;
  return (
    <CenteredAuth brand={brand} framed={framed} className={className}>
      {form}
    </CenteredAuth>
  );
}

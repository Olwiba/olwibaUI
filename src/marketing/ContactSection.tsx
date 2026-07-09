'use client';

import * as React from 'react';
import { ChevronDown, Mail, MessageSquare, Send, type LucideIcon } from 'lucide-react';
import { cn, Label, useUIVariant } from '@olwiba/cn';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';
import { Textarea } from '../primitives/Textarea';

export type ContactInfoItem = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

export interface ContactSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  contactInfo?: ContactInfoItem[];
  privacyHref?: string;
  successTitle?: string;
  successDescription?: string;
  sendAnotherLabel?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

const PHONE_PREFIXES = [
  { label: 'US +1', value: '+1-US' },
  { label: 'NZ +64', value: '+64-NZ' },
  { label: 'AU +61', value: '+61-AU' },
  { label: 'UK +44', value: '+44-UK' },
  { label: 'CA +1', value: '+1-CA' },
  { label: 'EU', value: '+0-EU' },
];

const defaults = {
  badge: 'Contact',
  title: "Let's talk",
  description:
    "Have a question or want to work together? Fill in the form and you'll hear back from the person who built it.",
  successTitle: 'Message sent',
  successDescription: "Thanks for reaching out. You'll get a reply within one business day.",
  sendAnotherLabel: 'Send another',
};

export function ContactSection({
  badge = defaults.badge,
  title = defaults.title,
  description = defaults.description,
  contactInfo,
  privacyHref,
  successTitle = defaults.successTitle,
  successDescription = defaults.successDescription,
  sendAnotherLabel = defaults.sendAnotherLabel,
  onSubmit,
}: ContactSectionProps = {}) {
  const [submitted, setSubmitted] = React.useState(false);
  const mode = useUIVariant();
  const sectionClasses = cn(
    'overflow-hidden bg-card',
    mode === 'smooth' && 'rounded-3xl border',
    mode === 'playful' && 'rounded-2xl border-primary/25 border',
    !mode && 'rounded-2xl border',
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSubmit?.(e);
    setSubmitted(true);
  }

  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          {badge && (
            <div className="mb-4 flex justify-center">
              <Badge variant="secondary">{badge}</Badge>
            </div>
          )}
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>

          {contactInfo && contactInfo.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {contactInfo.map(({ icon: Icon = Mail, label, value }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="size-4 shrink-0" />
                  <span>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        {submitted ? (
          <div className="mx-auto mt-16 max-w-xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MessageSquare className="size-6" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{successTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{successDescription}</p>
            <Button variant="outline" size="sm" className="mt-6" onClick={() => setSubmitted(false)}>
              {sendAnotherLabel}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
            {/* Honeypot */}
            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {/* First name */}
              <div>
                <Label htmlFor="contact-first" className="block text-sm/6 font-semibold">
                  First name
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="contact-first"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="First"
                    required
                  />
                </div>
              </div>

              {/* Last name */}
              <div>
                <Label htmlFor="contact-last" className="block text-sm/6 font-semibold">
                  Last name
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="contact-last"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Last"
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div className="sm:col-span-2">
                <Label htmlFor="contact-company" className="block text-sm/6 font-semibold">
                  Company{' '}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="contact-company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <Label htmlFor="contact-email" className="block text-sm/6 font-semibold">
                  Email
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <Label htmlFor="contact-phone" className="block text-sm/6 font-semibold">
                  Phone number{' '}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <div className="mt-2.5 flex overflow-hidden rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <div className="relative flex shrink-0 items-center border-r border-input">
                    <select
                      name="countryCode"
                      aria-label="Country code"
                      defaultValue="+1-US"
                      className="h-full appearance-none bg-transparent py-2 pl-3 pr-7 text-sm text-foreground focus:outline-none"
                    >
                      {PHONE_PREFIXES.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-1.5 size-3.5 shrink-0 text-muted-foreground" />
                  </div>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="123-456-7890"
                    className="min-w-0 grow bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <Label htmlFor="contact-message" className="block text-sm/6 font-semibold">
                  Message
                </Label>
                <div className="mt-2.5">
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us what you're working on..."
                    className="resize-none"
                    required
                  />
                </div>
              </div>

              {/* Privacy toggle */}
              {privacyHref && (
                <div className="flex gap-x-4 sm:col-span-2">
                  <div className="flex h-6 items-center">
                    <div className="group relative inline-flex h-5 w-8 shrink-0 cursor-pointer rounded-full border border-input bg-muted p-px transition-colors duration-200 ease-in-out focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 has-[:checked]:border-primary has-[:checked]:bg-primary">
                      <span className="size-4 rounded-full bg-background shadow-sm transition-transform duration-200 ease-in-out group-has-[:checked]:translate-x-3" />
                      <input
                        id="contact-privacy"
                        name="privacy"
                        type="checkbox"
                        required
                        aria-label="Agree to privacy policy"
                        className="absolute inset-0 size-full cursor-pointer appearance-none focus:outline-none"
                      />
                    </div>
                  </div>
                  <Label
                    htmlFor="contact-privacy"
                    className="cursor-pointer text-sm font-normal leading-snug text-muted-foreground"
                  >
                    By selecting this, you agree to our{' '}
                    <a
                      href={privacyHref}
                      className="font-medium text-foreground underline-offset-2 hover:underline"
                    >
                      privacy policy
                    </a>
                    .
                  </Label>
                </div>
              )}
            </div>

            <div className="mt-10">
              <Button type="submit" className="w-full">
                Let's talk
                <Send className="ml-2 size-4" />
              </Button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
}

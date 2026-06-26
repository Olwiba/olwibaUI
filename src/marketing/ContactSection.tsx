'use client';

import * as React from 'react';
import { Mail, MapPin, MessageSquare, Send, type LucideIcon } from 'lucide-react';
import { Badge, Button, Checkbox, Input, Label, Separator, Textarea } from '@olwiba/cn';

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

const defaultContactInfoResolved: ContactInfoItem[] = [
  { icon: Mail, label: 'Email', value: 'hello@olwiba.com' },
  { icon: MapPin, label: 'Base', value: 'Aotearoa New Zealand' },
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
  contactInfo = defaultContactInfoResolved,
  privacyHref,
  successTitle = defaults.successTitle,
  successDescription = defaults.successDescription,
  sendAnotherLabel = defaults.sendAnotherLabel,
  onSubmit,
}: ContactSectionProps = {}) {
  const [submitted, setSubmitted] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSubmit?.(e);
    setSubmitted(true);
  }

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="grid lg:grid-cols-[1fr_1.4fr]">

        {/* Left panel */}
        <div className="relative overflow-hidden bg-primary px-8 py-12 text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary-foreground)/0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary-foreground)/0.06),transparent_60%)]" />
          <div className="relative flex h-full flex-col gap-8">
            <div>
              <Badge
                variant="secondary"
                className="mb-4 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20"
              >
                {badge}
              </Badge>
              <h2 className="text-3xl font-semibold leading-tight">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{description}</p>
            </div>

            <Separator className="bg-primary-foreground/20" />

            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon = Mail, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-primary-foreground/50">{label}</div>
                    <div className="mt-0.5 text-sm font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <p className="text-xs text-primary-foreground/40">
                Response within one business day.
              </p>
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="p-8 sm:p-10">
          {submitted ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageSquare className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{successTitle}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{successDescription}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                {sendAnotherLabel}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* honeypot */}
              <input type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-first">First name</Label>
                  <Input id="contact-first" name="firstName" placeholder="Olivia" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-last">Last name</Label>
                  <Input id="contact-last" name="lastName" placeholder="Reed" required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-company" className="flex gap-1">
                    Company
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input id="contact-company" name="company" placeholder="Acme Inc." />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone" className="flex gap-1">
                    Phone
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input id="contact-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-email">Work email</Label>
                <Input id="contact-email" name="email" type="email" placeholder="olivia@company.com" required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input id="contact-subject" name="subject" placeholder="How can we help?" required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us what you're working on..."
                  className="min-h-32 resize-none"
                  required
                />
              </div>

              {privacyHref && (
                <div className="flex items-start gap-3">
                  <Checkbox id="contact-privacy" name="privacy" required className="mt-0.5" />
                  <Label htmlFor="contact-privacy" className="text-sm font-normal leading-snug text-muted-foreground">
                    By submitting this form you agree to our{' '}
                    <a href={privacyHref} className="font-medium text-foreground underline-offset-2 hover:underline">
                      privacy policy
                    </a>
                    .
                  </Label>
                </div>
              )}

              <Button type="submit" className="w-full">
                Send message
                <Send className="ml-2 size-4" />
              </Button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

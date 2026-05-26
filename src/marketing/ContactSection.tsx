'use client';

import * as React from 'react';
import { Mail, MapPin, MessageSquare, Phone, Send, type LucideIcon } from 'lucide-react';
import { Badge, Button, Input, Label, Separator, Textarea } from '@olwiba/cn';

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
  successTitle?: string;
  successDescription?: string;
  sendAnotherLabel?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

const defaultContactInfoResolved: ContactInfoItem[] = [
  { icon: Mail, label: 'Email', value: 'hello@olwiba.com' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000' },
  { icon: MapPin, label: 'Office', value: 'San Francisco, CA' },
];

const defaults = {
  badge: 'Contact us',
  title: "Let's talk",
  description:
    "Have a question or want to work together? Fill in the form and we'll get back to you within one business day.",
  successTitle: 'Message sent',
  successDescription: "Thanks for reaching out. We'll get back to you within one business day.",
  sendAnotherLabel: 'Send another',
};

export function ContactSection({
  badge = defaults.badge,
  title = defaults.title,
  description = defaults.description,
  contactInfo = defaultContactInfoResolved,
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
        <div className="relative overflow-hidden bg-primary px-8 py-12 text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary-foreground)/0.1),transparent_60%)]" />
          <div className="relative space-y-6">
            <div>
              <Badge
                variant="secondary"
                className="mb-3 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20"
              >
                {badge}
              </Badge>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-primary-foreground/70">{description}</p>
            </div>

            <Separator className="bg-primary-foreground/20" />

            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon = Mail, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs text-primary-foreground/60">{label}</div>
                    <div className="text-sm font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8">
          {submitted ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageSquare className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold">{successTitle}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{successDescription}</p>
              </div>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                {sendAnotherLabel}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-first">First name</Label>
                  <Input id="contact-first" placeholder="Olivia" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-last">Last name</Label>
                  <Input id="contact-last" placeholder="Reed" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" placeholder="olivia@company.com" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input id="contact-subject" placeholder="How can we help?" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us what you're working on..."
                  className="min-h-28 resize-none"
                  required
                />
              </div>
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

'use client';

import * as React from 'react';
import { Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { Badge, Button, Input, Label, Separator, Textarea } from '@olwiba/cn';

const contactInfo = [
  { Icon: Mail, label: 'Email', value: 'hello@olwiba.com' },
  { Icon: Phone, label: 'Phone', value: '+1 (555) 000-0000' },
  { Icon: MapPin, label: 'Office', value: 'San Francisco, CA' },
];

export function ContactFormBlock() {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="grid lg:grid-cols-[1fr_1.4fr]">
        {/* Left panel */}
        <div className="relative overflow-hidden bg-primary px-8 py-12 text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary-foreground)/0.1),transparent_60%)]" />
          <div className="relative space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20">
                Contact us
              </Badge>
              <h2 className="text-2xl font-semibold">Let's talk</h2>
              <p className="mt-2 text-sm text-primary-foreground/70">
                Have a question or want to work together? Fill in the form and we'll get back to you within one business day.
              </p>
            </div>

            <Separator className="bg-primary-foreground/20" />

            <div className="space-y-4">
              {contactInfo.map(({ Icon, label, value }) => (
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

        {/* Form */}
        <div className="p-8">
          {submitted ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageSquare className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold">Message sent</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Thanks for reaching out. We'll get back to you within one business day.
                </p>
              </div>
              <Button variant="outline" onClick={() => setSubmitted(false)}>Send another</Button>
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

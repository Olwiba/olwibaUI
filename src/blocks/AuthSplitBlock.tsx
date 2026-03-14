'use client';

import * as React from 'react';
import { ArrowRight, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@olwiba/cn';

export function AuthSplitBlock() {
  return (
    <section className="grid min-h-[560px] overflow-hidden rounded-2xl border bg-card lg:grid-cols-2">
      <div className="relative hidden p-8 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-muted" />
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-4">Welcome</Badge>
          <h2 className="text-3xl font-semibold tracking-tight">Build better interfaces faster</h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Use ready-made blocks powered by olwibaCN so your team can move from idea to production without rebuilding UI foundations.
          </p>
        </div>
        <div className="relative z-10 space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><ShieldCheck className="size-4" /> Type-safe components</div>
          <div className="flex items-center gap-2"><Sparkles className="size-4" /> Polished defaults</div>
          <div className="flex items-center gap-2"><Building2 className="size-4" /> Plug-and-play for app shells</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Enter your email and password to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="flex flex-col gap-2">
              <Button className="w-full">Continue</Button>
              <Button variant="outline" className="w-full">Use SSO</Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              New here? <a className="text-foreground underline underline-offset-4" href="#">Create an account</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
